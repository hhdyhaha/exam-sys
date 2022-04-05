<template>
  <div>
   
    <common-table/>

    
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
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get(
          "https://www.fastmock.site/mock/a809009dfa7a985020b61723d2bb36a1/index/online/OlineExam"
        )
        // 箭头函数解决vue axios 数据（data）赋值问题
        .then((tableData) => {
          this.$store.commit('table/giveTableData',tableData.data.tableData)
          this.$store.commit('table/giveTableLabel',tableData.data.tableLabel)
          this.$store.commit('table/giveCurrentPage',tableData.data.currentPage)
          this.$store.commit('table/giveTotal',tableData.data.total)
          this.$store.commit('table/givePageSize',tableData.data.pageSize)
          // console.log(this.$store.state.table);
        });
    },
  },
};
</script>

<style>
</style>