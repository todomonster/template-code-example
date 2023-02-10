<script>
import { onMounted, onBeforeMount, onUpdated } from "vue";
import Loading from "@/components/loading/apiLoading.vue";
import { ExtCall } from "@/utils/extCall";
import { useGlobalStore } from "@/store/global";

export default {
  setup() {
    const globalStore = useGlobalStore();
    const goto = globalStore.goto;

    onMounted(() => {
      try {
        window.setApplicationStatusCallback = (val = "") => {
          if (val === "foreground") {
            ExtCall.getUrlSchemeInput("getUrlSchemeInput");
          }
        };
        ExtCall.setApplicationStatusCallback("setApplicationStatusCallback");

        window.getUrlSchemeInput = (val = "") => {
          if (!val) {
            return;
          }

          let userId = "";
          let storeId = "";
          const searchParams = new URLSearchParams(val);

          for (let [key, value] of searchParams.entries()) {
            if (key === "userId") {
              if (value !== "null" && value) {
                userId = value;
              }
            }
            if (key === "storeId") {
              if (value !== "null" && value) {
                storeId = value;
              }
            }
          }

          // alert(`userId: ${userId}, storeId: ${storeId}`);

          // 存至pinia
          setTimeout(() => {
            if (localStorage.getItem("is_Login") == "1") {
              // 跳轉到該店 id
              goto("routerQuery", "/store/detail", {
                query: { id: storeId },
              });
            } else {
              // 跳到註冊
              goto("routerQuery", "/login/signup", {
                query: { signup: "1", userId, storeId },
              });
            }
          }, 500);
        };
        ExtCall.getUrlSchemeInput("getUrlSchemeInput");
        //
      } catch (error) {
        console.log(`${error.message}不支援`);
      }
    });

    return {};
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
