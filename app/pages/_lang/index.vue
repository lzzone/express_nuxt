<style lang="less" scoped>
.flex {
  flex: 1;
  a {
    color: red;
  }
}
</style>

<template>
    <div>
        <mu-appbar style="width: 100%;" color="primary">
            <mu-button icon slot="left" @click="open=true">
                <mu-icon value="menu"></mu-icon>
            </mu-button>
            adtk.cn
            <!-- {{locale}} -->
            <mu-button flat slot="right" to="/en" v-if="locale!='en'">english</mu-button>
            <mu-button flat slot="right" to="/zh" v-if="locale!='zh'">中文</mu-button>

            <mu-button flat slot="right" to="./user/login">{{ $t('index.login') }}</mu-button>
            <mu-button flat slot="right" to="./api/v1/user/logout">{{ $t('index.logout') }}</mu-button>
            <a href="/api/v1/user/logout">luyou</a>
        </mu-appbar>

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

        <p>
            {{ $t('index.title') }}
            <mu-button color="primary">Primary</mu-button>
            <button @click="increment">{{ counter }}</button>
            
            <br> {{$store.state.user.name}}
            
            <!-- <nuxt-link to="/about">About</nuxt-link> -->
        </p>
        <div v-for="item of indexlist" :key="item.id">
            {{item.title}}
        </div>

    </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

var url = "https://adtk.cn";

export default {
  head() {
    return {
      title: this.title
    };
  },
  fetch({ store, query }) {
    // 返回promise对象
    return axios
      .get(url + "/bbs/get?getTime=" + parseInt(Date.now() / 10000), {
        params: {
          page: 1,
          bbs_class: query.bbs_class || ""
        }
      })
      .then(function(response) {
        if (response.data.errno != 1) {
          // alert(response.data.msg);
          return;
        }
        store.commit("indexlistFn", response.data.data);
      });
  },
  computed: {
    ...mapState(["counter", "indexlist",'locale'])
  },
  data() {
    return {
      title: "adtk",
      open: false,
      docked: false
    };
  },
  methods: {
    increment() {
      // this.$toast.message("hello world");
      this.$store.commit("increment");
      // console.log(this.$router)
    }
  },
  mounted() {
    var i = 0;
    console.log(this.indexlist);
  }
};
</script>