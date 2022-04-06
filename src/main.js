import Vue from 'vue'
import App from './App.vue'
// 引入VueRouter
import VueRouter from 'vue-router';
// 引入路由器
import router from './router'
// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入less
import less from 'less'
//引入store
import store from './store'
Vue.config.productionTip = false
// 使用ElementUI
Vue.use(ElementUI);
//解决重复点击路由会报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// 使用VueRouter
Vue.use(VueRouter)
Vue.use(less)
new Vue({
  render: h => h(App),
  router:router,
  store
}).$mount('#app')

