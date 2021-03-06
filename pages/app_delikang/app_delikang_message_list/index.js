//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    currentPage:"index_page",
    indexBtnSrc:"../../images/index_selected.png",
    reservationBtnSrc:"../../images/ask_default.png",
    meBtnSrc:"../../images/me_default.png",
  },
  //事件处理函数
  onLoad: function (option) {
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    if (app.globalData.wss==true){
    }else{
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  onShareAppMessage:function (res) {
    return {
      title: this.data.the_room_info.room_title,
      path: "/pages/room/index?room_id="+this.data.the_room_info.room_id+"&room_title="+this.data.the_room_info.room_title,
      imageUrl:"../../images/haibao.jpg",
      success: function(res){
        console.log(res)
        wx.showShareMenu({
          withShareTicket: true
        })
      },
      fail:function(res){
        console.log(res)
      },
      complete:function(res){
        console.log(res)
      }
    }
  },
})