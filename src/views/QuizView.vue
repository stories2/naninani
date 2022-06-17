<template>
  <div>
    <template v-if="$store.state.quizInfo">
      <b-container>
        <b-row>
          <b-col>hi</b-col>
        </b-row>
      </b-container>
    </template>
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

export default defineComponent({
  name: "QuizView",

  mounted() {
    const quizID = this.$route.params.quizId;
    console.log("quizID", quizID);
    if (quizID) {
      this.$store.commit("getQuizInfo", quizID);
    }
  },

  beforeUnmount() {
    this.$store.commit("resetQuizInfo");
  },
});
</script>

<style scoped></style>
