<template>
  <div class="common-layout">
    <!--导航栏-->
    <el-affix :offset="0">
      <Navbar class="navbar" style="background-color: white"/>
    </el-affix>
    <el-container class="container">

      <!--侧边栏-->
      <el-aside class="container-aside">
        <el-col>
          <el-menu
              class="menu-main"
              v-for="classify in classifyVOList"
          >

            <!--菜单-->
            <el-sub-menu :index="classify.classifyId">
              <template #title>
                <span>{{ classify.classifyName }}</span>
              </template>

              <!--文章-->
              <el-menu-item
                  v-for="article in classify.articleVOList"
                  :index="article.articleId"
                  @click="openArticle(article.articleId)"
              >
                {{ article.articleTitle }}
              </el-menu-item>

              <!--定义组件递归渲染-->
              <RecursiveMenu @openArticle="openArticle" :classify-list="classify.childrenClassify"/>

            </el-sub-menu>
          </el-menu>
        </el-col>

      </el-aside>

      <!--内容栏-->
      <el-main class="container-main">


        <!--空状态占位-->
        <div v-if="isShow" class="empty" >
          <el-empty  description="没有数据"/>
        </div>




        <div v-else v-html="article.articleContent"></div>


      </el-main>
    </el-container>
  </div>
</template>

<script>
import Navbar from "../../components/front/Navbar.vue";
import {queryArticleAndClassify} from "@/api/classify";
import RecursiveMenu from "@/components/front/RecursiveMenu.vue";
import {queryArticle} from "@/api/article";

export default {
  articleTitle: "Classification",
  components: {Navbar, RecursiveMenu},
  data() {
    return {
      classifyVOList: [],
      article: {
        type: Object
      },
      isShow: true
    }
  },
  //声明钩子
  created() {
    this.getArticleAndClassify();
  },
  methods: {

    //读取文章和分类信息
    getArticleAndClassify() {
      console.log('查询分类信息')
      queryArticleAndClassify().then(res => {
        console.log(res)
        if (res.success) {
          console.log(res.data)
          this.classifyVOList = res.data
        } else {
          console.log(res.message)
        }
      }).catch(error => {
        console.log(error)
      })
    },

    //节点打开
    openArticle(articleId) {
      //请求文章信息
      queryArticle(articleId).then(res => {
        console.log(res)
        if (res.success) {
          this.article = res.data
          this.isShow = false
        } else {
          console.log(res.message)
        }
      }).catch(error => {
        console.log(error)
      })

    }
  }
}

</script>

<style lang="scss" scoped>

.common-layout {
  height: 100vh;
  width: 100vw;

  //去除水平滚动条
  scrollbar-width: none;
  -ms-overflow-style: none;
  overflow-x: hidden;
  overflow-y: auto;
}

.container {
  width: calc(100vw);
  height: calc(100vh - 60.927px);

  .container-aside {
    padding: 10px;
    display: flex;
  }

  .empty {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

</style>
