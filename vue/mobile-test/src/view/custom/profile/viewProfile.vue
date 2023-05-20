<script>
import { ref, onMounted } from "vue";
import { apiGetStore } from "@/api/myfree";
import { handleStoreProfile } from "@/utils/handleData";
import { errorHandle } from "@/utils/errorHandle";
import { useGlobalStore } from "@/store/global";

import { Toast } from "@/components/global/swal";

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
      // { key: "分類標籤: ", value: "category" },
      { key: "回饋%數: ", value: "rewardRangeName" },
      { key: "開店狀態: ", value: "is_open" },
      // { key: "審核狀態: ", value: "isEnabled" },
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
        let isEnabled = response.isEnabled == 1 ? "啟用中" : "停用中";
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
          isEnabled,
        };
      } catch (error) {
        errorHandle(error);
      }
    });
    const handleReport = () => {
      Toast(
        "若為停用中需聯繫客服人員，否則消費者無法索取回饋!"
      );
    };
    return {
      goto,
      data,
      storeText,
      handleReport,
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
            <img
              :src="data.images"
              alt="myfreeCard"
              v-if="data.images"
              onerror="this.onerror=null; this.src='https://fakeimg.pl/340x200/?text=商店&font=noto'"
            />
            <img
              src="https://fakeimg.pl/340x200/?text=商店&font=noto"
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
          <div class="d-flex">
            <div class="col-left">審核狀態:</div>
            <div class="col-right" style="white-space: pre-wrap">
              {{ data.isEnabled }}
              <a class="item-link" @click="handleReport">
                <i class="icon icon-info"></i>
              </a>
            </div>
          </div>
          <!-- <div class="item-title">
            <a class="item-link">
              <i class="icon icon-info" @click="handleReport(item.id)"></i>
            </a>
          </div>           -->
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

.item-link {
  display: inline-block;
  margin-left: 0.75rem;
  line-height: 1;
  i {
    display: inline-block;
    width: 1.125rem;
    height: 1.125rem;
    vertical-align: -0.125rem;
    font-style: normal;
    line-height: 1;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
  .icon-info {
    background-image: url(#{$img}icon_info.png);
  }
}
</style>
