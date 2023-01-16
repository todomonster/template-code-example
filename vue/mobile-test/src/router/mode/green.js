const basicRoute = [
  {
    path: "/",
    redirect: "/store",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/view/basic-user/login/loginIndex.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const customRoute = [
  {
    path: "/store",
    component: () => import("@/view/custom-user/store/storeIndex.vue"),
    redirect: "/store/list",
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        name: "StoreList",
        path: "list",
        meta: {
          showHeader: true,
          showFooter: true,
          requiresAuth: false,
          hideHeaderArrow: true,
          showBell: true,
        },
        components: {
          default: () => import("@/view/custom-user/store/listView.vue"),
        },
      },
      {
        name: "StoreDetail",
        path: "detail",
        meta: {
          showHeader: true,
          showFooter: true,
          requiresAuth: false,
        },
        components: {
          default: () => import("@/view/custom-user/store/detailView.vue"),
        },
      },
      {
        name: "StoreProduct",
        path: "product",
        meta: {
          showHeader: true,
          showFooter: false,
          requiresAuth: false,
        },
        components: {
          default: () => import("@/view/custom-user/store/storeProduct.vue"),
        },
      },
      {
        path: "applyReward",
        meta: {
          showHeader: true,
          showFooter: false,
          requiresAuth: true,
        },
        components: {
          default: () => import("@/view/custom-user/store/applyRewardView.vue"),
        },
      },
      {
        path: "report",
        meta: {
          showHeader: true,
          showFooter: false,
          requiresAuth: true,
        },
        components: {
          default: () => import("@/view/custom-user/store/reportView.vue"),
        },
      },
      {
        path: "favorite",
        meta: {
          showHeader: true,
          showFooter: false,
          requiresAuth: true,
        },
        components: {
          default: () => import("@/view/custom-user/store/favoriteList.vue"),
        },
      },
    ],
  },
  {
    path: "/scan",
    component: () => import("@/view/custom-user/scan/scanIndex.vue"),
    redirect: "/scan/qrcode",
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        path: "qrcode",
        meta: {
          showHeader: true,
          showFooter: true,
          requiresAuth: false,
          hideHeaderArrow: true,
        },
        components: {
          default: () => import("@/view/custom-user/scan/scanView.vue"),
        },
      },
    ],
  },  
  {
    path: "/wallet",
    component: () => import("@/view/custom-user/wallet/walletIndex.vue"),
    redirect: "/wallet/list",
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        path: "list",
        meta: {
          showHeader: true,
          showFooter: true,
          requiresAuth: true,
          hideHeaderArrow: true,
          showBell: true,
        },
        components: {
          default: () => import("@/view/custom-user/wallet/walletView.vue"),
        },
      },
      {
        path: "record",
        meta: {
          showHeader: true,
          showFooter: false,
          requiresAuth: true,
        },
        components: {
          default: () => import("@/view/custom-user/wallet/walletRecord.vue"),
        },
      },
    ],
  },
  {
    // setting /user
    path: "/setting",
    component: () => import("@/view/custom-user/user/userIndex.vue"),
    redirect: "/setting/profile",
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        path: "profile",
        meta: {
          showHeader: true,
          showFooter: true,
          requiresAuth: false,
          hideHeaderArrow: true,
          showBell: true,
        },
        components: {
          default: () => import("@/view/custom-user/user/userView.vue"),
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
          default: () => import("@/view/custom-user/user/userEditView.vue"),
        },
      },
    ],
  },
  {
    path: "/notify",
    component: () => import("@/view/custom-user/notify/notifyIndex.vue"),
    redirect: "/notify/list",
    meta: {
      requiresAuth: false,
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
          default: () => import("@/view/custom-user/notify/notifyView.vue"),
        },
      },
    ],
  },
];

export const green = [...basicRoute, ...customRoute];
