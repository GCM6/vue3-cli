import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import element from "@/vant";
import loading from "@/components/Loading/loading";
// 根据路由改变修改页面title
router.beforeEach((to, from, next) => {
  if (to.meta?.title) {
    const title: string = to.meta?.title as string;
    document.title = title;
  }
  next();
});
const pinia = createPinia();
const app = createApp(App);
app.use(pinia)
  .use(router)
  .use(loading)
  .use(element)
  .mount("#app");
