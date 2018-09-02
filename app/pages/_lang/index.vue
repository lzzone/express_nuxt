<style lang="less" scoped>
.flex {
  flex: 1;
  a {
    color: red;
  }
}

.index {
  position: fixed;
  /* z-index: 1; */
  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .list {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;

    padding: 20px;

    .mu-load-more {
      max-width: 960px;
      margin: auto;
    }

    .titlename {
      display: block;
      padding: 5px 0;
      font-size: 18px;
    }
    .username{
        // text-align: right;
        a{
          color: rgba(0, 0, 0, 0.6)
        }
    }
    .content {
      text-indent: 32px;
      color: rgba(0, 0, 0, 0.6);
    }
    .list_item {
      padding: 10px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }
  }
}
</style>

<template>
  <div>
    <div class="index">
      <mu-appbar style="width: 100%;" color="primary">
        <mu-button icon slot="left" @click="open=true">
          <mu-icon value="menu"></mu-icon>
        </mu-button>
        adtk.cn
        <!-- {{locale}} -->
        

        <mu-button flat slot="right" to="/en" v-if="$store.state.locale!='en'">english</mu-button>
        <mu-button flat slot="right" to="/zh" v-if="$store.state.locale!='zh'">中文</mu-button>

        <mu-button v-if="$store.state.user.id" flat slot="right" :to="$i18n.path('home/'+$store.state.user.id)">{{$store.state.user.name}}</mu-button>

        <mu-button v-if="!$store.state.user.id" flat slot="right" :to="$i18n.path('user/login')">{{ $t('index.login') }}</mu-button>

        <!-- <mu-button v-else-if="$store.state.user" flat slot="right" @click="logout">{{ $t('index.logout') }}</mu-button> -->
      </mu-appbar>

      <div class="list">
        <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
          <div class="list_item" v-for="item of indexlist" :key="item.id">

                <a class="titlename" :href="$i18n.path('bbs/'+item.id)">{{item.title}}</a>
                <div  class="username">
                    <a :href="$i18n.path('home/'+item.user)">@{{item.username}}</a>
                </div>
              
                <div class="content">{{item.content.slice(0,200)}}</div>              
          </div>
          <div v-if="newDataLength==limit">
              <a :href="'./?offset='+offset">加载更多</a>
          </div>
          

          <div v-if="indexlist.length==0">暂无数据</div>

        </mu-load-more>
      </div>
    </div>

    <mu-drawer :open.sync="open" :docked="docked">
      <mu-list>
        <mu-list-item button  v-if="$store.state.user.id"  @click="logout">
          <mu-list-item-title>退出登录</mu-list-item-title>
        </mu-list-item>
        
        <mu-list-item @click="open = false" button>
          <mu-list-item-title>Close</mu-list-item-title>
        </mu-list-item>
      </mu-list>
      <!-- 蜀ICP备15007060号-1 -->
    </mu-drawer>

  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "adtk",
      indexlist: [],
      newDataLength:0,
      refreshing: false,
      loading: false,
      open: false,
      docked: false,

      limit: 15,
      offset: 0
    };
  },
  head() {
    return {
      title: this.title
    };
  },

  async asyncData({ query, app }) {
    let { data, errno } = await app.$axios.$get("/api/v1/bbs/get", {
      params: {
        offset: query.offset,
        desc:true
        // limit
      }
    });
    if (errno != 1) {
      // alert(response.data.msg);
      return;
    }
    return {
      indexlist: data,
      newDataLength:data.length,
      offset: query.offset ? parseInt(query.offset) + 15 : 15,
      limit: 15,
    };
  },

  methods: {
    logout() {
      this.$axios.$get("/api/v1/user/logout").then(res => {
        if (res.errno == 1) {
          this.$store.commit("SET_USER", {});
        }
      });
    },
    async load() {
      this.loading = true;
      let { data, errno,errmsg } = await this.$axios.$get("/api/v1/bbs/get", {
        params: {
          offset: this.offset,
          limit: this.limit,
          desc:true
        }
      });
      if (errno == 1) {
        this.indexlist = this.indexlist.concat(data);
        this.offset = this.offset + this.limit;
        this.newDataLength=data.length;
      }else{
        this.$toast.message(errmsg);
      }
      this.loading = false;
    },
    refresh() {
      this.refreshing = true;
      this.$refs.container.scrollTop = 0;
      setTimeout(() => {
        this.refreshing = false;
        // this.text = this.text === "List" ? "Menu" : "List";
      }, 2000);
    }
  },
  mounted() {}
};
</script>