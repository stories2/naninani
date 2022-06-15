export interface QuizModel {
  idx: string;
  url: string;
  name: string;
}

type Permission = "public" | "private" | "onlyMe";
type Lang = "kr | en | jp";

type QuizData = {
  qid: string;
  imgUrl: string;
  x: number;
  y: number;
  width: number;
  height: number;
  answer: string;
};

type QuizLang = {
  default: boolean;
  lang: Lang;
  title: string;
  description: string;
};

type QuizComment = QuizData & {
  player: PlayerInfo;
  text: string;
  createDatetime: Date;
  isDeleted: boolean;
  deleteDatetime: Date;
};

type QuizLike = {
  player: PlayerInfo;
  createDatetime: Date;
};

type PlayerInfo = {
  uid: string;
  nickname: string;
  email: string;
};

export type QuizInfo = {
  permission: Permission;
  player: PlayerInfo;
  createDatetime: Date;
  isDeleted: boolean;
  deleteDatetime: Date;
  info: QuizLang[];
  data: QuizData[];
  comments: number;
  comment: QuizComment[];
  likes: number;
  like: QuizLike[];
};
