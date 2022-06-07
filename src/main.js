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
// 引入animate动画
import animated from 'animate.css' 
// 引入Mock数据
import '@/mock/mockServe'
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
// 使用animate动画
Vue.use(animated)

// 导航守卫
router.beforeEach((to, from, next) => {
  // 路由中设置的needLogin字段就在to当中
  if (window.sessionStorage.data) {
    // console.log(window.sessionStorage);

    if (to.path === '/') {
      next({ path: '/index' })
    }else{
      next()
    }
  } else {
    // 没有session,访问任何页面都会跳转到登录页面
    if(to.path==='/' || to.path==='/CommonRegister'){
      next()
    }else{
      next({path:'/'})
    }
  }
})

new Vue({
  render: h => h(App),
  router: router,
  store
}).$mount('#app')
