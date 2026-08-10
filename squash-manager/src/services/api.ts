import type { Player, MatchResultInput } from '../types'

// A tiny mock "API" so the store has something realistic to talk to.
// It simulates network latency and can simulate failures, so the UI's
// loading / error / retry states have something real to respond to.

const SEED_PLAYERS: Player[] = [
  { id: 1, name: 'Gary', ranking: 1, level: 'Advanced', wins: 24, losses: 6 },
  { id: 2, name: 'Francis', ranking: 2, level: 'Advanced', wins: 21, losses: 9 },
  { id: 3, name: 'Albert', ranking: 3, level: 'Advanced', wins: 19, losses: 8 },
  { id: 4, name: 'Mike', ranking: 4, level: 'Intermediate', wins: 16, losses: 11 },
  { id: 5, name: 'Joviel', ranking: 5, level: 'Intermediate', wins: 15, losses: 12 },
  { id: 6, name: 'John', ranking: 6, level: 'Intermediate', wins: 13, losses: 14 },
  { id: 7, name: 'Sofi', ranking: 7, level: 'Intermediate', wins: 12, losses: 10 },
  { id: 8, name: 'Afnan', ranking: 8, level: 'Advanced', wins: 18, losses: 7 },
  { id: 9, name: 'Ehab', ranking: 9, level: 'Beginner', wins: 6, losses: 9 },
  { id: 10, name: 'Tim', ranking: 10, level: 'Beginner', wins: 5, losses: 8 },
  { id: 11, name: 'Adil', ranking: 11, level: 'Beginner', wins: 4, losses: 10 },
  { id: 12, name: 'Roni', ranking: 12, level: 'Beginner', wins: 3, losses: 7 }
]

const LATENCY_MS = 600

// Set to a number between 0 and 1 to randomly fail that fraction of the time,
// e.g. 0.2 for a 1-in-5 chance. Left at 0 by default so the app behaves
// predictably; use window.__squashApiFailNext (see below) to trigger a
// failure on demand, e.g. for demoing the error state.
const RANDOM_FAILURE_RATE = 0

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function clone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data))
}

// In-memory "database". Module-level so it persists across store resets
// within a session but resets on page reload, same as any other mock API.
let db: Player[] = clone(SEED_PLAYERS)

/**
 * Fetch the full player list.
 * Rejects if window.__squashApiFailNext is set (consumed once) or if the
 * random failure roll hits, so the app's error/retry path is exercisable.
 */
export async function fetchPlayers(): Promise<Player[]> {
  await delay(LATENCY_MS)

  if (typeof window !== 'undefined' && window.__squashApiFailNext) {
    window.__squashApiFailNext = false
    throw new Error('Could not reach the club server. The connection timed out.')
  }

  if (Math.random() < RANDOM_FAILURE_RATE) {
    throw new Error('Could not reach the club server. The connection timed out.')
  }

  return clone(db)
}

/**
 * Record a completed match between two players and persist the updated
 * win/loss counts back to the mock database.
 */
export async function submitMatchResult({ winnerId, loserId }: MatchResultInput): Promise<Player[]> {
  await delay(LATENCY_MS / 2)

  const winner = db.find((p) => p.id === winnerId)
  const loser = db.find((p) => p.id === loserId)

  if (!winner || !loser) {
    throw new Error('One of the selected players could not be found.')
  }

  winner.wins += 1
  loser.losses += 1

  return clone(db)
}
