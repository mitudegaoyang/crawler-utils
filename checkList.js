const fs = require('fs');
//系统路径模块
let path = require('path');
// 原始链接
let urlList = require('./json/format.json');

// 根据link||year数据 判断是否信息需要补全
let getYearCnt = function (arr) {
  filterArr = arr.filter(function (elem, index, arr) {
    return elem.link === '' || elem.year === '' || elem.introduction === '';
  });
  return filterArr;
  //   return obj;
};

// 格式化json
let text = JSON.stringify(getYearCnt(urlList));

// 指定要创建的目录和文件名称 __dirname为执行当前js文件的目录
let file = path.join(__dirname + '/json', 'urlList.json');

//写入文件
fs.writeFile(file, text, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('文件创建成功~' + file);
  }
});
