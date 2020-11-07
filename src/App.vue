<template>
  <Suspense>
    <template #default>
      <Timeline />
    </template>
    <template #fallback>
      <progress />
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Timeline from "./Timeline.vue";
import Progress from "./Progress.vue";

export default defineComponent({
  components: {
    Timeline,
    Progress,
  },
});
</script>
