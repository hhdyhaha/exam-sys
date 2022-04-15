<template>
  <div class="CommonExam">
    <!-- 头 -->
    <el-row>
      <el-col :span="24">

        <el-card shadow="always">
          <!-- <div class="exam-title">
            <div class="l-header"><span>距离考试结束还有: 1小时</span></div>
            <div class="r-header">
              <el-button
                class="submitExam"
                type="primary"
                size="small"
              >交卷</el-button>
            </div>
          </div> -->

          <span>距离考试结束还有: 1小时</span>

          <el-button
            class="submitExam"
            type="primary"
            size="small"
            style="float:right ;margin-top:-5px"

          >交卷</el-button>

        </el-card>

      </el-col>
    </el-row>
    <!-- 一行两列 -->
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          嘻嘻
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">嗯嗯</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.CommonExam {
  padding: 20px;
}
.exam-title {
  display: flex;
  height: 20px;
  flex-direction: row;
  justify-content: space-between;
  .r-header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-self: center;
  }
}
</style>