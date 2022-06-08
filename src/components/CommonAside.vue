<template>
  <!-- isCollapse:是否折叠 后续由vuex统一管理状态 -->
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    default-active
    background-color="#FAF8E1"
    unique-opened=true
  >
    <!-- 侧边栏标题 -->
    <h5 style="text-align:center">等级考试</h5>
    <!-- 首页欢迎界面 -->
    <el-menu-item
      v-for="item in noChildren"
      :key="item.path"
      @click="clickMenu(item)"
      :index="item.path"
    >
      <i class="el-icon-menu"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <!-- 在线考试 -->
    <!-- index记得加否则会点击一个同时展开 -->
    <el-submenu
      v-for="item in hasChildren"
      :key="item.path"
      :index="item.label"
    >
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group
        v-for="itemc in item.children"
        :key="itemc.path"
      >
        <el-menu-item
          @click="clickMenu(itemc)"
          :index="itemc.path"
          v-if="itemc.label!=='准备考试'"
        >{{itemc.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>

</template>

<script>
import { getLoginInfo } from "../http/api/login";
export default {
  data() {
    return {
      usertitle: "",
      // isCollapse:false
      menu: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
          // permissions: "管理员",
        },
        // 在线考试
        {
          path: "/online",
          label: "在线考试",
          icon: "location",
          permissions: "管理员",
          children: [
            {
              path: "OlineExam",
              name: "OE",
              label: "在线考试",
              icon: "setting",
              url: "Other/PageOne",
              permissions: "管理员",
            },
            // {
            //   path: "MyRecords",
            //   name: "MR",
            //   label: "我的成绩",
            //   icon: "setting",
            //   url: "Other/PageTwo",
            // },
            {
              path: "PrepareExam",
              name: "PE",
              label: "准备考试",
              icon: "setting",
              url: "Other/PageTwo",
            },
          ],
        },
        // 考试管理
        {
          path: "/exam",
          label: "考试管理",
          icon: "location",
          permissions: "超级管理员",
          children: [
            {
              path: "/QuestionBank",
              name: "QB",
              label: "题库管理",
              icon: "setting",
              url: "Other/PageOne",
              permissions: "超级管理员",
            },
            // {
            //   path: "/QuestionManage",
            //   name: "QM",
            //   label: "试题管理",
            //   icon: "setting",
            //   url: "Other/PageTwo",
            // },
            // {
            //   path: "/ExamManage",
            //   name: "EM",
            //   label: "考试管理",
            //   icon: "setting",
            //   url: "Other/PageTwo",
            // },
          ],
        },
        // 系统设置
        {
          path: "/sys",
          label: "系统设置",
          icon: "location",
          permissions: "超级管理员",
          children: [
            // {
            //   path: "/SystemConfiguration",
            //   name: "SC",
            //   label: "系统配置",
            //   icon: "setting",
            //   url: "Other/PageOne",
            // },
            {
              path: "/UserManage",
              name: "UM",
              label: "用户管理",
              icon: "setting",
              url: "Other/PageTwo",
              permissions: "超级管理员",
            },
          ],
        },
      ],
    };
  },
  methods: {
    clickMenu(item) {
      this.$router.push({ name: item.name });
      // mutations中的方法名 item点击事件传过来的menu数据
      this.$store.commit("tab/selectMenu", item);
      // console.log(this.$route.meta);
    },
  },
  // 定义：要用的属性不存在，要通过已有属性计算得来。
  computed: {
    // 列表渲染-替换数组:filter()、concat() 和 slice()。它们不会变更原始数组，而总是返回一个新数组。
    // 没有子项目
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    // 有子项目
    hasChildren() {
      return this.menu.filter((item) => {
        // 如果用户是超级管理员返回所有信息,否则返回管理员信息
        return this.usertitle === "超级管理员" && item.children?item:item.permissions === this.usertitle;

      });
    },
    // 接收isCollapse状态
    // 组件中读取vuex中的数据：```$store.state.sum```
    isCollapse() {
      return this.$store.state.tab.isCollapse;
      // return true
    },
    userName() {
      return this.$store.state.tab.ruleForm;
    },
  },
  mounted() {
    getLoginInfo().then((item) => {
      let userName1 = this.userName.account;
      let userInfoList = item.data.data.userInfoList;
      for (let index = 0; index < userInfoList.length; index++) {
        const element = userInfoList[index];
        // 判断登录信息和数据库中是否一样
        if (userName1 === element.name) {
          // 将当前用户角色类型赋值给usertitle
          this.usertitle = element.usertitle;
        }
      }
    });
  },
};
</script>

<style lang="less" scoped>
// .el-menu{
//     background-color:#DC143C;
// }
// overflow 属性规定当内容溢出元素框时发生的事情。
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
  min-height: 500px;
  // overflow-x:hidden
  background-color: rgba(255, 255, 255, 0);
}
// !important最高优先权
.el-menu-item {
  min-width: 64px !important;
}
</style>