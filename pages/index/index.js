//index.js
//获取应用实例

var app = getApp();

var WxParse = require('../wxParse/wxParse.js');
Page({
  data: {
    catalogs: '2',
    catalogSelect: "1",
    show: "",
    tope: "",
    topeon: true,
    showon: true,
    listData: [],
    hidTrue: true,
    banner: {
      delay: 3000,
      timeoutProcess: null,
      currindex: 0,
      bannerimg: []
    },
    nav: [],
    ad: [],
    course_grp: [],
    moreCourses: {
      title: "已经到底，查看更多课程 >",
      url: "../course/course"
    },
    userInfo: {},

    product1: "",
    acticle: ""




  },
  chooseCatalog: function (data) {
    var that = this;
    var at_type = data.currentTarget.dataset.type

    var types = data.currentTarget.dataset.select


    if (types != 1) {
      that.setData({
        showon: "",
        show: "true"
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
        show: ""
      })

    }


    that.setData({//把选中值放入判断值
      catalogSelect: data.currentTarget.dataset.select
    })

  },

  onGotUserInfo: function (res) {
    console.log(res.detail.userInfo);
    wx.login({
      success: function (e) {
        console.log(res)
        console.log(e)
        console.log(e.code)
        console.log(res.detail.userInfo.nickName)
        if (res.detail.userInfo != undefined) {
          wx.request({
            url: 'https://www.chuang1.cn/api/jiemi',
            method: "get",
            data: {
              'code': e.code, "nike": res.detail.userInfo.nickName, "avatarUrl": res.detail.userInfo.avatarUrl
            },
            success: function (data) {
              console.log(data.data.msg)
              wx.setStorageSync("phone", data.data.tel)
              if (data.data.msg == 2) {
                wx.navigateTo({
                  url: '../login02/login02',
                })
              } else {
                wx.switchTab({
                  url: '../index1/index1',

                })
              }

            }
          })
        }
      }
    })


  },

  onLoad: function () {
    // 查看是否授权
    if (wx.getStorageSync("phone")) {
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
          } else {
            wx.switchTab({
              url: '../index1/index1',

            })
          }
        }
      })

    }
  },


  onShow: function () {




  },
  onHide: function () {

  },
  /**根据bannerArray的index显示 */

})
