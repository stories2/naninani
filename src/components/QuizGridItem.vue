<template>
  <div
    class="quiz-grid-item"
    :style="{ 'background-image': 'url(' + (quiz ? quiz.thumbnail : '') + ')' }"
    @click="onGridItemClicked()"
  >
    <b-row class="grid-descript" v-if="quiz">
      <b-col>
        <b-row class="grid-text">
          <b-col>{{ defaultLangInfo.title }}</b-col>
        </b-row>
        <b-row>
          <b-col><v-icon>mdi-thumb-up</v-icon> {{ quiz.likes }} </b-col>
          <b-col> <v-icon>mdi-comment-text</v-icon> {{ quiz.comments }} </b-col>
        </b-row>
        <b-row class="grid-date">
          <b-col>
            {{ quiz.createDatetime.toDate().toLocaleDateString() }}
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <div v-else class="grid-plus-container">
      <span class="grid-plus">
        <v-icon>mdi-plus</v-icon>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { QuizInfo } from "../interfaces/Quiz.model";

export default defineComponent({
  name: "QuizGridItem",

  props: {
    quiz: {
      type: Object as PropType<QuizInfo>,
    },
  },

  methods: {
    onGridItemClicked() {
      if (this.quiz) {
        this.$router.push(`/quiz/${this.quiz.docID}`);
      }
    },
  },

  computed: {
    defaultLangInfo() {
      return this.quiz!.info.find((lang) => lang.default === true);
    },
  },
});
</script>

<style scoped>
.quiz-grid-item {
  width: 100%;
  height: 200px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: white;
  border-radius: 15px;
  color: black;
  text-align: center;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: relative;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
}

.grid-descript {
  bottom: 0;
  width: 100%;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  padding-bottom: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-weight: bold;
}

.grid-text {
  height: 36px;
  padding: 2px 0;
}

.grid-date {
  text-align: right;
  margin-top: 5px;
  font-size: 7px;
}

.grid-plus-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.grid-plus {
  transform: translate(-50%, 60%);
  position: absolute;
  font-size: 50px;
}
</style>
