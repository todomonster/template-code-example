<script>
import { ref, onMounted, computed, watch, onUnmounted } from "vue";
import "@/utils/swiper/swiper-bundle.min.css";
import { initSwiper } from "@/utils/swiper/index";
import { apiGetUserRecordList, apiGetUserMoneyList } from "@/api/myfree";
import { errorHandle } from "@/utils/errorHandle";
import NoData from "@/components/global/NoData.vue";
import { isBetweenBottom } from "@/utils/helper";

export default {
  setup() {
    const recordListData = ref([]);
    const pointListData = ref([]);
    const moneyListData = ref([]);

    const observerTarget = ref('{"a":null,"b":null,"c":null}');

    const getDataMethod = async (inputData, api, query, total) => {
      const response = await api(query.value);
      if (response.result) {
        inputData.value = response.data;
        total.value = response.total;
        query.value.page++;
      }
    };
    let getApiTimer1 = null;

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

    onMounted(async () => {
      initSwiper(3);
      try {
        // 開始監聽 如果有改變swiper位置的話滾動到最上方
        observer("ida");
        observer("idb");
        observer("idc");

        await getDataMethod(
          recordListData,
          apiGetUserRecordList,
          APIparams1,
          total1
        );
        await getDataMethod(
          pointListData,
          apiGetUserMoneyList,
          APIparams2,
          total2
        );
        await getDataMethod(
          moneyListData,
          apiGetUserMoneyList,
          APIparams3,
          total3
        );

        getApiTimer1 = setInterval(handleScrollGetData1, 500);
      } catch (error) {
        errorHandle(error);
      }
    });

    onUnmounted(() => {
      clearInterval(getApiTimer1);
    });

    const APIparams1 = ref({ page: 1, limit: 10 });
    const APIparams2 = ref({ page: 1, limit: 10, type: "point" });
    const APIparams3 = ref({ page: 1, limit: 10, type: "balance" });
    const total1 = ref(Infinity);
    const total2 = ref(Infinity);
    const total3 = ref(Infinity);
    const handleScrollGetData1 = () => {
      if (isBetweenBottom()) {
        getListData();
      }
    };

    const handleData = async (query, data, total, apiFunction) => {
      let response = {};
      response = await apiFunction(query.value);

      if (response.result) {
        // 處理有值
        data.value = data.value.concat(response.data);
        total.value = response.total;
        query.value.page++;
      }
    };

    const getListData = async () => {
      // 預測下一頁，如果不超過資料上限才做GET
      if (total1.value > recordListData.value.length) {
        await handleData(
          APIparams1,
          recordListData,
          total1,
          apiGetUserRecordList
        );
      }
      if (total2.value > pointListData.value.length) {
        await handleData(
          APIparams2,
          pointListData,
          total2,
          apiGetUserMoneyList
        );
      }
      if (total3.value > moneyListData.value.length) {
        await handleData(
          APIparams3,
          moneyListData,
          total3,
          apiGetUserMoneyList
        );
      }
    };

    return { recordListData, moneyListData, pointListData, observerTarget };
  },

  components: { NoData },
};
</script>

<template>
  <!-- 內容 -->
  <section class="c-main">
    <div class="swiper-container ui-tab">
      <div class="swiper-wrapper">
        <div class="swiper-slide" @click="toTop"><span>申請紀錄</span></div>
        <div class="swiper-slide" @click="toTop"><span>超集點</span></div>
        <div class="swiper-slide" @click="toTop"><span>福利金</span></div>
      </div>
    </div>
    <div class="swiper-container ui-page">
      <div class="filter-containter">
        <!-- 先不做此功能 -->
        <!-- <div class="row">
          <div class="col">
            <a class="filter-link active">今日</a>
          </div>
          <div class="col">
            <a class="filter-link">3日</a>
          </div>
          <div class="col">
            <a class="filter-link">7日</a>
          </div>
          <div class="col">
            <a class="filter-link">1個月</a>
          </div>
          <div class="col">
            <a class="filter-link">3個月</a>
          </div>
          <div class="col">
            <a class="filter-link">1年</a>
          </div>
        </div> -->
      </div>
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="item-container item-container-3" id="ida">
            <NoData v-if="recordListData.length <= 0" />
            <div v-for="data in recordListData" :key="data.createTime">
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
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="item-container item-container-3" id="idb">
            <NoData v-if="pointListData.length <= 0" />
            <div v-for="data in pointListData" :key="data.id">
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
          <div class="item-container item-container-3" id="idc">
            <NoData v-if="moneyListData.length <= 0" />
            <div v-for="data in moneyListData" :key="data.id">
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
.ui-page {
  // height: calc(70vh - $header-height - 15px);
  height: 100%;
}
</style>
