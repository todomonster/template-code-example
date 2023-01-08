<script>
import Header from "@/components/global-user/header/HeaderArea.vue";
// import Footer from "@/components/global/footer/FooterArea.vue";

export default {
  setup() {},
  components: {
    Header,
    // Footer,
  },
};
</script>

<template>
  <Header title="我要回報"/>
  <router-view />
  <!-- <Footer v-show="$route.meta.showFooter" /> -->
</template>

<style lang="scss" scoped></style>
