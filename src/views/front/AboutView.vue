<template>
  <!--导航栏-->
  <el-affix :offset="0">
    <Navbar class="navbar" style="background-color: white"/>
  </el-affix>
  <!--内容-->
  <div class="main-about">
    <div class="main-img">
      <el-avatar class="avatar" :size="150" :src="circleUrl"/>
      <h1 style="color: white;margin-bottom: -47px;">居無何</h1>
    </div>
    <div class="main-content">
      <h2>一个只想努力搬砖的程序员</h2>
    </div>

  </div>

</template>

<script>
import Navbar from "../../components/front/Navbar.vue";

export default {
  articleTitle: "AboutView",
  components: {Navbar},
  data() {
    return {
      aboutBackURL: "https://w.wallhaven.cc/full/l3/wallhaven-l35jjp.jpg",
      circleUrl: "/public/image/avatar-1.jpg",

    }
  }
}
</script>

<style lang="scss" scoped>

.main-about {
  width: 100vw;

  .main-img {
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url(https://w.wallhaven.cc/full/e7/wallhaven-e7xw6w.png) center/cover no-repeat;
  }

  .main-content{
    display: flex;
    justify-content: center;
    margin: 5%;
  }

}

</style>
