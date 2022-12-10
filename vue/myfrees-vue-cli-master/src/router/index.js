import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { Toast } from "@/components/global/swal";
import { useCookie, useStorage } from '@/utils/helper';
const tokenKey = "accessToken";

const basicRoute = [
  {
    path: "/",
    name: "login",
    component: () => import('@/view/basic/login/loginPage.vue'),
  },
  {
    path: "/home",
    name: "home",
    component: () => import('@/view/basic/home/homePage_.vue'),
  },
  {
    path: "/login/forget",
    name: "forget",
    component: () => import('@/view/basic/login/forgetPage.vue'),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import('@/view/basic/login/signupPage.vue'),
  },
  {
    path: "/password",
    name: "password",
    component: () => import('@/view/basic/password/passwordPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/home",
  }
];

const myfreeRouter = [
  {
    path: "/profile",
    component: () => import('@/view/custom/profile/profileIndex.vue'),
    redirect: "/profile/view",
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "view",
        meta: {
          showHeader: true,
          showFooter: true,
          requiresAuth: true
        },
        components: {
          default: () => import('@/view/custom/profile/viewProfile.vue')
        },
      },
      {
        path: "edit",
        meta: {
          showHeader: true,
          showFooter: false,
          requiresAuth: true
        },
        components: {
          default: () => import('@/view/custom/profile/editProfile.vue')
        },
      }
    ]
  },
  {
    path: "/setting",
    component: () => import('@/view/custom/setting/settingIndex.vue'),
    redirect: "/setting/list",
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "list",
        meta: {
          showHeader: true,
          showFooter: true,
          requiresAuth: true
        },
        components: {
          default: () => import('@/view/custom/setting/menuList.vue')
        },
      },
      {
        path: "qrCode",
        meta: {
          showHeader: true,
          showFooter: false,
          requiresAuth: true
        },
        components: {
          default: () => import('@/view/custom/setting/qrCode.vue')
        },
      }
    ]
  },
  {
    path: "/notify",
    component: () => import('@/view/custom/notify/notifyIndex.vue'),
    redirect: "/notify/list",
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "list",
        meta: {
          showHeader: true,
          showFooter: true,
          requiresAuth: true
        },
        components: {
          default: () => import('@/view/custom/notify/notifyList.vue')
        },
      }
    ]
  },
  {
    path: "/wallet",
    component: () => import('@/view/custom/wallet/walletIndex.vue'),
    redirect: "/wallet/list",
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "list",
        meta: {
          showHeader: true,
          showFooter: true,
          requiresAuth: true
        },
        components: {
          default: () => import('@/view/custom/wallet/walletList.vue')
        },
      }
    ]
  },
]

let routes = [...myfreeRouter, ...basicRoute,];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
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
})

export { router }
