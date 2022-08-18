<template>
  <div class="wrapper">

    <!-- 头像/名字展示 -->
    <div class="main-box flex">
      <div class="name flex">
        <!--        <el-avatar class="avatar" :size="150" :src="circleUrl"/>-->
        <div style="margin-top:30px">
          <h1>居無何</h1>
        </div>
        <p>梦不会逃走，逃走的一直都是自己。</p>
      </div>
    </div>

    <!-- 导航栏 -->
    <div class="header">
      <el-affix :offset="0">
        <Navbar class="navbar" style="background-color: white"/>
      </el-affix>
    </div>

    <!-- 内容条 -->
    <div class="main-content">
      <div>
        <Card/>
      </div>
      <el-affix :offset="100">
        <CardInfo/>
      </el-affix>
    </div>
  </div>
  <!--分页-->
  <div class="page">
    <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000">
    </el-pagination>
  </div>

  <!-- 页脚 -->
  <div class="footer">
  <!--网站起始时间-->
  <!--公安备案-->
  </div>

</template>
<script>
import Navbar from "../../components/Navbar.vue";
import Card from "../../components/CardArticles.vue"
import CardInfo from "../../components/CardInfo.vue";

export default {
  components: {CardInfo, Card, Navbar},
  data() {
    return {
      circleUrl: "https://images.juwuhe.top/i/2022/08/12/xmpuo0-3.jpg",
      logoUrl: "https://images.juwuhe.top/i/2022/06/04/ibzp5h.png",
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
}
</script>
<style lang="scss" scoped>

.wrapper {
  //去除水平滚动条
  scrollbar-width: none;
  -ms-overflow-style: none;
  overflow-x: hidden;
  overflow-y: auto;
}

.name {
  color: white;
  font-family: 宋体;

  h1 {
    font-weight: 500;
    font-size: 2.5rem;
  }

  p {
    font-size: 1.6rem;
  }
}

.flex {
  display: flex;
}

.main-box {
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: url(https://w.wallhaven.cc/full/1k/wallhaven-1k6ljv.jpg) center/cover no-repeat;
}

.name {
  justify-content: center;
  align-items: center;
  flex-direction: column;
 /*
  body {
    background: black;
    color: #fff;
  }
  p{
    border-right: 0.1em solid;
    width: 16.5em;
    width: 26ch;
    margin: 2em 1em;
    white-space: nowrap;
    overflow: hidden;
    animation: typing 3s steps(26, end),
    cursor-blink 0.3s step-end infinite alternate;
  }
  }

  @keyframes typing {
    from {
      width: 0;
    }
  }

  @keyframes cursor-blink {
    50% {
      border-color: transparent;
    }*/
}

.main-content {
  margin: 30px 0px 30px;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
}

.navbar{
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

}

.page{
  display: flex;
  justify-content: center;
  margin: 50px 0px;
}

</style>