<template>
  <div class="vl-parent">
    <loading
      v-model:active="globalLoading"
      :can-cancel="canCancel"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
      loader="bars"
      background-color="#000"
      color="#fff"
      :opacity="opacity"
    />
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

import { useGlobalStore } from "@/store/global";
import { storeToRefs } from "pinia";

import { ref, onMounted } from "vue";
export default {
  setup() {
    const globalStore = useGlobalStore();

    //isLoading
    const { globalLoading } = storeToRefs(globalStore);
    const fullPage = ref(true);
    const canCancel = ref(false);
    const opacity = ref(0.8);
    onMounted(() => {});

    const onCancel = () => {
      // canCancel 是 true 時 可以觸發取消事件
    };

    return {
      // isLoading,
      fullPage,
      canCancel,
      onCancel,
      globalLoading,
      opacity
    };
  },
  components: { Loading },
};
</script>
<style lang=""></style>
