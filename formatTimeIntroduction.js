const fs = require('fs');
//系统路径模块
let path = require('path');
let formatList = require('./json/format.json');
let movieList = require('./json/movieList.json');
for (i = 0; i < formatList.length; i++) {
  if (formatList[i].time === "") {
    // console.log('t '+movieList[i].id)
    if (movieList.find(item => {return item.id == formatList[i].id})){
      let item = movieList.find(item => {return item.id == formatList[i].id});
      formatList[i].summary = item.summary;
      formatList[i].imdb = item.imdb;
      formatList[i].imdb_user = item.imdb_user;
      formatList[i].douban = item.douban;
      formatList[i].douban_user = item.douban_user;
      formatList[i].category = item.category;
      formatList[i].translation = item.translation;
      formatList[i].name = item.name;
      formatList[i].year = item.year;
      formatList[i].areas = item.areas;
      formatList[i].language = item.language;
      formatList[i].caption = item.caption;
      formatList[i].release = item.release;
      formatList[i].time = item.time;
      formatList[i].director = item.director;
      formatList[i].writers = item.writers;
      formatList[i].actor = item.actor;
      formatList[i].tag = item.tag;
      formatList[i].introduction = item.introduction;
    };
  } else if (formatList[i].introduction === ""){
    if (movieList.find(item => {return item.id == formatList[i].id})){
      let item = movieList.find(item => {return item.id == formatList[i].id});
      formatList[i].summary = item.summary;
      formatList[i].introduction = item.introduction;
    };
  } else if (formatList[i].summary === ""){
    if (movieList.find(item => {return item.id == formatList[i].id})){
      let item = movieList.find(item => {return item.id == formatList[i].id});
      formatList[i].summary = item.summary;
    };
  }
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
