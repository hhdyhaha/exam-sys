<template>
    <el-table
      style="width: 100%">
      <el-table-column
      v-for="(item,index) in tableData"
      :key="index"
        :prop="item.date"
        :label="item.name"
        width="180">
        {{item.address}}
      </el-table-column>
      
    </el-table>
  </template>

  <script>
    export default {
      props:["tableData"]
    }
  </script>