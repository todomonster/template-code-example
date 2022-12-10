<script>
import { computed } from "vue";

export default {
  setup() {
    // 處理menu顏色高亮
    const getUrlString = location.href;
    const menuTable = {
      profile: [1, 0, 0, 0],
      product: [0, 1, 0, 0],
      wallet: [0, 0, 1, 0],
      setting: [0, 0, 0, 1],
    };
    const handleMenuColor = (url = "", menuTable = {}) => {
      let ans = [0, 0, 0, 0];
      const entries = Object.entries(menuTable);
      entries.forEach((item) => {
        const key = item[0];
        const targetPath = `/${key}`;
        if (url.indexOf(targetPath) > -1) {
          ans = menuTable[key];
        }
      });
      return ans;
    };
    // computed
    const classList = computed(() => {
      return handleMenuColor(getUrlString, menuTable).map((item) =>
        item == 1 ? "tab-link active" : "tab-link"
      );
    });

    return { classList };
  },
};
</script>

<template>
  <footer class="c-footer">
    <div class="row ui-tabbar">
      <div class="col cursor-pointer">
        <a @click="$router.push({ path: '/profile/view' })" :class="classList[0]">
          <div class="tab-img"><i class="far fa-search"></i></div>
          <div class="tab-title">商店資訊</div>
        </a>
      </div>
      <div class="col cursor-pointer">
        <a @click="$router.push({ path: '/setting/list' })" :class="classList[1]">
          <div class="tab-img"><i class="far fa-calendar"></i></div>
          <div class="tab-title">我的商品</div>
        </a>
      </div>
      <div class="col cursor-pointer">
        <a @click="$router.push({ path: '/home' })" class="tab-link">
          <div class="tab-img"><i class="fas fa-home-lg"></i></div>
          <div class="tab-title">首頁</div>
        </a>
      </div>
      <div class="col cursor-pointer">
        <a @click="$router.push({ path: '/setting/list' })" :class="classList[2]">
          <div class="tab-img"><i class="far fa-question-circle"></i></div>
          <div class="tab-title">錢包</div>
        </a>
      </div>
      <div class="col cursor-pointer">
        <a @click="$router.push({ path: '/setting/list' })" :class="classList[3]">
          <div class="tab-img"><i class="far fa-user"></i></div>
          <div class="tab-title">設定</div>
        </a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
//  
@import "@/assets/custom/mixins";
.cursor-pointer {
  cursor: pointer;
}
</style>
