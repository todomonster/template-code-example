<script>
import { ref, onMounted, onActivated } from "vue";
// import { useGlobalStore } from "@/store/global";
import { errorHandle } from "@/utils/errorHandle";

import BackToTop from "@/components/global-user/BackToTop.vue";
import SaveWindowY from "@/components/global-user/SaveWindowY.vue";
import StoreCards from "@/view/custom-user/store/components/StoreCard.vue";
import SearchStore from "@/view/custom-user/store/components/SearchStore.vue";
import GMap from "@/view/custom-user/map/components/GoogleMap.vue";

import { handleStoreProfile } from "@/utils/handleData";
import { apiGetStoreList } from "@/api/myfree";
import NoData from "@/components/global/NoData.vue";
import { Toast } from "@/components/global/swal";

import { ExtCallGPS, initOS, ExtCall } from "@/utils/extCall";
import { onBeforeRouteLeave } from "vue-router";
import { isBetweenBottom } from "@/utils/helper";

export default {
  props: {
    queryData: Object,
  },
  name: "StoreList",
  setup(props) {
    const dataList = ref([]);
    const APIparams = ref({
      row: 25,
      data_count_on_page: 0,
    });
    let getApiTimer = null;

    /** UI */
    const currentMode = ref(0); //0是大圖列表;1是地圖;2是沒圖的列表
    const clearMarkers = ref(0);
    const showMapBtn = ref(false);
    const iconClass = ref("icon icon-map"); //
    const handleModeChange = (val) => {
      if (val === 0) {
        iconClass.value = "icon icon-map";
        currentMode.value = 0;
      } else if (val === 1) {
        iconClass.value = "icon icon-list";
        currentMode.value = 1;
      }
    };

    /** 處理GPS */
    const lng = ref(120.6780227);
    const lat = ref(24.1465044);
    const centerData = ref({});
    const getCurrentLocation = (GPSstatus) => {
      try {
        window.ExtCallGetCurrentLocation = async (val) => {
          if (val.status) {
            //GET API 刷新search條件
            const config = {
              row: 50,
              data_count_on_page: 0,
              lang: Number(val.latitude),
              long: Number(val.longitude),
            };
            dataList.value = await getStoreList(config);

            //順序是最後觸發否則會被刷新 移動並設置標籤
            centerData.value = {
              lat: Number(val.latitude),
              lng: Number(val.longitude),
              setCenterMarker: true,
            };

            // 記註條件
            APIparams.value = config;
          }
        };
        ExtCallGPS.getCurrentLocation("ExtCallGetCurrentLocation");
      } catch (error) {
        errorHandle(error);
      }
    };
    const handleGPS = () => {
      let os = initOS() || "";
      if (os == "android" || os == "ios") {
        ExtCall.AppToast("定位中...", 1500);
        getCurrentLocation();
      } else {
        Toast(`您的系統為:${os}`);
      }
    };

    /** 處理 search component query */
    const handleQuery = async (val) => {
      const newValue = JSON.stringify(val);
      const oldValue = JSON.stringify(APIparams.value);
      // 阻擋條件相同
      if (newValue === oldValue) {
        Toast("請變更條件");
        return false;
      }

      APIparams.value = JSON.parse(newValue);
      dataList.value = await getStoreList(JSON.parse(newValue));

      // 取第一間店的經緯度 移動 center
      if (dataList.value?.length > 0) {
        const stores = dataList.value?.filter((item) => item.lat && item.lng);
        if (stores?.length > 0) {
          const { lat, lng } = stores[0];
          centerData.value = {
            lat: Number(lat),
            lng: Number(lng),
            setCenterMarker: false,
          };
        }
      }

      return true;
    };

    /** 處理 第一版的資料*/
    const handleData = (arr = []) => {
      arr.forEach((item) => {
        item.images = handleStoreProfile.storeImages(item.images);
        item.lat = item.lang;
        item.lng = item.long;
      });
      return arr;
    };
    const getStoreList = async (config) => {
      try {
        const response = await apiGetStoreList(config);
        return handleData(response.data);
      } catch (error) {
        errorHandle(error);
      }
    };

    onMounted(async () => {
      centerData.value = { lng: 120.6780227, lat: 24.1465044 };
      setTimeout(() => (showMapBtn.value = true), 1000 * 2);
    });

    /** 無限滾動 */
    const data_count_on_page = ref(null);
    const canGetData = ref(true);
    onActivated(async () => {
      getApiTimer = setInterval(async () => {
        if (!isBetweenBottom()) return;
        if (canGetData.value == false) {
          // console.log("冷卻中||資料都拿完了");
          return;
        }
        if (currentMode.value === 1) {
          // console.log("地圖模式不加載資料");
          return;
        }
        if (APIparams.value.data_count_on_page === data_count_on_page.value) {
          // console.log("頁數相同跳過");
          return;
        }

        await handleGet(APIparams.value, { isConcat: true });
        APIparams.value.data_count_on_page += APIparams.value.row;
      }, 500);
    });

    /** 處理 第二版的資料*/
    const handleGet = async (
      param,
      config = { isConcat: false, isReSearch: false }
    ) => {
      try {
        canGetData.value = false;

        const response = await apiGetStoreList(param);
        const { data, result } = response;
        if (result) {
          if (data?.length <= 0) {
            canGetData.value = false;
            // console.log("已經沒資料了")
            return;
          }
          // 成功
          canGetData.value = true;
          data_count_on_page.value = APIparams.value.data_count_on_page;

          const newData = handleData(data);

          dataList.value = config.isConcat
            ? [...dataList.value, ...newData]
            : [...newData];

          if (dataList.value?.length <= 0) {
            // 啟動中斷機制
            canGetData.value = false;
            return;
          }
        }
      } catch (error) {
        errorHandle(error);
      }
    };
    onBeforeRouteLeave((to, from, next) => {
      clearInterval(getApiTimer);
      next();
    });

    return {
      dataList,
      handleQuery,
      APIparams,
      iconClass,
      handleModeChange,
      centerData,
      lat,
      lng,
      // pointList,
      showMapBtn,
      handleGPS,
      clearMarkers,
      currentMode,
    };
  },

  components: {
    NoData,
    BackToTop,
    SaveWindowY,
    StoreCards,
    SearchStore,
    GMap,
  },
};
</script>

<template>
  <!-- 內容 -->
  <section class="c-main">
    <SaveWindowY />
    <div class="navbar-container" v-show="currentMode === 0">
      <SearchStore @queryData="handleQuery" :searchQuery="APIparams" />
      <StoreCards :data="dataList" v-if="dataList?.length > 0" />
      <NoData v-if="!(dataList?.length > 0)" />
      <div class="edit-container edit-container-2" v-if="showMapBtn">
        <button class="btn btn-edit" type="button">
          <i :class="iconClass" @click="handleModeChange(1)"></i>
        </button>
      </div>
    </div>
    <div class="" v-show="currentMode === 1">
      <!--使用 GMap 並帶入相關設定資訊-->
      <GMap
        :clearMarkers="clearMarkers"
        :center="centerData"
        :pointList="dataList"
        :streetViewControl="false"
        :mapTypeControl="false"
        :fullscreenControl="false"
        :zoomControl="true"
        :zoom="15"
      ></GMap>
      <div class="edit-container edit-container-2">
        <button class="btn btn-edit" type="button">
          <i :class="iconClass" @click="handleModeChange(0)"></i>
        </button>
      </div>
      <div class="edit-container edit-container-3">
        <button class="btn btn-edit bg-white" type="button">
          <i class="icon icon-my-location" @click="handleGPS"></i>
        </button>
      </div>
    </div>
    <BackToTop />
  </section>
</template>

<style scoped lang="scss">
.google-map {
  border: 2px solid white;
  border-radius: 15px;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 85vh;
}
.bg-white {
  background-color: grey !important;
}
</style>
