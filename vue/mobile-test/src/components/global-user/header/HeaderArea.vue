<script>
import { ref, onMounted, computed, onBeforeMount } from "vue";
import { useGlobalStore } from "@/store/global";
import { apiGetUserNotifyUnreadAmount } from "@/api/myfree";
import { useRoute } from "vue-router";

export default {
  props: {
    title: String,
    leftIcon: String,
    rightIcon: String,
    rightTextStatus: String,
    backToPath: String,
  },
  setup(props) {
    const { meta } = useRoute();
    const backPath = ref(props.backToPath);

    const globalStore = useGlobalStore();
    const goto = globalStore.goto;
    const unread = ref(0);

    const rightIconCode = ref("");
    const leftIconCode = ref("icon icon-back");
    const titleText = ref("");
    const execute = ref(new Function());

    const handleBellClick = () => {
      goto("router", "/notify/list");
      // window.location.href = "./index.html#/notify/list";
    };
    function setValue(icon, inputString) {
      rightIconCode.value = icon || "";
      titleText.value = inputString || " ";
    }
    const setIcon = (iconState) => {
      switch (iconState) {
        case "add":
          setValue("fa fa-plus", " 新增");
          break;
        case "text":
          setValue("far fa-list-ul", " 列表");
          break;
        case "search":
          setValue("far fa-search", " 搜尋");
          break;
        case "bell":
          setValue("icon icon-notice", " ");
          execute.value = handleBellClick;
          break;
        default:
          setValue("", "");
      }
    };
    onBeforeMount(() => {
      if (props.leftIcon === "") {
        leftIconCode.value = "";
      }
    });
    onMounted(async () => {
      setIcon(props.rightIcon);
      if (
        rightIconCode.value === "icon icon-notice" &&
        localStorage.getItem("is_Login") == "1" &&
        meta.showBell
      ) {
        // 鈴鐺開啟才打API
        const response = await apiGetUserNotifyUnreadAmount();
        if (response.result && response.unread > 0) {
          unread.value = response.unread;
          titleText.value = String(unread.value);
        }
      }
    });
    const countBell = computed(() => {
      if (typeof titleText.value === "string") {
        return titleText.value.trim() === "" ? false : true;
      }
      return false;
    });

    return {
      rightIconCode,
      titleText,
      goto,
      execute,
      countBell,
      leftIconCode,
      backPath,
    };
  },
};
</script>

<template>
  <header class="c-header">
    <nav class="navbar ui-navbar">
      <ul class="navbar-nav">
        <li
          class="nav-item"
          style="cursor: pointer"
          v-show="!$route.meta.hideHeaderArrow"
        >
          <a @click="goto('back')" class="nav-link"
            ><i :class="leftIconCode"></i
          ></a>
        </li>
      </ul>
      <h1 class="navbar-brand">
        <img src="@/assets/images/logo_s.png" v-if="!title" />
        <span>{{ title }}</span>
      </h1>
      <ul class="navbar-nav">
        <li
          class="nav-item"
          style="cursor: pointer"
          v-show="$route.meta.showBell"
        >
          <a class="nav-link" @click="execute()">
            <i :class="rightIconCode">
              <span class="count" v-show="countBell">{{ titleText }}</span>
            </i>
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>
