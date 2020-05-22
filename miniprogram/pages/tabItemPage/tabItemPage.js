
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: "meishi",

    categoryMenu: [    //导航tab
      {
        "menu_title": "美食",
        "id": "meishi",
        "type": "meishi",
        "img": "https://cube.elemecdn.com/7/d8/a867c870b22bc74c87c348b75528djpeg.jpeg?x-oss-process=image/format,webp/resize,w_90,h_90,m_fixed"
      },
      {
        "img": "https://cube.elemecdn.com/a/7b/b02bd836411c016935d258b300cfejpeg.jpeg?x-oss-process=image/format,webp/resize,w_90,h_90,m_fixed",
        "menu_title": "大牌惠吃",
        "type": "dapai",
        "id": "dapai"
      },
      {
        "img": "https://cube.elemecdn.com/e/89/185f7259ebda19e16123884a60ef2jpeg.jpeg?x-oss-process=image/format,webp/resize,w_90,h_90,m_fixed",
        "menu_title": "米粉面馆",
        "type": "mifen",
        "id": "mifen"
      },
      {
        "img": "https://cube.elemecdn.com/b/7f/432619fb21a40b05cd25d11eca02djpeg.jpeg?x-oss-process=image/format,webp/resize,w_90,h_90,m_fixed",
        "menu_title": "汉堡披萨",
        "type": "hanbao",
        "id": "hanbao"
      },
      {
        "img": "https://cube.elemecdn.com/0/1a/314b6da88ab6c7ae9828f91652d40jpeg.jpeg?x-oss-process=image/format,webp/resize,w_90,h_90,m_fixed",
        "menu_title": "速食简餐",
        "type": "sushi",
        "id": "sushi"
      },
      {
        "img": "https://cube.elemecdn.com/7/d6/6f2631288a44ec177204e05cbcb93jpeg.jpeg?x-oss-process=image/format,webp/resize,w_90,h_90,m_fixed",
        "menu_title": "地方小吃",
        "type": "difang",
        "id": "difang"
      },

      {
        "img": "https://cube.elemecdn.com/d/38/7bddb07503aea4b711236348e2632jpeg.jpeg?x-oss-process=image/format,webp/resize,w_90,h_90,m_fixed",
        "menu_title": "午餐",
        "type": "wucan",
        "id": "wucan"
      }

    ],

    // 商家
    // "storeDetail": [
    //   {
    //     "id": "list_one",
    //     "imgUrl": "https://cube.elemecdn.com/c/6b/6029802efceeba46e84550cd5b2efjpeg.jpeg?x-oss-process=image/format,webp/resize,w_130,h_130,m_fixed",
    //     "store_name": "煌上煌酱鸭",
    //     "value": 4,
    //     "mouth_sell": 368,
    //     "minum_deliery": 20,
    //     "deliery_cost": 4,
    //     "tag": "卤味鸭脖",
    //     "activity": [
    //       {
    //         "active_tab": "减",
    //         "active_brief": "满50元减3元，满100元减6元"
    //       },
    //       {
    //         "active_tab": "新",
    //         "active_brief": "饿了么新用户首单立减10元"
    //       }
    //     ],

    //   },
    //   {
    //     "id": "list_two",
    //     "imgUrl": "https://cube.elemecdn.com/0/de/de9e1580a63a5961ba55fe533f40cpng.png?x-oss-process=image/format,webp/resize,w_130,h_130,m_fixed",
    //     "store_name": "张姐烤肉饭脆皮鸡饭",
    //     "value": 4.3,
    //     "mouth_sell": 841,
    //     "minum_deliery": 14,
    //     "deliery_cost": 3.5,
    //     "tag": "鸡肉拌饭",
    //     "activity": [
    //       {
    //         "active_tab": "减",
    //         "active_brief": "满20元减1元，满40元减3元"
    //       },
    //       {
    //         "active_tab": "新",
    //         "active_brief": "饿了么新用户首单立减10元"
    //       }
    //     ]
    //   }
    // ],

    // 接口存放数据对应商家位置
    storeDetail: [],

    getYunData: []    //数据库拉下来数据
  },


  // 点击头部信息tab
  onClick: function (e) {
    console.log(e.detail.name)
    const db = wx.cloud.database()
    var getData = []
    this.data.getYunData.map((item) => {
      if (e.detail.name == item.type) {
        getData.push(item)
      }
      this.setData({
        storeDetail: getData
      })
    })
  },

  // 选择商家点击跳转商家详情页面
  toStorePage:function (e){
    let that = this
    console.log('首页商家信息', e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: "../shopIndex/shopIndex?id=" + that.data.storeDetail[index].id
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("接受options数据",options)
    db.collection('dataArr').get({
      success: res => {
        var defaultData = []
        res.data.map((item) => {
          console.log(item)
          if (options.type == item.type) {
            defaultData.push(item)
          }
        })
        this.setData({
          getYunData: res.data,
          active:options.type,
          storeDetail:defaultData
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