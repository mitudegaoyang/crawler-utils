const fs = require('fs');
//系统路径模块
let path = require('path');

let formatList = require('./json/movieList.json');
for (i = 0; i < formatList.length; i++) {
  console.log(formatList[i].id);
  // formatList[i].summary = formatList[i].summary.replace(/[\】:\/\/dygod][\s\S]*[.rmvb]/g, '');
  // formatList[i].introduction = formatList[i].introduction.replace(
  //   /[\】:\/\/dygod][\s\S]*[.rmvb]/g,
  //   ''
  // );
  // formatList[i].summary = formatList[i].summary.replace(/[\】][\s\S]*[.720p]/g, '');
  // formatList[i].introduction = formatList[i].introduction.replace(/[\】][\s\S]*[.720p]/g, '');
  formatList[i].summary = formatList[i].summary.replace(/[\】下载][\s\S]*[.720p]/g, '');
  formatList[i].introduction = formatList[i].introduction.replace(/[\】下载][\s\S]*[.720p]/g, '');
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
