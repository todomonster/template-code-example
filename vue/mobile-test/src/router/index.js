import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import { Toast } from "@/components/global/swal";
import { useCookie, useStorage } from "@/utils/helper";
// import { storeToRefs } from "pinia";
import { orange } from "./mode/orange";
import { green } from "./mode/green";
//orange green
const mode = "green";
const tokenKey = "accessToken";

// user
let routes = [];
if (mode === "green") {
  routes = green;
} else {
  // orange
  routes = orange;
}

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  // 是否 match
  const isMatchAuth = to.matched.some((item) => item.meta.requiresAuth);
  if (isMatchAuth) {
    const token = useCookie.getItem(tokenKey) || useStorage.getItem(tokenKey);
    if (!token) {
      // 沒有token踢回登入
      Toast("請先登入");
      localStorage.setItem("is_Login", 0);
      next("/");
      return true;
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
