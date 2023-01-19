<script>
import { ref, onMounted, onUnmounted } from "vue";
import { apiPostCaretakerList } from "@/api/api";
import { isBetweenBottom } from "@/utils/helper";
import { Toast } from "@/components/global/swal";

export default {
  setup() {
    const DataList = ref([]);
    const nowPage = ref(0);
    let APIparams = ref({ page: 1, limit: 20 });
    let totalData = ref(0);
    let getApiTimer = null;
    const canGetData = ref(true);

    const triggerRules = (config) => {
      // console.log("冷卻中||資料都拿完了")
      if (canGetData.value == false) return false;
      // console.log("頁數相同跳過")
      if (APIparams.value.page === nowPage.value) return false;
      //  若重複搜尋跳過
      if (config.isReSearch === false) return;
    };

    onUnmounted(() => clearInterval(getApiTimer));
    onMounted(async () => {
      getApiTimer = setInterval(async () => {
        // console.log("不在底部")
        if (!isBetweenBottom()) return;
        if (triggerRules({ isConcat: true }) == false) return;
        canGetData.value = false;
        await apiGetData(APIparams.value, { isConcat: true });
        APIparams.value.page += 1;
      }, 500);
    });

    // 若有進階搜尋
    // const updateParams = async (val) => {
    //   canGetData.value = true;
    //   APIparams.value = val;
    //   if (triggerRules({ isReSearch: true }) == false) return;
    //   canGetData.value = false;
    //   await apiGetData(APIparams.value, { isReSearch: true });
    // };

    const apiGetData = async (param, config) => {
      const response = await apiPostCaretakerList(param);
      const { data, message, status } = response;
      if (status) {
        // 成功
        canGetData.value = true;
        nowPage.value = APIparams.value.page;
        totalData.value = data.total;

        if (config.isConcat) {
          DataList.value = [...DataList.value, ...data.data];
        } else {
          DataList.value = [...data.data];
        }

        if (DataList.value?.length <= 0) {
          // 啟動中斷機制
          canGetData.value = false;
          return;
        }
      } else {
        Toast(message);
      }
    };

    return {};
  },
  components: {},
};
</script>

<template>
  <div class=""></div>
</template>
