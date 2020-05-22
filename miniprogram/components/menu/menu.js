// components/menu/menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    minum_deliery:String,
    categoryList:Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    totalCost: 0,   //购物车计算总价
    totalCountNum: 0,   //加入的所有商品的数量
    selectGoods: [],    //选择的商品
    curNav: 0,
    toView: "one",
    num: 0,
    payDesc: "",     //结算按钮
    "minum_deliery": 20,      //配送费

    "categoryList": [
      {
        "id": "one",
        "name": "煌上煌招牌鸭系列",
        "categoryRight": [
          {
            "imgUrl": "https://cube.elemecdn.com/1/2c/f04467b508420da30cea4209684bbjpeg.jpeg?x-oss-process=image/resize,m_lfit,w_210,h_210/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp",
            "store_name": "分享装金牌酱鸭320克",
            "mouth_sell": 368,
            "price": 61.9,
            "count": 0,
            "material": "酱鸭"
          },
          {
            "imgUrl": "https://cube.elemecdn.com/4/0e/8629f514dec48fc17ae4bb5f45ae8jpeg.jpeg?x-oss-process=image/resize,m_lfit,w_210,h_210/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp",
            "store_name": "香卤猪脚",
            "mouth_sell": 25,
            "price": 19.9,
            "count": 0,
            "material": "猪脚"
          },
          {
            "imgUrl": "https://cube.elemecdn.com/2/f3/d6ade1212ad16f9a3b9cdb6138cf3jpeg.jpeg?x-oss-process=image/resize,m_lfit,w_210,h_210/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp",
            "store_name": "香卤猪舌（招财）",
            "mouth_sell": 17,
            "price": 19.9,
            "count": 0,
            "material": "猪舌"
          },
          {
            "imgUrl": "https://cube.elemecdn.com/e/36/f7638179106f47a99cd77683484fejpeg.jpeg?x-oss-process=image/resize,m_lfit,w_210,h_210/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp",
            "store_name": "招牌鸭掌",
            "mouth_sell": 38,
            "price": 16,
            "count": 0,
            "material": "鸭翅"
          }
        ]
      },
      {
        "id": "two",
        "name": "煌上煌香卤鸭系列",
        "categoryRight": [
          {
            "imgUrl": "https://cube.elemecdn.com/5/e2/8ad2a4201b7eb0ffe5fac0537d666jpeg.jpeg?x-oss-process=image/resize,m_lfit,w_210,h_210/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp",
            "store_name": "香卤鸭脖",
            "mouth_sell": 38,
            "price": 19.8,
            "count": 0,
            "material": "鸭脖"
          },
          {
            "imgUrl": "https://cube.elemecdn.com/e/07/2bcb139a92d0583db77a0bf63c11bjpeg.jpeg?x-oss-process=image/resize,m_lfit,w_210,h_210/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp",
            "store_name": "香卤鸭脖",
            "mouth_sell": 38,
            "price": 20.8,
            "count": 0,
            "material": "鸭脖"
          },
          {
            "imgUrl": "https://cube.elemecdn.com/5/7d/afa44af38774d594bfff5b66d2494jpeg.jpeg?x-oss-process=image/resize,m_lfit,w_210,h_210/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp",
            "store_name": "香卤鸭肠",
            "mouth_sell": 3,
            "price": 26.8,
            "count": 0,
            "material": "鸭肠"
          },
          {
            "imgUrl": "https://cube.elemecdn.com/d/08/3aff457587a5752af2a43d6ef8fa4jpeg.jpeg?x-oss-process=image/resize,m_lfit,w_210,h_210/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp",
            "store_name": "香卤藕片",
            "mouth_sell": 32,
            "price": 11,
            "count": 0,
            "material": "莲藕"
          }
        ]
      },
      {
        "id": "three",
        "name": "煌上煌特色系列",
        "categoryRight": [
          {
            "imgUrl": "https://cube.elemecdn.com/6/e5/f9570294b074d378a3ffcfaa2d9fdjpeg.jpeg?x-oss-process=image/resize,m_lfit,w_210,h_210/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp",
            "store_name": "酱香鸡腿",
            "mouth_sell": 32,
            "price": 7,
            "count": 0,
            "material": "鸡腿"
          }
        ]
      },
      {
        "id": "four",
        "name": "肉类",
        "categoryRight": [
          {
            "imgUrl": "https://cube.elemecdn.com/6/e5/f9570294b074d378a3ffcfaa2d9fdjpeg.jpeg?x-oss-process=image/resize,m_lfit,w_210,h_210/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp",
            "store_name": "凉拌耳丝",
            "mouth_sell": 2,
            "price": 38,
            "count": 0,
            "material": " "
          }
        ]
      },
      {
        "id": "four",
        "name": "肉类",
        "categoryRight": [
          {
            "imgUrl": "https://cube.elemecdn.com/6/e5/f9570294b074d378a3ffcfaa2d9fdjpeg.jpeg?x-oss-process=image/resize,m_lfit,w_210,h_210/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp",
            "store_name": "凉拌耳丝",
            "mouth_sell": 2,
            "price": 38,
            "count": 0,
            "material": " "
          }
        ]
      },
      {
        "id": "five",
        "name": "牛类",
        "categoryRight": [
          {
            "imgUrl": "https://cube.elemecdn.com/4/a7/2bae057ddb69f7e61c780e3be504ajpeg.jpeg?x-oss-process=image/resize,m_lfit,w_210,h_210/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp",
            "store_name": "凉拌牛肉",
            "mouth_sell": 20,
            "price": 25,
            "count": 0,
            "material": "牛肉"
          }
        ]
      }
    ]

  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 页面数据渲染
    // onLoad:function() {
    //   this.data.minum_deliery,
    //   this.data.categoryList
    // },

  //   lifetimes: {
  //     attached() {
  //         // 在组件实例进入页面节点树时执行
  //         console.log(this.data.categoryList)
  //         console.log(this.data.minum_deliery)
  //     },
  //     ready() {
  //         // 在组件在视图层布局完成后执行
  //         console.log("在组件中视图",this.data.minum_deliery)
  //         console.log(this.data.categoryList)
  //     }
  // },
    // 点餐商品选择器
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
      console.log(e)
      let categoryList = this.data.categoryList
      var index = e.currentTarget.dataset.itemIndex;
      var clickId = e.currentTarget.id;
      var clickIdIndex = e.currentTarget.dataset.parentindex
      this.data.categoryList[clickIdIndex].categoryRight[index].count++

      var price = this.data.categoryList[clickIdIndex].categoryRight[index].price;
      var num = this.data.categoryList[clickIdIndex].categoryRight[index].count;
      var name = this.data.categoryList[clickIdIndex].categoryRight[index].store_name;
      var cartObj = { price: price, num: num, name: name, itemIndex: index }

      var cartArr = []
      cartArr.push(cartObj)

      this.setData({
        categoryList: this.data.categoryList,
        selectGoods: cartArr,

      })
      this.totalPrice()
      this.payDesc()
      this.setData({

        payDesc: this.payDesc()
      })

    },
    // 
    decreaseNum(e) {

      let categoryList = this.data.categoryList
      var index = e.currentTarget.dataset.itemIndex;
      var clickId = e.currentTarget.id;
      var clickIdIndex = e.currentTarget.dataset.parentindex
      this.data.categoryList[clickIdIndex].categoryRight[index].count--
      var price = this.data.categoryList[clickIdIndex].categoryRight[index].price;
      var num = this.data.categoryList[clickIdIndex].categoryRight[index].count;
      var name = this.data.categoryList[clickIdIndex].categoryRight[index].store_name;
      var cartObj = { price: price, num: num, name: name, itemIndex: index }
      var cartArr1 = []
      cartArr1.push(cartObj)
      console.log(cartArr1)

      this.setData({
        categoryList: this.data.categoryList,
        selectGoods: cartArr1,

      })
      this.totalPrice()
      this.payDesc()
      this.setData({

        payDesc: this.payDesc()
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

    // 点击去结算
    toPay() {

    }

  }
})
