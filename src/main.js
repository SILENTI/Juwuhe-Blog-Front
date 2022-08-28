import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const app = createApp(App)

// 引入插件
app.use(router)
app.use(MdEditor)
app.use(ElementPlus)
app.mount('#app')
