<template>

  <Transition>
    <Animation style="width: 100vw; height: 100vh;" v-show="isShow"/>
  </Transition>

  <div v-show="!isShow" class="articleDetail-Main">
    <!--导航栏-->
    <el-affix :offset="0">
      <Navbar class="navbar" style="background-color: white"/>
    </el-affix>

    <div class="article-Text">
      <div class="article-Text-Html" v-html="this.article.articleContent"/>
    </div>

  </div>


</template>

<script>
import Navbar from "@/components/front/Navbar.vue";
import Animation from "@/components/shared/Animation.vue";
import {queryArticle} from "@/api/article";

export default {
  articleTitle: "ArticlesDetailView",
  components: {Navbar, Animation},
  data() {
    return {
      article: {type: Object},
      isShow: true,
    }
  },
  created() {
    this.getBlog()
  },
  methods: {

    //读取本地文件
    readFile(filePath) {
      // 创建一个新的xhr对象
      let xhr = null
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
      } else {
        // eslint-disable-next-line
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
      }
      const okStatus = document.location.protocol === 'file' ? 0 : 200
      xhr.open('GET', filePath, false)
      xhr.overrideMimeType('text/html;charset=utf-8')
      xhr.send(null)
      return xhr.status === okStatus ? xhr.responseText : null
    },

    //获取文章信息
    getBlog() {

      //所要查询的文章Id
      const articleId = this.$route.query.articleId;

      //查询文章详细信息
      queryArticle(articleId).then(res => {
        console.log(res)
        if (res.success) {
          this.article = res.data
          //加载动画
          setTimeout(() => {
            // 方法区
            this.isShow = false
          }, 1000);

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

.navbar {
  box-shadow: var(--el-box-shadow-light);
}

.articleDetail-Main {
  width: calc(100%);
}

.article-Text {
  margin: 100px;
  background-color: white;
}

.article-Text-Html {

}

</style>
