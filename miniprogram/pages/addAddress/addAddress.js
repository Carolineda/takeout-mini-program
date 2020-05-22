// miniprogram/pages/addAddress/addAddress.js
import area from '../../utils/area'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaList:area,   //三级地区数据
    show: false ,
    selectValue: "江苏",     //选中地区显示
    cityInfo: "", //
    focus: true
  },
  getAddress(){},
  showPopup() {
    this.setData({ show: true });
  },
  onClose(){
    this.setData({ show: false });
  },
  formSubmit(e){
    // 信息提交到数据库
    const db = wx.cloud.database()
    db.collection('addressInfo').add({
      data: {
        name: e.detail.value.name,
        tel: e.detail.value.tel,
        cityInfo: this.data.cityInfo,
        detail_address:e.detail.value.detail_address
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        console.log("返回结果",res)
        wx.navigateTo({
          url: "../selectAdress/selectAdress"
        })
      }
    }) 
  },
  // 点击确认选中城市
  clickConfirm(e){
    console.log("选中",e.detail.values[0].name)
    this.setData({ 
      show: false,
      cityInfo: e.detail.values[0].name + e.detail.values[1].name +e.detail.values[2].name
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.areaList)
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