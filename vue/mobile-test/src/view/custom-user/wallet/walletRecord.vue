<script>
import { ref, onMounted, computed, watch } from "vue";
import "@/utils/swiper/swiper-bundle.min.css";
import { initSwiper } from "@/utils/swiper/index";
import { apiGetUserRecordList, apiGetUserMoneyList } from "@/api/myfree";
import { errorHandle } from "@/utils/errorHandle";

export default {
  setup() {
    const recordListData = ref({});
    const pointListData = ref({});
    const moneyListData = ref({});

    const getDateMethod = async (inputData, api, query) => {
      let tmp = await api(query);
      if (tmp.result) {
        inputData.value = tmp.data;
      }
    };

    onMounted(async () => {
      initSwiper(3);
      try {
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
    return { recordListData, moneyListData, pointListData };
  },

  components: {},
};
</script>

<template>
  <!-- 內容 -->
  <section class="c-main">
    <div class="swiper-container ui-tab">
      <div class="swiper-wrapper">
        <div class="swiper-slide"><span>申請紀錄</span></div>
        <div class="swiper-slide"><span>超集點</span></div>
        <div class="swiper-slide"><span>福利金</span></div>
      </div>
    </div>
    <div class="swiper-container ui-page">
      <div class="filter-containter">
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
      </div>
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="item-container item-container-3">
            <div v-for="data in recordListData" :key="data.createTime">
              <div class="d-flex">
                <div class="col-left">
                  <div class="title">
                    {{ data.storeName }} 福利金回饋 ${{ data.amount }}
                  </div>
                  <div class="date">{{ data.createTime }}</div>
                  <div v-if="data.status === 2" class="note">
                    {{ data.memo }}
                  </div>
                </div>
                <div class="col-right">
                  <div v-if="data.status === 0" class="black">待確認</div>
                  <div v-else-if="data.status === 1" class="green">核准</div>
                  <div v-else-if="data.status === 2" class="red">取消</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="item-container item-container-3">
            <div v-for="data in pointListData" :key="data.id">
              <div class="d-flex">
                <div class="col-left">
                  <div class="title">{{ data.name }}</div>
                  <div class="date">{{ data.createTime }}</div>
                </div>
                <div class="col-right">
                  <div v-if="data.status === 1" class="green">
                    {{ data.amount }}
                  </div>
                  <div v-else-if="data.status === 0" class="red">
                    {{ data.amount }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="item-container item-container-3">
            <div v-for="data in moneyListData" :key="data.id">
              <div class="d-flex">
                <div class="col-left">
                  <div class="title">{{ data.name }}</div>
                  <div class="date">{{ data.createTime }}</div>
                </div>
                <div class="col-right">
                  <div v-if="data.status === 1" class="green">
                    {{ data.amount }}
                  </div>
                  <div v-else-if="data.status === 0" class="red">
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
