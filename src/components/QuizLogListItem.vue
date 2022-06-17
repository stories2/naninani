<template>
  <div class="quiz-card">
    <b-row>
      <b-col style="text-align: center"> #{{ quizLog.order }} </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" md="6" style="text-align: center">
        <cropped-image
          v-if="url"
          :show-cropped="showCropped"
          :imgCropInfo="quizData"
          @click="showCropped = false"
          style="
            border-radius: 15px;
            border: 1px solid white;
            transform: scale(0.5);
          "
        />
      </b-col>
      <b-col cols="12" md="6">
        <b-row>
          <b-col>
            <check-answer
              :expected="currentAnswerAsQuizModel"
              :selected="selection"
            ></check-answer>
          </b-col>
        </b-row>
        <b-row>
          <b-col style="text-align: center">
            정답 선택까지 소요 시간: {{ msToHMS(quizLog.takeTime) }}
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { QuizData, QuizLog, QuizModel } from "@/interfaces/Quiz.model";
import { defineComponent, PropType } from "vue";
import CroppedImage from "../components/CroppedImage.vue";
import CheckAnswer from "../components/CheckAnswer.vue";
import { QuizImageStorage } from "../lib/quizImageStorage";

export default defineComponent({
  name: "QuizLogListItem",
  props: {
    quizLog: {
      type: Object as PropType<QuizLog>,
      required: true,
    },
  },

  data() {
    return {
      showCropped: true,
      quizImageStorage: new QuizImageStorage(),
      url: "",
    };
  },

  components: {
    CroppedImage,
    CheckAnswer,
  },

  mounted() {
    this.quizImageStorage
      .getImageUrl(this.quizLog.answer.qid, this.quizLog.answer.answer)
      .then((res) => {
        this.url = res;
      })
      .catch((err) => {
        alert("이미지 로드 중 문제가 발생했습니다.");
        console.error("[QuizLogListItem] [mounted-getImageUrl] err: ", err);
      });
  },

  methods: {
    msToHMS(ms: number): string {
      // 1- Convert to seconds:
      let seconds = ms / 1000;
      // 2- Extract hours:
      const hours = Math.floor(seconds / 3600); // 3,600 seconds in 1 hour
      seconds = seconds % 3600; // seconds remaining after extracting hours
      // 3- Extract minutes:
      const minutes = Math.floor(seconds / 60); // 60 seconds in 1 minute
      // 4- Keep only seconds not extracted to minutes:
      seconds = seconds % 60;
      return (
        `${hours <= 9 ? `0${hours}` : hours}` +
        ":" +
        `${minutes <= 9 ? `0${minutes}` : minutes}` +
        ":" +
        `${
          Math.floor(seconds) <= 9
            ? `0${Math.floor(seconds)}`
            : Math.floor(seconds)
        }`
      );
    },
  },

  computed: {
    currentAnswerAsQuizModel(): QuizModel {
      //   console.log("this.currentAnswer", this.currentAnswer);
      return {
        idx: `answer`,
        name: `${this.quizLog.answer.answer}`,
      } as QuizModel;
    },

    selection(): QuizModel {
      return {
        idx: `answer`,
        name: `${this.quizLog.selected.answer}`,
      } as QuizModel;
    },

    quizData(): QuizData {
      return {
        ...this.quizLog.answer,
        imgUrl: this.url,
      } as QuizData;
    },
  },
});
</script>

<style scoped>
.quiz-card {
  border: 1px solid white;
  border-radius: 15px;
  margin: 15px;
  padding: 15px;
}
</style>
