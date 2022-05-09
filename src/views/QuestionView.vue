<template>
  <v-container>
    <template v-if="quizList.length > 0">
      <div class="row justify-content-center" style="margin: 15px 0px">
        <div
          class="col-12 col-sm-12 col-md-6 col-lg-5"
          style="text-align: center"
        >
          <cropped-image :url="currentQuiz.url" :show-cropped="true" />
        </div>
      </div>

      <answer-buttons
        :answerList="quizList"
        v-on:answerSelected="onAnswerSelected"
      ></answer-buttons>

      <check-answer
        :expected="currentQuiz"
        :selected="selection"
      ></check-answer>

      <div v-if="selection && selection.idx">
        <next-quiz-button
          v-on:nextBtnClicked="onNextBtnClicked"
        ></next-quiz-button>
      </div>
    </template>
    <template v-else>
      <div class="row justify-content-center" style="margin: 15px 0px">
        <div
          class="col-12 col-sm-12 col-md-6 col-lg-5"
          style="
            text-align: center;
            text-align: center;
            font-size: 2em;
            font-weight: bold;
            margin-top: 40px;
          "
        >
          {{ correctCnt }} 개 맞혔어요!
        </div>
      </div>
    </template>
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
      currentIdx: this.getRandomInt(0, 6),
      correctCnt: 0,
      selection: {} as QuizModel,
      quizList: [
        {
          idx: "1",
          url: "https://mblogthumb-phinf.pstatic.net/MjAxNzEyMjZfMjgg/MDAxNTE0MjgwMzcyMjQz.EZT_9cr7MAUekMO5Iss5ZwL1im2ABFy2QoeCfG47FCcg.sgrQq5QvXych8zbNBJ1QpV4KXJcRjOeoPvggmIWKiMYg.JPEG.syd147/%EB%B0%94%EB%B3%B4%EA%B1%B8-%ED%83%80%EC%9D%B4%ED%8B%80.jpg?type=w800",
          name: "바보걸",
        },
        {
          idx: "2",
          url: "https://mblogthumb-phinf.pstatic.net/MjAxNzAyMDVfMTU5/MDAxNDg2MjgzMzUzNDQ5.2sGUSYF4WtMgE2TWzYeQ48xrYe7Q6yuxoOu-l9EaZckg.dNO3WTYD0rHkAUr7Zof0p0n4SxYcuaxwo9miUnLVocYg.PNG.taehu12/%EC%BD%94%EB%85%B8%EC%8A%A4%EB%B0%94.png?type=w2",
          name: "이 멋진 세계에 축복을!",
        },
        {
          idx: "3",
          url: "https://dimg.donga.com/wps/NEWS/IMAGE/2018/04/23/89759074.3.jpg",
          name: "은혼",
        },
        {
          idx: "4",
          url: "https://image.yes24.com/goods/105245181/XL",
          name: "원피스(만화)",
        },
        {
          idx: "5",
          url: "https://www.themoviedb.org/t/p/original/ypQKH5Q1ifDaRKoo6oQozmtFIvN.jpg",
          name: "플라스틱 메모리즈",
        },
        {
          idx: "6",
          url: "https://upload.wikimedia.org/wikipedia/ko/d/d1/%EB%84%88%EC%9D%98_%EC%9D%B4%EB%A6%84%EC%9D%80.jpg",
          name: "너의 이름은.",
        },
        {
          idx: "7",
          url: "https://upload.wikimedia.org/wikipedia/ko/thumb/f/f5/%EB%82%A0%EC%94%A8%EC%9D%98_%EC%95%84%EC%9D%B4.tif/lossless-page1-1200px-%EB%82%A0%EC%94%A8%EC%9D%98_%EC%95%84%EC%9D%B4.tif.png",
          name: "날씨의 아이",
        },
      ] as QuizModel[],
    };
  },

  computed: {
    currentQuiz(): QuizModel {
      return this.quizList[this.currentIdx];
    },
  },

  methods: {
    getRandomInt(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
    },

    onAnswerSelected(idx: string) {
      if (!this.selection.idx) {
        this.selection = this.quizList.find((item) => item.idx === idx)!;
        console.log(
          "sele",
          this.selection.idx,
          this.quizList[this.currentIdx].idx,
          this.selection.idx === this.quizList[this.currentIdx].idx
        );
        if (this.selection.idx === this.quizList[this.currentIdx].idx) {
          this.correctCnt++;
        }
      }
    },

    onNextBtnClicked() {
      this.selection = {} as QuizModel;
      this.quizList.splice(this.currentIdx, 1);
      this.currentIdx = this.getRandomInt(0, this.quizList.length);
      //   console.log('this.quiz', this.quizList)
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
