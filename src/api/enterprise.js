// 导入axios
import axios from 'axios';

// 导入token
import { getToken } from '../utils/token.js';

const enterpriseRequest = axios.create({
    baseURL: process.env.VUE_APP_BASEURL
})

// 添加请求拦截器
enterpriseRequest.interceptors.request.use(
    function (config) {
        // 发送请求前,做某些事情
        config.headers.token = getToken();
        return config;
    },
    function (error) {
        // 请求错误时 做的某些事情
        return Promise.reject(error)
    }
);

// 添加响应拦截器
enterpriseRequest.interceptors.response.use(
    function (response) {
        // 对响应的数据 做了某些事情
        // 这时的 .then 还没触发
        return response.data; //把.data去掉 .then中不用.data
    },
    function (error) {
        // 响应出错时 做某些事
        return Promise.reject(error)
    }
)

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

// 查询数据
export function enterpriseEdit(data) {
    return enterpriseRequest({
        url: "/enterprise/edit",
        method: "post",
        data
    })
}

// 修改数据
export function enterpriseStatus(data) {
    return enterpriseRequest({
        url: "/enterprise/status",
        method: "post",
        data
    })
}