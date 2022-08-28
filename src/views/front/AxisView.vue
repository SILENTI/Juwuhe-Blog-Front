<template>
  <!--导航栏-->
  <el-affix :offset="0">
    <Navbar class="navbar" style="background-color: white"/>
  </el-affix>

  <!--时间轴-->
  <div class="main-axis">
    <el-timeline>
      <el-timeline-item size="large" color="#0bbd87" timestamp="2018/4/12" placement="top">
        <el-card>
          <h3>容我再努力努力，加大产量！！！</h3>
        </el-card>
      </el-timeline-item>
      <el-timeline-item v-for="i in 12" type="primary" timestamp="2018/4/12" placement="top">
        <el-card>
          <a href="">
            <h4>Update Github template</h4>
            <p>Tom committed 2018/4/{{i}}</p>
          </a>
        </el-card>
      </el-timeline-item>
      <el-timeline-item size="large" timestamp="2018/4/12" placement="top">
        <el-card>
          <h3>我是有点底线的！！！</h3>
          <h4>2020</h4>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>


<script>
import Navbar from "../../components/front/Navbar.vue"

export default {
  name: "AxisView",
  components: {Navbar},
}
</script>

<style lang="scss" scoped>

.main-axis{
  margin: 5% 20%;
  font-family: 宋体;

  a{
    color: black;
    text-decoration: none; //去除下划线
  }

  p{
    font-size: 1em;
  }
}

</style>
