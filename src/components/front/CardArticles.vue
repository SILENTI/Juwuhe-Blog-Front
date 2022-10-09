<template>
  <div class="card-main" v-for="(article, index) in this.articleList">
    <div class="card-image">
      <img :src=article.articleImg>
    </div>
    <div class="card-text">
      <a href="/front/articlesDetail">
        <h1>{{ article.articleTitle }}</h1>
        <p>{{ article.articleDescription }}</p>
      </a>
      <div class="card-tag">
        <a href=""><i class="iconfont icon-jurassic_user"/>居無何</a>
        <a href=""><i class="iconfont icon-shijian"/>{{ new Date(article.articleDate).toLocaleDateString() }}</a>
        <div>
          <i class="iconfont icon-tianchongxing-"/>
          <a id="card-tag" href=""
             v-for="label in getLabelNames(article.labelVOList)">
            {{ label }}
          </a>
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
  width: 300px;
  height: 200px;

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

    #card-tag {
      margin-right: 10px;
    }
  }
}
</style>
