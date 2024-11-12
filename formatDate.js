const fs = require('fs');
const dayjs = require('dayjs');
//系统路径模块
let path = require('path');

let formatList = require('./json/movieList.json');
let urlList = require('./json/urlList.json');
for (i = 0; i < formatList.length; i++) {
  let { date } = urlList.find((item) => {
    return item.id === formatList[i].id;
  });
  formatList[i].date = dayjs(date).format('YYYY-MM-DD HH:mm:ss');
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
