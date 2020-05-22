// miniprogram/pages/selectAdress/selectAdress.js

const app = getApp()

var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    address: "",
    usemessage: "", //收货地址
    addressData: [],


    // 传回上个页面的参数
    confirAddress: "",
    name: "",
    phone_num: ""
  },



  // 点击重新定位
  relocation: function (e) {
    var that = this
    qqmapsdk = new QQMapWX({
      key: 'XARBZ-4LOC4-VIWUX-DZKW6-QIEU7-GWBUX' // 必填
    });
    //1、获取当前位置坐标
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        wx.showToast({
          title: '定位成功',
          icon: 'success',
          duration: 2000
        })
        console.log('获取位置', res);
        //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析 定位显示名称
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            console.log("地址解析", addressRes);
            var address = addressRes.result.formatted_addresses.recommend;    //位置描述
            // var address = addressRes.result.address;     //地址描述
            that.setData({
              address: address
            })
          }
        })

      }
    })


  },


  // 添加收货地址
  ToaddAddress: function () {
    wx.navigateTo({
      url: '../addAddress/addAddress',

    });
  },
  // relocation:function(){},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 
    const db = wx.cloud.database()
    db.collection('addressInfo').get({
      success: res => {
        console.log("历史收货地址", res.data)
        this.setData({
          addressData: res.data
        })

      }
    })
    this.setData({
      address: options.address
    })

    // 历史收货地址



  },


  // 点击选择收获地址
  clickItemAddress(e) {
    console.log(e, "收货地址选择")
    this.data.addressData.map((item) => {
      console.log(item, "循环选项")
      if (item._id == e.currentTarget.id) {
        this.setData({
          confirAddress: item.cityInfo + item.detail_address,
          phone_num: item.tel,
          name: item.name
        })
      }
    })
    let pages = getCurrentPages()
    let prevPage = pages[pages.length - 2]
    prevPage.setData({   //把需要回传的值保存到上一个页面
      address: this.data.confirAddress,
      phone_num: this.data.phone_num,
      name: this.data.name
    });
    console.log("当前页数", pages)
    wx.navigateBack({
      delta: 1

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