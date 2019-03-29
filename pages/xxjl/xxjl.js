var videoContext = wx.createVideoContext('myVideo')
var time = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
      tingshu:true,
      tingke:"",
      listen1:"xz-active",
      listen2:""
  },
  listen:function(e){
    console.log(e)
    var that=this
      if(e.target.dataset.index==1){
          that.setData({
            listen1:"xz-active",
            listen2:"",
            tingshu:true,
            tingke:""
          })
      }else{
        that.setData({
          listen1: "",
          listen2: "xz-active",
          tingshu: "",
          tingke: true
        })
      }
  },




  onLoad: function (options) {
    var that = this
    




  },
  onShareAppMessage: function () {
    if (!this.data.id) {
      // todo 返回默认分享信息，比如小程序首页
    }

    return {
      title: '我说，你听，创易读书会，读书更容易 ',
      path: '/pages/index/index',
      imageUrl: 'https://www.chuang1.cn/cy.jpg',
      success: function (res) {
        if (this.data.savedId === this.data.id) {
          return;
        }

        this.saveData().then(() => {
          this.setData({
            savedId: this.data.id
          });
          // todo 如果跳转到其他页面，删除this.data.id
        });
      }
    };
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (option) {
    var that = this
    
    wx.request({
      url: 'https://www.chuang1.cn/api/historys',
      method: "get",
      data: { "tel": wx.getStorageSync("phone") },
      success: function (result) {
        console.log(result.data) 
        that.setData({
          data:result.data
        })

      }
    })
    wx.request({
      url: 'https://www.chuang1.cn/api/day',
      method: "get",
      data: { "tel": wx.getStorageSync("phone") },
      success: function (result) {
        
        console.log(result.data) 
        that.setData({
          list: result.data
        })

      }
    })
    wx.request({
      url: 'https://www.chuang1.cn/api/courserecord',
      method: "get",
      data: { "tel": wx.getStorageSync("phone") },
      success: function (result) {
        console.log(8888)
        console.log(result.data)
        that.setData({
          record:result.data
        })
        

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
  onUnload: function () {
    
  }
  /**
   * 用户点击右上角分享
   */

})
