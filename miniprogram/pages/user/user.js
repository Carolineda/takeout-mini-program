// miniprogram/pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    hideFlag: true,    //用来隐藏弹出层
    animationData: {},

    // 循环数据
    oneData: [
      {
        iconUrl: "../../images/user/shop.png",
        liName: "金币商城"
      },
      {
        iconUrl: "../../images/user/share.png",
        liName: "分享拿20元现金"
      },

    ],
    twoData: [
      {
        iconUrl: "../../images/user/kefu.png",
        liName: "我的客服"
      },
      {
        iconUrl: "../../images/user/elem.png",
        liName: "下载饿了么APP"
      },
      {
        iconUrl: "../../images/user/rule.png",
        liName: "规则中心"
      }
    ]
  },

  // 我的收货地址
  toAdress: function () {
    wx.navigateTo({
      url: "../selectAdress/selectAdress"
    })
  },


  // 点击头像用户操作
  userHandle() {

  },



  // 点击弹出部分
  logout: function (e) {
    var that = this;
    that.setData({
      // value:e.currentTarget.dataset.value,
      hideFlag: true
    })
  },
  //取消
  mCancel: function () {
    var that = this;
    that.hideModal();
  },
  showModal: function () {
    var that = this;
    that.setData({
      hideFlag: false
    })
    // 创建动画实例
    var animation = wx.createAnimation({
      duration: 400,//动画的持续时间
      timingFunction: 'ease',//动画的效果 默认值是linear->匀速，ease->动画以低速开始，然后加快，在结束前变慢
    })
    this.animation = animation; //将animation变量赋值给当前动画
    var time1 = setTimeout(function () {
      that.slideIn();//调用动画--滑入
      clearTimeout(time1);
      time1 = null;
    }, 100)
  },

  // 隐藏遮罩层
  hideModal: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 400,//动画的持续时间 默认400ms
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    that.slideDown();//调用动画--滑出
    var time1 = setTimeout(function () {
      that.setData({
        hideFlag: true
      })
      clearTimeout(time1);
      time1 = null;
    }, 220)//先执行下滑动画，再隐藏模块

  },
  //动画 -- 滑入
  slideIn: function () {
    this.animation.translateY(0).step() // 在y轴偏移，然后用step()完成一个动画
    this.setData({
      //动画实例的export方法导出动画数据传递给组件的animation属性
      animationData: this.animation.export()
    })
  },
  //动画 -- 滑出
  slideDown: function () {
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },


})