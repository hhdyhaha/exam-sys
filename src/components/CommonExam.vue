<template>
  <div class="CommonExam">
    <!-- 头 -->
    <el-row>
      <el-col :span="24">

        <el-card shadow="always">
          <!-- <span>距离考试结束还有: 1小时</span> -->
          <!-- <span>距离考试结束还有:  {{ `${hr}: ${min}: ${sec}` }}</span> -->
          <span>距离考试结束还有:  {{ `${time}` }}</span>
          <el-button
            class="submitExam"
            type="primary"
            size="small"
            style="float:right ;margin-top:-5px"
            @click="open"
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
            下一题
          </el-button>

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import {resetRouter} from '../router';
// resetRouter() //执行方法
//防止页面后退
// history.pushState(null, null, document.URL);
// // popstate 事件，history 实体改变时触发的事件。监听 popstate 事件
// window.addEventListener('popstate', function () {
//     history.pushState(null, null, document.URL);
// });

// axios.<method> 能够提供自动完成和参数类型推断功能
const axios = require("axios").default;
export default {
  data () {
      return {
        //用户回答
        userAnswer:JSON.parse(sessionStorage.getItem('userAnswer'))||[],
        // 问题列表
        questionList:[],
        // 第几题
        num:JSON.parse(sessionStorage.getItem('num'))||0,
        //上禁用按钮
        preDisabled: true, 
        //下禁用按钮
        nextDisabled: false, 
        // 时间
        time:JSON.parse(sessionStorage.getItem('time'))||'',
        hr: 3,
        min: 30,
        sec:JSON.parse(sessionStorage.getItem('sec'))||0,
        // 答题开始时间
        now:JSON.parse(sessionStorage.getItem('now'))||0,
        // 答题结束时间
        end:'',
        // 手动交卷用时
        handleTime:'',
        // 定时器
        timer:"",
      };
    },
  mounted() {
    this.getData();
    this.begin()
    // alert('刷新或关闭')
    // this.countdown()
  },
  methods: {
    getData() {
      // 获取点击的试卷id
      // const questionList = this.$route.params.questionList
      // 从sessionstorage中获取数据
      
      let questionList = JSON.parse(sessionStorage.getItem('questionList'))||[]
      
      // console.log(JSON.parse(sessionStorage.getItem('exam_info')));
      this.questionList = questionList
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
      // console.log(val);
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
    },
    // 计时器
    begin() {
        // 点击按钮后开始计算指定长度的时间
        this.time = (Date.parse(new Date()) + ((1 * 60 * 60)) * 1000);
        // 开始执行倒计时
        this.secTime()
        this.countdown();
        // 更换按钮，根据情况选择v-if或v-show
        this.isshow1 = false;

        this.$message({
            type: 'success',
            message: '开始答题'
        });
    },
    secTime(){
      var moment = require('moment');
      const now = moment(); //当前时间
      const end = moment().add(1, 'hours');
      //秒
      const sec = end.diff(now,"seconds");
      //分钟
      const min = (sec/60);
      //小时
      const hr = (min/60);
      this.sec = JSON.parse(sessionStorage.getItem('sec'))?JSON.parse(sessionStorage.getItem('sec')):sec
      // this.sec = sec
      
      // console.log(typeof(sec));
      // const sec1 = moment.duration(sec, 'seconds');
      // console.log(typeof(sec1.minutes()));
      // 试卷创建时间
      this.now=now
    },
    countdown() {
      var moment = require('moment');
      // 将sec转化为时分秒格式
      const time = moment.utc(this.sec*1000).format('HH:mm:ss')
      this.time = time
      // console.log(this.sec);
      // 倒计时结束时的操作
      // const that = this;
      if (this.sec == 0) {
          // console.log(this.now);
          // 路由跳转
          this.$router.push({ name: 'CSE'})
          // vuex数据提交
          this.$store.commit('showexam/examSave',[this.userAnswer,this.questionList,this.now,this.handleTime])
          // 调用考试用时
          this.handleTime1()
          // 提示交卷成功
          this.$message({
                type: 'success',
                message: '交卷成功!'
                
            });
          console.log('时间已经结束，答题完毕');
          this.hr = 1;
          this.min = 0;
          this.sec = 0;
      } else {
          // 如时间未归零则继续在一秒后执行
          this.sec--;
          this.timer = setTimeout(this.countdown, 1000)
      }
    },
    // 考试用时
    handleTime1(){
      var moment = require('moment');
      const handleEndTime = moment(); //结束时间
      const handleTime = handleEndTime.diff(this.now,"seconds");
      this.handleTime = handleTime
      // console.log(this.handleTime);
    },
    open() {
        this.$confirm('即将结束答题, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then((action) => {
            // eleUI的确定结束回调函数方法
            if (action === 'confirm') {
              // 调用考试用时
              this.handleTime1()
             
              // this.hr = 0;
              // this.min = 0;
              this.sec = 0;
              // this.isshow1 = true;
              // 结束计时器
              clearTimeout(this.timer);
            }
            this.$message({
                type: 'success',
                message: '交卷成功!'
                
            });
            // 路由跳转
            // this.$router.push({ name: 'CSE'})
            this.$router.replace({ name: 'CSE'})
            // vuex数据提交
            this.$store.commit('showexam/examSave',[this.userAnswer,this.questionList,this.now,this.handleTime])
            // console.log('haha');

        }).catch(() => {
            // 点击取消后
            this.$message({
                type: 'info',
                message: '已取消交卷'
            });
            // console.log('xixi');
        });

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
      sessionStorage.setItem('num',JSON.stringify(now)||0 )
    },
    userAnswer(now,old){
      sessionStorage.setItem('userAnswer',JSON.stringify(now)||[] )
    },
    sec(now,old){
      sessionStorage.setItem('sec',JSON.stringify(now)||'' )
    },
  },

  // 导航守卫 如果离开时不是去到展示页面,就始终在考试页面
  beforeRouteLeave(to, from,next) {
    if (to.path==='/online/MyRecords/CommonShowExam') {
      // replace: true只是一个设置信息，告诉VUE本次操作后，不能通过浏览器后退按钮，返回前一个路由。
      next({replace:true})
    }else{
      next({ path: '/online/OlineExam/CommonExam'})
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