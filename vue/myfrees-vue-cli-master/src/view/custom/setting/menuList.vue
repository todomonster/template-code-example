<script>
import { ref, onMounted, computed } from "vue";
import { ToastConfirm } from "@/components/global/swal";
import { useGlobalStore } from "@/store/global";

import img_06 from "@/assets/icon/member06.svg";
import img_09 from "@/assets/icon/member09.png";
// call api
import { apiLogout } from "@/api/api";

import { ExtCall } from "@/utils/extCall";

export default {
  name: "MenuList",
  setup() {
    const globalStore = useGlobalStore();
    const goto = globalStore.goto;

    const member = ref({
      avatarUrl: "",
      name: "",
      gender: "male",
      phoneNumber: "0912345688",
      mail: "abc@gmail.com",
    });
    const avatarImgUrl = computed(() =>
      member.value?.avatarUrl ? member.value?.avatarUrl : ""
    );

    onMounted(async () => {});

    const name = ["隱私權條款", "掃描/下載 QR Code"];
    const link = ["https://myfree.tako.life/privacy", "/setting/qrCode"];
    const handleWebView = (openUrl) => {
      try {
        ExtCall.openNewWebView(openUrl);
      } catch (error) {
        goto("href", link[0]);
      }
    };
    const logout = async () => {
      // 有做清除cookie和storage處理
      await apiLogout();
      const confirm = await ToastConfirm("是否要登出?");
      if (confirm) {
        goto("router", "/");
      }
    };
    const test = (val) => {
      const url = "https://myfree.tako.life/privacy";
      if (val === 1) {
        window.open(url, "_blank");
      } else {
        window.location.href = url;
      }
    };
    return {
      member,
      name,
      link,
      goto,
      img_09,
      img_06,
      logout,
      avatarImgUrl,
      handleWebView,
      test,
    };
  },
  components: {},
};
</script>

<template>
  <div class="main-content">
    <!-- <div class="main">
      <div class="mainblur">
        <div class="mb-3 topArea">
          <label class="headShot">
            <img :src="avatarImgUrl" v-if="avatarImgUrl" />
            <img src="@/assets/image/noavatar.jpg" v-if="!avatarImgUrl" />
            <p>{{ member?.name }}</p>
          </label>
        </div>
      </div>
    </div> -->
    <div class="main2">
      <ul class="list-group list-group-flush">
        <div class="listItem">
          <button
            type="button"
            class="list-group-item list-group-item-action"
            @click="handleWebView(link[0])"
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
            @click="logout"
          >
            <div><img :src="img_09" />登出</div>
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
