import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import CmsLogin from "../views/CmsLogin.vue";

import localCache from "@/utils/cache";
import { firstMenu } from "@/utils/map-menus";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/",
    name: "login",
    component: CmsLogin,
  },
  {
    path: "/main",
    name: "main",
    component: () => import("../views/CmsMain.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../views/not-found/NotFound.vue"),
    // children:[] ->根据userMenus来决定 -> children
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 导航守卫
router.beforeEach((to) => {
  if (to.path !== "/login") {
    const token = localCache.getCache("token");
    if (!token) {
      return "/login";
    }
  }

  if (to.path === "/main") {
    return firstMenu.url;
  }
});

export default router;
