// miniprogram/pages/pay/pay.js

Page({
  data: {
    address: "",
    phone_num: "",
    name: "",
    money: "", //订单+配送费总价
    get_time: "",
    shop_name: "",
    delivery: "",
    sale: 5,
    package_cost: 2,  //包装费
    goodPrice: "",
    selectGoods: [],
    good_price: "",
    totalCost: "",   //传过来得总价
    shop_id: "",   //传来id
    time: "",
    name: "",
  },

  toOrder() {
    wx.navigateTo({
      url: "../order/order"
    })
  },

  onLoad: function (options) {
    console.log(options, "接受数据")
    //接受数据
    var selectGoods = JSON.parse(decodeURIComponent(options.selectGoods))
    this.setData({
      selectGoods: selectGoods,
      shop_name: selectGoods[0].store_name,
      delivery: selectGoods[0].deliery_cost,
      totalCost: options.totalCost,
      shop_id: options.shop_id
    })
    this.orderPrice()
  },

  // 计算订单页面得总价
  orderPrice() {
    var transTotalCost = this.data.totalCost
    var accountTotal = this.data.package_cost + this.data.delivery + parseFloat(transTotalCost)
    if (accountTotal > 50) {
      accountTotal -= this.data.sale
      this.setData({
        money: accountTotal.toFixed(2)
      })
    } else {
      this.setData({
        money: accountTotal.toFixed(2)
      })
    }
  },

  // 结算
  gotoPay() {
    var now = new Date();
    var yy = now.getFullYear(); //年
    var mm = now.getMonth() + 1; //月
    var dd = now.getDate(); //日
    var hh = now.getHours(); //时
    var ii = now.getMinutes(); //分
    var ss = now.getSeconds(); //秒
    var time = yy + "-";
    if (mm < 10) time += "0";
    time += mm + "-";
    if (dd < 10) time += "0";
    time += dd + " ";
    if (hh < 10) time += "0";
    time += hh + ":";
    if (ii < 10) time += '0';
    time += ii + ":";
    if (ss < 10) time += '0';
    time += ss;
    console.log("提交时间", time)
    const db = wx.cloud.database()
    db.collection('cartInfo').add({
      data: {
        orderData: this.data.selectGoods,
        shop_id: this.data.shop_id,
        totalCost: this.data.money,
        time: time
      },
      success: res => {
        console.log("返回结果", res)
      }
    }),
      wx.navigateTo({
        url: "../paySuccess/paySuccess"
      })


  },

  // 选择地址
  sellectAddress: function () {
    wx.navigateTo({
      url: "../selectAdress/selectAdress"
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
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1]; //当前页面
    let info = currPage.data.info
    if (info) {
      this.setData({
        name: info.name,
        // tel: info.tel,
        phone_num: info.phone_num,
        address: info.confirAddress
      })
    }
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