import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'EmptyState',
  props: {
    message: {
      type: String as PropType<string>,
      default: 'No players match your search.'
    },
    showReset: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },
  emits: {
    reset: () => true
  },
  setup(props, { emit }) {
    return () => (
      <div class="state-panel">
        <p class="state-panel__eyebrow">Let</p>
        <p class="state-panel__text">{props.message}</p>
        {props.showReset && (
          <button type="button" class="btn btn--ghost" onClick={() => emit('reset')}>
            Clear search &amp; filters
          </button>
        )}
      </div>
    )
  }
})
