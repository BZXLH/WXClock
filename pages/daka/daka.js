// pages/daka/daka.js
import login from "../../utils/checkLogin";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    days: 0, //连续打卡天数
    finished: 0, //今日已完成
    times: 0, //打卡总次数
    plans: 0, //计划完成总数
    application: false, //是否需要补卡
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getInfo();
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

  gotoList() {
    wx.navigateTo({
      url: "/pages/list/list",
    });
  },

  gotoClock() {
    wx.navigateTo({
      url: "/pages/clock/clock",
    });
  },

  gotoBuka() {
    if (this.data.application == false) {
      wx.showToast({
        title: "您无需补卡",
        icon: "error",
        duration: 2000,
      });
    } else {
      wx.navigateTo({
        url: "/pages/buka/buka",
      });
    }
  },

  getInfo() {
    const app = getApp();
    var header = {
      "content-type": "application/json",
      Authorization: wx.getStorageSync("token"),
    };
    wx.request({
      url: "https://philil.com.cn/clockin_app/api//user/getMainData",
      method: "get",
      header: header,
      success: (res) => {
        console.log(res.statusCode);
        console.log(res);
        if (res.statusCode == 401) {
          login();
        }
        this.setData({
          days: res.data.data.days, //连续打卡天数
          finished: res.data.data.todayFinished, //今日已完成
          times: res.data.data.times, //打卡总次数
          plans: res.data.data.totalFinished, //计划完成总数
          application: res.data.data.isNoClock, //是否需要补卡
        });
        app.dakaData = {
          days: res.data.data.days,
          finished: res.data.data.todayFinished,
          times: res.data.data.times,
        };
      },
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
