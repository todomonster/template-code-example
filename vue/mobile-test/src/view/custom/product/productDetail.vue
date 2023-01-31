<script>
import { ref, onMounted, computed, watch } from "vue";
import { useGlobalStore } from "@/store/global";
import { errorHandle } from "@/utils/errorHandle";
import { handleStoreProfile } from "@/utils/handleData";
import { useRoute } from "vue-router";

import {
  apiGetProduct,
  apiAddProduct,
  apiUpdateProduct,
  apiDeleteProduct,
  apiStoreUpload,
} from "@/api/myfree";
import { Toast, ToastConfirm } from "@/components/global/swal";
import { focusInput } from "@/utils/helper";

import TestCrop from "@/view/testCrop.vue";

export default {
  name: "ProductDetail",
  setup() {
    const defaultData = {
      status: "0",
      image: `[""]`,
      name: "",
      description: "",
      price: "100",
      stock: 0,
    };
    const isStoreOpen = ref(false);
    const productData = ref({ ...defaultData });

    const form1 = ref({});
    const globalStore = useGlobalStore();
    const goto = globalStore.goto;

    const mode = ref("add");
    const id = ref(0);
    const { query } = useRoute();

    const imgUrl = computed(() => {
      const data = productData.value.image;
      return handleStoreProfile.storeImages(data);
      // if (typeof data === "string") {
      //   //
      //   const url = JSON.parse(data);
      //   return url.length > 0 ? url[0] : "";
      // } else {
      //   if (productData.value.image.length > 0) {
      //     const url = productData.value.image[0] || "";
      //     return url;
      //   }
      // }

      // return "";
    });
    const handleAdd = async (e) => {
      try {
        e.preventDefault();
        if (form1.value.reportValidity()) {
          const response = await apiAddProduct(productData.value);
          if (response.result) {
            productData.value = { ...defaultData };
            Toast("新增完成");
            goto("back");
          }
        }
      } catch (error) {
        errorHandle(error);
      }
    };
    const handleEdit = async (e) => {
      try {
        e.preventDefault();
        if (form1.value.reportValidity()) {
          if (productData.value?.status === true) {
            productData.value.status = "1";
          }
          const response = await apiUpdateProduct(id.value, productData.value);
          if (response.result) {
            Toast("已儲存");
            // goto("back");
          }
        }
      } catch (error) {
        errorHandle(error);
      }
    };
    const handleDelete = async () => {
      try {
        const swal = await ToastConfirm("確認要刪除?");
        if (swal) {
          const response = await apiDeleteProduct(id.value);
          if (response.result) {
            Toast("已刪除");
            setTimeout(() => goto("back"), 1000);
          }
        }
      } catch (error) {
        errorHandle(error);
      }
    };
    const myUploadFile = ref(null);
    const handleFileUpload = async () => {
      try {
        // 一定要這樣寫 [ref的名稱].value.files //固定寫files=FileList
        let requestData = new FormData();
        requestData.append("images", myUploadFile.value.files[0]);
        // 檢查上傳檔案大小
        const fileInput = document.getElementById("formFile");

        const getFile = fileInput?.files?.[0];

        if (getFile) {
          const fileSize = getFile?.size / 1024 / 1024;
          if (fileSize > process.env.VUE_APP_UPLOAD_LIMIT) {
            fileInput.value = "";
            Toast(`圖片檔案大小上限為${process.env.VUE_APP_UPLOAD_LIMIT}MB`);
          } else {
            const response = await apiStoreUpload(requestData);

            if (response.result) {
              productData.value.image = `["${response.path}"]` || "";
            }
          }
        } else {
          Toast(`圖片上傳失敗`);
        }
      } catch (error) {
        errorHandle(error);
      }
    };

    onMounted(async () => {
      setTimeout(() => focusInput(), 500);
      id.value = Number(query.id) || 0;
      mode.value = query.mode || "add";
      try {
        if (mode.value === "view") {
          const response = await apiGetProduct(id.value);
          if (response.result) {
            // 將陣列處理成字串
            const imgUrlParse = response.data.image;
            if (Array.isArray(imgUrlParse)) {
              response.data.image = JSON.stringify(imgUrlParse);
            }
            productData.value = response.data;
            isStoreOpen.value =
              response.data.status === "1" || response.data.status == true
                ? true
                : false;
          }
        }
      } catch (error) {
        errorHandle(error);
      }
    });

    watch(
      () => isStoreOpen.value,
      (val) => {
        productData.value.status = val ? "1" : "0";
      }
    );

    const handleImgChange = (val) => {
      if (val) {
        productData.value.image = val;
      }
    };

    return {
      goto,
      productData,
      mode,
      handleDelete,
      handleFileUpload,
      imgUrl,
      form1,
      myUploadFile,
      handleAdd,
      handleEdit,
      isStoreOpen,
      handleImgChange,
    };
  },

  components: { TestCrop },
};
</script>

<template>
  <div class="main bg-grey">
    <section class="c-main">
      <div class="form-container form-container-3">
        <form ref="form1">
          <div class="mb-2">
            <label class="form-label"
              >商品是否上架<span class="must"></span
            ></label>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                v-model="isStoreOpen"
                checked
              />
            </div>
          </div>
          <div class="mb-2">
            <label class="form-label">圖片</label>
            <!-- <div class="plus-container">
              <label class="form-file-label" v-if="!imgUrl">
                <i class="icon icon-plus-grey"></i>
              </label>
              <label
                class="form-file-label product-img"
                :style="{
                  backgroundImage: `url(${imgUrl})`,
                }"
                v-if="imgUrl"
              >
                <i class="icon"></i>
              </label>
              <input
                class="form-file-input"
                type="file"
                id="formFile"
                accept="image/png, image/jpeg, image/jpg"
                ref="myUploadFile"
                @change="handleFileUpload"
              />
            </div> -->
            <TestCrop
              :originImg="imgUrl"
              styleMode="product"
              :openPreview="false"
              :fixedNumber="[1, 1]"
              @handleImgChange="handleImgChange"
            />
          </div>
          <div class="mb-2">
            <label class="form-label"
              >商品名稱<span class="must">必填</span></label
            >
            <input
              type="text"
              class="form-control"
              placeholder="請輸入商品名稱"
              v-model="productData.name"
              required
            />
          </div>
          <div class="mb-2">
            <label class="form-label">商品描述</label>
            <textarea
              class="form-control"
              rows="5"
              placeholder="請輸入商品描述"
              v-model="productData.description"
            ></textarea>
          </div>
          <div class="mb-2">
            <label class="form-label">價格<span class="must">必填</span></label>
            <input
              type="number"
              class="form-control"
              placeholder="請輸入價格"
              v-model="productData.price"
              required
            />
          </div>
          <div class="mb-2">
            <label class="form-label">庫存<span class="must">必填</span></label>
            <input
              type="number"
              class="form-control"
              placeholder="請輸入庫存"
              v-model="productData.stock"
              required
            />
          </div>
        </form>
      </div>
      <!-- 新增 -->
      <div class="add-container" v-if="mode === 'add'">
        <button class="btn btn-add" type="button" @click="handleAdd">
          新增
        </button>
      </div>
      <!-- 編輯/刪除 -->
      <div>
        <div class="product-btn-container" v-if="mode !== 'add'" id="c-footer">
          <button
            class="btn product-btn-delete"
            type="button"
            @click="handleDelete"
          >
            刪除
          </button>
          <button
            class="btn product-btn-edit"
            type="button"
            @click="handleEdit"
          >
            儲存
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.bg-grey {
  background-color: #eee;
}
.main {
  margin-top: $header-height;
  padding-top: 0.125rem;
}
.product-btn-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.625rem 1.25rem;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  .btn {
    // padding: 0.6875rem 0.75rem;
    width: 100%;
    color: white;
    border-radius: 0.5rem;
  }
  .product-btn-edit {
    background-color: #fda647;
  }
  .product-btn-delete {
    background-color: #df4759;
    margin-right: 4%;
  }
}
.product-img {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center; /* optional, center the image */
}
</style>
