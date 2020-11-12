<template>
  <div>New Post</div>
  <post-writer :post="post" @save="save" />
</template>

<script lang="ts">
import moment from "moment";
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import PostWriter from "./PostWriter.vue";
import { useStore } from "./Store";
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

    const store = useStore();
    const router = useRouter();

    const save = async (post: Post) => {
      await store.createPost(post);
      router.push("/");
    };

    return {
      post,
      save,
    };
  },
});
</script>