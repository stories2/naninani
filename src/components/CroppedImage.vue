<template>
  <canvas
    v-bind:width="canvasSize"
    v-bind:height="canvasSize"
    v-bind:style="{ width: size + 'px', height: size + 'px' }"
  ></canvas>
</template>
<script lang="ts">
import { QuizData } from "@/interfaces/Quiz.model";
import { defineComponent, PropType } from "vue";

import {
  CanvasDrawImageModel,
  CroppedImageModel,
} from "../interfaces/CroppedImage.model";

export default defineComponent({
  name: "CroppedImage",

  props: {
    //   https://vuejs.org/guide/components/props.html#prop-validation
    url: {
      type: String,
      required: true,
    },
    showCropped: {
      type: Boolean,
      required: true,
    },
    difficult: {
      type: Number,
      default: 4,
    },
    imgCropInfo: {
      type: Object as PropType<QuizData>,
    },
  },

  data() {
    return {
      size: 300,
      scale: window.devicePixelRatio || 1,
      context: null,
      image: new Image(),
      drawImgInfo: {} as CanvasDrawImageModel,
      cropImageInfo: {
        x: this.imgCropInfo?.x || 0,
        y: this.imgCropInfo?.y || 0,
        width: this.imgCropInfo?.width || 0,
        height: this.imgCropInfo?.height || 0,
        // x: 50,
        // y: 300,
        // width: 100,
        // height: 60,
      } as CroppedImageModel,
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
    imgCropInfo(currentVal, oldVal) {
      this.loadImageFromUrl(currentVal.imgUrl);
    },
  },

  methods: {
    getRandomInt(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
    },

    initRandomCropImg(image: HTMLImageElement) {
      this.cropImageInfo.width = image.width / this.difficult;
      this.cropImageInfo.height = image.height / this.difficult;

      const difficultSplitNum = this.difficult * this.difficult;

      const randomInt = this.getRandomInt(0, difficultSplitNum);

      this.cropImageInfo.x =
        (randomInt % this.difficult) * this.cropImageInfo.width;
      this.cropImageInfo.y =
        Math.floor(randomInt / this.difficult) * this.cropImageInfo.height;

      if (this.imgCropInfo) {
        this.cropImageInfo.width = this.imgCropInfo.crop_width;
        this.cropImageInfo.height = this.imgCropInfo.crop_height;
        this.cropImageInfo.x = this.imgCropInfo.crop_x;
        this.cropImageInfo.y = this.imgCropInfo.crop_y;
      }

      console.log(
        "[CroppedImage] [initRandomCropImg] cropImageInfo",
        this.cropImageInfo
      );
    },

    initLoadedImage() {
      this.initRandomCropImg(this.image);
      this.drawImgInfo = this.calcCenterCroppedImage(
        this.image,
        this.cropImageInfo.x,
        this.cropImageInfo.y,
        this.cropImageInfo.width,
        this.cropImageInfo.height
      );
    },

    loadImageFromUrl(url: string) {
      console.log("[CroppedImage] [loadImageFromUrl] url: ", url);
      this.image = new Image();
      this.image.src = url;
      this.image.onload = () => {
        console.log("[CroppedImage] [loadImageFromUrl] image loaded ");
        this.initLoadedImage();
      };
      this.image.onerror = () => {
        alert("이미지 로드 중 문제가 발생했습니다.");
        this.image = new Image(300, 300);
        this.initLoadedImage();
      };
    },

    zoomOutImage(
      drawImgInfo: CanvasDrawImageModel,
      cropImgInfo: CroppedImageModel,
      speed = 50
    ): CroppedImageModel {
      cropImgInfo.x += (0 - cropImgInfo.x) / speed;
      cropImgInfo.y += (0 - cropImgInfo.y) / speed;
      cropImgInfo.width +=
        (drawImgInfo.image.width - cropImgInfo.width) / speed;
      cropImgInfo.height +=
        (drawImgInfo.image.height - cropImgInfo.height) / speed;
      return {
        ...cropImgInfo,
      } as CroppedImageModel;
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

    calcRatio(
      srcWidth: number,
      srcHeight: number,
      isCropped = true,
      renderBoxWidth = 300,
      renderBoxHeight = 300
    ) {
      if (isCropped) {
        return srcWidth > srcHeight
          ? srcWidth / renderBoxWidth
          : srcHeight / renderBoxHeight;
      } else {
        return srcWidth > srcHeight
          ? renderBoxWidth / srcWidth
          : renderBoxHeight / srcHeight;
      }
    },

    renderCenterstageImage(
      ctx: any,
      drawImgInfo: CanvasDrawImageModel,
      cropImgInfo: CroppedImageModel,
      renderBoxWidth = 300,
      renderBoxHeight = 300
    ) {
      const ratio = this.calcRatio(
        cropImgInfo.width,
        cropImgInfo.height,
        false,
        renderBoxWidth,
        renderBoxHeight
      );
      //   console.log(
      //     drawImgInfo,
      //     "r",
      //     ratio,
      //     drawImgInfo.dHeight * ratio,
      //     renderBoxHeight,
      //     renderBoxHeight - drawImgInfo.dHeight * ratio
      //   );
      ctx.drawImage(
        drawImgInfo.image,
        drawImgInfo.sx,
        drawImgInfo.sy,
        drawImgInfo.sWidth,
        drawImgInfo.sHeight,
        (renderBoxWidth - drawImgInfo.dWidth * ratio) / 2,
        (renderBoxHeight - drawImgInfo.dHeight * ratio) / 2,
        drawImgInfo.dWidth * ratio,
        drawImgInfo.dHeight * ratio
      );
      return this.calcCenterCroppedImage(
        drawImgInfo.image,
        cropImgInfo.x,
        cropImgInfo.y,
        cropImgInfo.width,
        cropImgInfo.height
      );
    },

    render(ctx: any) {
      const draw = () => {
        requestAnimationFrame(draw);
        ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);

        if (this.drawImgInfo.image) {
          this.drawImgInfo = this.renderCenterstageImage(
            ctx,
            this.drawImgInfo,
            this.cropImageInfo,
            this.size,
            this.size
          );

          if (!this.showCropped) {
            this.cropImageInfo = this.zoomOutImage(
              this.drawImgInfo,
              this.cropImageInfo
            );
          }
        }
      };

      draw();
    },
  },

  mounted() {
    console.log("showCropped", this.showCropped, typeof this.showCropped);
    this.context = this.$el.getContext("2d");

    this.ctx.scale(this.scale, this.scale);

    this.render(this.ctx);

    this.loadImageFromUrl(this.imgCropInfo?.imgUrl || this.url);
  },
});
</script>
