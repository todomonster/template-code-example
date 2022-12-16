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
        <a
          :class="classList[0]"
          @click="$router.push({ path: '/profile/view' })"
        >
          <div class="tab-img"><i class="icon icon-shop"></i></div>
          <div class="tab-title">商店資訊</div>
        </a>
      </div>
      <div class="col cursor-pointer">
        <a
          :class="classList[1]"
          @click="$router.push({ path: '/product/list' })"
        >
          <div class="tab-img"><i class="icon icon-product"></i></div>
          <div class="tab-title">我的商品</div>
        </a>
      </div>
      <div class="col cursor-pointer">
        <a
          :class="classList[2]"
          @click="$router.push({ path: '/wallet/list' })"
        >
          <div class="tab-img"><i class="icon icon-cash"></i></div>
          <div class="tab-title">錢包</div>
        </a>
      </div>
      <div class="col cursor-pointer">
        <a
          :class="classList[3]"
          @click="$router.push({ path: '/setting/list' })"
        >
          <div class="tab-img"><i class="icon icon-member"></i></div>
          <div class="tab-title">商店管理</div>
        </a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
//
@import "@/assets/custom/mixins";

</style>
