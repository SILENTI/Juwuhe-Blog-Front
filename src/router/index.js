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

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        /*-------------------------------- 前台路由 --------------------------------*/
        {
            path: '/',
            articleTitle: 'home',
            component: HomeViewFront,
        },
        {
            path: '/front',
            articleTitle: 'front',
            children: [
                {
                    path: 'home',
                    articleTitle: 'front-home',
                    component: HomeViewFront,
                },
                {
                    path: 'tag',
                    articleTitle: 'front-tag',
                    component: TagViewFront
                },
                {
                    path: 'classify',
                    articleTitle: 'front-classify',
                    component: ClassificationFront,
                }, {
                    path: 'axis',
                    articleTitle: 'front-axis',
                    component: AxisViewFront
                }, {
                    path: 'about',
                    articleTitle: 'front-about',
                    component: AboutViewFront
                }, {
                    path: 'articlesDetail',
                    articleTitle: 'front-articlesDetail',
                    component: ArticlesDetailView
                },
            ]
        },
        /*-------------------------------- 后台路由 --------------------------------*/
        {
            path: '/back',
            articleTitle: 'back',
            children: [
                {
                    path: 'home',
                    articleTitle: 'back-home',
                    component: HomeViewBack,
                    children: [
                        {
                            path: 'articlesList',
                            articleTitle: "ArticlesList",
                            component: ArticlesList
                        },{
                            path: 'editor',
                            articleTitle: 'editor',
                            component: Editor
                        },{
                            path: 'classifyLabel',
                            articleTitle: 'classifyLabel',
                            component: ClassifyLabel
                        },{
                            path: 'gallery',
                            articleTitle: 'gallery',
                            component: Gallery
                        }
                    ]
                },
                {
                    path: 'login',
                    articleTitle: 'back-login',
                    component: LoginViewBack
                }
            ]
        },
    ]
})

export default router
