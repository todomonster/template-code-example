<script>
import Header from "@/components/global-user/header/HeaderArea.vue";
import Footer from "@/components/global-user/footer/FooterArea.vue";
import "../style/public.scss";

export default {
  setup() {},
  components: {
    Header,
    Footer,
  },
};
</script>

<template>
  <Header />
  <div class="main">
    <router-view />
  </div>
  <Footer v-show="$route.meta.showFooter" />
</template>

<style lang="scss" scoped></style>
