export const green = [
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
          requiresAuth: false,
        },
        components: {
          default: () => import("@/view/custom-user/store/applyRewardView.vue"),
        },
      },
      {
        path: "report",
        meta: {
          showHeader: true,
          showFooter: true,
          requiresAuth: false,
        },
        components: {
          default: () => import("@/view/custom-user/store/reportView.vue"),
        },
      },
    ],
  },

];
