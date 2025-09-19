import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/index.vue'
import NProgress from "nprogress";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        component: HomeView
      },
      {
          path: '/articlelist',
          name: 'articlelist',
          component: () => import("@/views/ArticleList/index.vue"),
          meta: { title: '笔记'}
      },
      {
          path: '/article',
          name: 'article',
          component: () => import("@/views/Articles/index.vue"),
          meta: { 
            keepAlive: false, //需要缓存  
          }
      },
      {
        path: "/gallery",
        name: "gallery",
        component: () => import("@/views/Gallery/index.vue"),
        meta: {
          keepAlive: false, //需要缓存
        },
      },
      {
        path: "/dev-tools",
        name: "devTools",
        component: () => import("@/views/DevTools/index.vue"),
        meta: {
          keepAlive: false, //需要缓存
        }
      },
      {
        path: "/generate",
        name: "generate",
        component: () => import("@/components/tools/index.vue"),
        meta: {
          keepAlive: false, //需要缓存
        },
      },
      {
        path: "/generate-table",
        name: "generate-table",
        component: () => import("@/components/tools/generateList.vue"),
        meta: {
          keepAlive: false, //需要缓存
        },
      },
      {
        path: "/module3d",
        name: "generate-table",
        component: () => import("@/components/module3d/index.vue"),
        meta: {
          keepAlive: false, //需要缓存
        },
      }
    ]
})

NProgress.configure({
  showSpinner:false
})
router.beforeEach((to)=>{
  NProgress.start();
})
router.afterEach((to)=>{
  NProgress.done()
})

export default router
