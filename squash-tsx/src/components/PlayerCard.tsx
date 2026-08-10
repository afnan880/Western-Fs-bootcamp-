import { defineComponent, type PropType } from 'vue'
import type { Player } from '../types'

export default defineComponent({
  name: 'PlayerCard',
  props: {
    player: {
      type: Object as PropType<Player>,
      required: true
    },
    isSelected: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  emits: {
    select: (id: number) => typeof id === 'number'
  },
  setup(props, { emit }) {
    return () => (
      <li>
        <button
          type="button"
          class={['player-card', { 'player-card--active': props.isSelected }]}
          onClick={() => emit('select', props.player.id)}
        >
          <span class="player-card__rank">{props.player.ranking}</span>
          <span class="player-card__body">
            <span class="player-card__name">{props.player.name}</span>
            <span class="player-card__meta">
              <span class={['tag', `tag--${props.player.level.toLowerCase()}`]}>
                {props.player.level}
              </span>
              <span class="player-card__record">
                {props.player.wins}W – {props.player.losses}L
              </span>
            </span>
          </span>
        </button>
      </li>
    )
  }
})
