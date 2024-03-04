import { useUserStore } from '@/stores';
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 登录
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path:'/user/patient',
      name:'patient',
      component:()=>import('@/views/User/patientPage.vue')
    },
    {
      path: '/',
      component: () => import('@/views/Layout/index.vue'),
      redirect: '/home',
      children: [{
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/article',
        component: () => import('@/views/Article/index.vue'),
        meta: {
          title: '健康百科'
        }
      },
      {
        path: '/notify',
        component: () => import('@/views/Notify/index.vue'),
        meta: {
          title: '消息中心'
        }
      },
      {
        path: '/user',
        component: () => import('@/views/User/index.vue'),
        meta: {
          title: '我的'
        }
      }]
    }
  ]
})
NProgress.configure({ showSpinner: false })
// 校验有没有token
const whiteList = ['/login']
router.beforeEach((to)=>{
  NProgress.start()
  const store = useUserStore()
  if(!store.userInfo?.token&&!whiteList.includes(to.path)){
    return '/login'
  }
})
router.afterEach((to)=>{
  document.title = `${to.meta.title||''} - 牛牛问诊`
  NProgress.done()
})
export default router
