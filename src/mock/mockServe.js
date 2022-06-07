// 先引入mockjs模块
import Mock from "mockjs";
// 吧JSON数据格式引进来[JSON数据格式没有对外暴露,但是可以引入]
// webpack默认对外暴露的:图片,JSON数据格式
import textInfo from "./textInfo.json";
import login from "./login.json";
import queryQuestionText from "./queryQuestionText.json";
import queryTextPaperList from "./queryTextPaperList.json";
import OlineExam from "./OlineExam.json";

// console.log(_login);
// Mock数据:第一个参数:请求地址 第二个参数:请求数据
// Mock.mock('/index/login',{code:200,data:login})
Mock.mock(
  "http://localhost:8080/index/textInfo?_token=$2a$10$TRc2n8KZ0udRXkwSvwRYeeChMdf9g95ANrIETrfwZRxfrgUXkAofO",
  { code: 200, data: textInfo }
);
// 登录 用户管理
let list = function (row) {
  // 路由传过来的数据
  let body1 = JSON.parse(row.body);
  //   console.log("edit");
  //   console.log(JSON.parse(row.body));
  // 判断axios发过来的请求时get还是post
  let rtype = row.type.toLowerCase(); //获取请求的类型并转换为小写
  if (rtype === "get") {
    // login 用户信息JSON数据
    return { data: login };
  } else {
    // 如果row存在删除元素
    if (body1.row) {
      // // 点击传来的id
      let id = parseInt(JSON.parse(row.body).row.id);
      // 根据id判断删除对应id元素
      for (let index = 0; index < login.userInfoList.length; index++) {
        const element = login.userInfoList[index];
        if (id === Number(element.id)) {
          login.userInfoList.splice(index, 1);
        }
      }
      return { data: login };
    } else if (body1.personData) {
      // 判断用户是否在数据库里
      let rowid = JSON.parse(row.body).personData.id;
      for (let index = 0; index < login.userInfoList.length; index++) {
        const element = login.userInfoList[index];
        // 如果用户id存在
        if (rowid === element.id) {
          login.userInfoList[rowid - 1] = JSON.parse(row.body).personData;
          return { data: login };
        } else {
          //   添加的角色类型和名字
          let usertitle = body1.personData.usertitle;
          let name = body1.personData.name;
          // 如果人员数据不存在,添加数据
          for (let index = 0; index < login.userInfoList.length; index++) {
            const element = login.userInfoList[index];
            // console.log('数据库数据');
            // console.log(element);
            if(usertitle === element.usertitle && name === element.name){
                return { data: login,sta:false };
            }
          }
          // 将JSON长度加1作为id存进去
          let id = login.userInfoList.length + 1;
          // {} 对象存数据的方式 存id
          body1.personData.id = id + "";
          login.userInfoList.push(body1.personData);
          // 存进去了
          // console.log('注册人员成功');
          // console.log(login.userInfoList);
          return { data: login,sta:true };
        }
      }
    }
  }
};
// console.log(login.userInfoList);
Mock.mock(
  "http://localhost:8080/index/login?_token=$2a$10$TRc2n8KZ0udRXkwSvwRYeeChMdf9g95ANrIETrfwZRxfrgUXkAofO",
  "post",
  list
);
Mock.mock(
  "http://localhost:8080/index/login?_token=$2a$10$TRc2n8KZ0udRXkwSvwRYeeChMdf9g95ANrIETrfwZRxfrgUXkAofO",
  "get",
  list
);
// 题目
Mock.mock(
  "http://localhost:8080/index/queryQuestionText?_token=$2a$10$TRc2n8KZ0udRXkwSvwRYeeChMdf9g95ANrIETrfwZRxfrgUXkAofO",
  { code: 200, data: queryQuestionText }
);
// 考试时间列表
Mock.mock(
  "http://localhost:8080/index/queryTextPaperList?_token=$2a$10$TRc2n8KZ0udRXkwSvwRYeeChMdf9g95ANrIETrfwZRxfrgUXkAofO",
  { code: 200, data: queryTextPaperList }
);
// 考试信息
Mock.mock(
  "http://localhost:8080/index/online/OlineExam?_token=$2a$10$TRc2n8KZ0udRXkwSvwRYeeChMdf9g95ANrIETrfwZRxfrgUXkAofO",
  { code: 200, data: OlineExam }
);
