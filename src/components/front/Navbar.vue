<template>
  <div class="header-box">
    <!--Logo-->
    <a href="/">
      <img :src=logoUrl class="logo">
    </a>
    <div class="header-link">
      <div class="header-input">
        <el-input @keyup.enter.native="searchArticles(input)" v-model="input"></el-input>
      </div>
      <a href="/"><i class="iconfont icon-home2"/> 主页</a>
      <a href="/front/classify"><i class="iconfont icon-fenlei"/> 分类</a>
      <a href="/front/tag"><i class="iconfont icon-tianchongxing-"/> 标签</a>
      <a href="/front/axis"><i class="iconfont icon-shijian"/> 时间轴</a>
      <a href="/front/guestbook"><i class="iconfont icon-liuyanfill"/> 留言墙</a>
      <a href="/front/about"><i class="iconfont icon-jurassic_user"/> 关于我</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      circleUrl: "https://images.juwuhe.top/i/2022/08/12/xmpuo0-3.jpg",
      logoUrl: "https://images.juwuhe.top/i/2022/06/04/ibzp5h.png",
      input: '',
    }
  },
  methods: {
    searchArticles(input){
      console.log(input)
    }
  }
}
</script>

<style lang="scss" scoped>
// 导航栏
.header-box {
  padding: .7rem 1.5rem;
  display: flex; //弹性盒子
  align-items: center; //y轴居中
  justify-content: space-between;

  .logo {
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%; //圆角
  }

  ul {
    margin: 0;
    padding: 0;
    display: flex;
    list-style-type: none; //去除点
    align-items: center; //y轴居中
  }

  .header-link {
    padding: 0;
    display: flex;
    list-style-type: none; //去除点
    align-items: center; //y轴居中

    .header-input {
      margin-right: 20px;
    }

    a {
      margin: 10px;
    }
  }

  a {
    color: black;
    text-align: center; //文本居中
    text-decoration: none; //去除下划线
  }
}
</style>
