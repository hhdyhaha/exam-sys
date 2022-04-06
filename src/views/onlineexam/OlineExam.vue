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
          "https://api.virapi.com/vir_gitee4agf83h3314f6/index/online/OlineExam",{
            params:{
              _token:'$2a$10$TRc2n8KZ0udRXkwSvwRYeeChMdf9g95ANrIETrfwZRxfrgUXkAofO'
            }
          }
        )
        // 箭头函数解决vue axios 数据（data）赋值问题
        .then((response) => {
          const tableData = response.data.data.tableData
          const tableLabel = response.data.data.tableLabel
          const currentPage = response.data.data.currentPage
          const total = response.data.data.total
          const pageSize = response.data.data.pageSize
          // console.log(response.data.data.tableData);
          this.$store.commit('table/giveTableData',tableData)
          this.$store.commit('table/giveTableLabel',tableLabel)
          this.$store.commit('table/giveCurrentPage',currentPage)
          this.$store.commit('table/giveTotal',total)
          this.$store.commit('table/givePageSize',pageSize)
          // console.log(this.$store.state.table);
        });
    },
  },
};
</script>

<style>
</style>