<template>
  <div>
    <template v-if="$store.state.quizInfo">
      <b-container>
        <b-row align-h="center" style="margin-top: 15px">
          <b-col align-self="center" style="text-align: center">
            <cropped-image
              :url="'https://w.namu.la/s/bc21f1d076047dbe08ae6b8e17540ced61efe1748b948f6e416c717506146f252d11fea56fe72544f9b32511c2846db876fa52012ec7b56d47abd73e67f87bde7e8ad760a2378c1b25f9e7f981c15e0fbb92bb81fc41afc1a6e5c0ae3ea93551'"
              :show-cropped="showCropped"
              :imgCropInfo="$store.state.quizInfo.data[15]"
              @click="toggleCrop()"
              style="border-radius: 15px; border: 1px solid white"
            />
          </b-col>
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
// Components
import CroppedImage from "../components/CroppedImage.vue";
import CheckAnswer from "../components/CheckAnswer.vue";
import AnswerButtons from "@/components/AnswerButtons.vue";
import NextQuizButton from "@/components/NextQuizButton.vue";

export default defineComponent({
  name: "QuizView",

  data() {
    return {
      showCropped: true,
    };
  },

  components: {
    CroppedImage,
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

  beforeUnmount() {
    this.$store.commit("resetQuizInfo");
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
  },

  computed: {
    quizList() {
      return [];
    },
  },
});
</script>

<style scoped></style>
