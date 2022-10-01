<template>
  <div class="main-login">
    <div class="login-from">
      <div class="login-logo">Login</div>
      <div>
        <el-form class="login-content" size="medium" :inline="true" ref="form" :model="form" label-width="0px">
          <el-form-item>
            <el-input v-model="form.username" placeholder="账号" type="text"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import {login} from "../../api/admin";

export default {
  articleTitle: "LoginView",
  data() {
    return {
      labelPosition: 'right',
      form: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    onSubmit() {
      login(this.form).then(res => {
        console.log(res)
        if (res.success){
          this.$router.push("/back/home")
        }else {

        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.main-login {
  width: 100vw;
  height: 100vh;
  background: url(https://w.wallhaven.cc/full/e7/wallhaven-e7kejr.jpg) center/cover no-repeat;

  display: flex;
  align-items: center;
  justify-content: center;

  .login-from {
    width: 350px;
    height: 350px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: flex-start;

    .login-logo {
      margin: 8%;
      font-size: 6em;
      font-family: 汉仪瘦金书简;
    }

    .login-content {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      div {
        margin: 5px;
      }
    }

  }
}

</style>
