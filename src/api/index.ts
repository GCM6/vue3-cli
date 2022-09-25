import { request } from "@/utils/request";
// 不带前缀就默认当成相对路径
const pms = "http://www.baidu.com";
export const testFetch = () => request.post<void>({ url: `${pms}/search` });
