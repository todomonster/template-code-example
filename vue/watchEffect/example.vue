<script>
import { reactive, ref, watchEffect, watch } from "vue";

export default {
  setup() {
    const userID = ref(0);
    const userID2 = reactive({ id: 1, name: "xxx" });

    // watchEffect 不用指定監聽的值，初始化階段就執行，所以會多watch一次
    const listenerStop = watchEffect(() => console.log("Value: " + userID2.id));

    // watch 要指定監聽的值，初始化階段不執行
    // watch(
    //   () => userID2.id,
    //   () => {
    //     console.log("Value: " + userID2.id);
    //   }
    // );

    function testTimer() {
      setInterval(() => {
        // userID.value = 1;

        if (userID2.id > 6) {
          listenerStop();
        }
        userID2.id++;
      }, 1000);
    }

    window.addEventListener("click", testTimer);

    return {
      userID,
    };
  },
};
</script>

<template>
  <div style="height: 1000px">123</div>
</template>