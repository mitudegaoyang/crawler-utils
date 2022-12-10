const fs = require('fs');
//系统路径模块
let path = require('path');
// 原始链接
let urlList = require('./json/check.json');
let formatList = require('./json/formatFinsh.json');

// 根据新数据更新老数据
let getYearCnt = function (arrBase, arrFormat) {
  for(var i = 0; i <arrFormat.length; i++) {
    let index = arrBase.findIndex(function(elem, index, arr){
      return elem.id === arrFormat[i].id;
    })
    arrBase[index].link = arrBase[index].link || arrFormat[i].link;
    arrBase[index].summary = arrBase[index].summary || arrFormat[i].summary;
    arrBase[index].imdb = arrBase[index].imdb || arrFormat[i].imdb;
    arrBase[index].imdb_user = arrBase[index].imdb_user || arrFormat[i].imdb_user;
    arrBase[index].douban = arrBase[index].douban || arrFormat[i].douban;
    arrBase[index].douban_user = arrBase[index].douban_user || arrFormat[i].douban_user;
    arrBase[index].category = arrBase[index].category || arrFormat[i].category;
    arrBase[index].translation = arrBase[index].translation || arrFormat[i].translation;
    arrBase[index].name = arrBase[index].name || arrFormat[i].name;
    arrBase[index].year = arrBase[index].year || arrFormat[i].year;
    arrBase[index].areas = arrBase[index].areas || arrFormat[i].areas;
    arrBase[index].language = arrBase[index].language || arrFormat[i].language;
    arrBase[index].caption = arrBase[index].caption || arrFormat[i].caption;
    arrBase[index].release = arrBase[index].release || arrFormat[i].release;
    arrBase[index].time = arrBase[index].time || arrFormat[i].time;
    arrBase[index].director = arrBase[index].director || arrFormat[i].director;
    arrBase[index].writers = arrBase[index].writers || arrFormat[i].writers;
    arrBase[index].actor = arrBase[index].actor || arrFormat[i].actor;
    arrBase[index].tag = arrBase[index].tag || arrFormat[i].tag;
    arrBase[index].introduction = arrBase[index].introduction || arrFormat[i].introduction;
  }
  return arrBase;
  //   return obj;
};

// 格式化json
let text = JSON.stringify(getYearCnt(urlList, formatList));

// 指定要创建的目录和文件名称 __dirname为执行当前js文件的目录
let file = path.join(__dirname + '/json', 'movieList.json');

//写入文件
fs.writeFile(file, text, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('文件创建成功~' + file);
  }
});
