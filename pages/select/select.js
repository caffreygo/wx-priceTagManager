Page({
  data: {
    goodsId: '',
    goodsName: ''
  },
  idInput: function({detail}) {
    this.data.goodsId = detail.value
  },
  nameInput: function ({ detail }) {
    this.data.goodsName = detail.value
  },
  submit: function(e) {
    var that = this
    if(this.data.goodsId=='' && this.data.goodsName==''){
      wx.showToast({
        title: '请先输入商品编号或名称！',
        icon: 'none',
        duration: 2000
      })
    }
    wx.request({
      url: 'https://www.gocaffrey.xyz/PriceTagManager/servlet/search',  //服务器地址
      data: {
        goodsId: this.data.goodsId,
        goodsName: this.data.goodsName
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
        let list = JSON.stringify(res.data)
        wx.navigateTo({
          url: '/pages/selectResult/selectResult?list=' + list,
        })
      }
    })
  },

  onLoad: function (options) {

  },


})