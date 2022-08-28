import axios from 'axios'

//使用create方法创建axios实例
export const service = axios.create({
    timeout: 7000, // 请求超时时间
    baseURL: '/api', // method: 'post',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

// 添加响应拦截器
service.interceptors.response.use(response => {
    return response.data
}, error => {
    return Promise.reject(error)
})

export default service
