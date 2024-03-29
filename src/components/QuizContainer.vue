<template>
  <b-container>
    <b-row style="margin-top: 15px">
      <b-col style="text-align: center">
        <h2>{{ quizCnt }} / {{ quizInfo.maxCorrection }}</h2>
      </b-col>
    </b-row>
    <b-row align-h="center" style="margin-top: 15px" v-if="currentAnswer">
      <b-col align-self="center" style="text-align: center">
        <cropped-image
          v-if="url"
          :show-cropped="showCropped"
          :imgCropInfo="quizData"
          style="border-radius: 15px; border: 1px solid white"
        />
        <span v-else>Image loading...</span>
      </b-col>
    </b-row>

    <check-answer
      :expected="currentAnswerAsQuizModel"
      :selected="selection"
    ></check-answer>

    <div v-if="selection && selection.idx >= 0">
      <next-quiz-button
        :name="
          quizCnt >= quizInfo.maxCorrection ? '결과 보러 가기' : '다음 문제'
        "
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
import {
  QuizData,
  QuizInfo,
  QuizLog,
  QuizModel,
} from "@/interfaces/Quiz.model";
import { defineComponent, PropType } from "vue";
import { QuizImageStorage } from "../lib/quizImageStorage";
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
      quizCnt: 0,
      startTIme: 0,
      endTime: 0,
      quizImageStorage: new QuizImageStorage(),
      url: "",
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
    quizID: {
      type: String,
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
      this.quizCnt++;
      this.answerIndxList.length = 0;
      const answerLen = Math.min(
        this.getUnusedQuizItemList().length,
        this.quizInfo?.answerNum
      );
      this.correctAnswerIndx = this.getRandomInt(0, answerLen);
      for (let i = 0; i < answerLen; i++) {
        const unusedQuizItemArray = this.getUnusedQuizItemList();
        const randomIdx = this.getRandomInt(0, unusedQuizItemArray.length);
        const quiz = unusedQuizItemArray[randomIdx];
        const quizIdx = this.quizInfo.data.indexOf(quiz);
        this.answerIndxList.push(quizIdx);
        // console.log(
        //   "simple",
        //   [50, 50, 20, 73],
        //   JSON.stringify(
        //     this.quizWitchUnusedAsQuizAnswerList
        //       .filter((el, i) => [50, 50, 20, 73].every((j) => i !== j))
        //       .map((item) => this.quizInfo.data.indexOf(item))
        //   )
        // );
        // console.log("idxof", quizIdx, this.quizInfo.data[quizIdx], quiz);
        // console.log(
        //   "#",
        //   i,
        //   "test",
        //   JSON.stringify(
        //     this.quizWitchUnusedAsQuizAnswerList
        //       .filter((el, i) => this.answerIndxList.every((j) => i !== j))
        //       .map((item) => this.quizInfo.data.indexOf(item))
        //   )
        // );
        // console.log("#", i, "sadf", JSON.stringify(this.answerIndxList));
        // console.log(
        //   "#",
        //   i,
        //   "aaaa",
        //   JSON.stringify(this.usedQuizAsAnswerIndxList)
        // );
        // console.log(
        //   "#",
        //   i,
        //   "fafa",
        //   this.getUnusedQuizItemList().map((item) =>
        //     this.quizInfo.data.indexOf(item)
        //   )
        // );
      }
      this.usedQuizAsAnswerIndxList.push(
        this.answerIndxList[this.correctAnswerIndx]
      );
      this.quizImageStorage
        .getImageUrl(
          this.quizID,
          this.quizInfo.data[this.answerIndxList[this.correctAnswerIndx]].answer
        )
        .then((res) => {
          this.url = res;
          this.startTIme = new Date().getTime();
        })
        .catch((err) => {
          alert("이미지 로드 중 문제가 발생했습니다.");
          console.error(
            "[QuizContainer] [genCurrentQuizAnswer-getImageUrl] err: ",
            err
          );
        });
      //   this.quizInfo.data[this.answerIndxList[this.correctAnswerIndx]].answer
    },
    onAnswerSelected(idx: string) {
      //   console.log("idx", idx, this.selection.idx, this.selection.idx == "");
      if (
        !this.selection ||
        this.selection.idx == "" ||
        this.selection.idx == undefined
      ) {
        this.endTime = new Date().getTime();
        this.selection.idx = idx;
        this.selection.name = this.quizInfo.data[Number(idx)].answer;
        this.showCropped = false;

        this.$store.commit("appendQuizLog", {
          answer: this.currentAnswer,
          answerList: this.answerQuizDataList,
          quizInfo: this.quizInfo,
          order: this.quizCnt,
          selected: this.quizInfo.data[Number(idx)],
          takeTime: this.endTime - this.startTIme,
        } as QuizLog);
      }
      //   console.log("select idx:", idx, this.quizInfo.data[Number(idx)]);
    },

    onNextBtnClicked() {
      if (this.quizCnt < this.quizInfo.maxCorrection) {
        this.selection = {} as QuizModel;
        this.showCropped = true;
        this.answerIndxList.length = 0;
        this.url = "";
        this.genCurrentQuizAnswer();
      } else {
        this.$router.push("/result");
      }
    },

    getUnusedQuizItemList(): QuizData[] {
      return this.quizInfo.data.filter((el: QuizData, i: number) =>
        this.usedQuizAsAnswerIndxList
          .concat(this.answerIndxList)
          .every((j) => i !== j)
      );
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

    answerQuizDataList(): QuizData[] {
      return this.quizInfo.data.filter((el: QuizData, i: number) =>
        this.answerIndxList.some((j) => i === j)
      );
    },

    answerList(): any[] {
      return this.answerQuizDataList.map((val) => {
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

    quizData(): QuizData {
      return {
        ...this.currentAnswer,
        imgUrl: this.url,
      } as QuizData;
    },
  },
});
</script>

<style scoped></style>
