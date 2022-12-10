const fs = require('fs');
//系统路径模块
let path = require('path');
// 原始链接
let urlList = require('./json/urlList.json');

// 根据等级数据计算重复的个数
let getWordCnt = function (arr) {
  let arrData = arr;
  let obj = {};
  for (let i = 0; i < arrData.length; i++) {
    var item = arrData[i].id; // a为计算的属性,可换成b,c
    obj[item] = obj[item] + 1 || 1;
  }
  let pam = {};
  for (let i in obj) {
    if (obj[i] === 1) {
      pam[i] = obj[i];
    }
    // if (obj[i] > 1) {
    //   pam[i] = obj[i];
    // }
  }
  return pam;
  //   return obj;
};

// 格式化json
let text = JSON.stringify(getWordCnt(urlList));

// 指定要创建的目录和文件名称 __dirname为执行当前js文件的目录
let file = path.join(__dirname + '/json', 'check.json');

//写入文件
fs.writeFile(file, text, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('文件创建成功~' + file);
  }
});
