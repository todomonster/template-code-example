<script>
import { ref, onMounted } from "vue";
import { apiGenQrcode, apiGetStore } from "@/api/myfree";
import { errorHandle } from "@/utils/errorHandle";
import { apiPrintStoreQRcode } from "@/api/myfree";

import { ExtCall } from "@/utils/extCall";
import { Toast } from "@/components/global/swal";
import { useGlobalStore } from "@/store/global";

export default {
  name: "QrCode",
  setup() {
    const globalStore = useGlobalStore();
    const goto = globalStore.goto;
    const qrcodeUrl = ref("因為意外無法正確轉換");

    let storeName = "";
    let id = null;
    const btnDisable = ref(false);

    onMounted(async () => {
      try {
        const store = await apiGetStore();
        id = store?.id;
        // 讓id=0以及其他數字通過
        if (typeof id !== "number" && id < 0) {
          btnDisable.value = true;
          Toast("取得店家id失敗");
          return;
        }
        storeName = store?.name;
        const responseUrl = await apiGenQrcode({ storeId: id });
        if (responseUrl) {
          qrcodeUrl.value = responseUrl;
        }
      } catch (error) {
        errorHandle(error);
      }
    });
    const canvasToDataUrl = (id = "qrCanvas") => {
      const canvas = document.getElementById(id);
      return canvas.toDataURL();
    };
    const download = async (type) => {
      const aTag = document.createElement("a");
      try {
        aTag.href = canvasToDataUrl("qrCanvas");
        aTag.download = "myfrees_store_qrcode.png";

        let message = `${storeName}邀請您加入myFrees會員，立即加入得300點，消費立即索取福利金，點數換現金。`;
        if (qrcodeUrl.value != "因為意外無法正確轉換") {
          message += ` 連結: ${qrcodeUrl.value}`;
        }

        // 手機版是呼叫分享
        ExtCall.shareFile({
          subject: "share",
          title: "store_qr_code",
          message,
          base64: aTag.href,
        });
      } catch (error) {
        // 電腦版是下載
        document.body.appendChild(aTag);
        aTag.click();
        document.body.removeChild(aTag);
      }
    };

    const handlePrint = () => {
      // open /api/admin/v1/download/files?storeId=40
      let QR_DOWNLOAD_URL = process.env.VUE_APP_STORE_QR_DOWNLOAD_URL;
      if (id) QR_DOWNLOAD_URL += id;
      goto("toBrowser", QR_DOWNLOAD_URL);
    };

    return { qrcodeUrl, download, btnDisable, handlePrint };
  },
  components: {},
};
</script>

<template>
  <div class="main-content">
    <div class="row text-center">
      <div class="col">
        <vue-qrcode
          :value="qrcodeUrl"
          :options="{ width: 325 }"
          id="qrCanvas"
        ></vue-qrcode>
      </div>
    </div>
    <div class="row text-center mb-3">
      <div class="col">
        <button
          class="btn btn-primary custom-primary w-75 custom-max-325"
          type="button"
          @click="download"
          :disabled="btnDisable"
        >
          <i class="fa fa-share-alt me-1" aria-hidden="true"></i>
          分享
        </button>
      </div>
    </div>
    <div class="row text-center mb-3">
      <div class="col">
        <button
          class="btn btn-primary custom-primary w-75 custom-max-325"
          type="button"
          @click="handlePrint"
          :disabled="btnDisable"
        >
          <i class="fa fa-print me-1" aria-hidden="true"></i>
          列印
        </button>
      </div>
    </div>
    <br />
    <br />
  </div>
</template>

<style lang="scss" scoped>
.custom-primary {
  background-color: nth($camera-color, $style);
  border: 0;
}

.custom-max-325 {
  max-width: 325px;
}

.custom-hide {
  position: fixed;
  z-index: -1;
  bottom: 0;
  opacity: 0;
}
</style>
