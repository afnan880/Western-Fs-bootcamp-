import { defineComponent, computed } from 'vue'
import { usePlayersStore } from '../stores/players'

export default defineComponent({
  name: 'PlayerDetails',
  setup() {
    const store = usePlayersStore()

    const winRate = computed(() => {
      const player = store.selectedPlayer
      if (!player) return 0
      const total = player.wins + player.losses
      if (total === 0) return 0
      return Math.round((player.wins / total) * 100)
    })

    return () => {
      const player = store.selectedPlayer

      return (
        <section class="panel panel--details" aria-label="Player details">
          <header class="panel__header">
            <h2 class="panel__title">Details</h2>
          </header>

          {!store.hasLoaded && (
            <div class="state-panel state-panel--muted">
              <p class="state-panel__text">Load the roster to see player details.</p>
            </div>
          )}

          {store.hasLoaded && !player && (
            <div class="state-panel state-panel--muted">
              <p class="state-panel__text">Select a player from the list to see their record.</p>
            </div>
          )}

          {store.hasLoaded && player && (
            <div class="details-card">
              <p class="details-card__eyebrow">Ranked #{player.ranking}</p>
              <h3 class="details-card__name">{player.name}</h3>
              <span class={['tag', `tag--${player.level.toLowerCase()}`]}>{player.level}</span>

              <dl class="record-grid">
                <div class="record-grid__item">
                  <dt>Wins</dt>
                  <dd>{player.wins}</dd>
                </div>
                <div class="record-grid__item">
                  <dt>Losses</dt>
                  <dd>{player.losses}</dd>
                </div>
                <div class="record-grid__item">
                  <dt>Win rate</dt>
                  <dd>{winRate.value}%</dd>
                </div>
                <div class="record-grid__item">
                  <dt>Matches played</dt>
                  <dd>{player.wins + player.losses}</dd>
                </div>
              </dl>

              <div class="score-line" aria-hidden="true">
                <span class="score-line__bar" style={{ width: winRate.value + '%' }}></span>
              </div>
            </div>
          )}
        </section>
      )
    }
  }
})
