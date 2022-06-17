<template>
  <div>
    <quiz-container
      v-if="$store.state.quizInfo"
      :quizInfo="$store.state.quizInfo"
      :quizID="quizID"
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

  data() {
    return {
      quizID: this.$route.params.quizId,
    };
  },

  mounted() {
    console.log("quizID", this.quizID);
    if (this.quizID) {
      this.$store.commit("getQuizInfo", this.quizID);
    }
  },

  beforeMount() {
    this.$store.commit("resetQuizInfo");
    this.$store.commit("resetQuizLog");
  },
});
</script>

<style scoped></style>
