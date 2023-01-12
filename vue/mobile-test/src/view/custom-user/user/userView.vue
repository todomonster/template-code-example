<script>
import { useGlobalStore } from "@/store/global";
import { ExtCall } from "@/utils/extCall";
import {
  Toast,
  ToastConfirm,
  ToastInputConfirm,
} from "@/components/global/swal";
import { errorHandle } from "@/utils/errorHandle";

export default {
  setup() {
    const globalStore = useGlobalStore();
    const goto = globalStore.goto;

    const VUE_APP_VERSION = process.env.VUE_APP_VERSION;

    const link = ["https://myfree.tako.life/privacy"];
    const handleWebView = (openUrl) => {
      try {
        ExtCall.openNewWebView(openUrl);
      } catch (error) {
        goto("href", link[0]);
      }
    };
    const logout = async () => {
      // 有做清除cookie和storage處理
      try {
        const confirm = await ToastConfirm("是否要登出?");
        if (confirm) {
          goto("router", "/");
        }
      } catch (error) {
        errorHandle(error);
      }
    };
    return { goto, VUE_APP_VERSION, logout, handleWebView, link };
  },

  components: {},
};
</script>

<template>
  <!-- 內容 -->
  <section class="c-main">
    <div class="navbar-container">
      <div class="member-container">
        <div class="avatar-container" @click="goto('router', '/setting/edit')">
          <div class="image"><img src="@/assets/images/noavatar.png" /></div>
          <div class="camera-container">
            <button class="btn btn-edit" type="button">
              <i class="icon icon-edit"></i>
            </button>
          </div>
        </div>
        <div class="mobile-container">
          <div class="title">手機號碼<span @click="goto('router', '/login')">登入</span></div>
        </div>
        <div class="item-container item-container-2">
          <div class="d-flex">
            <div class="col-left">暱稱</div>
            <div class="col-right">Jean</div>
          </div>
          <div class="d-flex">
            <div class="col-left">性別</div>
            <div class="col-right">女</div>
          </div>
          <div class="d-flex">
            <div class="col-left">年齡層</div>
            <div class="col-right">20~29</div>
          </div>
          <!-- <div class="d-flex">
            <div class="col-left">預設好康店範圍</div>
            <div class="col-right">台中市 北屯區</div>
          </div> -->
        </div>
        <div class="mt-3">
          <div class="form-word-2 text-center">
            請填寫完整資料才能享有myFrees優惠喔
          </div>
        </div>
        <div class="list-container mt-5 pb-5">
          <a class="list-link" @click="goto('router', '/store/favorite')">
            <div class="image"><i class="icon icon-favorite"></i></div>
            <div class="title">收藏店家</div>
          </a>
          <!-- <a  class="list-link">
            <div class="image"><i class="icon icon-feedback"></i></div>
            <div class="title">意見反饋</div>
          </a> -->
          <a class="list-link" @click="handleWebView(link[0])">
            <div class="image"><i class="icon icon-privacy"></i></div>
            <div class="title">隱私權條款</div>
          </a>
          <a class="list-link border-0" @click="logout">
            <div class="image"><i class="icon icon-signout"></i></div>
            <div class="title">登出</div>
          </a>
        </div>
      </div>
      <div class="edit-container">
        <div class="version">{{ VUE_APP_VERSION }}</div>
      </div>
    </div>
  </section>
</template>
