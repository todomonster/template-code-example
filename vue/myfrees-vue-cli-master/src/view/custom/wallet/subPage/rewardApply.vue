<script>
import { ref, onMounted } from "vue";
import { apiGetRewardApplyList, apiResponseRewardApply } from "@/api/myfree";
import { errorHandle } from "@/utils/errorHandle";
import { ToastInputConfirm } from "@/components/global/swal";

import { onBeforeRouteLeave } from "vue-router";
import { isBetweenBottom, windowScrollTo } from "@/utils/helper";

export default {
  // 回饋申請列表
  name: "RewardApply",
  setup() {
    let windowScrollY = 0;
    let getApiTimer = null;

    const walletList = ref([]);
    const APIparams = ref({ page: 1, limit: 10, status: 0 });
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
        let { amount, phone } = item;
        item.amount = "" + amount;
        item.phone = phone.slice(0, 2) + "xxxxx" + phone.slice(-3);

        return item;
      });

      // 處理有值
      walletList.value = walletList.value.concat(newData);
      total.value = response.total;
      APIparams.value.page++;
    };

    const handleApply = async (id, isConfirm) => {
      await ToastInputConfirm(
        "請確認",
        `請輸入理由${isConfirm ? "(選填)" : "(必填)"}`
      ).then((result) => {
        if (result.isConfirmed) removeAppliedItem(id);
        // if (isConfirm) apiResponseRewardApply(id, { result: 1, remark: result.value });
        // else apiResponseRewardApply(id, { result: 0, remark: result.value });
      });
    };

    const removeAppliedItem = (id) =>
      (walletList.value = walletList.value.filter(
        (item) => item.dealRecordId !== id
      ));

    onMounted(async () => {
      try {
        // 位移到暫存的y
        document.body.style = "background-color: #EEEEEE;";
        windowScrollTo({ top: windowScrollY });
        await getListData();

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
    return {
      walletList,
      APIparams,
      total,
      handleApply,
    };
  },
  components: {},
};
</script>

<template>
  <div class="main-content c-product">
    <div>
      <br />
      <div v-if="walletList.length === 0">暫時沒有資料</div>
      <div v-for="item in walletList" :key="item.createTime">
        <div class="row mt-1 bg-white">
          <div class="col-7 m-1">
            <div class="m-1">
              <h4>{{ item.phone }}</h4>
            </div>
            <div>
              消費金額<span class="money">{{ item.amount }}</span>
            </div>
            <div>{{ item.createTime }}</div>
          </div>
          <div class="col d-flex flex-column">
            <button
              @click="handleApply(item.dealRecordId, true)"
              class="btn btn-primary custom-primary"
              type="button"
            >
              確認
            </button>
            <button
              @click="handleApply(item.dealRecordId, false)"
              class="btn btn-danger"
              type="button"
            >
              拒絕
            </button>
          </div>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
button {
  margin: 3px;
}
@import "./style/index";
</style>
