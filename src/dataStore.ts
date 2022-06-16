import { State } from "vue";
import { createStore } from "vuex";
import { QuizDao } from "./lib/quiz-dao";
import { getCurrentInstance } from "vue";

const quizDao = new QuizDao();

// Create a new store instance.
export const store = createStore({
  state() {
    return {
      correctCnt: 0,
      quizList: [],
    };
  },
  mutations: {
    resetCorrectCnt(state: State) {
      state.correctCnt = 0;
    },
    increaseCorrectCnt(state: State) {
      state.correctCnt++;
    },

    selectQuizList(state: State) {
      quizDao
        .getQuizList()
        .then((list) => {
          state.quizList = list;
        })
        .catch((err) => {
          console.error(`[Store] [selectQuizList] err: ${err.message}`);
        });
    },
  },
});
