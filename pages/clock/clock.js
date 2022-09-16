// pages/clock/clock.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    thinking: "",
    maxLongitude: 113.386,
    minLongitude: 113.384,
    maxLatitude: 23.043,
    minLatitude: 23.04,
  },
  write(e) {
    this.setData({ thinking: e.detail.value });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

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

  submitClock() {
    console.log(this.data.thinking);
    if ((this.data.thinking == "")||(this.data.thinking.trim()=="")) {
      wx.showToast({
        title: "感想不能为空",
        icon: "error",
        duration: 2000,
      });
      return;
    }
    wx.showToast({
      title: "获取定位中...",
      icon: "loading",
      duration: 5000,
    });
    wx.getLocation({
      isHighAccuracy: true,
      highAccuracyExpireTime: 5000,
      success: (res) => {
        console.log(res);
        wx.hideToast();
        if (
          res.latitude <= this.data.maxLatitude &&
          res.latitude >= this.data.minLatitude &&
          res.longitude >= this.data.minLongitude &&
          res.longitude <= this.data.maxLongitude
        ) {
          var header = {
            "content-type": "application/json",
            Authorization: wx.getStorageSync("token"),
          };
          wx.request({
            url: "https://philil.com.cn/clockin_app/api/clockin",
            method: "post",
            data: {
              feeling: this.data.thinking,
            },
            header: header,
            success: (res) => {
              console.log(res)
            console.log(this.data.thinking)
              wx.setStorageSync("times", res.data);
              wx.navigateTo({
                url: "../passClock/passClock",
              });
              this.setData({
                thinking: "",
              });
            },
            fail: (res) => {
              wx.navigateTo({
                url: "../failClock/failClock",
              });
            },
          });
        } else {
          console.log(res);
          wx.navigateTo({
            url: "../failClock/failClock",
          });
        }
      },
    });
  },
});
