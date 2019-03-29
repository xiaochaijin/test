// pages/conter2/conter2.js
var tt = ""
var timer;
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    hidden:true,
    vip1:"xz-active",
    hidden2:true,
    hidden3: true,
    play: "true"
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
  payment:function(e){
    console.log(wx.getStorageSync("phone"))
    var types=e.currentTarget.dataset.index
    wx.request({
      url:"https://www.chuang1.cn/api/payments",
      method:"get",
      data: { "openid": wx.getStorageSync("phone"), "type": types},
      success:function(res){
       console.log(res)
        wx.requestPayment({
          'timeStamp': res.data.timeStamp,
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'signType': 'MD5',
          'paySign': res.data.paySign,
          'success': function (res) {
            console.log(res)
          },
          'fail': function (res) {
            console.log(res)
          }
        })
      }
    })
   
  },
  wrong: function () {
    var that = this
    that.setData({
      play: "true"
    })
    wx.setStorageSync("mm", 2)
    console.log(wx.getStorageSync("mm"))
  },
  vip:function(e){
    var id=e.target.dataset.index
    if(id==1){
      this.setData({
        hidden1:"",
        hidden2: true,
        hidden3: true,
        vip1: "xz-active",
        vip2: "",
        vip3: ""
      })
    }
    if(id==2){
      this.setData({
        hidden1: true,
        hidden2: "",
        hidden3: true,
        vip1: "",
        vip2: "xz-active",
        vip3: ""
      })
    }
    if (id == 3) {
      this.setData({
        hidden1: true,
        hidden2: true,
        hidden3: "",
        vip1: "",
        vip2: "",
        vip3: "xz-active"
      })
    }
    
    console.log(e.target.dataset.index)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id == 3) {
      this.setData({
        hidden1: true,
        hidden2: true,
        hidden3: "",
        vip1: "",
        vip2: "",
        vip3: "xz-active"
      })
    }
    var that=this
    wx.getSystemInfo({
      success: function (res) {
        if (res.platform == "ios") {
          that.setData({
           hidden:"",
           types:1
         })
        } else {
          that.setData({
            hidden: true,
            types: 2
          })
        }
      }
    }
    )
  },
  userNameInput1:function(e){
      tt=e.detail.value
  },
  userNameInput3: function (e) {
    tt = e.detail.value
  },
  move: function (time, time1) {

    var that = this
    if (time == 0) {

      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          console.log(res)
          if (res.status == 2) {

            that.setData({
              begin: format(0),
              item: Math.floor(time1)
            })

          } else {
            that.setData({
              begin: format(res.currentPosition),
              item: Math.floor(time1)
            })
          }

        }
      })

      clearTimeout(timer)
      return


    } else {
      clearTimeout(timer)
      if (time > time1) {

        time1++


        timer = setTimeout(function () {
          that.setData({
            begin: format(time1),
            item: Math.floor(time1),

          })


          that.move(time, time1)

        }, 1000);

      } else {
        wx.getBackgroundAudioPlayerState({
          success: function (res) {
            console.log(res)
            if (res.status == 2) {
              that.setData({
                palyaction: "/images/play02.png",
                action: "listenerButtonPlay",
                begin: format(0),
                wrong: ""

              })
            } else {
              that.setData({
                palyaction: "/images/play02.png",
                action: "listenerButtonPlay",
                begin: format(res.currentPosition),
                wrong: ""
              })
            }

          }
        })


      }




    }

    wx.setStorageSync("item", time1)


  },
  submit:function(e){
    console.log("code" + tt)
    wx.request({
      url: 'https://www.chuang1.cn/api/paycode',
      method: "get",
      data: { "codes": tt, "tel": wx.getStorageSync("phone")},
      success: function (res) {
        if (res.data.msg =="你已成为会员"){
          wx.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 2000
          }),
            wx.switchTab({
            url: '../mystudy/mystudy',

            })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:"none",
            duration:2000
          })
        }
        
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  listenerButtonPause: function () {

    var that = this;
    this.setData({
      classes: ""
    })
    var at_id = wx.getStorageSync("at_id")
    var tel = wx.getStorageSync("phone")

    const backgroundAudioManager = wx.getBackgroundAudioManager()
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        that.setData({
          action: 'listenerButtonPlay',
          palyaction: '../../images/play02.png',
          wrong: "",
          begin: format(res.currentPosition + 1)
        })
      }
    })


    wx.pauseBackgroundAudio();
    clearTimeout(timer)

    that.move(0, wx.getStorageSync("item"))
    if (backgroundAudioManager.currentTime >= that.data.max) {
      var times = 0
    } else {
      var times = backgroundAudioManager.currentTime
    }

    wx.request({
      url: 'https://www.chuang1.cn/api/record',
      method: "get",
      data: { 'at_id': at_id, "tel": tel, "time": Math.floor(backgroundAudioManager.currentTime) },
      success: function (res) {

      }

    })
    wx.request({
      url: 'https://www.chuang1.cn/api/recordd',
      method: "get",
      data: { 'at_id': at_id, "tel": tel, "time": Math.floor(backgroundAudioManager.currentTime) },
      success: function (res) {

      }

    })

  },
  listenerButtonPlay: function (e) {

    var that = this
    wx.getBackgroundAudioPlayerState({

      success: function (res) {
        console.log("0000" + res.status)
        if (res.status == 2) {
          wx.playBackgroundAudio({
            //播放地址
            dataUrl: wx.getStorageSync("music"),
            //title 音乐名字
            title: wx.getStorageSync("at_name"),
            //图片地址
            coverImgUrl: '../../images/play.png',





          })
          that.setData({
            action: 'listenerButtonPause',
            palyaction: '../../images/stop02.png',
            wrong: "true",
            begin: format(wx.getStorageSync("item"))
          })
          clearTimeout(timer)

          that.move(wx.getStorageSync("endtime"), 0)
        } else {
          console.log(res)
          wx.playBackgroundAudio({
            //播放地址
            dataUrl: res.dataUrl,
            //title 音乐名字
            title: wx.getStorageSync("at_name"),
            //图片地址
            coverImgUrl: '../../images/stop02.png',





          })
          that.setData({
            action: 'listenerButtonPause',
            palyaction: '../../images/stop02.png',
            wrong: "true",
            begin: format(res.currentPosition)
          })
          clearTimeout(timer)

          that.move(wx.getStorageSync("endtime"), res.currentPosition)
        }
        console.log(9090909)

      },
      fail: function (res) {

      }
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
    var that = this;
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        console.log(res.status)
        console.log(wx.getStorageSync("item"))
        if (res.status == 1) {
          var begin = format(res.currentPosition)
          var endtime = format(wx.getStorageSync("endtime"))
          var at_name = wx.getStorageSync("at_name")
          that.setData({
            tope: true,
            topeon: "",
            begin: begin,
            at_name: at_name,
            endtime: endtime,
            play: "",
            at_id: wx.getStorageSync("at_id"),
            palyaction: "/images/stop02.png",
            play: "",
            wrong: "true",
            action: "listenerButtonPause"

          })
          that.move(wx.getStorageSync("endtime"), res.currentPosition)
        } else {
          console.log(format(res.currentPosition + 1))
          var endtime = format(wx.getStorageSync("endtime"))
          var at_name = wx.getStorageSync("at_name")
          if (wx.getStorageSync("mm") == 2) {
            that.setData({
              play: "true"
            })
          } else {
            that.setData({
              play: ""
            })
          }
          that.setData({
            tope: true,
            topeon: "",
            begin: format(res.currentPosition + 1),
            at_name: at_name,
            endtime: endtime,

            at_id: wx.getStorageSync("at_id"),
            palyaction: "/images/play02.png",
            
            wrong: "",
            action: "listenerButtonPlay"
          })


          that.move(0, wx.getStorageSync("item"))
        }


      },
      fail: function (res) {

      }
    })
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
  onShareAppMessage: function () {
  
  }
})
function format(t) {
  let time = Math.floor(t / 60) >= 10 ? Math.floor(t / 60) : '0' + Math.floor(t / 60)

  t = time + ':' + ((t % 60) / 100).toFixed(2).slice(-2)
  return t
}