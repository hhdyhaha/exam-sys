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
    ></common-table>
  </div>
</template>

<script>
const axios = require("axios").default;
import CommonTable from "../../components/CommonTable.vue";
export default {
  name: "usermanage",
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
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get("https://api.virapi.com/vir_gitee4agf83h3314f6/index/login", {
          params: {
            _token:
              "$2a$10$TRc2n8KZ0udRXkwSvwRYeeChMdf9g95ANrIETrfwZRxfrgUXkAofO",
          },
        })
        // 箭头函数解决vue axios 数据（data）赋值问题
        .then((response) => {
          let res = response.data.data
          console.log(res);
           // this.tableData = response.data.data.tableData;
          this.tableData = res.userInfoList;
          // console.log(this.tableData);
          this.tableLabel = res.userLabel;
          this.currentPage = Number(res.currentPage);
          this.total = Number(res.total);
          this.pageSize = Number(res.pageSize);
          // this.lastLabel = this.tableLabel.pop();
        });
    },
  },
};
</script>

<style>
</style>