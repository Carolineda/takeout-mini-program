
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 订单为空图片
    nullPic: "https://fuss10.elemecdn.com/8/c8/bbe5984003cb26fc7b445a4a15195png.png",
    // orderArr: [
    //   {
    //     imgUrl: "https://cube.elemecdn.com/c/6b/6029802efceeba46e84550cd5b2efjpeg.jpeg?x-oss-process=image/format,webp/resize,w_130,h_130,m_fixed",
    //     itemIndex: 0,
    //     name: "分享装金牌酱鸭320克",
    //     num: 1,
    //     price: 61.9,
    //     store_name: "煌上煌酱鸭",
    //   },
    //   {
    //     imgUrl: "https://cube.elemecdn.com/c/6b/6029802efceeba46e84550cd5b2efjpeg.jpeg?x-oss-process=image/format,webp/resize,w_130,h_130,m_fixed",
    //     itemIndex: 0,
    //     name: "分享装金牌酱鸭320克",
    //     num: 1,
    //     price: 61.9,
    //     store_name: "煌上煌酱鸭",
    //   }
    // ],
    null_order: true,
    orderArr:[],
    id: "" ,  //从数据库中获取的id
    totalCost: "",
    time: "",  //下单时间
  },

  // 再次预定
  toReOrder(e){
    console.log(e)
    wx.navigateTo({
      url: "../shopIndex/shopIndex?id="+e.currentTarget.id
    })
  },

  // 从订单详情跳转到评价
  toRate(e){
    var rateShopData = []
    this.data.orderArr.map((item) => {
      if(item._id === e.currentTarget.id ){
        rateShopData.push(item)  //点击评价的数据 
      }
    })
    var selectRateData = encodeURIComponent(JSON.stringify(rateShopData));
    wx.navigateTo({
      url: "../addRate/addRate?selectRateData="+selectRateData
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取订单数据表中的订单数据
    const db = wx.cloud.database()
    db.collection('cartInfo').get({
      success: res=> {
        console.log("id:",res.data)
        this.setData({
          orderArr:res.data.reverse()
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