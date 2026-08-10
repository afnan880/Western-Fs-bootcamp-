export type Level = 'Beginner' | 'Intermediate' | 'Advanced'

export interface Player {
  id: number
  name: string
  ranking: number
  level: Level
  wins: number
  losses: number
}

export type Status = 'idle' | 'loading' | 'success' | 'error'

export type SortKey = 'ranking' | 'wins'

export interface MatchResultInput {
  winnerId: number
  loserId: number
}
