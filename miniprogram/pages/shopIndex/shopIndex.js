// miniprogram/pages/shopIndex/shopIndex.js
import detailData from '../../utils/indexDetail'
Page({

  /**
   * 页面的初始数据
   */
  data: {

    show: false,  //弹出层
    active: 0,    //tab标签
    status: 0,
    value: "",
    mouth_sell: "",
    imgUrl: "",
    store_name: "",
    detailData: detailData,    //接受数据
    id: "",
    // 传入给组件的值
    minum_deliery: "",
    categoryList: [],

    // 菜单部分
    totalCost: 0,   //购物车计算总价
    totalCountNum: 0,   //加入的所有商品的数量
    selectGoods: [],    //选择的商品
    curNav: 0,
    toView: "one",
    num: 0,
    payDesc: "",     //结算按钮
    //配送费

    // 评论部分
    taste_value: "",
    package_value: "",
    delivery_value: "",


    // 传入订单部分
    orderData: [],
    shop_name: "",
    shop_id: "",
    deliery_cost: "",   //配送费

  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  onChange(event) {
    // wx.showToast({
    //   // title: `切换到标签 ${event.detail.name}`,
    //   // icon: 'none'
    // });
  },


  /**
   * 生命周期函数--监听页面加载
   */

  //  获取数据
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getData()
  },
  getData(id) {
    let daraArr = []
    let getCurrentData = detailData.filter(item => {
      if (item.id === this.data.id) {
        daraArr.push(item)
      }
    })
    console.log("跳转接受信息", daraArr)
    this.setData({
      value: daraArr[0].value,
      mouth_sell: daraArr[0].mouth_sell,
      imgUrl: daraArr[0].imgUrl,
      store_name: daraArr[0].store_name,
      categoryList: daraArr[0].categoryList,
      minum_deliery: daraArr[0].minum_deliery,
      taste_value: daraArr[0].taste_value,
      package_value: daraArr[0].package_value,
      delivery_value: daraArr[0].delivery_value,
      deliery_cost: daraArr[0].deliery_cost,
    })
    console.log('选中的数据', this.data.categoryList)
  },


  // 点击导航栏显示
  tabChange: function (e) {
    var showtype = e.target.dataset.type;
    this.setData({
      status: showtype,
    });
  },


  // 菜单menu部分js
  // 点餐左边商品选择器
  switchTab(e) {
    console.log(e);
    let that = this
    that.setData({
      curNav: e.target.dataset.index,
      toView: e.target.dataset.id
    })
  },
  switchScroll(e) {
    console.log(e)
  },
  //加入购物车
  addNum(e) {
    var index = e.currentTarget.dataset.itemIndex;
    var clickIdIndex = e.currentTarget.dataset.parentindex
    this.data.categoryList[clickIdIndex].categoryRight[index].count++
    var mark = 'a' + index + 'b' + clickIdIndex
    var price = this.data.categoryList[clickIdIndex].categoryRight[index].price;
    var num = this.data.categoryList[clickIdIndex].categoryRight[index].count;
    var name = this.data.categoryList[clickIdIndex].categoryRight[index].store_name;
    var imgUrl = this.data.imgUrl;
    var goodImg = this.data.categoryList[clickIdIndex].categoryRight[index].imgUrl;
    var store_name = this.data.store_name;
    var deliery_cost = this.data.deliery_cost
    var cartObj = { price: price, deliery_cost: deliery_cost, mark: mark, goodImg: goodImg, num: num, name: name, store_name: store_name, itemIndex: index, imgUrl: imgUrl }
    var cartArr = this.data.selectGoods.filter(item => item.mark != mark)
    cartArr.push(cartObj)
    this.setData({
      selectGoods: cartArr,
      categoryList: this.data.categoryList,
    })
    this.totalPrice()
    this.setData({
      selectGoods: cartArr,
      payDesc: this.payDesc()
    })

  },
  // 
  decreaseNum(e) {
    let categoryList = this.data.categoryList
    var index = e.currentTarget.dataset.itemIndex;
    var clickIdIndex = e.currentTarget.dataset.parentindex
    this.data.categoryList[clickIdIndex].categoryRight[index].count--
    var mark = 'a' + index + 'b' + clickIdIndex
    var price = this.data.categoryList[clickIdIndex].categoryRight[index].price;
    var num = this.data.categoryList[clickIdIndex].categoryRight[index].count;
    var name = this.data.categoryList[clickIdIndex].categoryRight[index].store_name;
    var store_name = this.data.store_name;
    var imgUrl = this.data.imgUrl;
    var goodImg = this.data.categoryList[clickIdIndex].categoryRight[index].imgUrl;
    var deliery_cost = this.data.deliery_cost
    var cartObj = { price: price, deliery_cost: deliery_cost, num: num, goodImg: goodImg, mark: mark, imgUrl: imgUrl, name: name, itemIndex: index, store_name: store_name }
    var cartArr1 = this.data.selectGoods.filter(item => item.mark != mark)
    cartArr1.push(cartObj)
    this.setData({
      selectGoods: cartArr1,
      categoryList: this.data.categoryList
    })
    this.totalPrice()
    this.setData({
      selectGoods: cartArr1,
      payDesc: this.payDesc(),
    })
  },

  // 求出总价
  totalPrice() {
    let totalPrice = 0;
    let totalCount = 0;
    let selectGoods = this.data.selectGoods
    for (let i = 0; i < selectGoods.length; i++) {
      totalPrice += selectGoods[i].price * (selectGoods[i].num);
      totalCount += selectGoods[i].num
    }
    this.setData({
      totalCost: totalPrice.toFixed(2),
      totalCountNum: totalCount,

    });
  },

  // 判断是否去结算  求出还差多少最低起送价
  payDesc() {
    if (this.data.totalCost === 0) {
      return `￥${this.data.minum_deliery}元起送`;
    } else if (this.data.totalCost < this.data.minum_deliery) {
      let diff = (this.data.minum_deliery - this.data.totalCost).toFixed(2);
      return '还差' + diff + '元起送';
    } else {
      return '去结算';
    }
  },

  //点击购物车显示列表
  showCartList() {

  },

  // 满足条件点击去结算
  toPay(e) {
    console.log(e)
    console.log("购物车数据总价", this.data.selectGoods)
    console.log("当前id是：", this.data.id)
    // console.log(this.data.selectGoods[0]['id']=(this.data.id),this.data.selectGoods)
    var resultType = "success";
    var selectGoods = encodeURIComponent(JSON.stringify(this.data.selectGoods));
    // console.log("计算总价", this.data.totalCost)
    wx.navigateTo({
      url: "../pay/pay?selectGoods=" + selectGoods + "&totalCost=" + this.data.totalCost + "&shop_id=" + this.data.id
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.menuFunc = this.selectComponent('#menuFunc')
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