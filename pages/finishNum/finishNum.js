// pages/addNum/addNum.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    pageTop:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    this.setData({
      num: options.num,
      pageTop: options.pageTop
    })
  },
  back() {
    var that=this
    wx.navigateBack({
      delta: 2
    })
    // // 设置滚动条的位置
    wx.pageScrollTo({
      scrollTop: that.data.pageTop, // 滚动到的位置（距离顶部 px）
      duration: 0 //滚动所需时间 如果不需要滚动过渡动画，设为0（ms）
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