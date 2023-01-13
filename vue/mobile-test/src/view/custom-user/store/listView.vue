<script>
import { ref, onMounted, computed } from "vue";
import { useGlobalStore } from "@/store/global";
import { errorHandle } from "@/utils/errorHandle";
// import NoData from "@/components/global/NoData.vue";
import BackToTop from "@/components/global-user/BackToTop.vue";
import SaveWindowY from "@/components/global-user/SaveWindowY.vue";
import StoreCards from "@/view/custom-user/store/components/StoreCard.vue";
import SearchStore from "@/view/custom-user/store/components/SearchStore.vue";
// import { ExtCall } from "@/utils/extCall";
import { handleStoreProfile } from "@/utils/handleData";
import { apiGetStoreList } from "@/api/myfree";
import NoData from "@/components/global/NoData.vue";

export default {
  name: "StoreList",
  setup() {
    const dataList = ref([]);

    const handleData = (arr = []) => {
      arr.forEach((item) => {
        item.images = handleStoreProfile.storeImages(item.images);
      });
      return arr;
    };

    onMounted(async () => {
      const response = await apiGetStoreList({
        row: 50,
        data_count_on_page: 0,
        // price_range:"$$$"
        // category:"食"
        // city:11
        // area:119
      });
      dataList.value = handleData(response.data);
    });

    return { dataList };
  },

  components: { NoData, BackToTop, SaveWindowY, StoreCards, SearchStore },
};
</script>

<template>
  <!-- 內容 -->
  <section class="c-main">
    <SaveWindowY />
    <div class="navbar-container">
      <SearchStore />
      <StoreCards :data="dataList" v-if="dataList?.length > 0" />
      <NoData v-if="!(dataList?.length > 0)" />
    </div>
    <BackToTop />
  </section>
</template>

<style scoped lang="scss"></style>
