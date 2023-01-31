<script>
import {
  ref,
  onMounted,
  onBeforeMount,
  computed,
  watch,
  onActivated,
} from "vue";
import { Toast } from "@/components/global/swal.js";
import {
  apiGetUserInfo,
  apiUpdateUser,
  apiUserUpload,
  apiUserRegister,
} from "@/api/myfree";

import { useGlobalStore } from "@/store/global";
// import { storeToRefs } from "pinia";
import { errorHandle } from "@/utils/errorHandle";
// 根據傳進來的模式做不同事情
// post => 去pinia取資料
// edit => 正常打API

import TestCrop from "@/view/testCrop.vue";

export default {
  name: "EditUserProfile",
  setup() {
    const globalStore = useGlobalStore();
    const { goto, setUserData } = globalStore;

    const MODE = ref("edit");

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
      mobile: "",
      nickname: "",
      gender: "", //female
      age: "",
      image: "",
    });

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

    const handleImgChange = (val) => {
      if (val) {
        editData.value.image = val;
      }
    };

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
        const data = { ...editData.value };
        if (data.nickname === "") {
          data.nickname = " ";
        }
        const response = await apiUpdateUser(data);
        if (response.result) {
          Toast("更新成功!");
        } else {
          errorHandle(response);
        }
      } catch (error) {
        errorHandle(error);
      }
    };

    const apiRegister = async (mode = "") => {
      try {
        const { password, mobile, userId, storeId } = addUserPinia.value;
        let data = {
          mobile,
          password,
          bindUserId: userId,
          bindStoreId: storeId,
        };
        // 沒有skip
        if (mode === "register") {
          const newData = JSON.parse(JSON.stringify(data));
          data = {
            ...editData.value,
            ...newData,
          };
        }

        const response = await apiUserRegister(data);
        if (response.result) {
          setUserData({
            status: false,
            mobile: "",
            password: "",
            userId: "",
            storeId: "",
          });
          Toast("註冊成功!");
          goto("router", "/login");
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
        case "editText":
          apiEditUser();
          break;
        case "skipBtn":
        case "skipText":
          // 直接打API
          apiRegister("skip");
          break;
        case "registerBtn":
        case "registerText":
          // 更新使用者資料後 吃pinia資料
          // 打API
          apiRegister("register");
          break;
      }

      // goto("back");
    };

    const handleData = (userInfo = {}) => {
      let { mobile = "", gender = "", age = "", image = "" } = userInfo;
      
      let nickname = "";
      if (userInfo.nickname == "null" || !userInfo.nickname) {
        nickname = "";
      } else {
        nickname = userInfo.nickname;
      }

      return {
        mobile,
        gender,
        age,
        nickname,
        image,
      };
    };

    const addUserPinia = ref({ test: 1 });

    onMounted(async () => {
      try {
        // 取得 pinia 的 password 和 phone 判斷是否是註冊
        const { password, mobile, status, userId, storeId } =
          globalStore.isToAddUser;
        if (status) {
          // 註冊流程
          MODE.value = "register";
          addUserPinia.value = { password, mobile, status, userId, storeId };
        } else {
          //編輯流程
          // 先檢查登入狀態
          if (localStorage.getItem("is_Login") == "1") {
            const response = await apiGetUserInfo();
            editData.value = handleData(response);
          } else {
            goto("back");
            Toast("請先登入");
          }
        }
      } catch (error) {
        errorHandle(error);
      }
    });

    onActivated(() => {
      // 先檢查登入狀態
      if (localStorage.getItem("is_Login") != "1") {
        goto("back");
        Toast("請先登入");
      }
    });

    const goback = () => {
      if (addUserPinia.value.status) {
        // 是註冊
        goto("routerQuery", "/login/signup", {
          query: { signup: "1" },
        });
      } else {
        goto("back");
      }
    };

    return {
      form,
      handleSubmit,
      editData,
      ageList,
      handleFileUpload,
      MODE,
      addUserPinia,
      goback,
      myUploadFile,
      TestCrop,
      handleImgChange,
    };
  },

  components: { TestCrop },
};
</script>

<template>
  <!-- 內容 -->
  <div>
    <header class="c-header c-header-2">
      <nav class="navbar ui-navbar">
        <ul class="navbar-nav">
          <li class="nav-item" v-if="MODE == 'edit'">
            <a @click="goback" class="nav-link"
              ><i class="icon icon-back-grey"></i
            ></a>
          </li>
        </ul>
      </nav>
    </header>
    <section class="c-main">
      <div class="form-container">
        <form ref="form">
          <!-- <div class="avatar-container">
            <div class="image">
              <img
                :src="editData.image"
                onerror="this.onerror=null; this.src='https://fakeimg.pl/150x150/?text=使用者&font=noto'"
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
          </div> -->
          <TestCrop
            imgClass="avatar-container"
            :openPreview="false"
            :fixedNumber="[1, 1]"
            :originImg="editData.image"
            @handleImgChange="handleImgChange"
          />
          <div class="mobile-container" v-if="editData.mobile">
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
          <div
            class="btn-container mt-5 d-flex justify-content-center"
            v-if="MODE == 'edit'"
          >
            <button
              class="btn btn-next-grey"
              type="submit"
              id="editBtn"
              @click="handleSubmit"
            >
              <i id="editText" class="icon icon-next"></i>
            </button>
          </div>
          <div
            class="btn-container mt-5 d-flex justify-content-between"
            v-if="MODE == 'register'"
          >
            <div>
              <button
                class="btn btn-skip"
                type="button"
                @click="handleSubmit"
                id="skipBtn"
              >
                <span id="skipText">Skip</span>
              </button>
            </div>
            <div>
              <!-- btn-next-grey -->
              <button
                class="btn btn-next-grey"
                type="submit"
                @click="handleSubmit"
                id="registerBtn"
              >
                <i id="registerText" class="icon icon-next"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
    <!--  -->
    <!-- <div class="row d-flex justify-content-center align-items-center m-2px">

    </div> -->
  </div>
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
