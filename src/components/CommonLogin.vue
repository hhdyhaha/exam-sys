<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
    >
      <!-- 输入账号 -->
      <!-- Form-Item 的 prop 属性设置为需校验的字段名  prop 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 -->
      <el-form-item
        label="账号"
        prop="account"
      >
        <!-- value / v-model	绑定值 -->
        <el-input
          type="text"
          v-model="ruleForm.account"
        ></el-input>
      </el-form-item>
      <!-- autocomplete 让input表单输入框不记录输入过信息 -->
      <!-- 输入密码 -->
      <el-form-item
        label="密码"
        prop="pass"
      >
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <!-- 确认密码 -->
      <el-form-item
        label="确认密码"
        prop="checkPass"
      >
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <!-- 点击按钮 -->
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// axios.<method> 能够提供自动完成和参数类型推断功能
const axios = require("axios").default;
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
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        account: "",
        pass: "",
        checkPass: "",
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
        account: [{ validator: checkAccount, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      let _this = this;
      // console.log(this.$refs);
      //   validate 对整个表单进行校验的方法，参数为一个回调函数。
      //   该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .get("https://api.virapi.com/vir_gitee4agf83h3314f6/index/login", {
              params: {
                _token:
                  "$2a$10$TRc2n8KZ0udRXkwSvwRYeeChMdf9g95ANrIETrfwZRxfrgUXkAofO",
              },
            })
            // 箭头函数解决vue axios 数据（data）赋值问题
            .then((response) => {
              // 获取到用户信息 let定义多个变量 ,隔开
              let res = response.data.data.userInfoList,
                len = res.length,
                // 存放获取到的用户和密码
                userNameArr = [],
                passWordArr = [],
                ses = window.sessionStorage;
              for (let index = 0; index < len; index++) {
                userNameArr.push(res[index].name);
                passWordArr.push(res[index].password);
              }
              // indexOf()方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
              if (userNameArr.indexOf(this.ruleForm.account) === -1) {
                alert("账号不存在");
              } else {
                //返回的是索引
                let index = userNameArr.indexOf(this.ruleForm.account);
                // 判断密码是否正确
                if (passWordArr[index] === this.ruleForm.pass) {
                  // 把token放在sessionStorage中
                  ses.setItem("data", res[index].token);
                  alert("密码正确");
                  this.$router.push({ name: "home" });
                } else {
                  alert("密码错误");
                }
              }
            })
            .catch((err) => {
              console.log("连接数据库失败");
            });
        } else {
          //   console.log(formName);
          // console.log("error submit!!");
          alert("error submit!!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      //   resetFields	对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
</style>