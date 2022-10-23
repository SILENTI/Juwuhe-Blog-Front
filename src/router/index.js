import {createRouter, createWebHistory} from 'vue-router'
import HomeViewFront from '../views/front/HomeView.vue'
import ClassificationFront from "../views/front/ClassifyView.vue";
import TagViewFront from "../views/front/TagView.vue";
import AxisViewFront from "../views/front/AxisView.vue";
import AboutViewFront from "../views/front/AboutView.vue";
import LoginViewBack from "../views/back/LoginView.vue";
import HomeViewBack from "../views/back/HomeView.vue";
import ArticlesDetailView from "../views/front/ArticlesDetailView.vue";
import ArticlesList from "@/components/back/ArticleList.vue";
import Editor from "@/components/back/Editor.vue";
import ClassifyLabel from "@/components/back/ClassifyLabel.vue";
import Gallery from "@/components/back/Gallery.vue";
import Guestbook from "@/views/front/GuestbookView.vue";
import NotFound from '@/views/other/NotFound.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), routes: [/*-------------------------------- 前台路由 --------------------------------*/
        {
            path: '/', name: 'home', component: HomeViewFront,
        }, {
            path: "/404", name: '404-error', component: NotFound,
        }, {
            path: '/front', name: 'front', children: [{
                path: 'home', name: 'front-home', component: HomeViewFront,
            }, {
                path: 'tag', name: 'front-tag', component: TagViewFront
            }, {
                path: 'classify', name: 'front-classify', component: ClassificationFront,
            }, {
                path: 'axis', name: 'front-axis', component: AxisViewFront
            }, {
                path: 'guestbook', name: 'front-guestbook', component: Guestbook
            }, {
                path: 'about', name: 'front-about', component: AboutViewFront
            }, {
                path: 'articlesDetail', name: 'front-articlesDetail', component: ArticlesDetailView
            },]
        }, /*-------------------------------- 后台路由 --------------------------------*/
        {
            path: '/back', name: 'back', children: [{
                path: 'home', name: 'back-home', component: HomeViewBack, children: [{
                    path: 'articlesList', name: "ArticlesList", component: ArticlesList
                }, {
                    path: 'editor', name: 'editor', component: Editor
                }, {
                    path: 'classifyLabel', name: 'classifyLabel', component: ClassifyLabel
                }, {
                    path: 'gallery', name: 'gallery', component: Gallery
                }]
            }, {
                path: 'login', name: 'back-login', component: LoginViewBack
            }]
        }, {
            path: '/:catchAll(.*)', redirect: '/404'
        }]
})

router.beforeEach((to, from, next) => {
    // console.log('请求地址:', to)

    //登录页面直接放行
    if (to.path == '/back/login') {
        next();
    } else if (to.matched != null && to.matched[0].path === '/back') {
        //后台系统要进行登录验证
        // console.log('==== 后台 ====')
        if (localStorage.getItem('token') != null && localStorage.getItem('token') != '') {
            next();
        } else {
            next('/back/login');
        }
    } else {
        //前台页面直接放行
        // console.log('==== 前台 ====')
        next();
    }
})

export default router
