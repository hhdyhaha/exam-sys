<template>
  <div class="tag">
    <el-tag
      v-for="tag in tags"
      :key="tag.name"
      closable
      :type="tag.type"
    >
      {{tag.label}}
    </el-tag>
  </div>
</template>

<script>
export default {
  computed: {
    // tags 从vuex获取tags数据
    tags() {
      return this.$store.state.tab.tabsList;
    },
  },
  mounted() {
    // console.log(this.$route.meta);
    // console.log(tags);
  },
};
</script>

<style lang="less" scoped>
.el-tag {
  margin-right:5px;
  margin-left:5px;
}
</style>