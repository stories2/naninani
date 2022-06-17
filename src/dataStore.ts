import { State } from "vue";
import { createStore } from "vuex";
import { QuizDao } from "./lib/quiz-dao";
import { getCurrentInstance } from "vue";
import { QuizInfo, QuizLog } from "./interfaces/Quiz.model";

const quizDao = new QuizDao();

// Create a new store instance.
export const store = createStore({
  state() {
    return {
      correctCnt: 0,
      quizList: [],
      quizInfo: null,
      quizLogList: [],
    };
  },
  mutations: {
    resetCorrectCnt(state: State) {
      state.correctCnt = 0;
    },
    increaseCorrectCnt(state: State) {
      state.correctCnt++;
    },

    appendQuizLog(state: State, quizLog: QuizLog) {
      state.quizLogList.push(quizLog);
    },

    resetQuizLog(state: State) {
      state.quizLogList.length = 0;
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

    getQuizInfo(state: State, quizID: string) {
      quizDao
        .getQuizData(quizID)
        .then((info) => {
          state.quizInfo = info;
        })
        .catch((err) => {
          console.error(`[Store] [getQuizInfo] err: ${err.message}`);
        });
    },

    resetQuizInfo(state: State) {
      state.quizInfo = null;
    },
  },
});
