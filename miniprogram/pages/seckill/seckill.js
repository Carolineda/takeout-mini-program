// miniprogram/pages/seckill/seckill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: '16:00',
    storeSetail: [],
    shouStart: "开始",   //是距离开始还是结束
    state: "已结束",
    timeData: "",  //存放时间时分秒
    time: "324599",
    // tab
  
    tabMenu:[
      {
        status:0,
        time: '10:00',
        state: ""
      },
      {
        status:1,
        time: '14:00',
        state: ""
      },
      {
        status:2,
        time: '16:00',
        state: ""
      },
    ]
  },

  // 倒计时
  onChange(e) {
    this.setData({
      timeData: e.detail
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onShareAppMessage: function () {

  }
})