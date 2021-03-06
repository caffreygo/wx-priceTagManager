Page({


  data: {
  },
  onInfoTap: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/info/info?id=' + id,
    })
  },
  onSelectTap: function () {
    wx.navigateTo({
      url: '/pages/select/select',
    })
  },
  onAddTap: function () {
    wx.navigateTo({
      url: '/pages/add/add',
    })
  },
  onEditTap: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/editTable/editTable?id=' + id,
    })
  },
  onDeleteTap: function (e) {
    var that = this
    let goodsId = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '请问您确定要删除该商品吗？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: 'https://www.gocaffrey.xyz/PriceTagManager/servlet/delete',  //服务器地址
            data: {
              goodsId: goodsId
            },
            method: 'GET',
            header: {
              'content-type': 'application/json' //默认值
            },
            success: function (res) {
              if (res.data.success === true) {
                wx.showToast({
                  title: '删除成功！',
                  icon: 'none',
                  duration: 2000
                })
                wx.redirectTo({
                  url: '/pages/mainTable/mainTable'
                })
              } else {
                wx.showToast({
                  title: '删除失败！',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
        }
      }
    })
  },
  onLoad: function (options) {
    let list = JSON.parse(options.list)
    this.setData({
      listData: list
    })
  }
})