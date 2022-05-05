export default {
    namespaced:true,
    // 准备state——用于存储数据
    state: {
        //用户回答
        userAnswer: [],
        // 问题列表
        questionList: [],
        // 试卷创建时间
        nowtime:'',
        // 考试用时
        handleTime:'',
        // 得分
        score:''
    },
    //准备mutations——用于操作数据（state）
    mutations: {
        // 这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
        // 第二个参数由commit传入数据

        examSave(state, data) {
            var moment = require('moment');
            state.userAnswer = data[0]
            state.questionList = data[1]
            // 将moment转化成时间格式 处理试卷创建时间
            state.nowtime = data[2].format("YYYY-MM-DD HH:mm:ss")
            // 处理考试时间
            const handleTime = moment.duration(data[3], 'seconds');
            let hours = handleTime.hours() 
            let minutes = handleTime.minutes()
            let seconds = handleTime.seconds()
            const handleTime1 = moment({h:hours, m:minutes, s:seconds}).format('HH:mm:ss')
            state.handleTime = handleTime1    
            // 得分处理
            const userAnswer = data[0]
            const questionList = data[1]
            // console.log(userAnswer[0]);
            // console.log(questionList);
            let score = 0
            for (let index = 0; index < questionList.length; index++) {
                const question = questionList[index];
                // console.log(question.answer);
                if(userAnswer[question.id-2265] && userAnswer[question.id-2265]===question.answer){
                    score+=2;
                    console.log('haha');
                }else{
                    console.log('xixi');
                }
                
            }
            // console.log(score);
            state.score = score
        },
    },
    //准备actions对象——响应组件中用户的动作
    actions: {

    }

}