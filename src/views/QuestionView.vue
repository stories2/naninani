<template>
  <v-container>
    <div class="row justify-content-center" style="margin: 15px 0px">
      <div
        class="col-12 col-sm-12 col-md-6 col-lg-5"
        style="text-align: center"
      >
        <cropped-image :url="currentQuiz.url" :show-cropped="true" />
      </div>
    </div>

    <answer-buttons></answer-buttons>

    <check-answer></check-answer>

    <next-quiz-button></next-quiz-button>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import CroppedImage from "../components/CroppedImage.vue";
import CheckAnswer from "../components/CheckAnswer.vue";
import AnswerButtons from "@/components/AnswerButtons.vue";
import NextQuizButton from "@/components/NextQuizButton.vue";

import { QuizModel } from "../interfaces/Quiz.model";

export default defineComponent({
  name: "QuestionView",

  data() {
    return {
      pixel: window.devicePixelRatio,
      currentIdx: 4,
      quizList: [
        {
          url: "https://mblogthumb-phinf.pstatic.net/MjAxNzEyMjZfMjgg/MDAxNTE0MjgwMzcyMjQz.EZT_9cr7MAUekMO5Iss5ZwL1im2ABFy2QoeCfG47FCcg.sgrQq5QvXych8zbNBJ1QpV4KXJcRjOeoPvggmIWKiMYg.JPEG.syd147/%EB%B0%94%EB%B3%B4%EA%B1%B8-%ED%83%80%EC%9D%B4%ED%8B%80.jpg?type=w800",
          name: "바보걸",
        },
        {
          url: "https://mblogthumb-phinf.pstatic.net/MjAxNzAyMDVfMTU5/MDAxNDg2MjgzMzUzNDQ5.2sGUSYF4WtMgE2TWzYeQ48xrYe7Q6yuxoOu-l9EaZckg.dNO3WTYD0rHkAUr7Zof0p0n4SxYcuaxwo9miUnLVocYg.PNG.taehu12/%EC%BD%94%EB%85%B8%EC%8A%A4%EB%B0%94.png?type=w2",
          name: "이 멋진 세계에 축복을!",
        },
        {
          url: "https://dimg.donga.com/wps/NEWS/IMAGE/2018/04/23/89759074.3.jpg",
          name: "은혼",
        },
        {
          url: "https://image.yes24.com/goods/105245181/XL",
          name: "원피스(만화)",
        },
        {
          url: "https://www.themoviedb.org/t/p/original/ypQKH5Q1ifDaRKoo6oQozmtFIvN.jpg",
          name: "플라스틱 메모리즈",
        },
        {
          url: "https://upload.wikimedia.org/wikipedia/ko/d/d1/%EB%84%88%EC%9D%98_%EC%9D%B4%EB%A6%84%EC%9D%80.jpg",
          name: "너의 이름은.",
        },
        {
          url: "https://upload.wikimedia.org/wikipedia/ko/thumb/f/f5/%EB%82%A0%EC%94%A8%EC%9D%98_%EC%95%84%EC%9D%B4.tif/lossless-page1-1200px-%EB%82%A0%EC%94%A8%EC%9D%98_%EC%95%84%EC%9D%B4.tif.png",
          name: "날씨의 아이",
        },
      ] as QuizModel[],
    };
  },

  computed: {
    quizAnswerList(): string[] {
      return this.quizList.map((i) => i.name);
    },
    currentQuiz(): QuizModel {
      return this.quizList[this.currentIdx];
    },
  },

  components: {
    CroppedImage,
    CheckAnswer,
    AnswerButtons,
    NextQuizButton,
  },
});
</script>
