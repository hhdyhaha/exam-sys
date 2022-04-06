<template>
  <el-container>
    <!-- 侧边 -->
    <!-- width="auto" 可使侧边栏打开关闭不受到宽度限制 -->
    <el-aside width="auto">
      <common-aside />
    </el-aside>
    <el-container>
      <!-- 头 -->
      <el-header>
        <common-header />
      </el-header>

      <!-- 标签 -->
      <common-tag />

      
      <!-- 主体 -->
      <el-main>
        <!-- keep-alive 保持组件活跃状态 -->
        <keep-alive>
        <!-- 将主体的模板换成由router-view控制 -->
        <router-view></router-view>
        </keep-alive>
        

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonHeader from "./components/CommonHeader.vue";
import CommonAside from "./components/CommonAside.vue";
import CommonMain from "./components/CommonMain.vue";
import CommonTag from "./components/CommonTag.vue";
export default {
  name: "App",
  components: {
    CommonHeader,
    CommonAside,
    CommonMain,
    CommonTag,
  },
};
</script>

<style>
</style>
