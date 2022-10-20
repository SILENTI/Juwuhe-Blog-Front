<template>

  <Transition>
    <Animation style="width: 100vw; height: 100vh;" v-show="isShow"/>
  </Transition>

  <div v-show="!isShow">
    <!--导航栏-->
    <el-affix :offset="0">
      <Navbar class="navbar" style="background-color: white"/>
    </el-affix>

    <!--时间轴-->
    <div class="main-axis">

      <!--头部-->
      <el-timeline>
        <el-timeline-item size="large" color="#0bbd87" placement="top">
          <el-card>
            <h2>容我再努力努力，加大产量！！！</h2>
          </el-card>
        </el-timeline-item>

        <!--展示信息-->
        <el-timeline-item
            v-for="(article,index) in this.articleList"
            type="primary"
            placement="top"
            class="articleItem"
            :timestamp="article.articleCreateDate"

        >
          <el-card>
            <a href="">
              <h3>{{ article.articleTitle }}</h3>
              <p>{{ article.articleDescription }}</p>
            </a>
          </el-card>
        </el-timeline-item>

        <!--底部-->
        <el-timeline-item size="large" placement="top">
          <el-card>
            <h2>我是有点底线的！！！</h2>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>

</template>


<script>
import Navbar from "@/components/front/Navbar.vue"
import Animation from "@/components/shared/Animation.vue";
import {queryArticlesPage} from "@/api/article";
import {Notification} from "@/utils/elUtils";
import {ref} from "vue";

export default {
  articleTitle: "AxisView",
  components: {Navbar, Animation},
  data() {

    let test = '';

    return {
      articleList: [],
      page: {
        pageNum: 1,
        pageSize: 5,
        total: 0,
        pages: 0
      },
      isShow: true,
    }
  },
  setup(){
    const x = () => {
      console.log('setup中的方法')
    }
    return{
      x
    }
  },
  created() {
    //获取文章信息
    this.queryArticle();
    //加载动画
    setTimeout(() => {
      // 方法区
      this.isShow = false
    }, 1000);
  },
  mounted() {
    window.addEventListener('scroll',this.articleLazyLoading);
  },
  destroyed() {
    window.removeEventListener('scroll',this.articleLazyLoading);
  },
  methods: {
    //获取文章信息
    queryArticle() {
      queryArticlesPage(this.page).then(res => {
        console.log(res)
        if (res.success) {
          this.articleList.push(...res.data.list);
          this.page.total = res.data.total;
          this.page.pages = res.data.pages;
        } else {
          Notification('error', res.message);
        }
      }).catch(error => {
        Notification('error', error.message);
      })
    },

    //文章懒加载
    articleLazyLoading() {
        //获取到的元素
        const items = document.getElementsByClassName('articleItem');

        let offsetTop = items.item(items.length - 1).offsetTop;

        // // 获取可视范围的高度
        let vh = document.documentElement.clientHeight

        // 获取滚动条的高度
        let top = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;

        if (offsetTop <= vh +top && this.page.pageNum < this.page.pages){
          this.page.pageNum += 1;
          this.queryArticle();
        }
    }
  }
}
</script>

<style lang="scss" scoped>

.main-axis {
  margin: 5% 20%;
  font-family: 宋体;

  a {
    color: black;
    text-decoration: none; //去除下划线
  }

  p {
    font-size: 1em;
  }
}

</style>
