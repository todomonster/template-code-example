<script>
import { ref, onMounted, computed } from "vue";
import { apiGetNotifyList, apiReadNotify } from "@/api/myfree";
import { errorHandle } from "@/utils/errorHandle";

import { onBeforeRouteLeave } from "vue-router";
import { isBetweenBottom, windowScrollTo } from "@/utils/helper";

import NoData from "@/components/global/NoData.vue";

export default {
  name: "NotifyList",
  setup() {
    let windowScrollY = 0;
    let getApiTimer = null;

    const notifyList = ref([]);
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
        let response = await apiGetNotifyList(APIparams.value);
        if (response.result) {
          handleListData(response);
        }
      }
    };

    const handleListData = async (response) => {
      const { data } = response;
      // 處理空值
      // if (response.total === 0) {
      //   notifyList.value = [{ content: "暫時沒有通知!" }];
      // }
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
        await getListData("init");

        getApiTimer = setInterval(handleScrollGetData, 500);
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
  components: {NoData},
};
</script>

<template>
  <div class="main-content">
    <div class="notice-container">
      <NoData v-if="notifyList.length == 0" />      
      <div class="card" v-for="item in notifyList" :key="item.createTime">
        <div class="card-header">
          <div class="card-link">
            <img src="@/assets/images/img_myfree_s.png" class="card-img" />
          </div>
        </div>
        <div class="card-body">
          <div class="card-title">{{ item.notifyType }}</div>
          <div class="card-text">
            {{ item.content }}
          </div>
          <div class="card-date">{{ item.createTime }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
