
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: "",
    is_hidden: false,
    recordArr: [
      { name: "奶茶" },
      { name: "炸鸡" }

    ],

    // 商品列表
    storeDetail: [],
    search_show: true      //搜索成功显示

  },

  // 搜索框输入字段
  inputKeyword(e) {
    console.log("当前输入值", e.detail.value)
    this.data.keyword = e.detail.value
    if (e.detail.value == " ") {
      this.setData({
        is_hidden: false
      })
    } else {
      this.setData({
        is_hidden: true
      })
    }

  },
  // 点击搜索
  handleBtn() {
    db.collection('dataArr').where({
      store_name: db.RegExp({
        regexp: '.*' + this.data.keyword,
        options: 'i',
      })
    })
      .get({
        success: res => {
          if (res.data == "") {
            console.log("没有数据")
            wx.showToast({
              title: '没有找到匹配的商家',
              icon: 'none',
              duration: 1000
            })
          } else {
            this.setData({
              storeDetail: res.data,
              search_show: false
            })
          }
        },

      })
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