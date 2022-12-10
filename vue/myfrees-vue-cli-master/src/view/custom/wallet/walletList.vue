<script>
import { ref, onMounted, computed } from "vue";
import { apiGetRewardApplyList } from "@/api/myfree";
import { errorHandle } from "@/utils/errorHandle";

import { onBeforeRouteLeave } from "vue-router";
import { isBetweenBottom, windowScrollTo } from "@/utils/helper";

export default {
  name: "WalletList",
  setup() {
    let windowScrollY = 0;
    let getApiTimer = null;

    const walletList = ref([]);
    const APIparams = ref({ page: 1, limit: 10 });
    const total = ref(Infinity);
    const getListData = async () => {
      if (isBetweenBottom()) {
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

      let newData = data.map(item=>{
        if(item.status===2) item.status="拒絕"
        else if(item.status===1) item.status="成功"
        else item.status="待確認"

        //電話是否要XXX
        return item
      })

      // 處理有值
      walletList.value = walletList.value.concat(newData);
      total.value = response.total;
      APIparams.value.page++;
      
    };

    onMounted(async () => {
      try {
        // 位移到暫存的y
        windowScrollTo({ top: windowScrollY });
        await getListData();

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
    <div v-for="item in walletList" :key="item.createTime">
      <div>{{ item.status }}</div>
      <div>{{ item.phone }}</div>
      <div>{{"-"+item.amount }}</div>
      <div>{{ item.createTime }}</div>
      <br />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
