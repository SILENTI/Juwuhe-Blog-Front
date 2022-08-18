<template>
  <!--导航栏-->
  <el-affix :offset="0">
    <Navbar class="navbar" style="background-color: white"/>
  </el-affix>

  <!--标签页-->
  <div class="main-tag">
    <el-button class="button" v-for="i in 20" type="primary">标签{{ i }}</el-button>
  </div>

  <div class="main-content">
    <!--页面展示-->
    <CardArticles/>
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
  </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
import CardArticles from "../../components/CardArticles.vue";

export default {
  name: "TagView",
  components: {Navbar, CardArticles},
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  data() {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    };
  }
}
</script>

<style lang="scss" scoped>

.main-tag {
  margin: 20px 10%;
  display: flex;
  flex-wrap: wrap;

  .button {
    margin: 5px;
  }
}

.main-content {
  padding: 50px 10%;

  .page{
    display: flex;
    justify-content: center;
    margin: 50px 0px;
  }
}

</style>