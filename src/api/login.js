
import axios from 'axios';

// 导入token的抽取
import { getToken } from '../utils/token.js'

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

// 定义一个 用户注册的 方法 并暴露出去
export function register(data) {
  return axios({
    url: process.env.VUE_APP_BASEURL + "/register",
    method: "post",
    // 跨域 是否携带 cookie
    withCredentials: true,
    data // data: data
  });
}

// 获取用户信息
export function info() {
  return axios({
    url: process.env.VUE_APP_BASEURL + "/info",
    method: "get",
    //跨域 是否携带 cookie
    withCredentials: true,
    // 请求头信息
    headers: {
      // token: window.localStorage.getItem("heimammtoken")
      // 调用抽取的 token函数获取token
      token: getToken()
    }
  });
}

// 点击退出
export function logout() {
  return axios({
    url: process.env.VUE_APP_BASEURL + "/logout",
    method: "get",
    //跨域 是否携带 cookie
    withCredentials: true,
    // 请求头信息
    headers: {
      // 调用抽取的 token函数获取token
      token: getToken()
    }
  });
}