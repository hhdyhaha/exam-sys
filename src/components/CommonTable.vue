<template>
  <div>
    <!-- select 选择器 -->
    <div>
      <el-select
        v-model="value"
        placeholder="请选择姓名"
        @change="selectClick"
      >
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
       -->

      <el-table
        :data="(selectData? tableData2:tableData).slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%"
      >
        <el-table-column
          v-for="(itemLabel,index) in tableLabel"
          :key="index"
          :prop="itemLabel.prop"
          :label="itemLabel.label"
          width="itemLabel.width"
          align="center"
        >
        </el-table-column>
        <!-- 插槽 -->
        <slot></slot>
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
  </div>

</template>

  <script>
export default {
  name: "commonTable",
  props: [
    "tableData",
    "selectData",
    "tableLabel",
    "currentPage",
    "total",
    "pageSize",
    "tableData2",
  ],

  methods: {
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    // 下拉框点击时将数组进行过滤
    selectClick(val) {
      this.selectData = val;
      this.tableData2 = this.tableData.filter((item) => item.name === val);
    },
  },
  computed: {
    // 下拉栏数据去重
    optionData() {
      const tableData = this.tableData;
      const res = new Map();
      return tableData.filter(
        (tableData) => !res.has(tableData.name) && res.set(tableData.name, 1)
      );
    },
  },
};
</script>