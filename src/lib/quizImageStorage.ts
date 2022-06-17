import {
  FirebaseStorage,
  getStorage,
  ref,
  getDownloadURL,
} from "firebase/storage";
import { FirebaseApp, getApp } from "firebase/app";

export class QuizImageStorage {
  firebaseStorage: FirebaseStorage;

  constructor(app: FirebaseApp = getApp()) {
    console.log("app", app);
    this.firebaseStorage = getStorage(app);
  }

  getImageUrl(quizID: string, imageName: string): Promise<string> {
    return getDownloadURL(
      ref(this.firebaseStorage, `quiz/${quizID}/${imageName}.png`)
    );
  }
}
