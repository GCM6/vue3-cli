import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import loading from '@/components/Loading/loading'
// 根据路由改变修改页面title
router.beforeEach((to, from, next) => {
  if (to.meta?.title) {
    const title: string = to.meta?.title as string
    document.title = title
  }
  next()
})
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(loading)
app.mount('#app')
