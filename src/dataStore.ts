import { State } from "vue";
import { createStore } from "vuex";

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
  },
});
