// miniprogram/pages/addRate/addRate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getSelectRateData: [], //订单接受的数据存放
    value: "",
    tasteValue: "",
    packageValue: "",
    shop_id: "",
    input_content: ""
  },



  // 选择评分
  onChange(event) {
    console.log(event.detail)
    this.setData({
      value: event.detail
    });
  },
  tasteChange(event) {
    this.setData({
      tasteValue: event.detail
    })
  },
  packageChange(event) {
    this.setData({
      packageValue: event.detail
    })
  },
  // 获取输入框的值
  getTextValue(e) {
    console.log(e.detail.value, "输入框的值")
    console.log(this.data.getSelectRateData[0].orderData)
    this.setData({
      input_content: e.detail.value
    })
  },
  // 提交评论
  commitRate() {
    const db = wx.cloud.database()
    db.collection('rateInfo').add({
      data: {
        shop_id: this.data.getSelectRateData[0].shop_id,
        value: this.data.value,
        input_content: this.data.input_content,
        tasteValue: this.data.tasteValue,
        packageValue: this.data.packageValue

      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        console.log("返回结果", res)
        wx.showToast({
          title: '评价成功',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
          success: (result) => {
            setTimeout(() => {
              wx.navigateBack({
                delta: 1

              })
            }, 2000);

          },
          fail: () => { },
          complete: () => { }
        });

      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var selectRateData = JSON.parse(decodeURIComponent(options.selectRateData))
    console.log(selectRateData, "评价页面接受的数据")
    this.setData({
      getSelectRateData: selectRateData,
      shop_id: selectRateData[0].shop_id
    })
    console.log(this.data.getSelectRateData, "数据源")
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