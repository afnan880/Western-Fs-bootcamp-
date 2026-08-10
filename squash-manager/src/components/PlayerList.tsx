import { defineComponent } from 'vue'
import { usePlayersStore } from '../stores/players'
import SearchFilterBar from './SearchFilterBar'
import PlayerCard from './PlayerCard'
import LoadingState from './LoadingState'
import ErrorState from './ErrorState'
import EmptyState from './EmptyState'

export default defineComponent({
  name: 'PlayerList',
  setup() {
    const store = usePlayersStore()

    return () => (
      <section class="panel" aria-label="Player list">
        <header class="panel__header">
          <h2 class="panel__title">Players</h2>
          {store.hasLoaded && (
            <span class="panel__count">{store.filteredPlayers.length} shown</span>
          )}
        </header>

        {(store.hasLoaded || store.isLoading) && <SearchFilterBar />}

        {store.isLoading && <LoadingState label="Loading the club roster…" />}

        {!store.isLoading && store.hasError && (
          <ErrorState
            message={store.error ?? 'Something went wrong.'}
            onRetry={() => store.retryLoadPlayers()}
          />
        )}

        {!store.isLoading && !store.hasError && store.hasLoaded && store.filteredPlayers.length === 0 && (
          <EmptyState
            message="No players match your search. Try a different name or level."
            onReset={() => store.resetFilters()}
          />
        )}

        {!store.isLoading && !store.hasError && store.hasLoaded && store.filteredPlayers.length > 0 && (
          <ul class="player-list">
            {store.filteredPlayers.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                isSelected={player.id === store.selectedPlayerId}
                onSelect={(id: number) => store.selectPlayer(id)}
              />
            ))}
          </ul>
        )}
      </section>
    )
  }
})
