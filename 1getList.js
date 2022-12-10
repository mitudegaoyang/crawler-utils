const Crawler = require('crawler');
const fs = require('fs');
//系统路径模块
let path = require('path');
const format = require('./utils/format.js');
const utils = require('./utils/utils.js');
// 临时存储数据
let datas = [];

let c = new Crawler({
  maxConnections: 1,
  followRedirect: false,
  // 在每个请求处理完毕后将调用此回调函数
  callback: function (error, res, done) {
    if (error) {
      console.log(error);
      console.log(`错误条目${res.options.title}%`);
    } else {
      // var $ = res.$;
      // $ 默认为 Cheerio 解析器
      // 它是核心jQuery的精简实现，可以按照jQuery选择器语法快速提取DOM元素
      let json = format.formatList(res, host);
      // 格式化json
      datas = [...datas, ...json];
      let progress = utils.getProgress(res.options.key, num);
      console.log(`进度${progress}%`);
      // 当爬取完毕输出
      let text = JSON.stringify(datas);

      // 指定要创建的目录和文件名称 __dirname为执行当前js文件的目录
      let file = path.join(__dirname + '/json', 'urlList.json');

      //写入文件
      fs.writeFile(file, text, function (err) {
        if (err) {
          console.log(err);
        } else {
          if (res.options.key === num) {
            console.log('文件创建成功~' + file);
          }
        }
      });
    }
    done();
  }
});

// 将一个URL加入请求队列，并使用默认回调函数
// c.queue(urlList[num].url);
// c.queue([urlList[num].url,urlList[num+1].url,urlList[num+2].url,urlList[num+3].url,urlList[num+4].url]);

let start = 1; // 设置起始请求页数
let num = 1; // 设置请求页数总数
let host = 'https://www.dytt8.net';
let urls = [];

for (var i = start; i < num + 1; i++) {
  let item = {};
  item.key = i;
  // item.uri = host + '/html/gndy/dyzz/list_23_' + i + '.html';
  item.uri = host + '/html/gndy/jddy/list_63_' + i + '.html';
  urls.push(item);
}
c.queue(urls);

// let url = base64.ThunderEncode("ftp");
// console.log(url)

// 将多个URL加入请求队列
// c.queue(['http://www.google.com/', 'http://www.yahoo.com']);

console.log('---------------开始爬取---------------');
