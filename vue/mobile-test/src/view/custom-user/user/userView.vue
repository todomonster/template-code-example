<script>
import { useGlobalStore } from "@/store/global";
import { ExtCall } from "@/utils/extCall";
import {
  Toast,
  ToastConfirm,
  ToastInputConfirm,
} from "@/components/global/swal";
import { ref, onMounted } from "vue";
import { errorHandle } from "@/utils/errorHandle";
import { apiLogout, apiUserSaveFcmToken, apiGetUserInfo } from "@/api/myfree";

export default {
  setup() {
    const globalStore = useGlobalStore();
    const goto = globalStore.goto;
    const userData = ref({});

    const VUE_APP_VERSION = process.env.VUE_APP_VERSION;

    const link = ["https://myfree.tako.life/privacy"];

    const isLogin = ref(false);

    const handleWebView = (openUrl) => {
      try {
        ExtCall.openNewWebView(openUrl);
      } catch (error) {
        goto("href", link[0]);
      }
    };
    const logout = async () => {
      // 有做清除cookie和storage處理
      try {
        const confirm = await ToastConfirm("是否要登出?");
        if (confirm) {
          const response = await apiUserSaveFcmToken("null");
          await apiLogout();
          goto("storeGoLogin");
        }
      } catch (error) {
        await apiLogout();
        goto("storeGoLogin");
        errorHandle(error);
      }
    };

    const handleData = (userInfo = {}) => {
      let { mobile, gender, age, nickname } = userInfo;

      nickname = nickname ? nickname : "-";
      mobile = mobile ? mobile : "";
      gender = gender ? (gender === "male" ? "男" : "女") : "-";
      age = age
        ? age == 9
          ? "90以上"
          : age == 0
          ? "0~9"
          : `${age}0~${age}9`
        : "-";

      return {
        mobile,
        gender,
        age,
        nickname,
      };
    };

    onMounted(async () => {
      try {
        if (localStorage.getItem("is_Login") == "1") {
          const response = await apiGetUserInfo();
          userData.value = handleData(response);
          isLogin.value = true;
        } else {
          isLogin.value = false;
        }
      } catch (error) {
        errorHandle(error);
      }
    });
    return {
      goto,
      VUE_APP_VERSION,
      logout,
      handleWebView,
      link,
      userData,
      isLogin,
    };
  },

  components: {},
};
</script>

<template>
  <!-- 內容 -->
  <section class="c-main">
    <div class="navbar-container">
      <div class="member-container">
        <div class="avatar-container" @click="goto('router', '/setting/edit')">
          <div class="image"><img src="@/assets/images/noavatar.png" /></div>
          <div class="camera-container">
            <button class="btn btn-edit" type="button">
              <i class="icon icon-edit"></i>
            </button>
          </div>
        </div>
        <div class="mobile-container">
          <div class="title" v-if="userData.mobile">
            {{ userData.mobile }}
          </div>
          <div
            class="title text-success"
            @click="goto('router', '/login')"
            v-if="!userData.mobile"
          >
            <a class="text-reset">登入</a>
          </div>
        </div>
        <div class="item-container item-container-2">
          <div class="d-flex">
            <div class="col-left">暱稱</div>
            <div class="col-right">{{ userData.nickname }}</div>
          </div>
          <div class="d-flex">
            <div class="col-left">性別</div>
            <div class="col-right">{{ userData.gender }}</div>
          </div>
          <div class="d-flex">
            <div class="col-left">年齡層</div>
            <div class="col-right">{{ userData.age }}</div>
          </div>
          <!-- <div class="d-flex">
            <div class="col-left">預設好康店範圍</div>
            <div class="col-right">台中市 北屯區</div>
          </div> -->
        </div>
        <div class="mt-3">
          <div class="form-word-2 text-center">
            請填寫完整資料才能享有myFrees優惠喔
          </div>
        </div>
        <div class="list-container mt-5 pb-5">
          <a class="list-link" @click="goto('router', '/store/favorite')">
            <div class="image"><i class="icon icon-favorite"></i></div>
            <div class="title">收藏店家</div>
          </a>
          <!-- <a  class="list-link">
            <div class="image"><i class="icon icon-feedback"></i></div>
            <div class="title">意見反饋</div>
          </a> -->
          <a class="list-link" @click="handleWebView(link[0])">
            <div class="image"><i class="icon icon-privacy"></i></div>
            <div class="title">隱私權條款</div>
          </a>
          <a class="list-link border-0" @click="logout" v-if="isLogin">
            <div class="image"><i class="icon icon-signout"></i></div>
            <div class="title">登出</div>
          </a>
        </div>
      </div>
      <!-- <div class="edit-container">
        <div class="version">{{ VUE_APP_VERSION }}</div>
      </div> -->
      <!-- {{VUE_APP_VERSION + '123'}} -->
    </div>
  </section>
</template>
