// pages/preWeeklyReport/preWeeklyReport.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    preReport: [],//请求返回的周报信息
    avatar: ''//头像
  },

  // 前往对应的周报
  Gotoreport(e) {
    wx.navigateTo({
      url: `/pages/preReport/preReport?week=${e.currentTarget.dataset.week}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 拿token
    wx.getStorage({
      key: 'token',
      success: (res) => {
        this.setData({
          token: res.data
        })
        //请求数据
        wx.request({
          url: 'https://philil.com.cn/clockin_app/api//weekReport',
          method: 'GET',
          header: {
            'Authorization': this.data.token
          },
          success: (res) => {
            //判断token有没有过期
            if (res.data.code == 401) {
              checkLogin();
              return
            }
            
            this.setData({
              avatar: res.data.data.avatar,
              preReport: res.data.data.weekReports
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    // 下拉重新请求数据
    wx.request({
      url: 'https://119.29.79.55:8080//weekReport',
      method: 'GET',
      header: {
        'Authorization': this.data.token
      },
      success: (res) => {
        //判断token有没有过期
        if (res.data.code == 401) {
          checkLogin();
          return
        }
        
        this.setData({
          avatar: res.data.data.avatar,
          preReport: res.data.data.weekReports
        })
        wx.stopPullDownRefresh();
      }
    })

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})