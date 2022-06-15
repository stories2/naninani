import { State } from "vue";
import { createStore } from "vuex";
import {
  PlayerInfo,
  QuizInfo,
  QuizLang,
  QuizData,
  QuizComment,
  QuizLike,
} from "./interfaces/Quiz.model";

// Create a new store instance.
export const store = createStore({
  state() {
    return {
      correctCnt: 0,
      quizList: [
        {
          permission: "public",
          player: {
            email: "test@example.com",
            nickname: "tester",
            uid: "asdf",
          } as PlayerInfo,
          createDatetime: new Date(),
          isDeleted: false,
          deleteDatetime: null,
          info: [
            {
              default: true,
              lang: "kr",
              title: "홀로라이브 버튜버 이름 맞추기",
              description: "JP, EN, ID",
            } as QuizLang,
            {
              default: false,
              lang: "en",
              title: "Guess Hololive V-tuber name",
              describe: "JP, EN, ID",
            },
          ] as QuizLang[],
          data: [
            {
              qid: "asdfasdfasf",
              imgUrl: "",
              answer: "ときのそら",
            } as QuizData,
          ] as QuizData[],
          comments: 1,
          comment: [] as QuizComment[],
          likes: 1,
          like: [] as QuizLike[],
        } as QuizInfo,
      ],
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
