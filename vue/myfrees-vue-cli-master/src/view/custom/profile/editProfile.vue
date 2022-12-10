<script>
import { ref, onMounted } from "vue";
import CitySelecter from "@/components/global/CitySelecter.vue";
import { useRouter } from "vue-router";
import { Toast } from "@/components/global/swal.js";
import {
  apiGetCaretaker,
  apiPutCaretaker,
  apiUpload,
  apiGetCountry,
  apiGetLanguage,
} from "@/api/api";

export default {
  name: "EditProfile",
  setup() {
    const router = useRouter();
    const caretakerData = ref({});
    const countryList = ref();
    const languageList = ref();

    //表單驗證
    const form = ref(null);
    const save = async (e) => {
      e.preventDefault();
      if (form.value.reportValidity()) {
        //處理語言格式
        caretakerData.value.language = languageList.value.filter((item) =>
          caretakerData.value.languageInfo.includes(item.name)
        );
        console.log("put", caretakerData.value);
        try {
          let msg = await apiPutCaretaker(caretakerData.value);
          console.log(msg);
          if (msg.data == "更新成功") {
            Toast(msg.data);
          } else {
            Toast(msg.message);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    //取縣市鄉鎮代碼
    const cityIdx = ref(0);
    const areaIdx = ref(0);
    const updateCityIdx = (val) => {
      cityIdx.value = val.value;
      caretakerData.value.address.cityId = parseInt(val.value);
      console.log(cityIdx.value);
    };
    const updateAreaIdx = (val) => {
      areaIdx.value = val.value;
      caretakerData.value.address.areaId = parseInt(val.value);
      console.log(areaIdx.value);
    };

    onMounted(async () => {
      // //取國籍
      // countryList.value = await apiGetCountry();
      // countryList.value = countryList.value.data.data;
      // //取語言
      // languageList.value = await apiGetLanguage();
      // languageList.value = languageList.value.data.data;
      // //取會員資料
      // caretakerData.value = await apiGetCaretaker();
      // caretakerData.value = caretakerData.value.data;
      // caretakerData.value.languageInfo = [];
      // caretakerData.value.language.forEach((item) => {
      //   caretakerData.value.languageInfo.push(item.name);
      // });
      // //國籍、縣市ID
      // caretakerData.value.countryId = countryList.value.filter(
      //   (item) => item.name == caretakerData.value.countryCode
      // )[0].id;
      // caretakerData.value.address.cityId = caretakerData.value.address.city.id;
      // caretakerData.value.address.areaId = caretakerData.value.address.area.id;
    });

    //檔案上傳
    const myUploadFile = ref(null);
    const handleFileUpload = async () => {
      //一定要這樣寫 [ref的名稱].value.files //固定寫files=FileList
      let requestData = new FormData();
      requestData.append("singleFile", myUploadFile.value.files[0]);
      requestData.append("uploadType", "Avatar");
      //檢查上傳檔案大小
      var fileInput = document.getElementById("formFile");
      var getFile = fileInput.files[0].size / 1024 / 1024;

      if (getFile > process.env.VUE_APP_UPLOAD_LIMIT) {
        Toast("圖片檔案大小上限為6MB");
      } else {
        try {
          const response = await apiUpload(requestData);
          console.log("response", response);
          console.log("url", response.data.url);
          caretakerData.value.avatarUrl = response.data.url;
          caretakerData.value.avatarImgId = response.data.id;
        } catch (error) {
          console.log("error", error);
        }
      }
    };

    return {
      caretakerData,
      save,
      updateCityIdx,
      updateAreaIdx,
      form,
      myUploadFile,
      handleFileUpload,
      countryList,
      languageList,
    };
  },
  components: {
    CitySelecter,
  },
};
</script>

<template>
  <div class="main-content">
    <form ref="form">
      <div class="main">
        <div class="mb-3 avatar-container">
          <label class="form-file-label">
            <img
              :src="caretakerData.avatarUrl"
              v-if="caretakerData.avatarUrl"
            />
            <img
              src="@/assets/image/noavatar.jpg"
              v-if="!caretakerData.avatarUrl"
            />
            <i class="fas fa-camera"></i>
            <input
              class="form-control"
              type="file"
              id="formFile"
              accept="image/png, image/jpeg"
              ref="myUploadFile"
              @change="handleFileUpload"
              style="display: none"
            />
          </label>
        </div>
      </div>
      <div class="main1">
        <div class="mb-3">
          <label class="form-label">姓名<span class="star">*</span></label>
          <input
            type="text"
            class="form-control"
            placeholder="請輸入姓名"
            v-model="caretakerData.name"
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label">性別<span class="star">*</span></label>
          <div class="input-group">
            <div class="col form-check">
              <input
                type="radio"
                class="form-check-input"
                id="male"
                value="Male"
                v-model="caretakerData.gender"
              />
              <label class="form-check-label" for="male">男性</label>
            </div>
            <div class="col form-check">
              <input
                type="radio"
                class="form-check-input"
                id="female"
                value="Female"
                v-model="caretakerData.gender"
              />
              <label class="form-check-label" for="female">女性</label>
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">出生日期<span class="star">*</span></label>
          <input
            type="date"
            class="form-control"
            v-model="caretakerData.birthday"
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label">身高/公分<span class="star">*</span></label>
          <input
            type="number"
            class="form-control"
            placeholder="請輸入身高/公分"
            v-model="caretakerData.height"
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label">體重/公斤<span class="star">*</span></label>
          <input
            type="number"
            class="form-control"
            placeholder="請輸入體重/公斤"
            v-model="caretakerData.weight"
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label">國籍<span class="star">*</span></label>
          <select
            class="form-control form-select"
            v-model="caretakerData.countryId"
            required
          >
            <option v-for="item in countryList" :key="item.id" :value="item.id">
              {{ item.name }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label"
            >身分證字號(居留號碼)<span class="star">*</span></label
          >
          <input
            type="text"
            class="form-control"
            placeholder="請輸入身分證字號(居留號碼)"
            v-model="caretakerData.idCardNumber"
            pattern="^[A-Za-z][1-2]\d{8}$"
            title="請輸入身分證號碼"
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label">手機號碼</label>
          <input
            type="text"
            class="form-control"
            placeholder="請輸入手機號碼"
            v-model="caretakerData.phoneNumber"
            readonly
          />
        </div>
        <div class="mb-3">
          <label class="form-label">電子信箱<span class="star">*</span></label>
          <input
            type="email"
            class="form-control"
            placeholder="請輸入電子信箱"
            v-model="caretakerData.mail"
            required
          />
        </div>
        <div class="mb-3" v-if="caretakerData.address">
          <label class="form-label">通訊地址<span class="star">*</span></label>
          <CitySelecter
            @city-idx="updateCityIdx"
            @area-idx="updateAreaIdx"
            :cityIdx_p="caretakerData.address.city.id"
            :areaIdx_p="caretakerData.address.area.id"
          />
          <input
            type="text"
            class="form-control mt-3"
            placeholder="請輸入其他地址"
            v-model="caretakerData.address.place.name"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">語言能力<span class="star">*</span></label>
          <div class="input-list">
            <div
              class="form-check-inline"
              v-for="item in languageList"
              :key="item.id"
            >
              <input
                type="checkbox"
                class="form-check-input"
                :value="item.name"
                :id="item.id"
                v-model="caretakerData.languageInfo"
              />
              <label class="form-check-label" :for="item.id">{{
                item.name
              }}</label>
            </div>
          </div>
          <input
            type="text"
            class="form-control mt-1"
            placeholder="請輸入其他語言(可不填)"
            v-model="caretakerData.otherLanguage"
          />
        </div>
        <div class="mb-3">
          <label class="form-label"
            >自我介紹(100字以內)<span class="star">*</span></label
          >
          <textarea
            class="form-control"
            rows="7"
            placeholder="請輸入自我介紹"
            v-model="caretakerData.selfIntroduction"
            style="resize: none"
          ></textarea>
        </div>

        <div class="mt-4b btn-container">
          <div class="row">
            <div class="col">
              <button
                class="btn btn-outline-primary"
                type="button"
                @click="save"
              >
                儲存資料
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
