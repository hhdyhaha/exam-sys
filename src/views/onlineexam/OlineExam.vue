<template>
  <div>
    <common-table  :tableData="tableData" />
  </div>
</template>

<script>
import CommonTable from "../../components/CommonTable.vue";
// axios.<method> 能够提供自动完成和参数类型推断功能
const axios = require("axios").default;
export default {
  components: {
    CommonTable,
  },
  name: "onlineexam",
  data() {
    return {
      tableData:''
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get("https://www.fastmock.site/mock/a809009dfa7a985020b61723d2bb36a1/index/online/OlineExam")
        // 箭头函数解决vue axios 数据（data）赋值问题
        .then((tableData)=>{
          this.tableData = tableData.data.tableData
          console.log(this.tableData);
        })
    },
  },
};
</script>

<style>
</style>