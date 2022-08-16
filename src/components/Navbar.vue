<template>
  <div class="header-box">
    <a href="#home">
      <img :src=logoUrl class="logo">
    </a>
    <div class="header-link">
      <a href="/"><i class="iconfont icon-home2" /> 主页</a>
      <a href="/"><i class="iconfont icon-fenlei" /> 分类</a>
      <a href="/"><i class="iconfont icon-tianchongxing-" /> 标签</a>
      <a href="/"><i class="iconfont icon-shijian" /> 时间轴</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      circleUrl: "https://images.juwuhe.top/i/2022/08/12/xmpuo0-3.jpg",
      logoUrl: "https://images.juwuhe.top/i/2022/06/04/ibzp5h.png",
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
    margin: 0;
    padding: 0;
    display: flex;
    list-style-type: none; //去除点
    align-items: center; //y轴居中

  }

  a {

    color: black;
    text-align: center; //文本居中
    text-decoration: none; //去除下划线
    margin-left: 1.5rem;
    align-items: center;
  }
}
</style>