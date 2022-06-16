// import fs from "fs";
// const fs = require("fs");
const {
  initializeApp,
  applicationDefault,
  cert,
  getApps,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const serviceAccount = require("./service-account.json");
const vtuberList = require("./vtuberList.json");
// let rawdata = fs.readFileSync("./service-account.json");
// let serviceAccount = JSON.parse(rawdata);
// console.log("acc", serviceAccount);
const app = initializeApp({
  credential: cert(serviceAccount),
});
console.log("app: ", app.name, vtuberList.length);
const docID = "erECtjojBTIrCT50wdRh";
const firestore = getFirestore();
firestore
  .runTransaction(async (tran) => {
    vtuberList.forEach((vtuber) => {
      const result = tran.create(
        firestore.collection(`/quiz/${docID}/data`).doc(),
        {
          ...vtuber,
          qid: docID,
        }
      );
    });
    // console.log("re", result);
  })
  .catch((err) => {
    console.log("err", err);
  });
// firestore
//   .collection("/quiz/erECtjojBTIrCT50wdRh/data")
//   .add({
//     name: "Tokyo",
//     country: "Japan",
//   })
//   .then((res) => {
//     console.log("res", res);
//   })
