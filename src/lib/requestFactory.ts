import axios from "axios";
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import type { CreateAxiosOptions } from "./types/requestTransform";
import type {
  RequestOptions,
  Result,
  UploadFileParams,
} from "./types/requestOptions";
import { ContentTypeEnum, RequestEnum } from "./types/requestConfig";
import { cloneDeep } from "lodash-es";
import { isFunction } from "@/utils/index";
import { loadingPlugin } from "@/components/Loading/loading";

export class Request {
  private requestInstance: AxiosInstance;
  private readonly options: CreateAxiosOptions;
  constructor(options: CreateAxiosOptions) {
    this.options = options;
    this.requestInstance = axios.create(options);
    this.setupInterceptors();
  }
  private getTransform() {
    const { transform } = this.options;
    return transform;
  }
  /*
        拦截器配置
        */
  private setupInterceptors() {
    const transform = this.getTransform();
    if (!transform) return;
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform;
    // 请求前拦截
    this.requestInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (requestInterceptors && isFunction(requestInterceptors)) {
          config = requestInterceptors(config, this.options);
        }
        return config;
      },
      undefined,
    );
    // 请求响应拦截
    this.requestInstance.interceptors.response.use(
      (res: AxiosResponse<any>) => {
        if (responseInterceptors && isFunction(responseInterceptors)) {
          res = responseInterceptors(res);
        }
        return res;
      },
      undefined,
    );

    // 请求前的错误拦截处理
    if (requestInterceptorsCatch && isFunction(requestInterceptorsCatch)) {
      this.requestInstance.interceptors.request.use(
        undefined,
        requestInterceptorsCatch,
      );
    }
    // 请求错误拦截
    //    if(responseInterceptorsCatch && isFunction(responseInterceptorsCatch)){
    //        this.requestInstance.interceptors.response.use(undefined, (error) => {
    //          return responseInterceptorsCatch(this.requestInstance, error);
    //        });
    //    }
  }
  /**
   * @description:  File Upload
   */
  uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
    const formData = new window.FormData();
    const customFilename = params.name || "file";

    if (params.filename) {
      formData.append(customFilename, params.file, params.filename);
    } else {
      formData.append(customFilename, params.file);
    }

    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        const value = params.data![key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
          return;
        }

        formData.append(key, params.data![key]);
      });
    }

    return this.requestInstance.request<T>({
      ...config,
      method: "POST",
      data: formData,
      headers: {
        "Content-type": ContentTypeEnum.FORM_DATA,
        ignoreCancelToken: true,
      },
    });
  }
  //  form-data
  supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.options.headers;
    const contentType = headers?.["Content-Type"] || headers?.["content-type"];

    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, "data") ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config;
    }
    //  TODO
    return {
      ...config,
      data: config.data,
      //    data: qs.stringify(config.data, { arrayFormat: 'brackets' }),
    };
  }
  get<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request({ ...config, method: "GET" }, options);
  }

  post<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request({ ...config, method: "POST" }, options);
  }

  put<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request({ ...config, method: "PUT" }, options);
  }

  delete<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request({ ...config, method: "DELETE" }, options);
  }
  request<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
  ): Promise<T> {
    //
    let conf: CreateAxiosOptions = cloneDeep(config);
    const transform = this.getTransform();
    const { requestOptions } = this.options;
    const opt: RequestOptions = { ...requestOptions, ...options };
    const { beforeRequestHooks, requestCatchHook, transformResponseHook } =
      transform || {};
    if (beforeRequestHooks && isFunction(beforeRequestHooks)) {
      conf = beforeRequestHooks(conf, opt);
    }
    conf.requestOptions = opt;

    conf = this.supportFormData(conf);
    console.log("请求参数---》", conf);

    loadingPlugin.showLoading();
    return new Promise((resolve, reject) => {
      this.requestInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (transformResponseHook && isFunction(transformResponseHook)) {
            try {
              const ret = transformResponseHook(res, opt);
              resolve(ret);
            } catch (err) {
              reject(err || new Error("request error!"));
            }
            return;
          }
          loadingPlugin.hideLoading();
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          loadingPlugin.hideLoading();
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt));
            return;
          }
          if (axios.isAxiosError(e)) {
            // rewrite error message from axios in here
          }
          reject(e);
        });
    });
  }
}
