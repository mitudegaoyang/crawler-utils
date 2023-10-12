const api = require('./utils/api.js');
const utils = require('./utils/utils.js');
//系统路径模块
let path = require('path');
// 临时存储数据
let datas = [];
// 原始链接
let movieList = require('./json/movieList.json');

let num = 0; // 设置起始值

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
    utils.writeFile(datas, __dirname + '/json', 'formatFinsh.json', isFinished);
  };
  api.getDoubanImdb(id, cb);
};

for (var i = num; i < movieList.length; i++) {
  if (movieList[i].douban_id) {
    getMovie(movieList[i].douban_id, movieList[i], i === movieList.length - 1);
  }
}

console.log('---------------开始爬取---------------');
