import { QuizData, QuizInfo } from "@/interfaces/Quiz.model";
import { FirebaseApp, getApp } from "firebase/app";
import {
  Firestore,
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
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
    querySnapshot.forEach((document) => {
      // doc.data() is never undefined for query doc snapshots
      //   console.log(doc.id, " => ", doc.data());
      quizList.push({
        ...document.data(),
        docID: document.id,
      } as QuizInfo);
    });
    return quizList;
  }

  async getQuizData(quizID: string) {
    const docRef = doc(this.firestore, "quiz", quizID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const quizData = {
        ...docSnap.data(),
        data: [] as QuizData[],
        docID: quizID,
      } as QuizInfo;

      const dataRef = query(collection(this.firestore, `quiz/${quizID}/data`));
      const dataSnapshot = await getDocs(dataRef);

      dataSnapshot.forEach((document) => {
        quizData.data.push({
          ...document.data(),
        } as QuizData);
      });
      return quizData;
    } else {
      throw new Error(`quiz id ${quizID}'s data undefined`);
    }
  }
}
