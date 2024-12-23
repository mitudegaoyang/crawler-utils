const api = require("./utils/api.js");
const utils = require("./utils/utils.js");
//系统路径模块
let path = require("path");
// 临时存储数据
let datas = [];
// 原始链接
let movieList = require("./json/movieList.json");

function getRandomDelay(min, max) {
  // 确保min和max是毫秒值
  min = Math.ceil(min * 1000);
  max = Math.floor(max * 1000);
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(`等待: ${delay / 1000} 秒`);
  return delay;
}

let delay = (min = 0.5, max = 3) =>
  new Promise((resolve) => setTimeout(resolve, getRandomDelay(min, max)));

// 新的获取方法
async function getMovies() {
  let doubanDatas = [];
  const cb = async (e) => {
    let data = movieList.find((elem, index, arr) => {
      return elem.douban_id === e.douban_id;
    });
    data.imdb_id = data.imdb_id || e.imdb_id;
    data.imdb = data.imdb || e.imdb;
    data.imdb_user = data.imdb_user || e.imdb_user;
    data.douban_id = data.douban_id || e.douban_id;
    data.img = e.img || data.img;
    data.douban = e.douban || data.douban;
    data.douban_user = e.douban_user || data.douban_user;
    data.director = data.director || e.director;
    data.writers = data.writers || e.writers;
    data.actor = data.actor || e.actor;
    doubanDatas.push(data);
    doubanDatas.sort(utils.compare("id", "desc"));
    let progress = utils.getProgress(doubanDatas.length, movieList.length * 2);
    console.log(`进度${progress}%`);
    if (doubanDatas.length === movieList.length) {
      getImdbMovies(doubanDatas);
    }
    utils.writeFile(
      doubanDatas,
      __dirname + "/json",
      "formatFinsh.json",
      progress === 100
    );
    // 等待一段时间再继续下一个请求
    await delay(0.5, 3); // 等待0.5~3秒
  };
  api.getDoubans(movieList, cb);
}
async function getImdbMovies(datas) {
  let count = 0;
  let cb = async (e) => {
    let data = datas.find((elem, index, arr) => {
      return elem.imdb_id === e.imdb_id;
    });
    data.imdb = e.imdb || data.imdb;
    data.imdb_user = e.imdb_user || data.imdb_user;
    delete data.uri;
    count++;
    datas.sort(utils.compare("id", "desc"));

    let progress = utils.getProgress(
      movieList.length + count,
      movieList.length * 2
    );
    console.log(`进度${progress}%`);

    utils.writeFile(
      datas,
      __dirname + "/json",
      "formatFinsh.json",
      progress === "100.00"
    );
  };
  await api.getImdbs(datas, cb);
}

// 调用新的获取方法
(async () => {
  console.log("---------------开始爬取---------------");
  await getMovies();
})();

// 旧的获取方法
let getMovie = function (id, data, isFinished) {
  let cb = (e) => {
    data.imdb_id = data.imdb_id || e.imdb_id;
    data.imdb = data.imdb || e.imdb;
    data.imdb_user = data.imdb_user || e.imdb_user;
    data.douban_id = data.douban_id || e.douban_id;
    data.douban = data.douban || e.douban;
    data.douban_user = data.douban_user || e.douban_user;
    data.director = data.director || e.director;
    data.writers = data.writers || e.writers;
    data.actor = data.actor || e.actor;
    datas.push(data);
    datas.sort(utils.compare("id", "desc"));
    let progress = utils.getProgress(datas.length, movieList.length);
    console.log(`进度${progress}%`);
    utils.writeFile(datas, __dirname + "/json", "formatFinsh.json", isFinished);
  };
  api.getDoubanImdb(id, cb);
};

// for (var i = num; i < movieList.length; i++) {
//   if (movieList[i].douban_id) {
//     getMovie(movieList[i].douban_id, movieList[i], i === movieList.length - 1);
//   }
// }

console.log("---------------开始爬取---------------");
