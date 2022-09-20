// pages/passClock/passClock.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    times: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //跨页面修改数据、页面传值
    let currentPage=getCurrentPages();
    let prePage=currentPage[0];
    console.log(prePage.data.type)
    const type=(prePage.data.type=='上班'?'下班':'上班')
    prePage.setData({
      type:type
    })
    //跨页面修改数据、页面传值
    this.setData({
      times: wx.getStorageSync("times").data + 1,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
