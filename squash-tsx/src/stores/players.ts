import { defineStore } from 'pinia'
import { fetchPlayers, submitMatchResult } from '../services/api'
import type { Player, Level, Status, SortKey, MatchResultInput } from '../types'

export const LEVELS: Level[] = ['Beginner', 'Intermediate', 'Advanced']

interface PlayersState {
  players: Player[]
  status: Status
  error: string | null

  selectedPlayerId: number | null

  // Filters live in the store so any component (search bar, list,
  // empty-state messaging) can read/react to the same source of truth.
  searchTerm: string
  levelFilter: Level | 'All'
  sortBy: SortKey

  // Match recording sub-state, kept separate from the roster load state so
  // a failed match submission doesn't blow away an already-loaded list.
  matchStatus: Status
  matchError: string | null
}

export const usePlayersStore = defineStore('players', {
  state: (): PlayersState => ({
    players: [],
    status: 'idle',
    error: null,

    selectedPlayerId: null,

    searchTerm: '',
    levelFilter: 'All',
    sortBy: 'ranking',

    matchStatus: 'idle',
    matchError: null
  }),

  getters: {
    isLoading: (state): boolean => state.status === 'loading',
    hasError: (state): boolean => state.status === 'error',
    hasLoaded: (state): boolean => state.status === 'success',

    selectedPlayer: (state): Player | null =>
      state.players.find((p) => p.id === state.selectedPlayerId) ?? null,

    filteredPlayers: (state): Player[] => {
      const term = state.searchTerm.trim().toLowerCase()

      let list = state.players.filter((p) => {
        const matchesName = term.length === 0 || p.name.toLowerCase().includes(term)
        const matchesLevel = state.levelFilter === 'All' || p.level === state.levelFilter
        return matchesName && matchesLevel
      })

      list = [...list].sort((a, b) => {
        if (state.sortBy === 'wins') return b.wins - a.wins
        return a.ranking - b.ranking
      })

      return list
    },

    // Sorted purely for populating "player A / player B" pickers, unaffected
    // by search/level filters — you should be able to record a match between
    // any two players regardless of what's currently filtered in the list.
    allPlayersSorted: (state): Player[] => [...state.players].sort((a, b) => a.ranking - b.ranking)
  },

  actions: {
    async loadPlayers(): Promise<void> {
      this.status = 'loading'
      this.error = null
      try {
        const data = await fetchPlayers()
        this.players = data
        this.status = 'success'
        if (!this.selectedPlayerId && data.length > 0) {
          this.selectedPlayerId = data[0].id
        }
      } catch (err) {
        this.status = 'error'
        this.error = err instanceof Error ? err.message : 'Something went wrong while loading players.'
      }
    },

    retryLoadPlayers(): Promise<void> {
      return this.loadPlayers()
    },

    selectPlayer(id: number): void {
      this.selectedPlayerId = id
    },

    setSearchTerm(term: string): void {
      this.searchTerm = term
    },

    setLevelFilter(level: Level | 'All'): void {
      this.levelFilter = level
    },

    setSortBy(key: SortKey): void {
      this.sortBy = key
    },

    resetFilters(): void {
      this.searchTerm = ''
      this.levelFilter = 'All'
      this.sortBy = 'ranking'
    },

    async recordMatch({ winnerId, loserId }: MatchResultInput): Promise<boolean> {
      this.matchError = null

      if (!winnerId || !loserId) {
        this.matchError = 'Choose both players before recording a result.'
        return false
      }
      if (winnerId === loserId) {
        this.matchError = 'A player cannot play a match against themselves.'
        return false
      }

      this.matchStatus = 'loading'
      try {
        const updated = await submitMatchResult({ winnerId, loserId })
        this.players = updated
        this.matchStatus = 'success'
        return true
      } catch (err) {
        this.matchStatus = 'error'
        this.matchError = err instanceof Error ? err.message : 'Could not record that result. Try again.'
        return false
      }
    }
  }
})
