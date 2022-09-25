export default [
  {
    path: '/',
    redirect: '/Home',//重定向
    children: [
      {
      path: 'Home',
      name: 'Home',
      component: () => import('@/pages/home/index.vue'), 
      meta: {title: '员工健康'}
      },
      {
      path: '/StatusReport',
      name: 'StatusReport',//禁止同名
      component: () => import('@/pages/statusReport/index.vue'), 
      meta: {title: '员工健康填报'}
      },
      {
        path: '/recordFilling',
        name: 'recordFilling',
        component: () => import('@/pages/recordFilling/index.vue'), 
        meta: {title: '核酸检测记录填报'}
      }
    ]
  },
]