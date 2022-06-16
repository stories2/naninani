import { QuizInfo } from "@/interfaces/Quiz.model";
import { FirebaseApp, getApp } from "firebase/app";
import {
  Firestore,
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export class QuizDao {
  firestore: Firestore;

  constructor(app: FirebaseApp = getApp()) {
    console.log("app", app);
    this.firestore = getFirestore(app);
  }

  async getQuizList() {
    const quizList: QuizInfo[] = [];
    const q = query(collection(this.firestore, "quiz"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id, " => ", doc.data());
      quizList.push({
        ...doc.data(),
        docID: doc.id,
      } as QuizInfo);
    });
    return quizList;
  }
}
