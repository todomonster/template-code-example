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

        ExtCall.shareFile({
          subject: "share",
          title: "store_qr_code",
          base64: aTag.href,
        });
      } catch (error) {
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
        <vue-qrcode
          :value="qrcodeUrl"
          :options="{ width: 325 }"
          id="qrCanvas"
        ></vue-qrcode>
      </div>
    </div>
    <div class="row text-center">
      <div class="col">
        <button
          class="btn btn-primary custom-primary w-75"
          type="button"
          @click="download"
        >
          <i class="fa fa-share-alt me-1" aria-hidden="true"></i>
          分享
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
</style>
