<script>
import { ref, onMounted, computed } from "vue";
import { useGlobalStore } from "@/store/global";
import { apiGetNotifyUnreadAmount } from "@/api/myfree";

export default {
  props: {
    title: String,
    rightIcon: String,
    rightTextStatus: String,
    backToPath: String,
  },
  setup(props) {
    const globalStore = useGlobalStore();
    const goto = globalStore.goto;
    const unread = ref(0);

    const iconCode = ref("");
    const titleText = ref("");
    const execute = ref(new Function());

    const handleBellClick = () => {
      goto("router", "/notify");
    };
    function setValue(icon, inputString) {
      iconCode.value = icon || "";
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

    onMounted(async () => {
      setIcon(props.rightIcon);
      if (iconCode.value === "icon icon-notice") {
        // 鈴鐺開啟才打API
        const response = await apiGetNotifyUnreadAmount();
        if (response.result && response.unread) {
          unread.value = response.unread;
          if (props.rightTextStatus == "show") {
            titleText.value = unread;
          }
        }
      }
    });
    const countBell = computed(() => {
      if (titleText.value === 0) {
        return true;
      }
      if (typeof titleText.value === "string") {
        return titleText.value.trim() === "" ? false : true;
      }
      return false;
    });

    return { iconCode, titleText, goto, execute, countBell };
  },
};
</script>

<template>
  <header class="c-header">
    <nav class="navbar ui-navbar">
      <ul class="navbar-nav">
        <li class="nav-item" style="cursor: pointer">
          <a @click="goto('back')" class="nav-link"
            ><i class="icon icon-back"></i
          ></a>
        </li>
      </ul>
      <h1 class="navbar-brand">
        <img src="@/assets/images/logo_s.png" v-if="!title" />
        <span>{{ title }}</span>
      </h1>
      <ul class="navbar-nav">
        <li class="nav-item" style="cursor: pointer">
          <a class="nav-link" @click="execute()">
            <i class="icon icon-notice">
              <span class="count" v-show="countBell">{{ titleText }}</span>
            </i>
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>
