import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'ErrorState',
  props: {
    message: {
      type: String as PropType<string>,
      default: 'Something went wrong.'
    }
  },
  emits: {
    retry: () => true
  },
  setup(props, { emit }) {
    return () => (
      <div class="state-panel state-panel--error" role="alert">
        <p class="state-panel__eyebrow">Fault</p>
        <p class="state-panel__text">{props.message}</p>
        <button type="button" class="btn btn--primary" onClick={() => emit('retry')}>
          Retry
        </button>
      </div>
    )
  }
})
