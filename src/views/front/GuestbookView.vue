<template>

  <div class="guestbook">

    <!--导航栏-->
    <div>
      <Navbar class="navbar" style="background-color: white"/>
    </div>

    <div class="message-main">
      <!--留言展示-->
      <div class="container">

      </div>

      <!--留言信息-->
      <div class="message-input">

        <div class="input-main">

          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="guestbook.guestbookName" style="width: 100px;" placeholder="昵称"/>
            </el-form-item>
            <el-form-item>
              <el-input v-model="guestbook.guestbookMessage" style="width: 250px; " placeholder="留言"/>
            </el-form-item>
            <el-form-item>
              <el-button @click="addGuestBook">发送</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import Navbar from "@/components/front/Navbar.vue";
export default {
  name: "Guestbook",
  components: {Navbar},
  data() {
    return {
      guestbookList: [
        {
          'guestbookMessage': 'Hello Word ！！！',
          'guestbookName': 'TEST'
        }, {
          'guestbookMessage': 'Hello Word ！！！',
          'guestbookName': 'TEST'
        }, {
          'guestbookMessage': 'Hello Word ！！！',
          'guestbookName': 'TEST'
        }, {
          'guestbookMessage': 'Hello Word ！！！',
          'guestbookName': 'TEST'
        }, {
          'guestbookMessage': 'Hello Word ！！！',
          'guestbookName': 'TEST'
        }, {
          'guestbookMessage': 'Hello Word ！！！',
          'guestbookName': 'TEST'
        }, {
          'guestbookMessage': 'Hello Word ！！！',
          'guestbookName': 'TEST'
        }, {
          'guestbookMessage': 'Hello Word ！！！',
          'guestbookName': 'TEST'
        }, {
          'guestbookMessage': 'Hello Word ！！！',
          'guestbookName': 'TEST'
        }, {
          'guestbookMessage': 'Hello Word ！！！',
          'guestbookName': 'TEST'
        }, {
          'guestbookMessage': 'Hello Word ！！！',
          'guestbookName': 'TEST'
        }, {
          'guestbookMessage': 'Hello Word ！！！',
          'guestbookName': 'TEST'
        },
      ],
      guestbook: {
        'guestbookName': '',
        'guestbookMessage': '',
      }
    }
  },
  computed() {
    this.guestBookRoll()
  },
  methods: {

    //添加弹幕
    addGuestBook() {
      console.log(this.guestbook)
    },

    //弹幕滚动
    guestBookRoll() {
      const container = document.getElementsByClassName('container');
    }
  }
}
</script>

<style lang="scss" scoped>

.guestbook {
  width: 100vw;
  height: 100vh;
  background: url('https://w.wallhaven.cc/full/0w/wallhaven-0w8eg6.jpg') center/cover no-repeat;
}

.navbar {
  //背景阴影
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.message-main {
  width: 100%;
  height: calc(100% - 60.927px);

  box-sizing: inherit;
}

.container {
  width: 100%;
  height: 88%;
  overflow: hidden;
}

.message-input {
  width: 100%;
  height: 12%;
  display: flex;
  justify-content: center;
}

.input-main {
  display: flex;
  align-items: center;


}

</style>

