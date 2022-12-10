const fs = require('fs');
//系统路径模块
let path = require('path');
let formatList = require('./json/movieList.json');
// 单个文件条目数
let fileLength = 400;
// 按文件条目拆分循环次数
let num = Math.ceil(formatList.length / fileLength);
console.log(`共${num}个文件`);
for (i = 0; i < num; i++) {
  // 格式化json
  let text = JSON.stringify(formatList.splice(-fileLength));

  // 指定要创建的目录和文件名称 __dirname为执行当前js文件的目录
  let file = path.join(__dirname + '/out', `${i + 1}.json`);

  //写入文件
  fs.writeFile(file, text, function (err) {
    if (err) {
      console.log(err);
    } else {
      if (i === num - 1) {
        console.log('文件创建成功~');
      }
    }
  });
}

// 格式化json
// let fileListData = JSON.stringify(formatList);

// let fileList = path.join(__dirname + '/json', 'movieList.json');
//写入文件
// fs.writeFile(fileList, fileListData, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('文件更新成功~' + fileList);
//   }
// });
