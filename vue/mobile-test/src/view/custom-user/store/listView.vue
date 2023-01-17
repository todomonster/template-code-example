<script>
import {
  ref,
  onMounted,
  onBeforeMount,
  onUnmounted,
  computed,
  watch,
} from "vue";
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

export default {
  props: {
    queryData: Object,
  },
  name: "StoreList",
  setup(props) {
    const lat = 25.0325917;
    const lng = 121.5624999;
    const pointList = [
      {
        id: 1,
        name: "餐廳一",
        lat: 25.034,
        lng: 121.5645,
      },
      {
        id: 2,
        name: "餐廳二",
        lat: 25.036643,
        lng: 121.567678,
      },
      {
        id: 3,
        name: "餐廳三",
        lat: 25.033643,
        lng: 121.566678,
      },
    ];

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

    const iconClass = ref("icon icon-map"); //

    onMounted(async () => {
      const response = await apiGetStoreList({
        row: 50,
        data_count_on_page: 0,
      });
      dataList.value = handleData(response.data);
    });

    return {
      dataList,
      handleQuery,
      searchQuery,
      iconClass,
      handleModeChange,
      lat,
      lng,
      pointList,
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
      <div class="edit-container edit-container-2">
        <button class="btn btn-edit" type="button">
          <i :class="iconClass" @click="handleModeChange"></i>
        </button>
      </div>
    </div>
    <div class="" v-show="iconClass == 'icon icon-list'">
      <!--使用 GMap 並帶入相關設定資訊-->
      <GMap
        :center="{ lat, lng }"
        :pointList="pointList"
        :streetViewControl="false"
        :mapTypeControl="false"
        :fullscreenControl="true"
        :zoomControl="true"
      ></GMap>
      <div class="edit-container edit-container-2">
        <button class="btn btn-edit" type="button">
          <i :class="iconClass" @click="handleModeChange"></i>
        </button>
      </div>
    </div>
    <BackToTop />
  </section>
</template>

<style scoped lang="scss">
.google-map {
  border: 2px solid white;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 85vh;

}
</style>
