import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import { useCookie, useStorage } from "@/utils/helper";
// import { storeToRefs } from "pinia";
import { orange } from "./mode/orange";
import { green } from "./mode/green";
import { Toast, ToastConfirm } from '@/components/global/swal'

//mode = orange | green
const mode = process.env.VUE_APP_MODE || "green";
const VUE_APP_USER_LOGIN_ROUTER = process.env.VUE_APP_USER_LOGIN_ROUTER;
const VUE_APP_STORE_LOGIN_ROUTER = process.env.VUE_APP_STORE_LOGIN_ROUTER;

const byPassLogin = true;
const tokenKey = "accessToken";


let routes = [];
let loginPath = "/";
if (mode === "green") {
  routes = green;
  loginPath = VUE_APP_USER_LOGIN_ROUTER;
} else {
  routes = orange;
  loginPath = VUE_APP_STORE_LOGIN_ROUTER;
}

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach(async (to, from, next) => {
  // 是否 match
  const isMatchAuth = to.matched.some((item) => item.meta.requiresAuth);
  const loginStatus = localStorage.getItem("is_Login") || "0"

  if (isMatchAuth) {
    const token = useCookie.getItem(tokenKey) || useStorage.getItem(tokenKey);

    if (!token || loginStatus == "0") {
      // 沒有token踢回登入

      if (byPassLogin === false) {

        localStorage.setItem("is_Login", 0)
        const result = await ToastConfirm("請先登入")
        if (result == true) {
          // 這裡要改成登入 路由
          next(loginPath);
          return true;
        } else {
          next(false)
          return false;
        }

      }

    }

    next();
  } else {
    next();
    return true;
  }
});

const customTable = {
  // 小孩end : 爸爸start
  findStart: {
    "/profile/view": { path: "/" },
  },
  // 爸爸start : 小孩end
  findEnd: {
    "/": { path: "/profile/view" },
  },
};
const setCustomRouter = (fromPath, toPath, fromPathQuery, toPathQuery) => {
  customTable.findStart[toPath] = { path: fromPath, query: fromPathQuery };
  customTable.findEnd[fromPath] = { path: toPath, query: toPathQuery };
};
const VUE_APP_ROUTER_TABLE = process.env.VUE_APP_ROUTER_TABLE;

router.beforeResolve((to, from, next) => {
  // 吃到 $back$=1 代表返回=true 跳過不覆蓋
  const backQuery = to?.query?.["$back$"];
  if (backQuery) {
    //  後來發現移除意義不大
    // delete to?.query?.["$back$"];
  } else {
    setCustomRouter(from.path, to.path, from.query, to.query);
    useStorage.setItem(VUE_APP_ROUTER_TABLE, JSON.stringify(customTable));
  }

  next();
  return true;
});

export { router };
