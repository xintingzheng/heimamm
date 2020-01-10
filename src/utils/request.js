// 导入axios
import axios from 'axios';

// 导入token
import { getToken } from '../utils/token.js';

const request = axios.create({
    baseURL: process.env.VUE_APP_BASEURL
})

// 添加请求拦截器
request.interceptors.request.use(
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
request.interceptors.response.use(
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

// 暴露接口
export default request