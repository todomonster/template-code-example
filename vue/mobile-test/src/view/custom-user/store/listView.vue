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
    const lng = 120.6780227;
    const lat = 24.1465044;

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

    const iconClass = ref("icon icon-map"); //

    onMounted(async () => {
      const response = await apiGetStoreList({
        row: 50,
        data_count_on_page: 0,
      });
      dataList.value = handleData(response.data);
      setTimeout(() => (showMapBtn.value = true), 1000 * 3);
    });

    const showMapBtn = ref(false);

    return {
      dataList,
      handleQuery,
      searchQuery,
      iconClass,
      handleModeChange,
      lat,
      lng,
      // pointList,
      showMapBtn,
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
          <i :class="iconClass" @click="handleModeChange"></i>
        </button>
      </div>
    </div>
    <div class="" v-show="iconClass == 'icon icon-list'">
      <!--使用 GMap 並帶入相關設定資訊-->
      <GMap
        :center="{ lat, lng }"
        :pointList="dataList"
        :streetViewControl="false"
        :mapTypeControl="false"
        :fullscreenControl="false"
        :zoomControl="true"
        :zoom="13"
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
