// 定义请求的配置的相关ts类型，响应类型
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import type { RequestOptions, Result } from "./requestOptions";
// 创建axios类型 继承axios的ts类型
export interface CreateAxiosOptions extends AxiosRequestConfig {
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
}
// 转换的类型
export interface AxiosTransform {
  /*
    请求之前
    */
  beforeRequestHooks?: (
    config: AxiosRequestConfig,
    options: RequestOptions,
  ) => AxiosRequestConfig;
  /**
   * @description: 处理响应数据
   */
  transformResponseHook?: (
    res: AxiosResponse<Result>,
    options: RequestOptions,
  ) => any;

  /**
   * @description: 请求失败处理
   */
  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;

  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptors?: (
    config: AxiosRequestConfig,
    options: CreateAxiosOptions,
  ) => AxiosRequestConfig;

  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch?: (error: Error) => void;

  /**
   * @description: 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch?: (
    requestInstance: AxiosResponse,
    error: Error,
  ) => void;
}
