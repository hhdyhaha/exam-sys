<template>
  <el-table 
  :data="tableData"
  style="width: 100%">
    <el-table-column
      v-for="(itemLabel,index) in tableLabel"
      :key="index"
      :prop="itemLabel.prop"
      :label="itemLabel.label"
      width="220"
    >
    </el-table-column>

  </el-table>
</template>

  <script>
export default {
  props: ["tableData", "tableLabel"],
};
</script>