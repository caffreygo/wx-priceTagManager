Page({

  data: {
  },
  nameInput: function({detail}) {
    this.data.goodsName = detail.value
  },
  priceInput: function ({ detail }) {
    this.data.goodsPrice = detail.value
  },
  infoInput: function ({ detail }) {
    this.data.goodsInfo = detail.value
  },
  // 当数据变动后调用此方法重载当前页面数据
  changeParentData: function () {
    var pages = getCurrentPages();//当前页面栈
    if (pages.length > 1) {
      var beforePage = pages[pages.length - 2];//获取上一个页面实例对象
      beforePage.changeData();//触发父页面中的方法
    }
  },
  submit: function () {
    var that = this
    if (this.data.goodsName == '' || this.data.goodsPrice == ''){
      wx.showToast({
        title: '商品名称和价格不能为空！',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.request({
        url: 'https://www.gocaffrey.xyz/PriceTagManager/servlet/edit',  //服务器地址
        data: {
          goodsId:this.data.goodsId,
          goodsName: this.data.goodsName,
          goodsPrice: this.data.goodsPrice,
          goodsInfo: this.data.goodsInfo
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' //默认值
        },
        success: function (res) {
          if(res.data.success ===true){
            that.changeParentData()
            wx.showToast({
              title: '编辑成功！',
              icon: 'none',
              duration: 2000
            })
          }else{
            wx.showToast({
              title: '编辑失败！',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
  },
  onLoad: function (options) {
    this.data.goodsId = options.id
    var that = this;
    wx.request({
      url: 'https://www.gocaffrey.xyz/PriceTagManager/servlet/getList',  //服务器地址
      data: {
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
        let list = res.data
        for (let i in list) {
          if (list[i].goodsId == options.id) {
            that.setData({
              item: list[i],
              goodsName: list[i].goodsName,
              goodsPrice: list[i].goodsPrice,
              goodsInfo: list[i].goodsInfo
            })
          }
        }
      }
    })
  }
})