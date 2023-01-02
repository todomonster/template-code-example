import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import { Toast } from "@/components/global/swal";
import { useCookie, useStorage } from "@/utils/helper";
// import { storeToRefs } from "pinia";

const tokenKey = "accessToken";

const basicRoute = [
  {
    path: "/",
    name: "login",
    component: () => import("@/view/basic/login/loginPage.vue"),
  },
  {
    path: "/home",
    name: "home",
    redirect: "/profile/view",
    component: () => import("@/view/basic/home/homePage_.vue"),
  },
  {
    path: "/login/forget",
    name: "forget",
    component: () => import("@/view/basic/login/forgetPage.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/view/basic/login/signupPage.vue"),
  },
  {
    path: "/password",
    name: "password",
    component: () => import("@/view/basic/password/passwordPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/home",
  },
];

const myfreeRouter = [
  {
    path: "/profile",
    component: () => import("@/view/custom/profile/profileIndex.vue"),
    redirect: "/profile/view",
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        path: "view",
        meta: {
          showHeader: true,
          showFooter: true,
          requiresAuth: true,
        },
        components: {
          default: () => import("@/view/custom/profile/viewProfile.vue"),
        },
      },
      {
        path: "edit",
        meta: {
          showHeader: false,
          showFooter: false,
          requiresAuth: false,
        },
        components: {
          default: () => import("@/view/custom/profile/editProfile.vue"),
        },
      },
    ],
  },
  {
    path: "/setting",
    component: () => import("@/view/custom/setting/settingIndex.vue"),
    redirect: "/setting/list",
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "list",
        meta: {
          showHeader: true,
          showFooter: true,
          requiresAuth: true,
        },
        components: {
          default: () => import("@/view/custom/setting/menuList.vue"),
        },
      },
      {
        path: "qrCode",
        meta: {
          showHeader: true,
          showFooter: false,
          requiresAuth: true,
        },
        components: {
          default: () => import("@/view/custom/setting/qrCode.vue"),
        },
      },
    ],
  },
  {
    path: "/notify",
    component: () => import("@/view/custom/notify/notifyIndex.vue"),
    redirect: "/notify/list",
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "list",
        meta: {
          showHeader: true,
          showFooter: true,
          requiresAuth: true,
        },
        components: {
          default: () => import("@/view/custom/notify/notifyList.vue"),
        },
      },
    ],
  },
  {
    path: "/product",
    component: () => import("@/view/custom/product/productIndex.vue"),
    redirect: "/product/list",
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "list",
        meta: {
          showHeader: true,
          showFooter: false,
          requiresAuth: true,
        },
        components: {
          default: () => import("@/view/custom/product/productList.vue"),
        },
      },
      {
        path: "detail",
        name: "ProductDetail",
        meta: {
          showHeader: true,
          showFooter: false,
          requiresAuth: true,
        },
        components: {
          default: () => import("@/view/custom/product/productDetail.vue"),
        },
      },
    ],
  },
  {
    path: "/wallet",
    component: () => import("@/view/custom/wallet/walletIndex.vue"),
    redirect: "/wallet/list",
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "list",
        meta: {
          showHeader: true,
          showFooter: true,
          requiresAuth: true,
        },
        components: {
          default: () => import("@/view/custom/wallet/viewWallet.vue"),
        },
      },
      {
        path: "rewardApply",
        meta: {
          showHeader: true,
          showFooter: false,
          requiresAuth: true,
        },
        components: {
          default: () => import("@/view/custom/wallet/subPage/rewardApply.vue"),
        },
      },
      {
        path: "rewardRecord",
        meta: {
          showHeader: true,
          showFooter: false,
          requiresAuth: true,
        },
        components: {
          default: () =>
            import("@/view/custom/wallet/subPage/rewardRecord.vue"),
        },
      },
      {
        path: "moneyRecord",
        meta: {
          showHeader: true,
          showFooter: false,
          requiresAuth: true,
        },
        components: {
          default: () => import("@/view/custom/wallet/subPage/moneyRecord.vue"),
        },
      },
    ],
  },
];

let routes = [...myfreeRouter, ...basicRoute];


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
    "/profile/view": "/"
  },
  // 爸爸start : 小孩end
  findEnd: {
    "/": "/profile/view"
  },
};
const setCustomRouter = (fromPath, toPath) => {
  customTable.findStart[toPath] = fromPath;
  customTable.findEnd[fromPath] = toPath;
};
const VUE_APP_ROUTER_TABLE = process.env.VUE_APP_ROUTER_TABLE;

router.beforeResolve((to, from, next) => {

  // 吃到 $back$=1 代表返回=true 跳過不覆蓋
  const backQuery = to?.query?.["$back$"]
  if (backQuery) {
    //  後來發現移除意義不大
    // delete to?.query?.["$back$"];

  } else {
    setCustomRouter(from.path, to.path)
    useStorage.setItem(VUE_APP_ROUTER_TABLE, JSON.stringify(customTable));
  }

  next();
  return true;
});

export { router };
