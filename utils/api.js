/**
 *  获取单个豆瓣、IMDB评分
 */
let getDoubanImdb = function (doubanId, cb) {
  let json;
  const Crawler = require("crawler");
  const fs = require("fs");
  //系统路径模块
  let path = require("path");
  const format = require("./format.js");
  // 临时存储数据
  let data = {};

  let c = new Crawler({
    maxConnections: 1,
    followRedirect: false,
    headers: {
      "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N)",
    },
    // 在每个请求处理完毕后将调用此回调函数
    callback: function (error, res, done) {
      if (error) {
        // writeFile(data);
        console.log(error);
        console.log(`错误条目${res.options.title}%`);
      } else {
        console.log(res.request);
        // var $ = res.$;
        // $ 默认为 Cheerio 解析器
        // 它是核心jQuery的精简实现，可以按照jQuery选择器语法快速提取DOM元素
        if (res.request.uri.host !== "www.imdb.com") {
          let json = {
            douban_id: doubanId.toString(),
          };
          data = format.formatDouban(res, json);
          if (data.imdb_id) {
            c.queue([`${imdb}${data.imdb_id}/`]);
          } else {
            writeFile(data);
          }
        } else {
          let jsonTemp = format.formatDouban(res, data);
          writeFile(jsonTemp);
        }
      }
      done();
    },
  });

  let writeFile = (data) => {
    json = {
      title: data.title,
      line: "-----------",
      img: data.img,
      imdb_id: data.imdb_id || "",
      imdb: data.imdb || "",
      imdb_user: data.imdb_user || "",
      douban_id: data.douban_id,
      douban: data.douban,
      douban_user: data.douban_user,
      release: data.release,
      category: data.category,
      translation: data.translation,
      name: data.name,
      year: data.year,
      areas: data.areas,
      language: data.language,
      caption: "中英双字",
      time: data.time,
      director: data.director,
      writers: data.writers,
      actor: data.actor,
      tag: "",
      isRepeat: false,
      introduction: data.introduction,
    };
    cb(json);
    // // 当爬取完毕输出
    // let text = JSON.stringify(json);
    // // 指定要创建的目录和文件名称 __dirname为执行当前js文件的目录
    // let file = path.join(__dirname + '/json', 'data.json');
    // //写入文件
    // fs.writeFile(file, text, function (err) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log('文件创建成功~' + file);
    //   }
    // });
  };

  // 将一个URL加入请求队列，并使用默认回调函数
  // c.queue(urlList[num].url);
  // c.queue([urlList[num].url,urlList[num+1].url,urlList[num+2].url,urlList[num+3].url,urlList[num+4].url]);

  let imdb = "https://www.imdb.com/title/";
  let douban = "https://movie.douban.com/subject/";

  // let doubanId = 1309120;
  let urls = [`${douban}${doubanId}/`];

  return c.queue(urls);
};

let delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 *  获取豆瓣评分
 */
let getDoubans = async function (datas, cb) {
  const Crawler = require("crawler");
  const format = require("./format.js");
  // 临时存储数据
  let data = {};

  let c = new Crawler({
    maxConnections: 1,
    rateLimit: 1000,
    timeout: 15000,
    headers: {
      "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N)",
    },
    // 在每个请求处理完毕后将调用此回调函数
    callback: async function (error, res, done) {
      if (error) {
        // writeFile(data);
        console.log(error);
        console.log(`错误条目${res.options.title}%`);
      } else {
        // var $ = res.$;
        // $ 默认为 Cheerio 解析器
        // 它是核心jQuery的精简实现，可以按照jQuery选择器语法快速提取DOM元素
        let json = res.options.data;
        data = format.updateDouban(res, json);
        await cb(data);
      }
      done();
    },
  });

  // 将一个URL加入请求队列，并使用默认回调函数
  // c.queue(urlList[num].url);
  // c.queue([urlList[num].url,urlList[num+1].url,urlList[num+2].url,urlList[num+3].url,urlList[num+4].url]);

  let douban = "https://movie.douban.com/subject/";
  let urls = datas.map((item) => ({
    uri: douban + item.douban_id,
    data: item,
  }));

  for (let url of urls) {
    await new Promise((resolve) => {
      c.queue(url);
      c.on("drain", resolve); // 当队列为空时调用resolve
    });
    await delay(1000); // 每次请求后等待1秒
  }

  return Promise.resolve(); // 返回一个Promise，当所有请求都完成后解析
};
/**
 *  获取IMDB评分
 */
let getImdbs = function (datas, cb) {
  let json;
  const Crawler = require("crawler");
  const fs = require("fs");
  //系统路径模块
  let path = require("path");
  const format = require("./format.js");

  let c = new Crawler({
    maxConnections: 1,
    rateLimit: 1000,
    timeout: 15000,
    headers: {
      "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N)",
    },
    // 在每个请求处理完毕后将调用此回调函数
    callback: function (error, res, done) {
      if (error) {
        // writeFile(data);
        console.log(error);
        console.log(`错误条目${res.options.title}%`);
      } else {
        let json = res.options.data;
        let jsonTemp = format.updateImdb(res, json);
        cb(jsonTemp);
      }
      done();
    },
  });

  // 将一个URL加入请求队列，并使用默认回调函数
  // c.queue(urlList[num].url);
  // c.queue([urlList[num].url,urlList[num+1].url,urlList[num+2].url,urlList[num+3].url,urlList[num+4].url]);

  let imdb = "https://www.imdb.com/title/";
  let urls = [];
  datas.map((item) => {
    urls.push({
      uri: imdb + item.imdb_id,
      data: item,
    });
  });
  return c.queue(urls);
};

module.exports = {
  getDoubanImdb,
  getDoubans,
  getImdbs,
};
