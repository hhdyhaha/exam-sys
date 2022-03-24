// 该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";
// 引入组件
import home from '../views/Home/home.vue'
// 创建并暴露一个路由器
export default new VueRouter({
    // 地址干净，美观 。 history 加引号
    mode:'history',
    // 路由配置
    routes:[
        {
            path:'/',
            name:'Home',
            component:home
        },
    ]
})