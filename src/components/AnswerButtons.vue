<template>
  <div class="row justify-content-center">
    <div class="col-12 col-sm-12 col-md-6 col-lg-5" style="text-align: center">
      <div class="btn-margin" v-for="answer in answerList" :key="answer.idx">
        <!-- https://stackoverflow.com/a/48387344 -->
        <v-btn variant="outlined" @click="answerClicked(answer, $event)">{{
          answer.name
        }}</v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { QuizModel } from "@/interfaces/Quiz.model";
import { defineComponent } from "vue";

export default defineComponent({
  name: "AnswerButtons",

  emits: ["answerSelected"],

  props: {
    //   https://vuejs.org/guide/components/props.html#prop-validation
    answerList: {
      type: Array,
      required: true,
    },
  },

  watch: {
    answerList(currentVal, oldVal) {
      // console.log("answerList watch", this.answerList);
    },
  },

  mounted() {
    // console.log("answerList", this.answerList);
  },

  methods: {
    answerClicked(answer: QuizModel, event: any) {
      // console.log("test", event);
      this.$emit("answerSelected", answer.idx);
    },
  },
});
</script>

<style scoped>
.btn-margin {
  margin: 5px;
  display: inline-block;
}
</style>
