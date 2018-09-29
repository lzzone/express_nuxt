<style lang="less" scoped>
input,
textarea {
    width: 100%;
    // display: block;
    box-sizing: border-box;
}

textarea {
    //  height: 100%;
    height: 395px;
}

.inputTitle {
    padding: 0 20px;
}
.inputTitle input {
    padding: 10px;
    border-bottom: 1px solid #333;
}
.inputContent,
.outContent {
    width: 50%;
    float: left;
    height: 400px;
    overflow-y: auto;
    padding: 0 0px 0 20px;
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

      <mu-button slot="right" v-if="$store.state.user.id" @click="add">
        发布
      </mu-button>

    </mu-appbar>

    <div>
      <div class="inputTitle">
        <input type="text" v-model="bbs.title" placeholder="请输入标题" />

        </div>
        <div class="inputContent">
          <div>
            <textarea v-model="bbs.content" placeholder="请输入正文"></textarea>
          </div>

        </div>
        <div class="outContent">
          <div class="markdown-body" v-html="bbsContent"></div>
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
                '<pre class="hljs"><code>' +
                md.utils.escapeHtml(str) +
                "</code></pre>"
            );
        }
    });
}

export default {
    data() {
        return {
            title: "发帖",
            bbs: {
                title: "",
                content: "无内容"
            }
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
                    src:
                        "https://cdn.bootcss.com/markdown-it/8.4.1/markdown-it.min.js"
                },
                {
                    src:
                        "https://cdn.bootcss.com/highlight.js/9.12.0/highlight.min.js"
                }
            ]
        };
    },
    async asyncData({ app, query }) {
        if (!query.id) {
            return;
        }
        var bbs_res = await app.$axios.$get(`/api/v1/bbs/get/${query.id}`);
        console.log(bbs_res);
        return {
            bbs:
                bbs_res.errno == 1 && bbs_res.data.length == 1
                    ? bbs_res.data[0]
                    : {}
        };
    },
    computed: {
        bbsContent() {
            if (process.browser) {
                return md.render(this.bbs.content || "");
            } else {
                return this.bbs.content || "";
            }
        }
    },
    methods: {
        async add() {
            var data = await this.$axios.$post(`/api/v1/bbs/add`, {
                class_id: 1,
                title: this.bbs.title,
                content: this.bbs.content
            });
            this.$toast.message(data.errmsg);
        }
    },
    mounted() {}
};
</script>