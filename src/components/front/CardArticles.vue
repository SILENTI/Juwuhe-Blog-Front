<template>
  <div class="card-main" v-for="article in articleList">
    <div class="card-image">
      <img :src=imageURL>
    </div>
    <div class="card-text" >
      <a href="/front/articlesDetail">
        <h1>{{article.articleTitle}}</h1>
        <p>年度总结前言今天是2022年7月19日，距离我第一次正式建立网站已经过去了381天（2021.7.3 2...</p>
      </a>
      <div class="card-tag">
        <a href=""><i class="iconfont icon-jurassic_user"/>居無何</a>
        <a href=""><i class="iconfont icon-shijian"/>{{new Date(article.articleDate).toLocaleDateString()}}</a>
        <div>
          <i class="iconfont icon-tianchongxing-"/><a id="card-tag" href="" v-for="label in article.labelsVOList" >{{label.labelName}}</a>
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
      default: [{
        articleTitle: 'Java基础',
        articleDate: '2022-8-20',
        labelsVOList:[{labelName: 'Java'}]
      }],
    },
  },
  data() {
    return {
      imageURL: "https://w.wallhaven.cc/full/e7/wallhaven-e7kpl8.png",
    }
  }
}
</script>

<style lang="scss" scoped>

.card-main {
  //background-color: antiquewhite;
  display: flex;
  font-family: 宋体;
  margin: 0px 10px 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  a {
    color: black;
    text-decoration: none; //去除下划线
    align-items: center;
  }
}

.card-image {
  display: flex;
  align-items: center;
  max-width: 300px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.card-text {
  max-width: 500px;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;

  .card-tag {
    display: flex;
    align-items: center;
    i {
      margin-right: 2px;
    }
    a {
      margin-right: 20px;
    }
    #card-tag{
      margin-right: 10px;
    }
  }
}
</style>
