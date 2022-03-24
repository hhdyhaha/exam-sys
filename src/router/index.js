// 该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";
// 引入组件
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
            name: 'Home',
            component: home
        },
        // 在线考试
        {
            path: "/OlineExam",
            name: "OE",
            component: OlineExam,
        },
        {
            path: "/MyRecords",
            name: "MR",
            component: MyRecords,

        },

        // 考试管理

        {
            path: "/QuestionBank",
            name: "QB",
            component: QuestionBank,
        },

        {
            path: "/QuestionManage",
            name: "QM",
            component: QuestionManage,
        },

        {
            path: "/ExamManage",
            name: "EM",
            component: ExamManage,
        },


        // 系统设置


        {
            path: "/SystemConfiguration",
            name: "SC",
            component: SystemConfiguration,
        },

        {
            path: "/UserManage",
            name: "UM",
            component: UserManage,
        }


    ]
})