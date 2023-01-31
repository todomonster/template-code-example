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
  <div :class="imgClass">
    <div class="image">
      <img
        :src="newImg"
        onerror="this.onerror=null; this.src='https://fakeimg.pl/150x150/?text=使用者&font=noto'"
        v-if="newImg"
      />
      <img src="@/assets/images/noavatar.png" v-if="!newImg" />
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

  <!-- Modal -->
  <div class="custom-modal" ref="myModalRef" id="MyModal" v-show="showCropper">
    <div class="modal-dialog">
      <div class="modal-content">
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
        <div class="modal-body">
          <!--  -->
          <div class="content" style="">
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
import { apiUserUpload } from "@/api/myfree";
import { Toast } from "@/components/global/swal.js";
import { errorHandle } from "@/utils/errorHandle";

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
});
const emit = defineEmits(["handleImgChange"]);
onMounted(() => {});

const previews = ref({});
const newImg = ref("");
const realTime = (data) => {
  previews.value = data;
  //   console.log(data);
};

const showCropper = ref(false);

/* vue-cropper DOM */
const cropper = ref(null);
// watch(
//   () => props.fixedNumber,
//   (val) => {
//     // console.log(val);
//     if (val) {
//       options.fixedNumber = val;
//     }
//   }
// );
watch(
  () => props.originImg,
  (val) => {
    // console.log(val);
    if (val) {
      newImg.value = val;
    }
  }
);

/* vue-cropper 配置项 */
/* https://blog.csdn.net/qq_32067561/article/details/123455956 */
const options = reactive({
  img: "",
  fixedBox: false,
  // fixedNumber: [1, 1],
  autoCrop: true,
  canMove: false,
});

//檔案上傳
const myUploadFile = ref(null);

const uploadImg = (e) => {
  try {
    const file = e.target.files[0];
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
  cropper.value.getCropData(async (data) => {
    newImg.value = data;
    //Usage example:
    const file = dataURLtoFile(data, "a.png");
    // 打API 拿圖片網址拋給外面 讓外面打PUT
    let requestData = new FormData();
    requestData.append("images", file);
    const response = await apiUserUpload(requestData);

    if (response.result) {
      const imgUrl = `${response.path}` || "";
      emit("handleImgChange", imgUrl);
      closeModal();
    }
    // closeModal();
  });
};
const cancelImg = () => {
  newImg.value = "";
  closeModal();
};
const closeModal = () => {
  showCropper.value = false;
};
</script>

<style lang="scss" scoped>
.content {
  width: 80vw;
  height: 70vh;
}
.custom-modal {
  position: fixed;
  top: 0px;
  z-index: 999999;
}
</style>
