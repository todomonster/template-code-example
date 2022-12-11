<script>
import { onMounted } from "vue";
import { useGlobalStore } from "@/store/global";

import img_06 from "@/assets/icon/member06.svg";
// call api
import { apiLogout } from "@/api/api";

import { ExtCall } from "@/utils/extCall";

export default {
  name: "MenuList",
  setup() {
    const globalStore = useGlobalStore();
    const goto = globalStore.goto;

    onMounted(async () => {});

    const name = ["會員回饋確認", "回饋紀錄", "交易紀錄"];
    const link = [
      "/wallet/rewardApply",
      "/wallet/rewardRecord",
      "/wallet/moneyRecord",
    ];

    return {
      name,
      link,
      goto,
      img_06,
    };
  },
  components: {},
};
</script>

<template>
  <div class="main-content">
    <div class="main2">
      <ul class="list-group list-group-flush">
        <div class="listItem">
          {{ `NT$ 可用餘額` }}
        </div>
        <div class="listItem">
          <button
            type="button"
            class="list-group-item list-group-item-action"
            @click="goto('router', link[0])"
          >
            <div><img :src="img_06" /> {{ name[0] }}</div>
          </button>
        </div>
        <div class="listItem">
          <button
            type="button"
            class="list-group-item list-group-item-action"
            @click="goto('router', link[1])"
          >
            <div><img :src="img_06" /> {{ name[1] }}</div>
          </button>
        </div>
        <div class="listItem">
          <button
            type="button"
            class="list-group-item list-group-item-action"
            @click="goto('router', link[2])"
          >
            <div><img :src="img_06" /> {{ name[2] }}</div>
          </button>
        </div>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.member {
  margin-bottom: calc($footer-height + 15px);
  display: flex;
  flex-direction: column;

  .main {
    background-image: url("@/assets/image/member_bg.png");
    background-repeat: no-repeat;
    background-size: cover;
  }

  .mainblur {
    backdrop-filter: blur(3px);
    height: 12.875rem;
  }

  .topArea {
    .headShot {
      margin-top: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100vw;
      height: 12.875rem;

      img {
        width: 6.625rem;
        height: 6.625rem;
        border-radius: 50%;
      }

      p {
        margin: 0.75rem auto;
        font-size: 1.25rem;
        font-weight: 700;
      }
    }
  }

  .listItem {
    border-bottom: 1px solid #e8e8e8;

    button {
      height: 50px;
      font-size: 1rem;
      font-weight: 400;
      border: none;
      color: #333333;
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        width: 2rem;
        margin-right: 0.75rem;
      }
    }
  }
}
</style>
