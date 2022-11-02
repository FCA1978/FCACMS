import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface FCARequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;

  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}

export interface FCARequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: FCARequestInterceptors<T>;
}
