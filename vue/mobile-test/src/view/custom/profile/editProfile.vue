<script>
import { ref, onMounted, onBeforeMount, computed, watch } from "vue";
import { handleStoreProfile } from "@/utils/handleData";
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
    const { goto, setStoreData } = globalStore;

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
            is_open: "1",
          };
          const response = await apiStoreRegister(newPostData);
          if (response.result || response.success === "OK") {
            setStoreData({
              status: false,
              mobile: "",
              password: "",
            });
            Toast("加入會員成功");
            goto("router", `/`);
          } else {
            errorHandle(response);
          }
        }
        return;
      }
      if (form1.value.reportValidity()) {
        // edit

        const newData = {
          ...storeData.value,
          all_addr: all_addr.value,
        };

        const response = await apiUpdateStore(newData);
        if (response.result) {
          Toast("更新成功");
        } else {
          errorHandle(response);
        }
      }
    };

    watch(
      () => storeData.value?.city,
      async (val) => {
        const area = JSON.parse(JSON.stringify(fullArea.value));
        const ans = area.filter((area) => area.city_id === val);
        areaList.value = ans;
        // 沒有預設值才加上
        if (!storeData.value.area) {
          storeData.value.area = areaList.value?.[0]?.id;
        }
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
      // 處理回饋級距
      const getRewardList = await apiGetRewardRange();
      rewardList.value = getRewardList.data;
      // 取得 pinia 的 password 和 phone 判斷是否是註冊
      const { password, mobile, status } = globalStore.isToAddStore;
      if (status) {
        showReward.value = true;
        addStorePinia.value = { password, mobile, status };
      } else {
        // 不是註冊 進入編輯流程
        storeData.value = await apiGetStore();

        if (storeData.value.is_open == 0) {
          isStoreOpen.value = false;
        }
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
        const getFile = fileInput?.files?.[0];

        if (getFile) {
          const fileSize = getFile?.size / 1024 / 1024;
          if (fileSize > process.env.VUE_APP_UPLOAD_LIMIT) {
            fileInput.value = "";
            Toast(`圖片檔案大小上限為${process.env.VUE_APP_UPLOAD_LIMIT}MB`);
          } else {
            const response = await apiStoreUpload(requestData);

            if (response.result) {
              storeData.value.images = `["${response.path}"]` || "";
            }
          }

        }else{
          Toast(`圖片上傳失敗`);
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
      return handleStoreProfile.storeImages(item);
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
    const goback = () => {
      const { status } = globalStore.isToAddStore;
      if (status) {
        // 是註冊
        goto("router", "/signup");
      } else {
        // 不是註冊 進入編輯流程
        goto("router", "/profile/view");
      }
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
      goback,
    };
  },
  components: {
    ChooseDate,
  },
};
</script>

<template>
  <div>
    <header class="c-header c-header-2">
      <nav class="navbar ui-navbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a @click="goback" class="nav-link"
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
                <img
                  :src="handleImg(storeData.images)"
                  onerror="this.onerror=null; this.src='https://fakeimg.pl/340x200/?text=商店&font=noto'"
                  v-if="storeData.images"
                />
                <img
                  src="https://fakeimg.pl/340x200/?text=商店&font=noto"
                  v-if="!storeData.images"
                />
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
              <label class="form-label"
                >電話<span class="must">必填</span></label
              >
              <input
                type="text"
                class="form-control"
                placeholder="請輸入店家電話"
                v-model="storeData.tel"
                required
              />
            </div>
            <ChooseDate :data="storeData" @business_hours="handleEmit" />
            <div class="mb-2">
              <label class="form-label"
                >大分類<span class="must">必填</span></label
              >
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
                      required
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
                      required
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
              <label class="form-label"
                >分類標籤(逗號分格)<span class="must">必填</span></label
              >
              <input
                type="text"
                class="form-control"
                placeholder="美食,回饋"
                v-model="storeData.keywords"
                required
              />
            </div>
            <div class="mt-3 mb-3" v-if="!showReward">
              <div class="form-check form-switch">
                <label class="form-label form-check-label"
                  >商店開店狀態<span class="must">必填</span></label
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
  </div>
</template>

<style lang="scss" scoped>
.main {
  margin-top: $header-height;
  padding: 0.25rem;
}
</style>
