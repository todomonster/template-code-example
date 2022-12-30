<script>
import { onMounted } from "vue";
import Loading from "@/components/loading/apiLoading.vue";

export default {
  setup() {
    onMounted(async () => {});

    return {};
  },
  components: {
    Loading,
  },
};
</script>

<template>
  <div id="app" class="no-select">
    <RouterView />
    <Loading />
  </div>
</template>

<style scoped>
/* https://developer.apple.com/forums/thread/133399 */
.no-select {
  -webkit-touch-callout: none; /* Safari Touch */
  -webkit-user-select: none; /* Webkit */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Edge*/
  user-select: none; /* Future-proof*/
}
.no-drag {
  -webkit-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
}
</style>
