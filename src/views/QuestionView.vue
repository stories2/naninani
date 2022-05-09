<template>
  <v-container>
    <div class="row justify-content-center" style="margin: 15px 0px">
      <div
        class="col-12 col-sm-12 col-md-6 col-lg-5"
        style="text-align: center"
      >
        <cropped-image
          url="https://upload.wikimedia.org/wikipedia/ko/d/d1/%EB%84%88%EC%9D%98_%EC%9D%B4%EB%A6%84%EC%9D%80.jpg"
          :show-cropped="true"
        />
      </div>
    </div>

    <answer-buttons></answer-buttons>

    <check-answer></check-answer>

    <next-quiz-button></next-quiz-button>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import CroppedImage from "../components/CroppedImage.vue";
import CheckAnswer from "../components/CheckAnswer.vue";
import AnswerButtons from "@/components/AnswerButtons.vue";
import NextQuizButton from "@/components/NextQuizButton.vue";

export default defineComponent({
  name: "QuestionView",

  data() {
    return {
      pixel: window.devicePixelRatio,
    };
  },

  components: {
    CroppedImage,
    CheckAnswer,
    AnswerButtons,
    NextQuizButton,
  },
});
</script>
