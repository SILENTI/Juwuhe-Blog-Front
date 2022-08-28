<template>
  <div class="common-layout">
    <!--导航栏-->
    <el-affix :offset="0">
      <Navbar class="navbar" style="background-color: white"/>
    </el-affix>
    <el-container class="container">
      <!--侧边栏-->
      <el-aside  class="container-aside">
        <el-col style="max-width: 100%" :span="12">
          <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon><location /></el-icon>
                <span>Navigator One</span>
              </template>
              <el-sub-menu index="1-4">
                <template #title>item four</template>
                <el-menu-item index="1-4-1">item one</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="2">
              <el-icon><icon-menu /></el-icon>
              <span>Navigator Two</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>

      <!--内容栏-->
      <el-main class="container-main">
        <el-empty description=" "/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Navbar from "../../components/front/Navbar.vue";

export default {
  name: "Classification",
  components: {Navbar},
  data() {
    return {}
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
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
  }

  .container-main {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

</style>
