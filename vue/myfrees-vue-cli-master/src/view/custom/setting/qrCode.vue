<script>
import { ref, onMounted } from "vue";
import { apiGenQrcode, apiGetStore } from "@/api/myfree";
import { errorHandle } from "@/utils/errorHandle";

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
    const download = () => {
      const aTag = document.createElement("a");
      aTag.href = canvasToDataUrl("qrCanvas");
      aTag.download = "myfrees_store_qrcode.png";
      document.body.appendChild(aTag);
      aTag.click();
      document.body.removeChild(aTag);
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
          :options="{ width: 300 }"
          id="qrCanvas"
        ></vue-qrcode>
      </div>
    </div>
    <div class="row text-center">
      <div class="col">
        <button
          class="btn btn-primary custom-primary"
          type="button"
          @click="download"
        >
          下載 QR Code
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
