<template>
  <canvas
    v-bind:width="canvasSize"
    v-bind:height="canvasSize"
    v-bind:style="{ width: size + 'px', height: size + 'px' }"
  ></canvas>
</template>
<script lang="ts">
import { defineComponent } from "vue";

interface CanvasDrawImageModel {
  image: HTMLImageElement;
  sx: number;
  sy: number;
  sWidth: number;
  sHeight: number;
  dx: number;
  dy: number;
  dWidth: number;
  dHeight: number;
}

export default defineComponent({
  name: "CroppedImage",

  props: {
    //   https://vuejs.org/guide/components/props.html#prop-validation
    url: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      size: 300,
      scale: window.devicePixelRatio,
      context: null,
      image: new Image(),
      drawImgInfo: {} as CanvasDrawImageModel,
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

  watch: {
    url(currentVal, oldVal) {
      //   console.log("current", currentVal, oldVal);
      this.loadImageFromUrl(currentVal);
    },
  },

  methods: {
    loadImageFromUrl(url: string) {
      console.log("url", url);
      this.image = new Image();
      this.image.src = url;
      this.image.onload = () => {
        this.drawImgInfo = this.calcCenterCroppedImage(
          this.image,
          50,
          300,
          100,
          60
        );
        console.log("drawImgInfo", this.drawImgInfo);
      };
    },

    calcCenterCroppedImage(
      image: HTMLImageElement,
      cropX: number,
      cropY: number,
      cropWidth: number,
      cropHeight: number
    ): CanvasDrawImageModel {
      return {
        image,
        sx: cropX,
        sy: cropY,
        sWidth: cropWidth,
        sHeight: cropHeight,
        dx: (this.size - cropWidth) / 2,
        dy: (this.size - cropHeight) / 2,
        dWidth: cropWidth,
        dHeight: cropHeight,
      };
    },

    render(ctx: any) {
      const draw = () => {
        requestAnimationFrame(draw);
        ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);

        if (this.drawImgInfo.image) {
          ctx.drawImage(
            this.drawImgInfo.image,
            this.drawImgInfo.sx,
            this.drawImgInfo.sy,
            this.drawImgInfo.sWidth,
            this.drawImgInfo.sHeight,
            this.drawImgInfo.dx,
            this.drawImgInfo.dy,
            this.drawImgInfo.dWidth,
            this.drawImgInfo.dHeight
          );
        }
      };

      draw();
    },
  },

  mounted() {
    this.context = this.$el.getContext("2d");

    this.ctx.scale(this.scale, this.scale);

    this.render(this.ctx);

    this.loadImageFromUrl(this.url);
  },
});
</script>
