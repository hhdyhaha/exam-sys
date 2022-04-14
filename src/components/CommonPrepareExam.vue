<template>
  <div class="main">
    <!-- alert警告 -->
    <div class="alert-mes">
      <el-alert
        title="点击'开始考试后'将自定进入考试,请诚信考试"
        type="error"
        effect="dark"
      >
      </el-alert>
    </div>
    <!-- card卡片 -->
    <div>
      <el-card class="box-card">

        <div
          slot="header"
          class="clearfix"
        >
          <span>准备考试</span>
        </div>
        <div
          v-for="o in 4"
          :key="o"
          class="text item"
        >
          {{'列表内容 ' + o }}
        </div>
      </el-card>
    </div>
    <!-- 考试按钮 -->
    <div class="exam-btn">
      <el-button
        type="primary"
        size="mini"
        @click="StartExam"
      >开始考试</el-button>
      <el-button size="mini">返回</el-button>
    </div>

  </div>

</template>

<script>
export default {
  data() {
    return {};
  },
  methods:{
    StartExam(){
      // console.log(this);
      this.$router.push({name: "CE" })
    }
  }
};
</script>

<style lang="less" scope>
.exam-btn {
  margin-top: 20px;
}
.alert-mes{
  margin-top: 0px;
  margin-bottom: 20px;
}
</style>