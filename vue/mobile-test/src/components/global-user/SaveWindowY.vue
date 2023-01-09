<script>
import { ref, onActivated } from "vue"
import { onBeforeRouteLeave } from "vue-router"

export default {
  setup() {
    //取消監控

    let homeTop = ref(0)
    onBeforeRouteLeave((to, from, next) => {
      homeTop.value = window.scrollY || 0
      next()
    })
    onActivated(() => {
      window.scrollTo({
        top: homeTop.value,
        left: 0,
        behavior: "instant",
      })
    })

    return {}
  },
  components: {},
}
</script>

<template>
  <div></div>
</template>
