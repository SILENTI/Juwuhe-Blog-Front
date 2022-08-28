import request from "../utils/request";

/**
 * 查询文章及其所属的标签信息-、
 * */
export function queryArticlesPage(data) {
    return request({
        url: '/articles/queryArticlesPage',
        method: 'post',
        data: JSON.stringify(data)
    })
}

/**
 * 根据标签Id查询博文信息
 * */
export function queryArticlesByLabelId(data) {
    return request({
        url: '/articles/queryArticlesLabel',
        method: 'post',
        data: data
    })
}
