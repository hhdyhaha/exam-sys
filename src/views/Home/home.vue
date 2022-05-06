<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div
          class="textInfo"
          v-for="infoList in textInfoList"
          :key="infoList.id"
        >
          <el-card class="box-card">
            <div
              slot="header"
              class="clearfix"
            >
              <!-- 考试时间 -->
              <p class="info">{{infoList.testtime}}</p>
              <!-- 考试类型 -->
              <p class="info">{{infoList.name}}</p>
            </div>
            <el-col class="info" :span="12">
                <p>考试级别</p>
              </el-col>
              <el-col class="info" :span="12">
                <p>理论综合</p>
              </el-col>

            <div
              v-for="(value,key) in infoList.exam"
              :key="key"
            >
              <el-col class="info" :span="12">
                <p>{{key}}</p>
              </el-col>
              <el-col class="info" :span="12">
                <p>{{value}}</p>
              </el-col>

            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
// axios.<method> 能够提供自动完成和参数类型推断功能
const axios = require("axios").default;
export default {
  name: "home",
  data() {
    return {
      textInfoLabel: "",
      textInfoList: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get("https://api.virapi.com/vir_gitee4agf83h3314f6/index/textInfo", {
          params: {
            _token:
              "$2a$10$TRc2n8KZ0udRXkwSvwRYeeChMdf9g95ANrIETrfwZRxfrgUXkAofO",
          },
        })
        // 箭头函数解决vue axios 数据（data）赋值问题
        .then((response) => {
          // console.log(response);
          let res = response.data.data;
          this.textInfoLabel = res.textInfoLabel;
          this.textInfoList = res.textInfoList;
          console.log(this.textInfoLabel);
          console.log(this.textInfoList);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.info{
  text-align: center;
}
.el-card{
  margin-top: 20px;
}
</style>