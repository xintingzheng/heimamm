//导包
import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index/index.vue'
import login from '../views/login/login.vue'
// 注册
Vue.use(VueRouter);

// 实例化
const router = new VueRouter({
    routers: [
        {
            path: "/index",
            component: index
        },
        {
            path: "/login",
            component: login
        },
    ]
});

export default router