import {createRouter, createWebHistory} from 'vue-router'
import HomeViewFront from '../views/front/HomeView.vue'
import ClassificationFront from "../views/front/ClassifyView.vue";
import TagViewFront from "../views/front/TagView.vue";
import AxisViewFront from "../views/front/AxisView.vue";
import AboutViewFront from "../views/front/AboutView.vue";
import LoginViewBack from "../views/back/LoginView.vue";
import HomeViewBack from "../views/back/HomeView.vue";
import ArticlesDetailView from "../views/front/ArticlesDetailView.vue";
import ArticlesListView from "@/views/back/Articles/ArticlesListView.vue";
import Editor from "@/components/back/Editor.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        /*-------------------------------- 前台路由 --------------------------------*/
        {
            path: '/',
            name: 'home',
            component: HomeViewFront,
        },
        {
            path: '/front',
            name: 'front',
            children: [
                {
                    path: 'home',
                    name: 'front-home',
                    component: HomeViewFront,
                },
                {
                    path: 'tag',
                    name: 'front-tag',
                    component: TagViewFront
                },
                {
                    path: 'classify',
                    name: 'front-classify',
                    component: ClassificationFront,
                }, {
                    path: 'axis',
                    name: 'front-axis',
                    component: AxisViewFront
                }, {
                    path: 'about',
                    name: 'front-about',
                    component: AboutViewFront
                }, {
                    path: 'articlesDetail',
                    name: 'front-articlesDetail',
                    component: ArticlesDetailView
                },
            ]
        },
        /*-------------------------------- 后台路由 --------------------------------*/
        {
            path: '/back',
            name: 'back',
            children: [
                {
                    path: 'home',
                    name: 'back-home',
                    component: HomeViewBack,
                    children: [
                        {
                            path: 'articlesList',
                            name: "ArticlesList",
                            component: ArticlesListView
                        },{
                            path: 'editor',
                            name: 'editor',
                            component: Editor
                        }
                    ]
                },
                {
                    path: 'login',
                    name: 'back-login',
                    component: LoginViewBack
                }
            ]
        },
    ]
})

export default router
