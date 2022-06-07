export default {
    namespaced:true,
    // 准备state——用于存储数据
    state: {
        // 是否折叠
        isCollapse: false,
        currentMenu: null, //当前菜单
        // tab数组 用来展示tab数据
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home',
                type:''
            }
            // sessionStorage.getItem('val')
        ],
        // 登录用户的账号密码
        ruleForm:[]

    },
    //准备mutations——用于操作数据（state）
    mutations: {
        // 这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
        // 第二个参数由commit传入数据
        // 是否折叠
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val) {
            //判断当前的名字是否等于home首页,如果不是添加
            // val.name === 'home' ? (state.currentMenu = null) : (state.currentMenu = val)
            // state.tabsList.push(val)
            // console.log('侧边val'+val);
            if(val.name==='home'){
                state.collapseMenu=null
            }else{
                // console.log(val);
                // 将对象转化成字符串才能存入到session中
                let val1 = JSON.stringify(val)
                sessionStorage.setItem('val',val1)
                
                // let val2 = sessionStorage.getItem('val')
                // console.log(val2);
                state.currentMenu=val
                let result=state.tabsList.findIndex(item=>item.name===val.name)
                result===-1?state.tabsList.push(val):''  
                // let val1 = JSON.stringify(val)    
                // result===-1?sessionStorage.setItem('val',val1):''
                
            }
        },
        // 清除tabsList
        clearTabs(state){
            // for(var i=0;i<=state.tabsList.length;i++){
            //     // delete state.tabsList[i];
            //     state.tabsList.splice(i,1)
            // }
            const len =  state.tabsList.length-1
            state.tabsList.splice(1,len)
            
            
        },
        // 关闭标签
        closeTag(state,val){
            const result = state.tabsList.findIndex(item=>item.name===val.name)
            // splice(索引,删除几个) 方法用于添加或删除数组中的元素。并返回删除的项目。
            state.tabsList.splice(result,1)
        },
        // 获取账号密码信息
        getRuleForm(state,val){
            state.ruleForm = val
            console.log('vuex中的账号密码信息');
            console.log(val);
        }
    },
    //准备actions对象——响应组件中用户的动作
    actions: {
        collapseMenu() {

        }
    }

}