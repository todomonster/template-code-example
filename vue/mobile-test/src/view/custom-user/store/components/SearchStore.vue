<script>
import { ref, onMounted, computed } from "vue";
import { useGlobalStore } from "@/store/global";
import { errorHandle } from "@/utils/errorHandle";

export default {
  setup() {
    const showAdvancedSearch = ref(false);

    const form = ref(null);

    // 要記得跑回圈如果是空值移除掉
    const inputData = ref({
      row: 50,
      data_count_on_page: 0, //位移
      long: null, //有 GPS 抓km
      lang: null, //有 GPS 抓km
      search: "",
      category: "",
      city: null,
      area: null,
    });
    const handleSubmit = async (e) => {
      e.preventDefault();
      // 處理

      // emit 物件 出去讓外面打API
    };

    const categoryOption = ["食", "衣", "住", "行", "樂"];
    const categoryClass = (item) =>
      item === inputData.value.category
        ? "btn btn-primary"
        : "btn btn-outline-primary";
    const handleCategory = (item) => {
      inputData.value.category = item;
    };

    return {
      showAdvancedSearch,
      form,
      handleSubmit,
      inputData,

      categoryOption,
      categoryClass,
      handleCategory,
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
                  <select class="form-control form-select">
                    <option selected>縣市</option>
                    <option>臺北市</option>
                  </select>
                </div>
                <div class="col">
                  <select class="form-control form-select">
                    <option selected>鄉鎮市區</option>
                    <option>中區</option>
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
