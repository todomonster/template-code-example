<script>
import { ref, onMounted, watch, computed, onBeforeMount } from "vue";
import { Toast } from "@/components/global/swal.js";
import { errorHandle } from "@/utils/errorHandle";
import {
  apiStoreForgetPwd,
  apiStoreChangePwd,
  apiCheckAccount,
} from "@/api/myfree";

import { useGlobalStore } from "@/store/global";

import { useCoolDownStore } from "@/store/smsCoolDown2";
import { onBeforeRouteLeave } from "vue-router";

import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

export default {
  props: {},
  emits: ["mode"],
  setup(props, { emit }) {
    const LINE_OA_URL = process.env.VUE_APP_LINE_OA_URL;
    // ========
    const smsCoolDown = useCoolDownStore();
    const { isSmsCoolDownOk } = storeToRefs(smsCoolDown);
    const { showText, setCountDown, smsSendDate, handleRouterLeave, init } =
      smsCoolDown;
    onBeforeMount(() => {
      document.body.className = "c-login";
    });
    onBeforeRouteLeave((to, from, next) => {
      document.body.className = "";
      handleRouterLeave();
      next();
    });
    const showSendOtpBtn = computed(() => (showText() ? false : true));
    // ========

    const currentStep = ref(0); //0沒發送 //1已發送
    const sendOtp = async ($event) => {
      $event.preventDefault();

      if (form.value.reportValidity()) {
        // 先檢查是否存在
        const checkStatus = await apiCheckAccount({
          type: "store",
          mobile: inputData.value.mobile,
        });
        if (checkStatus.is_regist === false) {
          Toast("查無此帳號");
          return;
        }
        //發送簡訊
        // ========
        if (isSmsCoolDownOk.value === false) {
          Toast("簡訊功能冷卻中");
          return;
        } else {
          smsSendDate();
          setCountDown();
        }
        // ========
        const response = await apiStoreForgetPwd({
          mobile: inputData.value.mobile,
        });
        if (response.success === "OK" || response.result) {
          Toast("驗證碼(一次性密碼)已發送");
          currentStep.value = 1;
        } else {
          errorHandle(response);
        }
      }
    };
    // ========
    const passwordEyeClass = ref("icon icon-eye");
    const passwordType = ref("password");
    const handleEyeClick = () => {
      const className = passwordEyeClass.value;
      passwordEyeClass.value =
        className === "icon icon-eye" ? "icon-eye-slash" : "icon icon-eye";
      passwordType.value = className === "icon-eye-slash" ? "password" : "";
    };
    // ========

    const globalStore = useGlobalStore();
    const { goto } = globalStore;

    const inputData = ref({
      mobile: "",
      password: "",
      otp: "",
    });

    const form = ref(null);

    const handleSubmit = async (e) => {
      if (currentStep.value == 0) {
        sendOtp(e);
      }
      if (currentStep.value == 1) {
        if (form.value.reportValidity()) {
          const response = await apiStoreChangePwd(inputData.value);
          if (response.success === "OK" || response.result) {
            Toast("修改成功");
            // 跳轉
            goto("router", "/");
          } else {
            errorHandle(response);
          }
        }
      }
    };

    onMounted(() => {
      const { query } = useRoute();

      if (query.forget == "1") {
        Toast("進入接續流程");
        currentStep.value = 1;
        if (query.otp) {
          inputData.value.otp = query.otp;
        }
        if (query.mobile) {
          inputData.value.mobile = query.mobile;
        }
      }
    });

    return {
      inputData,
      handleSubmit,
      form,
      sendOtp,
      showSendOtpBtn,
      showText,
      goto,
      currentStep,
      passwordEyeClass,
      passwordType,
      handleEyeClick,

      LINE_OA_URL
    };
  },
};
</script>

<template>
  <section class="c-main">
    <div class="main-header">
      <div class="main-navbar">
        <ul class="navbar-nav">
          <li class="nav-item"></li>
        </ul>
      </div>
    </div>
    <div class="logo-container">
      <div class="logo">
        <img src="@/assets/images/logo_02.png" />
      </div>
    </div>
    <!-- form start -->
    <div class="form-container form-container-2">
      <form ref="form">
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
          <div
            class="form-icon cursor-pointer"
            @click.prevent="sendOtp"
            v-if="showSendOtpBtn"
          >
            <i class="icon icon-reset"></i>
          </div>
        </div>
        <div class="position-relative mb-3" v-if="currentStep > 0">
          <label class="form-label form-label-2"
            ><i class="icon icon-lock"></i
          ></label>
          <input
            :type="passwordType"
            class="form-control form-control-2"
            placeholder="請輸入新密碼"
            v-model.trim="inputData.password"
            title="8~20個字元(包含英文及數字)"
            pattern="^(?=.*[A-Za-z])(?=.*[0-9]).{8,20}$"
            required
          />
          <div class="form-icon cursor-pointer" @click="handleEyeClick">
            <i :class="passwordEyeClass" id="togglePassword"></i>
          </div>
        </div>
        <div class="position-relative mb-3" v-if="currentStep > 0">
          <label class="form-label form-label-2"
            ><i class="icon icon-lock"></i
          ></label>
          <input
            type="text"
            class="form-control form-control-2"
            placeholder="請輸入驗證碼(一次性密碼)"
            v-model.trim="inputData.otp"
            title="請輸入驗證碼(一次性密碼)"
            required
          />
        </div>
        <div class="row text-end form-word text-decoration-underline">
          <div class="col-12 ml-4">
            <span class="cursor-pointer" @click="goto('router', '/')"
              >回登入</span
            >
          </div>
        </div>
        <!-- 聯繫我們 -->
        <div class="mt-3">
          <div class="row form-word text-center">
            <div class="col-12 ml-4">
              {{
                !showSendOtpBtn
                  ? `還沒有收到驗證碼嗎？請等候${showText()}s後再重新發送`
                  : ""
              }}<br />
              <a
                @click="goto('toBrowser', LINE_OA_URL)"
                class="text-muted"
                >聯繫我們</a
              >
            </div>
          </div>
        </div>
        <div
          class="btn-container mt-4 text-center d-flex justify-content-center"
        >
          <button
            class="btn btn-next cursor-pointer"
            type="submit"
            @click.prevent="handleSubmit"
          >
            <i class="icon icon-next"></i>
          </button>
        </div>
      </form>
    </div>
    <!-- form end -->
  </section>
</template>

<style lang="scss" scoped></style>
