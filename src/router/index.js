import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/front/HomeView.vue'
import Classification from "../views/front/ClassifyView.vue";
import TagView from "../views/front/TagView.vue";
import AxisView from "../views/front/AxisView.vue";
import AboutView from "../views/front/AboutView.vue";
import LoginView from "../views/back/LoginView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        }, {
            path: '/classify',
            name: 'classify',
            component: Classification
        }, {
            path: '/tag',
            name: 'tag',
            component: TagView
        }, {
            path: '/axis',
            name: 'axis',
            component: AxisView
        }, {
            path: '/about',
            name: 'about',
            component: AboutView
        }, {
            path: '/login',
            name: 'login',
            component: LoginView
        }
    ]
})

export default router
