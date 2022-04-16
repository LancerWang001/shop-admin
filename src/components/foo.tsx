import { defineComponent, ref } from '@vue/runtime-core'

export default defineComponent({
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const count = ref(0)
    return () => (
      <div>
        <p>{props.msg}</p>
        <p>{count.value}</p>
      </div>
    )
  }
})
