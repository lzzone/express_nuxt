<style lang="less" scoped>
.register {
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
  <div class="register">
    <h3>注册</h3>
    <div class="row">
      <input type="text" class="text" autocomplete="off" name="name" maxlength="20" v-model="name" placeholder="昵称">
    </div>
    <!-- <div class="row">
            <input type="text" class="text" autocomplete="off" name="name" v-model="name" placeholder="邮箱">
        </div> -->
    <div class="row">
      <input type="password" class="text" autocomplete="off" name="pwd" maxlength="20" v-model="pwd" placeholder="密码">
    </div>

    <div class="row">
      <!-- <mu-button color="primary" @click="email">email</mu-button> -->
      <input type="button" class="button dark submit" @click.stop.prevent="register()" value="账号注册">
    </div>
    <div class="row right">
      <span class="text light">已有帐号，</span>
      <a href="./login" class="text dark">立即登录</a>
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
      title: "注册"
    };
  },
  head() {
    return {
      title: this.title,
      script: [
        {
          src: "https://cdn.bootcss.com/blueimp-md5/2.10.0/js/md5.min.js"
        }
      ]
    };
  },
  methods: {
    // async email() {
    //   var data = await this.$axios.$post("/api/v1/user/sendMail", {
    //     name: this.name
    //   });
    //   if (data.errno == 1) {
    //     this.$toast.message(data.errmsg);
    //   } else {
    //     this.$toast.message(data.errmsg);
    //   }
    // },
    async register() {
      if (!this.name || this.name.length > 20) {
        this.$toast.message("请输入账号");
        return;
      }
      if (!this.pwd || this.pwd.length > 60) {
        this.$toast.message("请输入密码");
        return;
      }
      var data = await this.$axios.$post("/api/v1/user/register", {
        name: this.name,
        pwd: md5(md5(md5(this.pwd)))
      });
      if (data.errno == 1) {
        this.$toast.message(data.errmsg);
        this.$router.replace("./login");
      } else {
        this.$toast.message(data.errmsg);
      }
    }
  },
  mounted() {}
};
</script>