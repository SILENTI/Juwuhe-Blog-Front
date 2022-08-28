<template>
  <div class="common-layout">

    <!--侧边栏-->
    <el-menu
        :default-active="this.$route.path"
        active-text-color="#79bbff"
        background-color="#545c64"
        text-color="#fff"
        class="el-menu-vertical"
        :collapse="isCollapse"
        @open="handleOpen"
        style="height: 100%"
        :router='true'
    >
      <el-menu-item index="/back/home">
        <template #title>
          主页
        </template>
        <el-icon>
          <HomeFilled/>
        </el-icon>
      </el-menu-item>
      <el-sub-menu index="2">
        <template #title>
          <el-icon>
            <Menu/>
          </el-icon>
          <span>文章管理</span>
        </template>
        <el-menu-item index="/back/home/editor">文章发布</el-menu-item>
        <el-menu-item index="/back/home/articlesList">文章列表</el-menu-item>
        <el-menu-item index="2-3">分类管理</el-menu-item>
        <el-menu-item index="2-4">标签管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <el-icon>
            <MessageBox/>
          </el-icon>
          <span>消息管理</span>
        </template>
        <el-menu-item index="3-1">评论管理</el-menu-item>
        <el-menu-item index="3-2">留言管理</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="4">
        <template #title>图库管理</template>
        <el-icon>
          <PictureFilled/>
        </el-icon>
      </el-menu-item>
      <el-menu-item index="5">
        <template #title>用户管理</template>
        <el-icon>
          <UserFilled/>
        </el-icon>
      </el-menu-item>
    </el-menu>
    <el-container>

      <!--导航栏-->
      <el-header class="header">
        <el-button v-on:click="changeSidebar">
          <el-icon>
            <Expand v-if="this.isCollapse"/>
            <Fold v-else/>
          </el-icon>
        </el-button>
      </el-header>

      <!--主内容-->
      <el-main class="main">
        <RouterView/>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import {
  Location,
  Expand,
  HomeFilled,
  UserFilled,
  PictureFilled,
  MessageBox,
  Setting,
  Fold,
  Menu,
  Document
} from '@element-plus/icons-vue'

export default {
  name: "HomeView",
  components: {
    Location, Expand, Fold, HomeFilled, UserFilled, MessageBox, PictureFilled, Setting, Menu, Document
  },
  data() {
    return {
      isCollapse: false,
      sidebar: 'sidebar',
    }
  },
  methods: {
    changeSidebar() {
      this.sidebar === 'sidebar' ? this.sidebar = 'noSidebar' : this.sidebar = 'sidebar';
      this.isCollapse ? this.isCollapse = false : this.isCollapse = true;
    },
    handleOpen(key) {
      console.log(key);
    },
  }
}
</script>

<style lang="scss" scoped>

.common-layout {
  width: 100vw;
  height: 100vh;
  display: flex;

  .header {
    display: flex;
    align-items: center;
  }

  .el-menu-vertical:not(.el-menu--collapse) {
    width: 250px;
    height: 100vh;
  }

  .main{
    height: 100%;
    width: 100%;
  }

}

</style>
