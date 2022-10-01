<template>
  <div class="article-page">
    <el-pagination
        @current-change="handleCurrentChange"
        :hide-on-single-page="true"
        :current-page.sync="page.pageNum"
        :page-size="page.pageSize"
        layout="prev, pager, next, jumper"
        :total="page.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  articleTitle: "Pagination",
  props:{
    page:{
      type: Object,
      require: true,
      pageNum:{
        type: Number,
        default: 1,
        require: true,
      },
      pageSize: {
        type: Number,
        default: 10,
        require: true,
      },
      total:{
        type: Number,
        require: true,
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      // this.page.pageNum = val;
      this.$emit('pageChange',val)
    }
  }
}
</script>

<style lang="scss" scoped>
.article-page {
  height: 50px;
  display: flex;
  justify-content: center;
}
</style>
