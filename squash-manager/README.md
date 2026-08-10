# The T — Squash Match Manager (TSX)

A small Vue 3 + Pinia app for a squash club to browse players, drill into a
player's record, and log match results — written entirely in TypeScript,
with components as `.tsx` (Vue JSX) instead of `.vue` single-file
components. Built as a code-sample/take-home exercise, not a production
system.

## Running it

```bash
npm install
npm run dev        # starts Vite dev server, usually http://localhost:5173
```

Other scripts:

```bash
npm run build       # type-checks (vue-tsc) then builds for production
npm run preview      # preview the production build
npm run typecheck    # vue-tsc only, no build
npm run test         # run the Vitest suite once
npm run test:watch
```

No backend is required — the app talks to an in-memory mock API
(`src/services/api.ts`) that simulates network latency so the loading state
is actually visible.

### Trying the error / retry state

The mock API doesn't fail randomly by default (so the demo is predictable),
but you can trigger a failure on the next fetch from the browser console:

```js
window.__squashApiFailNext = true
```

Then click **Retry** on the error panel, or reload the page, to see it
recover. (You can also flip `RANDOM_FAILURE_RATE` in `src/services/api.ts`
to a value like `0.3` if you'd rather it fail organically.)

## Why TSX instead of `.vue` SFCs

Vue's usual authoring format is a `.vue` single-file component
(`<template>` / `<script setup lang="ts">` / `<style scoped>`). This version
uses `@vitejs/plugin-vue-jsx` and plain `.tsx` files instead: every
component is `defineComponent({ props, emits, setup() { return () => (<jsx/>) } })`.
Two practical consequences of that choice, worth calling out:

- **No `<script setup>` sugar.** Props/emits have to be declared explicitly
  in the `defineComponent` options (rather than inferred from
  `defineProps<T>()`), and the component body returns a render function
  instead of the template being compiled separately.
- **No scoped `<style>` blocks.** `.tsx` files have nowhere to put
  component-local CSS, so all styling was consolidated into one
  `src/style.css`, organized with a comment header per component. Class
  names are already component-prefixed (`.player-card`, `.details-card`,
  `.match-form`, …) so there's no collision risk despite living in one file.

## How it's structured

```
src/
  main.tsx                 # app entry, installs Pinia
  App.tsx                  # page shell/layout, kicks off the initial load
  types.ts                 # Player, Level, Status, and other shared types
  style.css                # design tokens + every component's styles
  services/
    api.ts                  # mock "backend": seed data, fetchPlayers(), submitMatchResult()
  stores/
    players.ts              # single, fully-typed Pinia store — the source of truth
  components/
    SearchFilterBar.tsx     # search input + level filter + sort control
    PlayerList.tsx          # orchestrates loading/error/empty/list states for the roster
    PlayerCard.tsx          # one row in the list
    PlayerDetails.tsx       # detail panel for the selected player
    MatchRecorder.tsx       # form to record a match result between two players
    LoadingState.tsx        # shared loading UI
    ErrorState.tsx          # shared error UI with a Retry button
    EmptyState.tsx          # shared "no results" UI
  __tests__/
    players.store.spec.ts   # Vitest coverage for the store's core logic
```

**Why one store instead of several:** players, filters, selection, and match
recording all revolve around the same list of players and need to stay in
sync with each other (e.g. recording a match has to update the same objects
the list and detail panel are reading). A single `usePlayersStore` keeps
that consistent and avoids cross-store wiring for a domain this small.

**State shape:** the store tracks a `Status` union (`'idle' | 'loading' |
'success' | 'error'`) for the initial roster load, and a separate
`matchStatus`/`matchError` pair for the "record a match" form, so a failed
match submission doesn't blow away an already-loaded player list.

**Filtering/sorting** (search term, level, sort key) lives in the store
rather than component-local state, via a `filteredPlayers` getter, typed
against `Level | 'All'` and `SortKey`. That keeps it inspectable/testable
independent of the UI.

## Assumptions / simplifications

- **Auth/persistence:** no login, no real backend — data resets on page
  reload.
- **Match model:** a match result is just "winner" + "loser" — no games,
  scores, or best-of-N. Recording a result increments the winner's wins and
  the loser's losses by 1.
- **Self-play guard:** the form won't let you record a match where a player
  beats themselves.
- **Ranking:** rankings are static seed values, not recalculated from
  results.
- **Player creation:** there's no "add a player" flow — the roster is fixed
  mock data.
- **Search:** case-insensitive substring match on name only.

## What I'd add with more time

- Recompute rankings after each match so the ladder reacts to results.
- Persist state to `localStorage` or a real backend so results survive a
  reload.
- A match history log (who played whom, and when), not just running tallies.
- An "Add player" form with basic validation/duplicate-name handling.
- Component tests (e.g. with `@vue/test-utils`) for `MatchRecorder.tsx` and
  `PlayerList.tsx` — the current tests cover the store, which holds the
  actual logic, but interaction tests would round it out.
- If the team's convention is `.vue` SFCs, I'd revert to `<script setup
  lang="ts">` — it gets `defineProps<T>()`/`defineEmits<T>()` inference and
  scoped styles for free, which is generally the more idiomatic Vue 3 +
  TypeScript setup than hand-rolled JSX.
