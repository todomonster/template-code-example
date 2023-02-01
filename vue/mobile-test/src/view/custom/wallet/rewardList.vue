<script>
import { ref, onMounted, computed, watch } from "vue";
import "@/utils/swiper/swiper-bundle.min.css";
import { initSwiper } from "@/utils/swiper/index";
import { apiResponseRewardApply, apiGetRewardApplyList } from "@/api/myfree";
import { errorHandle } from "@/utils/errorHandle";
import NoData from "@/components/global/NoData.vue";
import RewardApplyList from "./subPage/rewardApply.vue";
import { useGlobalStore } from "@/store/global";

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

    const failListData = ref({});
    const successListData = ref({});

    const handlePhoneMask = (phone) =>
      phone.slice(0, 2) + "xxxxx" + phone.slice(-3);

    const getDateMethod = async (inputData, api, query) => {
      const response = await api(query);
      if (response.result) {
        inputData.value = response.data;
      }
    };

    const showTrashcan = computed(() => {
      return false;
      // return tabMode.value === 0 ? true : false;
    });

    onMounted(async () => {
      const limit = 100;
      try {
        getDateMethod(successListData, apiGetRewardApplyList, {
          page: 1,
          limit,
          status: 1,
        });
        getDateMethod(failListData, apiGetRewardApplyList, {
          page: 1,
          limit,
          status: 2,
        });
      } catch (error) {
        errorHandle(error);
      }
    });
    return {
      successListData,
      failListData,
      changeMode,
      showTrashcan,
      goto,
      tabClass,
      tabMode,
      handlePhoneMask,
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
        <li class="nav-item" v-if="showTrashcan">
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
            <a href="javascript:void(0);" class="filter-link active">今日</a>
          </div>
          <div class="col">
            <a href="javascript:void(0);" class="filter-link">3日</a>
          </div>
          <div class="col">
            <a href="javascript:void(0);" class="filter-link">7日</a>
          </div>
          <div class="col">
            <a href="javascript:void(0);" class="filter-link">1個月</a>
          </div>
          <div class="col">
            <a href="javascript:void(0);" class="filter-link">3個月</a>
          </div>
          <div class="col">
            <a href="javascript:void(0);" class="filter-link">1年</a>
          </div>
        </div>
      </div> -->
      <div class="custom-list-wrapper">
        <div v-show="tabMode === 0"><RewardApplyList :tabMode="tabMode" /></div>
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
