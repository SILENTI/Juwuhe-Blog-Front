<template>
  <div class="common-layout">
    <!--导航栏-->
    <el-affix :offset="0">
      <Navbar class="navbar" style="background-color: white"/>
    </el-affix>
    <el-container class="container">
      <!--侧边栏-->
      <el-aside  class="container-aside">
        <el-col style="max-width: 100%" :span="12">
          <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              v-for="classifyVO in this.classifyVOList"
          >
            <!--第一大项-->
            <el-sub-menu :index="classifyVO.classifyId">
              <template #title>
                <span>{{ classifyVO.classifyName }}</span>
              </template>

              <!--文章标题-->
              <el-menu-item v-for="article in classifyVO.articleVOList" :index="article.articleId">
                {{ article.articleTitle }}
              </el-menu-item>

<!--              <el-sub-menu v-for="childrenClassify in classifyVO.childrenClassify" :index="childrenClassify.classifyId">
                <template #title>{{ childrenClassify.classifyName }}</template>
                <el-menu-item v-for="childrenArticle in childrenClassify.articleVOList" :index="childrenArticle.articleId">
                  {{ childrenArticle.articleTitle }}
                </el-menu-item>
              </el-sub-menu>-->

            </el-sub-menu>

          </el-menu>
        </el-col>
      </el-aside>

      <!--内容栏-->
      <el-main class="container-main">
        <el-empty description=" "/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Navbar from "../../components/front/Navbar.vue";
import {queryArticleAndClassify} from "@/api/classify";

export default {
  articleTitle: "Classification",
  components: { Navbar},
  data() {
    return {
      classifyVOList: []
    }
  },
  //声明钩子
  created() {
    this.getArticleAndClassify();
  },
  methods: {
    //读取文章和分类信息
    getArticleAndClassify(){
      console.log('===================')
      queryArticleAndClassify().then(res =>{
        console.log(res)
        if (res.success){
          console.log(res.data)
          this.classifyVOList = res.data
        }else {
          console.log(res.message)
        }
      }).catch(error =>{
        console.log(error)
      })
    },
  }
}

</script>

<style lang="scss" scoped>

.common-layout {
  height: 100vh;
}

.container {
  width: 100%;
  height: 100%;

  .container-aside {
    padding: 20px;
  }

  .container-main {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

</style>
