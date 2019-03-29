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
      url: "https://www.chuang1.cn/api/guanjians", 
      method: "get",
      data: {},
      success: function (res) {
       that.setData({
         keys:res.data
       })
      }

    })




  },

  search:function(){
    var that=this
    wx.navigateTo({
      url: '/pages/lists/lists?search='+that.data.search,
    })
  },
  bindinput:function(e){
    var that=this
    that.setData({
      search:e.detail.value
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
