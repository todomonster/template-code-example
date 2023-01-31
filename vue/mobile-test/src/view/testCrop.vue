<template>
  <!-- preview -->
  <!-- <div
    class="show-preview"
    :style="{
      width: previews.w + 'px',
      height: previews.h + 'px',
      overflow: 'hidden',
      margin: '5px',
    }"
  >
    <div :style="previews.div">
      <img :src="previews.url" :style="previews.img" />
    </div>
  </div> -->
  <!-- 普通模式 start -->
  <div :class="imgClass" v-if="styleMode != 'product'">
    <div class="image">
      <img :src="newImg" :onerror="onErrorBgImg" v-if="newImg" />
      <img :src="defaultBgImg" v-if="!newImg" />
    </div>
    <div class="camera-container">
      <label class="form-file-label">
        <i class="icon icon-camera"></i>
      </label>
      <input
        class="form-file-input"
        type="file"
        id="formFile"
        accept="image/png, image/jpeg, image/jpg"
        ref="myUploadFile"
        @change="uploadImg"
      />
    </div>
  </div>
  <!-- 普通模式 end -->
  <!-- 商品模式 start -->
  <div class="plus-container" v-if="styleMode == 'product'">
    <label class="form-file-label" v-if="!newImg">
      <i class="icon icon-plus-grey"></i>
    </label>
    <label
      class="form-file-label product-img"
      :style="{
        backgroundImage: `url(${newImg})`,
      }"
      v-if="newImg"
    >
      <i class="icon"></i>
    </label>
    <input
      class="form-file-input"
      type="file"
      id="formFile"
      accept="image/png, image/jpeg, image/jpg"
      ref="myUploadFile"
      @change="uploadImg"
    />
  </div>
  <!-- 商品模式 end -->

  <!-- Modal -->
  <div
    class="custom-modal disable-touch"
    ref="myModalRef"
    id="MyModal"
    v-show="showCropper"
  >
    <div class="modal-dialog d-flex justify-content-center">
      <div class="modal-content custom-modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="MyModalLabel"></h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="closeModal"
          ></button>
        </div>
        <div class="modal-body" style="padding: 0px">
          <!--  -->
          <div class="crop-content" style="">
            <VueCropper
              ref="cropper"
              :autoCrop="options.autoCrop"
              :img="options.img"
              centerBox
              fixed
              :fixedBox="options.fixedBox"
              :fixedNumber="fixedNumber"
              :canMove="options.canMove"
              @real-time="realTime"
              :info="false"
            />
          </div>
          <!--  -->
        </div>
        <div class="modal-footer">
          <!-- <button
            type="button"
            class="btn btn-danger"
            data-bs-dismiss="modal"
            @click="cancelImg"
          >
            清除
          </button> -->
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="confirmImg"
          >
            確定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { VueCropper } from "vue-cropper";
import "vue-cropper/dist/index.css";
import { reactive, ref, defineProps, defineEmits, watch, onMounted } from "vue";
import { apiUserUpload, apiStoreUpload } from "@/api/myfree";
import { Toast } from "@/components/global/swal.js";
import { errorHandle } from "@/utils/errorHandle";
import noavatar from "@/assets/images/noavatar.png";

const props = defineProps({
  openPreview: {
    type: Boolean,
    required: true,
  },
  originImg: {
    type: String,
    required: false,
    default: "",
  },
  fixedNumber: {
    type: Array,
    required: true,
  },
  imgClass: {
    type: String,
    required: false,
    default: "avatar-container",
  },
  defaultBgImg: {
    type: String,
    required: false,
    default: noavatar,
  },
  styleMode: {
    type: String,
    required: false,
    default: "onlyImg",
  },
  onErrorBgImg: {
    type: String,
    required: false,
    default:
      "this.onerror=null; this.src='https://fakeimg.pl/150x150/?text=使用者&font=noto'",
  },
  role: {
    type: String,
    required: false,
    default: "store",
  },
});
const emit = defineEmits(["handleImgChange"]);
onMounted(() => {});

const previews = ref({});
const newImg = ref("");
const realTime = (data) => {
  previews.value = data;
};

const showCropper = ref(false);

/* vue-cropper DOM */
const cropper = ref(null);

watch(
  () => props.originImg,
  (val) => {
    if (val) {
      newImg.value = val;
    }
  }
);

/* vue-cropper 配置项 */
/* https://blog.csdn.net/qq_32067561/article/details/123455956 */
const options = reactive({
  // fixedNumber: [1, 1],
  img: "",
  fixedBox: false, //是否鎖定藍色截圖框
  autoCrop: true, //啟動藍色截圖框
  canMove: true, //圖片是否能移動
});

//檔案上傳
const myUploadFile = ref(null);

let fileName = "";

const uploadImg = (e) => {
  try {
    const file = e.target.files[0];
    if (file) {
      fileName = file?.name;
    }
    if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)) {
      Toast(`僅支援jpg, png`);
      closeModal();
      return false;
    }

    const fileSize = file?.size / 1024 / 1024;
    if (fileSize > process.env.VUE_APP_UPLOAD_LIMIT) {
      Toast(`圖片檔案大小上限為${process.env.VUE_APP_UPLOAD_LIMIT}MB`);
      closeModal();
      return false;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      let data = null;
      if (typeof e.target.result === "object") {
        // 把Array Buffer轉blob 如果是base64不需要
        data = window.URL.createObjectURL(new Blob([e.target.result]));
      } else {
        data = e.target.result;
      }

      options.img = data;

      showCropper.value = true;
    };

    reader.readAsDataURL(file); // to base64

    return true;

    //   reader.readAsArrayBuffer(file); // to blob
  } catch (error) {
    Toast(`圖片上傳失敗`);
  }
};

function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

const confirmImg = () => {
  try {
    cropper.value.getCropData(async (data) => {
      newImg.value = data;
      // get file name

      const file = dataURLtoFile(data, fileName);
      // 打API 拿圖片網址拋給外面 讓外面打PUT
      let requestData = new FormData();
      requestData.append("images", file);

      let response = null;
      if (props.role == "store") {
        response = await apiUserUpload(requestData);
      } else if (props.role == "user") {
        response = await apiStoreUpload(requestData);
      }

      if (response.result) {
        const imgUrl = `${response.path}` || "";
        emit("handleImgChange", imgUrl);
        closeModal();
      }
      closeModal();
    });
  } catch (error) {
    Toast(`圖片上傳失敗`);
  }
};

const cancelImg = () => {
  newImg.value = "";
  closeModal();
};

const closeModal = () => {
  // 要記得清除 input
  const fileInput = document.getElementById("formFile");
  fileInput.value = "";
  showCropper.value = false;
};
</script>

<style lang="scss" scoped>
.crop-content {
  width: 100%;
  height: 100%;
  min-width: 320px;
  margin: 0px;
  padding: 0px;
}
.custom-modal {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999999;

  .custom-modal-content {
    width: 90vw !important;
    height: 98vh !important;
    min-width: 320px;
  }
}

.disable-touch {
  touch-action: none;
}
</style>
