<script>
import { ref, onMounted, computed } from "vue";
import {
  Toast,
  ToastConfirm,
  ToastInputConfirm,
} from "@/components/global/swal";
import { useGlobalStore } from "@/store/global";

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

    const member = ref({
      avatarUrl: "",
      name: "",
      gender: "male",
      phoneNumber: "0912345688",
      mail: "abc@gmail.com",
    });
    const avatarImgUrl = computed(() =>
      member.value?.avatarUrl ? member.value?.avatarUrl : ""
    );

    onMounted(async () => {});

    const link = ["https://myfree.tako.life/privacy", "/setting/qrCode"];
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
    };
    // const testExtCall = (type) => {
    //   try {
    //     if (type == "startGPS") {
    //       console.log(type, 1);
    //       let Input = "";
    //       window.ExtCallStartGPS = (val) => (Input = val);
    //       ExtCallGPS.startGPS("ExtCallStartGPS");
    //       setTimeout(() => console.log(Input), 100);
    //     }
    //     if (type == "stopGPS") {
    //       console.log(type, 2);
    //       ExtCallGPS.stopGPS();
    //     }
    //     if (type == "getCurrentLocation") {
    //       console.log(type, 3);
    //       let Input = { time: "", lat: "", long: "" };
    //       window.ExtCallGetCurrentLocation = (time, lat, long) => {
    //         Input = { time, lat, long };
    //       };
    //       ExtCallGPS.getCurrentLocation("ExtCallGetCurrentLocation");
    //       setTimeout(() => console.log(Input), 100);
    //     }
    //     if (type == "getUserLocationHistory") {
    //       console.log(type, 4);
    //       let Input = {};
    //       window.ExtCallGetUserLocationHistory = (val) => (Input = val);
    //       ExtCallGPS.getUserLocationHistory("ExtCallGetUserLocationHistory");
    //       setTimeout(() => console.log(JSON.stringify(Input)), 100);
    //     }
    //   } catch (error) {
    //     console.log(error, "QQQQQ");
    //   }
    // };

    return {
      member,
      link,
      goto,
      img_09,
      img_06,
      logout,
      avatarImgUrl,
      handleWebView,
      removeAccount,
      VUE_APP_VERSION,
      // testExtCall,
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
          @click="goto('router', link[1])"
        >
          <div class="d-flex justify-content-between grey">
            <div>
              <i class="fa fa-qrcode mx-1" aria-hidden="true"></i>
              掃描/下載 QR Code
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
      <!-- <div class="listItem">
        <button
          type="button"
          class="list-group-item list-group-item-action"
          @click="testExtCall('startGPS')"
        >
          <div class="d-flex justify-content-between grey">
            <div>
              <i class="fa fa-sign-out mx-1" aria-hidden="true"></i>
              startGPS
            </div>
            <ArrowIcon />
          </div>
        </button>
      </div> -->
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
