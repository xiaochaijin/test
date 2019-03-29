// pages/login02/login02.js
var timer;
var tt="";
var smscode="";
var sms="";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "code":"done",
    "codes": "",
    "seconds":60

  },
  userNameInput1: function (e) {
    tt = e.detail.value
  },
  userNameInput2: function (e) {
    sms = e.detail.value
  },
  gives:function(){
    
   var that=this
   
   
    if (tt.length==11){
     wx.request({
       url: 'https://www.chuang1.cn/api/sendsms',
       method: "get",
       data: { "phone": tt },
       success: function (res) {
         if(res.data.Code!="OK"){
           wx.showToast({
             title: "验证码发送过于频繁",
             icon: "none",
             duration: 2000
           })
         }else{
           that.setData({
             code: "",
             codes: "done"
           })
         }
         smscode=res.data.num
         
         that.move(60)
         console.log(res)
       }
     })
   }else{
     wx.showToast({
       title: "请输入正确手机号",
       icon: "none",
       duration: 2000
     })
   }
  
   
    
  },
  login:function(){
    console.log(sms)
    console.log(smscode)
    console.log(wx.getStorageSync("phone"))
    console.log(tt)
    if (sms == smscode && sms!=""){
     wx.request({
       url: 'https://www.chuang1.cn/api/phones',
       method:"get",
       data: { "tel": wx.getStorageSync("phone"),"phone":tt},
       success:function(res){
         wx.switchTab({
           url: '../index1/index1',

         })   
       }
     })
      
    }else{
      wx.showToast({
        title: "请输入正确验证码",
        icon: "none",
        duration: 2000
      })
    }
  },
  move: function (time) {
    var that=this
  
      if (time>0) {

        time--


        timer = setTimeout(function () {
          that.setData({
            seconds: time
          })


          that.move(time)

        }, 1000);
      }else{
        smscode=""
        that.setData({
          code: "done",
          codes: "",
          seconds:60
        })
      }
    


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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