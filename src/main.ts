import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from "axios";
import { AxiosInstance } from "axios";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "normalize.css";
import "./assets/css/index.css";
import { setupStore } from "./store";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

const app = createApp(App);

// 统一注册Icon图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.config.globalProperties.$axios = axios;

app.use(store).use(setupStore).use(router).use(ElementPlus).mount("#app");
