<script>
import { ref, onMounted, onBeforeMount, computed, watch } from "vue";
import { Toast } from "@/components/global/swal.js";
import {
  apiGetStore,
  apiUpdateStore,
  apiStoreUpload,
  apiStoreRegister,
  apiGetCityList,
  apiGetAreaList,
  apiGetRewardRange,
} from "@/api/myfree";

import { useGlobalStore } from "@/store/global";
// import { storeToRefs } from "pinia";
import { errorHandle } from "@/utils/errorHandle";
// 根據傳進來的模式做不同事情
// post => 去pinia取資料
// edit => 正常打API

import ChooseDate from "./component/DatePicker.vue";
export default {
  name: "EditProfile",
  setup() {
    const globalStore = useGlobalStore();
    const goto = globalStore.goto;

    const storeData = ref({});
    const addStorePinia = ref({});

    const cityAreaData = ref([]);
    const areaList = ref([]);
    let fullArea = ref({});
    const rewardList = ref([]);
    //表單驗證
    const form1 = ref({
      keywords: "優惠",
    });
    const all_addr = computed(() => {
      const { city, area } = storeData.value;
      const targetArea = cityAreaData.value.filter((item) => item.id === city);
      const city_name = targetArea?.[0]?.city_name || "";
      const targetCity = areaList.value.filter((item) => item.id === area);
      const area_name = targetCity?.[0]?.area_name || "";
      const address_name = storeData.value.address || "";
      return city_name + area_name + address_name;
    });

    const save = async (e) => {
      e.preventDefault();
      const isPostFlag = addStorePinia.value.status;
      if (isPostFlag === true) {
        // post
        if (form1.value.reportValidity()) {
          // 拼接資料
          const newPostData = {
            ...storeData.value,
            ...addStorePinia.value,
            all_addr: all_addr.value,
          };
          const response = await apiStoreRegister(newPostData);
          if (response.success === "OK") {
            Toast("加入會員成功");
            goto("router", `/`);
          } else {
            errorHandle(response);
          }
        } else {
          Toast("請填寫必填資料!");
        }
        return;
      }
      if (form1.value.reportValidity()) {
        // edit
        const response = await apiUpdateStore(storeData.value);
        if (response.result) {
          Toast("更新成功");
        } else {
          errorHandle(response);
        }
      }
    };

    watch(
      () => storeData.value.city,
      async (val) => {
        const area = JSON.parse(JSON.stringify(fullArea.value));
        const ans = area.filter((area) => area.city_id === val);
        areaList.value = ans;
        storeData.value.area = areaList.value?.[0]?.id;
      }
    );
    let showReward = ref(false);
    onMounted(async () => {
      // //取會員資料
      const getCityList = await apiGetCityList();
      cityAreaData.value = getCityList.data;
      const getAreaList = await apiGetAreaList();
      fullArea.value = getAreaList.data;
      areaList.value = getAreaList.data;

      // 取得 pinia 的 password 和 phone
      const { password, mobile, status } = globalStore.isToAddStore;
      if (status) {
        showReward.value = true;
        const getRewardList = await apiGetRewardRange();
        rewardList.value = getRewardList.data;
        addStorePinia.value = { password, mobile, status };
      } else {
        storeData.value = await apiGetStore();
      }
    });

    //檔案上傳
    const myUploadFile = ref(null);
    const handleFileUpload = async () => {
      try {
        //一定要這樣寫 [ref的名稱].value.files //固定寫files=FileList
        let requestData = new FormData();
        requestData.append("images", myUploadFile.value.files[0]);
        // 檢查上傳檔案大小
        const fileInput = document.getElementById("formFile");
        const getFile = fileInput.files[0].size / 1024 / 1024;
        if (getFile > process.env.VUE_APP_UPLOAD_LIMIT) {
          Toast("圖片檔案大小上限為6MB");
        } else {
          const response = await apiStoreUpload(requestData);

          if (response.result) {
            storeData.value.images = `["${response.path}"]` || "";
          }
        }
      } catch (error) {
        errorHandle(error);
      }
    };

    //
    const priceRangeOption = ["$", "$$", "$$$", "$$$$", "$$$$$"];
    const priceRangeClass = (item) =>
      item === storeData.value.price_range
        ? "btn btn-primary"
        : "btn btn-outline-primary";
    const handlePriceRange = (item) => {
      storeData.value.price_range = item;
    };

    const categoryOption = ["食", "衣", "住", "行", "樂"];
    const categoryClass = (item) =>
      item === storeData.value.category
        ? "btn btn-primary"
        : "btn btn-outline-primary";
    const handleCategory = (item) => {
      storeData.value.category = item;
    };

    const handleImg = (item) => {
      if (item) {
        return JSON.parse(item)[0];
      }
      return "";
    };
    const isStoreOpen = ref(true);
    watch(
      () => isStoreOpen.value,
      (val) => {
        storeData.value.is_open = val ? "1" : "0";
      }
    );
    //
    const handleEmit = (v) => {
      storeData.value.business_hours = JSON.stringify(v);
    };
    return {
      storeData,
      save,
      form1,
      myUploadFile,
      handleFileUpload,
      cityAreaData,
      areaList,
      priceRangeOption,
      priceRangeClass,
      handlePriceRange,
      categoryOption,
      categoryClass,
      handleCategory,
      isStoreOpen,
      handleImg,
      goto,
      all_addr,
      addStorePinia,
      rewardList,
      showReward,
      handleEmit,
    };
  },
  components: {
    ChooseDate,
  },
};
</script>

<template>
  <header class="c-header c-header-2">
    <nav class="navbar ui-navbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a @click="goto('back')" class="nav-link"
            ><i class="icon icon-back-grey"></i
          ></a>
        </li>
      </ul>
    </nav>
  </header>
  <div class="main">
    <section class="c-main">
      <div class="form-container">
        <form ref="form1">
          <div class="image-container">
            <div class="image">
              <img :src="handleImg(storeData.images)" v-if="storeData.images" />
              <img src="https://fakeimg.pl/340x200/" v-if="!storeData.images" />
            </div>
            <div class="camera-container">
              <label class="form-file-label">
                <i class="icon icon-camera"></i>
              </label>
              <!-- form-file-input 才行; form-control 無法-->
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
          <div class="mb-2">
            <label class="form-label">
              商店名稱
              <span class="must">必填</span>
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="請輸入商店名稱"
              v-model="storeData.name"
            />
          </div>
          <div class="mb-2">
            <label class="form-label"
              >負責人<span class="must">必填</span></label
            >
            <input
              type="text"
              class="form-control"
              placeholder="請輸入負責人名稱"
              v-model="storeData.contact"
              required
            />
          </div>
          <div class="mb-2">
            <label class="form-label"
              >商店地址<span class="must">必填</span></label
            >
            <div class="row mb-2">
              <div class="col">
                <select
                  class="col form-control form-select"
                  v-model="storeData.city"
                  required
                >
                  <option value="undefined" disabled>請選擇縣市</option>
                  <option
                    v-for="item in cityAreaData"
                    :value="item.id"
                    :key="item.id"
                  >
                    {{ item.city_name }}
                  </option>
                </select>
              </div>
              <div class="col">
                <select
                  class="col form-control form-select"
                  v-model="storeData.area"
                  required
                >
                  <option value="undefined" disabled>請選擇鄉鎮區</option>
                  <option
                    v-for="item in areaList"
                    :value="item.id"
                    :key="item.id"
                  >
                    {{ item.area_name }}
                  </option>
                </select>
              </div>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="請輸入商店地址"
              v-model="storeData.address"
              required
            />
          </div>
          <div class="mb-2" v-if="showReward">
            <label class="form-label"
              >回饋級距<span class="must">必填</span></label
            >
            <div class="col">
              <select
                class="col form-control form-select"
                v-model="storeData.rewardRange"
                required
              >
                <option value="undefined" disabled>請回饋級距</option>
                <option
                  v-for="item in rewardList"
                  :value="item.rewardRangeId"
                  :key="item.rewardRangeId"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="mb-2">
            <label class="form-label">電話</label>
            <input
              type="text"
              class="form-control"
              placeholder="請輸入店家電話"
              v-model="storeData.tel"
            />
          </div>
          <ChooseDate :data="storeData" @business_hours="handleEmit" />
          <div class="mb-2">
            <label class="form-label">大分類</label>
            <div class="input-pill">
              <div class="row">
                <div
                  class="col form-check"
                  v-for="item in categoryOption"
                  :key="item"
                >
                  <input
                    type="radio"
                    class="form-check-input"
                    name="kind"
                    :id="item"
                    :checked="item === storeData.category"
                  />
                  <label
                    class="form-check-label"
                    :for="item"
                    @click="handleCategory(item)"
                    >{{ item }}</label
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="mb-2">
            <label class="form-label"
              >價格範圍<span class="must">必填</span></label
            >
            <div class="input-pill">
              <div class="row">
                <div
                  class="col form-check"
                  v-for="item2 in priceRangeOption"
                  :key="item2"
                >
                  <input
                    type="radio"
                    class="form-check-input"
                    name="price"
                    :id="item2"
                    :checked="item2 === storeData.price_range"
                  />
                  <label
                    class="form-check-label"
                    :for="item2"
                    @click="handlePriceRange(item2)"
                    >{{ item2 }}</label
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="mb-2">
            <label class="form-label">分類標籤(請用逗號分格標籤)</label>
            <input
              type="text"
              class="form-control"
              placeholder="請輸入分類標籤"
              v-model="storeData.keywords"
            />
          </div>
          <div class="mt-3 mb-2">
            <div class="form-check form-switch">
              <label class="form-label form-check-label" for="SwitchCheck"
                >商店狀態<span class="must">必填</span></label
              >
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                v-model="isStoreOpen"
                checked
              />
            </div>
          </div>
          <div
            class="btn-container mt-4 d-flex justify-content-center cursor-pointer"
          >
            <button class="btn btn-skip" type="button" v-if="false">
              Skip
            </button>
            <button
              class="btn btn-next-grey"
              type="submit"
              @click.prevent="save"
            >
              <i class="icon icon-next"></i>
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.main {
  margin-top: $header-height;
  padding: 0.25rem;
}
</style>
