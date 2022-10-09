import request from "@/utils/request";

/**
 * 查询所有的分类信息
 */
export function queryAllClassify() {
    return  request({
        url: '/classify/queryAll',
        method: 'post',
    })
}

/**
 * 修改分类的信息
 * */
export function updateClassify(classify) {
    return request({
        url: '/classify/update',
        method: 'post',
        data: classify
    })
}

export function addClassify(classify) {
    return request({
        url: '/classify/add',
        method: 'post',
        data: classify
    })
}
