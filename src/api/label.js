import request from "@/utils/request";

/**
 * 查询所有的标签
 * */
export function queryAllLabel() {
    return request({
        url: '/label/queryAll',
        method: 'post'
    })
}

/**
 * 添加标签信息
 * */
export function addLabel(label) {

    console.log('=========================== 添加标签的API')
    console.log(label)
    return request({
        url: '/label/add',
        method: 'post',
        data: label
    })
}

/**
 * 删除标签
 * */
export function removeLabel(label) {
    return request({
        url: '/label/remove',
        method: 'post',
        data: label
    })
}

