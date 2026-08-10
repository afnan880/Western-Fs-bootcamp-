import { defineComponent, onMounted } from 'vue'
import { usePlayersStore } from './stores/players'
import PlayerList from './components/PlayerList'
import PlayerDetails from './components/PlayerDetails'
import MatchRecorder from './components/MatchRecorder'

export default defineComponent({
  name: 'App',
  setup() {
    const store = usePlayersStore()

    onMounted(() => {
      store.loadPlayers()
    })

    return () => (
      <div class="app-shell">
        <header class="app-header">
          <div class="app-header__mark" aria-hidden="true">
            <span class="t-mark"></span>
          </div>
          <div>
            <p class="app-header__eyebrow">Club roster &amp; results</p>
            <h1 class="app-header__title">Damian Warner — Squash Match Manager</h1>
          </div>
        </header>

        <main class="app-grid">
          <PlayerList class="app-grid__list" />
          <PlayerDetails class="app-grid__details" />
          <MatchRecorder class="app-grid__recorder" />
        </main>

        <footer class="app-footer">Squash Match Manager — mock data, resets on reload.</footer>
      </div>
    )
  }
})
