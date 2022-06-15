const vtuberList = [];
document.querySelectorAll("table.oxMRKOsx").forEach((ele, idx) => {
  if (idx >= 10) {
    const nameEle = ele.querySelector("tbody > tr:nth-child(1) > td");
    const imgEle = ele
      .querySelector("tbody > tr:nth-child(2) > td")
      .querySelector("img.NAneLQCl");
    if (!nameEle || !imgEle) {
      console.log(`idx: ${idx} undefined`);
    } else {
      vtuberList.push({
        name: nameEle.textContent,
        img: "https:" + imgEle.getAttribute("src"),
      });
    }
  }
});
vtuberList;
