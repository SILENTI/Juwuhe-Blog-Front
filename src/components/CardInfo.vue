<template>
<!--  <div class="main">-->
    <div class="Card-Info">
      <!--头像-->
      <div class="avatar">
        <img :src="AvatarUtl">
      </div>
      <!--名字-->
      <h2>居無何</h2>
      <p class="p-text">一个努力板砖的程序员</p>
      <!--联系方式-->
      <div class="contact">
        <a target="_blank" :href="GitHubUrl"><i class="iconfont icon-github-fill"/></a>
        <a href="mailto: fruitboxs@outlook.com"><i class="iconfont icon-youxiang"/></a>
      </div>

      <!--文章数量-->
      <div class="num">
        <div class="article-num">
          <a href="">
            <h3>10</h3>
            <h3>文章</h3>
          </a>
        </div>
        <div class="tag-num">
          <a href="">
            <h3>10</h3>
            <h3>标签</h3>
          </a>
        </div>
      </div>

      <!--分类和标签展示-->
      <div class="category-tag">
        <a href="">分类</a>
        <a href="">标签</a>
      </div>

    </div>
<!--  </div>-->
</template>

<script>
export default {
  name: "CardInfo",
  data() {
    return {
      AvatarUtl: "https://images.juwuhe.top/i/2022/08/12/xmpuo0-3.jpg",
      GitHubUrl: "https://github.com/SILENTI",
    }
  }
}
</script>

<style lang="scss" scoped>

body {
  background: black;
  color: #fff;
}

.main {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}

.Card-Info {
  //background-color: antiquewhite;
  margin: 10px 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-family: 宋体;
  padding: 20px;

  a {
    color: black;
    text-decoration: none; //去除下划线
    align-items: center;
  }

  h2 {
    margin: 5px;
  }

  .avatar img {
    border-radius: 100%;
    height: 110px;
    width: 110px;
    object-fit: cover;
    object-position: center;
  }

  .contact {
    width: auto;
    height: auto;

    a, i {
      font-size: 1.2em;
      margin: 5px;
    }
  }

  .num {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 20px 10px 20px;

    div > a > h3 {
      text-align: center;
      margin: 5px 20px 5px;
    }

    .article-num {
      border-right: 1px solid black;
    }
  }
  .category-tag{
    width: 300px;
    font-size: 1em;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-items: center;
    justify-content: space-evenly;
  }

  .p-text{
    border-right: 0.1em solid;
    width: 16.5em;
    width: 20ch;
    margin: 2em 1em;
    white-space: nowrap;
    overflow: hidden;
    animation: typing 3s steps(26, end),
    cursor-blink 0.3s step-end infinite alternate;
  }

  @keyframes typing {
    from {
      width: 0;
    }
  }

  @keyframes cursor-blink {
    50% {
      border-color: transparent;
    }
  }

}

</style>