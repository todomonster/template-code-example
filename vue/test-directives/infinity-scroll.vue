<template>
  <!-- <div
    v-infinite:10="loadMore"
    ref="scrollContainer"
    style="height: 600px; overflow: scroll"
  >     -->
  <div
    v-infinite="{ loadMore, threshold: 100 }"
    ref="scrollContainer"
    style="height: 600px; overflow: scroll"
  >
    <!-- 這裡是需要加載的內容 -->
    <div class="card-header" v-for="(data, index) in dataList" :key="index">
      {{ (data, index) }}
      <div class="card-link">
        <img
          src="@/assets/images/img_myfree_s.png"
          class="card-img"
          style="width: 100px"
        />
      </div>
    </div>
    <!--  -->
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import { apiGetNotifyList, apiReadNotify } from "@/api/myfree";

export default {
  directives: {
    infinite: {
      mounted(el, binding) {
        // const { value: loadMore, arg: threshold = 0 } = binding
        const { loadMore, threshold = 0 } = binding.value;
        console.log(threshold);
        const scrollContainer = el;
        const isLoading = ref(false); // 加載狀態的 flag

        // 用於觸發當前的下拉加載更多資料操作
        const loadMoreHandler = () => {
          const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
          if (
            isLoading.value ||
            scrollTop + clientHeight < scrollHeight - threshold
          ) {
            return; // 如果正在加載中或者還未滾動到底部，則不做任何操作
          }
          isLoading.value = true; // 將加載狀態設置為 true
          loadMore().then(() => {
            isLoading.value = false; // 將加載狀態設置為 false
          });
        };

        // 監聽滾動事件以觸發加載更多
        scrollContainer.addEventListener("scroll", loadMoreHandler);

        // 在組件被卸載時清除監聽器
        watchEffect(() => {
          return () => {
            scrollContainer.removeEventListener("scroll", loadMoreHandler);
          };
        });
      },
    },
  },
  setup() {
    // 用於測試的假資料
    const dataList = ref(Array.from(Array(30).keys()));

    // 加載更多的邏輯
    const loadMore = () => {
      const newData = Array.from(Array(10).keys());
      // return new Promise(resolve => {
      //   setTimeout(() => {
      //     dataList.value = [...dataList.value, ...newData]
      //     resolve()
      //   }, 1000) // 模擬一秒鐘的資料加載時間
      // })

      return apiGetNotifyList({ page: 1, limit: 10 }).then((response) => {
        dataList.value = [...dataList.value, ...newData];
      });
    };

    return {
      dataList,
      loadMore,
    };
  },
};
</script>
