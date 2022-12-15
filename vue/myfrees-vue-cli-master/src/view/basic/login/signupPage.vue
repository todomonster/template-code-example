<script>
import { ref, computed, onMounted } from "vue";
import { Toast } from "@/components/global/swal";
import { errorHandle } from "@/utils/errorHandle";
import { apiPushOtp, apiVerifyOtp, apiStoreRegister } from "@/api/myfree";
import { useGlobalStore } from "@/store/global";

import { useCoolDownStore } from "@/store/smsCoolDown2";
import { onBeforeRouteLeave } from "vue-router";

import { storeToRefs } from "pinia";
export default {
  setup() {
    // ========
    const smsCoolDown = useCoolDownStore();
    const { isSmsCoolDownOk } = storeToRefs(smsCoolDown);
    const { showText, setCountDown, smsSendDate, handleRouterLeave, init } =
      smsCoolDown;
    // ========

    const globalStore = useGlobalStore();
    const goto = globalStore.goto;

    const optText = ref("發送");
    const inputData = ref({
      mobile: "0988287945",
      password: "newpci1qaz",
      verifyCode: "1234",
      name: "心居酒屋",
      contact: "心老闆",
      city: 11,
      area: 119,
      address: "大連路二段101號",
      rewardRange: 1,
      all_addr: "xx",
      is_open: 0,
      price_range: "$$$",
    });
    const password2 = ref("newpci1qaz");

    const showSendOtpBtn = ref(true);
    const showVerifyOtpBtn = ref(false);

    const form1 = ref(null);

    const currentStep = ref(0);//0沒發送&沒驗證簡訊//1已發送&沒驗證//2已發送&已驗證//3跳轉

    const sendOtp = async ($event) => {
      $event.preventDefault();

      if (form1.value.reportValidity()) {
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
        // const response = await apiPushOtp({ mobile: inputData.value.mobile });
        // if (response.success === "OK") {
        Toast("驗證碼已發送");
        currentStep.value = 1;
        // } else {
        //   errorHandle(response);
        // }
      }
    };

    const handleOtpVerify = async ($event) => {
      $event.preventDefault();
      if (form1.value.reportValidity()) {
        //驗證簡訊
        // const response = await apiVerifyOtp(inputData.value.mobile, {
        //   verify_code: inputData.value.verifyCode,
        // });
        // if (response.success === "OK") {
        //   // 開啟註冊畫面

        // } else {
        //   errorHandle(response);
        // }

        showSendOtpBtn.value = false;

      }
    };

    // const handleRegister = async ($event) => {
    //   $event.preventDefault();
    //   if (form2.value.reportValidity()) {
    //     if (inputData.value.password != password2.value) {
    //       Toast("密碼不相符，請再確認!");
    //       return;
    //     }
    //     const response = await apiStoreRegister(inputData.value);
    //     if (response.success === "OK") {
    //       Toast("加入會員成功");
    //       goto("router", `/`);
    //     } else {
    //       errorHandle(response);
    //     }
    //   }
    // };
    const handleArrowBtn = () => {
      console.log(1);
      
      // sendOtp();
      // handleOtpVerify();

      // handleRegister();
    };
    // ========
    onMounted(() => {
      document.body.className = "c-login";
      init();
      setCountDown();
    });
    onBeforeRouteLeave((to, from, next) => {
      document.body.className = "";
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
    return {
      inputData,
      form1,
      handleArrowBtn,

      sendOtp,
      password2,
      optText,
      handleOtpVerify,
      // =========
      showText,
      // =========

      showSendOtpBtn,
      passwordEyeClass,
      passwordType,
      handleEyeClick,
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
        <img src="@/assets/images/logo.png" />
      </div>
    </div>
    <!-- form 1 -->
    <div class="form-container form-container-2">
      <form ref="form1">
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
          <div class="form-icon cursor-pointer" @click.prevent="sendOtp" v-if="showSendOtpBtn">
            <i class="icon icon-reset"></i>
          </div>
        </div>
        <div class="position-relative mb-3">
          <label class="form-label form-label-2"
            ><i class="icon icon-lock"></i
          ></label>
          <input
            type="text"
            class="form-control form-control-2"
            placeholder="請輸入驗證碼"
            v-model="inputData.verifyCode"
            title="簡訊驗證碼"
            required
          />
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
            title="8~20個字元(包含英文及數字)"
            pattern="^(?=.*[A-Za-z])(?=.*[0-9]).{8,20}$"
            required
          />
          <div class="form-icon cursor-pointer" @click="handleEyeClick">
            <i :class="passwordEyeClass" id="togglePassword"></i>
          </div>
        </div>
        <div class="position-relative mb-3">
          <label class="form-label form-label-2"
            ><i class="icon icon-lock"></i
          ></label>
          <input
            :type="passwordType"
            class="form-control form-control-2"
            placeholder="請再次確認密碼"
            v-model="password2"
            title="請再次確認密碼"
            required
          />
          <div class="form-icon cursor-pointer" @click="handleEyeClick">
            <i :class="passwordEyeClass" id="togglePassword2"></i>
          </div>
        </div>
        <div
          class="row form-word text-end text-decoration-underline cursor-pointer"
        >
          <div class="col-12 ml-4" @click="$router.push({ path: '/' })">
            登入
          </div>
        </div>
        <div class="btn-container mt-5 text-center cursor-pointer">
          <button
            class="btn btn-next cursor-pointer"
            type="submit"
            @click.prevent="handleArrowBtn"
          >
            <i class="icon icon-next"></i>
          </button>
        </div>
      </form>
      <!-- form 2 -->
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "./style/login.scss";
</style>
