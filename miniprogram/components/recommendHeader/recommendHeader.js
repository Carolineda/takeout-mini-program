// components/recommendHeader/recommendHeader.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    styleIsolation: 'shared'   //vant样式覆盖
  },
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // 
    tabOne: "综合排序",
    tabTwo: "距离最近",
    tabThree: "销量最高",
    tabFour: "筛选",

    // 综合排序列表
    option1: [
      { text: '综合排序', value: 0 },
      { text: '好评优先', value: 1 },
      { text: '起送价最低', value: 2 },
      { text: '配送最快', value: 3 },
      { text: '配送费最低', value: 4 },
      { text: '人均从低到高', value: 5 },
      { text: '人均从高到底', value: 6},

    ],
    value1: 0,


  
  },

  /**
   * 组件的方法列表
   */
  methods: {
    isSort() { }
  }
})
