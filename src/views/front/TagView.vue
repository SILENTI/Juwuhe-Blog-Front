<template>
  <!--导航栏-->
  <el-affix :offset="0">
    <Navbar class="navbar" style="background-color: white"/>
  </el-affix>

  <!--标签页-->
  <div class="main-tag">
    <el-button class="button" v-on:click="this.queryAllByLabelId(label.labelId)" v-for="label in labelList" type="primary">{{label.labelName}}</el-button>
  </div>

  <div class="main-content">
    <!--页面展示-->
    <CardArticles v-bind:article-list="this.articlesList"/>
    <!--分页-->
    <div class="page">
      <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="this.page.pageNum"
          :page-size="this.page.pageSize"
          layout="prev, pager, next, jumper"
          :total="this.page.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Navbar from "../../components/front/Navbar.vue";
import CardArticles from "../../components/front/CardArticles.vue";
import {queryAll} from "../../api/label";
import {queryArticlesPage, queryArticlesByLabelId} from "../../api/articles";

export default {
  name: "TagView",
  components: {Navbar, CardArticles},
  data() {
    return {
      //分页相关
      page: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      //标签数组
      labelList: [],
      //博文数组
      articlesList: []
    };
  },
  created() {
    this.queryAllTage();
    this.queryAllArticles(this.page);
  },
  methods: {
    /*切换页码*/
    handleCurrentChange(val) {
      this.page.pageNum = val;
    },
    /*获取所有的文章*/
    queryAllArticles(page){
      queryArticlesPage(page).then(response =>{
        console.log("--------------------")
        console.log(response)
        if (response.success){
          this.page.total = response.data.total
          this.articlesList = response.data.list
        }else {
          console.log("查询失败：" + response.message)
        }
      }).catch(error =>{
        console.log("查询失败：" + error.message)
      })
    },
    /*查询所有的标签信息*/
    queryAllTage() {
      queryAll().then(response => {
        console.log("调用成功！！！")
        console.log(response)
        if (response.success) {
          this.labelList = response.data
        } else {
          console.log("查询失败：" + response.message)
        }
      }).catch(error => {
        console.log(error.message)
      })
    },
    /*根据标签的ID，查询文章的信息*/
    queryAllByLabelId(labelId) {
      queryArticlesByLabelId({
        labelId: labelId
      }).then(response => {
        console.log(response)
        if (response.success) {
          console.log(response.data)
          this.articlesList = response.data
        } else {
          console.log("操作失败："+response.message)
        }
      }).catch(error => {
        console.log("失败："+error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.main-tag {
  margin: 20px 10%;
  display: flex;
  flex-wrap: wrap;

  .button {
    margin: 5px;
  }
}

.main-content {
  padding: 50px 10%;

  .page {
    display: flex;
    justify-content: center;
    margin: 50px 0px;
  }
}

</style>
