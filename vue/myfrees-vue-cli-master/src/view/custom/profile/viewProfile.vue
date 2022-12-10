<script>
import { ref, onMounted } from "vue";
import { apiGetStore } from "@/api/myfree";
import { handleStoreProfile } from "@/utils/handleData";
import { errorHandle } from "@/utils/errorHandle";
import { useGlobalStore } from "@/store/global";

export default {
  name: "ViewProfile",
  setup() {
    const globalStore = useGlobalStore();
    const goto = globalStore.goto;

    const spanTitle = [
      "商店名稱: ",
      "負責人: ",
      "商店地址: ",
      "電話: ",
      "營業時間: ",
      "價格: ",
      "分類標籤: ",
      "回饋%數: ",
      "開店狀態: ",
    ];
    const spanData = [
      "name",
      "contact",
      "all_addr",
      "tel",
      "business_hours",
      "price_range",
      "category",
      "rewardRangeName",
      "is_open",
    ];
    const data = ref({});
    onMounted(async () => {
      try {
        const response = await apiGetStore();
        let {
          name,
          contact,
          all_addr,
          tel,
          business_hours,
          price_range,
          category,
          // rewardRange,
          rewardRangeName,
          is_open,
          images,
        } = response;
        data.value = {
          name,
          contact,
          all_addr,
          tel,
          business_hours: handleStoreProfile.businessHours(business_hours),
          price_range,
          category,
          rewardRangeName,
          is_open: handleStoreProfile.isOpen(is_open),
          images: handleStoreProfile.storeImages(images),
        };
      } catch (error) {
        errorHandle(error);
      }
    });

    return {
      goto,
      spanTitle,
      spanData,
      data,
    };
  },
  components: {},
};
</script>

<template>
  <div class="main-content">
    <img
      :src="data.images"
      alt="myfreeCard"
      v-if="data.images"
      style="max-width: 320px"
    />
    <img
      src="https://fakeimg.pl/300x200/"
      alt="myfreeCard"
      v-if="!data.images"
      style="max-width: 320px"
    />
    <div>
      <span>{{ spanTitle[0] }}</span>
      <span>{{ data[spanData[0]] }}</span>
    </div>
    <div>
      <span>{{ spanTitle[1] }}</span>
      <span>{{ data[spanData[1]] }}</span>
    </div>
    <div>
      <span>{{ spanTitle[2] }}</span>
      <span>{{ data[spanData[2]] }}</span>
    </div>
    <div>
      <span>{{ spanTitle[3] }}</span>
      <span>{{ data[spanData[3]] }}</span>
    </div>
    <div style="display: flex">
      <span>{{ spanTitle[4] }}</span>
      <span>&nbsp;</span>
      <pre>{{ data[spanData[4]] }}</pre>
    </div>
    <div>
      <span>{{ spanTitle[5] }}</span>
      <span>{{ data[spanData[5]] }}</span>
    </div>
    <div>
      <span>{{ spanTitle[6] }}</span>
      <span>{{ data[spanData[6]] }}</span>
    </div>
    <div>
      <span>{{ spanTitle[7] }}</span>
      <span>{{ data[spanData[7]] }}</span>
    </div>
    <div>
      <span>{{ spanTitle[8] }}</span>
      <span>{{ data[spanData[8]] }}</span>
    </div>
    <br />
    <button
      class="btn btn-primary"
      type="button"
      @click="goto('router', `/profile/edit`)"
    >
      編輯
    </button>
  </div>
</template>

<style lang="scss" scoped></style>
