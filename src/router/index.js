import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue'),
        meta: { title: '首页'}
    },
    {
        path: '/category/:cate',
        name: 'category',
        component: () => import('../views/Home.vue'),
        meta: { title: '分类', params: 'cate'}
    },
    {
        path: '/search/:words',
        name: 'search',
        component: () => import('../views/Home.vue'),
        meta: { title: '搜索', params: 'words'}
    },
    {
        path: '/articlelist',
        name: 'article',
        component: () => import('../views/Articlelist.vue'),
        meta: { title: '笔记'}
    },
    {
        path: '/article/:id',
        name: 'article',
        component: () => import('../views/Articles.vue'),
        meta: { title: '文章'}
    },
    {
        path: '/gallery',
        name: 'gallery',
        component: () => import('../views/gallery.vue'),
        meta: { title: '画廊'}
    },
    {
        path: '/tinymce',
        name: 'gallery',
        component: () => import('../components/edit/tinymceEdit.vue'),
        meta: { title: 'tinymce编辑器'}
    },
    {
        path: '/mavon',
        name: 'markdownedit',
        component: () => import('../components/edit/mavonEdit/index.vue'),
        meta: { title: 'markdown编辑器'}
    },
    {
        path: '/office',
        name: 'markdownedit',
        component: () => import('../components/edit/onlyoffice.vue'),
        meta: { title: 'office编辑器'}
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    let title = ''
    if (to.meta.params){
        title = `${to.meta.title}:${to.params[to.meta.params] || ''} - ${title}`
    }else {
        title = `${to.meta.title} - ${title}`
    }
    document.title = title
    if (to.path !== from.path) {
        store.dispatch('setLoading', true);
    }
    next();
})
router.afterEach((to, from) => {
    // 最多延迟 关闭 loading
    setTimeout(() => {
        store.dispatch('setLoading', false);
    }, 1500)
})
export default router
