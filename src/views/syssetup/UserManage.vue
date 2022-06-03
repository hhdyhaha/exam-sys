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
      <!-- 删除编辑操作 插槽传递数据 -->
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
      <!-- 添加人员 -->
      <template v-slot:addData>

        <el-button
          type="primary"
          @click="dialogFormVisible = true"
        >添加</el-button>
        <el-dialog
          title="添加人员"
          :visible.sync="dialogFormVisible"
          :append-to-body="true"
          width="30%"
        >
          <!-- 表单 -->
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
          >
            <el-form-item
              label="角色类型"
              :label-width="formLabelWidth"
            >
              <el-select
                placeholder="请选择角色类型"
                v-model="ruleForm.usertitle"
              >
                <el-option
                  label="管理员"
                  value="管理员"
                ></el-option>
                <el-option
                  label="超级管理员"
                  value="超级管理员"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 输入账号 -->
            <!-- Form-Item 的 prop 属性设置为需校验的字段名  prop 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 -->
            <el-form-item
              label="账号"
              prop="name"
              :label-width="formLabelWidth"
            >
              <!-- value / v-model	绑定值 -->
              <el-input
                type="text"
                v-model="ruleForm.name"
              ></el-input>
            </el-form-item>
            <!-- autocomplete 让input表单输入框不记录输入过信息 -->
            <!-- 输入密码 -->
            <el-form-item
              label="密码"
              prop="password"
              :label-width="formLabelWidth"
            >
              <el-input
                type="password"
                v-model="ruleForm.password"
                autocomplete="new-password"
              ></el-input>
            </el-form-item>
            <!-- 确认密码 -->
            <el-form-item
              label="确认密码"
              prop="checkPass"
              :label-width="formLabelWidth"
            >
              <el-input
                type="password"
                v-model="ruleForm.checkPass"
                autocomplete="new-password"
              ></el-input>
            </el-form-item>
          </el-form>
          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="dialogFormVisible = false;cancel()">取 消</el-button>
            <el-button
              type="primary"
              @click="dialogFormVisible = false;addData(ruleForm)"
            >确 定</el-button>
          </div>
        </el-dialog>

      </template>

    </common-table>
  </div>
</template>

<script>
const axios = require("axios").default;
import CommonTable from "../../components/CommonTable.vue";
import { getLoginInfo, deleteLoginInfo,addPersonInfo} from "@/http/api/login";
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
      // dialog点击弹出窗口
      ruleForm: {
        usertitle: "",
        name: "",
        password: "",
        checkPass: "",
        token: "@guid"
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
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
    // 添加人员数据
    addData(personData) {
      //重置form表单
      this.$refs["ruleForm"].resetFields();
      // 重置选择下拉框
      this.ruleForm.usertitle = ''
      // alert(personData);
      addPersonInfo(personData).then((item)=>{
        this.tableData = item.data.data.userInfoList;
        // console.log(item);
      })
    },
    cancel() {
      //重置form表单
      this.$refs["ruleForm"].resetFields();
      // 重置选择下拉框
      this.ruleForm.usertitle = ''
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