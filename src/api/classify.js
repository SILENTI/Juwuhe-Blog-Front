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

/**
 * 添加分类信息
 * */
export function addClassify(classify) {
    return request({
        url: '/classify/add',
        method: 'post',
        data: classify
    })
}

/**
 * 查询所有的文章及其分类信息
 * */
export function queryArticleAndClassify() {
    return request({
        url: '/classify/queryInfo',
        method: 'post'
    })
}

/**
 * 删除分类信息
 *
 */
export function removeClassify(classifyIdList){
    return request({
        url: '/classify/remove',
        method: 'post',
        data: classifyIdList
    })
}
