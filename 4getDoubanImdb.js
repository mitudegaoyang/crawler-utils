const Crawler = require('crawler');
const fs = require('fs');
//系统路径模块
let path = require('path');
const format = require('./utils/format.js');
const utils = require('./utils/utils.js');
// 临时存储数据
let data = {};

let c = new Crawler({
  maxConnections: 1,
  followRedirect: false,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N)'
  },
  // 在每个请求处理完毕后将调用此回调函数
  callback: function (error, res, done) {
    if (error) {
      console.log(error);
      console.log(`错误条目${res.options.title}%`);
    } else {
      // var $ = res.$;
      // $ 默认为 Cheerio 解析器
      // 它是核心jQuery的精简实现，可以按照jQuery选择器语法快速提取DOM元素
      if (res.request.uri.host !== 'www.imdb.com') {
        let json = {
          douban_id: doubanId.toString()
        };
        data = format.formatDouban(res, json);
        c.queue([`${imdb}${data.imdb_id}/`]);
      } else {
        let jsonTemp = format.formatDouban(res, data);
        let json = {
          img: jsonTemp.img,
          imdb_id: jsonTemp.imdb_id,
          imdb: jsonTemp.imdb,
          imdb_user: jsonTemp.imdb_user,
          douban_id: jsonTemp.douban_id,
          douban: jsonTemp.douban,
          douban_user: jsonTemp.douban_user,
          category: '-----------',
          name: jsonTemp.name
        };
        // 当爬取完毕输出
        let text = JSON.stringify(json);
        // 指定要创建的目录和文件名称 __dirname为执行当前js文件的目录
        let file = path.join(__dirname + '/json', 'data.json');
        //写入文件
        fs.writeFile(file, text, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('文件创建成功~' + file);
          }
        });
      }
      // // 格式化json
      // datas = [...datas, ...json];
      // let progress = utils.getProgress(res.options.key, num);
      // console.log(`进度${progress}%`);
    }
    done();
  }
});

// 将一个URL加入请求队列，并使用默认回调函数
// c.queue(urlList[num].url);
// c.queue([urlList[num].url,urlList[num+1].url,urlList[num+2].url,urlList[num+3].url,urlList[num+4].url]);

let imdb = 'https://www.imdb.com/title/';
let douban = 'https://movie.douban.com/subject/';

let doubanId = 26698676;
let urls = [`${douban}${doubanId}/`];

c.queue(urls);

// let url = base64.ThunderEncode("ftp");
// console.log(url)

// 将多个URL加入请求队列
// c.queue(['http://www.google.com/', 'http://www.yahoo.com']);

console.log('---------------开始爬取---------------');
