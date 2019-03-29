
var question = new Array();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex:0,
    one_arr:new Array(),
    t1:"",
    t2:""
  },
  xuanze: function (e) {



    var that=this

    var select = e.currentTarget.dataset.top
    question[e.currentTarget.dataset.wai] = e.currentTarget.dataset.top
    console.log(question)


    console.log(e.currentTarget.dataset.top)
    that.setData({
      select: select,
      
      
     

    })
    
    wx.request({
      url: 'https://www.chuang1.cn/api/result',
      method:"get",
      data: { "courseid": that.data.id, id: e.currentTarget.dataset.id, is_true: e.currentTarget.dataset.tf,"tel":wx.getStorageSync("phone")},
      success: function (result) {
        var time=setTimeout(function(){
          that.setData({
            activeIndex: e.currentTarget.dataset.wai+1,




          })
        },500)  
      }
    })
      
    
 
  },
  cha:function(){
      var that=this
      that.setData({
        zhaocha:"done",
        mengban:"done"
      })
  },
  
 
  callback: function (e) {
   


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
  bindChange: function (e) {
    console.log(e.detail.current)
    console.log(question[e.detail.current])

    var that=this
    if (question[e.detail.current]!=undefined){
      that.setData({
        select: question[e.detail.current]
      })
    }else{
      that.setData({
        select: 10
      })
    }
     


  },
  jiaojuan:function(){
    var that=this
    if (question.length<2){
      wx.showToast({
        title: '有题未作答，请滑回去继续作答',
        icon: "none",
      })
    }else{
     
      wx.request({
        url: 'https://www.chuang1.cn/api/jiaojuan',
        method: "get",
        data: { "courseid": that.data.id, "tel": wx.getStorageSync("phone") },
        success: function (result) {
          console.log(result.data)
            that.setData({
              t1:"done",
              t2:"",
              data:result.data.list,
              score: result.data.score,
              topic:result.data.topic
            })
        }
      })
    }
        
  },
  onLoad: function (options) {
      question = new Array();
        var that=this
        wx.request({
          url: 'https://www.chuang1.cn/api/answers',
          method:"get",
          data:{"id":options.id},
          success:function(res){
            console.log(res.data)
            that.setData({
              one_arr: res.data,
              id:options.id
            })
          }
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
function sort(zqda) {
  var ZM = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

}
