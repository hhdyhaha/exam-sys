<template>
  <div>

    <common-table
      :tableData="tableData"
      :selectData="selectData"
      :tableLabel="tableLabel"
      :currentPage="currentPage"
      :total="total"
      :pageSize="pageSize"
      :tableData2="tableData2"
    />

  </div>
</template>

<script>
import {getTextPaperListInfo} from "@/http/api/queryTextPaperList"
import CommonTable from "../../components/CommonTable.vue";
// axios.<method> 能够提供自动完成和参数类型推断功能
const axios = require("axios").default;
export default {
  name:'questionbank',
  data() {
    return {
      tableData: ["haha"],
      selectData: false,
      tableLabel: [],
      currentPage: 1,
      total: 20,
      pageSize: 3,
      tableData2: [],
    };
  },
  components: {
    CommonTable,
  },
  name: "onlineexam",
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
        // 箭头函数解决vue axios 数据（data）赋值问题
        getTextPaperListInfo().then((response) => {
          console.log(response);
          this.tableData = response.data.data.textPaperList;
          this.tableLabel = response.data.data.tableLabel;
          this.currentPage = Number(response.data.data.currentPage);
          this.total = Number(response.data.data.total);
          this.pageSize = Number(response.data.data.pageSize);
        });
    },
  },
};
</script>

<style>
</style>