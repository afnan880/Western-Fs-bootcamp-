import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'LoadingState',
  props: {
    label: {
      type: String as PropType<string>,
      default: 'Loading players…'
    }
  },
  setup(props) {
    return () => (
      <div class="state-panel" role="status" aria-live="polite">
        <div class="rally-loader" aria-hidden="true">
          <span class="rally-loader__ball"></span>
        </div>
        <p class="state-panel__text">{props.label}</p>
      </div>
    )
  }
})
