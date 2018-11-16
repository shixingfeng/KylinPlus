//index.js
//获取应用实例
const app = getApp()
Page({
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        topSwiperImages:{
            imgUrls: [
              "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
              "http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg",
              "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg"
            ],
            indicatorDots: true,
            circular:true,
            autoplay: true,
            interval: 5000,
            duration: 1000    
        },
        homePageIcons:{
            myQuestion:"../../images/myQuestion.png",
            allQuestion:"../../images/allQuestion.png",
            encyclopaedia:"../../images/encyclopedia.png",
            inquireOnline:"../../images/inquireOnline.png"
        },
        resevationPageIcons:{
            reservationQuit:"../../images/reservation_quit.png",
            reservationDoctorIquire:"../../images/doctorIquire.png",
            reservationdoctorTreatment:"../../images/doctorTreatment.png"
        },
        userInfoPageIcons:{
            messageIcon:"../../images/message.png",
            healthRecords:"../../images/healthRecords.png",
            cureRecords:"../../images/cureRecords.png",
            invited:"../../images/invited.png",
            myComments:"../../images/comments.png",
            afterSales:"../../images/afterSales.png"
        },
        currentPage:{
            currentPage:"home_page",
            currentPage_title:"home_page"
        },
        indexBtns:{
            indexBtnSrc:"../../images/index_selected.png",
            reservationBtnSrc:"../../images/ask_default.png",
            meBtnSrc:"../../images/me_default.png"
        },  
        useCount:{
            myHealthRecords:21,
            cureRecords:232,
            myInvited:"18元问诊金"
        },
        showModalStatus:false
    },
    //事件处理函数
    onLoad: function (option) {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true,
            })
        }else if(this.data.canIUse){
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        }else{
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
        if(app.globalData.wss==true){
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
    showPage:function(e){
        console.log(e)
        var aim_page = e.currentTarget.dataset.page
        if(aim_page=="home_page"){
            var indexBtnSrc ="../../images/index_selected.png"
            var reservationBtnSrc="../../images/ask_default.png"
            var meBtnSrc="../../images/me_default.png"
            var currentPage_title="home_page"
            wx.setNavigationBarTitle({title:"首页"})
        }
        if(aim_page=="user_info_page"){
            var indexBtnSrc ="../../images/index_default.png"
            var reservationBtnSrc="../../images/ask_default.png"
            var meBtnSrc="../../images/me_selected.png"
            var currentPage_title="user_info_page"
            wx.setNavigationBarTitle({title:"我的"})
        }
        var currentPosition_json={
            currentPage:aim_page,
            currentPage_title:currentPage_title
        }
        var indexBtns_json={
            indexBtnSrc:indexBtnSrc,
            reservationBtnSrc:reservationBtnSrc,
            meBtnSrc:meBtnSrc
        }
        this.setData({
            currentPage:currentPosition_json,
            indexBtns:indexBtns_json
        })
    },
    //展示预约页面
    showModal: function(e){
        var reservation = e.currentTarget.dataset.page
        if(reservation=="index_reservation_page"){
            wx.setNavigationBarTitle({title:"预约"})
        }
        var animation = wx.createAnimation({
            duration: 400,
            timingFunction: "ease",
            delay:0
        })
        this.animation = animation
        animation.translateY(300).step()
        this.setData({
            animationData: animation.export(),
            showModalStatus: true
        })
        setTimeout(function () {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export()
            })
        }.bind(this), 0)
    },
    //隐藏预约页面
    hideModal:function(e){
        var aim_page_title = e.currentTarget.dataset.page
        if(aim_page_title=="home_page"){
            wx.setNavigationBarTitle({title:"首页"})
        }
        if(aim_page_title=="user_info_page"){
            wx.setNavigationBarTitle({title:"我的"})
        }
        // 隐藏遮罩层
        var animation = wx.createAnimation({
            duration: 400,
            timingFunction: "ease",
            delay: 0
        })
        this.animation = animation
        animation.translateY(500).step()
        this.setData({
            animationData: animation.export()
        })
        setTimeout(function () {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export(),
                showModalStatus: false,
            })
        }.bind(this),150)
    },
    // 首页图片展示
    changeIndicatorDots: function(e) {
        this.setData({
          indicatorDots: !this.data.indicatorDots
        })
    },
    changeAutoplay: function(e) {
        this.setData({
          autoplay: !this.data.autoplay
        })
    },
    intervalChange: function(e) {
        this.setData({
          interval: e.detail.value
        })
    },
    durationChange: function(e) {
        this.setData({
          duration: e.detail.value
        })
    },
    enterPersonalSetting:function(e){
        wx.navigateTo({
          url:"/pages/app_delikang/app_delikang_personal_setting/index"
        })
    },
    enterMessageList:function(e){
        wx.navigateTo({
          url:"/pages/app_delikang/app_delikang_message_list/index"
        })
      },
    enterCustomerAccount:function(e){
        wx.navigateTo({
          url:"/pages/app_delikang/app_delikang_customer_account/index"
        })
    },
})
