<script>
import { ref, onMounted, onBeforeMount, computed, watch } from "vue";
import { handleStoreProfile } from "@/utils/handleData";
import { Toast } from "@/components/global/swal.js";
import {
  apiGetUserInfo,
  apiUpdateUser,
  apiUserUpload,
  apiUserRegister,
  apiRemoveUser,
} from "@/api/myfree";

import { useGlobalStore } from "@/store/global";
// import { storeToRefs } from "pinia";
import { errorHandle } from "@/utils/errorHandle";
// 根據傳進來的模式做不同事情
// post => 去pinia取資料
// edit => 正常打API

export default {
  name: "EditUserProfile",
  setup() {
    const globalStore = useGlobalStore();
    const goto = globalStore.goto;

    const form = ref(null);
    const ageList = [
      { id: "0", name: "0~9歲" },
      { id: "1", name: "10~19歲" },
      { id: "2", name: "20~29歲" },
      { id: "3", name: "30~39歲" },
      { id: "4", name: "40~49歲" },
      { id: "5", name: "50~59歲" },
      { id: "6", name: "60~69歲" },
      { id: "7", name: "70~79歲" },
      { id: "8", name: "80~89歲" },
      { id: "9", name: "90歲以上" },
    ];

    const editData = ref({
      mobile: "09xxxxxxxx",
      nickname: "",
      gender: "", //female
      age: "",
      image: "",
    });

    // const registerData = ref({
    //   ...editData.value,
    //   mobile: "",
    //   password: "",
    //   bindUserId: null,
    //   bindStoreId: null,
    // });

    // const handleGender = (inputGender = "") => {
    //   const currentGender = editData.value.gender;
    //   if (
    //     (inputGender === "male" && currentGender === "male") ||
    //     (inputGender === "female" && currentGender === "female")
    //   ) {
    //     editData.value.gender = "";
    //   }

    //   if (!inputGender) {
    //     editData.value.gender = inputGender;
    //   }
    // };

    //檔案上傳
    const myUploadFile = ref(null);
    const handleFileUpload = async () => {
      try {
        //一定要這樣寫 [ref的名稱].value.files //固定寫files=FileList
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
            const response = await apiUserUpload(requestData);

            if (response.result) {
              editData.value.image = `${response.path}` || "";
            }
          }
        } else {
          Toast(`圖片上傳失敗`);
        }
      } catch (error) {
        errorHandle(error);
      }
    };
    const apiEditUser = async () => {
      try {
        const response = await apiUpdateUser(editData.value);
        console.log(response);
        if (response.result) {
          Toast("更新成功!");
        } else {
          errorHandle(response);
        }
      } catch (error) {
        errorHandle(error);
      }
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      const eventType = e.target.id;
      switch (eventType) {
        case "editBtn":
          apiEditUser();
          break;
        case "skipBtn":
          console.log("skipBtn");
          break;
        case "registerBtn":
          console.log("registerBtn");
          break;
      }

      // goto("back");
    };

    const handleData = (userInfo = {}) => {
      let {
        mobile = "",
        gender = "",
        age = "",
        nickname = "",
        image = "",
      } = userInfo;

      return {
        mobile,
        gender,
        age,
        nickname,
        image,
      };
    };

    onMounted(async () => {
      //編輯流程
      try {
        const response = await apiGetUserInfo();
        editData.value = handleData(response);
      } catch (error) {
        errorHandle(error);
      }
    });
    return { form, handleSubmit, editData, ageList, handleFileUpload };
  },

  components: {},
};
</script>

<template>
  <!-- 內容 -->
  <section class="c-main">
    <div class="form-container">
      <form ref="form">
        <div class="avatar-container">
          <div class="image">
            <img
              :src="editData.image"
              onerror="this.onerror=null; this.src='https://fakeimg.pl/150x150/'"
              v-if="editData.image"
            />
            <img src="@/assets/images/noavatar.png" v-if="!editData.image" />
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
              @change="handleFileUpload"
            />
          </div>
        </div>
        <div class="mobile-container">
          <div class="title">
            手機號碼<span>{{ editData.mobile }}</span>
          </div>
        </div>
        <div class="mb-2">
          <label class="form-label">暱稱</label>
          <input
            type="text"
            class="form-control"
            placeholder="請輸入暱稱"
            v-model="editData.nickname"
          />
        </div>
        <div class="mb-2">
          <label class="form-label">性別</label>
          <div class="input-pill-2">
            <div class="row">
              <div class="col form-check">
                <input
                  type="radio"
                  class="form-check-input"
                  name="gender"
                  id="male"
                  v-model="editData.gender"
                  value="male"
                />
                <label class="form-check-label" for="male">
                  <span class="custom-gender">男</span>
                  <i class="icon icon-male"></i>
                </label>
              </div>
              <div class="col form-check">
                <input
                  type="radio"
                  class="form-check-input"
                  name="gender"
                  id="female"
                  v-model="editData.gender"
                  value="female"
                />
                <label class="form-check-label" for="female">
                  <span class="custom-gender">女</span>
                  <i class="icon icon-female"></i>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-2">
          <label class="form-label">年齡層</label>
          <select class="form-control form-select" v-model="editData.age">
            <option selected value="">請選擇年齡層</option>
            <option v-for="item in ageList" :value="item.id" :key="item.id">
              {{ item.name }}
            </option>
          </select>
        </div>
        <!-- <div class="mb-2">
          <label class="form-label">預設好康店範圍</label>
          <div class="row">
            <div class="col">
              <select class="form-control form-select">
                <option selected>請選擇縣市</option>
              </select>
            </div>
            <div class="col">
              <select class="form-control form-select">
                <option selected>請選擇鄉鎮市區</option>
              </select>
            </div>
          </div>
        </div> -->
        <div class="mt-4">
          <div class="form-word-2 text-center">
            請填寫完整資料才能享有myFrees優惠喔
          </div>
        </div>
        <div class="btn-container mt-5 d-flex justify-content-center">
          <button
            class="btn btn-next-grey"
            type="submit"
            @click="handleSubmit"
            id="editBtn"
          >
            <i class="icon icon-next"></i>
          </button>
        </div>
        <!-- <div class="btn-container mt-5 d-flex justify-content-between">
          <button class="btn btn-skip" type="button" @click="handleSubmit" id="skipBtn">
            Skip
          </button>
          <button class="btn btn-next-grey" type="submit" @click="handleSubmit" id="registerBtn">
            <i class="icon icon-next"></i>
          </button>
        </div> -->
      </form>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.custom-gender {
  // position: absolute;
  top: -0.25rem;
  color: white;
  display: inline-block;
  position: relative;
  width: 1.25rem;
  height: 1.25rem;
  font-style: normal;
  line-height: 1;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
</style>
