<template>
  <div>
    <b-container>
      <b-row>
        <b-col>hi</b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "QuizView",

  mounted() {
    console.log(this.$route.params.quizId);
  },
});
</script>

<style scoped></style>
