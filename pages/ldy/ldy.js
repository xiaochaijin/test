// pages/conter1/conter1.js
var WxParse = require('../wxParse/wxParse.js');
var timer="";
var mm=0
var time1=0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playAction:"listenerButtonPlay",
    cdrom1:'/images/zuoze.png',
    cdrom: '/images/play.png',
    value:"",
    val:true,
    name:"",
    class:"jg01",
    class01:"",
    starttime:"00:00",
    
    item:0,
   
  },
  onLoad: function (options) {


    
    var that = this;
    wx.request({
      url: "https://www.chuang1.cn/api/banners",
      method: "get",
      data: { "bn_id": options.bn_id },
      success: function (res) {
        console.log(1)
        console.log(res.data.banner)
        that.setData({
          bn_pic: res.data.banner
        })
      }

    })




  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (option) {
    wx.request({
      url: 'https://www.chuang1.cn/api/phone',
      method: "get",
      data: { "tel": wx.getStorageSync("phone") },
      success: function (res) {
        console.log(res)
        if (res.data == 2) {
          wx.navigateTo({
            url: '../login02/login02',
          })
        } 
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
 
})
