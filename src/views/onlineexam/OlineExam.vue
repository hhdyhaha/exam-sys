<template>
  <div>
    <!-- 三级路由视图 -->
    <div v-if="this.$route.name==='PE' || this.$route.name==='CE'">
      <router-view></router-view>
    </div>
    <!-- 二级路由数据 -->
    <div v-else>
      <common-table
        :tableData="tableData"
        :selectData="selectData"
        :tableLabel="tableLabel"
        :currentPage="currentPage"
        :total="total"
        :pageSize="pageSize"
        :tableData2="tableData2"
      >
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="primary"
              size="small"
            >去考试</el-button>
          </template>
        </el-table-column>
      </common-table>
    </div>

  </div>
</template>



<script>
import CommonTable from "../../components/CommonTable.vue";
// axios.<method> 能够提供自动完成和参数类型推断功能
const axios = require("axios").default;
export default {
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
      axios
        .get(
          // "https://api.virapi.com/vir_gitee4agf83h3314f6/index/online/OlineExam",
          "https://api.virapi.com/vir_gitee4agf83h3314f6/index/queryTextPaperList",
          {
            params: {
              _token:
                "$2a$10$TRc2n8KZ0udRXkwSvwRYeeChMdf9g95ANrIETrfwZRxfrgUXkAofO",
            },
          }
        )
        // 箭头函数解决vue axios 数据（data）赋值问题
        .then((response) => {          
          // this.tableData = response.data.data.tableData;
          this.tableData = response.data.data.textPaperList;
          // console.log(this.tableData);
          this.tableLabel = response.data.data.tableLabel;
          this.currentPage = Number(response.data.data.currentPage);
          this.total = Number(response.data.data.total);
          this.pageSize = Number(response.data.data.pageSize);
          // this.lastLabel = this.tableLabel.pop();
        });
    },
    handleClick(row) {
      // console.log(this.$route);
      // console.log(row.id);
      this.$router.push({ name: "PE",params:{exam:row }});
    },
  },

};
</script>

<style>
</style>