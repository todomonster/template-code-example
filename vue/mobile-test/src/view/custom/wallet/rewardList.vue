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

    const applyListData = ref({});
    const failListData = ref({});
    const successListData = ref({});

    const observerTarget = ref('{"a":null,"b":null,"c":null}');

    const getDateMethod = async (inputData, api, query) => {
      const response = await api(query);
      if (response.result) {
        inputData.value = response.data;
      }
    };

    const observer = (DOMid) => {
      // https://thatcatinsomnia.medium.com/%E6%AA%A2%E6%9F%A5element%E6%98%AF%E5%90%A6%E5%87%BA%E7%8F%BE%E5%9C%A8%E7%95%AB%E9%9D%A2%E4%B9%8B%E4%B8%AD-check-if-an-element-gets-visible-in-the-screen-during-scrolling-57a9230ea843
      const target = document.getElementById(DOMid);
      const options = {
        // 四個數值分別表示上、右、下、左
        rootMargin: "0px 0px 0px 0px",
      };

      const onIntersection = (entries) => {
        const target = JSON.parse(observerTarget.value);
        entries.forEach((entry) => {
          target[DOMid] = entry.isIntersecting ? 1 : 0;
          observerTarget.value = JSON.stringify(target);
        });
      };

      const observer = new IntersectionObserver(onIntersection, options);

      observer.observe(target);
    };

    watch(
      () => observerTarget.value,
      (newQuestion, oldQuestion) => {
        // console.log(newQuestion);
        if (newQuestion.indexOf("null") > -1) {
          return;
        }
        const falg =
          (newQuestion == '{"a":1,"b":1,"c":0}' &&
            oldQuestion == '{"a":1,"b":1,"c":1}') ||
          newQuestion == '{"a":1,"b":1,"c":1}' ||
          (newQuestion == '{"a":0,"b":1,"c":1}' &&
            oldQuestion == '{"a":1,"b":1,"c":1}');

        if (falg) {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
          });
        }
      }
    );

    const showTrashcan = computed(() => {
      return (
        observerTarget.value === '{"a":1,"b":1,"c":0}' ||
        observerTarget.value === '{"a":1,"b":0,"c":0}'
      );
    });

    onMounted(async () => {
      const limit = 100;
      initSwiper(3);
      try {
        // 開始監聽 如果有改變swiper位置的話滾動到最上方
        observer("a");
        observer("b");
        observer("c");

        // getDateMethod(applyListData, apiGetRewardApplyList, {
        //   page: 1,
        //   limit,
        //   status: 0,
        // });
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
      applyListData,
      successListData,
      failListData,
      observerTarget,
      showTrashcan,
      goto
    };
  },

  components: { NoData, RewardApplyList },
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
        <!-- <span>會員回饋確認</span> -->
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
    <div class="swiper-container ui-tab">
      <div class="swiper-wrapper">
        <div class="swiper-slide" @click="toTop"><span>申請列表</span></div>
        <div class="swiper-slide" @click="toTop"><span>同意</span></div>
        <div class="swiper-slide" @click="toTop"><span>拒絕</span></div>
      </div>
    </div>
    <div class="swiper-container ui-page">
      <div class="filter-containter">
        <!-- 先不做此功能 -->
        <!-- <div class="row">
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
        </div> -->
      </div>
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="item-container item-container-3" id="a">
            <RewardApplyList />
            <!-- <NoData v-if="applyListData.length <= 0" />
            <div v-for="data in applyListData" :key="data.createTime">
              <div class="d-flex">
                <div class="col-left">
                  <div class="title">
                    {{ data.storeName }} 福利金回饋 ${{ data.amount }}
                  </div>
                  <div class="date">{{ data.createTime }}</div>
                  <div v-if="data.status == 2" class="note">
                    {{ data.memo }}
                  </div>
                </div>
                <div class="col-right">
                  <div v-if="data.status == 0" class="black">待確認</div>
                  <div v-else-if="data.status == 1" class="green">核准</div>
                  <div v-else-if="data.status == 2" class="red">取消</div>
                </div>
              </div>
            </div> -->
          </div>
        </div>
        <div class="swiper-slide">
          <div class="item-container item-container-3" id="b">
            <NoData v-if="failListData.length <= 0" />
            <div v-for="data in failListData" :key="data.id">
              <div class="d-flex">
                <div class="col-left">
                  <div class="title">{{ data.name }}</div>
                  <div class="date">{{ data.createTime }}</div>
                </div>
                <div class="col-right">
                  <div v-if="data.status == 1" class="green">
                    {{ data.amount }}
                  </div>
                  <div v-else-if="data.status == 0" class="red">
                    {{ data.amount }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="item-container item-container-3" id="c">
            <NoData v-if="successListData.length <= 0" />
            <div v-for="data in successListData" :key="data.id">
              <div class="d-flex">
                <div class="col-left">
                  <div class="title">{{ data.name }}</div>
                  <div class="date">{{ data.createTime }}</div>
                </div>
                <div class="col-right">
                  <div v-if="data.status == 1" class="green">
                    {{ data.amount }}
                  </div>
                  <div v-else-if="data.status == 0" class="red">
                    {{ data.amount }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.main {
  margin-top: $header-height;
  margin-bottom: calc($footer-height + 15px);
}
.ui-page {
  height: calc(100vh - $header-height - 15px);
}
</style>
