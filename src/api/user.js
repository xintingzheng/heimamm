// 导入接口组件
import userRequest from '../utils/request.js';

// 新增用户
export function userAdd(data) {
    return userRequest({
        url: "/user/add",
        method: "post",
        data,
    })
}

// 编辑用户
export function userEdit(data) {
    return userRequest({
        url: "/user/edit",
        method: "post",
        data,
    })
}

// 删除用户
export function userRemove(data) {
    return userRequest({
        url: "/user/remove",
        method: "post",
        data,
    })
}

// 修改用户
export function userStatus(data) {
    return userRequest({
        url: "/user/status",
        method: "post",
        data,
    })
}


// 获取用户列表
export function userList(params) {
    return userRequest({
        url: "/user/list",
        method: "get",
        params,
    })
}
