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
    >
      <el-table-column
        fixed="right"
        label="操作"
        width="150px"
        align="center"
      >
        <template v-slot:default="slotProps">
          <!-- <div class="operate-btn" v-for="(slotProp,index) in slotProps" :key="index"> -->
          <div class="operate-btn">
            <el-button
              @click="deleteClick(slotProps.row)"
              type="danger"
              size="mini"
            >删除</el-button>
            <el-button
              @click="editClick(slotProps.row)"
              type="primary"
              size="mini"
            >编辑</el-button>
          </div>
        </template>
      </el-table-column>

    </common-table>
  </div>
</template>

<script>
const axios = require("axios").default;
import CommonTable from "../../components/CommonTable.vue";
import { getLoginInfo, deleteLoginInfo } from "@/http/api/login";
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
      // 箭头函数解决vue axios 数据（data）赋值问题
      getLoginInfo().then((response) => {
        let res = response.data.data;
        // console.log(res);
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
    // 点击删除按钮
    deleteClick(row) {
      // console.log(row);
      deleteLoginInfo(row).then((item) => {
        // console.log(item.data.data.userInfoList);
        // console.log(item.data.data.userInfoList);
        this.tableData = item.data.data.userInfoList;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.operate-btn {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>>