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
      max-width: 960px;
      margin:auto;
      -webkit-overflow-scrolling: touch;
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
        {{$store.state.user.name}}

        <mu-button flat slot="right" to="/en" v-if="$store.state.locale!='en'">english</mu-button>
        <mu-button flat slot="right" to="/zh" v-if="$store.state.locale!='zh'">中文</mu-button>

        <mu-button v-if="!$store.state.user.id" flat slot="right" :to="$i18n.path('user/login')">{{ $t('index.login') }}</mu-button>

        <mu-button v-else-if="$store.state.user" flat slot="right" @click="logout">{{ $t('index.logout') }}</mu-button>
      </mu-appbar>

      <div class="list">
        <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
          <div v-for="item of indexlist" :key="item.id">
            <!-- <mu-list-item> -->
              <!-- <mu-list-item-title> -->
                <a :href="$i18n.path('bbs/'+item.id)">{{item.title}}</a>
                <div>{{item.content.slice(0,200)}}</div>
              <!-- </mu-list-item-title> -->
            <!-- </mu-list-item> -->
            <mu-divider></mu-divider>
          </div>

        </mu-load-more>
      </div>
    </div>

    <mu-drawer :open.sync="open" :docked="docked">
      <mu-list>
        <mu-list-item button>
          <mu-list-item-title>Menu Item 1</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-title>Menu Item 2</mu-list-item-title>
        </mu-list-item>
        <mu-list-item @click="open = false" button>
          <mu-list-item-title>Close</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-drawer>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: "adtk",
        indexlistFn: [],
        refreshing: false,
        loading: false,
        open: false,
        docked: false
      };
    },
    head() {
      return {
        title: this.title
      };
    },

    async asyncData({ store, query, app }) {
      let { data, errno } = await app.$axios.$get("/api/v1/bbs/get");
      if (errno != 1) {
        // alert(response.data.msg);
        return;
      }
      return { indexlist: data }
    },


    methods: {
      logout() {
        this.$axios.$get("/api/v1/user/logout").then(res => {
          if (res.errno == 1) {
            this.$store.commit("SET_USER", {});
          }
        });
      },
      load() {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.num += 10;
        }, 2000)
      },
      refresh() {
        this.refreshing = true;
        this.$refs.container.scrollTop = 0;
        setTimeout(() => {
          this.refreshing = false;
          this.text = this.text === 'List' ? 'Menu' : 'List';
          this.num = 10;
        }, 2000)
      },

    },
    mounted() { }
  };
</script>