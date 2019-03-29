var videoContext = wx.createVideoContext('myVideo')
var time=0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jixu:"done",
    content:"继续播放",
    hidden:"done",
    banner:"",

  },

  pause: function (e) {
    var that=this
    console.log(e)
    wx.request({
      url: 'https://www.chuang1.cn/api/videorecord',
      method: "get",
      data: { "tel": wx.getStorageSync("phone"), time: Math.floor(time), chapterid: that.data.id,courseid:that.data.courseid,status: 1 },
      success: function (result) {
        console.log(888888)
      }
    })
  },
  end:function(e){
    console.log("i"+time);
      wx.request({
        url: 'https://www.chuang1.cn/api/videorecord',
        method:"get",
        data: { "tel": wx.getStorageSync("phone"), time: Math.floor(time), courseid: that.data.courseid,chapterid:that.data.id,status:2},
        success:function(result){
          console.log(888888)
        }
      })
  },
  timeupdate:function(e){
    time = e.detail.currentTime
  },
  
 
  play:function(e){
    console.log(e)
    var that=this
    that.setData({
      hidden:"",
      banner:"done"
    })
    wx.request({
      url: 'https://www.chuang1.cn/api/videoplay',
      method:"get",
      data: { "id": e.currentTarget.dataset.index, "type": e.currentTarget.dataset.type},
      success:function(result){
        console.log(result.data.path)
        that.setData({
          path: result.data.path,
          id: e.currentTarget.dataset.index
        })
       
      }
    })
    console.log(e.currentTarget.dataset.index)
  },
 
  onLoad: function (options) {
    var that=this
    console.log(wx.getStorageSync("phone"))
    wx.request({
      url: 'https://www.chuang1.cn/api/videolist',
      method:"get",
      data:{"id":options.id,"tel":wx.getStorageSync("phone")},
      success:function(result){
        console.log(result.data)
        console.log(result.data[0].courselist)
        that.setData({
          list:result.data,
          lists: result.data[0].courselist,
          courseid: options.id
        })
      }
    })
    



  },
  onShareAppMessage: function () {
    if (!this.data.id) {
      // todo 返回默认分享信息，比如小程序首页
    }

    return {
      title: '我说，你听，创易读书会，读书更容易 ',
      path: '/pages/index/index',
      imageUrl: '/images/fx01.jpg',
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
    var that=this
    if (that.data.courseid != undefined && that.data.courseid!=""){
      wx.request({
        url: 'https://www.chuang1.cn/api/videolist',
        method: "get",
        data: { "id": that.data.courseid, "tel": wx.getStorageSync("phone") },
        success: function (result) {
          console.log(result.data)
          console.log(result.data[0].courselist)
          that.setData({
            list: result.data,
            lists: result.data[0].courselist,
            courseid: that.data.courseid
          })
        }
      })
    }
    
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
  onUnload:function(){
    var that=this
    wx.request({
      url: 'https://www.chuang1.cn/api/videorecord',
      method: "get",
      data: { "tel": wx.getStorageSync("phone"), time: Math.floor(time), chapterid:that.data.id,courseid:that.data.courseid, status: 1 },
      success: function (result) {
        console.log(888888)
      }
    }) 
  }

  /**
   * 用户点击右上角分享
   */

})
