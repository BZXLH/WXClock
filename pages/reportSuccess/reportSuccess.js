// pages/reportSuccess/reportSuccess.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    h: 0,
    query: {},
    rocketMove: {}
  },

  //跳转往期周报
  GotoOtherReport() {
    wx.navigateTo({
      url: "/pages/preReportList/preReportList",
    });
  },

  //返回
  goBack() {
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取传过来的参数
    this.setData({
      query: options,
    });
    //获取屏幕高度
    let h = 770;
    wx.getSystemInfo({
      success: (result) => {
        h = result.screenHeight;
      },
    });
    this.setData({
      h
    });
    
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
        //火箭动画
        const animation3 = wx.createAnimation({
          delay: 500,
          duration: 2500,
          timingFunction: "ease-in",
        });
        animation3
          .translateY(-this.data.h * 2)
          .scale(0.5)
          .step();
        this.setData({
          rocketMove: animation3.export(),
        });
    
  },

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
