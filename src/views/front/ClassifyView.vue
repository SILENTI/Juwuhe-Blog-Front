<template>
  <div class="common-layout">
    <!--导航栏-->
    <el-affix :offset="0">
      <Navbar class="navbar" style="background-color: white"/>
    </el-affix>
    <el-container class="container">
      <!--侧边栏-->
      <el-aside class="container-aside">
        <el-row class="tac">
          <el-col >
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
            >
              <el-sub-menu index="1">
                <template #title>
                  <span>Navigator One</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">item one</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="1-2">
                  <template #title>item four</template>
                  <el-menu-item index="1-2-1">item one</el-menu-item>
                </el-sub-menu>
              </el-sub-menu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <!--内容栏-->
      <el-main class="container-main">
        <el-empty description=" "/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue";

export default {
  name: "Classification",
  components: {Navbar},
  data() {
    return {}
  }
}

</script>

<style lang="scss" scoped>

.common-layout {
  height: 100vh;
}

.container {
  width: 100%;
  height: 100%;

  .container-aside {
    padding: 20px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    //background-color: antiquewhite;
  }

  .container-main {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

</style>