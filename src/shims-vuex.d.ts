import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";

declare module "@vue/runtime-core" {
  // Declare your own store states.
  interface State {
    correctCnt: number;
    quizList: QuizInfo[];
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
// https://stackoverflow.com/a/64414117
