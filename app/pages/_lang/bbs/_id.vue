<style lang="less" scoped>
.bbsContent {
  max-width: 940px;
  margin: 30px auto;
  padding: 0 20px;
}
.textRight {
  text-align: right;
}
</style>

<template>
  <div class="bbs">
    <mu-appbar style="width: 100%;" color="primary" :title="bbs.title">

      <mu-button icon slot="left" :to="$i18n.path('')">
        <mu-icon value="close"></mu-icon>
      </mu-button>

      <mu-button slot="right" v-if="bbs.user==$store.state.user.id">
        上首页
      </mu-button>
      <mu-button slot="right" v-if="bbs.user==$store.state.user.id">
        编辑
      </mu-button>

      <mu-button icon slot="right" v-if="bbs.user==$store.state.user.id||$store.state.user.is_admin==1">
        <mu-icon value="delete"></mu-icon>
      </mu-button>

    </mu-appbar>
    <!-- {{$store.state.user}} -->
    <div class="bbsContent">
      <div class="markdown-body" v-html="bbsContent"></div>

      <div class="evaluate textRight">
          <mu-button color="primary" @click="addCollect">
            收藏
            <mu-icon value="favorite_border" right></mu-icon>
          </mu-button>
          <!-- <mu-button color="red">
            质量低
            <mu-icon value="delete_sweep" right></mu-icon>
          </mu-button> -->
      </div>

       <mu-text-field v-model="reply" multi-line :rows="4" :rows-max="8" full-width placeholder="这里是可以输入评论的"></mu-text-field>
       <div class="textRight">
        <mu-button color="primary" @click="replyBtn">
          Send
          <mu-icon right  value="send"></mu-icon>
        </mu-button>
       </div>
      <div class="replyArr" v-for="(item,index) of replyArr" :key="item.id">

                <div>{{replyArr.length-index}}楼，{{item.name}}</div>
                <div> {{item.reply_content}}</div>
                <mu-divider></mu-divider>


      </div>
    </div>

  </div>
</template>

<script>
if (process.browser) {
  require("~/assets/markdown.css");
  // var hljs = require("highlight.js");
  // var MarkdownIt = require("markdown-it");
  var md = window.markdownit({
    highlight: function(str, lang) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlightAuto(str).value +
          "</code></pre>"
        );
      } catch (__) {}
      return (
        '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
      );
    }
  });
}

export default {
  data() {
    return {
      title: "论坛",
      bbs: {
        title: "",
        content: "无内容"
      },
      editorOption: {
        theme: "snow",
        placeholder: "Compose an epic..."
      },
      reply: "",
      replyArr: []
    };
  },
  head() {
    return {
      title: this.bbs.title || this.title,
      link: [
        {
          rel: "stylesheet",
          href:
            " https://cdn.bootcss.com/highlight.js/9.12.0/styles/monokai.min.css"
        }
      ],
      script: [
        {
          src: "https://cdn.bootcss.com/markdown-it/8.4.1/markdown-it.min.js"
        },
        {
          src: "https://cdn.bootcss.com/highlight.js/9.12.0/highlight.min.js"
        }
      ]
    };
  },
  async asyncData({ app, params }) {
    if (!params.id) {
      return;
    }
    var bbs_res = await app.$axios.$get(`/api/v1/bbs/get/${params.id}`);
    var bbs_reply_res = await app.$axios.$get(`/api/v1/reply/get/${params.id}`);
    console.log(bbs_res);
    return {
      bbs: bbs_res.data.length == 1 ? bbs_res.data[0] : {},
      replyArr: bbs_reply_res.data
    };
  },
  computed: {
    bbsContent() {
      if (process.browser) {
        return md.render(this.bbs.content);
      } else {
        return this.bbs.content;
      }
    }
  },
  methods: {
    async replyBtn() {
      var add_reply = await this.$axios.$post(`/api/v1/reply/add`, {
        bbsid: this.bbs.id,
        reply_content: this.reply
      });
      this.$toast.message(add_reply.errmsg);
    },
    async addCollect() {
      // 添加收藏
      var add_Collect = await this.$axios.$post(`/api/v1/collect/add`, {
        bbsid: this.bbs.id,
      });
      this.$toast.message(add_Collect.errmsg);
    }

  },
  mounted() {
    // this.bbs()
  }
};
</script>