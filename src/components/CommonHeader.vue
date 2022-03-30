<template>
  <div class="header">
    <!-- 头左边 -->
    <div class="l-header">
      <!-- 左边头的按钮 图标 大小 绑定点击事件 -->
      <el-button
        plain
        icon="el-icon-s-operation"
        size="mini"
        @click="headleMenu"
      ></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="currentItem in current" :key="currentItem.path">{{currentItem.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 头右边 -->
    <div class="r-header">
      <!-- 触发下拉行为 尺寸大小  -->
      <el-dropdown
        trigger="click"
        size="mini"
      >
        <span class="el-dropdown-link">
          <i class="el-icon-s-custom"></i> 角色名称
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </div>

</template>

<script>
import { mapState } from "vuex";
export default {
  methods: {
    name: "ConmonHeader",
    // 操作vuex,改变isCollapse状态
    // 组件中修改vuex中的数据：```$store.dispatch('action中的方法名',数据)``` 或 ```$store.commit('mutations中的方法名',数据)```
    headleMenu() {
      this.$store.commit("collapseMenu");
    },
  },

  computed: {
    // ...mapState({
    //   current: (state) => state.tab.currentMenu,
    // }),
    current() {
      return this.$route.matched;
    },
  },
  // 查看this.$route.matched的数据
  mounted() {
    // console.log(this.$route.matched );
  },
};
</script>

<style lang="less" scoped>
// 如果想让一个元素的百分比css高度height: 100%;起作用，你需要给这个元素的所有父元素的高度设定一个有效值。
// 父元素
.header {
  display: flex;
  height: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.l-header {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
</style>>