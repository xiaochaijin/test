// pages/conter2/conter2.js
var date = new Date();
var Y = date.getFullYear();
var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
var timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phb1:"xz-active",
    hidden: "",
    hiddens: true,
    play: "true",
    date: Y + '-' + m,
    person:"",
    company:"done",
    tingshu:"",
    defen:true,
    index:0
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

  bindDateChange:function(e){
    var that=this
    wx.request({
      url: 'https://www.chuang1.cn/api/phb1',
      method:"get",
      data: { "time": e.detail.value, openid: wx.getStorageSync("phone")}, 
      success:function(res){
        console.log(66)
        console.log(res.data.list)
        that.setData({
          list: res.data.list,
          type: res.data.type,
          date:e.detail.value     
        })
      }
    }) 
    wx.request({
      url: 'https://www.chuang1.cn/api/comphb1',
      method: "get",
      data: { openid: wx.getStorageSync("phone"),"time": e.detail.value},
      success: function (res) {
        console.log(res.data.types)
        if (res.data.type.order != "error") {
          console.log("ppppppppppppppppppppppppppppp")
          that.setData({
            person: "done",
            company: ""
          })
        } else {
          console.log("ppppppppppppppppppppppppppppp2")
          that.setData({
            person: "",
            company: "done"
          })
        }
        

          that.setData({
            lists: res.data.list,
            types: res.data.type
          })
       

      }
    })
    
  },
  bindPickerChanges: function (e) {
    console.log(e.detail.value)
      var that=this
      that.setData({
        index:e.detail.value
      })
    console.log(that.data.array[e.detail.value])
    wx.request({
      url: 'https://www.chuang1.cn/api/scorephb',
      method:"get",
      data: { "tel": wx.getStorageSync("phone"), "name": that.data.array[e.detail.value]},
      success:function(result){
        console.log("4444"+result.data.user)
          that.setData({
            score: result.data.result,
            user: result.data.user
          })
      }
    }) 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that=this
      
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
  phb:function(e){
    var that=this
    var index=e.currentTarget.dataset.index
    if(index==2){
      that.setData({
        phb2: "xz-active",
        phb1: "",
        tingshu: true,
        defen:""
      })
      
    }
    if (index == 1) {
      that.setData({
        phb2: "",
        phb1: "xz-active",
        tingshu: "",
        defen: true
      })

    }
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
      data: { 'at_id': at_id, "tel": tel, "time": Math.floor(backgroundAudioManager.currentTime), "type": 1},
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  wrong: function () {
    var that = this
    that.setData({
      play: "true"
    })
    wx.setStorageSync("mm", 2)
    console.log(wx.getStorageSync("mm"))
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
    var that = this
    setTimeout(function () {
      wx.hideLoading();
    }, 2000);

   
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
          
            that.setData({
              play: "true"
            })
         
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


    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://www.chuang1.cn/api/phb1',
      method: "get",
      data: { openid: wx.getStorageSync("phone") },
      success: function (res) {
        console.log(66)
        console.log(res.data.list)
        that.setData({
          list: res.data.list,
          type: res.data.type
        }) 
      }
    }) 
    wx.request({
      url: 'https://www.chuang1.cn/api/comphb1',
      method: "get",
      data: { openid: wx.getStorageSync("phone") }, 
      success: function (res) {
        console.log(8888)
        console.log(res.data.list)
        if (res.data.type.order !="error") {
          console.log("ppppppppppppppppppppppppppppp")
          that.setData({
            person: "done", 
            company: ""
          })
        }else{
          console.log("ppppppppppppppppppppppppppppp2")
          that.setData({
            person: "",
            company: "done"
          })
        }
        if (res.data.list.length > 0) {
          that.setData({
            lists: res.data.list,
            types: res.data.type
          })  
        } else {   

          that.setData({
            lists: res.data.list,
            types: res.data.type
          })
        }

      }
    })
    wx.request({
      url: 'https://www.chuang1.cn/api/companyname',
      method:"get",
      data:{"tel":wx.getStorageSync("phone")},
      success:function(res){
        that.setData({
          company_name: res.data.company_name
        }) 
       
      }
    }) 
    wx.request({ 
      url: 'https://www.chuang1.cn/api/courseshow',
      method:"get",
     
      success:function(result){ 
        console.log(9999999)
        console.log(result.data)
        if (result.data) { 
          var array = new Array();
          for (var i = 0; i < result.data.length; i++) {
            array[i] = result.data[i].name
          }
          console.log(array)
          that.setData({ array: array });
          wx.request({
            url: 'https://www.chuang1.cn/api/scorephb',
            method: "get",
            data: { "tel": wx.getStorageSync("phone"), "name": array[0] },
            success: function (result) {
              console.log(444)
              console.log(result.data.user)
              that.setData({ 
                score: result.data.result,
                user:result.data.user 
              })
            }
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

