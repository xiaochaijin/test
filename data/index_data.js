var bannerSrc=""
var requestTask=wx.request({
  url: 'https://www.chuang1.cn/api/banner',
  success:function(res){
   
   
  }
})

requestTask.abort()

wx.showLoading({
  title: '加载中',
})

setTimeout(function () {
  
  wx.hideLoading()
}, 1000)





module.exports.bannerSrc = bannerSrc;
