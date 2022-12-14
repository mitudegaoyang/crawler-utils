const dayjs = require('dayjs');
const base64 = require('./base64.js');
/**
 *  处理列表数据
 */
let formatList = function (res, host) {
  let $ = res.$;
  let json = [];
  let length = $(`.co_content8 table`).length;
  for (let i = 0; i < length; i++) {
    let item = {};
    item.id = $(`.co_content8 table:nth-child(${i + 1}) .ulink`)
      .attr('href')
      .replace(/\/|\.|\:|https|www|ygdy8|dytt8|com|net|html|gndy|jddy|yddy|dyzz|.html/g, '');
    item.title = $(`.co_content8 table:nth-child(${i + 1}) .ulink`).text();
    item.url = host + $(`.co_content8 table:nth-child(${i + 1}) .ulink`).attr('href');
    item.date = dayjs(
      $(`.co_content8 table:nth-child(${i + 1}) font`)
        .text()
        .replace(/\s*/g, '')
        .replace(/日期\：/g, '')
    ).format('YYYY-MM-DD HH:mm:ss');
    // 移除简介
    // item.desc = $(`.co_content8 table:nth-child(${i + 1}) tr:last-child td`).text();
    json.push(item);
  }
  return json;
};
/**
 *  处理详情数据
 */
let formatDetails = function (res) {
  let $ = res.$;
  let json = {};
  // console.log($("title").text());
  // console.log('title:');
  // console.log($(".title_all h1").text());
  // console.log('date:');
  // console.log($(".co_content8 ul").text().match(/(\d{4})[-](\d{2})[-](\d{2})/g)[0]);
  json.id = res.options.id;
  json.title = res.options.title;
  json.url = res.options.url;
  json.date = res.options.date;
  // json.desc = res.options.desc;
  if (!json.id) {
    json.id = json.url.replace(/\/|\.|\:|https|www|ygdy8|dytt8|com|net|html|gndy|dyzz|.html/g, '');
  }
  if (!json.date) {
    json.date =
      $('.co_content8 ul')
        .text()
        .replace(/\s*/g, '')
        .split('◎')[0]
        .replace(/发布时间\：/g, '') + ' 00:00:00';
  }
  if (!json.desc) {
    // json.desc = '';
    // console.log(
    //   $('#Zoom span')
    //     .text()
    //     .match(/发布时间：[\s\S]*[◎]/g)
    // );
  }

  // json.img2 = "";
  // 链接
  if ($('#Zoom a').attr('href')) {
    json.link = !!$('#Zoom a').attr('href').match(/ftp/g)
      ? base64.ThunderEncode($('#Zoom a').attr('href'))
      : $('#Zoom a').attr('href');
  } else {
    json.link = !!$('#Zoom a').text().match(/ftp/g)
      ? base64.ThunderEncode($('#Zoom a').text())
      : $('#Zoom a').text();
  }
  // json.link = !!$("#Zoom table a").attr('href').match(/ftp/g) ?
  //     base64.ThunderEncode($("#Zoom table a").attr('href')) : $("#Zoom table a").attr('href');
  // 简介
  // json.summary = $("#Zoom span").text().replace(/\s*/g, "").match(/◎[\s\S]*[下载地址]/g)[0].replace(/【下载地址/g, "");
  // 移除简介
  // json.summary = $('#Zoom span')
  //   .text()
  //   .replace(/\s*/g, '')
  //   .match(/[\s\S]*[下载地址|磁力链|ftp]/g)[0]
  //   .replace(/【下载地址|磁力链|ftp/g, '');
  json.img = res.options.img;
  json.img = !!$('#Zoom img').attr('src')
    ? $('#Zoom img').attr('src')
    : 'https://img9.doubanio.com/view/photo/l_ratio_poster/public/p.jpg';
  // IMDb评分
  // json.imdb = !!$("#Zoom span").text().replace(/\s*/g, "").match(/◎IMDb评分[\s\S]*[◎]/g) ? $("#Zoom span").text().replace(/\s*/g, "").match(/◎IMDb评分[\s\S]*[◎]/g)[0].split('◎')[1].replace(/IMDb评分/g, "").split('/10')[0] : "";
  json.imdb_id = '';

  json.imdb = !!$('#Zoom span')
    .text()
    .replace(/\s*/g, '')
    .match(/◎IMDb评分[\s\S]*[◎]/g)
    ? $('#Zoom span')
        .text()
        .replace(/\s*/g, '')
        .match(/◎IMDb评分[\s\S]*[◎]/g)[0]
        .split('◎')[1]
        .replace(/IMDb评分/g, '')
        .split('/10')[0]
    : !!$('#Zoom span')
        .text()
        .replace(/\s*/g, '')
        .match(/◎IMDB评分[\s\S]*[◎]/g)
    ? $('#Zoom span')
        .text()
        .replace(/\s*/g, '')
        .match(/◎IMDB评分[\s\S]*[◎]/g)[0]
        .split('◎')[1]
        .replace(/IMDB评分/g, '')
        .split('/10')[0]
    : '';
  json.imdb_user =
    !!$('#Zoom span')
      .text()
      .replace(/\s*/g, '')
      .match(/◎IMDb评分[\s\S]*[◎]/g) &&
    !!$('#Zoom span')
      .text()
      .replace(/\s*/g, '')
      .match(/◎IMDb评分[\s\S]*[◎]/g)[0]
      .split('◎')[1]
      .replace(/IMDb评分/g, '')
      .split('/10')[1]
      ? $('#Zoom span')
          .text()
          .replace(/\s*/g, '')
          .match(/◎IMDb评分[\s\S]*[◎]/g)[0]
          .split('◎')[1]
          .replace(/IMDb评分/g, '')
          .split('/10')[1]
          .replace(/from|users|votes|\(|\)|,|，/g, '')
      : !!$('#Zoom span')
          .text()
          .replace(/\s*/g, '')
          .match(/◎IMDB评分[\s\S]*[◎]/g) &&
        $('#Zoom span')
          .text()
          .replace(/\s*/g, '')
          .match(/◎IMDB评分[\s\S]*[◎]/g)[0]
          .split('◎')[1]
          .replace(/IMDB评分/g, '')
          .split('/10')[1]
      ? $('#Zoom span')
          .text()
          .replace(/\s*/g, '')
          .match(/◎IMDB评分[\s\S]*[◎]/g)[0]
          .split('◎')[1]
          .replace(/IMDB评分/g, '')
          .split('/10')[1]
          .replace(/from|users|votes|\(|\)|,|，/g, '')
      : '';
  // 豆瓣评分
  json.douban_id = '';
  json.douban =
    !!$('#Zoom span')
      .text()
      .replace(/\s*/g, '')
      .match(/◎豆瓣评分[\s\S]*[◎]/g) &&
    $('#Zoom span').text().replace(/\s*/g, '').indexOf('暂无') === -1
      ? $('#Zoom span')
          .text()
          .replace(/\s*/g, '')
          .match(/◎豆瓣评分[\s\S]*[◎]/g)[0]
          .split('◎')[1]
          .replace(/豆瓣评分/g, '')
          .split('/10')[0]
      : '';
  json.douban_user =
    !!$('#Zoom span')
      .text()
      .replace(/\s*/g, '')
      .match(/◎豆瓣评分[\s\S]*[◎]/g) &&
    $('#Zoom span').text().replace(/\s*/g, '').indexOf('暂无') === -1
      ? $('#Zoom span')
          .text()
          .replace(/\s*/g, '')
          .match(/◎豆瓣评分[\s\S]*[◎]/g)[0]
          .split('◎')[1]
          .replace(/豆瓣评分/g, '')
          .split('/10')[1]
          .replace(/from|users|,|，/g, '')
      : '';
  // 类别
  json.category = !!$('#Zoom span')
    .text()
    .replace(/\s*/g, '')
    .match(/◎类别[\s\S]*[◎]/g)
    ? $('#Zoom span')
        .text()
        .replace(/\s*/g, '')
        .match(/◎类别[\s\S]*[◎]/g)[0]
        .split('◎')[1]
        .replace(/类别/g, '')
    : '';
  // 译名
  json.translation = !!$('#Zoom span')
    .text()
    .replace(/\s*/g, '')
    .match(/◎译名[\s\S]*[◎]/g)
    ? $('#Zoom span')
        .text()
        .replace(/\s*/g, '')
        .match(/◎译名[\s\S]*[◎]/g)[0]
        .split('◎')[1]
        .replace(/译名/g, '')
    : '';
  // 片名
  json.name = !!$('#Zoom span')
    .text()
    .replace(/\s*/g, '')
    .match(/◎片名[\s\S]*[◎]/g)
    ? $('#Zoom span')
        .text()
        .replace(/\s*/g, '')
        .match(/◎片名[\s\S]*[◎]/g)[0]
        .split('◎')[1]
        .replace(/片名/g, '')
    : '';
  // 年代
  json.year = !!$('#Zoom span')
    .text()
    .replace(/\s*/g, '')
    .match(/◎年代[\s\S]*[◎]/g)
    ? $('#Zoom span')
        .text()
        .replace(/\s*/g, '')
        .match(/◎年代[\s\S]*[◎]/g)[0]
        .split('◎')[1]
        .replace(/年代/g, '')
    : '';
  // 产地
  json.areas = !!$('#Zoom span')
    .text()
    .replace(/\s*/g, '')
    .match(/◎产地[\s\S]*[◎]/g)
    ? $('#Zoom span')
        .text()
        .replace(/\s*/g, '')
        .match(/◎产地[\s\S]*[◎]/g)[0]
        .split('◎')[1]
        .replace(/产地/g, '')
    : !!$('#Zoom span')
        .text()
        .replace(/\s*/g, '')
        .match(/◎国家[\s\S]*[◎]/g)
    ? $('#Zoom span')
        .text()
        .replace(/\s*/g, '')
        .match(/◎国家[\s\S]*[◎]/g)[0]
        .split('◎')[1]
        .replace(/国家/g, '')
    : '';
  // 语言
  json.language = !!$('#Zoom span')
    .text()
    .replace(/\s*/g, '')
    .match(/◎语言[\s\S]*[◎]/g)
    ? $('#Zoom span')
        .text()
        .replace(/\s*/g, '')
        .match(/◎语言[\s\S]*[◎]/g)[0]
        .split('◎')[1]
        .replace(/语言/g, '')
    : '';
  // 字幕
  json.caption = !!$('#Zoom span')
    .text()
    .replace(/\s*/g, '')
    .match(/◎字幕[\s\S]*[◎]/g)
    ? $('#Zoom span')
        .text()
        .replace(/\s*/g, '')
        .match(/◎字幕[\s\S]*[◎]/g)[0]
        .split('◎')[1]
        .replace(/字幕/g, '')
    : '';
  // 上映日期
  json.release = !!$('#Zoom span')
    .text()
    .replace(/\s*/g, '')
    .match(/◎上映日期[\s\S]*[◎]/g)
    ? $('#Zoom span')
        .text()
        .replace(/\s*/g, '')
        .match(/◎上映日期[\s\S]*[◎]/g)[0]
        .split('◎')[1]
        .replace(/上映日期/g, '')
    : '';
  // 片长
  json.time = !!$('#Zoom span')
    .text()
    .replace(/\s*/g, '')
    .match(/◎片长[\s\S]*[◎]/g)
    ? $('#Zoom span')
        .text()
        .replace(/\s*/g, '')
        .match(/◎片长[\s\S]*[◎]/g)[0]
        .split('◎')[1]
        .replace(/片长|分钟|Minutes|Mins|Min|mins|min/g, '')
    : '';
  // 导演
  json.director = !!$('#Zoom span')
    .text()
    .replace(/\s*/g, '')
    .match(/◎导演[\s\S]*[◎]/g)
    ? $('#Zoom span')
        .text()
        .replace(/\s*/g, '')
        .match(/◎导演[\s\S]*[◎]/g)[0]
        .split('◎')[1]
        .replace(/导演/g, '')
    : '';
  // 编剧
  json.writers = !!$('#Zoom span')
    .text()
    .replace(/\s*/g, '')
    .match(/◎编剧[\s\S]*[◎]/g)
    ? $('#Zoom span')
        .text()
        .replace(/\s*/g, '')
        .match(/◎编剧[\s\S]*[◎]/g)[0]
        .split('◎')[1]
        .replace(/编剧/g, '')
    : '';
  // 主演
  json.actor = !!$('#Zoom span')
    .text()
    .replace(/\s*/g, '')
    .match(/◎主演[\s\S]*[◎]/g)
    ? $('#Zoom span')
        .text()
        .replace(/\s*/g, '')
        .match(/◎主演[\s\S]*[◎]/g)[0]
        .split('◎')[1]
        .replace(/主演/g, '')
    : $('#Zoom span')
        .text()
        .replace(/\s*/g, '')
        .match(/◎演员[\s\S]*[◎]/g)
    ? $('#Zoom span')
        .text()
        .replace(/\s*/g, '')
        .match(/◎演员[\s\S]*[◎]/g)[0]
        .split('◎')[1]
        .replace(/演员/g, '')
    : '';
  // 标签
  json.tag = !!$('#Zoom span')
    .text()
    .replace(/\s*/g, '')
    .match(/◎标签[\s\S]*[◎]/g)
    ? $('#Zoom span')
        .text()
        .replace(/\s*/g, '')
        .match(/◎标签[\s\S]*[◎]/g)[0]
        .split('◎')[1]
        .replace(/标签/g, '')
    : '';
  // 简介
  // json.introduction = '';
  json.introduction = !!$('#Zoom span')
    .text()
    .replace(/\s*/g, '')
    .match(/◎[简介|簡介|剧情][\s\S]*[下载地址|磁力链|ftp|下载地址|.2022.]/g)[0]
    ? $('#Zoom span')
        .text()
        .replace(/\s*/g, '')
        .match(/◎[简介|簡介|剧情][\s\S]*[下载地址|磁力链|ftp|下载地址|.2022.]/g)[0]
        .split('◎')[1]
        .replace(/简介|簡介|剧情|【下载地址|磁力链|ftp|下载地址|.2022./g, '')
    : '';
  return json;
};
/**
 *  处理豆瓣数据
 */
let formatDouban = function (res, data) {
  let $ = res.$;
  let json = data || {};
  if (res.request.uri.host !== 'www.imdb.com') {
    json.img =
      'https://img9.doubanio.com/view/photo/l_ratio_poster/public/p' +
      $('#mainpic img')
        .attr('src')
        ?.split(/\/public\/p|.jpg/)[1] +
      '.jpg';
    json.douban = $('.rating_self .rating_num').text() || '0';
    json.douban_user = $('.rating_self .rating_right .rating_sum span').text() || '0';
    json.imdb_id = $('#info')
      .text()
      .replace(/\s*/g, '')
      .match(/IMDb:tt[\d]*/g)
      ? $('#info')
          .text()
          .replace(/\s*/g, '')
          .match(/IMDb:tt[\d]*/g)[0]
          .replace(/IMDb:/g, '')
      : '';
    json.name = $('h1').text().replace(/\s*/g, '');
    json.release = $('#info')
      .text()
      .replace(/\s*/g, '')
      .match(/上映日期:[\s|\S]*片长:/g)
      ? $('#info')
          .text()
          .replace(/\s*/g, '')
          .match(/上映日期:[\s|\S]*片长:/g)[0]
          .replace(/上映日期:|片长:/g, '')
      : '';
  } else {
    if ($) {
      json.imdb = $('.ipc-page-section .iBtAhY .sc-7ab21ed2-1').text();
      json.imdb_user = $('.ipc-page-section .iBtAhY .sc-7ab21ed2-3').text() || '0';
      if (json.imdb_user.indexOf('K') != -1) {
        json.imdb_user = (json.imdb_user.replace(/K/g, '') * 1000).toString() || '0';
      } else if (json.imdb_user.indexOf('M') != -1) {
        json.imdb_user = (json.imdb_user.replace(/M/g, '') * 1000000).toString() || '0';
      }
    } else {
      json.imdb = '';
      json.imdb_user = '';
    }
  }
  return json;
};

module.exports = {
  formatList,
  formatDetails,
  formatDouban
};
