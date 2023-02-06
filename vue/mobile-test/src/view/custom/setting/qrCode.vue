<script>
import { ref, onMounted } from "vue";
import { apiGenQrcode, apiGetStore } from "@/api/myfree";
import { errorHandle } from "@/utils/errorHandle";

import { ExtCall } from "@/utils/extCall";

export default {
  name: "QrCode",
  setup() {
    const qrcodeUrl = ref("因為意外無法正確轉換");
    onMounted(async () => {
      try {
        const store = await apiGetStore();
        const id = store.id || 0;
        const response = await apiGenQrcode({ storeId: id });
        qrcodeUrl.value = response;
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

        // 手機版是呼叫分享
        ExtCall.shareFile({
          subject: "share",
          title: "store_qr_code",
          base64: aTag.href,
          message:
            "${店家}邀請您加入myFrees會員，立即加入得300點，消費立即索取福利金，點數換現金。",
        });
      } catch (error) {
        // 電腦版是下載
        document.body.appendChild(aTag);
        aTag.click();
        document.body.removeChild(aTag);
      }
    };

    return { qrcodeUrl, download };
  },
  components: {},
};
</script>

<template>
  <div class="main-content">
    <div class="row text-center">
      <div class="col">
        <vue-qrcode :value="qrcodeUrl" :options="{ width: 325 }"></vue-qrcode>
      </div>
      <div class="col custom-hide">
        <vue-qrcode
          :value="qrcodeUrl"
          :options="{ width: 189 }"
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
