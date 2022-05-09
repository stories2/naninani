<template>
  <canvas
    v-bind:width="canvasSize"
    v-bind:height="canvasSize"
    v-bind:style="{ width: size + 'px', height: size + 'px' }"
  ></canvas>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CroppedImage",

  props: {
    url: String,
  },

  data() {
    return {
      size: 300,
      scale: window.devicePixelRatio,
      context: null,
    };
  },

  computed: {
    canvasSize() {
      return this.size * this.scale;
    },

    ctx(): any {
      // https://kyounghwan01.github.io/blog/TS/object-null/#%E1%84%8B%E1%85%A9%E1%86%B8%E1%84%89%E1%85%A7%E1%84%82%E1%85%A5%E1%86%AF%E1%84%8E%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%82%E1%85%B5%E1%86%BC-%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC
      return this.context as any;
    },
  },

  mounted() {
    this.context = this.$el.getContext("2d");

    this.ctx.scale(this.scale, this.scale);

    this.ctx.fillStyle = "#bada55";
    this.ctx.fillRect(10, 10, 280, 280);
    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = "18px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    var x = this.size / 2;
    var y = this.size / 2;

    var textString = "I love MDN";
    this.ctx.fillText(textString, x, y);
  },
});
</script>
