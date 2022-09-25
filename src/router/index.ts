import { createRouter, createWebHashHistory, RouteRecordRaw  } from "vue-router";
import routeData from './routes'
console.log("routeData", routeData);

const routes: RouteRecordRaw[] = routeData
const router = createRouter({
  history: createWebHashHistory(), //has模式
  routes,
})
export default router
