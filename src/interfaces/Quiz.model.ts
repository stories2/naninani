export interface QuizModel {
  idx: string;
  url: string;
  name: string;
}

export type Permission = "public" | "private" | "onlyMe";
export type Lang = "kr" | "en" | "jp";

export type QuizData = {
  qid: string;
  imgUrl: string;
  x: number;
  y: number;
  width: number;
  height: number;
  crop_x: number;
  crop_y: number;
  crop_width: number;
  crop_height: number;
  answer: string;
};

export type QuizLang = {
  default: boolean;
  lang: Lang;
  title: string;
  description: string;
};

export type QuizComment = QuizData & {
  player: PlayerInfo;
  text: string;
  createDatetime: Date;
  isDeleted: boolean;
  deleteDatetime: Date;
};

export type QuizLike = {
  player: PlayerInfo;
  createDatetime: Date;
};

export type PlayerInfo = {
  uid: string;
  nickname: string;
  email: string;
};

export type QuizInfo = {
  docID: string;
  permission: Permission;
  player: PlayerInfo;
  createDatetime: Date;
  isDeleted: boolean;
  deleteDatetime: Date | null;
  maxCorrection: number;
  info: QuizLang[];
  data: QuizData[];
  comments: number;
  comment: QuizComment[];
  likes: number;
  like: QuizLike[];
  thumbnail: string;
  answerNum: number;
};
