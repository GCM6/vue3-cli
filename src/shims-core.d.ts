// 解决 ComponentCustomProperties 类型 ts报错的问题 vue/runtime-core
import { ComponentCustomProperties } from "vue";
interface LoadingPlugin {
  showLoading: Function;
  hideLoading: Function;
}
// 定义全局属性的类型
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $loading: LoadingPlugin,
  }
}