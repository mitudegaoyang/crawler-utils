const fs = require('fs');
//系统路径模块
let path = require('path');

let formatList = require('./json/movieList.json');
for (i = 0; i < formatList.length; i++) {
  console.log(formatList[i].summary)
  formatList[i].introduction = formatList[i].summary.match(/[【简介】][\s\S]*[【下载地址】]/g)[0].replace(/[【简介】|【下载地址】]/g, '');
}
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
