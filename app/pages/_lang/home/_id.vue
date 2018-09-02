<style lang="less" scoped>
.homeContent {
  max-width: 940px;
  margin: 30px auto;
  padding: 0 20px;
}
.textRight {
  text-align: right;
}
</style>

<template>
  <div class="home">
    <mu-appbar style="width: 100%;" color="primary" :title="$store.state.user.name">

      <mu-button icon slot="left" to="/">
        <mu-icon value="home"></mu-icon>
      </mu-button>
      {{user.name}}的个人主页
      <!-- v-if="page.user==$store.state.user.id" -->
    </mu-appbar>
    <!-- {{$store.state.user}} -->

    <div class="homeContent">
        <!-- <div v-for="item of bbs" :key="item.id">{{item.title}}</div> -->
        <div class="list_item" v-for="item of bbs" :key="item.id">

                <a class="titlename" :href="$i18n.path('bbs/'+item.id)">{{item.title}}</a>
                <div  class="username">
                    <a :href="$i18n.path('home/'+item.user)">@{{item.username}}</a>
                </div>
              
                <div class="content">{{item.content.slice(0,200)}}</div>              
          </div>
    </div>


  </div>
</template>

<script>

export default {
  data() {
    return {
      title: "加载中...",
      user:{},
      bbs:[],
      page:{}
    };
  },
  head() {
    return {
      title: this.user.name+"的个人主页" || this.title,
    };
  },
  async asyncData({ app, params }) {
    if (!params.id&&parseInt(params.id)) {
      return;
    }
    var user = await app.$axios.$get(`/api/v1/user/userinfo/${parseInt(params.id)}`);
    var bbs_res = await app.$axios.$get(`/api/v1/bbs/get/`,{
      params:{
        uid:params.id,
        // limit:2,
        offset:0,
        desc:true
      }
    });
    return {
      bbs: bbs_res.data,
      user:user.data
    };
  },

  methods: {},
  mounted() {  }
};
</script>