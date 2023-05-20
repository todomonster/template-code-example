<template>
  <div>
    <input v-focus />
  </div>
</template>

<script>
export default {
  directives: {
    focus: {
      mounted(el) {
        el.focus()
      }
    }
  }
}
</script>