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
    <!-- 左侧 题目序号 -->
    <el-row id="defaultImages">
      <el-col :span="6">
        <div class="l-main">
          <!-- 卡片 -->
          <el-card
            class="box-card"
            shadow="always"
          >
            <!-- 是否作答 -->
            <p class="card-title">答题卡</p>
            <el-row :gutter="24" class="card-line" style="padding-left: 10px;">
              <el-tag type="info">未作答</el-tag>
              <el-tag type="success">已作答</el-tag>
            </el-row>
            <!-- 单选题 -->
            <p class="card-title">单选题</p>
            <div class="tags" style="">
            <el-tag class="tag" :type="tagClass(question.id-2265)" v-for="question in questionList" :key="question.id" effect="dark" @click="handleTag(question.id-2264)">{{question.id-2264}}</el-tag>
            </div>

            <!-- 多选题 -->
            <!-- <p class="card-title">多选题</p>
            <div class="tags">
              <el-tag type="info">6</el-tag>
              <el-tag type="success">7</el-tag>
            </div> -->

            <!-- 判断题 -->
            <p class="card-title">判断题</p>
            <div class="tags">
              <el-tag type="info">8</el-tag>
              <el-tag type="success">9</el-tag>
            </div>
          </el-card>

        </div>
      </el-col>
      <!-- 题目 -->
      <el-col :span="18">
        <div class="r-main">
          <!-- 卡片 -->
          <el-card
            class="box-card"
            shadow="always"
          >
            <!-- 将题目数组里面的对象循环出来 -->
            <div class="option-radio-button" v-for="question in questionList" :key="question.id">
              <!-- 单选题 题目 判断之后显示-->
              <p v-if="question.id-2265===num && question.type==='1'">{{question.id-2264}}.{{questionList[num].title}}</p>
              <!-- 选项 -->
              <div v-if="question.id-2265===num && question.type==='1'"> <!--判断是第几题的选项-->
                <el-radio-group class="radio-button1" v-model="userAnswer[num]" v-for="(option,index) in question.optionList" :key="index" @change="userSelect">
                  <el-radio  :label="option.id">{{option.id}}. {{option.content}}</el-radio>
                </el-radio-group>
              </div>
              <!-- 判断题 -->
              <div v-else-if="question.id-2265===num && question.type==='3'">
                {{question.id-2264}}.{{questionList[num].title}}<br>
                <el-radio-group  v-model="userAnswer[num]"  @change="userSelect">
                  <el-radio class="radio-button1"  :label="true" style="margin-top:20px;width:30%;text-align:center">正确</el-radio>
                  <el-radio class="radio-button1"  :label="false" style="width:30%;text-align:center">错误</el-radio>
                </el-radio-group>
              </div>
              
            </div>
          </el-card>
        </div>
        <div style="margin-top: 20px">
          <el-button  type="primary" icon="el-icon-back" @click="handPrevious()" :disabled="preDisabled">
            上一题
          </el-button>

          <el-button  type="warning" icon="el-icon-right" @click="handNext()" :disabled="nextDisabled">
            下一题{{num}}
          </el-button>

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// axios.<method> 能够提供自动完成和参数类型推断功能
const axios = require("axios").default;
export default {
  data () {
      return {
        // // 题目编号
        // id:'',
        // // 题目
        // title:'',
        // //答案数组
        // optionList:[],
        // //正确答案
        // answer:'',
        // // 是否展示答案
        // showAnswer:false,
        // // 是否是图片
        // optionImgFlag:false,
        //用户回答
        userAnswer:[],
        // //题型 1 单选 3 判断
        // type:'1',
        // 问题列表
        questionList:[],
        // 第几题
        num:0,
        //上禁用按钮
        preDisabled: true, 
        //下禁用按钮
        nextDisabled: false, 
      };
    },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .post(
          "https://api.virapi.com/vir_gitee4agf83h3314f6/index/queryQuestionText?_token=$2a$10$TRc2n8KZ0udRXkwSvwRYeeChMdf9g95ANrIETrfwZRxfrgUXkAofO",
          {
            id:"119"   
          },
        )
        // 箭头函数解决vue axios 数据（data）赋值问题
        .then((response) => {
          const questionList = response.data.data.questionList
          // console.log(questionList);
          this.questionList = questionList
        })
        .catch((e) => {
          console.log(e)
        });
    },
    // 上一题
    handPrevious(){
      if (this.num === 0) {
        this.num = 0;
      } else {
        this.num -= 1;
      }
    },
    // 下一题
    handNext(){
      this.preDisabled = false;
      if(this.num<this.questionList.length-1){
        this.num+=1
      }
    },
    // 用户选择 传的是label的值
    userSelect(val){
      console.log(val);
      // 将数据类型改为数组,可以直接使用索引存入
      // this.userAnswer.push(val)
      // console.log(this.userAnswer);
      // 点击完选项之后自动跳到下一题
      this.num+=1
    },
    // tag颜色
    tagClass(id){
      // console.log(this.userAnswer);
      for (const key in this.userAnswer) {
        if (id===Number(key)) {
          // console.log(id);
          // console.log(key);
          return 'success'
          
        }
      }

      if(id===this.num){
        return ''
      }else{
        return 'info'
      }

    },
    // 如果id盒num不一致,则切换为一致的
    handleTag(id){
      if(id!==this.num+1){
        this.num=id-1
      }
    }
  },
  // 监视按钮
  watch: {
    //第一题和最后一题禁用按钮
    num(now, old) {
      // console.log(now);
      if (now == this.questionList.length - 1) {
        this.nextDisabled = true;
      } else {
        this.nextDisabled = false;
      }
      if (now < 1) {
        this.preDisabled = true;
      }else{
        this.preDisabled = false;
      }
    }
  }

};
</script>

<style lang="less" scope>
.CommonExam {
  padding: 20px;
}
.l-main {
  padding: 20px 20px 20px 0px;
  .card-line{
    display: flex;
    justify-content: space-between;
  }
}
.r-main {
  padding: 20px 0px 0px 0px;
}
.card-title {
  background: #eee;
  line-height: 35px;
  text-align: center;
  font-size: 14px;
}

.tags {
  display: flex;
  justify-content: flex-start;
  // align-items: center;
  flex-wrap: wrap;
  padding: 0px 20px 20px 20px;
  padding-bottom: 0px;
  // cursor 属性规定要显示的光标的类型（形状）。
  .tag {
    width:28px;
    height:28px;
    margin-right:15px;
    cursor: pointer;
    margin-top:20px;
    text-align:center;
    font-size:12px;
    padding: 0px;
    margin-top:10px;
  }
}

.radio-button1{
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
// #defaultImages{
//   display: flex;
//   flex-wrap: wrap;
// }
// 去除radio小圆点 在全局css样式中写样式（在组件的局部样式中写似乎不起作用）
#defaultImages .el-radio__input{
    display: none;
}
// 修改边框label高度
.el-radio__label{
    line-height: 30px;
  }


</style>