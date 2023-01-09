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
// store
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
    path: "/notifyListFcm",
    meta: {
      requiresAuth: false,
    },
    components: {
      default: () => import("@/view/custom/firebase/applyReward.vue"),
    },
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
          hideHeaderArrow: true
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
          hideHeaderArrow: true
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

export const orange = [...myfreeRouter, ...basicRoute];
