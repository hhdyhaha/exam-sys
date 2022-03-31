<template>
  <div>
    <div></div>
    <!-- 表格 -->
    <div class="table">
      <!-- data 将格式正确的数据渲染在表格中 -->
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
      <!--:page-sizes="[3,5,10,20] //这是下拉框可以选择的，每选择一行，要展示多少内容 
      page-sizes接受一个整型数组，数组元素为展示的选择每页显示个数的选项
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
         console.log(`每页 ${val} 条`);
         this.currentPage = 1;
         this.pageSize = val;
     },
     //当前页改变时触发 跳转其他页
     handleCurrentChange(val) {
         console.log(`当前页: ${val}`);
         this.currentPage = val;
     }
}

};
</script>