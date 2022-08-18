<template>
  <div class="card-main" v-for="item in 10">
    <div class="card-image">
      <img :src=imageURL>
    </div>
    <div class="card-text">

      <a href="">
        <h1>这是一篇博客</h1>
        <p>年度总结前言今天是2022年7月19日，距离我第一次正式建立网站已经过去了381天（2021.7.3 2...</p>
      </a>
      <div class="card-tag">
        <a href=""><i class="iconfont icon-jurassic_user"/>居無何</a>
        <a href=""><i class="iconfont icon-shijian"/>2022-8-16</a>
        <div><i class="iconfont icon-tianchongxing-"/><a id="card-tag" href="">标签</a><a id="card-tag" href="">标签</a></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
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
      margin-right: 5px;
    }
  }
}
</style>