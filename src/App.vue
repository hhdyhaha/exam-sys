<template>
  <el-container>
    <!-- 侧边 -->
    <!-- width="auto" 可使侧边栏打开关闭不受到宽度限制 -->
    <el-aside width="auto">
      <common-aside/>
    </el-aside>
    <el-container>
      <!-- 头 -->
      <el-header>
        <common-header/>
      </el-header>
      <!-- 主体 -->
      <el-main>
        <common-main/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonHeader from "./components/CommonHeader.vue";
import CommonAside from "./components/CommonAside.vue";
import CommonMain from "./components/CommonMain.vue";
export default {
  name: "App",
  components: {
    CommonHeader,
    CommonAside,
    CommonMain,
  },
};
</script>

<style>
</style>
