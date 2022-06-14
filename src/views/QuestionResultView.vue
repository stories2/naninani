<template>
  <div>
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
    <b-row style="margin-top: 15px">
      <b-col>
        <next-quiz-button
          :name="'다시 시작'"
          v-on:nextBtnClicked="onNextBtnClicked"
        ></next-quiz-button>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NextQuizButton from "@/components/NextQuizButton.vue";

export default defineComponent({
  name: "QuestionResultView",

  components: {
    NextQuizButton,
  },

  data() {
    return {
      correctCnt: this.$store.state.correctCnt,
    };
  },

  methods: {
    onNextBtnClicked() {
      this.$router.push("/");
    },
  },
});
</script>
