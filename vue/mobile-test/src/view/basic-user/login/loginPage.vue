<script>
import { ref, onMounted, onBeforeMount, computed } from "vue";
import { useRouter, onBeforeRouteLeave } from "vue-router";
import { Toast } from "@/components/global/swal.js";
import { errorHandle } from "@/utils/errorHandle";
import { apiStoreLogin, apiStoreSaveFcmToken } from "@/api/myfree";

import { ExtCall } from "@/utils/extCall";

import { useGlobalStore } from "@/store/global";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const globalStore = useGlobalStore();
    const { goto, setStoreData } = globalStore;
    const { isToAddStore } = storeToRefs(globalStore);
    onBeforeMount(() => {
      document.body.classList.add("c-login");
      // if (localStorage.getItem("is_Login") == 1) {
      //   goto("router", "/");
      // }
    });
    onBeforeRouteLeave((to, from, next) => {
      document.body.classList.remove("c-login");
      next();
    });
    return { goto };
  },
};
</script>

<template>
  <section class="c-main">
    <div class="main-header">
      <div class="main-navbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a @click="goto('router', '/setting/profile')" class="nav-link"
              ><i class="icon icon-clear"></i
            ></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="logo-container">
      <div class="logo"><img src="@/assets/images/logo.png" /></div>
      <!-- <div class="logo"><img src="images/logo_02.png"></div> -->
    </div>
    <div class="form-container form-container-2">
      <form action="good.html">
        <div class="position-relative mb-3">
          <label class="form-label form-label-2"
            ><i class="icon icon-member-s"></i
          ></label>
          <input
            type="text"
            class="form-control form-control-2"
            placeholder="請輸入手機號碼"
          />
          <div class="form-icon"><i class="icon icon-reset"></i></div>
        </div>
        <div class="position-relative mb-3">
          <label class="form-label form-label-2"
            ><i class="icon icon-member-s"></i
          ></label>
          <input
            type="text"
            class="form-control form-control-2"
            placeholder="請輸入手機號碼"
          />
          <div class="form-icon"><i class="icon icon-eye"></i></div>
        </div>
        <!-- <div class="position-relative mb-3">
          <label class="form-label form-label-2"
            ><i class="icon icon-member-s"></i
          ></label>
          <input
            type="text"
            class="form-control form-control-2"
            placeholder="請輸入手機號碼"
          />
          <div class="form-icon"><i class="icon icon-eye-slash"></i></div>
        </div>
        <div class="position-relative mb-3">
          <label class="form-label form-label-2"
            ><i class="icon icon-lock"></i
          ></label>
          <input
            type="text"
            class="form-control form-control-2"
            placeholder="請輸入手機驗證碼"
          />
        </div> -->
        <div class="mt-5">
          <div class="form-word text-center">
            還沒有收到驗證碼嗎？請等候60s後再點選重新發送<br />
            <a
              @click="goto('toBrowser', 'https://lin.ee/5gF3ojK')"
              class="text-muted"
              >聯繫我們</a
            >
          </div>
        </div>
        <div
          class="btn-container mt-5 text-center d-flex justify-content-center"
        >
          <button class="btn btn-next" type="submit">
            <i class="icon icon-next"></i>
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
