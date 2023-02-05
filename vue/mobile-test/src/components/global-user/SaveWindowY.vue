<script>
import { ref, onActivated, onMounted } from "vue";
import { onBeforeRouteLeave } from "vue-router";

export default {
  setup() {
    const homeTop = ref(0);
    onBeforeRouteLeave((to, from, next) => {
      homeTop.value = window.scrollY || 0;
      next();
    });
    onActivated(() => {
      if (homeTop.value) {
        window.scrollTo({
          top: homeTop.value,
          left: 0,
          behavior: "instant",
        });
      }
    });
    // onMounted(() => {
    //   if (window.scrollY !== 0) {
    //     window.scrollTo({
    //       top: homeTop.value,
    //       left: 0,
    //       behavior: "instant",
    //     });
    //   }
    // });
    return { homeTop };
  },
  components: {},
};
</script>

<template>
  <div></div>
</template>
