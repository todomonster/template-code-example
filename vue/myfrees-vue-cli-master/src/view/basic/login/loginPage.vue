<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Toast } from "@/components/global/swal.js";
import { errorHandle } from "@/utils/errorHandle";
import { apiStoreLogin } from "@/api/myfree";

import { ExtCall } from "@/utils/extCall";

export default {
  setup() {
    const router = useRouter();
    const inputData = ref({
      mobile: "",
      password: "",
      option: "",
    });
    let msg = "";
    const form = ref(null);
    // onMounted先判斷驗證 is_Login = 1? 進首頁
    onMounted(() => {
      if (localStorage.getItem("is_Login") == 1) {
        router.push({ path: "/home" });
      }
    });
    const isLoginSuccess = (msg) => {
      if (msg.token) {
        return true;
      }
      return false;
    };

    const backDoor = process.env.VUE_APP_TEST_PASSWORD;
    const isBackDoor = ref(false);
    const handleBackDoorOpen = (formData) => {
      const { password, option } = formData;
      if (password === backDoor) {
        isBackDoor.value = true;
      }
      try {
        if (option === "2") {
          // 切換到測試版本
          const testUrl =
            "https://myfree.tako.life/app/store/store_settings_v1.txt";
          ExtCall.replaceSetting(" ", testUrl);
        }
        if (option === "1") {
          // 切換到普通版本
          const defaultUrl =
            "https://myfree.tako.life/app/store/store_settings.txt";
          ExtCall.replaceSetting(" ", defaultUrl);
        }
      } catch (error) {
         Toast(`電腦版不能執行 ${error}`);
      }
    };

    const login = async (e) => {
      e.preventDefault();

      if (form.value.reportValidity()) {
        //post API
        msg = await apiStoreLogin(inputData.value);
        if (isLoginSuccess(msg)) {
          Toast("登入成功");
          localStorage.setItem("is_Login", 1);
          router.push({ path: "/home" });
        } else {
          errorHandle(msg);
        }
      }
    };

    return {
      inputData,
      login,
      form,
      handleBackDoorOpen,
      isBackDoor,
    };
  },
};
</script>

<template>
  <div class="fullScreen">
    <div class="login">
      <div class="title" @click="handleBackDoorOpen(inputData)">會員登入</div>
      <select
        v-if="isBackDoor"
        v-model="inputData.option"
        class="form-select"
        aria-label="Default select example"
      >
        <option value="">選擇要切換到哪個版本?</option>
        <option value="1" selected>穩定版</option>
        <option value="2">開發版</option>
      </select>
      <div class="login-main">
        <form ref="form">
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="請輸入手機號碼"
              v-model="inputData.mobile"
              pattern="^09\d{2}?\d{3}?\d{3}$"
              title="請輸入手機號碼"
              required
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              class="form-control"
              placeholder="請輸入密碼"
              v-model="inputData.password"
              pattern="^(?=.*[A-Za-z])(?=.*[0-9]).{6,}$"
              title="最少6個字元，需有英文及數字"
              required
            />
          </div>
        </form>
        <div class="mt-4b btn-container">
          <div class="row">
            <div class="col">
              <button
                class="btn btn-primary"
                type="button"
                @click.prevent="login"
              >
                登入
              </button>
            </div>
            <div class="col">
              <button
                class="btn btn-outline-primary"
                type="button"
                @click="$router.push({ path: '/signup' })"
              >
                註冊
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="login-main2">
        <!-- <div @click="$router.push({ path: '/home' })">訪客登入</div>
        <div>.</div> -->
        <div @click="$router.push({ path: '/login/forget' })">忘記密碼</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style/login.scss";
</style>
