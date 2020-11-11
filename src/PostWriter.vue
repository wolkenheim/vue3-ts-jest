<template>
  <div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <div class="label">Post</div>
          <div class="control">
            <input v-model="title" type="text" class="input" />
            {{ title }}
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column is-one-half">
        <div
          contenteditable
          id="markdown"
          ref="contentEditable"
          @input="handleEdit"
        />
      </div>
      <div class="column is-one-half">
        <div v-html="html" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { Post } from "./types";
import { MarkedOptions, parse } from "marked";
import { highlightAuto } from "highlight.js";
import debounce from "lodash/debounce";

export default defineComponent({
  name: "PostWriter",
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
  setup(props) {
    const title = ref(props.post.title);
    const contentEditable = ref<null | HTMLDivElement>(null);
    const markdown = ref(props.post.markdown);
    const html = ref("");

    const markdownOptions: MarkedOptions = {
      highlight: (code: string) => highlightAuto(code).value,
    };

    const handleEdit = () => {
      markdown.value = contentEditable.value.innerText;
    };

    const update = (value: string) => {
      html.value = parse(value, markdownOptions);
    };

    watch(
      () => markdown.value,
      (value) => debounce(update, 500),
      { immediate: true }
    );

    onMounted(() => {
      contentEditable.value.innerText = markdown.value;
    });
    return {
      title,
      html,
      contentEditable,
      handleEdit,
      markdown,
    };
  },
});
</script>