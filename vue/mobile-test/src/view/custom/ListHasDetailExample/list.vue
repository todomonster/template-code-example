<script>
import { ref, onMounted, computed } from "vue";
import { apiGetNotifyList, apiReadNotify } from "@/api/myfree";
import { errorHandle } from "@/utils/errorHandle";

import { onBeforeRouteLeave } from "vue-router";
import { isBetweenBottom, windowScrollTo } from "@/utils/helper";

export default {
  name: "ListExample",
  setup() {
    let windowScrollY = 0;
    let getApiTimer = null;

    const notifyList = ref([]);
    const APIparams = ref({ page: 1, limit: 10 });
    const total = ref(Infinity);
    const getListData = async () => {
      if (isBetweenBottom()) {
        const { page, limit } = APIparams.value;
        // 預測下一頁，如果不超過資料上限才做GET
        if (limit * page < total.value + limit) {
          let response = await apiGetNotifyList(APIparams.value);
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
        notifyList.value = [{ content: "暫時沒有通知!" }];
      }
      // 處理有值
      notifyList.value = notifyList.value.concat(data);
      total.value = response.total;
      APIparams.value.page++;

      // 處理已讀
      const readIdArray = data.map((item) => item.personalNotifyId);
      await apiReadNotify({ "id[]": readIdArray });
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
    return { notifyList, APIparams, total };
  },
  components: {},
};
</script>

<template>
  <div class="main-content">
    <div v-for="item in notifyList" :key="item.createTime">
      <div>{{ item.notifyType }}</div>
      <div>{{ item.content }}</div>
      <div>{{ item.createTime }}</div>
      <br />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
