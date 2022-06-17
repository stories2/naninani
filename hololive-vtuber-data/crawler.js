function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}
var vtuberList = [];
document.querySelectorAll("table.FDomE4Kz").forEach((ele, idx) => {
  if (idx >= 10) {
    const nameEle = ele.querySelector("tbody > tr:nth-child(1) > td");
    const imgEle = ele
      .querySelector("tbody > tr:nth-child(2) > td")
      .querySelector("img.jugLtd2I");
    if (!nameEle || !imgEle) {
      console.log(`idx: ${idx} undefined`);
    } else {
      const img = new Image();
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        if (width <= 0 || height <= 0) {
          console.log(`idx: ${idx}`, imgEle, width, height);
        }
        const widthSplit = width / 4;
        const heightSplit = height / 4;
        vtuberList.push({
          qid: "sample_vtuber_quiz",
          answer: nameEle.textContent,
          x: 0,
          y: 0,
          width: width,
          height: height,
          crop_x: getRandomInt(0, width - widthSplit),
          crop_y: getRandomInt(0, height - heightSplit),
          crop_width: widthSplit,
          crop_height: heightSplit,
          imgUrl: "https:" + imgEle.getAttribute("src"),
        });
      };
      img.src = "https:" + imgEle.getAttribute("src");
    }
  }
});
JSON.stringify(vtuberList);
