<template>

  <Transition>
    <Animation style="width: 100vw; height: 100vh;" v-if="isShow"/>
  </Transition>

  <div v-show="!isShow">
    <!--相关主内容-->
    <div class="wrapper">
      <!-- 头像/名字展示 -->
      <div class="main-box flex">
        <div class="name flex">
          <div style="margin-top:30px">
            <h1>居無何</h1>
          </div>
          <p style="font-family: 汉仪瘦金书简; font-size: 2em">梦不会逃走，逃走的一直都是自己。</p>
        </div>
      </div>

      <!-- 导航栏 -->
      <div class="header">
        <el-affix :offset="0">
          <Navbar class="navbar" style="background-color: white"/>
        </el-affix>
      </div>

      <!-- 内容条 -->
      <div class="main-content">
        <div style="width: 900px;">
          <CardArticles :article-list="this.articleList"/>
        </div>
        <el-affix target=".main-content" :offset="100">
          <CardInfo/>
        </el-affix>
      </div>

    </div>

    <!--分页-->
    <div class="page">
      <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="page.pageNum"
          :page-size="page.pageSize"
          layout="prev, pager, next, jumper"
          :total="page.total">
      </el-pagination>
    </div>
  </div>



</template>
<script>
import Navbar from "../../components/front/Navbar.vue";
import CardArticles from "../../components/front/CardArticles.vue"
import CardInfo from "../../components/front/CardInfo.vue";
import {queryArticlesPage} from "../../api/article";
import Animation from "@/components/shared/Animation.vue";

export default {
  components: {CardInfo, CardArticles, Navbar, Animation},
  data() {
    return {
      circleUrl: "https://images.juwuhe.top/i/2022/08/12/xmpuo0-3.jpg",
      logoUrl: "https://images.juwuhe.top/i/2022/06/04/ibzp5h.png",
      //分页数据
      page: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      //博文集合
      articleList: [],
      //展示的额内容
      isShow: true,
    }
  },
  created() {
    this.queryClassifyLadle();
  },
  methods: {
    /*查询博文及其所属标签信息*/
    queryClassifyLadle() {
      queryArticlesPage(this.page).then(res => {
        console.log("加载数据成功")
        console.log(res)
        if (res.success) {
          this.page.total = res.data.total
          this.articleList = res.data.list

          //加载动画
          setTimeout(() => {
            // 方法区
            this.isShow = false
          }, 1000);

          console.log(this.articleList)
        } else {
          console.log(res.message)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    /*更改页数的方法*/
    handleCurrentChange(val) {
      this.page.pageNum = val
      console.log(`当前页: ${val}`);
    }
  },
}
</script>
<style lang="scss" scoped>

.wrapper {
  //去除水平滚动条
  scrollbar-width: none;
  -ms-overflow-style: none;
  overflow-x: hidden;
  overflow-y: auto;
}

.name {
  color: white;
  font-family: 宋体;

  h1 {
    font-weight: 500;
    font-size: 2.5rem;
  }

  p {
    font-size: 1.6rem;
  }
}

.flex {
  display: flex;
}

.main-box {
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: url("https://w.wallhaven.cc/full/1k/wallhaven-1k6ljv.jpg") center/cover no-repeat;
}

.name {
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.main-content {
  margin: 30px 0px 30px;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
}

.navbar {
  //背景阴影
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.page {
  display: flex;
  justify-content: center;
  margin: 50px 0px;
}

.footer {
  height: 100px;
  text-align: center;
  font-family: 汉仪瘦金书简;
}

</style>
