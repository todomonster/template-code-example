<script>
import { ref, onMounted, computed, watch } from "vue";
import { useGlobalStore } from "@/store/global";
import { errorHandle } from "@/utils/errorHandle";
import { apiGetCityList, apiGetAreaList } from "@/api/myfree";
import { Toast } from "@/components/global/swal";

export default {
  emits: ["queryData"],
  props: {
    searchQuery: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const showAdvancedSearch = ref(false);

    const form = ref(null);

    watch(
      () => props.searchQuery,
      (val) => {
        if (val.lang || val.long) {
          // 如果props有經緯度要清除縣市和區域
          inputData.value.city = "";
          inputData.value.area = "";
        }
      }
    );

    // 要記得跑回圈如果是空值移除掉
    const inputData = ref({
      row: 50,
      data_count_on_page: 0, //位移
      long: null, //有 GPS 抓km
      lang: null, //有 GPS 抓km
      search: "",
      category: "",
      city: "",
      area: "",
    });
    const handleSubmit = async (e) => {
      e.preventDefault();
      // 處理
      let condition = 0;
      const ans = {};
      const entry = Object.entries(inputData.value);
      entry.forEach((item) => {
        const key = item[0];
        const value = item[1];
        if (value || value === 0) {
          ans[key] = value;
          condition++;
        }
      });

      // emit 物件 出去讓外面打API
      emit("queryData", ans);
    };

    const categoryOption = ["食", "衣", "住", "行", "樂"];
    const categoryClass = (item) =>
      item === inputData.value.category
        ? "btn btn-primary"
        : "btn btn-outline-primary";
    const handleCategory = (item) => {
      inputData.value.category = item;
    };

    const cityAreaData = ref([]);
    const areaList = ref([]);
    let fullArea = ref({});

    const apiCity = async () => {
      const getCityList = await apiGetCityList();
      cityAreaData.value = getCityList.data;
    };
    const apiArea = async () => {
      const getAreaList = await apiGetAreaList();
      fullArea.value = getAreaList.data;
      areaList.value = getAreaList.data;
    };

    onMounted(async () => {
      // //取會員資料
      await apiCity();
      await apiArea();
    });
    watch(
      () => inputData.value?.city,
      (val) => {
        const area = JSON.parse(JSON.stringify(fullArea.value));
        const ans = area.filter((area) => area.city_id === val);
        areaList.value = ans;
        // 沒有預設值才加上
        inputData.value.area = areaList.value?.[0]?.id;
      }
    );
    watch(
      () => inputData.value?.area,
      (val) => {
        if (val == undefined) {
          inputData.value.area = "";
        }
      }
    );

    return {
      showAdvancedSearch,
      form,
      handleSubmit,
      inputData,

      categoryOption,
      categoryClass,
      handleCategory,

      cityAreaData,
      areaList,
    };
  },

  components: {},
};
</script>

<template>
  <div class="form-container form-container-4 pb-0">
    <form ref="form">
      <div class="search-container">
        <input
          type="text"
          class="form-control"
          placeholder="請輸入關鍵字"
          v-model="inputData.search"
        />
        <div class="btn-container">
          <button class="btn btn-search" type="submit" @click="handleSubmit">
            <i class="icon icon-search"></i>
          </button>
          <button
            class="btn btn-analytics collapsed"
            type="button"
            @click="showAdvancedSearch = !showAdvancedSearch"
          >
            <i class="icon icon-analytics"></i>
          </button>
        </div>
        <transition>
          <div class="analytics-container" v-show="showAdvancedSearch">
            <!-- advance -->
            <div class="mb-3">
              <label class="form-label">搜尋範圍</label>
              <div class="row mb-3">
                <div class="col">
                  <select
                    class="form-control form-select"
                    v-model="inputData.city"
                  >
                    <!-- <option value="undefined" disabled>請選擇縣市</option> -->
                    <option value="">全台</option>
                    <option
                      v-for="item in cityAreaData"
                      :value="item.id"
                      :key="item.id"
                    >
                      {{ item.city_name }}
                    </option>
                  </select>
                </div>
                <div class="col">
                  <select
                    class="form-control form-select"
                    v-model="inputData.area"
                  >
                    <!-- <option value="undefined" disabled>請選擇鄉鎮區</option> -->
                    <option value="">全區</option>
                    <option
                      v-for="item in areaList"
                      :value="item.id"
                      :key="item.id"
                    >
                      {{ item.area_name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="mb-2">
              <label class="form-label"
                >大分類<span class="must" @click="inputData.category = ''"
                  >清除分類</span
                ></label
              >
              <div class="input-pill">
                <div class="row">
                  <div
                    class="col form-check"
                    v-for="item in categoryOption"
                    :key="item"
                  >
                    <input
                      type="radio"
                      class="form-check-input"
                      name="kind"
                      :id="item"
                      :checked="item === inputData.category"
                    />
                    <label
                      class="form-check-label"
                      :for="item"
                      @click="handleCategory(item)"
                      >{{ item }}</label
                    >
                  </div>
                </div>
              </div>
            </div>
            <!-- end -->
          </div>
        </transition>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
