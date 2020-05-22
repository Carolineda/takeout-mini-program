// miniprogram/pages/index/index.js

const app = getApp()
var config = require('../../config.js')

// 用户定位

var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {

    address: "",   //定位地址
    value: "",     //搜索框
    longitude: 0,
    latitude: 0,
    time: " ",   //倒计时
    timeData: {},
    timeShow: "",
    endTime: '2020-4-10 22:00:00',
    day: "",
    hou: "",
    min: "",
    sec: "",
    categoryMenu: [    //导航tab
      {
        "menu_title": "美食",
        "type": "meishi",
        "img": "https://cube.elemecdn.com/7/d8/a867c870b22bc74c87c348b75528djpeg.jpeg?x-oss-process=image/format,webp/resize,w_90,h_90,m_fixed"
      },
      {
        "img": "https://cube.elemecdn.com/a/7b/b02bd836411c016935d258b300cfejpeg.jpeg?x-oss-process=image/format,webp/resize,w_90,h_90,m_fixed",
        "menu_title": "大牌惠吃",
        "type": "dapai"
      },
      {
        "img": "https://cube.elemecdn.com/e/89/185f7259ebda19e16123884a60ef2jpeg.jpeg?x-oss-process=image/format,webp/resize,w_90,h_90,m_fixed",
        "menu_title": "米粉面馆",
        "type": "mifen"
      },
      {
        "img": "https://cube.elemecdn.com/b/7f/432619fb21a40b05cd25d11eca02djpeg.jpeg?x-oss-process=image/format,webp/resize,w_90,h_90,m_fixed",
        "menu_title": "汉堡披萨",
        "type": "hanbao"
      },
      {
        "img": "https://cube.elemecdn.com/0/1a/314b6da88ab6c7ae9828f91652d40jpeg.jpeg?x-oss-process=image/format,webp/resize,w_90,h_90,m_fixed",
        "menu_title": "速食简餐",
        "type": "sushi"
      },
      {
        "img": "https://cube.elemecdn.com/7/d6/6f2631288a44ec177204e05cbcb93jpeg.jpeg?x-oss-process=image/format,webp/resize,w_90,h_90,m_fixed",
        "menu_title": "地方小吃",
        "type": "difang"
      },
      {
        "img": "https://cube.elemecdn.com/a/7b/b02bd836411c016935d258b300cfejpeg.jpeg?x-oss-process=image/format,webp/resize,w_90,h_90,m_fixed",
        "menu_title": "大牌惠吃",
      },
      {
        "img": "https://cube.elemecdn.com/d/38/7bddb07503aea4b711236348e2632jpeg.jpeg?x-oss-process=image/format,webp/resize,w_90,h_90,m_fixed",
        "menu_title": "午餐",
        "type": "wucan"
      }

    ],
    // 附近商家导航栏
    tabOne: "综合排序",
    tabTwo: "距离最近",
    tabThree: "销量最高",
    tabFour: "筛选",

    // 综合排序列表
    option1: [
      { text: '综合排序', value: 0 },
      { text: '好评优先', value: 1 },
      { text: '起送价最低', value: 2 },
      { text: '配送费最低', value: 3 },
      { text: '配送最快', value: 4 },
      { text: '人均从低到高', value: 5 },
      { text: '人均从高到底', value: 6 },

    ],
    value1: 0,

    // 商品列表
    "storeDetail": [
      {
        "id": "list_one",
        "imgUrl": "https://cube.elemecdn.com/c/6b/6029802efceeba46e84550cd5b2efjpeg.jpeg?x-oss-process=image/format,webp/resize,w_130,h_130,m_fixed",
        "store_name": "煌上煌酱鸭",
        "value": 4,
        "mouth_sell": 368,
        "minum_deliery": 20,
        "deliery_cost": 4,
        "tag": "卤味鸭脖",
        "activity": [
          {
            "active_tab": "减",
            "active_brief": "满50元减3元，满100元减6元"
          },
          {
            "active_tab": "新",
            "active_brief": "饿了么新用户首单立减10元"
          }
        ],

      },
      {
        "id": "list_two",
        "imgUrl": "https://cube.elemecdn.com/0/de/de9e1580a63a5961ba55fe533f40cpng.png?x-oss-process=image/format,webp/resize,w_130,h_130,m_fixed",
        "store_name": "张姐烤肉饭脆皮鸡饭",
        "value": 4.3,
        "mouth_sell": 841,
        "minum_deliery": 14,
        "deliery_cost": 3.5,
        "tag": "鸡肉拌饭",
        "activity": [
          {
            "active_tab": "减",
            "active_brief": "满20元减1元，满40元减3元"
          },
          {
            "active_tab": "新",
            "active_brief": "饿了么新用户首单立减10元"
          }
        ]
      },
      {
        "id": "list_three",
        "imgUrl": "https://cube.elemecdn.com/e/a5/20a99b5dfad49c08504ab1eeda57fpng.png?x-oss-process=image/format,webp/resize,w_130,h_130,m_fixed",
        "store_name": "好哥哥肉蟹煲（外贸街店）",
        "value": 3.8,
        "mouth_sell": 277,
        "minum_deliery": 20,
        "deliery_cost": 1.5,
        "tag": "盖浇饭",
        "activity": [
          {
            "active_tab": "减",
            "active_brief": "满29元减7元，满78元减13元"
          },
          {
            "active_tab": "配",
            "active_brief": "配送费立减2元"
          }
        ]
      },
      {
        "id": "list_four",
        "imgUrl": "https://cube.elemecdn.com/9/8a/2491f741b5dfac6e6adb03ee32053jpeg.jpeg?x-oss-process=image/format,webp/resize,w_130,h_130,m_fixed",
        "store_name": "麻辣鸡架",
        "value": 4.7,
        "mouth_sell": 2574,
        "minum_deliery": 15,
        "deliery_cost": 1,
        "tag": "其他小吃",
        "activity": [
          {
            "active_tab": "减",
            "active_brief": "满18元减17元，满50元减21元，满80元减30元，满110元减43元"
          },
          {
            "active_tab": "配",
            "active_brief": "配送费立减2元"
          }
        ]
      },
      {
        "id": "list_five",
        "imgUrl": "https://cube.elemecdn.com/3/cc/24358ec92a62bdf249b4f275db0e7jpeg.jpeg?x-oss-process=image/format,webp/resize,w_130,h_130,m_fixed",
        "store_name": "有味小厨",
        "value": 4.4,
        "mouth_sell": 2121,
        "minum_deliery": 20,
        "deliery_cost": 2,
        "tag": "江西菜",
        "activity": [
          {
            "active_tab": "减",
            "active_brief": "满18元减17元，满50元减21元，满80元减30元，满110元减43元"
          },
          {
            "active_tab": "配",
            "active_brief": "配送费立减2元"
          }
        ]
      },
      {
        "id": "list_six",
        "type": "hanbao",
        "imgUrl": "https://cube.elemecdn.com/8/a9/6b0d13781491d026a6e1f5995dbe7png.png?x-oss-process=image/format,webp/resize,w_150",
        "store_name": "叫了个炸鸡",
        "value": 4.4,
        "taste_value": 4.1,
        "package_value": 4.3,
        "delivery_value": 4.4,
        "mouth_sell": 2121,
        "minum_deliery": 20,
        "deliery_cost": 2,
        "tag": "汉堡薯条",
        "activity": [
          {
            "active_tab": "减",
            "active_brief": "满10元减5元"
          },
          {
            "active_tab": "配",
            "active_brief": "配送费立减2元"
          }
        ]
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '玩命加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)

    // this.getEntries()
    var that = this
    qqmapsdk = new QQMapWX({
      key: 'XARBZ-4LOC4-VIWUX-DZKW6-QIEU7-GWBUX' // 必填
    });
    //1、获取当前位置坐标
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
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
            // console.log("longitude",addressRes.result.ad_info.location.lng)
            // app.globalData.address = address;
            that.setData({
              address: address,
              latitude: addressRes.result.ad_info.location.lat,
              longitude: addressRes.result.ad_info.location.lng
            })
          }
        })

      }
    })

    this.accountTime()
  },





  // 点击选择地址
  toSelectAdress: function (e) {
    console.log("地址传递", this.data.address)
    wx.navigateTo({
      url: "../selectAdress/selectAdress?address=" + this.data.address
    })
  },

  // 倒计时
  accountTime(){
    var nowTime = new Date().getTime()  //获取现在时间
    var endTime = new Date(this.data.endTime).getTime()//结束时间
    var accountTime = (endTime - nowTime) //距离结束的毫秒数\
    this.setData({
      time: accountTime
    })
  },
  onChange(e) {
    this.setData({
      timeData: e.detail
    });
  },



  // 点击筛选商家显示条件
  clickCondition: function (e) {
    console.log("点击", e.detail)
    if (e.detail === 0) {
      this.setData({
        storeDetail: this.data.storeDetail

      })
    }
    if (e.detail === 1) {
      this.shopSort()
    }
    if (e.detail === 2) {
      this.deliverySort()
    }
    if (e.detail === 3) {
      this.deliveryCostSort()
    }
  },

  // 根据点击字段进行排序 好评优先
  shopSort: function () {
    let arrField = [];
    this.data.storeDetail.map(item => arrField.push(item.value));
    arrField.sort();
    let arr2 = [];
    arrField.forEach((v, i) => {
      this.data.storeDetail.forEach(res => {
        if (res.value === v) {
          arr2.push(res);
        }
      });
    });
    this.setData({
      storeDetail: arr2
    })
  },

  // 起送价最低
  deliverySort: function () {
    let arrField = [];
    this.data.storeDetail.map(item => arrField.push(item.minum_deliery));
    arrField.sort();
    let arrDelivery = [];
    arrField.forEach((v, i) => {
      this.data.storeDetail.forEach(res => {
        if (res.minum_deliery === v) {
          arrDelivery.push(res);
        }
      });
    });
    this.setData({
      storeDetail: arrDelivery
    })
  },

  // 配送费
  deliveryCostSort: function () {
    let arrField = [];
    this.data.storeDetail.map(item => arrField.push(item.value));
    arrField.sort();
    let arrDeliveryCost = [];
    arrField.forEach((v, i) => {
      this.data.storeDetail.forEach(res => {
        if (res.value === v) {
          arrDeliveryCost.push(res);
        }
      });
    });
    this.setData({
      storeDetail: arrDeliveryCost
    })
  },

  // 附近商家 点击进入商家页面
  toStoreDetail: function (e) {
    let that = this
    // console.log(e)
    console.log('首页商家信息', e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: "../shopIndex/shopIndex?id=" + that.data.storeDetail[index].id
    })
  },


  // 点击跳转搜索
  toSearch: function (e) {
    wx.navigateTo({
      url: "../search/search"
    })
  },


  // 跳转到秒杀页面
  toSeckill: function () {
    wx.navigateTo({
      url: "../seckill/seckill"
    })
  }

})