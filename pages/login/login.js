// pages/login/login.js
import login from "../../utils/checkLogin";
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
<<<<<<< HEAD
  async onLoad(options) {
    wx.showLoading({
      title: "加载中",
    });
    let res = await login();
=======
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    wx.showLoading({
      title: "加载中",
    });
    let res = await login(true);
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
    if (res) {
      wx.switchTab({
        url: "/pages/daka/daka",
      });
    } else {
      wx.redirectTo({
        url: `/pages/first/first`,
      });
    }
    wx.hideLoading({
      success: (res) => {},
    });
  },

  /**
<<<<<<< HEAD
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
=======
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
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
