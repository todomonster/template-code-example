<script>
import { onMounted, onBeforeMount, onUpdated, ref, watch, reactive } from "vue";
import Loading from "@/components/loading/apiLoading.vue";
import { ExtCall } from "@/utils/extCall";
import { useGlobalStore } from "@/store/global";

export default {
  setup() {
    // const globalStore = useGlobalStore();
    // const goto = globalStore.goto;
    const john = ref({
      name: "John",
      age: 30,
    });

    watch(
      john.value.age, //這樣會監聽不到。
      // () => john.value.age, //要改這樣
      () => {
        console.log("john one year older");
      }
    );

    setInterval(() => {
      john.value.age++;
    }, 1000);

    function Resurrection() {
      john.value = {
        name: "New John",
        age: 0,
      };
    }

    onMounted(() => {
      setTimeout(() => {
        Resurrection();
        console.log(john.value);
      }, 4000);
    });

    return { john };
  },
  components: {
    Loading,
  },
};
</script>

<template>
  <div id="app" class="no-select">
    <RouterView />
    <Loading />
  </div>
</template>

<style scoped>
/* https://developer.apple.com/forums/thread/133399 */
.no-select {
  -webkit-touch-callout: none; /* Safari Touch */
  -webkit-user-select: none; /* Webkit */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Edge*/
  user-select: none; /* Future-proof*/
}
.no-drag {
  -webkit-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
}
</style>
