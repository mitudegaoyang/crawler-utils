// 加载http模块
const http = require('http');
const https = require('https');
// 加载cheerio模块
const cheerio = require('cheerio');
// 加载url模块
const url = require('url');

// 定义电影网页地址数组
const movieUrls = [
  'https://movie.douban.com/subject/1292052/',
  'https://movie.douban.com/subject/1291561/',
  'https://movie.douban.com/subject/1292720/',
  'https://movie.douban.com/subject/1292063/',
  'https://movie.douban.com/subject/1291546/'
];

// 循环遍历电影地址数组
movieUrls.forEach((movieUrl) => {
  // 使用url.parse()方法，将电影网页地址解析为对象
  const movie = url.parse(movieUrl);
  let httpss = movie.protocol === 'https:' ? https : http;
  // 使用http.get()方法，发送http请求
  httpss.get(movie.href, (res) => {
    // 设置编码格式，防止乱码
    res.setEncoding('utf-8');
    // 定义数据变量
    let html = '';
    // 监听'data'事件，拼接数据
    res.on('data', (data) => {
      html += data;
    });
    // 监听'end'事件，处理数据
    res.on('end', () => {
      // 使用cheerio加载页面数据
      const $ = cheerio.load(html);
      // 定义电影信息对象
      const movie = {
        title: '',
        rating: '',
        director: '',
        actors: []
      };
      // 获取电影标题
      movie.title = $('#content h1 span').text();
      // 获取电影评分
      movie.rating = $('#interest_sectl strong').text();
      // 获取电影导演
      movie.director = $('#info span:nth-child(1) a').text();
      // 获取电影演员
      movie.actors = [];
      $('#info .actor .attrs a').each((index, element) => {
        movie.actors.push($(element).text());
      });
      // 输出电影信息
      console.log(movie);
    });
  });
});
