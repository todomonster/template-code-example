<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Toast } from "@/components/global/swal";
import { errorHandle } from "@/utils/errorHandle";
// import { apiPostOptPassword, apiOtpForget } from "@/api/api";
import { apiStoreForgetPwd, apiStoreChangePwd } from "@/api/myfree";

export default {
  setup() {
    const router = useRouter();
    const inputData = ref({
      verifyCode: "",
      phoneNumber: "",
      newPassword: "",
    });
    const isSendVerify = ref(false);
    const newPassword2 = ref("");
    const form = ref(null);
    const form2 = ref(null);
    let msg = "";

    const sendVerify = async ($event) => {
      $event.preventDefault();
      if (form.value.reportValidity()) {
        //發送簡訊S-1-0-5
        // msg = await apiOtpForget({ phoneNumber: inputData.value.phoneNumber });
        // if (msg.status == true) {
        //   Toast("驗證碼已發送");
        //   isSendVerify.value = true;
        // } else {
        //   let errMessage = errorHandle(msg);
        //   Toast(errMessage);
        // }
      }
    };
    const sendVerify2 = async ($event) => {
      $event.preventDefault();
      if (form.value.reportValidity()) {
        //發送簡訊S-1-0-5
        // msg = await apiOtpForget({ phoneNumber: inputData.value.phoneNumber });
        // if (msg.status == true) {
        //   Toast("驗證碼已發送");
        // } else {
        //   let errMessage = errorHandle(msg);
        //   Toast(errMessage);
        // }
      }
    };

    const send = async ($event) => {
      $event.preventDefault();
      if (form2.value.reportValidity()) {
        // if (inputData.value.newPassword == newPassword2.value) {
        //   msg = await apiPostOptPassword(inputData.value);
        //   if (msg.status == true) {
        //     Toast("密碼已修改，請使用新密碼登入");
        //     router.push({ path: "/" });
        //   } else {
        //     let errMessage = errorHandle(msg);
        //     Toast(errMessage);
        //   }
        // } else {
        //   Toast("密碼不相符，請確認");
        // }
      }
    };

    return {
      form,
      form2,
      newPassword2,
      send,
      sendVerify,
      sendVerify2,
      isSendVerify,
      inputData,
    };
  },
};
</script>

<template>
  <div class="fullScreen">
    <div class="forget">
      <div class="title">忘記密碼</div>
      <div class="main">
        <!-- form1 -->
        <form ref="form">
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="請輸入手機號碼"
              v-model="inputData.phoneNumber"
              pattern="^09\d{2}?\d{3}?\d{3}$"
              title="請輸入手機號碼"
              required
            />
          </div>
        </form>
        <!--  -->
        <div class="mb-3" v-if="isSendVerify">
          <input
            type="text"
            class="form-control"
            placeholder="請輸入驗證碼"
            v-model="inputData.verifyCode"
          />
        </div>
        <form ref="form2">
          <div class="mb-3" v-if="isSendVerify">
            <input
              type="password"
              class="form-control"
              placeholder="請輸入新密碼"
              v-model="inputData.newPassword"
              pattern="^(?=.*[A-Za-z])(?=.*[0-9]).{6,}$"
              title="最少6個字元，需有英文及數字"
            />
          </div>
        </form>
        <div class="mb-3" v-if="isSendVerify">
          <input
            type="password"
            class="form-control"
            placeholder="請再次確認新密碼"
            v-model="newPassword2"
          />
        </div>
      </div>
    </div>
    <div class="mt-4b btn-container">
      <div class="row">
        <div class="col" v-if="!isSendVerify">
          <button
            class="btn btn-primary"
            type="button"
            @click="sendVerify($event)"
          >
            發送驗證碼
          </button>
        </div>
        <div class="col" v-if="isSendVerify">
          <button class="btn btn-primary" type="button" @click="send($event)">
            送出
          </button>
        </div>
        <div class="col" v-if="isSendVerify">
          <button
            class="btn btn-primary"
            type="button"
            @click="sendVerify2($event)"
          >
            重新發送
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
</template>

<style lang="scss" scoped>
// @import "./style/login.scss";
</style>
