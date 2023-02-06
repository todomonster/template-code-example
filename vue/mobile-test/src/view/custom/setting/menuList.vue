<script>
import { ref, onMounted, computed } from "vue";
import {
  Toast,
  ToastConfirm,
  ToastInputConfirm,
} from "@/components/global/swal";
import { useGlobalStore } from "@/store/global";
import { errorHandle } from "@/utils/errorHandle";

import img_06 from "@/assets/icon/member06.svg";
import img_09 from "@/assets/icon/member09.png";
// call api
import { apiLogout, apiStoreSaveFcmToken, apiStoreRemove } from "@/api/myfree";

import { ExtCall } from "@/utils/extCall";

import ArrowIcon from "@/components/global/ArrowIcon.vue";

export default {
  name: "MenuList",
  setup() {
    const globalStore = useGlobalStore();
    const goto = globalStore.goto;
    const VUE_APP_VERSION = process.env.VUE_APP_VERSION;

    const link = ["https://myfree.tako.life/privacy", "/setting/qrCode", "/setting/recommender"];
    const handleWebView = (openUrl) => {
      try {
        ExtCall.openNewWebView(openUrl);
      } catch (error) {
        goto("href", link[0]);
      }
    };
    const removeAccount = async () => {
      const confirm = await ToastConfirm("🚨確定要刪除帳號?");
      if (confirm) {
        const response = await apiStoreRemove();
        if (response.result) {
          await apiLogout();
          Toast("刪除成功");
          setTimeout(() => goto("router", "/"), 800);
        } else {
          Toast("刪除失敗");
        }
      }
    };
    const logout = async () => {
      // 有做清除cookie和storage處理
      try {
        const confirm = await ToastConfirm("是否要登出?");
        if (confirm) {
          const response = await apiStoreSaveFcmToken({
            token: "null",
            type: "store",
          });
          // console.log(JSON.stringify(response), "fcm");
          await apiLogout();
          goto("router", "/");
        }
      } catch (error) {
        errorHandle(error);
      }
    };

    return {
      link,
      goto,
      img_09,
      img_06,
      logout,
      handleWebView,
      removeAccount,
      VUE_APP_VERSION,
    };
  },
  components: { ArrowIcon },
};
</script>

<template>
  <div class="main">
    <ul class="list-group list-group-flush">
      <div class="listItem">
        <button
          type="button"
          class="list-group-item list-group-item-action"
          @click="handleWebView(link[0])"
        >
          <div class="d-flex justify-content-between grey">
            <div>
              <i class="fa fa-lock mx-1" aria-hidden="true"></i>
              隱私權條款
            </div>
            <ArrowIcon />
          </div>
        </button>
      </div>
      <div class="listItem">
        <button
          type="button"
          class="list-group-item list-group-item-action"
          @click="goto('router', link[2])"
        >
          <div class="d-flex justify-content-between grey">
            <div>
              <i class="fa fa-file mx-1" aria-hidden="true"></i>
              綁定的使用者
            </div>
            <ArrowIcon />
          </div>
        </button>
      </div>
      <div class="listItem">
        <button
          type="button"
          class="list-group-item list-group-item-action"
          @click="goto('router', link[1])"
        >
          <div class="d-flex justify-content-between grey">
            <div>
              <i class="fa fa-qrcode mx-1" aria-hidden="true"></i>
              QR Code
            </div>
            <ArrowIcon />
          </div>
        </button>
      </div>
      <div class="listItem">
        <button
          type="button"
          class="list-group-item list-group-item-action"
          @click="logout"
        >
          <div class="d-flex justify-content-between grey">
            <div>
              <i class="fa fa-sign-out mx-1" aria-hidden="true"></i>
              登出
            </div>
            <ArrowIcon />
          </div>
        </button>
      </div>
      <div class="listItem">
        <button
          type="button"
          class="list-group-item list-group-item-action"
          @click="removeAccount"
        >
          <div class="d-flex justify-content-between grey">
            <div>
              <i class="fa fa-window-close mx-1" aria-hidden="true"></i>
              刪除帳號
            </div>
            <ArrowIcon />
          </div>
        </button>
      </div>
      <span class="version">{{ VUE_APP_VERSION }}</span>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.grey {
  color: #7d7d7d;
}

.version {
  color: #f3f6f4;
  position: fixed;
  bottom: 10%;
  left: 45%;
}

.main {
  margin-top: $header-height;
  margin-bottom: calc($footer-height + 15px);
  padding: 0rem;

  .listItem {
    border-bottom: 0px solid #e8e8e8;

    button {
      height: 50px;
      font-size: 1rem;
      font-weight: 400;
      border: none;
    }
  }
}
</style>
