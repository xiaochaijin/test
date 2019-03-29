// pages/conter1/conter1.js
var WxParse = require('../wxParse/wxParse.js');
var timer = "";
var mm = 0
var time1 = 0
var at_id
const backgroundAudioManager = wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playAction: "listenerButtonPlay",
    cdrom1: '/images/zuoze.png',
    cdrom: '/images/play.png',
    value: "",
    val: true,
    name: "",
    class: "jg01",
    class01: "",
    starttime: "00:00",
    sign: 1,
    item: 0,
    signs: 2,
    max: "",
    atid: "",
    pic: ""
  },
  listenerButtonPlay: function (e) {

    this.setData({
      classes: "animationSlow"
    })
    var tel = wx.getStorageSync("phone")
    var that = this;
    at_id = wx.getStorageSync("at_id")
    var status = 2
    if (at_id != e.currentTarget.dataset.index) {
      status = 1

      backgroundAudioManager.stop();

      
      wx.setStorageSync("at_id", e.currentTarget.dataset.index);
      if (wx.getStorageSync("item")) {
        if (at_id) {
          wx.request({
            url: 'https://www.chuang1.cn/api/record',
            method: "get",
            data: { 'at_id': at_id, "tel": tel, "time": wx.getStorageSync("item"),"type":1},
            success: function (res) {

            }

          })
          wx.request({
            url: 'https://www.chuang1.cn/api/recordd',
            method: "get",
            data: { 'at_id': at_id, "tel": tel, "time": wx.getStorageSync("item") },
            success: function (res) {

            }

          })
        }
      }

    }
    wx.setStorageSync("endtime", that.data.max)
    wx.setStorageSync("at_name", that.data.data.at_name)
    wx.setStorageSync("music", that.data.music)
    console.log(that.data);
    console.log("zzzs"+wx.getStorageSync("times"))
    wx.playBackgroundAudio({
      //播放地址
      dataUrl: that.data.music,
      //title 音乐名字
      title: that.data.name,
      //图片地址
      coverImgUrl: '../../images/play.png',





    })
    wx.request({
      url: 'https://www.chuang1.cn/api/read',
      method: "get",
      data: { at_id: that.data.at_id, tel: tel },
      success: function (res) {

      }

    })
    
    var starttime = format(backgroundAudioManager.currentTime)
    
    console.log(77)
    if (that.data.sign == 2) {
      console.log("oooooo")
      console.log(66)
      that.setData({
        playAction: 'listenerButtonPause',
        cdrom: '../../images/stop.png',
        item: 0,
        sign: 1
      })
      console.log(getApp().globalData.value)
      console.log("ttt" + wx.getStorageSync("value"))
      if (getApp().globalData.value != null) {
        clearTimeout(timer)
        that.move(that.data.max, getApp().globalData.value)
        console.log(getApp().globalData.value)
        wx.seekBackgroundAudio({

          position: Math.floor(getApp().globalData.value),
          success: function (res) {
            getApp().globalData.value=null
          },
          fail: function (res) {
            console.log(res)
            if (res.errMsg) {
              console.log("error")
              clearTimeout(timer)
              that.move(that.data.max, 0)
            }
          }

        })
        
      }else{
        wx.seekBackgroundAudio({

          position: Math.floor(0),

        })
        clearTimeout(timer)
        that.move(that.data.max, 0)
      }
      
      
    } else {



      console.log(backgroundAudioManager.currentTime)

      

       
        console.log(Math.floor(wx.getStorageSync("times")))
        
        if (status == 1) {
          var num = parseInt(wx.getStorageSync("times"))
          console.log("iii"+num)
          if(num==0){
            console.log("pp999")
            if (getApp().globalData.value!=null){
              clearTimeout(timer)
              that.move(that.data.max, getApp().globalData.value)
              wx.seekBackgroundAudio({

                position: Math.floor(getApp().globalData.value),
                success: function (res) {
                  getApp().globalData.value=null
                },
                fail: function (res) {
                  console.log(res)
                  if (res.errMsg) {
                    console.log("error")
                    clearTimeout(timer)
                    that.move(that.data.max, 0)
                  }
                }

              })
            }
          }else{
            clearTimeout(timer)
            wx.seekBackgroundAudio({

              position: num,
              success: function (res) {
                console.log(num)
              },
              fail: function (res) {
                console.log(res)
                if (res.errMsg) {
                  console.log("error")
                  clearTimeout(timer)
                  that.move(that.data.max, 0)
                }
              }

            })
            that.move(that.data.max, wx.getStorageSync("times"))
          }
          
          console.log(4433)
          that.setData({
            playAction: 'listenerButtonPause',
            cdrom: '../../images/stop.png',
            item: Math.floor(wx.getStorageSync("times"))
          })
          

          
          wx.setStorageSync("item", 0)


        } else {
         
          console.log(44)
          if (backgroundAudioManager.currentTime==undefined){
            that.setData({
              playAction: 'listenerButtonPause',
              cdrom: '../../images/stop.png',
              item: 0,
             
                classes: "animationSlow"
              
            })
            console.log(":::::")
            clearTimeout(timer)
            that.move(that.data.max, 0)
            wx.setStorageSync("item", 0)
          }else{
            that.setData({
              playAction: 'listenerButtonPause',
              cdrom: '../../images/stop.png',
              item: backgroundAudioManager.currentTime
            })
            console.log(":::::")
            clearTimeout(timer)
            that.move(that.data.max, backgroundAudioManager.currentTime)
            wx.setStorageSync("item", 0)
          }
         
        }


      
    }

    console.log("ooo"+wx.getStorageSync("at_id"))





  },

  listenerButtonPause: function () {

    var that = this;
    this.setData({
      classes: ""
    })
    var at_id = wx.getStorageSync("at_id")
    var tel = wx.getStorageSync("phone")


    that.setData({
      playAction: 'listenerButtonPlay',
      cdrom: '../../images/play.png'
    })
    wx.pauseBackgroundAudio();
    const backgroundAudioManager = wx.getBackgroundAudioManager()

    clearTimeout(timer)
    that.move(0, backgroundAudioManager.currentTime)
    if (backgroundAudioManager.currentTime >= that.data.max) {
      var times = 0
    } else {
      var times = backgroundAudioManager.currentTime
    }
    console.log("ggg" + Math.floor(backgroundAudioManager.currentTime))
    wx.request({
      url: 'https://www.chuang1.cn/api/record',
      method: "get",
      data: { 'at_id': at_id, "tel": tel, "time": Math.floor(backgroundAudioManager.currentTime),"type":1 },
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
  change: function (e) {
    var that = this
    var num = e.currentTarget.dataset.index
    if (num == 2) {
      that.setData({
        value: true,
        val: "",
        class: "",
        class01: "jg01"
      })
    }
    if (num == 1) {
      that.setData({
        value: "",
        val: true,
        class: "jg01",
        class01: ""
      })
    }

  },
  changeSlide: function (e) {

    let that = this
    let value = e.detail.value


    that.setData({
      starttime: format(value)
    })
    
    console.log(value)
    console.log('==>' + at_id)
    console.log(e.target.dataset.index)
    if (value==0){
      console.log(111111111)
      if (e.target.dataset.index == at_id){
        if (e.target.dataset.index==wx.getStorageSync("at_id")){
          wx.seekBackgroundAudio({
            position: 1,
            success: function (res) {
              console.log(res)
            },
            fail: function (res) {
              console.log(res)
            }
          })
        }
       
      }
      
    }else{
      console.log(222222222222)
      if (that.data.sign == 1) {
        console.log('eee'+value)
      console.log(66)
        console.log(wx.getStorageSync("at_id"))
        console.log(e.target.dataset.index)
        if (e.target.dataset.index == wx.getStorageSync("at_id")) {
      wx.seekBackgroundAudio({
        position: Math.floor(value),
        success: function (res) {
            console.log(res)
        },
        fail:function(res){
          console.log(res)
        }
      })
        }
      }
    }

    wx.setStorageSync("item", value)
    console.log(wx.getStorageSync("item"))
    console.log("oooooooz" + that.data.sign)

   
    clearTimeout(timer)


    if (that.data.sign==1){
      
      that.move(that.data.max, Math.floor(value))
    }
      
    
    

  },
  move: function (time, time1) {
    var that = this
    if (time == 0) {


      that.setData({
        starttime: format(time1),
        item: Math.floor(time1)
      })
      clearTimeout(timer)
      wx.setStorageSync("item", time1)
      return


    } else {
      wx.setStorageSync("item", time1)
      if (time > time1) {

        time1++

        var tel = wx.getStorageSync("phone")
        timer = setTimeout(function () {
          that.setData({
            starttime: format(time1),
            item: Math.floor(time1)
          })
         
          
          
          that.move(time, time1)

        }, 1000);
       

      } else {
        
        that.setData({
          playAction: 'listenerButtonPlay',
          cdrom: '../../images/play.png',
          classes: ""

        })
       
        var tel = wx.getStorageSync("phone")
        wx.request({
          url: 'https://www.chuang1.cn/api/record',
          method: "get",
          data: { 'at_id': wx.getStorageSync("at_id"), "tel": tel, "time": time,"type":2 },
          success: function (res) {
              console.log(res)
          }

        })
        wx.request({
          url: 'https://www.chuang1.cn/api/recordd',
          method: "get",
          data: { 'at_id': wx.getStorageSync("at_id"), "tel": tel, "time": time },
          success: function (res) {
            console.log(res)
          }

        })
        
      }




    }

    


  },
  getData: function () {
    var openid = getApp().globalData.openid || wx.getStorageSync('openid');
    var companyid = getApp().globalData.companyid || wx.getStorageSync('companyid');

    var self = this;

    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 100000,
      mask: true
    })

    wx.request({
      url: url,
      data: { openid: openid, id: companyid, month: this.data.date },
      method: 'GET',
      //header: {}, // 设置请求的 header
      success: function (res) {
        if (res.data.error == 1) {
          //显示报错信息
          wx.showModal({
            title: '异常',
            content: res.data.errmsg,
            showCancel: false
          })

        } else {
          var json = res.data.data;
          var list = [];
          self.setData({ main: '' });
          self.setData({ list: '' });
          var start = 0, end = 0;
          var a = 0, b = 0;
          var res = [];
          for (var i in json) {
            json[i]['id'] = 'view' + i;
            json[i]['start'] = app.number_format(json[i]['start']);
            json[i]['end'] = app.number_format(json[i]['end']);
            for (var j = 0; j < json[i]['pages']; j++) {
              json[i]['pages'][j]['start'] = app.number_format(json[i]['pages'][j]['start']);
              json[i]['pages'][j]['end'] = app.number_format(json[i]['pages'][j]['end']);
            }
          }

          self.setData({ list: json });

        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
        wx.hideToast()
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
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
    this.getData()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var atid = ""
    var that = this;
    that.setData({
      atid: options.at_id
    })
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        console.log(res.status)
        if (res.status == 1) {
          if(options.at_id==wx.getStorageSync("at_id")){
            that.setData({
              classes: "animationSlow"
            })
          }
          
        }
      }
    })
    wx.request({
      url: 'https://www.chuang1.cn/api/detail1',
      method: 'get', 
      data: { 'at_id': options.at_id, "tel": "'" + wx.getStorageSync("phone") + "'" },

      success: function (res) {  
        console.log(99)
        console.log(res.data.sign)
        WxParse.wxParse("content", 'html', res.data.article.at_content, that, 5)
        WxParse.wxParse("Test", 'html', res.data.article.au_commend, that, 5)
 
        WxParse.wxParse("Test1", 'html', res.data.article.au_abstract, that, 5)
        WxParse.wxParse("Dir", 'html', res.data.article.au_dir, that, 5)
 
        
        console.log(res.data.article.time)
          that.setData({
            data: res.data.article,
            name: res.data.article.at_name,
            music: res.data.article.path,
            stoptime: format(res.data.article.time),
            max: res.data.article.time, 
            at_id: options.at_id,
            signs: res.data.sign,
            pic: res.data.article.article_pic
          })
        
       /* that.setData({
          data: res.data.article,
          name: res.data.article.at_name,
          music: res.data.article.at_music,
          stoptime: format(res.data.article.at_long),
          max: res.data.article.at_long,
          at_id: options.at_id,
          signs: res.data.sign,
          pic: res.data.article.article_pic
        })*/

        wx.setStorageSync("max", that.data.max)

      }
    })



    if (wx.getStorageSync("at_id") != options.at_id) {


      that.setData({
        sign: 2
      })
      wx.setStorageSync("times", 0)
      if (options.type == 3) {

        wx.request({
          url: 'https://www.chuang1.cn/api/records',
          method: "get",
          data: { "tel": wx.getStorageSync("phone"), "at_id": options.at_id },
          success: function (res) {



            that.setData({
              starttime: format(res.data.time),
              cdrom: "/images/play.png",
              item: res.data.time,
              playAction: "listenerButtonPlay",
              sign: 1
            })

            wx.setStorageSync("times", res.data.time)
          }
        })
      }
    } else {

      

      var time = backgroundAudioManager.duration

      var tt = backgroundAudioManager.currentTime
      var status = backgroundAudioManager.paused
      console.log("oooos"+status);
      if (status) {
        var cdrom = "/images/play.png"
        var playAction = "listenerButtonPlay"
        
      } else {
        var cdrom = "/images/stop.png"
        var playAction = "listenerButtonPause"
          

      }




      var starttime = format(tt)
      clearTimeout(timer)

      if (starttime != '0NaN:aN') {


        that.setData({
          starttime: starttime,
          cdrom: cdrom,
          item: tt,
          playAction: playAction,
        })
        if (status) {


          that.move(0, backgroundAudioManager.currentTime)
        } else {



          that.move(wx.getStorageSync("max"), backgroundAudioManager.currentTime)
        }

        wx.setStorageSync("times", 0)

      } else {



        if (options.type == 3) {

          wx.request({
            url: 'https://www.chuang1.cn/api/records',
            method: "get",
            data: { "tel": wx.getStorageSync("phone"), "at_id": options.at_id },
            success: function (res) {


              that.setData({
                starttime: format(res.data.time),
                cdrom: "/images/play.png",
                item: res.data.time,
                playAction: "listenerButtonPlay",
                sign: 1
              })
              wx.setStorageSync("times", res.data.time)
            }
          })

        }
      }
    }



setTimeout(function () {
      wx.hideLoading();
    }, 3500);
    wx.showLoading({
      title: '加载中',
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
  onShow: function () {
    var that=this
    var status = backgroundAudioManager.paused
    console.log("oooos" + status);
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
function format(t) {
  let time = Math.floor(t / 60) >= 10 ? Math.floor(t / 60) : '0' + Math.floor(t / 60)

  t = time + ':' + ((t % 60) / 100).toFixed(2).slice(-2)
  return t
}