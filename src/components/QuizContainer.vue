<template>
  <b-container>
    <b-row align-h="center" style="margin-top: 15px" v-if="currentAnswer">
      <b-col align-self="center" style="text-align: center">
        <cropped-image
          :show-cropped="showCropped"
          :imgCropInfo="currentAnswer"
          style="border-radius: 15px; border: 1px solid white"
        />
      </b-col>
    </b-row>

    <check-answer
      :expected="currentAnswerAsQuizModel"
      :selected="selection"
    ></check-answer>

    <div v-if="selection && selection.idx">
      <next-quiz-button
        v-on:nextBtnClicked="onNextBtnClicked"
      ></next-quiz-button>
    </div>

    <answer-buttons
      :answerList="answerList"
      v-on:answerSelected="onAnswerSelected"
    ></answer-buttons>
  </b-container>
</template>

<script lang="ts">
import { QuizData, QuizInfo, QuizModel } from "@/interfaces/Quiz.model";
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
      selection: {} as QuizModel,
    };
  },

  components: {
    CroppedImage,
    CheckAnswer,
    AnswerButtons,
    NextQuizButton,
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
        const quizIdx = this.quizInfo.data.indexOf(quiz);
        // console.log("idxof", quizIdx, this.quizInfo.data[quizIdx], quiz);
        this.answerIndxList.push(quizIdx);
      }
      this.usedQuizAsAnswerIndxList.push(
        this.answerIndxList[this.correctAnswerIndx]
      );
    },
    onAnswerSelected(idx: string) {
      if (!this.selection || !this.selection.idx) {
        this.selection.idx = idx;
        this.selection.name = this.quizInfo.data[Number(idx)].answer;
        this.showCropped = false;
      }
      //   console.log("select idx:", idx, this.quizInfo.data[Number(idx)]);
    },

    onNextBtnClicked() {
      this.selection = {} as QuizModel;
      this.showCropped = true;
      this.answerIndxList.length = 0;
      this.genCurrentQuizAnswer();
    },
  },

  computed: {
    quizWitchUnusedAsQuizAnswerList(): QuizData[] {
      if (!this.quizInfo) {
        return [];
      }
      return this.quizInfo.data.filter((el: QuizData, i: number) =>
        this.usedQuizAsAnswerIndxList.every((j) => i !== j)
      );
    },

    unusedQuizItemList(): QuizData[] {
      return this.quizWitchUnusedAsQuizAnswerList.filter((el, i) =>
        this.answerIndxList.every((j) => i !== j)
      );
    },

    answerList(): any[] {
      return this.quizInfo.data
        .filter((el: QuizData, i: number) =>
          this.answerIndxList.some((j) => i === j)
        )
        .map((val) => {
          return {
            name: val.answer,
            idx: this.quizInfo.data.indexOf(val),
            ...val,
          };
        });
    },

    currentAnswer(): QuizData {
      return this.quizInfo.data[this.answerIndxList[this.correctAnswerIndx]];
    },

    currentAnswerAsQuizModel(): QuizModel {
      //   console.log("this.currentAnswer", this.currentAnswer);
      if (!this.currentAnswer) {
        return {} as QuizModel;
      }
      return {
        idx: `${this.answerIndxList[this.correctAnswerIndx]}`,
        name: this.currentAnswer.answer,
      } as QuizModel;
    },
  },
});
</script>

<style scoped></style>
