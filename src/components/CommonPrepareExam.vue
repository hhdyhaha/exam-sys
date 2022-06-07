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
          <span><b>准备考试</b></span>
        </div>
        <div
          class="text_item"
        >
          <p> <b>考试名称:</b> {{exam_info.name}}</p> 
          <p> <b>考试时长:</b> {{exam_info.examtime}}分钟</p> 
          <p><b>试卷总分:</b> 100分</p>
          <p><b>及格分数:</b> 60分</p>
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
import {getQuestionTextInfo} from "@/http/api/queryQuestionText"
// axios.<method> 能够提供自动完成和参数类型推断功能
const axios = require("axios").default;
export default {
  data() {
    return {
      // 从缓存里提取数据
      exam_info:JSON.parse(sessionStorage.getItem('exam_info'))||[]
    };
  },
  methods:{
    StartExam(){
      // console.log(this);
      // 获取点击的试卷id
      const id = this.exam_info['id']+''
        // 箭头函数解决vue axios 数据（data）赋值问题 试卷有题携带数据跳转,没有题,提示没有题目
        getQuestionTextInfo(id).then((response) => {
          const questionList = response.data.data.questionList
          // 将数据缓存在session中
          sessionStorage.setItem('exam_info',JSON.stringify(this.exam_info) )
          sessionStorage.setItem('questionList',JSON.stringify(questionList) )
          this.$router.push({name: "CE",params:{exam_info:this.exam_info,questionList:questionList} })
          // this.$router.replace({name: "CE",params:{exam_info:this.exam_info,questionList:questionList} })
        })
        .catch((e) => {
          // console.log(e)
          this.$message({
            // type: 'success',
            message: '没有考试题目'
          });
        });

      
    }
  },
  // computed:{
  //   exam_info(){
  //     return this.$route.params.exam
  //   }
  // }
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
.el-card__header {

  background-color: #C9E0F2;
}
.el-card__body{
background-color: #C9E0F2;
}
</style>