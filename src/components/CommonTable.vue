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
          v-for="(item,index) in tableData"
          :key="index"
          :label="item.name"
          :value="item.id"
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
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
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
        :total="tableData.length"
      >
      </el-pagination>
    </div>
  </div>

</template>

  <script>
export default {
  props: ["tableData", "tableLabel", "currentPage", "total", "pageSize"],
  methods: {
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    // 下拉框点击时将数组进行过滤
    selectClick(val) {
      // 将数据库的tableData循环出来
      for (let index = 0; index < this.tableData.length; index++) {
        // 一行数据
        const table = this.tableData[index];
        // 判断选中的id和元素的id是否相等
        if (val === table.id) {
          // return this.tableData.filter(item=>item.name===table.name)
          // 将tableData数据过滤,不会破坏原数组
          const tableData1 = this.tableData.filter(
            (item) => item.name === table.name
          );
          // console.log(tableData1);
          return tableData1
        } else {
          return this.tableData;
        }
      }
    },
  },

};
</script>