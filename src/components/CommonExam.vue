<template>
  <div class="CommonExam">
    <!-- 头 -->
    <el-row>
      <el-col :span="24">

        <el-card shadow="always">
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
      <el-col :span="8">
        <div class="l-main">
          <!-- 卡片 -->
          <el-card
            class="box-card"
            shadow="always"
          >
            <!-- 单选题 -->
            <p class="card-title">单选题</p>
            <div class="tags">
              <el-tag type="info">1</el-tag>
              <el-tag type="success">2</el-tag>
              <el-tag type="info">3</el-tag>
              <el-tag type="info">4</el-tag>
              <el-tag type="info">5</el-tag>
            </div>

            <!-- 多选题 -->
            <p class="card-title">多选题</p>
            <div class="tags">
              <el-tag type="info">6</el-tag>
              <el-tag type="success">7</el-tag>
            </div>

            <!-- 判断题 -->
            <p class="card-title">判断题</p>
            <div class="tags">
              <el-tag type="info">8</el-tag>
              <el-tag type="success">9</el-tag>
            </div>
          </el-card>

        </div>
      </el-col>
      <el-col :span="16">
        <div class="r-main">
          <!-- 卡片 -->
          <el-card
            class="box-card"
            shadow="always"
          >
            <p>题目</p>
          </el-card>
        </div>
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
.l-main {
  padding: 20px 20px 20px 0px;
}
.r-main {
  padding: 20px 0px 20px 0px;
}
.card-title {
  background: #eee;
  line-height: 35px;
  text-align: center;
  font-size: 14px;
}

.tags {
  padding: 0px 20px 20px 0px;
  padding-bottom: 0px;
  // cursor 属性规定要显示的光标的类型（形状）。
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>