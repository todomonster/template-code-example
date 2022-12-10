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
  <div id="app">
    <RouterView />
    <Loading />
  </div>
</template>

<style scoped></style>
