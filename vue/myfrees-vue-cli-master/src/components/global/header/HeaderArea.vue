<script>
import { ref, onMounted } from "vue";
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

    let iconCode = ref("");
    let titleText = ref("");
    let execute = ref(new Function());

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
          setValue("far fa-bell", " ");
          execute.value = handleBellClick;
          break;
        default:
          setValue("", "");
      }
    };

    onMounted(async () => {
      setIcon(props.rightIcon);
      if (iconCode.value === "far fa-bell") {
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

    return { iconCode, titleText, goto, execute };
  },
};
</script>

<template>
  <header class="c-header">
    <nav class="navbar ui-navbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a @click="goto('back')" class="nav-link"
            ><i class="fa fa-chevron-left"></i
          ></a>
        </li>
      </ul>
      <h1 class="navbar-brand">{{ title }}</h1>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" @click="execute()"
            ><i :class="iconCode"
              ><span>{{ titleText }}</span></i
            ></a
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
// @import "../../../assets/layout.scss";
//
@import "@/assets/custom/mixins";

// header
.c-header {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 2;
}

.ui-navbar {
  padding-top: 0;
  padding-bottom: 0;
  height: $header-height;
  background-color: $primary-color;

  .nav-link {
    padding-left: 0.875rem;
    padding-right: 0.875rem;
    color: white;
    font-size: 0.8125rem;
    line-height: 1;
    white-space: nowrap;

    i {
      font-size: 1.125rem;
      color: white;
    }

    span {
      font-size: 0.8125rem;
      padding-left: 0.25rem;
    }

    .fa-chevron-left {
      font-size: 1.25rem;
    }
  }
}

.navbar-brand {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-right: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
  color: white;
  font-size: 1.25rem;
  white-space: nowrap;
  @include translate(-50%, -50%);

  img {
    height: 2.1875rem;
  }
}
</style>
