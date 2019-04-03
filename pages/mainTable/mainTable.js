
Page({
  data: {
    
  },
  onInfoTap: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/info/info?id=' + id,
    })
  },
  onEditTap: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/editTable/editTable?id='+id,
    })
  },
  onSetTap: function () {
    wx.navigateTo({
      url: '/pages/setting/setting',
    })
  },
  // 编辑返回时刷新页面数据
  changeData: function () {
    this.onLoad();
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
              goodsId:goodsId
            },
            method: 'GET',
            header: {
              'content-type': 'application/json' //默认值
            },
            success: function (res) {
              if (res.data.success===true) {
                wx.showToast({
                  title: '删除成功！',
                  icon: 'none',
                  duration: 2000
                })
                that.changeData()
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

  onLoad: function () {
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
        that.setData({
          listData:list
        })
      }
    })
  }
})