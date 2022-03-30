<template>
  <!-- isCollapse:是否折叠 后续由vuex统一管理状态 -->
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    default-active
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
        >{{itemc.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>

</template>

<script>
export default {
  data() {
    return {
      // isCollapse:false
      menu: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
        },
        // 在线考试
        {
          path: "/online",
          label: "在线考试",
          icon: "location",
          children: [
            {
              path: "OlineExam",
              name: "OE",
              label: "在线考试",
              icon: "setting",
              url: "Other/PageOne",
            },
            {
              path: "/MyRecords",
              name: "MR",
              label: "我的成绩",
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
          children: [
            {
              path: "/QuestionBank",
              name: "QB",
              label: "题库管理",
              icon: "setting",
              url: "Other/PageOne",
            },
            {
              path: "/QuestionManage",
              name: "QM",
              label: "试题管理",
              icon: "setting",
              url: "Other/PageTwo",
            },
            {
              path: "/ExamManage",
              name: "EM",
              label: "考试管理",
              icon: "setting",
              url: "Other/PageTwo",
            },
          ],
        },
        // 系统设置
        {
          path: "/sys",
          label: "系统设置",
          icon: "location",
          children: [
            {
              path: "/SystemConfiguration",
              name: "SC",
              label: "系统配置",
              icon: "setting",
              url: "Other/PageOne",
            },
            {
              path: "/UserManage",
              name: "UM",
              label: "用户管理",
              icon: "setting",
              url: "Other/PageTwo",
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
      this.$store.commit("selectMenu", item);
      // console.log(this.$route.meta);
    },
  },
  // 定义：要用的属性不存在，要通过已有属性计算得来。
  computed: {
    // 列表渲染-替换数组:filter()、concat() 和 slice()。它们不会变更原始数组，而总是返回一个新数组。
    // 有子项目
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    // 没有子项目
    hasChildren() {
      return this.menu.filter((item) => item.children);
    },
    // 接收isCollapse状态
    // 组件中读取vuex中的数据：```$store.state.sum```
    isCollapse() {
      return this.$store.state.tab.isCollapse;
      // return true
    },
  },
};
</script>

<style lang="less" scoped>
// overflow 属性规定当内容溢出元素框时发生的事情。
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
  min-height: 400px;
  // overflow-x:hidden
}
// !important最高优先权
.el-menu-item {
  min-width: 64px !important;
}
</style>