<template>
  <b-container>
    <b-row align-h="center" style="margin-top: 15px" v-if="currentAnswer">
      <b-col align-self="center" style="text-align: center">
        <cropped-image
          :show-cropped="showCropped"
          :imgCropInfo="currentAnswer"
          @click="toggleCrop()"
          style="border-radius: 15px; border: 1px solid white"
        />
      </b-col>
    </b-row>

    <answer-buttons
      :answerList="answerList"
      v-on:answerSelected="onAnswerSelected"
    ></answer-buttons>
  </b-container>
</template>

<script lang="ts">
import { QuizData, QuizInfo } from "@/interfaces/Quiz.model";
import { defineComponent, PropType } from "vue";
// Components
import CroppedImage from "../components/CroppedImage.vue";
import CheckAnswer from "../components/CheckAnswer.vue";
import AnswerButtons from "@/components/AnswerButtons.vue";
import NextQuizButton from "@/components/NextQuizButton.vue";

export default defineComponent({
  name: "QuizContainer",

  data() {
    return {
      showCropped: true,
      usedQuizAsAnswerIndxList: [] as number[], // 정답으로 사용된 퀴즈 인덱스
      answerIndxList: [] as number[], // 정답 후보지로 사용된 퀴즈 인덱스
      correctAnswerIndx: 0,
    };
  },

  components: {
    CroppedImage,
    // CheckAnswer,
    AnswerButtons,
    // NextQuizButton,
    // AdsenseBlock,
  },

  props: {
    quizInfo: {
      type: Object as PropType<QuizInfo>,
      required: true,
    },
  },

  mounted() {
    this.genCurrentQuizAnswer();
  },

  methods: {
    toggleCrop() {
      this.showCropped = !this.showCropped;
    },
    getRandomInt(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
    },
    genCurrentQuizAnswer() {
      this.answerIndxList.length = 0;
      const answerLen = Math.min(
        this.unusedQuizItemList.length,
        this.quizInfo?.answerNum
      );
      this.correctAnswerIndx = this.getRandomInt(0, answerLen);
      for (let i = 0; i < answerLen; i++) {
        const randomIdx = this.getRandomInt(0, this.unusedQuizItemList.length);
        const quiz = this.unusedQuizItemList[randomIdx];
        // console.log("idxof", this.quizInfo.data.indexOf(quiz), quiz);
        this.answerIndxList.push(this.quizInfo.data.indexOf(quiz));
      }
      this.usedQuizAsAnswerIndxList.push(
        this.answerIndxList[this.correctAnswerIndx]
      );
    },
    onAnswerSelected(idx: string) {
      console.log("idx", idx);
    },
  },

  computed: {
    quizList(): QuizData[] {
      if (!this.quizInfo) {
        return [];
      }
      return this.quizInfo.data.filter((el: QuizData, i: number) =>
        this.usedQuizAsAnswerIndxList.every((j) => i !== j)
      );
    },

    unusedQuizItemList(): QuizData[] {
      return this.quizList.filter((el, i) =>
        this.answerIndxList.every((j) => i !== j)
      );
    },

    answerList(): any[] {
      return this.quizInfo.data
        .filter((el: QuizData, i: number) =>
          this.answerIndxList.some((j) => i === j)
        )
        .map((val, mapIdx) => {
          return { name: val.answer, idx: this.answerIndxList[mapIdx], ...val };
        });
    },

    currentAnswer(): QuizData {
      return this.quizInfo.data[this.answerIndxList[this.correctAnswerIndx]];
    },
  },
});
</script>

<style scoped></style>
