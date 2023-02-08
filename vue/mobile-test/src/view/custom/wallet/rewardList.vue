<script>
import { ref, onMounted, computed, watch, onUnmounted } from "vue";
import "@/utils/swiper/swiper-bundle.min.css";
import { initSwiper } from "@/utils/swiper/index";
import {
  apiGetRewardApplyList,
  apiClearExpiredRewardApply,
} from "@/api/myfree";
import { errorHandle } from "@/utils/errorHandle";
import NoData from "@/components/global/NoData.vue";
import RewardApplyList from "./subPage/rewardApply.vue";
import { useGlobalStore } from "@/store/global";
import { isBetweenBottom } from "@/utils/helper";
import { Toast } from "@/components/global/swal";

export default {
  setup() {
    const globalStore = useGlobalStore();
    const goto = globalStore.goto;

    const tabMode = ref(0); //0:回饋列表; 1:成功; 2:失敗;
    const tabClass = ref(["filter-link active", "filter-link", "filter-link"]);
    const changeMode = (val = 0) => {
      const index = Number(val);
      if (index === 0 || index) {
        const targetIndex = tabClass.value.findIndex(
          (el) => el === "filter-link active"
        );
        tabClass.value[targetIndex] = "filter-link";

        tabClass.value[index] = "filter-link active";
      }

      tabMode.value = val;
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    };
    const handlePhoneMask = (phone) =>
      phone.slice(0, 2) + "xxxxx" + phone.slice(-3);
    const showTrashcan = computed(() => {
      // return false;
      return tabMode.value === 0 ? true : false;
    });

    const triggerClear = ref(1);
    const handleClearExpiredApply = async () => {
      try {
        const response = await apiClearExpiredRewardApply();
        console.log(response);
        if (response.result) {
          // 透過v-if重新reload
          triggerClear.value = 0;
          setTimeout(() => (triggerClear.value = 1), 300);
          Toast("已清除");
        } else {
          errorHandle(response);
        }
      } catch (error) {
        errorHandle(error);
      }
    };

    const failListData = ref({});
    const successListData = ref({});
    const getDataMethod = async (inputData, api, query, total) => {
      const response = await api(query.value);
      if (response.result) {
        inputData.value = response.data;
        total.value = response.total;
        query.value.page++;
      }
    };
    let getApiTimer1 = null;
    let getApiTimer2 = null;
    onMounted(async () => {
      try {
        await getDataMethod(
          successListData,
          apiGetRewardApplyList,
          APIparams1,
          total1
        );

        await getDataMethod(
          failListData,
          apiGetRewardApplyList,
          APIparams2,
          total2
        );

        getApiTimer1 = setInterval(handleScrollGetData1, 500);
        getApiTimer2 = setInterval(handleScrollGetData2, 500);
      } catch (error) {
        errorHandle(error);
      }
    });

    onUnmounted(() => {
      clearInterval(getApiTimer1);
      clearInterval(getApiTimer2);
    });

    const APIparams1 = ref({ page: 1, limit: 10, status: 1 });
    const APIparams2 = ref({ page: 1, limit: 10, status: 2 });
    const total1 = ref(Infinity);
    const total2 = ref(Infinity);

    const handleScrollGetData1 = () => {
      if (isBetweenBottom()) {
        getListData(APIparams1, successListData, total1, 1);
      }
    };
    const handleScrollGetData2 = () => {
      if (isBetweenBottom()) {
        getListData(APIparams2, failListData, total2, 2);
      }
    };

    const getListData = async (query, data, total, targetMode) => {
      if (targetMode !== tabMode.value) return;
      const { page, limit } = query.value;
      let response = {};
      // 預測下一頁，如果不超過資料上限才做GET
      if (limit * page < total.value + limit) {
        response = await apiGetRewardApplyList(query.value);

        if (response.result) {
          // 處理有值
          data.value = data.value.concat(response.data);
          total.value = response.total;
          query.value.page++;
        }
      }
    };

    return {
      successListData,
      failListData,
      changeMode,
      showTrashcan,
      goto,
      tabClass,
      tabMode,
      handlePhoneMask,
      APIparams1,
      APIparams2,
      handleClearExpiredApply,
      triggerClear,
    };
  },

  components: {
    NoData,
    RewardApplyList,
  },
};
</script>

<template>
  <header class="c-header">
    <nav class="navbar ui-navbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" @click="goto('back')"
            ><i class="icon icon-back"></i
          ></a>
        </li>
      </ul>
      <h1 class="navbar-brand">
        <img src="@/assets/images/logo_s.png" />
      </h1>
      <ul class="navbar-nav">
        <li
          class="nav-item"
          v-if="showTrashcan"
          @click="handleClearExpiredApply"
        >
          <a class="nav-link"><i class="icon icon-delete"></i></a>
        </li>
      </ul>
    </nav>
  </header>
  <!-- 內容 -->
  <section class="c-main main">
    <div class="swiper-container ui-page">
      <div class="filter-containter">
        <div class="row">
          <div class="col">
            <a @click="changeMode(0)" :class="tabClass[0]">申請中</a>
          </div>
          <div class="col">
            <a @click="changeMode(1)" :class="tabClass[1]">已同意</a>
          </div>
          <div class="col">
            <a @click="changeMode(2)" :class="tabClass[2]">已拒絕</a>
          </div>
        </div>
      </div>
    </div>

    <div class="swiper-container ui-page">
      <!-- <div class="filter-containter">
        <div class="row">
          <div class="col">
            <a  class="filter-link active">今日</a>
          </div>
          <div class="col">
            <a  class="filter-link">3日</a>
          </div>
          <div class="col">
            <a  class="filter-link">7日</a>
          </div>
          <div class="col">
            <a  class="filter-link">1個月</a>
          </div>
          <div class="col">
            <a  class="filter-link">3個月</a>
          </div>
          <div class="col">
            <a  class="filter-link">1年</a>
          </div>
        </div>
      </div> -->
      <div class="custom-list-wrapper">
        <div v-show="tabMode === 0">
          <div v-if="triggerClear">
            <RewardApplyList :tabMode="tabMode" />
          </div>
        </div>
        <div v-show="tabMode === 1">
          <NoData v-if="successListData.length == 0" />
          <div v-for="item in successListData" :key="item.createTime">
            <div class="d-flex justify-content-between m-2 bg-white">
              <div class="col-8 m-1">
                <span>{{
                  `${item.phone ? handlePhoneMask(item.phone) : "無"} - ${
                    item.userName ? item.userName : "無"
                  }`
                }}</span>
                <div>{{ item.createTime }}</div>
              </div>
              <div class="col m-1 text-end money">
                <span>{{ item.amount ? `$ -${item.amount}` : "" }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="tabMode === 2">
          <NoData v-if="failListData.length == 0" />
          <div v-for="item in failListData" :key="item.createTime">
            <div class="d-flex justify-content-between m-2 bg-white">
              <div class="col-8 m-1">
                <span>{{
                  `${item.phone ? handlePhoneMask(item.phone) : "無"} - ${
                    item.userName ? item.userName : "無"
                  }`
                }}</span>
                <div>{{ item.createTime }}</div>
              </div>
              <div class="col m-1 text-end money">
                <span>{{ item.amount ? `$ ${item.amount}` : "" }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
@import "./subPage/style/index";
.main {
  margin-top: $header-height;
  margin-bottom: calc($footer-height + 15px);
}
</style>
