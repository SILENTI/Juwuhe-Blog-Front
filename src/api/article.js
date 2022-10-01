import request from "../utils/request";

/**
 * 查询文章及其所属的标签信息
 * */
export function queryArticlesPage(data) {
    return request({
        url: '/article/queryPage',
        method: 'post',
        data: JSON.stringify(data)
    })
}

/**
 * 根据标签Id查询博文信息
 * */
export function queryArticlesByLabelId(data) {
    return request({
        url: '/article/queryArticlesLabel',
        method: 'post',
        data: data
    })
}

/**
 * 获取所有的分类信息
 * */
export function saveArticle(data) {
    return request({
        url: '/article/save',
        method: 'post',
        data: data
    })
}

/**
 * 修改文章的状态
 * */
export function publishAction(articleId) {
    return request({
        url: '/article/publishAction/'+articleId,
        method: 'get',
    })
}

/**
 * 删除文章
 * */
export function removeArticle(articleId){
    return request({
        url: '/article/remove',
        method: 'post',
        data: {'articleId': articleId}
    })
}
