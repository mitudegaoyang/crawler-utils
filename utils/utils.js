/**
 *  获取进度
 */
let getProgress = function (i, all) {
  return ((i / all) * 100).toFixed(2);
};

/**
 *  生成文件
 */
let writeFile = function (json, dirname, filename, isFinished) {
  const fs = require('fs');
  //系统路径模块
  let path = require('path');
  // 当爬取完毕输出
  let text = JSON.stringify(json);
  // 指定要创建的目录和文件名称 __dirname为执行当前js文件的目录
  let file = path.join(dirname, filename);
  //写入文件
  fs.writeFile(file, text, function (err) {
    if (err) {
      console.log(err);
    } else if (isFinished) {
      console.log('文件创建成功~' + file);
    }
  });
};

module.exports = {
  getProgress,
  writeFile
};
