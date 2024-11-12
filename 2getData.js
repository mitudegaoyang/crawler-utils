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
      console.log(`错误条目${res.options.uri}:`, error);
    } else {
      // var $ = res.$;
      // $ 默认为 Cheerio 解析器
      // 它是核心jQuery的精简实现，可以按照jQuery选择器语法快速提取DOM元素
      let json = format.formatDetails(res);
      // 格式化json
      datas.push(json);

      const progress = utils.getProgress(res.options.key, urlList.length);
      console.log(`进度${progress}%`);

      // 当所有请求完成时，写入文件
      if (res.options.key === urlList.length) {
        datas.sort(utils.compare('id', 'desc'));
        const text = JSON.stringify(datas, null, 2); // 格式化 JSON 输出
        // 指定要创建的目录和文件名称 __dirname为执行当前js文件的目录
        const file = path.join(__dirname, 'json', 'movieList.json');

        fs.writeFile(file, text, (err) => {
          if (err) {
            console.error(`错误写入文件: ${err}`);
          } else {
            console.log(`文件创建成功: ${file}`);
          }
        });
      }
    }
    done();
  }
});

// 准备 URL 列表
const urls = urlList.map((item, index) => {
  const titleMatch = item.title.match(/(\《)[\s\S]*?(\》)/);
  return {
    key: index + 1,
    uri: item.url,
    id: item.id,
    title: titleMatch ? titleMatch[0].replace(/\《|\》/g, '').split('/')[0] : '',
    url: item.url,
    date: item.date,
    desc: item.desc,
    img: item.img
  };
});

c.queue(urls);

console.log('---------------开始爬取---------------');
