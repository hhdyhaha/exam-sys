<template>
  <div>
    <!-- 三级路由视图 -->
    <div v-if="this.$route.name==='CSE'">
      <!-- <common-show-exam/> -->
      <router-view></router-view>
    </div>
    <!-- 二级路由数据 -->
    <div v-else>
      我的成绩
    </div>
  </div>
</template>

<script>
  import CommonShowExam from "../../components/CommonShowExam.vue";
  export default {
    name: "myrecords",
    data() {
      return {};
    },
    components: {
      CommonShowExam,
    },
  };
</script>

<style>
</style>