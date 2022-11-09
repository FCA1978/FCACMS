import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import localCache from "@/utils/cache";
import { firstMenu } from "@/utils/map-menus";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/CmsLogin.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/CmsMain.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/not-found/NotFound.vue"),
    // children:[] ->根据userMenus来决定 -> children
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 导航守卫
router.beforeEach((to) => {
  console.log(to);

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
