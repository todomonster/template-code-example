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
      mobile: "0900000000",
      password: "1234qwer",
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

    const passwordEyeClass = ref("fa fa-eye-slash");
    const passwordType = ref("password");
    const handleEyeClick = () => {
      const className = passwordEyeClass.value;
      passwordEyeClass.value =
        className === "fa fa-eye" ? "fa fa-eye-slash" : "fa fa-eye";
      passwordType.value = className === "fa fa-eye" ? "password" : "";
    };

    return {
      inputData,
      login,
      form,
      handleBackDoorOpen,
      isBackDoor,
      passwordEyeClass,
      handleEyeClick,
      passwordType,
    };
  },
};
</script>

<template>
  <!-- <div class="fullScreen">
    <div class="login">
      <div class="title" @click="handleBackDoorOpen(inputData)">會員登入</div>

      <select
        v-if="isBackDoor"
        v-model="inputData.option"
        class="form-select"
        aria-label=""
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
          <div class="mb-3 input-group">
            <input
              :type="passwordType"
              class="form-control"
              placeholder="請輸入密碼"
              v-model="inputData.password"
              pattern="^(?=.*[A-Za-z])(?=.*[0-9]).{6,}$"
              title="最少6個字元，需有英文及數字"
              required
            />
            <div class="input-group-text" @click="handleEyeClick">
              <i
                :class="passwordEyeClass"
                id="togglePassword"
                style="cursor: pointer"
              ></i>
            </div>
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
        <div @click="$router.push({ path: '/login/forget' })">忘記密碼</div>
      </div>

    </div>
  </div> -->
  <div class="c-login">
    <section class="c-main">
      <div class="main-header">
        <div class="main-navbar">
          <ul class="navbar-nav">
            <!-- <li class="nav-item">
              <a href="javascript:void(0);" class="nav-link"
                ><i class="icon icon-clear"></i
              ></a>
            </li> -->
          </ul>
        </div>
      </div>
      <div class="logo-container">
        <div class="logo" @click="handleBackDoorOpen(inputData)">
          <img src="@/assets/images/logo.png" />
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
            <option value="2">開發版</option>
          </select>
          <div class="position-relative mb-3">
            <label class="form-label form-label-2"
              ><i class="icon icon-member-s"></i
            ></label>
            <input
              type="text"
              class="form-control form-control-2"
              placeholder="請輸入手機號碼"
              v-model="inputData.mobile"
              pattern="^09\d{2}?\d{3}?\d{3}$"
              title="請輸入手機號碼"
              required
            />
            <div class="form-icon"><i class="icon icon-reset"></i></div>
          </div>
          <div class="position-relative mb-3">
            <label class="form-label form-label-2"
              ><i class="icon icon-lock"></i
            ></label>
            <input
              :type="passwordType"
              class="form-control form-control-2"
              placeholder="請輸入密碼"
              v-model="inputData.password"
              pattern="^(?=.*[A-Za-z])(?=.*[0-9]).{6,}$"
              title="最少6個字元，需有英文及數字"
              required
            />
          </div>
          <div class="mt-5">
            <div class="form-word text-center">
              還沒有收到驗證碼嗎？請等候60s後再點選重新發送
            </div>
          </div>
          <div class="btn-container mt-5 text-center">
            <button class="btn btn-next" type="submit" @click.prevent="login">
              <i class="icon icon-next"></i>
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
  <!-- <div class="mb-3 input-group">
        <input
          type="password"
          class="form-control"
          placeholder="請輸入密碼"
          v-model="inputData.password"
          pattern="^(?=.*[A-Za-z])(?=.*[0-9]).{6,}$"
          title="最少6個字元，需有英文及數字"
          required
        />

        <div class="input-group-text" @click="handleEyeClick">
          <i
            :class="passwordEyeClass"
            style="cursor: pointer"
          ></i>
        </div>
      </div> -->
</template>

<style lang="scss" scoped></style>
