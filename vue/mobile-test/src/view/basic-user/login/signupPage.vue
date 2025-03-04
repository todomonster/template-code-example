<script>
import { ref, computed, onMounted } from "vue";
import { Toast, ToastConfirm, ToastHtml } from "@/components/global/swal";
import { errorHandle } from "@/utils/errorHandle";
import {
  apiPushOtp,
  apiVerifyOtp,
  apiCheckAccount,
  apiRestoreUser,
} from "@/api/myfree";
import { useGlobalStore } from "@/store/global";

import { useCoolDownStore } from "@/store/smsCoolDown2";
import { onBeforeRouteLeave } from "vue-router";

import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

export default {
  emits: ["mode"],
  setup() {
    const { query } = useRoute();
    const byPassOtp = false;
    // ========
    const smsCoolDown = useCoolDownStore();
    const { isSmsCoolDownOk } = storeToRefs(smsCoolDown);
    const { showText, setCountDown, smsSendDate, handleRouterLeave, init } =
      smsCoolDown;
    // ========

    const globalStore = useGlobalStore();
    const { goto, setUserData } = globalStore;
    const { isToAddStore } = storeToRefs(globalStore);

    const inputData = ref({
      mobile: "",
      password: "",
      password2: "",
      verifyCode: "",
      userId: "",
      storeId: "",
    });

    const showSendOtpBtn = computed(() => (showText() ? false : true));

    const form1 = ref(null);

    const currentStep = ref(0); //0沒發送&沒驗證簡訊//1已發送&沒驗證//2已發送&已驗證//

    const handleCheckAccount = async () => {
      const checkResponse = await apiCheckAccount({
        type: "user",
        mobile: inputData.value.mobile,
      });
      // registerStatus:1
      if (checkResponse.is_regist === true) {
        Toast("此帳號已存在!");
        return false;
      }
      // registerStatus:2
      if (checkResponse.registerStatus === 2) {
        let swal = await ToastConfirm("檢查到帳號已刪除，是否復原帳號?");
        let restoreResponse = {};
        if (swal) {
          restoreResponse = await apiRestoreUser({
            mobile: inputData.value.mobile,
          });
        }
        if (restoreResponse.result) {
          errorHandle(restoreResponse);
          // 成功啟用 跳轉
          goto("router", "/login/index");
        }
        return false;
      }
      // registerStatus:3
      if (checkResponse.registerStatus === 3) {
        errorHandle(checkResponse);
        return false;
      }

      return true;
    };

    const sendOtp = async ($event) => {
      $event.preventDefault();
      if (byPassOtp === true) {
        currentStep.value = 2;
        return;
      }
      if (currentStep.value === 2) {
        return;
      }

      if (form1.value.reportValidity()) {
        // 先檢查是否存在
        // const checkStatus = await apiCheckAccount({
        //   type: "user",
        //   mobile: inputData.value.mobile,
        // });
        // if (checkStatus.is_regist === true) {
        //   Toast("此帳號已存在!");
        //   return;
        // }
        const checkFlag = await handleCheckAccount();
        if (!checkFlag) return;

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
        const response = await apiPushOtp({ mobile: inputData.value.mobile });
        if (response.success === "OK" || response.result) {
          Toast("驗證碼已發送");
          if (currentStep.value !== 2) {
            currentStep.value = 1;
          }
        } else {
          errorHandle(response);
        }
      }
    };

    const handleOtpVerify = async ($event) => {
      $event.preventDefault();
      if (!inputData.value.verifyCode.trim()) {
        Toast("請輸入驗證碼");
        return;
      }
      if (form1.value.reportValidity()) {
        //驗證簡訊
        const response = await apiVerifyOtp(inputData.value.mobile, {
          verify_code: inputData.value.verifyCode,
        });
        if (response.success === "OK") {
          // 開啟註冊畫面
          currentStep.value = 2;
        } else {
          errorHandle(response);
        }
      }
    };
    const handleToEditPage = ($event) => {
      // 檢查相同
      $event.preventDefault();
      if (inputData.value.password !== inputData.value.password2) {
        Toast("密碼不相符，請再確認!");
        return;
      }
      if (form1.value.reportValidity()) {
        // pinia 存檔
        const {
          mobile = "",
          password = "",
          userId = "",
          storeId = "",
        } = inputData.value;
        setUserData({
          status: true,
          mobile,
          password,
          userId,
          storeId,
        });
        goto("router", "/setting/edit");
      }
    };
    const handleArrowBtn = ($event) => {
      if (currentStep.value === 0) {
        sendOtp($event);
      } else if (currentStep.value === 1) {
        handleOtpVerify($event);
      } else if (currentStep.value === 2) {
        handleToEditPage($event);
      }
    };
    // ========
    onMounted(() => {
      if (query.storeId) {
        inputData.value.storeId = query.storeId;
      }
      if (query.userId) {
        inputData.value.userId = query.userId;
      }
      // 計時器初始化
      init();
      setCountDown();
      // 如果pinia有phone currentStep跳到2 +給予 手機 + 密碼
      const { mobile, password } = isToAddStore.value;
      if (mobile) {
        inputData.value.mobile = mobile;
        inputData.value.password = password;
        inputData.value.password2 = password;
        currentStep.value = 2;
      }
    });
    onBeforeRouteLeave((to, from, next) => {
      handleRouterLeave();
      next();
    });
    // ========
    const passwordEyeClass = ref("icon icon-eye");
    const passwordType = ref("password");
    const handleEyeClick = () => {
      const className = passwordEyeClass.value;
      passwordEyeClass.value =
        className === "icon icon-eye" ? "icon-eye-slash" : "icon icon-eye";
      passwordType.value = className === "icon-eye-slash" ? "password" : "";
    };

    let openToast = true;
    const handlePhoneFocus = async () => {
      const { storeId, userId } = inputData.value;
      if (!storeId && !userId && openToast) {
        const swal = await ToastHtml(
          "注意!",
          `
<span>
目前您不是透過推薦連結進行註冊，您可以重新點選分享的連結或是再次掃描店家QRCode，若您無推薦連結，也可以略過繼續註冊。
</span>`,
          false,
          "我知道了"
        );

        if (swal.isConfirmed) {
          openToast = false;
        }
      }
    };

    return {
      inputData,
      form1,

      handleArrowBtn,
      sendOtp,

      // =========
      showText,
      currentStep,
      // =========

      showSendOtpBtn,
      passwordEyeClass,
      passwordType,
      handleEyeClick,
      goto,

      handlePhoneFocus,
    };
  },
};
</script>

<template>
  <div class="form-container form-container-2">
    <span class="text-muted">註冊</span>
    <form ref="form1">
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
          :disabled="currentStep == 2"
          @click="handlePhoneFocus"
        />
        <div
          class="form-icon cursor-pointer"
          @click.prevent="sendOtp"
          v-if="showSendOtpBtn"
        >
          <i class="icon icon-reset"></i>
        </div>
      </div>
      <div
        class="position-relative mb-3"
        v-if="currentStep > 0 && currentStep < 2"
      >
        <label class="form-label form-label-2"
          ><i class="icon icon-lock"></i
        ></label>
        <input
          type="text"
          class="form-control form-control-2"
          placeholder="請輸入驗證碼"
          v-model.trim="inputData.verifyCode"
          title="簡訊驗證碼"
        />
      </div>
      <div class="position-relative mb-3" v-if="currentStep > 1">
        <label class="form-label form-label-2"
          ><i class="icon icon-lock"></i
        ></label>
        <input
          :type="passwordType"
          class="form-control form-control-2"
          placeholder="請輸入密碼"
          v-model.trim="inputData.password"
          title="8~20個字元(包含英文及數字)"
          pattern="^(?=.*[A-Za-z])(?=.*[0-9]).{8,20}$"
          required
        />
        <div class="form-icon cursor-pointer" @click="handleEyeClick">
          <i :class="passwordEyeClass" id="togglePassword"></i>
        </div>
      </div>
      <div class="position-relative mb-3" v-if="currentStep > 1">
        <label class="form-label form-label-2"
          ><i class="icon icon-lock"></i
        ></label>
        <input
          :type="passwordType"
          class="form-control form-control-2"
          placeholder="請再次確認密碼"
          v-model.trim="inputData.password2"
          title="請再次確認密碼"
          required
        />
        <div class="form-icon cursor-pointer" @click="handleEyeClick">
          <i :class="passwordEyeClass" id="togglePassword2"></i>
        </div>
      </div>
      <div
        class="row text-end form-word text-decoration-underline cursor-pointer"
      >
        <div class="col-12 ml-4">
          <span class="cursor-pointer" @click="goto('router', '/login')"
            >回登入</span
          >
        </div>
      </div>
      <div class="mt-5">
        <div class="row form-word text-center">
          <div class="col-12 ml-4">
            {{
              !showSendOtpBtn
                ? `還沒有收到驗證碼嗎？請等候${showText()}s後再重新發送`
                : ""
            }}<br />
            <a
              @click="goto('toBrowser', 'https://lin.ee/5gF3ojK')"
              class="text-muted"
              >聯繫我們</a
            >
          </div>
        </div>
      </div>

      <div class="btn-container mt-5 text-center cursor-pointer">
        <button
          class="btn btn-next"
          type="submit"
          @click.prevent="handleArrowBtn"
        >
          <i class="icon icon-next"></i>
        </button>
      </div>
    </form>
    <!-- form end -->
  </div>
</template>

<style lang="scss" scoped></style>
