import request from '../utils/request'

/**
 * 用户登录
 * */
export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data:JSON.stringify(data)
    })
}

