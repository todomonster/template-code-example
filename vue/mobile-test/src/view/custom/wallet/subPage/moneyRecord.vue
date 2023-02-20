<script>
import { ref, onMounted } from "vue";
import { apiGetMoneyLogList } from "@/api/myfree";
import { errorHandle } from "@/utils/errorHandle";

import { onBeforeRouteLeave } from "vue-router";
import { isBetweenBottom, windowScrollTo } from "@/utils/helper";
import NoData from "@/components/global/NoData.vue";

export default {
  // 交易紀錄
  name: "MoneyRecord",
  setup() {
    let windowScrollY = 0;
    let getApiTimer = null;

    const walletList = ref([]);
    const APIparams = ref({ page: 1, limit: 50 });
    const total = ref(Infinity);

    const handleScrollGetData = () => {
      if (isBetweenBottom()) {
        getListData();
      }
    };

    const getListData = async () => {
      const { page, limit } = APIparams.value;
      // 預測下一頁，如果不超過資料上限才做GET
      if (limit * page < total.value + limit) {
        let response = await apiGetMoneyLogList(APIparams.value);
        if (response.result) {
          handleListData(response);
        }
      }
    };

    const handleListData = async (response) => {
      const { data } = response;
      // 處理空值
      if (response.total === 0) {
        // walletList.value = [{ content: "暫時沒有通知!" }];
      }

      let newData = data?.filter(
        (x) =>
          x?.statusCode !== 500 &&
          x?.statusCode !== 501 &&
          x?.statusCode !== 502 &&
          x?.statusCode !== 601
      );

      // 處理有值
      walletList.value = walletList.value.concat(newData);
      total.value = response.total;
      APIparams.value.page++;
    };

    onMounted(async () => {
      try {
        // 位移到暫存的y
        document.body.style = "background-color: #EEEEEE;";
        windowScrollTo({ top: windowScrollY });
        await getListData("init");

        getApiTimer = setInterval(handleScrollGetData, 500);
      } catch (error) {
        errorHandle(error);
      }
    });

    onBeforeRouteLeave((to, from, next) => {
      // 離開前紀錄滾動位置

      setTimeout(() => (document.body.style = ""), 500);
      windowScrollY = window.scrollY || 0;
      clearInterval(getApiTimer);
      next();
    });
    return { walletList, APIparams, total };
  },
  components: { NoData },
};
</script>

<template>
  <div class="main-content">
    <NoData v-if="walletList.length == 0" />
    <div v-for="item in walletList" :key="item.createTime">
      <div class="d-flex justify-content-between m-2 bg-white">
        <div class="col-9 m-1">
          <div>{{ item.name }}</div>
          <div>{{ item.createTime }}</div>
        </div>
        <div class="col-3 m-1 text-end money">
          <div>{{ item.amount }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style/index";
</style>
