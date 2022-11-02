// service统一出口
import FCARequest from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";
import localCache from "@/utils/cache";

const fcaRequest = new FCARequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = localCache.getCache("token");
      if (token) {
        (config.headers as any).Authorization = `Bearer ${token}`;
      }

      return config;
    },
    requestInterceptorCatch: (err) => {
      console.log("请求失败的拦截");
      return err;
    },
    responseInterceptor: (res) => {
      console.log("相应成功的拦截");
      return res;
    },
    responseInterceptorCatch: (err) => {
      console.log("相应失败的拦截");
      return err;
    },
  },
});

export default fcaRequest;
