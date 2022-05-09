<template>
  <canvas></canvas>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CroppedImage",

  props: {
    url: String,
  },

  data() {
    return {};
  },
});
</script>
