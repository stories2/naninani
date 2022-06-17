<template>
  <div>
    <quiz-container
      v-if="$store.state.quizInfo"
      :quizInfo="$store.state.quizInfo"
    ></quiz-container>
    <template v-else>
      <b-container>
        <b-row>
          <b-col>loading...</b-col>
        </b-row>
      </b-container>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// Components
import QuizContainer from "../components/QuizContainer.vue";

export default defineComponent({
  name: "QuizView",

  components: {
    QuizContainer,
    // CheckAnswer,
    // AnswerButtons,
    // NextQuizButton,
    // AdsenseBlock,
  },

  mounted() {
    const quizID = this.$route.params.quizId;
    console.log("quizID", quizID);
    if (quizID) {
      this.$store.commit("getQuizInfo", quizID);
    }
  },

  beforeMount() {
    this.$store.commit("resetQuizInfo");
  },
});
</script>

<style scoped></style>
