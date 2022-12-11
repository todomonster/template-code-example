<script>
import Header from "@/components/global/header/HeaderArea.vue";
import Footer from "@/components/global/footer/FooterArea.vue";

export default {
  setup() {},
  components: {
    Header,
    Footer,
  },
};
</script>

<template>
  <Header
    title=""
    rightTextStatus="show"
    rightIcon="bell"
    v-show="$route.meta.showHeader"
  />
  <router-view v-slot="{ Component }">
    <keep-alive include="viewWallet">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <!-- <router-view /> -->
  <Footer v-show="$route.meta.showFooter" />
</template>

<style lang="scss" scoped></style>
