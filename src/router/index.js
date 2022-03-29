// 该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";
// 引入组件
// 上面代码是一个模块文件export-default.js，它的默认输出是一个函数。
// 其他模块加载该模块时，import命令可以为该匿名函数指定任意名字。
import home from '../views/Home/home.vue'

import MyRecords from '../views/onlineexam/MyRecords'
import OlineExam from '../views/onlineexam/OlineExam'

import QuestionBank from '../views/exammanage/QuestionBank'
import QuestionManage from '../views/exammanage/QuestionManage'
import ExamManage from '../views/exammanage/ExamManage'

import SystemConfiguration from '../views/syssetup/SystemConfiguration'
import UserManage from '../views/syssetup/UserManage'





// 创建并暴露一个路由器
export default new VueRouter({
    // 地址干净，美观 。 history 加引号
    mode: 'history',
    // 路由配置
    routes: [
        {
            path: '/',
            name: 'home',
            component: home,
            meta: { title: '首页' }
        },
        // 在线考试
        {
            path: '/online',
            name: 'ol',
            meta: { title: '在线考试' },
            children: [
                {
                    path: "OlineExam",
                    name: "OE",
                    component: OlineExam,
                    meta: { title: '在线考试' }
                },
                {
                    path: "MyRecords",
                    name: "MR",
                    component: MyRecords,
                    meta: { title: '我的成绩' }

                },
            ]
        },


        // 考试管理
        {
            path: '/exam',
            name: 'ex',
            meta: { title: '考试管理' },
            children: [
                {
                    path: "QuestionBank",
                    name: "QB",
                    component: QuestionBank,
                    meta: { title: '题库' }
                },

                {
                    path: "QuestionManage",
                    name: "QM",
                    component: QuestionManage,
                    meta: { title: '试题管理' }
                },

                {
                    path: "ExamManage",
                    name: "EM",
                    component: ExamManage,
                    meta: { title: '考试管理' }
                },
            ]
        },



        // 系统设置
        {
            path: '/sys',
            name: 'sys',
            meta: { title: '系统设置' },
            children: [
                {
                    path: "SystemConfiguration",
                    name: "SC",
                    component: SystemConfiguration,
                    meta: { title: '系统配置' }
                },

                {
                    path: "UserManage",
                    name: "UM",
                    component: UserManage,
                    meta: { title: '用户管理' }
                }
            ]
        },




    ]
})