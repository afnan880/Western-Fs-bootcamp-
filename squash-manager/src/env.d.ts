/// <reference types="vite/client" />

export {}

declare global {
  interface Window {
    /** When true, the mock API rejects its next fetchPlayers() call. Consumed once. */
    __squashApiFailNext?: boolean
  }
}
