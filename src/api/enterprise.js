// 导入 抽取的请求对象
import enterpriseRequest from '../utils/request.js'

// 抽取接口方法
// 获取列表
export function enterpriseList(params) {
    return enterpriseRequest({
        url: "/enterprise/list",
        method: "get",
        params
    })
}

// 新增数据
export function enterpriseAdd(data) {
    return enterpriseRequest({
        url: "/enterprise/add",
        method: "post",
        data
    })
}

// 删除数据
export function enterpriseRemove(data) {
    return enterpriseRequest({
        url: "/enterprise/remove",
        method: "post",
        data
    })
}

// 编辑数据
export function enterpriseEdit(data) {
    return enterpriseRequest({
        url: "/enterprise/edit",
        method: "post",
        data
    })
}

// 修改状态
export function enterpriseStatus(data) {
    return enterpriseRequest({
        url: "/enterprise/status",
        method: "post",
        data
    })
}