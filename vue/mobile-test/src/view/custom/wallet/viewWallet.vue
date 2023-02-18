<script>
import { ref, onMounted } from "vue";
import { useGlobalStore } from "@/store/global";
import { errorHandle } from "@/utils/errorHandle";

import img_06 from "@/assets/icon/member06.svg";
// call api
import { apiGetWallet } from "@/api/myfree";
import ArrowIcon from "@/components/global/ArrowIcon.vue";

export default {
  name: "ViewWallet",
  setup() {
    const activityBaseUrl = process.env.VUE_APP_API_BASE_URL;
    const walletData = ref({});
    const globalStore = useGlobalStore();
    const goto = globalStore.goto;

    const getData = async () => {
      let response = await apiGetWallet();
      if (response.result) {
        walletData.value = response;
      }
    };

    const name = [
      "會員回饋確認",
      "回饋紀錄",
      "交易紀錄",
      "顧客索取回饋",
      "提領功能(目前正在準備中...)",
    ];
    const link = [
      "/wallet/rewardApply",
      "/wallet/rewardRecord",
      "/wallet/moneyRecord",
      "/wallet/rewardList",
    ];

    onMounted(async () => {
      try {
        await getData();
      } catch (error) {
        errorHandle(error);
      }
    });

    return {
      name,
      link,
      goto,
      img_06,
      walletData,
      activityBaseUrl,
    };
  },

  components: { ArrowIcon },
};
</script>

<template>
  <div class="main">
    <ul class="list-group list-group-flush">
      <div class="money">
        NT$<span>{{
          ` ${walletData.balance ? walletData.balance.slice(0, -2) : "$$$$$"} `
        }}</span
        >可用餘額
      </div>
      <!-- <div class="listItem">
        <button
          type="button"
          class="list-group-item list-group-item-action"
          @click="goto('router', link[0])"
        >
          <div class="d-flex justify-content-between grey">
            <div>
              <i class="fa fa-file mx-1" aria-hidden="true"></i>
              {{ name[0] }}
            </div>
            <ArrowIcon />
          </div>
        </button>
      </div>
      <div class="listItem">
        <button
          type="button"
          class="list-group-item list-group-item-action"
          @click="goto('router', link[1])"
        >
          <div class="d-flex justify-content-between grey">
            <div>
              <i class="fa fa-file mx-1" aria-hidden="true"></i>
              {{ name[1] }}
            </div>
            <ArrowIcon />
          </div>
        </button>
      </div> -->
      <div class="listItem">
        <button
          type="button"
          class="list-group-item list-group-item-action"
          @click="goto('router', link[3])"
        >
          <div class="d-flex justify-content-between grey">
            <div>
              <i class="fa fa-file mx-1" aria-hidden="true"></i>
              {{ name[3] }}
            </div>
            <ArrowIcon />
          </div>
        </button>
      </div>
      <div class="listItem">
        <button
          type="button"
          class="list-group-item list-group-item-action"
          @click="goto('router', link[2])"
        >
          <div class="d-flex justify-content-between grey">
            <div>
              <i class="fa fa-coins mx-1" aria-hidden="true"></i>
              {{ name[2] }}
            </div>
            <ArrowIcon />
          </div>
        </button>
      </div>
      <div class="listItem">
        <button type="button" class="list-group-item list-group-item-action">
          <div class="d-flex justify-content-between grey">
            <div>
              <i class="fa fa-coins mx-1" aria-hidden="true"></i>
              {{ name[4] }}
            </div>
          </div>
        </button>
      </div>
    </ul>
    <div class="image-container m-4">
      <div class="image">
        <img
          src="@/assets/images/img_bonus.png"
          @click="goto('toBrowser', `${activityBaseUrl}/activity`)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grey {
  color: #7d7d7d;
}

.main {
  margin-top: $header-height;
  margin-bottom: calc($footer-height + 15px);
  padding: 0rem;

  .listItem {
    border-bottom: 0px solid #e8e8e8;

    button {
      height: 50px;
      font-size: 1rem;
      font-weight: 400;
      border: none;
    }
  }
}

.money {
  background-color: #fef4d4;
  color: #fca647;
  padding: 0.5rem;
  span {
    font-size: 1.5rem;
    font-weight: 900 !important;
  }
}
</style>
