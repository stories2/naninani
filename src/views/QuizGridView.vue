<template>
  <div>
    <b-container>
      <b-row style="margin-top: 15px">
        <b-col>
          <h2>이미지 조각 맞추기</h2>
        </b-col>
      </b-row>
      <!-- <b-row>
        <b-col
          >{{ $store.state.quizList.length }} / {{ quizList.length }}</b-col
        >
      </b-row> -->
      <b-row style="padding: 12px 0">
        <b-col cols="12" md="6" lg="4" xl="3" style="margin: 12px 0px">
          <quiz-grid-item @click="$router.push('/editor')"></quiz-grid-item>
        </b-col>
        <b-col
          cols="12"
          md="6"
          lg="4"
          xl="3"
          style="margin: 12px 0px"
          v-for="quiz in getQuizList"
          :key="quiz"
        >
          <quiz-grid-item :quiz="quiz"></quiz-grid-item>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import QuizGridItem from "@/components/QuizGridItem.vue";

export default defineComponent({
  name: "QuizGridView",

  components: {
    QuizGridItem,
  },

  data() {
    return {};
  },

  computed: {
    getQuizList() {
      return this.$store.state.quizList;
    },
  },

  mounted() {
    this.$store.commit("selectQuizList");
  },
});
</script>

<style scoped>
.grid-item {
  width: 300px;
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
}

.grid-descript {
  bottom: 0;
  width: 100%;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  padding-bottom: 5px;
}

.grid-text {
  height: 36px;
}
</style>
