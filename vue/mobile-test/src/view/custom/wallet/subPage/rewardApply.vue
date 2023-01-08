<script>
import { ref, onMounted } from "vue";
import { apiGetRewardApplyList, apiResponseRewardApply } from "@/api/myfree";
import { errorHandle } from "@/utils/errorHandle";
import {
  ToastInputConfirm,
  ToastConfirm,
  Toast,
} from "@/components/global/swal";

import { onBeforeRouteLeave } from "vue-router";
import { isBetweenBottom, windowScrollTo } from "@/utils/helper";
import NoData from "@/components/global/NoData.vue";

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

    const handleApply = async (id, isApplyConfirm, targetIndex) => {
      let swal = null;
      let response = null;
      if (isApplyConfirm) {
        // 確認回饋
        swal = await ToastConfirm("確認回饋?");
        if (swal) {
          response = await apiResponseRewardApply(id, { result: 1 });
        }
      } else {
        // 拒絕回饋
        swal = await ToastInputConfirm(
          "拒絕回饋",
          `請輸入理由${isApplyConfirm ? "(選填)" : "(必填)"}`
        );
        if (swal.isConfirmed) {
          response = await apiResponseRewardApply(id, {
            result: 0,
            remark: swal.value,
          });
        }
      }

      if (response.result) {
        const message = response.message || "成功!";
        // 清除data
        walletList.value.splice(targetIndex, 1);
        Toast(message);
      } else {
        const message = response.message || "失敗!";
        Toast(message + ",請檢查回饋時間");
      }
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
  components: { NoData },
};
</script>

<template>
  <div class="main-content c-product">
    <div>
      <br />
      <NoData v-if="walletList.length == 0" />
      <div
        v-for="(item, index) in walletList"
        :key="item.createTime"
        class="container"
      >
        <div class="row mt-1 bg-white">
          <div class="col-7 m-1">
            <div class="m-1">
              <h4>{{ item.phone }}</h4>
            </div>
            <div>
              消費金額<span class="money">{{ item.amount }}</span>
            </div>
            <h6>{{ item.createTime }}</h6>
          </div>
          <div class="col d-flex flex-column justify-content-center">
            <button
              @click="handleApply(item.dealRecordId, true, index)"
              class="btn btn-primary custom-primary"
              type="button"
            >
              確認
            </button>
            <button
              @click="handleApply(item.dealRecordId, false, index)"
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
