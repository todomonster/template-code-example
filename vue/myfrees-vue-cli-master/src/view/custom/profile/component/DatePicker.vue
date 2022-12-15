<template>
  <div class="mb-2">
    <label class="form-label">營業時間</label>
    <div class="input-list">
      <div
        class="form-check mb-2"
        v-for="(date, index1) in newData"
        :key="date.weekday"
      >
        <input type="checkbox" class="form-check-input" :id="date.weekday" />
        <label class="form-check-label" :for="date.weekday">
          {{ date.weekday }}
        </label>
        <button
          class="btn btn-outline-secondary btn-sm mb-2 ml-2 rounded-circle"
          type="button"
        >
          十
        </button>
        <div
          class="row mb-2"
          v-for="(time, index) in newTime[index1]"
          :key="index"
        >
          <div class="col-4">
            <input
              type="time"
              class="form-control"
              placeholder="請選擇時間"
              v-model="time.start"
            />
          </div>
          <div class="col-4">
            <input
              type="time"
              class="form-control"
              placeholder="請選擇時間"
              v-model="time.end"
            />
          </div>
          <div class="col-1">
            <button
              class="btn btn-outline-danger btn-sm mb-2 ml-2 rounded-circle"
              type="button"
            >
              ─
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, onBeforeMount, computed, watch } from "vue";
import { errorHandle } from "@/utils/errorHandle";

export default {
  name: "DatePicker",
  props: {
    data: Object,
  },
  setup(props, { emit }) {
    const temp = [
      {
        time: [
          {
            end: "18:00",
            start: "09:00",
          },
        ],
        active: true,
        weekday: "Mon",
      },
      {
        time: [
          {
            end: "18:00",
            start: "09:00",
          },
          {
            end: "18:00",
            start: "09:00",
          },
          {
            end: "18:00",
            start: "09:00",
          },
        ],
        active: true,
        weekday: "Tue",
      },
      {
        time: [],
        active: false,
        weekday: "Wed",
      },
      {
        time: [],
        active: false,
        weekday: "Thu",
      },
      {
        time: [],
        active: false,
        weekday: "Fri",
      },
      {
        time: [],
        active: false,
        weekday: "Sat",
      },
      {
        time: [],
        active: false,
        weekday: "Sun",
      },
    ];
    const newData = computed(() => {
      const ans = props?.data?.business_hours || "[]";
      return JSON.parse(ans);
    });
    const newTime = computed(() => {
      return newData.value.map((x, index) => {
        return x.time;
      });
    });
    onMounted(() => {
      //   console.log(newData.value);
      //   emit("data", 1);
    });
    return { newData, newTime };
  },
};
</script>

<style lang="scss" scoped>
button {
  border: 2px solid;
  font-weight: bolder;
}
</style>
