import axios from 'axios';

// 导入token函数
import { getToken } from '../utils/token.js';

// 学科页面请求对象
const subjectRequest = axios.create({
    baseURL: process.env.VUE_APP_BASEURL
});

// 添加请求拦截器
subjectRequest.interceptors.request.use(
    function (config) {
        // 发送请求前 做某些事情
        config.headers.token = getToken();
        return config;
    },
    function (error) {
        // 请求错误事 做某些事情
        return Promise.reject(error)
    }
);

// 添加响应拦截器
subjectRequest.interceptors.request.use(
    function (response) {
        // 对响应的数据 做某些事情
        // .then 还没触发
        return response.data; // 把 .data拿掉 .then中不用写 .data
    },
    function (error) {
        // 响应出错时, 做某些事情
        return Promise.reject(error)
    }
);

// 抽取接口方法
// 获取列表
export function subjectList(params) {
    return subjectRequest({
        url: "/subject/list",
        method: "get",
        params
    })
}

// 新增学科
export function subjectAdd(data) {
    return subjectRequest({
        url: "/subject/add",
        method: "post",
        data
    })
}

// 新增学科
export function subjectStatus(data) {
    return subjectRequest({
        url: "/subject/status",
        method: "post",
        data
    })
}

// 删除学科
export function subjectRemove(data) {
    return subjectRequest({
        url: "/subject/remove",
        method: "post",
        data
    })
}

// 获取编辑学科
export function subjectEdit(data) {
    return subjectRequest({
        url: "/subject/edit",
        method: "post",
        data
    })
}
