/**
 *  获取进度
 */
let getProgress = function (i, all) {
  return ((i / all) * 100).toFixed(2);
};

module.exports = {
    getProgress
}