<style lang="less" scoped>
</style>

<template>
  <div class="bbs">
    <mu-appbar style="width: 100%;" color="primary" :title="bbs.title">

      <mu-button icon slot="left" to="/">
        <mu-icon value="close"></mu-icon>
      </mu-button>

      <mu-button icon slot="right">
        <mu-icon value="delete"></mu-icon>
      </mu-button>

    </mu-appbar>
    <div class="quill-editor ql-container ql-snow" v-html="bbs.content">
    </div>
    <div class="quill-editor" v-model="bbs.content" v-quill:myQuillEditor="editorOption">
    </div>

  </div>
</template>

<script>


  export default {

    data() {
      return {
        title: "论坛",
        bbs: {
          title: "",
          content: ""
        },
        editorOption: {
          theme: 'snow',
          placeholder: 'Compose an epic...',

        }
      };
    },
    head() {
      return {
        title: this.title
      };
    },
    async asyncData({ app, params }) {
      if (!params.id) {
        return {
          bbs: {
            title: "无",
            content: "无内容"
          }
        };
      }
      var res = await app.$axios.$get(`/api/v1/bbs/get/${params.id}`, {
        // name: this.name,
        // pwd: this.pwd
      });
      return {
        bbs: res.data.length == 1 ? res.data[0] : {}
      };
    },
    methods: {},
    mounted() {
      // this.bbs()
    }
  };
</script>