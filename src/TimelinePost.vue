<template>
  <div class="panel-block" data-test="post">
    <div>
      <a data-test="post-headline">{{ post.title }}</a>
      <div>{{ post.created.format("do MMM") }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { Post } from "./types";
export default defineComponent({
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
});
</script>