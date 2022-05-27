<template>
  <div id="app">
    <el-container  v-if="$route.meta.keepalive" style="height: 100%; border: 1px solid #eee">
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
        <common-tag/>

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
    <router-view v-if="!$route.meta.keepalive"></router-view>
  </div>

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

<style lang="less">
html,body,#app{
  margin: 0;
  padding: 0;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
   min-width: 1000px;
  background-color: #fff;
  background: url("./assets/image/猫和老鼠.jpeg") no-repeat;

  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  
  z-index: 1;
}

#app::after{
    content: "";
    width:100%;
    height:100%;
    /* 子绝父相 */
    position: absolute;
    left:0;
    top:0;
    /* 背景继承 */
    background: inherit;
    filter: blur(2px);
    z-index: -1;
}


</style>
