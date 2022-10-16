<template>


  <el-sub-menu v-for="classify in classifyList" :index="'classifyId:'+classify.classifyId">

    <!--分类信息-->
    <template #title>
      <span>{{ classify.classifyName }}</span>
    </template>

    <!--文章信息-->
    <el-menu-item v-for="article in classify.articleVOList" :index="article.articleId" @click="openArticle(article.articleId)" >
      {{ article.articleTitle }}
    </el-menu-item>

    <!--递归渲染-->
    <recursive-menu @openArticle="openArticle" :classify-list="classify.childrenClassify"/>

  </el-sub-menu>

</template>

<script>
export default {
  name: "RecursiveMenu",
  props: {
    classifyList: {
      type: Array,
      required: true
    }
  },
  methods:{
    openArticle(articleId) {
      this.$emit('openArticle', articleId)
    }
  }
}
</script>

<style scoped>

</style>
