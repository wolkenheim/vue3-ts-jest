<template>
  <div>New Post</div>
  <post-writer :post="post" />
</template>

<script lang="ts">
import moment from "moment";
import { defineComponent } from "vue";
import PostWriter from "./PostWriter.vue";
import { Post } from "./types";
export default defineComponent({
  name: "NewPost",
  components: {
    PostWriter,
  },
  setup() {
    const post: Post = {
      id: -1,
      title: "yep",
      authorId: 1,
      created: moment(),
      markdown: "## New Post\nEnter your post here",
      html: "",
    };

    return {
      post,
    };
  },
});
</script>