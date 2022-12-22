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

    const storeText = [
      { key: "商店名稱: ", value: "name" },
      { key: "負責人: ", value: "contact" },
      { key: "商店地址: ", value: "all_addr" },
      { key: "電話: ", value: "tel" },
      { key: "營業時間: ", value: "business_hours" },
      { key: "價格: ", value: "price_range" },
      { key: "分類標籤: ", value: "category" },
      { key: "回饋%數: ", value: "rewardRangeName" },
      { key: "開店狀態: ", value: "is_open" },
    ];
    const data = ref({});
    onMounted(async () => {
      try {
        const response = await apiGetStore();
        let {
          name = "",
          contact = "",
          all_addr = "",
          tel = "",
          price_range,
          category = "",
          // rewardRange,
          rewardRangeName = "",
          is_open = 0,
        } = response;
        let business_hours = response.business_hours || "[]";
        let images = response.images || "[]";
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
      data,
      storeText,
    };
  },
  components: {},
};
</script>

<template>
  <div class="main">
    <section class="c-main">
      <div class="detail-container">
        <div class="image-container">
          <div class="image">
            <img :src="data.images" alt="myfreeCard" v-if="data.images" />
            <img
              src="https://fakeimg.pl/340x200/"
              alt="myfreeCard"
              v-if="!data.images"
            />
          </div>
        </div>
        <div class="item-container">
          <div class="d-flex" v-for="item in storeText" :key="item.key">
            <div class="col-left">{{ item.key }}</div>
            <div class="col-right" style="white-space: pre-wrap">
              {{ data[item.value] }}
            </div>
          </div>
        </div>
      </div>
      <div class="edit-container">
        <button
          class="btn btn-edit"
          type="button"
          @click="goto('router', `/profile/edit`)"
        >
          <i class="icon icon-edit"></i>
        </button>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.main {
  margin-top: $header-height;
  margin-bottom: calc($footer-height + 15px);
  padding: 0.25rem;
}
</style>
