<template>
  <div class="area-container c-flex-column">
    <div class="area-container">
      <h1 class="c-border">地區</h1>
      <!-- 縣市 -->
      <div class="c-border area-container c-flex-column c-panel">
        <div
          v-for="item in data"
          :key="item.id"
          @click="handleClick(item.areas)"
        >
          <span class="c-margin">{{ item.city_name }}</span>
        </div>
      </div>
      <!-- 地區 -->
      <div
        class="c-border area-container c-flex-column c-panel"
        v-show="area2?.length > 0"
      >
        <div v-for="item in area2" :key="item.id" @click="handleClick2(item)">
          <span class="c-margin"
            >{{ item.area_name }}{{ showSelectedArea(item) }}</span
          >
        </div>
      </div>
    </div>
    <div class="c-border">確定({{ countAreaAmount }}/10)</div>
  </div>
</template>

<script>
import { CITY_AREA_LIST } from "./index";
import { ref, computed } from "vue";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup() {
    // console.log(CITY_AREA_LIST);
    const data = ref(CITY_AREA_LIST);
    const area2 = ref([]);
    const handleClick = (value) => {
      if (value) {
        area2.value = value;
      }
    };
    const handleClick2 = (row) => {
      if (row) {
        selected_area.value.push(row.id);
      }
    };
    const selected_area = ref([]);
    const showSelectedArea = (row) => {
      return selected_area.value.includes(row.id) ? "o" : "";
    };
    const countAreaAmount = computed(() => {
      return selected_area.value.length;
    });
    return {
      data,
      handleClick,
      handleClick2,
      area2,
      showSelectedArea,
      countAreaAmount,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.area-container {
  display: flex;
  justify-content: start;
  /* align-items: center; */
  max-width: 390px;
  margin: 15px;
}
.c-panel {
  max-height: 150px;
  overflow-y: scroll;
}
.c-flex-column {
  flex-direction: column;
}
.c-border {
  border: green 1px solid;
}
.c-margin {
  margin: 10px;
}
</style>
