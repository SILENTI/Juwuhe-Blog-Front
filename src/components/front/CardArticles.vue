<template>
  <div class="card-main" v-for="(article, index) in this.articleList">

    <!--文章封面-->
    <div class="card-image">
      <img :src=article.articleImg>
    </div>

    <!--文章相关信息-->
    <div class="card-text">

      <router-link :to="{path: '/front/articlesDetail', query: {articleId: article.articleId}}">

        <!--文章标题-->
        <h1>{{ article.articleTitle }}</h1>
        <!--文章描述-->
        <p >{{ article.articleDescription }}</p>

      </router-link>

<!--      <a href="/front/articlesDetail">

      </a>-->

      <!--文章标签相关-->
      <div class="card-tag">
        <!--作者-->
        <a href=""><i class="iconfont icon-jurassic_user"/>居無何</a>
        <!--发布时间-->
        <a href=""><i class="iconfont icon-shijian"/>{{ new Date(article.articleDate).toLocaleDateString() }}</a>
        <div>
          <i class="iconfont icon-tianchongxing-"/>
          <!--文章标签-->
          <a id="card-tag" href="" v-for="label in getLabelNames(article.labelVOList)">{{ label }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  articleTitle: "CardArticles",
  props: {
    articleList: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      imageURL: "https://w.wallhaven.cc/full/e7/wallhaven-e7kpl8.png",
    }
  }, methods: {
    getLabelNames(array) {
      const newLabelNameList = [];
      for (const arrayElement of array) {
        if (arrayElement == null || arrayElement.labelName == null) break;
        newLabelNameList.push(arrayElement.labelName)
      }
      return newLabelNameList;
    }
  }
}
</script>

<style lang="scss" scoped>

.card-main {
  width: 100%;
  height: 100%;
  display: flex;
  font-family: 宋体;
  padding: 20px;
  margin: 0px 10px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  a {
    color: black;
    text-decoration: none; //去除下划线
    align-items: center;
  }
}

.card-image {
  background-color: cornflowerblue;
  width: 300px;
  height: 200px;
  display: flex;
  align-items: center;


  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.card-text {
  max-width: 480px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 20px;

  .card-tag {
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    i {
      margin-right: 2px;
    }

    a {
      margin-right: 20px;
      overflow: inherit;
    }


    #card-tag {
      margin-right: 10px;
    }
  }
}
</style>
