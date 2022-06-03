// 先引入mockjs模块
import  Mock  from 'mockjs'
// 吧JSON数据格式引进来[JSON数据格式没有对外暴露,但是可以引入]
// webpack默认对外暴露的:图片,JSON数据格式
import textInfo from './textInfo.json'
import login from './login.json'
import queryQuestionText from './queryQuestionText.json'
import queryTextPaperList from './queryTextPaperList.json'
import OlineExam from './OlineExam.json'

// console.log(_login);
// Mock数据:第一个参数:请求地址 第二个参数:请求数据
// Mock.mock('/index/login',{code:200,data:login})
Mock.mock('http://localhost:8080/index/textInfo?_token=$2a$10$TRc2n8KZ0udRXkwSvwRYeeChMdf9g95ANrIETrfwZRxfrgUXkAofO',{code:200,data:textInfo})
// 登录 用户管理
let list = function (row) {
    // console.log(row);
    // console.log(login.userInfoList);
    // 判断axios发过来的请求时get还是post
    let rtype = row.type.toLowerCase(); //获取请求的类型并转换为小写
    if(rtype==='get'){
        console.log(login);
        // login 用户信息JSON数据
        return {data:login}
    }else{
        // // 点击传来的id
        let id =parseInt(JSON.parse(row.body).row.id) 
        // 根据id判断删除对应id元素
        for (let index = 0; index < login.userInfoList.length; index++) {
            const element = login.userInfoList[index];
            if(id === Number(element.id) ){
                login.userInfoList.splice(index,1)
            }
        }
        return {'data':login}
    }
    
}
// console.log(login.userInfoList);
Mock.mock('http://localhost:8080/index/login?_token=$2a$10$TRc2n8KZ0udRXkwSvwRYeeChMdf9g95ANrIETrfwZRxfrgUXkAofO','post',list)
Mock.mock('http://localhost:8080/index/login?_token=$2a$10$TRc2n8KZ0udRXkwSvwRYeeChMdf9g95ANrIETrfwZRxfrgUXkAofO','get',list)
// 题目
Mock.mock('http://localhost:8080/index/queryQuestionText?_token=$2a$10$TRc2n8KZ0udRXkwSvwRYeeChMdf9g95ANrIETrfwZRxfrgUXkAofO',{code:200,data:queryQuestionText})
// 考试时间列表
Mock.mock('http://localhost:8080/index/queryTextPaperList?_token=$2a$10$TRc2n8KZ0udRXkwSvwRYeeChMdf9g95ANrIETrfwZRxfrgUXkAofO',{code:200,data:queryTextPaperList})
// 考试信息
Mock.mock('http://localhost:8080/index/online/OlineExam?_token=$2a$10$TRc2n8KZ0udRXkwSvwRYeeChMdf9g95ANrIETrfwZRxfrgUXkAofO',{code:200,data:OlineExam})
