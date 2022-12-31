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

// let preRouterHistory = {};

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  // preRouterHistory = JSON.parse(JSON.stringify(router?.options?.history?.state));

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
// router.beforeResolve((to, from, next) => {
//   // do something...
//   // console.log(to)

//   // if(redirect){
//   //   next(redirect);
//   //   return true;
//   // }  
//   next();
//   return true;    
// });

// const customRouter = {
//   // 小孩end : 爸爸start
//   history: {
//     "/profile/view": "/"
//   },
//   // 爸爸start : 小孩end
//   temp: {
//     "/": "/profile/view"
//   },
// };
// const setCustomRouter = (start, end) => {
//   // 有資料&&是關鍵字要排除
//   // if (end==="/profile/view") {
//   //   return;
//   // }
//   // 檢查如果是反向進入不要加入
//   if(customRouter.temp[start] && end===customRouter.temp[start]){
//     return;
//   }
//   // A-B-A
//   /**
//    *{
//    *B:A 
//    A:B
//    *}
//    */
//   customRouter.history[end] = start;
//   customRouter.temp[start] = end;
// };
router.afterEach((to, from) => {
  // const redirect = to?.query?.redirect
  // console.log("_", redirect)
  // console.log(customRouter)
  // 儲存路由
  // const routerHistory = router?.options?.history?.state;
  
  // setCustomRouter(routerHistory.current, routerHistory.back);
  // console.log(JSON.stringify(customRouter));
  // useStorage.setItem("routerHistory", JSON.stringify(customRouter.history));
  // useStorage.setItem("preRouterHistory", JSON.stringify(preRouterHistory));

  return true;
})
export { router };
