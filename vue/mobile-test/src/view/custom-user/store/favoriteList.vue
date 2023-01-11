<script>
import { ref, onMounted, computed } from "vue";
import { useGlobalStore } from "@/store/global";
import { errorHandle } from "@/utils/errorHandle";
// import NoData from "@/components/global/NoData.vue";
import BackToTop from "@/components/global-user/BackToTop.vue";
import SaveWindowY from "@/components/global-user/SaveWindowY.vue";
import { ExtCall } from "@/utils/extCall";

export default {
  setup() {
    const globalStore = useGlobalStore();
    const goto = globalStore.goto;

    const showAdvancedSearch = ref(false);

    const toGoogleMap = () => {
      const url = "https://www.google.com/maps/dir//台中北屯大連路三段";
      try {
        ExtCall.toBrowser(url);
      } catch (error) {
        window.open(url, "_blank").focus();
      }
    };

    const form = ref(null);
    const inputData = ref({});
    const handleSubmit = async (e) => {
      e.preventDefault();

      if (form.value.reportValidity()) {
        // 處理
      }
    };

    // const favoriteClass = ref("btn btn-link active");
    const favoriteClass = (isFavorite = false) => {
      return isFavorite ? "btn btn-link active" : "btn btn-link";
    };

    return {
      goto,
      toGoogleMap,
      showAdvancedSearch,
      form,
      handleSubmit,
      favoriteClass,
    };
  },

  components: { BackToTop, SaveWindowY },
};
</script>

<template>
  <!-- 內容 -->
  <section class="c-main">
    <SaveWindowY />
    <div class="navbar-container">
      <div class="good-container pb-1">
        <div class="card" v-for="(item, index) in 1" :key="index">
          <div class="card-header">
            <a
              @click="
                goto('routerQuery', '/store/1', {
                  query: { mode: 'view', id: 1 },
                })
              "
              class="card-link"
            >
              <img src="@/assets/images/img_shop.png" class="card-img" />
            </a>
          </div>
          <div class="card-body">
            <a
              @click="
                goto('routerQuery', '/store/1', {
                  query: { mode: 'view', id: 1 },
                })
              "
              class="card-link"
            >
              <div class="card-title">春日山 食事処</div>
              <div class="card-text">$$・餐廳,日式料理,定食,丼飯</div>
            </a>
            <div class="row">
              <div class="col">
                <a :class="favoriteClass(index % 2 === 0)"
                  ><i class="icon icon-favorite"></i>收藏</a
                >
              </div>
              <div class="col">
                <a @click="toGoogleMap" class="btn btn-link"
                  ><i class="icon icon-navigation"></i>帶路</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <BackToTop />
  </section>
</template>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
