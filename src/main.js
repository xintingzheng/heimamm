import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 初始化css
import './style/base.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

// 导入全局时间处理样式
import './filters/index.js'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')