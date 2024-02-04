const fs = require('fs');
//系统路径模块
let path = require('path');
const utils = require('./utils/utils.js');
const OrderByName = 'id';
const OrderBy = 'desc';

let formatList = require('./json/movieList.json');
formatList.sort(utils.compare(OrderByName, OrderBy));
// 格式化json
let text = JSON.stringify(formatList);

// 指定要创建的目录和文件名称 __dirname为执行当前js文件的目录
let file = path.join(__dirname + '/json', 'formatFinsh.json');

//写入文件
fs.writeFile(file, text, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('文件创建成功~' + file);
  }
});
