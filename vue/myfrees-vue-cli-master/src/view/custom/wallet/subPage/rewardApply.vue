<script>
import { ref, onMounted } from "vue";
import { apiGetRewardApplyList, apiResponseRewardApply } from "@/api/myfree";
import { errorHandle } from "@/utils/errorHandle";

import { onBeforeRouteLeave } from "vue-router";
import { isBetweenBottom, windowScrollTo } from "@/utils/helper";

export default {
  // 回饋申請列表
  name: "RewardApply",
  setup() {
    let windowScrollY = 0;
    let getApiTimer = null;

    const walletList = ref([]);
    const APIparams = ref({ page: 1, limit: 10 });
    const total = ref(Infinity);
    const getListData = async (mode) => {
      if (mode === "init" || isBetweenBottom()) {
        const { page, limit } = APIparams.value;
        // 預測下一頁，如果不超過資料上限才做GET
        if (limit * page < total.value + limit) {
          let response = await apiGetRewardApplyList(APIparams.value);
          if (response.result) {
            handleListData(response);
          }
        }
      }
    };
    const handleListData = async (response) => {
      const { data } = response;
      // 處理空值
      if (response.total === 0) {
        // walletList.value = [{ content: "暫時沒有通知!" }];
      }

      let newData = data.map((item) => {
        let { amount, phone } = item;
        item.amount = "消費金額" + amount;
        item.phone = phone.slice(0, 2) + "xxxxx" + phone.slice(-3);

        return item;
      });

      // 處理有值
      walletList.value = walletList.value.concat(newData);
      total.value = response.total;
      APIparams.value.page++;
    };

    onMounted(async () => {
      try {
        // 位移到暫存的y
        windowScrollTo({ top: windowScrollY });
        await getListData("init");

        getApiTimer = setInterval(getListData, 500);
      } catch (error) {
        errorHandle(error);
      }
    });

    onBeforeRouteLeave((to, from, next) => {
      // 離開前紀錄滾動位置
      windowScrollY = window.scrollY || 0;
      clearInterval(getApiTimer);
      next();
    });
    return { walletList, APIparams, total };
  },
  components: {},
};
</script>

<template>
  <div class="main-content">
    <div v-if="walletList.length === 0">暫時沒有資料</div>
    <div v-for="item in walletList" :key="item.createTime">
      <div class="row my-5">
        <div class="col">
          <div>{{ item.phone }}</div>
          <div>{{ item.amount }}</div>
          <div>{{ item.createTime }}</div>
        </div>
        <div class="col d-flex flex-column">
          <button
            @click="apiResponseRewardApply(item.dealRecordId, item)"
            class="btn btn-primary"
            type="button"
          >
            確認
          </button>
          <button class="btn btn-primary" type="button">拒絕</button>
        </div>
      </div>
      <br />
    </div>
  </div>
</template>

<style lang="scss" scoped>
button {
  margin: 3px;
}
</style>
