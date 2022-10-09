<template>

  <Transition>
    <Animation v-if="isShow"/>
  </Transition>

  <div v-show="!isShow" class="article-main">
    <!--文章查询-->
    <div class="article-search" @keyup.enter="searchArticle(articleSearch)">
      <el-input
          class="input-item"
          placeholder="标题"
          size="small"
          v-model="articleSearch.articleTitle"
          clearable>
      </el-input>
      <el-input
          class="input-item"
          placeholder="分类"
          v-model="articleSearch.classify"
          clearable>
      </el-input>
      <el-input
          class="input-item"
          placeholder="标签"
          v-model="articleSearch.label"
          clearable>
      </el-input>
      <!--时间段-->
      <div class="input-item" style="width: 400px; display: flex; align-items: center">
        <el-date-picker
            v-model="articleSearch.data"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
        />
      </div>
    </div>

    <!--文章卡片-->
    <div class="article-item" v-for="(article,index) in articledList">
      <!--展示选项-->
      <div style="display: flex;align-items: center">
        <!--文章封面-->
        <div class="image">
          <el-image style="width: 200px; height: 100px" :src="article.articleImg" fit="cover"/>
        </div>
        <!--文章标题即概述-->
        <div class="title-Introduction">
          <h2>{{ article.articleTitle }}</h2>
          <p style="width:550px;
              display: -webkit-box;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
          ">{{ article.articleDescription }}</p>
        </div>
      </div>

      <!--操作选项-->
      <div class="article-operation">

        <!--文章发布或者下架-->
        <div>
          <el-button v-if="article.isPublish == 0" type="primary" @click="operatePublish(article,index)">
            上线
          </el-button>
          <el-button v-else type="info" @click="operatePublish(article,index)">下线</el-button>
        </div>

        <!--编辑-->
        <el-button type="warning">编辑</el-button>

        <!--删除-->
        <el-button type="danger" @click="removeArticle(article.articleId)">删除</el-button>

      </div>
    </div>
    <!--文章分页-->
    <div class="article-page">
      <Pagination v-model:page="page" @pageChange="pageChange"/>
    </div>
  </div>


</template>

<script>
import {queryArticlesPage, publishAction, removeArticle} from "@/api/article";
import {ElMessage, ElMessageBox} from 'element-plus'
import Pagination from "@/components/shared/Pagination.vue";
import Animation from "@/components/shared/Animation.vue";

export default {
  articleTitle: "articleList",
  /**注册组件*/
  components: {Animation, Pagination},
  /**组件数据*/
  data() {
    return {
      url: "https://w.wallhaven.cc/full/e7/wallhaven-e7jj6r.jpg",
      isShow: true,
      centerDialogVisible: false,
      //分类信息
      page: {
        pageNum: 1,
        pageSize: 5,
        total: 0,
      },
      //文章搜索信息
      articleSearch: {
        articleTitle: '',
        classify: '',
        label: '',
        data: '',
      },
      //文章展示信息
      articledList: []
    }
  },
  /**钩子*/
  created() {
    this.getArticleList();
    setTimeout(() => {
      // 方法区
      this.isShow = false
    }, 1000);
  },
  /**方法函数*/
  methods: {
    //数据获取
    getArticleList() {
      queryArticlesPage(this.page).then(res => {
        console.log(res.data)
        if (res.success) {
          // 过500毫秒调用

          this.page.total = res.data.total
          this.articledList = res.data.list
        } else {
          console.log(res.data.message)
        }
      }).catch(error => {
        console.log(error)
      })
    },

    //文章搜索
    searchArticle(article) {
      console.log("回车事件调用")
      console.log("打印标题：" + article.title)
    },

    //文章上下线操作
    operatePublish(article, index) {
      publishAction(article.articleId).then(res => {
        if (res.success) {
          console.log('====== 文章状态修改成功 ======')
          if (article.isPublish === 0) {
            this.articledList.at(index).isPublish = 1
          } else {
            this.articledList.at(index).isPublish = 0
          }
        } else {
          console.log('====== 文章状态修改失败 ======')
        }
      }).catch(error => {
        console.log(error)
      });
    },

    //分页页码切换
    pageChange(pageNum) {
      this.page.pageNum = pageNum
      this.getArticleList(this.page)
    },

    //文章删除
    removeArticle(articleId) {
      ElMessageBox.confirm(
          '确定要删除该文章?',
          '警告',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'error',
          }
      )
          .then(() => {
            removeArticle(articleId).then(res => {
              if (res.success) {
                ElMessage({
                  type: 'success',
                  message: '删除成功',
                })
              } else {
                ElMessage({
                  type: 'error',
                  message: '删除失败',
                })
              }

            }).catch(error => {

              console.log(error)

              ElMessage({
                type: 'info',
                message: '删除失败',
              })
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '取消删除',
            })
          })

    }

  }
}
</script>

<style lang="scss" scoped>

.article-main {
  width: 100%;
  height: 100%;
}

.article-item {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  div {
    padding: 0px 10px;
  }
}

.article-search {
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  .input-item {
    padding: 4px;
    width: 200px;
    height: 40px;
  }
}

.article-page {
  height: 50px;
  display: flex;
  justify-content: center;
}

.article-operation {
  display: flex;
  margin: 10px 40px;
}

</style>
