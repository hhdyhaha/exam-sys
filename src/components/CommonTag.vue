<template>
  <div class="tag">
    <!-- 
      effect主题颜色
      closable这里说明home是不能关闭的
      click	点击 Tag 时触发的事件 切换路由
      close	关闭 Tag 时触发的事件 关闭路由
     -->
    <el-tag
      v-for="(tag,index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="$route.name===tag.name?'dark':'plain'"
      :type="tag.type"
      @click="changeMenu(tag)"
      @close="handleClose(tag,index)"
    >
      {{tag.label}}
      <!-- {{tag.meta.title}} -->
    </el-tag>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  computed: {
    // tags 从vuex获取tags数据
    tags() {
      return this.$store.state.tab.tabsList;
    },
    current() {
      return this.$route.matched;
    },
  },
  methods: {
    // 你可以在组件中使用 this.$store.commit('xxx') 提交 mutation，
    // 或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）。
    ...mapMutations({
      //起个别名
      close: "tab/closeTag",// 将 `this.close()` 映射为 `this.$store.commit('close')`
    }),
    //选择标签跳转路由
    changeMenu(tag) {
      this.$router.push({ name: tag.name });
      // console.log(this.tags[0].name);
    },
    // 关闭标签
    handleClose(tag,index) {
      let length = this.tags.length - 1
      this.close(tag)

       // 如果关闭的标签不是当前路由的话，就不跳转
      if (tag.name !== this.$route.name) {
        return
      }
      // 关闭的标签是最右边的话，往左边跳转一个
      if (index === length) {
        this.$router.push({ name: this.tags[index - 1].name })
      } else {
        // 否则往右边跳转
        this.$router.push({ name: this.tags[index].name })
      }
    },
  },
  mounted() {
    // console.log(this);
    // console.log(this.$route.meta);
    // console.log(tags);
  },
};
</script>

<style lang="less" scoped>
.tag {
  padding: 20px;
  padding-bottom: 20px;
  // cursor 属性规定要显示的光标的类型（形状）。
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
.el-tag {
  color: rgb(0, 0, 0) !important;
  background-color: rgba(255, 255, 255, 0) !important;
}



</style>