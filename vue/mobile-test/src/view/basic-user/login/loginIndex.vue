<script>
import { ref, onBeforeMount, onUnmounted } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import "./style/login.scss";
import LoginPage from "./loginPage.vue";
import SignupPage from "./signupPage.vue";
import { useGlobalStore } from "@/store/global";

export default {
  name: "loginIndex",
  setup() {
    const mode = ref("login");

    const globalStore = useGlobalStore();
    const { goto } = globalStore;

    const handleModeChange = (val) => (mode.value = val);

    onBeforeMount(() => {
      document.body.classList.add("c-login");
    });
    onUnmounted((to, from, next) => {
      document.body.classList.remove("c-login");
    });

    const triggerBackDoor = ref(false);

    return { mode, goto, handleModeChange, triggerBackDoor };
  },
  components: { LoginPage, SignupPage },
};
</script>

<template>
  <section class="c-main">
    <div class="main-header">
      <div class="main-navbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a @click="goto('router', '/setting/profile')" class="nav-link"
              ><i class="icon icon-clear"></i
            ></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="logo-container">
      <div class="logo">
        <img
          src="@/assets/images/logo.png"
          @click="triggerBackDoor = !triggerBackDoor"
        />
      </div>
    </div>
    <LoginPage
      v-if="mode === 'login'"
      :triggerBackDoor="triggerBackDoor"
      @mode="handleModeChange"
    />

    <SignupPage
      v-if="mode === 'signup'"
      :triggerBackDoor="triggerBackDoor"
      @mode="handleModeChange"
    />
  </section>
</template>

<style lang="scss" scoped></style>
