<script>
import { ref, onMounted, computed, onUnmounted } from "vue";
import { apiUserGetNotifyList, apiUserReadNotify } from "@/api/myfree";
import { errorHandle } from "@/utils/errorHandle";

import { onBeforeRouteLeave } from "vue-router";
import { isBetweenBottom, windowScrollTo } from "@/utils/helper";

import NoData from "@/components/global/NoData.vue";

export default {
  name: "UserNotifyList",
  setup() {
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
        let response = await apiUserGetNotifyList(APIparams.value);
        if (response.result) {
          handleListData(response);
        }
      }
    };

    const handleListData = async (response) => {
      const { data } = response;
      // 處理有值
      notifyList.value = notifyList.value.concat(data);
      total.value = response.total;
      APIparams.value.page++;

      // 處理已讀
      const readIdArray = data
        .filter((item) => item.isRead == 0)
        .map((item) => item.personalNotifyId);
      if (readIdArray.length > 0) {
        await apiUserReadNotify({
          "id[]": readIdArray,
        });
      }
    };

    onMounted(async () => {
      try {
        await getListData("init");
        getApiTimer = setInterval(handleScrollGetData, 500);
      } catch (error) {
        errorHandle(error);
      }
    });
    onUnmounted(() => {
      clearInterval(getApiTimer);
    });

    return { notifyList, APIparams, total };
  },
  components: { NoData },
};
</script>

<template>
  <!-- 內容 -->
  <section class="c-main">
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
  </section>
</template>
