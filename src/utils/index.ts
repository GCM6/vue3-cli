export function isFunction(val: unknown): val is Function {
  return typeof val === "function";
}
export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}
export function isString(val: unknown): val is string {
  return is(val, "String");
}
export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, "Object");
}
// 将参数放在url
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = "";
  for (const key in obj) {
    parameters += key + "=" + encodeURIComponent(obj[key]) + "&";
  }
  parameters = parameters.replace(/&$/, "");
  return /\?$/.test(baseUrl)
    ? baseUrl + parameters
    : baseUrl.replace(/\/?$/, "?") + parameters;
}
// 深度拷贝合并
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key])
      ? deepMerge(src[key], target[key])
      : (src[key] = target[key]);
  }
  return src;
}
