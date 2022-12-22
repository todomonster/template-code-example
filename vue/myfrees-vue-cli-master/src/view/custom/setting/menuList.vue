<script>
import { ref, onMounted, computed } from "vue";
import { ToastConfirm, ToastInputConfirm } from "@/components/global/swal";
import { useGlobalStore } from "@/store/global";

import img_06 from "@/assets/icon/member06.svg";
import img_09 from "@/assets/icon/member09.png";
// call api
import { apiLogout, apiStoreSaveFcmToken } from "@/api/myfree";

import { ExtCall } from "@/utils/extCall";

import ArrowIcon from "@/components/global/ArrowIcon.vue";

export default {
  name: "MenuList",
  setup() {
    const globalStore = useGlobalStore();
    const goto = globalStore.goto;

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
    const logout = async () => {
      // 有做清除cookie和storage處理
      const confirm = await ToastConfirm("是否要登出?");
      if (confirm) {
        
        const response = await apiStoreSaveFcmToken({
          token: "null",
          type: "store",
        });
        console.log(JSON.stringify(response), "fcm");
        await apiLogout();
        goto("router", "/");
      }
    };
    // const testExtCall = () => {
    //   try {
    //     let ScanCode = "";
    //     window.openScanCode = (appScanCode) => (ScanCode = appScanCode);
    //     ExtCall.openScanCode("openScanCode");
    //     setTimeout(() => console.log(ScanCode), 100);
    //   } catch (error) {
    //     console.log(error);
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
      <!-- <div class="listItem">
        <button
          type="button"
          class="list-group-item list-group-item-action"
          @click="testExtCall"
        >
          <div class="d-flex justify-content-between grey">
            <div>
              <i class="fa fa-sign-out mx-1" aria-hidden="true"></i>
              testExtCall 呼叫相機
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
