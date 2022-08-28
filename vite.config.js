import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

//https://vitejs.cn/ 帮助文档
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy:{
            '/api': {
                target: 'http://localhost:11528',
                //跨域
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, '/')
            }
        }
    }
})
