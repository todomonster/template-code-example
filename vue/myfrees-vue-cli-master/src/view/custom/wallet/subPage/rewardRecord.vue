<script>
import { ref, onMounted } from "vue";
import { apiGetRewardApplyList } from "@/api/myfree";
import { errorHandle } from "@/utils/errorHandle";

import { onBeforeRouteLeave } from "vue-router";
import { isBetweenBottom, windowScrollTo } from "@/utils/helper";

export default {
  // 回饋紀錄
  name: "RewardRecord",
  setup() {
    let windowScrollY = 0;
    let getApiTimer = null;

    const walletList = ref([]);
    const APIparams = ref({ page: 1, limit: 10 });
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
          let response = await apiGetRewardApplyList(APIparams.value);
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

      let newData = data.map((item) => {
        let { amount, status, phone } = item;

        item.amount = status === 1 ? "-" + amount : "";

        switch (status) {
          case 2:
            item.status = "拒絕";
            break;
          case 1:
            item.status = "成功";
            break;
          default:
            item.status = "待確認";
        }

        item.phone = phone.slice(0, 2) + "xxxxx" + phone.slice(-3) + "申請";

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

        getApiTimer = setInterval(handleScrollGetData, 5000);
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
        <div class="col-8">
          <span>{{ item.status }}</span>
          <span>{{ item.phone }}</span>
          <div>{{ item.createTime }}</div>
        </div>
        <div class="col-4">
          <div>{{ item.amount }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
