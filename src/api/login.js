
import axios from 'axios'
// 登录模块
export function login(data) {
    return axios({
        url: process.env.VUE_APP_BASEURL + "/login",
        method: "post",
        //跨域 是否携带 cookie
        withCredentials: true,
        data
      });
}
// 注册模块
export function sendsms(data) {
    return axios({
        url: process.env.VUE_APP_BASEURL + "/sendsms",
        method: "post",
        //跨域 是否携带 cookie
        withCredentials: true,
        data
      });
}