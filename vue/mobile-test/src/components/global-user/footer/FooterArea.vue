<script>
import { computed } from "vue";
import { useGlobalStore } from "@/store/global";
import { ExtCall } from "@/utils/extCall";

export default {
  setup() {
    // 處理menu顏色高亮
    const getUrlString = location.href;
    const menuTable = {
      // 這邊要特別注意手機會取資料夾名稱可能包含 user，會影響判斷
      store: [1, 0, 0, 0],
      scan: [0, 1, 0, 0],
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

    const handleScanClick = () => {
      try {
        window.openScanCode = (appScanCode) => {
          alert(appScanCode);
          // 收到QRode打解析API做跳轉

          // a. 登入狀態 ->跳到該店App畫面
          // b. 非登入 -> 跳到註冊App畫面
        };
        ExtCall.openScanCode("openScanCode");
      } catch (error) {
        console.log(`os: ${error.message}`);
      }
    };

    const classList = computed(() => {
      return handleMenuColor(getUrlString, menuTable).map((item) =>
        item == 1 ? "tab-link active" : "tab-link"
      );
    });

    const globalStore = useGlobalStore();
    const goto = globalStore.goto;

    return { classList, goto, handleScanClick };
  },
};
</script>

<template>
  <footer class="c-footer">
    <div class="row ui-tabbar">
      <div class="col cursor-pointer">
        <a :class="classList[0]" @click="goto('router', '/store/list')">
          <div class="tab-img"><i class="icon icon-good"></i></div>
          <div class="tab-title">附近好康</div>
        </a>
      </div>
      <div class="col cursor-pointer">
        <a :class="classList[1]" @click="handleScanClick">
          <div class="tab-img"><i class="icon icon-qrcode"></i></div>
          <div class="tab-title">掃描</div>
        </a>
      </div>
      <div class="col cursor-pointer">
        <a :class="classList[2]" @click="goto('router', '/wallet/list')">
          <div class="tab-img"><i class="icon icon-cash"></i></div>
          <div class="tab-title">錢包</div>
        </a>
      </div>
      <div class="col cursor-pointer">
        <a :class="classList[3]" @click="goto('router', '/setting/profile')">
          <div class="tab-img"><i class="icon icon-member"></i></div>
          <div class="tab-title">會員資料</div>
        </a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
//
@import "@/assets/custom/mixins";
</style>
