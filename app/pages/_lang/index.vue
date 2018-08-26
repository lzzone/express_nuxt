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
            {{$store.state.user.name}}
            
            <mu-button flat slot="right" to="/en" v-if="locale!='en'">english</mu-button>
            <mu-button flat slot="right" to="/zh" v-if="locale!='zh'">中文</mu-button>

            <mu-button v-if="!$store.state.user.id"  flat slot="right" to="./user/login">{{ $t('index.login') }}</mu-button>
            <!-- href="./api/v1/user/logout" -->
            <mu-button v-else-if="$store.state.user" flat slot="right" @click="logout" >{{ $t('index.logout') }}</mu-button>
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

        <div v-for="item of indexlist" :key="item.id">
            <!-- <div>{{item.title}}</div> -->
            <a :href="'./bbs/'+item.id">{{item.title}}</a>
             <mu-divider></mu-divider>
        </div>

    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    data() {
    return {
      title: "adtk",
      open: false,
      docked: false
    };
  },
  head() {
    return {
      title: this.title
    };
  },
  fetch({ store, query,app }) {
    // 返回promise对象
    return app.$axios.$get("/api/v1/bbs/get")
      .then(function(response) {
        console.log(response)
        if (response.errno != 1) {
          // alert(response.data.msg);
          return;
        }
        store.commit("indexlistFn", response.data);
      });
  },
  computed: {
    ...mapState(["counter", "indexlist",'locale'])
  },

  methods: {
    logout(){
      this.$axios.$get('/api/v1/user/logout').then(res=>{
        if(res.errno==1){
            this.$store.commit('SET_USER',{})
        }

      })
    }
  },
  mounted() {
    var i = 0;
    console.log(this.indexlist);
  }
};
</script>