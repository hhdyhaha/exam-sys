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
            <el-col
              class="info"
              :span="12"
            >
              <p>考试级别</p>
            </el-col>
            <el-col
              class="info"
              :span="12"
            >
              <p>理论综合</p>
            </el-col>

            <div
              v-for="(value,key) in infoList.exam"
              :key="key"
            >
              <el-col
                class="info"
                :span="12"
              >
                <p>{{key}}</p>
              </el-col>
              <el-col
                class="info"
                :span="12"
              >
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
// export 命名使用{}
import {getTextInfo} from "@/http/api/textInfo"
// axios.<method> 能够提供自动完成和参数类型推断功能
// const axios = require("axios").default;
export default {
  // eslint-disable-next-line vue/multi-word-component-names
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
        // 箭头函数解决vue axios 数据（data）赋值问题
        getTextInfo().then((response) => {
          console.log(response);
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
.el-card {
  margin:0 0 20px 0;
  // background-color: #C9E0F2;
  background-color: #fff;
  padding: 0;
}

.info {
  text-align: center;
}
/deep/ .el-card__header{
  background-color: #C9E0F2;
  background-image: linear-gradient(-225deg,#D7FFFE 100%,#FFFEFF 0%);
}
/deep/ .el-card__body{
background-color: #fff;
}
</style>