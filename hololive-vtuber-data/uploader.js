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
// let rawdata = fs.readFileSync("./service-account.json");
// let serviceAccount = JSON.parse(rawdata);
// console.log("acc", serviceAccount);
const app = initializeApp({
  credential: cert(serviceAccount),
});
console.log("app: ", app.name, getApps());
const firestore = getFirestore();
firestore
  .runTransaction(async (tran) => {
    const result = tran.create(
      firestore.collection("/quiz/erECtjojBTIrCT50wdRh/data").doc(),
      {
        name: "Tokyo",
        country: "Japan",
      }
    );
    console.log("re", result);
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
