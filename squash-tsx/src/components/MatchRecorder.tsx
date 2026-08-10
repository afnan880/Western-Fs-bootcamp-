import { defineComponent, ref, computed, watch } from 'vue'
import { usePlayersStore } from '../stores/players'

export default defineComponent({
  name: 'MatchRecorder',
  setup() {
    const store = usePlayersStore()

    const playerAId = ref<number | null>(null)
    const playerBId = ref<number | null>(null)
    const winnerId = ref<number | null>(null)
    const justRecorded = ref(false)

    const bothSelected = computed(
      () =>
        playerAId.value !== null &&
        playerBId.value !== null &&
        playerAId.value !== playerBId.value
    )

    const winnerOptions = computed(() =>
      store.allPlayersSorted.filter(
        (p) => p.id === playerAId.value || p.id === playerBId.value
      )
    )

    const formWarning = computed(() => {
      if (playerAId.value !== null && playerAId.value === playerBId.value) {
        return 'Player A and Player B must be different players.'
      }
      return ''
    })

    // Reset the chosen winner whenever the selected pair changes, so a stale
    // winner can't silently carry over to a different matchup.
    watch([playerAId, playerBId], () => {
      winnerId.value = null
      justRecorded.value = false
    })

    async function submit(e: Event) {
      e.preventDefault()
      justRecorded.value = false
      if (!bothSelected.value || !winnerId.value) {
        store.matchError = 'Pick two different players and a winner.'
        return
      }
      const loserId = winnerId.value === playerAId.value ? playerBId.value! : playerAId.value!

      const ok = await store.recordMatch({ winnerId: winnerId.value, loserId })
      if (ok) {
        justRecorded.value = true
        winnerId.value = null
      }
    }

    return () => (
      <section class="panel panel--recorder" aria-label="Record a match">
        <header class="panel__header">
          <h2 class="panel__title">Record a match</h2>
        </header>

        {!store.hasLoaded && (
          <p class="state-panel__text state-panel--muted">
            Load the roster before recording a result.
          </p>
        )}

        {store.hasLoaded && (
          <form class="match-form" onSubmit={submit}>
            <label class="field">
              <span class="field__label">Player A</span>
              <select
                value={playerAId.value ?? ''}
                onChange={(e: Event) => {
                  const raw = (e.target as HTMLSelectElement).value
                  playerAId.value = raw === '' ? null : Number(raw)
                }}
              >
                <option value="" disabled>
                  Select a player…
                </option>
                {store.allPlayersSorted.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (#{p.ranking})
                  </option>
                ))}
              </select>
            </label>

            <label class="field">
              <span class="field__label">Player B</span>
              <select
                value={playerBId.value ?? ''}
                onChange={(e: Event) => {
                  const raw = (e.target as HTMLSelectElement).value
                  playerBId.value = raw === '' ? null : Number(raw)
                }}
              >
                <option value="" disabled>
                  Select a player…
                </option>
                {store.allPlayersSorted.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (#{p.ranking})
                  </option>
                ))}
              </select>
            </label>

            <fieldset class="field" disabled={!bothSelected.value}>
              <span class="field__label">Winner</span>
              <div class="winner-toggle">
                {winnerOptions.value.map((option) => (
                  <label
                    key={option.id}
                    class={[
                      'winner-toggle__option',
                      { 'winner-toggle__option--active': winnerId.value === option.id }
                    ]}
                  >
                    <input
                      type="radio"
                      name="winner"
                      checked={winnerId.value === option.id}
                      onChange={() => (winnerId.value = option.id)}
                    />
                    {option.name}
                  </label>
                ))}
              </div>
            </fieldset>

            {formWarning.value && <p class="form-warning">{formWarning.value}</p>}
            {store.matchError && <p class="form-warning">{store.matchError}</p>}
            {justRecorded.value && (
              <p class="form-success">Result recorded — records updated.</p>
            )}

            <button
              type="submit"
              class="btn btn--primary"
              disabled={store.matchStatus === 'loading'}
            >
              {store.matchStatus === 'loading' ? 'Recording…' : 'Record result'}
            </button>
          </form>
        )}
      </section>
    )
  }
})
