<script>
import { useRouter } from "vue-router";
import Footer from "@/components/global/footer/FooterArea.vue";
// import { apiGetNotifyList } from "@/api/myfree";

export default {
  setup() {
    // const router = useRouter();
    return {};
    // return { apiGetNotifyList };
  },
  components: {
    Footer,
  },
};
</script>

<template>
  <!-- header -->
  <header class="c-header c-header-2">
    <nav class="navbar ui-navbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link"></a>
        </li>
      </ul>
      <h1 class="navbar-brand"><img src=" " /></h1>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link"></a>
        </li>
      </ul>
    </nav>
  </header>
  <!-- content -->
  <div class="main-content">
    <h1>HOME</h1>
  </div>

  <Footer />
</template>

<style lang="scss" scoped></style>
