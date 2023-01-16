<script>
import { ref, onMounted, computed, watch } from "vue";
import "@/utils/swiper/swiper-bundle.min.css";
import { initSwiper } from "@/utils/swiper/index";
import { apiGetUserRecordList, apiGetUserMoneyList } from "@/api/myfree";
import { errorHandle } from "@/utils/errorHandle";
import NoData from "@/components/global/NoData.vue";

export default {
  setup() {
    const recordListData = ref({});
    const pointListData = ref({});
    const moneyListData = ref({});

    const observerTarget = ref('{"a":null,"b":null,"c":null}');

    const getDateMethod = async (inputData, api, query) => {
      let response = await api(query);
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
        observer("a");
        observer("b");
        observer("c");

        getDateMethod(recordListData, apiGetUserRecordList, {
          page: 1,
          limit: 10,
          // startDate: "2022-11-01",
          // endDate: "2022-11-02",
        });
        getDateMethod(moneyListData, apiGetUserMoneyList, {
          page: 1,
          limit: 10,
          type: "balance",
        });
        getDateMethod(pointListData, apiGetUserMoneyList, {
          page: 1,
          limit: 10,
          type: "point",
        });
      } catch (error) {
        errorHandle(error);
      }
    });
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
          <div class="item-container item-container-3" id="b">
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
          <div class="item-container item-container-3" id="c">
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
  height: calc(100vh - $header-height - 15px);
}
</style>
