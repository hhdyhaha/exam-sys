<template>
  <div>
    <h2 class="text-center" style="text-align:center;">{{exam_info.name}}</h2>
    <p style="text-align:center;">试卷创建时间:&nbsp;{{nowtime}}</p>
    <el-row
    id="defaultImages"
      :gutter="24"
    >
      <el-col
        :span="8"
        class="text-center"
      > 
        考生姓名:&nbsp;{{ruleForm.account}}
      </el-col>
      <el-col
        :span="8"
        class="text-center"
      >
        考试用时:&nbsp;{{handleTime}}
      </el-col>
      <el-col
        :span="8"
        class="text-center"
      >
        考试得分:&nbsp;{{score}}分
      </el-col>
    </el-row>

    <el-card style="margin-top:20px">
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
              <!-- <el-button @click="haha">haha</el-button> -->
            </div>
    </el-card>
  </div>
</template>

<script>
// history.pushState(null, null, document.URL);
import { mapState } from "vuex";
export default {
  computed: {
    exam_info(){
      return JSON.parse(sessionStorage.getItem('exam_info'))||[]
    },
    ...mapState({
      userAnswer: (state) => state.showexam.userAnswer,
      questionList: (state) => state.showexam.questionList,
      // 创建时间
      nowtime: (state) => state.showexam.nowtime,
      // 考试用时
      handleTime: (state) => state.showexam.handleTime,
      score:(state) => state.showexam.score,
      // 用户账号信息
      ruleForm: (state) => state.tab.ruleForm,
    }),
  },
  methods:{
    haha(){
      this.$router.push({ name: 'CE'})
    }
  },
  mounted() {
    // 展示信息后清除sessionstorage
    // sessionStorage.removeItem("exam_info");
    sessionStorage.removeItem("sec");
    sessionStorage.removeItem("questionList");
    sessionStorage.removeItem("userAnswer");
    sessionStorage.removeItem("num");
  },
  // 导航守卫 如果离开时不是去到展示页面,就始终在考试页面  
  // beforeRouteLeave(to,from,next){
  //   if (to.path==='/online/OlineExam/CommonExam') {
  //     // next()
  //     next({ path: '/online/OlineExam/PrepareExam',replace:true})
      
  //   }else{
  //     console.log('sdfasdf');
  //     next({replace:true})
  //   }
  // }
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
.el-row{
  width: 100%;
  height: 18px;
  margin-top:50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .el-col{
    text-align: center;
  }
  
}

</style>