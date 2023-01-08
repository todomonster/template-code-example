export const green = [
    {
      path: "/",
      component: () => import("@/view/custom-user/store/storeIndex.vue"),
      redirect: "/view",
      meta: {
        requiresAuth: false,
      },
      children: [
        {
          path: "view",
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

  