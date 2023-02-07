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
import {
  apiLogout,
  apiUserSaveFcmToken,
  apiGetUserInfo,
  apiRemoveUser,
  apiGenQrcode,
} from "@/api/myfree";

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
    const removeAccount = async () => {
      try {
        const confirm = await ToastConfirm("🚨確定要刪除帳號?");
        if (confirm) {
          const response = await apiRemoveUser();
          if (response.result) {
            await apiLogout();
            Toast("刪除成功");
            setTimeout(() => goto("router", "/"), 800);
          } else {
            Toast("刪除失敗");
          }
        }
      } catch (error) {
        errorHandle(error);
      }
    };

    const handleData = (userInfo = {}) => {
      let { mobile, gender, age, image, bindStoreId, bindUserId } = userInfo;

      let nickname = "-";
      if (userInfo.nickname == "null" || !userInfo.nickname) {
        nickname = "-";
      } else {
        nickname = userInfo.nickname;
      }

      mobile = mobile ? mobile : "";
      gender = gender ? (gender === "male" ? "男" : "女") : "-";
      image = image ? image : "";

      switch (age) {
        case 0:
          age = "0~9歲";
          break;
        case 1:
          age = "10~19歲";
          break;
        case 2:
          age = "20~29歲";
          break;
        case 3:
          age = "30~39歲";
          break;
        case 4:
          age = "40~49歲";
          break;
        case 5:
          age = "50~59歲";
          break;
        case 6:
          age = "60~69歲";
          break;
        case 7:
          age = "70~79歲";
          break;
        case 8:
          age = "80~89歲";
          break;
        case 9:
          age = "90歲以上";
          break;
        default:
          age = "-";
      }

      return {
        mobile,
        gender,
        age,
        nickname,
        image,
        bindStoreId,
        bindUserId,
      };
    };
    const qrcodeUrl = ref("因為意外無法正確轉換");
    const recommendMember = async (type) => {
      try {
        let message = `邀請您加入myFrees會員，立即加入得300點，消費立即索取福利金，點數換現金。`;
        if (qrcodeUrl.value != "因為意外無法正確轉換") {
          message += ` 連結: ${qrcodeUrl.value}`;
        }

        // 手機版是呼叫分享
        ExtCall.shareFile({
          subject: "share",
          title: "store_qr_code",
          message,
        });
      } catch (error) {
        Toast("僅支援手機分享");
      }
    };
    onMounted(async () => {
      try {
        if (localStorage.getItem("is_Login") == "1") {
          const response = await apiGetUserInfo();
          userData.value = handleData(response);
          isLogin.value = true;

          // 處理 推薦人
          const { bindStoreId = null, bindUserId = null } = userData.value;
          const responseUrl = await apiGenQrcode({
            storeId: bindStoreId,
            userId: bindUserId,
          });

          if (responseUrl) {
            qrcodeUrl.value = responseUrl;
          }
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
      removeAccount,
      recommendMember,
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
          <div class="image">
            <img
              :src="userData.image"
              onerror="this.onerror=null; this.src='https://fakeimg.pl/150x150/?text=使用者&font=noto'"
              v-if="userData.image"
            />
            <img src="@/assets/images/noavatar.png" v-if="!userData.image" />
          </div>
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
            <div class="col-right">
              {{ userData.nickname ? userData.nickname : "-" }}
            </div>
          </div>
          <div class="d-flex">
            <div class="col-left">性別</div>
            <div class="col-right">
              {{ userData.gender ? userData.gender : "-" }}
            </div>
          </div>
          <div class="d-flex">
            <div class="col-left">年齡層</div>
            <div class="col-right">{{ userData.age ? userData.age : "-" }}</div>
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
          <a class="list-link" @click="recommendMember">
            <div class="image"><i class="icon icon-member"></i></div>
            <div class="title">推薦會員</div>
          </a>
          <!-- <a  class="list-link">
            <div class="image"><i class="icon icon-feedback"></i></div>
            <div class="title">意見反饋</div>
          </a> -->
          <a class="list-link" @click="handleWebView(link[0])">
            <div class="image"><i class="icon icon-privacy"></i></div>
            <div class="title">隱私權條款</div>
          </a>
          <a class="list-link border-0" @click="logout" v-show="isLogin">
            <div class="image"><i class="icon icon-signout"></i></div>
            <div class="title">登出</div>
          </a>
        </div>
      </div>
      <div
        class="mt-3 text-danger text-center text-decoration-underline"
        v-show="isLogin"
        @click="removeAccount"
      >
        刪除帳號
      </div>
      <!-- {{VUE_APP_VERSION + '123'}} -->
    </div>
  </section>
</template>
