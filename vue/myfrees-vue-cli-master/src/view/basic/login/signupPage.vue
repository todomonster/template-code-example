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
      city: 11,
      area: 119,
      address: "大連路二段101號",
      contact: "心老闆",
      rewardRange: 1,
      all_addr: "xx",
      is_open: 0,
      price_range: "$$$",
    });
    const password2 = ref("newpci1qaz");

    const showSendOtpBtn = ref(true);
    const showVerifyOtpBtn = ref(false);
    const showJoinBtn = ref(false);
    const form = ref(null);
    const form2 = ref(null);

    const sendOtp = async ($event) => {
      $event.preventDefault();

      if (form.value.reportValidity()) {
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
        showVerifyOtpBtn.value = true;
        // } else {
        //   errorHandle(response);
        // }
      }
    };

    const handleOtpVerify = async ($event) => {
      $event.preventDefault();
      if (form.value.reportValidity()) {
        //驗證簡訊
        // const response = await apiVerifyOtp(inputData.value.mobile, {
        //   verify_code: inputData.value.verifyCode,
        // });
        // if (response.success === "OK") {
        //   // 開啟註冊畫面
        //   showJoinBtn.value = true;
        // } else {
        //   errorHandle(response);
        // }
        showJoinBtn.value = true;
        showSendOtpBtn.value = false;
        showVerifyOtpBtn.value = false;
      }
    };

    const handleRegister = async ($event) => {
      $event.preventDefault();
      if (form2.value.reportValidity()) {
        if (inputData.value.password != password2.value) {
          Toast("密碼不相符，請再確認!");
          return;
        }
        const response = await apiStoreRegister(inputData.value);
        if (response.success === "OK") {
          Toast("加入會員成功");
          goto("router", `/`);
        } else {
          errorHandle(response);
        }
      }
    };
    // ========
    onMounted(() => {
      init();
      setCountDown();
    });
    onBeforeRouteLeave((to, from, next) => {
      handleRouterLeave();
      next();
    });
    // ========
    return {
      inputData,
      form,
      form2,
      handleRegister,
      showVerifyOtpBtn,
      sendOtp,
      password2,
      optText,
      handleOtpVerify,
      // =========
      showText,
      // =========
      showJoinBtn,
      showSendOtpBtn
    };
  },
};
</script>

<template>
  <div class="fullScreen">
    <div class="signup">
      <div class="title">會員註冊</div>
      <div class="signup-main">
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
        </form>
        <div class="mb-3" v-if="showVerifyOtpBtn">
          <input
            type="text"
            class="form-control"
            placeholder="請輸入驗證碼"
            title="簡訊驗證碼"
            v-model="inputData.verifyCode"
          />
        </div>
        <form ref="form2">
          <div class="mb-3" v-if="showJoinBtn">
            <input
              type="password"
              class="form-control"
              placeholder="請輸入密碼"
              pattern="^(?=.*[A-Za-z])(?=.*[0-9]).{8,20}$"
              title="8~20個字元(包含英文及數字)"
              v-model="inputData.password"
              required
            />
          </div>
          <div class="mb-3" v-if="showJoinBtn">
            <input
              type="password"
              class="form-control"
              placeholder="請再次確認密碼"
              v-model="password2"
              required
            />
          </div>
          <!-- 
            storeImg
            storeName
            contact
            cityId areaId
            address
            telephone
            storeOpenTime
            storeCategory
            priceRange

          -->
        </form>

        <div class="mt-4b btn-container">
          <div class="row">
            <div class="col" v-if="showSendOtpBtn">
              <button
                class="btn btn-primary"
                type="button"
                @click.prevent="sendOtp"
              >
                {{ `${optText}` }}{{ showText() }}
              </button>
            </div>
            <div class="col" v-if="showVerifyOtpBtn">
              <button
                class="btn btn-primary"
                type="button"
                @click.prevent="handleOtpVerify"
              >
                驗證簡訊
              </button>
            </div>
            <div class="col" v-if="showJoinBtn">
              <button
                class="btn btn-primary"
                type="button"
                @click="handleRegister"
              >
                加入會員
              </button>
            </div>
          </div>
        </div>
        <div class="login-main2">
          <!-- <div @click="$router.push({ path: '/home' })">訪客登入</div>
          <div>.</div> -->
          <div @click="$router.push({ path: '/' })">回登入頁</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style/login.scss";
</style>
