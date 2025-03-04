<script>
import { ref, onMounted, onBeforeMount, computed } from "vue";
import { useRouter, onBeforeRouteLeave } from "vue-router";
import { Toast } from "@/components/global/swal.js";
import { errorHandle } from "@/utils/errorHandle";
import { apiStoreLogin, apiStoreSaveFcmToken } from "@/api/myfree";

import { ExtCall } from "@/utils/extCall";

import { useGlobalStore } from "@/store/global";

export default {
  setup() {
    const VUE_APP_VERSION = process.env.VUE_APP_VERSION || "";
    const globalStore = useGlobalStore();
    const { goto, setStoreData } = globalStore;

    const inputData = ref({
      mobile: "",
      password: "",
      option: "",
    });
    let msg = "";
    const form = ref(null);
    let fcmToken = "";

    const isLoginSuccess = (msg) => {
      if (msg.result) {
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
        if (option === "1") {
          // 切換到穩定版本
          const defaultUrl =
            "https://myfree.tako.life/app/store/store_settings.txt";
          ExtCall.replaceSetting(" ", defaultUrl);
        }
        if (option === "2") {
          // 開發-連線版
          const testUrl =
            "https://myfree.tako.life/app/store/store_settings_v1.txt";
          ExtCall.replaceSetting(" ", testUrl);
        }
        if (option === "3") {
          // 切換到demo測試機版本
          const defaultUrl =
            "http://210.64.205.11:8080/myfree/public/app/store/store_settings.txt";
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
          const change_password = msg?.change_password;

          // 跑修改密碼流程
          if (change_password) {
            goto("routerQuery", "/forgetPassword", {
              query: {
                forget: "1",
                otp: inputData.value.password,
                mobile: inputData.value.mobile,
              },
            });
            return;
          }
          // 正常流程
          if (fcmToken) {
            const response = await apiStoreSaveFcmToken({
              token: fcmToken,
              type: "store",
            });
            console.log("fcm token 更新成功");
          }
          setStoreData({
            status: false,
            mobile: "",
            password: "",
          });
          localStorage.setItem("is_Login", 1);
          Toast("登入成功");
          goto("router", "/home");
        } else {
          errorHandle(msg);
        }
      }
    };

    const passwordEyeClass = ref("icon icon-eye");
    const passwordType = ref("password");
    const handleEyeClick = () => {
      const className = passwordEyeClass.value;
      passwordEyeClass.value =
        className === "icon icon-eye" ? "icon-eye-slash" : "icon icon-eye";
      passwordType.value = className === "icon-eye-slash" ? "password" : "";
    };
    // onMounted先判斷驗證 is_Login = 1? 進首頁
    onBeforeMount(() => {
      document.body.classList.add("c-login");
      if (localStorage.getItem("is_Login") == 1) {
        goto("router", "/home");
      }
    });
    onMounted(() => {
      try {
        window.getFcmPushToken = (val) => {
          if (val) {
            fcmToken = val;
          }
        };
        ExtCall.getFcmPushId("getFcmPushToken");
      } catch (error) {
        console.log(error.message, "電腦版😃");
      }
    });
    onBeforeRouteLeave((to, from, next) => {
      document.body.classList.remove("c-login");
      next();
    });
    return {
      inputData,
      login,
      form,
      handleBackDoorOpen,
      isBackDoor,
      passwordEyeClass,
      handleEyeClick,
      passwordType,
      VUE_APP_VERSION,
      goto,
    };
  },
};
</script>

<template>
  <section class="c-main">
    <div class="main-header">
      <div class="main-navbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <!-- <a href="" class="nav-link">
              <i class="icon icon-clear"></i>
            </a> -->
          </li>
        </ul>
      </div>
    </div>
    <div class="logo-container">
      <div class="logo" @click="handleBackDoorOpen(inputData)">
        <img src="@/assets/images/logo_02.png" />
      </div>
    </div>
    <div class="form-container form-container-2">
      <form ref="form">
        <select
          v-if="isBackDoor"
          v-model="inputData.option"
          class="form-select mb-3"
          aria-label=""
        >
          <option value="">選擇要切換到哪個版本?</option>
          <option value="1" selected>穩定版</option>
          <option value="2">開發-連線版</option>
          <option value="3">測試機demo版</option>
        </select>
        <div class="position-relative mb-3">
          <label class="form-label form-label-2"
            ><i class="icon icon-member-s"></i
          ></label>
          <input
            type="text"
            class="form-control form-control-2"
            placeholder="請輸入手機號碼"
            v-model.trim="inputData.mobile"
            pattern="^09\d{2}?\d{3}?\d{3}$"
            title="請輸入手機號碼"
            required
          />
          <!-- <div class="form-icon">
            <i class="icon icon-reset"></i>
          </div> -->
        </div>
        <div class="position-relative mb-3">
          <label class="form-label form-label-2"
            ><i class="icon icon-lock"></i
          ></label>
          <input
            :type="passwordType"
            class="form-control form-control-2"
            placeholder="請輸入密碼"
            v-model.trim="inputData.password"
            pattern="^(?=.*[A-Za-z])(?=.*[0-9]).{6,}$"
            title="最少6個字元，需有英文及數字"
            required
          />
          <div class="form-icon cursor-pointer" @click="handleEyeClick">
            <i :class="passwordEyeClass" id="togglePassword"></i>
          </div>
        </div>
        <div class="row form-word text-decoration-underline">
          <div class="col ml-4">
            <span
              class="cursor-pointer"
              @click="goto('router', '/forgetPassword')"
              >忘記密碼?</span
            >
          </div>
          <div class="col ml-4 text-end">
            <span class="cursor-pointer" @click="goto('router', '/signup')"
              >去註冊</span
            >
          </div>
        </div>
        <div class="btn-container mt-5 text-center">
          <button
            class="btn btn-next cursor-pointer"
            type="submit"
            @click.prevent="login"
          >
            <i class="icon icon-next"></i>
          </button>
        </div>
      </form>
    </div>
    <span class="version text-center">{{ VUE_APP_VERSION }}</span>
  </section>
</template>

<style lang="scss" scoped>
.version {
  color: #ffd877;
  position: fixed;
  bottom: 0;
  left: 45%;
}
</style>
