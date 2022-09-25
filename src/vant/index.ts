import { App } from "vue";
import { DatetimePicker, Picker, Popup } from "vant";
// 函数组件都需要单独引入样式
import "vant/es/image-preview/style";
import "vant/es/toast/style";
const element = {
  install: function (app: App) {
    app.use(DatetimePicker).use(Popup).use(Picker);
  },
};
export default element;
