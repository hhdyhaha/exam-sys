<template>
  <div>

    <!-- select 选择器 -->
    <div>
      <el-select
        v-model="tableData.name"
        placeholder="请选择姓名"
        @change="selectClick"
      >
        <!--  -->
        <el-option
          v-for="(item,index) in optionData"
          :key="index"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-select>
    </div>

    <!-- 表格 -->
    <div class="table">
      <!-- data 将格式正确的数据渲染在表格中 -->
      <!-- 
        定义和用法
          slice() 方法以新的数组对象，返回数组中被选中的元素。
          slice() 方法选择从给定的 start 参数开始的元素，并在给定的 end 参数处结束，但不包括。
          注释：slice() 方法不会改变原始数组。
          :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
       -->

      <el-table
        :data="(selectData? this.tableData2:tableData).slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%"
      >
        <el-table-column
          v-for="(itemLabel,index) in tableLabel"
          :key="index"
          :prop="itemLabel.prop"
          :label="itemLabel.label"
          width="220"
        >
        </el-table-column>
      </el-table>

    </div>
    <!-- 分页 -->
    <div>
      <!--
        :page-sizes="[3,5,10,20] //这是下拉框可以选择的，每选择一行，要展示多少内容 
          page-sizes接受一个整型数组，数组元素为展示的选择每页显示个数的选项
        size-change和current-change事件来处理页码大小和当前页变动时候触发的事件。
          size-change	pageSize 改变时会触发
          current-change	currentPage 改变时会触发
        page-size	每页显示条目个数，支持 .sync 修饰符
        current-page	当前页数，支持 .sync 修饰符
        layout	组件布局，子组件名用逗号分隔
        total	总条目数
      -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3,5,10,20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="(selectData? this.tableData2:tableData).length"
      >
      </el-pagination>
    </div>
    <div>{{this.tableData2}}</div>
  </div>

</template>

  <script>
import { mapState } from "vuex";
export default {
  name:'commonTable',
  data() {
    return {
      // haha:"a",
      // selectData1: this.$store.state.table.selectData,

      // tableData: this.$store.state.table.tableData,
      tableData2: "", //过滤后的数据
    };
  },

  methods: {
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      this.$store.commit("table/handleSizeChange", val);
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      this.$store.commit("table/handleCurrentChange", val);
    },
    // 下拉框点击时将数组进行过滤
    selectClick(val) {
      const tableData1 = this.$store.getters["table/selectClick"](val);
      // 第一个参数（2）定义了应添加新元素的位置（拼接）。
      // 第二个参数（0）定义应删除多少元素。
      // 其余参数（“Lemon”，“Kiwi”）定义要添加的新元素。
      console.log(tableData1);
      this.tableData2 = tableData1;
      // this.tableData2.splice(0, this.tableData2.length, tableData1);
      this.$store.commit("table/selectClick", val);
    },
  },
  // 当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。
  // 为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性，让你少按几次键：
  computed: {
    // 列表数据
    tableData() {
      return this.$store.state.table.tableData;
    },
    // 是否点击了选择框
    selectData() {
      return this.$store.state.table.selectData;
    },
    // 下拉栏数据去重
    optionData() {
      const tableData = this.$store.state.table.tableData;
      const res = new Map();
      return tableData.filter(
        (tableData) => !res.has(tableData.name) && res.set(tableData.name, 1)
      );
    },
    ...mapState({
      // tableData:state=>state.table.tableData,
      tableLabel: (state) => state.table.tableLabel,
      currentPage: (state) => state.table.currentPage,
      total: (state) => state.table.total,
      pageSize: (state) => state.table.pageSize,
    }),
  },
};
</script>