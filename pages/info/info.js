Page({

  data: {

  },

  onLoad: function (options) {
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
              item: list[i]
            })
          }
        }
      }
    })
  }
})