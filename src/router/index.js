//导包
import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index/index.vue'
import login from '../views/login/login.vue'

// 导入嵌套路由
import chart from '../views/index/chart/chart.vue';
import user from '../views/index/user/user.vue';
import question from '../views/index/question/question.vue';
import enterprise from '../views/index/enterprise/enterprise.vue';
import subject from '../views/index/subject/subject.vue';
// 注册
Vue.use(VueRouter);

// 实例化
const router = new VueRouter({
    routes: [
        {
            path: "/login",
            component: login
        },
        {
            path: "/index",
            component: index,
            children: [
                {
                    path: 'chart',
                    component: chart,
                },
                {
                    path: 'user',
                    component: user,
                },
                {
                    path: 'question',
                    component: question,
                },
                {
                    path: 'enterprise',
                    component: enterprise,
                },
                {
                    path: 'subject',
                    component: subject,
                },
            ]
        },
    ]
});

export default router