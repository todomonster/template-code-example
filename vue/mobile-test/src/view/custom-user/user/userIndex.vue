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
  <Header
    title=""
    rightTextStatus="show"
    rightIcon="bell"
    leftIcon="arrow"
    v-if="$route.meta.showHeader"
  />
  <div class="main">
    <!-- <router-view /> -->
    <router-view v-slot="{ Component }">
      <keep-alive :include="['EditUserProfile']">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
  <Footer v-show="$route.meta.showFooter" />
</template>

<style lang="scss" scoped></style>
