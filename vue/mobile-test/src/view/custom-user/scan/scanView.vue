<script>
import { ref, onBeforeMount } from "vue";
import { useGlobalStore } from "@/store/global";
import { errorHandle } from "@/utils/errorHandle";


export default {
  setup() {
    const globalStore = useGlobalStore();
    const goto = globalStore.goto;

    onBeforeMount(() => {

    });

    return { goto };
  },

  components: {},
};
</script>

<template>
  <!-- 內容 -->
  .
</template>
