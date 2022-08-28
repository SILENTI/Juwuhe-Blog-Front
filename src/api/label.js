import request from '../utils/request'

export function queryAll (){
    return request({
        url: '/labels/queryAll',
        method: 'post'
    })
}
