<script>
import { ref, onMounted } from "vue";
import { Toast } from "@/components/global/swal";
import { errorHandle } from "@/utils/errorHandle";
import { apiGetRecommenderList } from "@/api/myfree";
import { onBeforeRouteLeave } from "vue-router";
import { isBetweenBottom } from "@/utils/helper";
import NoData from "@/components/global/NoData.vue";

export default {
  setup() {
    const dataList = ref([]);
    const blueTotal = ref(0); //直推會員
    const greenTotal = ref(0); //分享會員
    const handleHintClick = (color) => {
      if (color === "blue") {
        Toast("直推會員");
      } else if (color === "green") {
        Toast("分享會員");
      }
    };

    let getApiTimer = null;
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
        let response = await apiGetRecommenderList(APIparams.value);
        if (response.result) {
          handleListData(response);
        }
      }
    };
    const handleListData = async (response) => {
      const handleData = (arr = []) => {
        // console.log(arr);
        arr.forEach((item) => {
          if (item.created_at && typeof item.created_at === "string") {
            item.created_at = item.created_at.slice(0, 10);
          }
        });
        return arr;
      };
      const { data, memberTypeTotal } = response;
      // 處理有值

      dataList.value = dataList.value.concat(handleData(data));
      blueTotal.value = memberTypeTotal?.[0] || 0;
      greenTotal.value = memberTypeTotal?.[1] || 0;
      total.value = response.total;
      APIparams.value.page++;
    };
    const handlePhoneMask = (phone) =>
      phone.slice(0, 2) + "xxxxx" + phone.slice(-3);
    onMounted(async () => {
      try {
        await getListData("init");
        getApiTimer = setInterval(handleScrollGetData, 1000);
      } catch (error) {
        errorHandle(error);
      }
    });

    onBeforeRouteLeave((to, from, next) => {
      clearInterval(getApiTimer);
      next();
    });
    return { dataList, blueTotal, greenTotal, handleHintClick,handlePhoneMask };
  },
  components: { NoData },
};
</script>

<template>
  <div class="recommender">
    <section class="c-main">
      <div class="list-container">
        <div class="mb-3 kind-container">
          <div class="title">
            <i
              class="fas fa-user c-bg-blue"
              @click="handleHintClick('blue')"
            ></i
            >{{ blueTotal }}
          </div>
          <div class="title ms-3">
            <i
              class="fas fa-user c-bg-green"
              @click="handleHintClick('green')"
            ></i
            >{{ greenTotal }}
          </div>
        </div>
        <div class="recommender-container">
          <NoData v-if="dataList?.length == 0" />
          <ul class="list-group">
            <li
              class="list-group-item d-flex justify-content-around align-center"
              v-for="item in dataList"
              :key="item.id"
            >
              <span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="6"
                    cy="6"
                    r="6"
                    fill="#A4C2F4"
                    class="c-blue"
                    v-if="item.memberType === 0"
                  />
                  <circle
                    cx="6"
                    cy="6"
                    r="6"
                    fill="#B6D7A8"
                    class="c-green"
                    v-if="item.memberType === 1"
                  />
                </svg>
                <span class="ms-3">{{
                  item.nickname ? item.nickname : "-"
                }}</span>
              </span>

              <span class="ms-1">{{ `${item.mobile ? handlePhoneMask(item.mobile) : "-"}` }}</span>
              <span class="ms-1">{{
                item.created_at ? item.created_at : "-"
              }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.recommender {
  margin-top: $header-height;
  margin-bottom: calc($footer-height + 15px);
}
.addBtn {
  display: flex;
  align-items: center;
  justify-content: center;
}
.list-container {
  padding: 1rem;
}
.kind-container {
  display: flex;
  flex-direction: row;
  .title {
    font-size: 1rem;
    font-weight: bold;
    i {
      margin-right: 0.325rem;
      width: 1.75rem;
      height: 1.75rem;
      text-align: center;
      color: white;
      line-height: 1.75rem;
      // background-color: rgba(nth($primary-color, $style), 0.75);
      border-radius: 50%;
    }
  }
}
.c-bg-blue {
  background-color: #a4c2f4;
}
.c-bg-green {
  background-color: #b6d7a8;
}
</style>
