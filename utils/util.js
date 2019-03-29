
var index_data = require('../data/index_data.js');
var course_data = require("../data/course_data.js");

/*index.wxml*/
/*获取bannerArr*/
function getBanner(){
    return index_data.bannerSrc.banner;
}



module.exports.getBanner = getBanner;






