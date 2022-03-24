export default{
    // 准备state——用于存储数据
    state:{
        // 是否折叠
        isCollapse:false
    },
    //准备mutations——用于操作数据（state）
    mutations:{
        // 这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
        // 第二个参数由commit传入数据
        collapseMenu(state,val){
            state.isCollapse = !state.isCollapse
        }
    },
    //准备actions对象——响应组件中用户的动作
    actions:{

    } 

}