// TODO Record
type Recordable<T = any> = Record<string, T>;
export interface RequestOptions {
  apiUrl?: string; //自定义API地址
  // Format request
  formatData?: boolean;
  formatDate?: boolean;
  joinTime?: boolean;
  // 请求重试
  reTryRequest?: ReTryRequest;
  isTransformResponse?: boolean;
  isReturnNativeResponse?: boolean;
  joinParamsToUrl?: boolean; //post请求参数放在URL上
}
export interface ReTryRequest {
  isOpenReTry: boolean;
  count: number; //重试次数
  waitTime: number;
}
// 响应结果
export interface Result<T = any> {
  code: number | string;
  type: "success | error | warning";
  message: string;
  result: T;
}
// 上传文件的 multipart/form-data
export interface UploadFileParams {
  // Other parameters
  data?: Recordable;
  // File parameter interface field name
  name?: string;
  // file name
  file: File | Blob;
  // file name
  filename?: string;
  [key: string]: any;
}
