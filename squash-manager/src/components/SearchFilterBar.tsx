import { defineComponent } from 'vue'
import { usePlayersStore, LEVELS } from '../stores/players'
import type { Level, SortKey } from '../types'

export default defineComponent({
  name: 'SearchFilterBar',
  setup() {
    const store = usePlayersStore()

    return () => (
      <div class="filter-bar">
        <label class="field field--search">
          <span class="field__label">Search</span>
          <input
            type="search"
            placeholder="Find a player by name…"
            value={store.searchTerm}
            onInput={(e: Event) => store.setSearchTerm((e.target as HTMLInputElement).value)}
          />
        </label>

        <label class="field">
          <span class="field__label">Level</span>
          <select
            value={store.levelFilter}
            onChange={(e: Event) =>
              store.setLevelFilter((e.target as HTMLSelectElement).value as Level | 'All')
            }
          >
            <option value="All">All levels</option>
            {LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </label>

        <label class="field">
          <span class="field__label">Sort by</span>
          <select
            value={store.sortBy}
            onChange={(e: Event) => store.setSortBy((e.target as HTMLSelectElement).value as SortKey)}
          >
            <option value="ranking">Ranking</option>
            <option value="wins">Wins</option>
          </select>
        </label>
      </div>
    )
  }
})
