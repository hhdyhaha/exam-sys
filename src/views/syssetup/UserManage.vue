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
      <el-table-column fixed="right" label="操作" width="150px" align="center">
        <template v-slot:default="slotProps">
          <!-- <div class="operate-btn" v-for="(slotProp,index) in slotProps" :key="index"> -->
          <div class="operate-btn">
            <el-button
              @click="deleteClick(slotProps.row)"
              type="danger"
              size="mini"
              >删除</el-button
            >
            <!-- 编辑 -->
            <el-button
              @click="
                editdialogFormVisible = true;
                editClick(slotProps.row);
              "
              type="primary"
              size="mini"
              >编辑</el-button
            >
            <!-- 编辑弹出来的表单 -->
            <el-dialog
              title="编辑"
              :visible.sync="editdialogFormVisible"
              :append-to-body="true"
              width="30%"
              @close="$refs.dialogForm.resetFields()"
            >
              <!-- 表单 -->
              <el-form
                :model="editForm"
                status-icon
                :rules="rules"
                ref="editForm"
              >
                <el-form-item label="角色类型" :label-width="formLabelWidth">
                  <el-select
                    placeholder="请选择角色类型"
                    v-model="editForm.usertitle"
                  >
                    <el-option label="管理员" value="管理员"></el-option>
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
                  <el-input type="text" v-model="editForm.name"></el-input>
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
                    v-model="editForm.password"
                    autocomplete="new-password"
                    show-password
                  ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button
                  @click="
                    editdialogFormVisible = false;
                    cancel();
                  "
                  >取 消</el-button
                >
                <el-button
                  type="primary"
                  @click="
                    editdialogFormVisible = false;
                    editPersonData(editForm);
                  "
                  >确 定</el-button
                >
              </div>
            </el-dialog>
          </div>
        </template>
      </el-table-column>
      <!-- 添加人员 -->
      <template v-slot:addData>
        <el-button type="primary" @click="dialogFormVisible = true"
          >添加</el-button
        >
        <el-dialog
          title="添加人员"
          :visible.sync="dialogFormVisible"
          :append-to-body="true"
          width="30%"
        >
          <!-- 表单 -->
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
            <el-form-item label="角色类型" :label-width="formLabelWidth">
              <el-select
                placeholder="请选择角色类型"
                v-model="ruleForm.usertitle"
              >
                <el-option label="管理员" value="管理员"></el-option>
                <el-option label="超级管理员" value="超级管理员"></el-option>
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
              <el-input type="text" v-model="ruleForm.name"></el-input>
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
          <div slot="footer" class="dialog-footer">
            <el-button
              @click="
                dialogFormVisible = false;
                cancel();
              "
              >取 消</el-button
            >
            <el-button
              type="primary"
              @click="
                dialogFormVisible = false;
                addPersonData(ruleForm);
              "
              >确 定</el-button
            >
          </div>
        </el-dialog>
      </template>
    </common-table>
  </div>
</template>

<script>
// const axios = require("axios").default;
import CommonTable from "../../components/CommonTable.vue";
import {
  getLoginInfo,
  deleteLoginInfo,
  addPersonInfo,
  editPersonInfo,
} from "@/http/api/login";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "usermanage",
  data() {
    // 验证
    //账号格式5-12位数字
    var accountPattern = /^[a-zA-Z0-9_-]{4,16}$/;
    //密码格式6-22位字母数字
    var passwordPattern = /^[a-zA-Z0-9]{6,22}$/;
    // 验证用户名
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账户不能为空"));
      }
      // 延时一秒
      setTimeout(() => {
        if (accountPattern.test(value)) {
          callback();
        } else {
          callback(new Error("请输入4到16位字符（字母，数字，下划线，减号）"));
        }
      }, 500);
    };
    //   验证密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (passwordPattern.test(value)) {
          // console.log("haha");
          callback();
        } else {
          callback(new Error("请输入6-22位字母数字"));
        }
      }
    };
    // 验证第二次密码是否正确
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    // 返回数据
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
        id: "",
        usertitle: "",
        name: "",
        password: "",
        checkPass: "",
        token: "@guid",
      },
      // 编辑人员弹出窗口
      editForm: {
        id: "",
        usertitle: "",
        name: "",
        password: "",
        token: "@guid",
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      editdialogTableVisible: false,
      editdialogFormVisible: false,
      // 验证
      // rules 属性传入约定的验证规则
      rules: {
        name: [{ validator: checkAccount, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
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
    addPersonData(personData) {
      console.log("1");
      console.log(personData);
      this.$refs.ruleForm.validate(async (valid) => {
        //开启校验
        if (valid) {
          // 如果校验通过，请求接口，允许提交表单
          // 发送axios请求为异步操作 axios返回的就是一个Promise对象 await让promise对象像同步一样等待
          await addPersonInfo(personData).then((item) => {
            // 如果添加用户返回的为true,提示添加用户成功,否则提示用户已存在
            if (item.data.sta) {
              this.tableData = item.data.data.userInfoList;
              this.$message({
                showClose: true,
                message: "添加用户成功",
                type: "success",
              });
            } else {
              this.$message({
                showClose: true,
                message: "用户已存在",
                type: "warning",
              });
            }
          });
          this.resetForm();
        } else {
          //校验不通过
          this.$message({
            message: "请正确输入用户名/密码",
            type: "warning",
          });
          this.resetForm();
          return false;
        }
      });
    },
    // 编辑人员数据
    editClick(row) {
      console.log("row");
      console.log(row);
      // 显示当前表格当前行的数据
      this.editForm.usertitle = row.usertitle;
      this.editForm.name = row.name;
      this.editForm.password = row.password;
      this.editForm.id = row.id;
    },
    editPersonData(personData) {
      // 开启校验
      this.$refs.editForm.validate(async (valid) => {
        //开启校验
        if (valid) {
          // 如果校验通过，请求接口，允许提交表单
          // 发送axios请求为异步操作 axios返回的就是一个Promise对象 await让promise对象像同步一样等待
          await editPersonInfo(personData).then((item) => {
            this.tableData = item.data.data.userInfoList;
            // console.log(item);
          });
          // this.resetForm();
          // this.$refs["editForm"].resetFields();
          // this.editForm.usertitle = "";
        } else {
          //校验不通过
          this.$message({
            message: "请正确输入用户名/密码",
            type: "warning",
          });
          // this.resetForm();
          // this.$refs["editForm"].resetFields();
          // this.editForm.usertitle = "";
          return false;
        }
      });
    },

    // 重置表单
    resetForm: function () {
      //重置form表单
      this.$refs["ruleForm"].resetFields();
      // 重置选择下拉框
      this.ruleForm.usertitle = "";
    },
    // 取消添加
    cancel() {
      this.resetForm();
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
</style>
>
