import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePlayersStore } from '../stores/players'
import * as api from '../services/api'
import type { Player } from '../types'

const MOCK_PLAYERS: Player[] = [
  { id: 1, name: 'Gary', ranking: 1, level: 'Advanced', wins: 10, losses: 2 },
  { id: 2, name: 'Francis', ranking: 2, level: 'Advanced', wins: 8, losses: 4 },
  { id: 3, name: 'Albert', ranking: 3, level: 'Beginner', wins: 1, losses: 5 }
]

function clone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data))
}

describe('players store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.restoreAllMocks()
  })

  it('loads players and exposes them once the fetch resolves', async () => {
    vi.spyOn(api, 'fetchPlayers').mockResolvedValue(clone(MOCK_PLAYERS))

    const store = usePlayersStore()
    expect(store.status).toBe('idle')

    await store.loadPlayers()

    expect(store.status).toBe('success')
    expect(store.players).toHaveLength(3)
    expect(store.selectedPlayerId).toBe(1) // auto-selects first player
  })

  it('surfaces a readable error and allows retrying after a failed load', async () => {
    vi.spyOn(api, 'fetchPlayers')
      .mockRejectedValueOnce(new Error('Network down'))
      .mockResolvedValueOnce(clone(MOCK_PLAYERS))

    const store = usePlayersStore()
    await store.loadPlayers()

    expect(store.status).toBe('error')
    expect(store.error).toBe('Network down')
    expect(store.players).toHaveLength(0)

    await store.retryLoadPlayers()

    expect(store.status).toBe('success')
    expect(store.players).toHaveLength(3)
  })

  it('filters players by search term and level, and sorts by wins', async () => {
    vi.spyOn(api, 'fetchPlayers').mockResolvedValue(clone(MOCK_PLAYERS))
    const store = usePlayersStore()
    await store.loadPlayers()

    store.setSearchTerm('gar')
    expect(store.filteredPlayers.map((p) => p.name)).toEqual(['Gary'])

    store.setSearchTerm('')
    store.setLevelFilter('Beginner')
    expect(store.filteredPlayers.map((p) => p.name)).toEqual(['Albert'])

    store.setLevelFilter('All')
    store.setSortBy('wins')
    expect(store.filteredPlayers.map((p) => p.name)).toEqual([
      'Gary',
      'Francis',
      'Albert'
    ])
  })

  it('records a match result and updates both players win/loss counts', async () => {
    vi.spyOn(api, 'fetchPlayers').mockResolvedValue(clone(MOCK_PLAYERS))
    vi.spyOn(api, 'submitMatchResult').mockImplementation(async ({ winnerId, loserId }) => {
      const updated = clone(MOCK_PLAYERS)
      updated.find((p) => p.id === winnerId)!.wins += 1
      updated.find((p) => p.id === loserId)!.losses += 1
      return updated
    })
 
    const store = usePlayersStore()
    await store.loadPlayers()

    const ok = await store.recordMatch({ winnerId: 2, loserId: 3 })

    expect(ok).toBe(true)
    expect(store.matchStatus).toBe('success')
    expect(store.players.find((p) => p.id === 2)!.wins).toBe(9)
    expect(store.players.find((p) => p.id === 3)!.losses).toBe(6)
  })

  it('rejects recording a match against yourself without calling the API', async () => {
    vi.spyOn(api, 'fetchPlayers').mockResolvedValue(clone(MOCK_PLAYERS))
    const submitSpy = vi.spyOn(api, 'submitMatchResult')

    const store = usePlayersStore()
    await store.loadPlayers()

    const ok = await store.recordMatch({ winnerId: 1, loserId: 1 })

    expect(ok).toBe(false)
    expect(store.matchError).toMatch(/cannot play a match against themselves/)
    expect(submitSpy).not.toHaveBeenCalled()
  })
})