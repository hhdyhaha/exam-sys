// 该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";
// 引入组件
// 上面代码是一个模块文件export-default.js，它的默认输出是一个函数。
// 其他模块加载该模块时，import命令可以为该匿名函数指定任意名字。
import main from '../components/CommonMain.vue'
import home from '../views/Home/home.vue'

import MyRecords from '../views/onlineexam/MyRecords'
import OlineExam from '../views/onlineexam/OlineExam'

import QuestionBank from '../views/exammanage/QuestionBank'
import QuestionManage from '../views/exammanage/QuestionManage'
import ExamManage from '../views/exammanage/ExamManage'

import SystemConfiguration from '../views/syssetup/SystemConfiguration'
import UserManage from '../views/syssetup/UserManage'
import PrepareExam from '../components/CommonPrepareExam.vue'
import CommonExam from '../components/CommonExam.vue'
import CommonShowExam from '../components/CommonShowExam.vue'
import CommonLogin from '../components/CommonLogin.vue'





// 创建并暴露一个路由器
export default new VueRouter({
    // 地址干净，美观 。 history 加引号
    mode: 'history',
    // 路由配置
    routes: [
        {
            path: '/index',
            name: 'home',
            component: home,
            meta: { title: '首页' ,keepalive:true,needLogin: true}
        },
        {
            path:"/",
            name:"Lg",
            component:CommonLogin,
            meta:{title:'注册登录',keepalive:false,needLogin: false}
        },
        // 在线考试
        {
            path: '/online',
            name: 'ol',
            component:main,
            meta: { title: '在线考试',keepalive:true,needLogin: true },
            children: [
                {
                    path: "OlineExam",
                    name: "OE",
                    
                    component: OlineExam,
                    meta: { title: '在线考试' ,keepalive:true,needLogin: true},
                    children:[{
                        path:"PrepareExam",
                        name:"PE",
                        component:PrepareExam,
                        meta:{title:'准备考试',keepalive:true,needLogin: true}
                        // meta:{keepalive:true,needLogin: true}
                    },
                    {
                        path:"CommonExam",
                        name:"CE",
                        component:CommonExam,
                        meta:{title:'开始考试',keepalive:false,needLogin: true,allowBack: false}
                    }
                ]
                },
                // {
                //     path:"PrepareExam",
                //     name:"PE",
                //     component:PrepareExam,
                //     meta:{title:'准备考试'}
                // },
                {
                    path: "MyRecords",
                    name: "MR",
                    component: MyRecords,
                    meta: { title: '我的成绩',keepalive:true,needLogin: true },
                    children:[
                        {
                            path:"CommonShowExam",
                            name:"CSE",
                            component:CommonShowExam,
                            meta:{title:'考试结果',keepalive:true,needLogin: true}
                        }
                    ]

                },
            ]
        },


        // 考试管理
        {
            path: '/exam',
            name: 'ex',
            component:main,
            meta: { title: '考试管理',needLogin: true },
            children: [
                {
                    path: "QuestionBank",
                    name: "QB",
                    component: QuestionBank,
                    meta: { title: '题库' ,keepalive:true,needLogin: true}
                },

                {
                    path: "QuestionManage",
                    name: "QM",
                    component: QuestionManage,
                    meta: { title: '试题管理',keepalive:true,needLogin: true }
                    // meta: {keepalive:true,needLogin: true }
                },

                {
                    path: "ExamManage",
                    name: "EM",
                    component: ExamManage,
                    meta: { title: '考试管理',keepalive:true,needLogin: true }
                    // meta: { keepalive:true,needLogin: true }
                },
            ]
        },



        // 系统设置
        {
            path: '/sys',
            name: 'sys',
            component:main,
            meta: { title: '系统设置' ,keepalive:true,needLogin: true},
            children: [
                {
                    path: "SystemConfiguration",
                    name: "SC",
                    component: SystemConfiguration,
                    meta: { title: '系统配置',keepalive:true,needLogin: true }
                },

                {
                    path: "UserManage",
                    name: "UM",
                    component: UserManage,
                    meta: { title: '用户管理',keepalive:true,needLogin: true }
                }
            ]
        },




    ]
})