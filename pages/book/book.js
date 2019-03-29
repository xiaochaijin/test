//index.js
//获取应用实例
var app = getApp();
var util = require("../../utils/util.js");
var timer;
var mm;
Page({
  data: {
    banner:{
      delay:3000,
      timeoutProcess:null,
      currindex:0,
      bannerimg:[]
    },
    catalogSelect: '',//判断是否选中

    listData: [],
    hidTrue: true,
    nav:[],
    ad:[],
    course_grp:[],
    moreCourses:{
      title:"已经到底，查看更多课程 >",
      url:"../course/course"
      },
    userInfo: {},
    acticle:"",
    play: "true"
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
  chooseCatalog: function (data) {
    var that = this;
    var at_type = data.currentTarget.dataset.type
    console.log(at_type)
    var types = data.currentTarget.dataset.select
    
    that.setData({
      article: "",

    })
    
      wx.request({
        url: 'https://www.chuang1.cn/api/much',
        method: 'get',
        data: { 'at_type': at_type },
        success: function (res) {

          that.setData({
            article: res.data.article,
            style: 2

          })


        }
      })
      if(at_type==4){
        wx.request({
          url: 'https://www.chuang1.cn/api/usertype',
          method:"get",
          data:{"tel":wx.getStorageSync("phone")},
          success:function(res){
           
            console.log(res.data.type)
            that.setData({
              style:res.data.type
            })
            
          }
        })
      }

    
     
    
    that.setData({//把选中值放入判断值
      catalogSelect: data.currentTarget.dataset.select
    })
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
  wrong: function () {
    var that = this
    that.setData({
      play: "true"
    })
    wx.setStorageSync("mm", 2)
    console.log(wx.getStorageSync("mm"))
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
  onLoad: function (options) {
    
    
    var that = this;
    wx.request({
      url: 'https://www.chuang1.cn/api/book',
      method:"get",
      data:{"bk_type":options.bk_type},
      success:function(res){
       that.setData({
         book:res.data
       })
      }
    })
     
   
    //调用应用实例的方法获取全局数据
   
  },
  onShow:function(options){
    
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
    console.log(66)
    var that=this
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
  },
  onHide:function(){
    var that=this;

   
  }
  
 
})
function format(t) {
  let time = Math.floor(t / 60) >= 10 ? Math.floor(t / 60) : '0' + Math.floor(t / 60)

  t = time + ':' + ((t % 60) / 100).toFixed(2).slice(-2)
  return t
}
