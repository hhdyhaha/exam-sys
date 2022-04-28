<template>
  <div>
    <h2 class="text-center">演示考试</h2>
    <el-row
    id="defaultImages"
      :gutter="24"
      style="margin-top: 50px"
    >
      <el-col
        :span="8"
        class="text-center"
      >
        考生姓名：haha
      </el-col>
      <el-col
        :span="8"
        class="text-center"
      >
        考试用时：1分钟
      </el-col>
      <el-col
        :span="8"
        class="text-center"
      >
        考试得分：15
      </el-col>
    </el-row>

    <el-card>
      <!-- 将题目数组里面的对象循环出来 -->
            <div class="option-radio-button" v-for="question in questionList" :key="question.id">
              <!-- 单选题 题目 判断之后显示-->
              <p v-if="question.type==='1'">{{question.id-2264}}.{{question.title}}</p>
              <!-- 选项 -->
              <div v-if="question.type==='1'"> <!--判断是第几题的选项-->
                <el-radio-group class="radio-button" v-model="userAnswer[question.id-2265]"  v-for="(option,index) in question.optionList" :key="index">
                  <el-radio  :label="option.id">{{option.id}}. {{option.content}}</el-radio>
                </el-radio-group>
                <p style="color:red;margin-top:0px;padding-left:10px">正确答案:&nbsp;&nbsp;{{question.answer}}</p>

              </div>
              <!-- 判断题 -->
              <div v-else-if="question.type==='3'">
                {{question.id-2264}}.{{question.title}}<br>
                <el-radio-group v-model="userAnswer[question.id-2265]">
                  <el-radio class="radio-button"  :label="true" style="margin-top:20px;width:30%;text-align:center">正确</el-radio>
                  <el-radio class="radio-button"  :label="false" style="width:30%;text-align:center">错误</el-radio>
                </el-radio-group>
                <p style="color:red;margin-top:0px;padding-left:10px">正确答案:&nbsp;&nbsp;{{question.answer}}</p>
              </div>
              
            </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      userAnswer: (state) => state.showexam.userAnswer,
      questionList: (state) => state.showexam.questionList,
      nowtime: (state) => state.showexam.nowtime,
    }),
  },
};
</script>

<style lang="less" scoped>
.radio-button{
  width:80%;
  display: inline-block;
  padding: 9px 20px 9px 10px;
  margin-bottom: 10px;
  line-height: 2;
  font-size: 14px;
  margin-right: 30px;
  white-space: nowrap;
}
// 去除radio小圆点 在全局css样式中写样式（在组件的局部样式中写似乎不起作用）

</style>