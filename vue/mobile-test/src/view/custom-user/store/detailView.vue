<script>
import { ref, onMounted, onActivated } from "vue";
import { useGlobalStore } from "@/store/global";
import { errorHandle } from "@/utils/errorHandle";
import { ExtCall } from "@/utils/extCall";
import { apiGetStoreDetail } from "@/api/myfree";
import { handleStoreProfile } from "@/utils/handleData";
import { apiUserAddFavorite, apiUserRemoveFavorite } from "@/api/myfree";
import { Toast, ToastConfirm } from "@/components/global/swal";
import { useRoute } from "vue-router";

export default {
  name: "StoreDetail",
  setup() {
    const globalStore = useGlobalStore();
    const goto = globalStore.goto;
    const id = ref(null);

    const storeData = ref({});

    const handleData = (response = {}) => {
      let {
        all_addr = "",
        category = "",
        favorite = false,
        id = null,
        keywords = "",
        name = "",
        price_range,
        rewardRange = null,
        tel = "",
        is_open,
        isEnabled,
        isRemoved,
      } = response;
      let business_hours = response.business_hours || [];
      let images = response.images || "[]";
      return {
        name,
        all_addr,
        favorite,
        id,
        keywords,
        rewardRange,
        tel,
        business_hours: handleStoreProfile.businessHours(business_hours),
        price_range,
        category,
        images: handleStoreProfile.storeImages(images),
        is_open,
        isEnabled,
        isRemoved,
      };
    };

    onActivated(async () => {
      try {
        const { query } = useRoute();
        if (id.value === Number(query.id)) {
          return;
        }

        id.value = Number(query.id);
        const response = await apiGetStoreDetail(id.value);

        if (response.result == true) {
          // 成功
          storeData.value = handleData(response.data);
          if (
            storeData.value.isEnabled === 0 ||
            storeData.value.isRemoved === 1
          ) {
            // 不合規定踢回首頁 如果停業或停用
            Toast("此商店為無效店家！");
            goto("back");
            return;
          }

          // 如果query有isRewardApply=1 & is_open=1 要跳進索取畫面
          if (
            query.isRewardApply == 1 &&
            query.$back$ != 1 &&
            storeData.value.is_open === 1
          ) {
            const { name = "", images = "", rewardRange = 0 } = storeData.value;
            setTimeout(
              () =>
                goto("routerQuery", `/store/applyReward`, {
                  query: { id, name, images, rewardRange },
                }),
              500
            );
          }
        } else if (response.result == false) {
          Toast(response.errorInfo);
          goto("back");
        }
      } catch (error) {
        errorHandle(error);
      }
    });

    const handleMapClick = (address) => {
      address ? goto("toGoogleMap", address) : Toast("找不到位址");
    };

    const handleReport = (id) => {
      const { name = "", images = "" } = storeData.value;
      id
        ? goto("routerQuery", "/store/report", { query: { id, name, images } })
        : Toast("找不到id");
    };

    const handleRewardApply = (id) => {
      const { name = "", images = "", rewardRange = 0 } = storeData.value;
      id
        ? goto("routerQuery", `/store/applyReward`, {
            query: { id, name, images, rewardRange },
          })
        : Toast("找不到id");
    };
    const handleToProduct = (id) => {
      id
        ? goto("routerQuery", `/store/product`, {
            query: { id },
          })
        : Toast("找不到id");
    };

    const handleFavorite = async (item, index) => {
      try {
        const { id, favorite } = item;

        let response = {};
        const api = async (apiFunction) => {
          response = await apiFunction({ store_id: id });
          if (response.result) {
            item.favorite = !item.favorite;
          }
        };

        const flag = localStorage.getItem("is_Login");
        // 有登入
        if (flag == "1") {
          favorite == true
            ? api(apiUserRemoveFavorite)
            : api(apiUserAddFavorite);

          return;
        }
        // 沒登入
        const result = await ToastConfirm("請先登入");
        if (result == true) {
          goto("userGoLogin");
        }
      } catch (error) {
        errorHandle(error);
      }
    };

    const favoriteClass = (isFavorite = false) => {
      return isFavorite ? "btn btn-link active" : "btn btn-link";
    };

    const showSimpleHours = ref(true);

    return {
      goto,
      handleReport,
      handleRewardApply,
      storeData,
      favoriteClass,
      handleMapClick,
      handleFavorite,
      id,
      handleToProduct,
      showSimpleHours,
    };
  },

  components: {},
};
</script>

<template>
  <!-- 內容 -->
  <!-- {{ id }} -->
  <section class="c-main">
    <div class="navbar-container">
      <div
        class="gooddetail-container"
        v-for="(item, index) in [storeData]"
        :key="item.id"
      >
        <div class="image-container">
          <div class="image">
            <img
              :src="item.images"
              v-if="item.images"
              onerror="this.onerror=null; this.src='https://fakeimg.pl/340x200/?text=商店&font=noto'"
            />
            <img
              src="https://fakeimg.pl/340x200/?text=商店&font=noto"
              v-if="!item.images"
            />
          </div>
          <div class="row">
            <div class="col">
              <a
                @click="handleFavorite(item, index)"
                :class="favoriteClass(item.favorite)"
                ><i class="icon icon-favorite"></i>收藏</a
              >
            </div>
            <div class="col">
              <a @click="handleMapClick(item.all_addr)" class="btn btn-link"
                ><i class="icon icon-navigation"></i>帶路</a
              >
            </div>
          </div>
        </div>
        <div class="item-container">
          <div class="item-title">
            {{ item.name ? item.name : "" }}
            <a class="item-link">
              <i class="icon icon-info" @click="handleReport(item.id)"></i>
            </a>
          </div>
          <div class="item-text">
            <span class="text-danger">{{
              `${item.rewardRange ? item.rewardRange : "_"}%`
            }}</span>
            {{ `${item.keywords ? item.keywords : ""}` }}
          </div>
          <div class="d-flex" v-if="item.all_addr">
            <div class="col-left">商店地址</div>
            <div class="col-right">
              {{ `${item.all_addr ? item.all_addr : ""}` }}
            </div>
          </div>
          <div class="d-flex" v-if="item.tel">
            <div class="col-left">電話</div>
            <div class="col-right">{{ `${item.tel ? item.tel : ""}` }}</div>
          </div>
          <div class="d-flex" v-if="item.business_hours">
            <div class="col-left">營業時間</div>
            <div class="col-right" style="white-space: pre-wrap">
              <span v-show="showSimpleHours">
                <!-- <svg
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 0L9.33013 7.5H0.669873L5 0Z" fill="#6E6E6E" />
                </svg> -->
                <svg
                  @click="showSimpleHours = !showSimpleHours"
                  width="14"
                  height="12"
                  viewBox="0 0 14 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5801 0.665082L7.08489 11.9151L0.589697 0.665081L13.5801 0.665082Z"
                    fill="#6E6E6E"
                  />
                </svg>
                {{ "... " }}
                {{ "\n" }}
              </span>
              <span v-show="!showSimpleHours">
                <svg
                  @click="showSimpleHours = !showSimpleHours"
                  width="14"
                  height="12"
                  viewBox="0 0 14 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5801 0.665082L7.08489 11.9151L0.589697 0.665081L13.5801 0.665082Z"
                    fill="#6E6E6E"
                  />
                </svg>
                {{ "\n" }}
                {{ item.business_hours ? item.business_hours : "" }}
              </span>
            </div>
          </div>
        </div>
        <div class="btn-container mt-5">
          <button
            class="btn btn-welfare"
            type="button"
            @click="handleRewardApply(item.id)"
          >
            索取福利金
          </button>
          <button
            class="btn btn-good"
            type="button"
            @click="handleToProduct(item.id)"
          >
            商品清單
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
