<script>
import { ref, onMounted, reactive } from "vue";
import { useGlobalStore } from "@/store/global";
import { errorHandle } from "@/utils/errorHandle";
// import NoData from "@/components/global/NoData.vue";
import BackToTop from "@/components/global-user/BackToTop.vue";
import SaveWindowY from "@/components/global-user/SaveWindowY.vue";
import StoreCards from "@/view/custom-user/store/components/StoreCard.vue";
import SearchStore from "@/view/custom-user/store/components/SearchStore.vue";
import GMap from "@/view/custom-user/map/components/GoogleMap.vue";
// import { ExtCall } from "@/utils/extCall";
import { handleStoreProfile } from "@/utils/handleData";
import { apiGetStoreList } from "@/api/myfree";
import NoData from "@/components/global/NoData.vue";
import { Toast } from "@/components/global/swal";

import { ExtCallGPS, initOS, ExtCall } from "@/utils/extCall";

export default {
  props: {
    queryData: Object,
  },
  name: "StoreList",
  setup(props) {
    const lng = ref(120.6780227);
    const lat = ref(24.1465044);
    // const centerData = ref([120.6780227, 24.1465044]);
    const centerData = ref({});

    const dataList = ref([]);
    const searchQuery = ref({});

    const handleQuery = async (val) => {
      const newValue = JSON.stringify(val);
      const oldValue = JSON.stringify(searchQuery.value);

      if (newValue === oldValue) {
        Toast("請變更條件");
        return;
      }

      searchQuery.value = JSON.parse(newValue);
      const response = await apiGetStoreList(JSON.parse(newValue));
      dataList.value = handleData(response.data);
    };

    const handleData = (arr = []) => {
      arr.forEach((item) => {
        item.images = handleStoreProfile.storeImages(item.images);
        item.lat = item.lang;
        item.lng = item.long;
      });
      return arr;
    };

    const handleModeChange = () => {
      if (iconClass.value == "icon icon-map") {
        iconClass.value = "icon icon-list";
      } else {
        iconClass.value = "icon icon-map";
      }
    };
    const clearMarkers = ref(0);

    const getCurrentLocation = (GPSstatus) => {
      try {
        window.ExtCallGetCurrentLocation = async (val) => {
          // alert(`aaa:${JSON.stringify(val)}`);
          if (val.status) {
            centerData.value = {
              lat: Number(val.latitude),
              lng: Number(val.longitude),
            };
          }
        };
        ExtCallGPS.getCurrentLocation("ExtCallGetCurrentLocation");
      } catch (error) {
        alert(error.message);
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

    const iconClass = ref("icon icon-map"); //

    onMounted(async () => {
      centerData.value = { lng: 120.6780227, lat: 24.1465044 };
      const response = await apiGetStoreList({
        row: 50,
        data_count_on_page: 0,
      });
      dataList.value = handleData(response.data);

      setTimeout(() => (showMapBtn.value = true), 1000 * 3);
    });

    const showMapBtn = ref(true);

    return {
      dataList,
      handleQuery,
      searchQuery,
      iconClass,
      handleModeChange,
      centerData,
      lat,
      lng,
      // pointList,
      showMapBtn,
      handleGPS,
      clearMarkers,
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
    <div class="navbar-container" v-show="iconClass == 'icon icon-map'">
      <SearchStore @queryData="handleQuery" />
      <StoreCards :data="dataList" v-if="dataList?.length > 0" />
      <NoData v-if="!(dataList?.length > 0)" />
      <div class="edit-container edit-container-2" v-if="showMapBtn">
        <button class="btn btn-edit" type="button">
          <i class="icon icon-map" @click="handleModeChange"></i>
        </button>
      </div>
    </div>
    <div class="" v-show="iconClass == 'icon icon-list'">
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
          <i :class="iconClass" @click="handleModeChange"></i>
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
