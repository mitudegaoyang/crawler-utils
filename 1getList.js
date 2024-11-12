const Crawler = require('crawler');
const fs = require('fs');
//系统路径模块
let path = require('path');
const format = require('./utils/format.js');
const utils = require('./utils/utils.js');
const config = require('./config.js');

// 临时存储数据
let datas = [];

// 创建Crawler实例
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
      let json = format.formatList(res, host);
      // 格式化json
      datas = [...datas, ...json];
      let progress = utils.getProgress(res.options.key, num);
      console.log(`进度${progress}%`);
    }
    done();
  }
});

// 完成所有请求后的回调
c.on('drain', () => {
  // 将数据写入文件
  const text = JSON.stringify(datas, null, 2); // 格式化JSON输出
  const file = path.join(__dirname, 'json', 'urlList.json');

  fs.writeFile(file, text, (err) => {
    if (err) {
      console.error('写入文件时出错:', err);
    } else {
      console.log('文件创建成功:', file);
    }
  });
});

// 生成URI的函数
function generateUri(host, type, page) {
  return `${host}${type}${page}.html`;
}

// 从命令行参数获取配置
const args = process.argv.slice(2);
const typeKey = args[0] || 't1'; // 默认使用 dyzz (t1)
const hostKey = args[1] || 'h1'; // 默认使用 dydytt (h1)

// 解析简写的别名
const getRealKey = (alias, keyType) => {
  const realKey = config.aliases[alias];
  if (!realKey) {
    console.error(`未知的${keyType}别名: ${alias}`);
    process.exit(1);
  }
  return realKey;
};

const host = config.hosts[getRealKey(hostKey, '主机')];
const uriType = config.types[getRealKey(typeKey, '类型')];

// 配置爬虫参数
let start = 1; // 设置起始请求页数
let num = 4; // 设置请求页数总数
let urls = [];

for (let i = start; i <= num; i++) {
  urls.push({
    key: i,
    uri: generateUri(host, uriType, i)
  });
}
c.queue(urls);

console.log('---------------开始爬取---------------');
