<template>
  <b-container>
    <b-row>
      <b-col
        style="
          text-align: center;
          text-align: center;
          font-size: 2em;
          font-weight: bold;
          margin-top: 40px;
        "
      >
        {{ correctCnt }} 개 맞혔어요!
      </b-col>
    </b-row>
    <b-row style="margin-top: 15px" align-h="center">
      <b-col cols="12" lg="2">
        <next-quiz-button
          :name="'홈으로'"
          v-on:nextBtnClicked="onHomeBtnClicked"
        ></next-quiz-button>
      </b-col>
      <b-col cols="12" lg="2">
        <next-quiz-button
          :name="'다시 시작'"
          v-on:nextBtnClicked="onRestartBtnClicked"
        ></next-quiz-button>
      </b-col>
    </b-row>
    <b-row v-for="log in $store.state.quizLogList" :key="log" align-h="center">
      <b-col xl="6" lg="8" cols="12">
        <quiz-log-list-item :quizLog="log"></quiz-log-list-item>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NextQuizButton from "@/components/NextQuizButton.vue";
import QuizLogListItem from "@/components/QuizLogListItem.vue";
import { QuizLog } from "@/interfaces/Quiz.model";

export default defineComponent({
  name: "QuestionResultView",

  components: {
    NextQuizButton,
    QuizLogListItem,
  },

  data() {
    return {};
  },

  methods: {
    onHomeBtnClicked() {
      this.$router.push("/");
    },
    onRestartBtnClicked() {
      this.$router.back();
    },
  },

  computed: {
    correctCnt(): number {
      return this.$store.state.quizLogList.filter(
        (log: QuizLog) => log.answer === log.selected
      ).length;
    },
  },
});
</script>
