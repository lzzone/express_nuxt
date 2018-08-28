<style lang="less" scoped>
.bbsContent {
  max-width: 650px;
  margin: 30px auto;
  padding: 0 20px;
}
</style>

<template>
  <div class="bbs">
    <mu-appbar style="width: 100%;" color="primary" :title="bbs.title">

      <mu-button icon slot="left" to="/">
        <mu-icon value="close"></mu-icon>
      </mu-button>

      <mu-button slot="right" v-if="bbs.user==$store.state.user.id||$store.state.user.is_admin==1">
        编辑
      </mu-button>
      <mu-button icon slot="right" v-if="bbs.user==$store.state.user.id||$store.state.user.is_admin==1">
        <mu-icon value="delete"></mu-icon>
      </mu-button>

    </mu-appbar>
    <!-- {{$store.state.user}} -->
    <div class="bbsContent markdown-body" v-html="bbsContent">

    </div>

  </div>
</template>

<script>
// import '/highlight.js/styles/monokai-sublime.css'
import '~/assets/markdown.css'

var hljs = require("highlight.js");
var MarkdownIt = require("markdown-it");
var md = new MarkdownIt({
  highlight: function (str, lang) {
      try {
        return '<pre class="hljs"><code>' +
              hljs.highlightAuto(str).value +
               '</code></pre>';
      } catch (__) {}

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

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
      }
    };
  },
  head() {
    return {
      title: this.title,
      link: [
            {
                rel: "stylesheet",
                href:" https://cdn.bootcss.com/highlight.js/9.12.0/styles/monokai.min.css"
            },
        ]
    };
  },
  async asyncData({ app, params }) {
    if (!params.id) {
      return;
    }
    var res = await app.$axios.$get(`/api/v1/bbs/get/${params.id}`, {
      // name: this.name,
      // pwd: this.pwd
    });
    return {
      bbs: res.data.length == 1 ? res.data[0] : {}
    };
  },
  computed: {
    bbsContent() {
      return md.render(this.bbs.content);
    }
  },
  methods: {},
  mounted() {
    // this.bbs()
  }
};
</script>