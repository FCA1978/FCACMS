import axios from "axios";
import type { AxiosInstance } from "axios";
import type { FCARequestInterceptors, FCARequestConfig } from "./type";

class FCARequest {
  instance: AxiosInstance;
  interceptors?: FCARequestInterceptors;

  constructor(config: FCARequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;

    //从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log("所有实例都有的拦截器，请求成功拦截");
        // ElLoading.service({
        //   lock: true,
        //   text: "正在请求数据",
        //   background: "rgba(0,0,0,0.5)",
        // });
        return config;
      },
      (err) => {
        console.log("所有的实例都有的拦截器，请求失败拦截");
        return err;
      }
    );

    this.instance.interceptors.response.use(
      (res) => {
        console.log("所有实例都有的拦截器，请求成功拦截");
        const data = res.data;
        if (data.returnCode === "-1001") {
          console.log("请求失败，错误信息");
        } else {
          return data;
        }
      },
      (err) => {
        console.log("所有的实例都有的拦截器，请求失败拦截");
        // 判断不同的httpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log("404错误");
        }
        return err;
      }
    );
  }

  requset<T>(config: FCARequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            // res使用时 eslint会报警告 故使用后面的注释即可消除警告
            res = config.interceptors.responseInterceptor(res); // eslint-disable-line no-unused-vars
          }

          // 将结果resolve返回出去
          resolve(res);
        })
        .catch((err) => {
          reject(err);
          return err;
        });
    });
  }

  get<T>(config: FCARequestConfig<T>): Promise<T> {
    return this.requset<T>({ ...config, method: "GET" });
  }

  post<T>(config: FCARequestConfig<T>): Promise<T> {
    return this.requset<T>({ ...config, method: "POST" });
  }

  delete<T>(config: FCARequestConfig<T>): Promise<T> {
    return this.requset<T>({ ...config, method: "DELETE" });
  }

  patch<T>(config: FCARequestConfig<T>): Promise<T> {
    return this.requset<T>({ ...config, method: "PATCH" });
  }
}

export default FCARequest;
