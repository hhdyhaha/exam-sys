<template>
  <div class="box-bg">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      class="login-form animate__animated animate__jello"
      label-width="100px"
    >
    <!-- <p>角色类型</p> -->
      <el-form-item label="角色类型" style="" class="select_item">
        <el-select
          placeholder="请选择角色类型"
          v-model="ruleForm.usertitle"
          class="login-form-item"
        >
          <el-option
            label="管理员"
            value="管理员"
            class="login-form-item"
          ></el-option>
          <el-option
            label="超级管理员"
            value="超级管理员"
            class="login-form-item"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 输入账号 -->
      <!-- Form-Item 的 prop 属性设置为需校验的字段名  prop 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 -->
      <el-form-item
        label="用户名"
        prop="account"
        class="login-form-item"
      >
        <!-- value / v-model	绑定值 -->
        <el-input
          type="text"
          v-model="ruleForm.name"
          class="login-form-item-input"
          autocomplete="new-password"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <!-- autocomplete 让input表单输入框不记录输入过信息 -->
      <!-- 输入密码 -->
      <el-form-item
        label="密码"
        prop="pass"
        class="login-form-item"
      >
        <el-input
          type="password"
          v-model="ruleForm.password"
          class="login-form-item-input"
          autocomplete="new-password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <!-- 确认密码 -->
      <el-form-item
        label="确认密码"
        prop="checkPass"
        class="login-form-item"
        autocomplete="new-password"
      >
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
          class="login-form-item-input"
          placeholder="请确认密码"
        ></el-input>
      </el-form-item>
      <!-- 点击按钮 -->
      <el-form-item class="login-form-item">
        <el-button
          type="primary"
          @click="submitForm(ruleForm)"
          class="login-form-item-input"
        >注册</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addPersonInfo } from "@/http/api/login";
// axios.<method> 能够提供自动完成和参数类型推断功能
// const axios = require("axios").default;
export default {
  data() {
    //账号格式5-12位数字
    // var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
    // var accountPattern = /^\d{5,12}$/;
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
          // console.log("haha");
          callback();
        } else {
          callback(new Error("请输入4到16位字符（字母，数字，下划线，减号）"));
        }
      }, 1000);
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
    return {
      ruleForm: {
        id: "",
        usertitle: "",
        name: "",
        password: "",
        checkPass: "",
        token: "@guid",
      },
      userToken: "",
      // rules 属性传入约定的验证规则
      rules: {
        // validator的参数有：(rule, value, callback, source, options)，前三个比较重要。
        // rule：指向该条规则对象。
        // value：新的值，用于参与运算、对比。
        // callback：执行回调，使用方法是：callback('...');。
        // 如果不传参：表示验证通过，一般不必专门强调。
        // 如果传入值：字符串会作为错误提示，但是显示优先级低于外层的message。比如callback('嘻嘻嘻');跟message: '哈哈哈'同时存在，则会提示哈哈哈。
        name: [{ validator: checkAccount, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      // console.log("注册表单信息");
      // console.log(formName);
      //   validate 对整个表单进行校验的方法，参数为一个回调函数。
      //   该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // 箭头函数解决vue axios 数据（data）赋值问题
          addPersonInfo(formName)
            .then((response) => {
              if (response.data.sta) {
                this.$router.push({name:'Lg'})
              this.$message({
                showClose: true,
                message: "注册成功! 请登录!!!",
                type: "success",
              });
            } else {
              this.$message({
                showClose: true,
                message: "用户已存在",
                type: "warning",
              });
            }
            })
            .catch(() => {
              console.log("连接数据库失败");
            });
        } else {
          //   console.log(formName);
          // console.log("error submit!!");
          this.$message({
            message: "请正确输入用户名/密码",
            type: "warning",
          });
          return false;
        }
      });
    },
    resetForm() {
      //   resetFields	对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.box-bg {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* min-width: 1000px;
  background-color: #fff;
  background: url("../assets/image/哆啦A梦.jpeg") no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  
  z-index: 1; */
}
/* 伪元素 ::after 能够在指定元素的后面插入一些内容，在 ::after 中需要使用 content 属性来定义要追加的内容，
而且在 ::after 中必须定义 content 属性才会生效（没有需要插入的内容时可以将 content 属性的值定义为空""）。 */

.login-form {
  width: 30%;
  position: relative;
  left: 30%;
  top: 25%;
  text-align: center;
  .select_item{
    text-align: left;
  }
}
</style>