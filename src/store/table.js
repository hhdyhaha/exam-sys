export default {
    namespaced: true,
    // 准备state——用于存储数据
    state: {
        tableData: [],
        selectData:false,
        tableLabel: [],
        currentPage: 1,
        total: 20,
        pageSize: 3,
        tableData2:[]
    },
    //准备mutations——用于操作数据（state）
    mutations: {
        // 这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
        // 第二个参数由commit传入数据
        giveTableData(state, val) {
            state.tableData = val
            // console.log(val);
        },
        giveTableLabel(state, val) {
            state.tableLabel = val
            // console.log(val);
        },
        giveCurrentPage(state, val) {
            state.currentPage = val
            // console.log(val);
        },
        giveTotal(state, val) {
            state.total = val
            // console.log(val);
        },
        givePageSize(state, val) {
            state.pageSize = val
            // console.log(val);
        },
        //每页条数改变时触发 选择一页显示多少行
        handleSizeChange(state, val) {
            state.currentPage = 1
            state.pageSize = val
        },
        //当前页改变时触发 跳转其他页
        handleCurrentChange(state, val) {
            state.currentPage = val
        },

        selectClick(state, val) {
            state.selectData=true
        }

    },
    getters: {
        selectClick: (state) => (val) => {
            state.tableData2 = state.tableData.filter(item=>item.name===val)
            // 使用find返回的是一个对象,使用filter返回的是一个数组,数组里面是对象
            return state.tableData.filter(item=>item.name===val)
        }
    },
    //准备actions对象——响应组件中用户的动作
    actions: {

    }

}