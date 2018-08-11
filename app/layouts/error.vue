<style lang="less" scoped>
  .container404{
      position: fixed;

      top: 0;
      width: 100%;
      height: 100%;
      background:#F4F4F4 url('~/static/404.png') no-repeat fixed center center / 404px;
  }
</style>

<template>
  <div class="container404">
    <h1 v-if="error.statusCode === 404">页面不存在de</h1>
    <h1 v-else>应用发生错误异常</h1>
    <div>{{error.message }}</div>
    <nuxt-link to="/">首 页</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ["error"],
  head: {
    title: '404',
    meta: [
      // {title:'错误'},
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" }
    ]
  }
};
</script>