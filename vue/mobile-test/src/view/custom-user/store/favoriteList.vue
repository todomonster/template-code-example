<script>
import { ref, onMounted, onActivated } from "vue";
import { useGlobalStore } from "@/store/global";
import { errorHandle } from "@/utils/errorHandle";
// import NoData from "@/components/global/NoData.vue";
import BackToTop from "@/components/global-user/BackToTop.vue";
import SaveWindowY from "@/components/global-user/SaveWindowY.vue";
import StoreCards from "@/view/custom-user/store/components/StoreCard.vue";
// import { ExtCall } from "@/utils/extCall";
import { handleStoreProfile } from "@/utils/handleData";
import { apiGetStoreList } from "@/api/myfree";
import NoData from "@/components/global/NoData.vue";
import { isBetweenBottom } from "@/utils/helper";
import { onBeforeRouteLeave } from "vue-router";

export default {
  name: "FavoriteStoreList",
  setup() {
    const dataList = ref([]);
    const data_count_on_page = ref(null);
    let APIparams = ref({
      favorite: 1,
      row: 25,
      data_count_on_page: 0,
    });
    let getApiTimer = null;
    const canGetData = ref(true);

    onActivated(async () => {
      getApiTimer = setInterval(async () => {
        if (!isBetweenBottom()) return;
        if (canGetData.value == false) {
          // console.log("冷卻中||資料都拿完了");
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

    const handleGet = async (
      param,
      config = { isConcat: false, isReSearch: false }
    ) => {
      try {
        canGetData.value = false;
        const handleData = (arr = []) => {
          // console.log(arr);
          arr.forEach((item) => {
            item.images = handleStoreProfile.storeImages(item.images);
          });
          return arr;
        };

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

          if (config.isConcat) {
            dataList.value = [...dataList.value, ...newData];
          } else {
            dataList.value = [...newData];
          }

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

    return { dataList };
  },

  components: { NoData, BackToTop, SaveWindowY, StoreCards },
};
</script>

<template>
  <!-- 內容 -->
  <section class="c-main">
    <SaveWindowY />
    <StoreCards :data="dataList" v-if="dataList?.length > 0" />
    <NoData v-if="!(dataList?.length > 0)" />
    <BackToTop />
  </section>
</template>

<style scoped lang="scss"></style>
