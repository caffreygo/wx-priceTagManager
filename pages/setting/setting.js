// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  loginOutTap: function () {
    wx.showModal({
      title: '提示',
      content: '请问您确定要退出登录吗？',
      success(res) {
        if (res.confirm) {
          wx.reLaunch({
            url: '/pages/login/login',
          })
        }
      }
    })
  },
})