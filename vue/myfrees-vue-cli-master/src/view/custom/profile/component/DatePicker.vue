<template>
  <div class="mb-2">
    <label class="form-label">營業時間</label>
    <div class="input-list">
      <div
        class="form-check mb-2 row"
        v-for="(date, index1) in newData"
        :key="date.weekday"
      >
        <div class="col-12">
          <input
            type="checkbox"
            class="form-check-input"
            :id="date.weekday"
            v-model="date.active"
            @change="handleChange"
          />
          <label class="form-check-label" :for="date.weekday">
            {{ handleStoreProfile.dateToChinese(date.weekday) }}
          </label>
          <img
            :src="addCircleIcon"
            alt=""
            class="icon-btn"
            @click="handleAdd(date, index1)"
          />
        </div>
        <div class="col-12">
          <div
            class="row mb-2"
            v-for="(time, index) in newTime[index1]"
            :key="index"
          >
            <div class="col">
              <div class="d-flex flex-row">
                <div class="col">
                  <select
                    class="col form-control form-select"
                    v-model="time.start"
                    required
                    @change="handleChange"
                  >
                    <option
                      v-for="item in businessHoursOpen"
                      :value="item.time"
                      :key="item.id"
                    >
                      {{ item.time }}
                    </option>
                  </select>
                </div>
                <div
                  class="d-flex justify-content-center align-items-center m-2px"
                >
                  ~
                </div>
                <div class="col">
                  <select
                    class="col form-control form-select"
                    v-model="time.end"
                    required
                    @change="handleChange"
                  >
                    <option
                      v-for="item in businessHoursClose"
                      :value="item.time"
                      :key="item.id"
                    >
                      {{ item.time }}
                    </option>
                  </select>
                </div>
                <div
                  class="d-flex justify-content-center align-items-center m-2px"
                >
                  <img
                    :src="removeCircleIcon"
                    alt=""
                    class="icon-btn"
                    @click="handleDelete(index1, index)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, onBeforeMount, computed, watch } from "vue";
import { errorHandle } from "@/utils/errorHandle";

// Icon
import addCircleIcon from "@/assets/icon/add-circle-outline.svg";
import removeCircleIcon from "@/assets/icon/remove-circle-outline.svg";
import { businessHoursOpen, businessHoursClose } from "../data/selector";

import { handleStoreProfile } from "@/utils/handleData";

export default {
  name: "DatePicker",
  props: {
    data: Object,
  },
  setup(props, { emit }) {
    const handleChange = () => {
      emit("business_hours", newData.value);
    };
    const handleDelete = (datIndex, timeIndex) => {
      newData.value[datIndex].time.splice(timeIndex, 1);
      emit("business_hours", newData.value);
    };
    const handleAdd = (date, index1) => {
      // console.log(date, index1);
      if (date?.time?.length < 4) {
        newData.value[index1].time.push({ end: "18:00", start: "09:00" });
        emit("business_hours", newData.value);
      }
    };
    const newData = ref([]);
    const newTime = computed(() => {
      return newData.value.map((x, index) => {
        return x.time;
      });
    });
    watch(
      () => props?.data?.business_hours,
      (val) => {
        if (val === "null") val = "";
        let ans =
          val ||
          `[{"time": [], "active": false, "weekday": "Mon"}, {"time": [], "active": false, "weekday": "Tue"}, {"time": [], "active": false, "weekday": "Wed"}, {"time": [], "active": false, "weekday": "Thu"}, {"time": [], "active": false, "weekday": "Fri"}, {"time": [], "active": false, "weekday": "Sat"}, {"time": [], "active": false, "weekday": "Sun"}]`;
        newData.value = JSON.parse(ans);
      }
    );

    onMounted(() => {});
    return {
      newData,
      newTime,
      addCircleIcon,
      removeCircleIcon,
      businessHoursOpen,
      businessHoursClose,
      handleAdd,
      handleDelete,
      handleChange,
      handleStoreProfile,
    };
  },
};
</script>
<style lang="scss" scoped>
.icon-btn {
  max-width: 20px;
  margin-left: 5px;
}
.m-2px {
  margin: 2px;
}
</style>
