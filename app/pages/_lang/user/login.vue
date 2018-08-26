<style lang="less" scoped>
.login {
  max-width: 400px;
  margin: auto;
}
.row {
  overflow: hidden;
}

h3 {
  text-align: center;
  font-size: 16px;
  font-weight: normal;
  margin: 45px 0;
}

a {
  text-decoration: none;
  color: #111;
  font-size: 14px;
}

.row {
  margin-bottom: 20px;
}

input {
  width: 100%;
  height: 42px;
  box-sizing: border-box;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  resize: none;
  outline: none;
}

.button {
  height: 42px;
  line-height: 42px;
  font-size: 16px;
  background: #4a4a4a;
  padding: 0 25px;
  text-align: center;
  box-sizing: border-box;
  color: #fff;
  user-select: none;
}

.forget {
  float: right;
  text-align: right;
}

.row.right {
  text-align: right;
}

.text.light {
  color: #777;
}

#canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -10;
}
</style>

<template>
    <div class="login">
        <h3>登录</h3>
        <div class="row">
            <input type="text" class="text" autocomplete="off" name="name" v-model="name" placeholder="昵称">
        </div>
        <div class="row">
            <input type="password" class="text" autocomplete="off" name="pwd" v-model="pwd" placeholder="密码">
        </div>
        <div class="row">
            <a href="javascript:alert('别着急,找回密码功能我是不会开发的...')" class="forget text dark">忘记密码</a>
        </div>
        <div class="row">
            <input type="button" class="button dark submit" @click.stop.prevent="login()" value="账号登录">
        </div>
        <div class="row right">

            <span class="text light">还没有帐号，</span>
            <a href="./register" class="text dark">立即注册</a>
            <!-- <span id="qqLoginBtn">登录</span> -->
        </div>

    </div>
</template>

<script>
// import axios from "axios";
export default {
  data() {
    return {
      name: "",
      pwd: "",
      title:"登录"
    };
  },
  head() {
    return {
      title: this.title,
      // script: [
      //   {
      //     src: "https://connect.qq.com/qc_jssdk.js",
      //     "data-appid": "1105255719"
      //   }
      // ]
    };
  },
  methods: {
    async login() {
      var data = await this.$axios.$post("/api/v1/user/login", {
        name: this.name,
        pwd: this.pwd
      });
      if (data.errno == 1) {
        this.$toast.message(data.errmsg);
        // this.$router.replace('/');
        window.location.href = "../../";
      } else {
        this.$toast.message(data.errmsg);
      }
    }
  },
  mounted() {

  }
};
</script>