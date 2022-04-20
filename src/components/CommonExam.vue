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
    <el-row id="defaultImages">
      <el-col :span="6">
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
      <el-col :span="18">
        <div class="r-main">
          <!-- 卡片 -->
          <el-card
            class="box-card"
            shadow="always"
          >
            <p>关于Python的编程环境，下列的哪个表述是正确的？</p>
            <div class="option-radio-button">
              <el-radio-group v-model="radio1" >
              <el-radio class="radio-button" label="上海">A.Python的编程环境是图形化的；</el-radio>
              <el-radio class="radio-button" label="北京">B.Python只有一种编程环境ipython；</el-radio>
              <el-radio class="radio-button" label="广州">C.Python自带的编程环境是IDLE；</el-radio>
              <el-radio class="radio-button" label="深圳">D.用windows自带的文本编辑器也可以给Python编程，并且也可以在该编辑器下运行；</el-radio>
            </el-radio-group>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
      return {
        radio1: '上海',
        radio2: '上海',
        radio3: '上海',
        radio4: '上海'
      };
    }
};
</script>

<style lang="less" >
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

.radio-button{
  width:80%;
  display: inline-block;
  padding: 9px 20px 9px 10px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  margin-bottom: 10px;
  line-height: 2;
  font-size: 14px;
  margin-right: 30px;
  white-space: nowrap;
}
// 去除radio小圆点 在全局css样式中写样式（在组件的局部样式中写似乎不起作用）
.el-radio__input{
    display: none;
}
</style>