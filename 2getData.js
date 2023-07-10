const Crawler = require('crawler');
const format = require('./utils/format.js');
const utils = require('./utils/utils.js');
const fs = require('fs');
//系统路径模块
let path = require('path');
// 临时存储数据
let datas = [];
// 原始链接
let urlList = require('./json/urlList.json');

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
      let json = format.formatDetails(res);
      // 格式化json
      datas.push(json);
      let progress = utils.getProgress(res.options.key, urlList.length);
      console.log(`进度${progress}%`);
      // 当爬取完毕输出
      let text = JSON.stringify(datas);

      // 指定要创建的目录和文件名称 __dirname为执行当前js文件的目录
      let file = path.join(__dirname + '/json', 'movieList.json');

      //写入文件
      fs.writeFile(file, text, function (err) {
        if (err) {
          console.log(err);
        } else {
          if (res.options.key === urlList.length) {
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

let num = 0; // 设置起始值
let urls = [];

for (var i = num; i < urlList.length; i++) {
  if (urlList[i]) {
    let item = {};
    item.key = i + 1;
    item.uri = urlList[i].url;
    item.id = urlList[i].id;
    item.title = urlList[i].title.match(/(\《)[\s|\S]*?(\》)/g)[0].replace(/\《|\》/g, '');
    item.url = urlList[i].url;
    item.date = urlList[i].date;
    item.desc = urlList[i].desc;
    item.img = urlList[i].img;
    urls.push(item);
  }
}
c.queue(urls);

// let url = base64.ThunderEncode("ftp");
// console.log(url)

// 将多个URL加入请求队列
// c.queue(['http://www.google.com/', 'http://www.yahoo.com']);

console.log('---------------开始爬取---------------');
