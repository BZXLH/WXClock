// pages/start/start.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    bg: {},
    star: {},
    xiu: {},
    ball1: {},
    ball2: {},
    ball3: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取屏幕高度
    var h = 770;
    wx.getSystemInfo({
      success: (result) => {
        h = result.screenHeight;
      },
    });
    this.setData({
      height: h,
    });
    //背景动画
    var animation1 = wx.createAnimation({
      delay: 0,
      duration: 3000,
      timingFunction: "linear",
    });
    animation1.scale(1).step();
    this.setData({
      bg: animation1.export(),
    });
    //星星背景动画
    var animation2 = wx.createAnimation({
      delay: 1800,
      duration: 400,
      timingFunction: "linear",
    });
    animation2.opacity(1).step();
    this.setData({
      star: animation2.export(),
    });
    //火箭动画
    var animation3 = wx.createAnimation({
      delay: 0,
      duration: 3000,
      timingFunction: "linear",
    });
    animation3
      .scale(0.75)
      .translateY(-(this.data.height / 2))
      .step()
      .translateY(-this.data.height * 2)
      .step();
    this.setData({
      xiu: animation3.export(),
    });
    //球缩小动画
    var animation4 = wx.createAnimation({
      delay: 0,
      duration: 3000,
      timingFunction: "linear",
    });
    animation4.scale(0).step();
    this.setData({
      ball1: animation4.export(),
    });
    //地球动画
    var animation5 = wx.createAnimation({
      delay: 0,
      duration: 5000,
      timingFunction: "linear",
    });
    animation5.translate(-250, 250).step();
    this.setData({
      ball2: animation5.export(),
    });
    //绕圆动画
    var animation6 = wx.createAnimation({
      delay: 0,
      duration: 4000,
      timingFunction: "linear",
      transformOrigin: "-90px 90px",
    });
    var i = 0;
    animation6.rotate(-180).step();
    this.setData({
      ball3: animation6.export(),
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
