// import fs from "fs";
// const fs = require("fs");
const {
  initializeApp,
  applicationDefault,
  cert,
  getApps,
} = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");

const serviceAccount = require("./service-account.json");
const vtuberList = require("./vtuberList.json");
const app = initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "naninani-c5b7f.appspot.com",
});
const bucket = getStorage().bucket();

vtuberList.forEach((i) => {
  bucket
    .upload(`./img/${i.answer}.png`, {
      destination: `quiz/erECtjojBTIrCT50wdRh/${i.answer}.png`,
    })
    .then((res) => {
      console.log("res", res);
    });
});
// console.log(bucket);
