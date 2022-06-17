const vtuberList = require("./vtuberList.json");

const download = require("image-downloader");

const promiseList = [];

vtuberList.forEach((i) => {
  const options = {
    url: i.imgUrl,
    dest: `/Users/stories2/Documents/GitHub/naninani/hololive-vtuber-data/img/${i.answer}.png`, // will be saved to /path/to/dest/image.jpg
  };

  promiseList.push(download.image(options));
});

Promise.all(promiseList).then((re) => {
  console.log("re", re);
});
