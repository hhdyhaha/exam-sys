<template>
<!-- isCollapse:是否折叠 后续由vuex统一管理状态 -->
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <!-- 侧边栏标题 -->
    <h5 style="text-align:center">等级考试</h5>
    <!-- 首页欢迎界面 -->
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">首页欢迎界面</span>
    </el-menu-item>
    <!-- 在线考试 -->
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>在线考试</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1">在线考试</el-menu-item>
        <el-menu-item index="1-2">我的成绩</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <!-- 考试管理 -->
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>考试管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1">题库管理</el-menu-item>
        <el-menu-item index="2-2">试题管理</el-menu-item>
        <el-menu-item index="2-3">考试管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <!-- 系统设置 -->
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>系统设置</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1">系统配置</el-menu-item>
        <el-menu-item index="3-2">用户管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>

</template>

<script>
export default {
    data() {
        return {
            isCollapse: true
        }
    },
};
</script>

<style>
</style>