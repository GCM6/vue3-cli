// 保证引入.vue文件出现找不模块的问题
declare module '*.vue' {
  import { defineComponent, ComponentOptions } from 'vue'
  const component: ReturnType<typeof defineComponent>
  // const componentOptions: ComponentOptions
  export default component
}

declare module '*.gif' {
  export const gif: any
}
