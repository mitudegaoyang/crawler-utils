const fs = require('fs');
//系统路径模块
let path = require('path');
const base64 = require('./utils/base64.js');
let formatList = require('./json/format.json');
for (i = 0; i < formatList.length; i++) {
  // if (formatList[i].img === "") {
  //     formatList[i].img = "https://img9.doubanio.com/view/photo/l_ratio_poster/public/p.jpg"
  // }
  // for (j = 0; j < formatConfig.errUrl.length; j++) {
  //     if (formatList[i].img.includes(formatConfig.errUrl[j])) {
  //         formatList[i].img = "https://img9.doubanio.com/view/photo/l_ratio_poster/public/p.jpg"
  //     }
  // }
  // delete formatList[i].img2;
  // formatList[i].date = !!formatList[i].date.match(/点击/g) ? !!formatList[i].date.match(/点击/g)[0] : formatList[i].date;

  formatList[i].link = !!formatList[i].link.match(/ftp/g)
    ? base64.ThunderEncode(formatList[i].link)
    : formatList[i].link;

  // 生成urlList
  // delete formatList[i].img;
  // delete formatList[i].img2;
  // delete formatList[i].link;
  // delete formatList[i].summary;
  // delete formatList[i].imdb;
  // delete formatList[i].imdb_user;
  // delete formatList[i].douban;
  // delete formatList[i].douban_user;
  // delete formatList[i].category;
  // delete formatList[i].translation;
  // delete formatList[i].name;
  // delete formatList[i].year;
  // delete formatList[i].areas;
  // delete formatList[i].language;
  // delete formatList[i].caption;
  // delete formatList[i].release;
  // delete formatList[i].time;
  // delete formatList[i].director;
  // delete formatList[i].writers;
  // delete formatList[i].actor;
  // delete formatList[i].starring;
  // delete formatList[i].tag;
  // delete formatList[i].introduction;
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
