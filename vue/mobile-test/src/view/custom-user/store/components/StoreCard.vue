<script>
import { ref, onMounted, computed } from "vue";
import { useGlobalStore } from "@/store/global";
import { apiUserAddFavorite, apiUserRemoveFavorite } from "@/api/myfree";
import { Toast, ToastConfirm } from "@/components/global/swal";

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const globalStore = useGlobalStore();
    const goto = globalStore.goto;
    const cardData = computed(() => props.data);
    const favoriteClass = (isFavorite = false) => {
      return isFavorite ? "btn btn-link active" : "btn btn-link";
    };

    const handleStoreClick = (id) => {
      id
        ? goto("routerQuery", "/store/detail", { query: { id } })
        : Toast("找不到店家");
    };

    const handleMapClick = (address) => {
      address ? goto("toGoogleMap", address) : Toast("找不到位址");
    };

    const handleFavorite = async (item, index) => {
      const { id, favorite } = item;

      let response = {};
      const api = async (apiFunction) => {
        response = await apiFunction({ store_id: id });
        if (response.result) {
          item.favorite = !item.favorite;
        }
      };

      const flag = localStorage.getItem("is_Login");
      if (flag == "1") {
        favorite == true ? api(apiUserRemoveFavorite) : api(apiUserAddFavorite);
      } else {
        const result = await ToastConfirm("請先登入");
        if (result == true) {
          goto("userGoLogin");
        }
      }
    };

    return {
      handleStoreClick,
      favoriteClass,
      handleMapClick,
      handleFavorite,
      cardData,
    };
  },

  components: {},
};
</script>

<template>
  <div class="good-container pb-1">
    <div class="card" v-for="(item, index) in cardData" :key="item.id">
      <div class="card-header">
        <a @click="handleStoreClick(item.id)" class="card-link">
          <img
            :src="item.images"
            v-if="item.images"
            class="card-img"
            onerror="this.onerror=null; this.src='https://fakeimg.pl/340x200/'"
          />
          <img
            src="https://fakeimg.pl/340x200/"
            v-if="!item.images"
            class="card-img"
          />
        </a>
      </div>
      <div class="card-body">
        <a @click="handleStoreClick(item.id)" class="card-link">
          <div class="card-title">
            {{ item.name }}
            <span class="text-danger">{{ `${item.rewardRange}%` }}</span>
          </div>
          <div class="card-text">{{ item.keywords }}</div>
        </a>
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
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
