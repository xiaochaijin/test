//index.js
//获取应用实例
var app = getApp();
var util = require("../../utils/util.js");
var WxParse = require('../wxParse/wxParse.js');
var date = new Date();
var Y = date.getFullYear();
var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
var timer;
var page = 0;
Page({
  data: {
    catalogs: '2',
    catalogSelect: "1",
    show:"",
    tope:"",
    topeon:true,
    showon:true,
    showons:true,
    listData: [],
    hidTrue: true,
    banner:{
      delay:3000,
      timeoutProcess:null,
      currindex:0,
      bannerimg:[]
    },
    play:"true",
    nav:[],
    ad:[],
    course_grp:[],
    moreCourses:{
      title:"已经到底，查看更多课程 >",
      url:"../course/course"
      },
    userInfo: {},
   
    product1: "",
    acticle:"",

    index: 0,
    date: Y + '-' + m,
    start: '2018-1',
    end: Y + '-' + m,
    list: '',
    shijian:  Y + '-' + m,


},
  search:function(e){
      wx.navigateTo({
        url: '/pages/search/search',
      })
  },
  chooseCatalog: function (data) {
    var that = this;
    var at_type =data.currentTarget.dataset.type
   
    var types = data.currentTarget.dataset.select
    wx.setStorageSync('types', types);
  
    if (types != 1){
      catalogSelect: types
      that.setData({
        showon:"",
        show:"true",
        types: types
        
      })
      wx.request({
        url: 'https://www.chuang1.cn/api/much',
        method: 'get',
        data: { 'at_type': at_type },
        success: function (res) {
         
         
          that.setData({
            article: res.data.article,
            
          })


        }
      })
    } else {

      that.setData({
        showon: "true",
        show: "",
        types: types,

      })
    /*else if (types == 3){
     
     
      var that=this
      that.setData({
        types:types,
        showon: "true",
        show: "true",
      })
      
      wx.request({
        url: 'https://www.chuang1.cn/api/business',
        method:"get",
        data:{"tel":wx.getStorageSync("phone")},
        success:function(res){
          console.log("pppp"+res.data.type)
          that.setData({
            data:res.data.data,
            style:res.data.type
          })
        }
      })
    }*/
    
    }
    
    
    that.setData({//把选中值放入判断值
      catalogSelect: data.currentTarget.dataset.select
    })
    
  },
  business:function(){
    wx.navigateTo({
      url: '../zfy/zfy?id=3',
    })
  },
  wrong:function(){
    var that=this
    that.setData({
      play:"true"
    })
    wx.setStorageSync("mm", 2)
    console.log(wx.getStorageSync("mm"))
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
  onReachBottom: function () {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '加载中',
    })
    // 页数+1
    page = page + 1;
    
    wx.request({
      url: 'https://www.chuang1.cn/api/articles?page=' + page,
      method: "GET",
      // 请求头部
      
      data:{"page":page},
      success: function (res) {
        console.log(that.data)
        // 回调函数
        var content = that.data.list.concat(res.data.article)//将放回结果放入content

       
        // 设置数据
        that.setData({
          list: content
        })
        // 隐藏加载框
        wx.hideLoading();
      }
    })

  },

  getPhoneNumber: function (e) {
    var that=this
    var iv = e.detail.iv
    var encryptedData = e.detail.encryptedData
   
        wx.login({
          success: function (res) {
          
            if (iv!=undefined){
             
              wx.request({
                url: 'https://www.chuang1.cn/api/jiemi',
                method: 'get',
                data: { "encryptedData": encryptedData, "code": res.code, "iv": iv },
                success: function (res) {

                

                  if (res.data.tel != undefined) {
                    wx.setStorageSync('phone', res.data.tel);
                    that.setData({
                      tope: true,
                      topeon: ""
                    })
                  }

                }
              })
            }
           
          }
        });


      
   


  },
  audioPlay: function () {
    var that = this;
    this.audioCtx.play();
    that.setData({
      playAction: 'audioPause',
      cdrom: '../../images/play.png'
    })

  },
  audioPause: function () {
    var that = this;
    this.audioCtx.pause();
    that.setData({
      playAction: 'audioPlay',
      cdrom: '../../resources/kind/play.png'
    })

  },
  sliderchange: function (e) {
   
    var offset = parseInt(e.detail.value);
    this.audioCtx.seek(offset);

  },
  viewTap: function () {
   

    
  },
  bindDateChange: function (e) {
    
    var that=this
    that.setData({
      shijian: e.detail.value
      
    })
    wx.request({
      url: 'https://www.chuang1.cn/api/month',
      method: "get",
      data: { "month": e.detail.value},
      success: function (res) {
        that.setData({
          article: res.data.article,

        })
      }
    })
    
  },
  much:function(e){
   
    var that=this
    that.setData({
      showon: "",
      show: "true",
      types: 2,
      shijian: e.target.dataset.index,
      catalogSelect: 2
    })
    wx.request({
      url: 'https://www.chuang1.cn/api/month',
      method: "get",
      data: { "month": e.target.dataset.index },
      success: function (res) {
        that.setData({
          article: res.data.article,

        })
      }
    })
  },
  
  /*点击banner上的圆选择相应的图片 */
  bindStlBanner:function(e){
   
    var that = this;
    var bannerIdx = e.currentTarget.dataset.index;
      clearTimeout(that.data.banner.timeoutProcess);
      that.changeBanner(bannerIdx);
      that.data.banner.timeoutProcess = setInterval(that.timetochange,3000);
  },
  onLoad: function (options) {
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
          that.setData({
            tope: true,
            topeon: "",
            begin: format(res.currentPosition + 1),
            at_name: at_name,
            endtime: endtime,

            at_id: wx.getStorageSync("at_id"),
            palyaction: "/images/play02.png",
            play: "",
            wrong: "",
            action: "listenerButtonPlay"
          })


          that.move(0, wx.getStorageSync("item"))
        }


      },
      fail: function (res) {

      }
    })
    wx.setStorageSync('types', "1");
    var that = this;
    that.setData({
      shijian: Y + "-" + m
    })
    if (wx.getStorageSync('phone')){
      that.setData({
        tope:true,
        topeon:""
      })
    }
   
 
    
 
    
    
    
   
    
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
          success:function(res){
            console.log(res)
            if(res.status==2){
              that.setData({
                palyaction: "/images/play02.png",
                action: "listenerButtonPlay",
                begin: format(0),
                wrong: ""
                
              })  
            }else{
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
  onShow:function(){
  
 
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
    
   
  
   
    
    if (wx.getStorageSync('phone')) {
      that.setData({
        tope: true,
        topeon: ""
      })
    }
    
   

    wx.request({
      url: 'https://www.chuang1.cn/api/course',
      method:"get",
      data:{"tel":wx.getStorageSync("phone")},
      success:function(res){
        console.log("qqq")
        console.log(res.data)
        that.setData({
          data:res.data
        })
      }
    })


    
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
        success:function(res){
          that.setData({
            action: 'listenerButtonPlay',
            palyaction: '../../images/play02.png',
            wrong: "",
            begin: format(res.currentPosition+1)
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
   
    var that=this
    wx.setStorageSync("at_id", e.currentTarget.dataset.index)
    wx.getBackgroundAudioPlayerState({
     
      success:function(res){
        console.log("0000"+res.status)
        if(res.status==2){
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
        }else{
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
      fail:function(res){
        
      }
    })
    
  },
  onHide:function(){
    var that=this;

    clearTimeout(that.data.banner.timeoutProcess);
  },
  /**根据bannerArray的index显示 */
  changeBanner:function(index){
    var that = this,
        banner = that.data.banner,
        currindex = banner.currindex;

    banner.bannerimg[currindex].class ='';
    banner.bannerimg[index].class = 'active';
    banner.currindex = index;
    that.setData({
    "banner":banner
    });
    //showImg  todo
  },
  /*轮播banner */
  timetochange:function(){
    var that = this,
        banner = that.data.banner,
        currindex = banner.currindex;
        if(currindex < banner.bannerimg.length - 1)
        {
          currindex ++;
        }else{
          currindex = 0;
        }
        that.changeBanner(currindex);
  }
})
function format(t) {
  let time = Math.floor(t / 60) >= 10 ? Math.floor(t / 60) : '0' + Math.floor(t / 60)

  t = time + ':' + ((t % 60) / 100).toFixed(2).slice(-2)
  return t
}

