//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    the_room_info:{
      room_id:null,
      room_title:null,
    },
    motto: 'Coming soon...\r\n即将上线',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    inputMarBot:false,
  },
  //事件处理函数
  onLoad: function (option) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
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
    var room_id = option.room_id
    var room_title = option.room_title
    this.data.the_room_info = {
      room_id:room_id,
      room_title:room_title
    }
    this.setData({
      the_room_info:this.data.the_room_info
    })
    wx.setNavigationBarTitle({
      title:room_title
    })
    console.log(app.globalData.wss)
    if (app.globalData.wss==true){

    }else{
      wx.closeSocket({
        success:res=>{
          console.log("success closeSocket")
        },
        fail:res=>{
          console.log("fail closeSocket")
        }
      })
    }
    wx.connectSocket({
      url: 'wss://www.hotpoor.com/api/data/ws?aim_id=0cd8429c1da249b6935d7eef72d7fc0b',
      data:{
        aim_id:'0cd8429c1da249b6935d7eef72d7fc0b'
      }
    })
    wx.onSocketOpen(function (res){
      app.globalData.wss = true
      console.log("ws onSocketOpen")
      console.log(res)
      var msg_now = ["JOINMOREROOMS", {}, "0cd8429c1da249b6935d7eef72d7fc0b", ["HACKATHON"]]
      msg_now = JSON.stringify(msg_now)
      wx.sendSocketMessage({
        data:msg_now
      })
    })
    wx.onSocketMessage(function(data){
      console.log(data)
    })
    
    wx.onSocketError(function() {
      console.log('websocket连接失败！');
    })
    wx.onSocketClose(function(res) {
      console.log('WebSocket 已关闭！')
    })

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  previewImage: function(e) {    
      var current=e.target.dataset.src;  
      wx.previewImage({  
          current: current, // 当前显示图片的http链接  
          urls: [current]// 需要预览的图片http链接列表  
      })  
  },
  takePhoto: function(e) {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },
  error(e) {
    console.log(e.detail)
  },

   // 评论输入框聚焦时，设置与底部的距离
  settingMbShow: function () {
    this.setData({
      inputMarBot: true
    })
  },
  //  评论输入框失去聚焦时，设置与底部的距离（默认状态）
  settingMbNoShow: function () {
    this.setData({
      inputMarBot: false
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