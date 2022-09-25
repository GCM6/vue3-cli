import { App, createApp, reactive } from "vue";
import Loading from "./Loading.vue";
import type { Option } from "./types";
// 动态创建一个容器
const div: Element = document.createElement("div");
div.setAttribute("class", "loading-container");
const option: Option = reactive({
  visibled: true,
  loadingText: "正在加载中...",
});
console.log("loading", option);
//这里是关键部位options 是向Loading 组件传递的参数
const $loading = createApp(Loading, { option }).mount(div);

export const loadingPlugin = {
  showLoading(text?: string) {
    option.visibled = true;
    option.loadingText = text || "正在加载中...";
    // console.log("$loading.$el", $loading.$el);
    document.body.appendChild($loading.$el);
  },
  hideLoading() {
    option.visibled = false;
  },
};

// 插件
export default {
  install(app: App) {
    // 3.0的全局挂载
    app.config.globalProperties.$loading = loadingPlugin;
  },
};
