const basicRoute = [
  {
    path: "/",
    redirect: "/store",
    // component: () => import("@/view/basic/login/loginPage.vue"),
  },
  // {
  //   path: "/home",
  //   name: "home",
  //   redirect: "/profile/view",
  //   component: () => import("@/view/basic/home/homePage_.vue"),
  // },
  // {
  //   path: "/login/forget",
  //   name: "forget",
  //   component: () => import("@/view/basic/login/forgetPage.vue"),
  // },
  // {
  //   path: "/signup",
  //   name: "signup",
  //   component: () => import("@/view/basic/login/signupPage.vue"),
  // },
  // {
  //   path: "/password",
  //   name: "password",
  //   component: () => import("@/view/basic/password/passwordPage.vue"),
  //   meta: { requiresAuth: true },
  // },
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
        path: "list",
        meta: {
          showHeader: true,
          showFooter: true,
          requiresAuth: false,
          hideHeaderArrow: true,
        },
        components: {
          default: () => import("@/view/custom-user/store/listView.vue"),
        },
      },
      {
        path: ":id",
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
        path: ":id/applyReward",
        meta: {
          showHeader: true,
          showFooter: true,
          requiresAuth: true,
        },
        components: {
          default: () => import("@/view/custom-user/store/applyRewardView.vue"),
        },
      },
      {
        path: ":id/report",
        meta: {
          showHeader: true,
          showFooter: true,
          requiresAuth: true,
        },
        components: {
          default: () => import("@/view/custom-user/store/reportView.vue"),
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
          hideHeaderArrow: true
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
          hideHeaderArrow: true
        },
        components: {
          default: () => import("@/view/custom-user/user/userView.vue"),
        },
      },
      {
        path: "edit",
        meta: {
          showHeader: true,
          showFooter: false,
          requiresAuth: true,
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
