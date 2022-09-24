// pages/buka/buka.js
import throttle from "../../utils/tool"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    clockTime: "请选择补卡日期",
    detailTime: "请选择下班时间",
    timeList: [],
    reason: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getList();
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

  getList() {
    var header = {
      "content-type": "application/json",
      Authorization: wx.getStorageSync("token"),
    };
    wx.request({
      url: "https://philil.com.cn/clockin_app/api//clockin/getReissue",
      method: "get",
      header: header,
      success: (res) => {
        this.setData({
          timeList: [...this.data.timeList, ...res.data.data],
        });
      },
    });
  },

  getTime(e) {
    this.setData({
      clockTime: this.data.timeList[e.detail.value].onTime,
    });
  },

  changeTime(e) {
    this.setData({
      detailTime: e.detail.value,
    });
  },

  submitApply:throttle(function(){
    if (this.data.clockTime == "请选择补卡日期") {
      wx.showToast({
        title: "请选择补卡日期",
        icon: "error",
        duration: 2000,
      });
      return;
    }
    if (this.data.detailTime == "请选择下班时间") {
      wx.showToast({
        title: "请选择下班时间",
        icon: "error",
        duration: 2000,
      });
      return;
    }
    if (this.data.reason == ""||(this.data.reason.trim()=="")) {
      wx.showToast({
        title: "原因不能为空",
        icon: "error",
        duration: 2000,
      });
      return;
    } else {
      wx.request({
        url: "https://philil.com.cn/clockin_app/api//clockin/cardReissue",
        method: "post",
        header: {
          "Content-Type": "application/json",
          Authorization: wx.getStorageSync("token"),
        },
        data: {
          reason: this.data.reason,
          reissueTime: this.data.clockTime + " " + this.data.detailTime,
        },
        success: (res) => {
          if (res.statusCode == 200) {
            wx.showToast({
              title: "申请成功",
              icon: "succeed",
              duration: 1000,
              success: function () {
                setTimeout(() => {
                  wx.switchTab({
                    url: "../homepage/homepage",
                  });
                }, 1000);
              },
            });
          } else {
            wx.showToast({
              title: "失败，请重试",
              icon: "error",
              duration: 2000,
            });
          }
        },
        fail: (res) => {
          wx.showToast({
            title: "失败，请重试",
            icon: "error",
            duration: 2000,
          });
        },
      });
    }
  },3000)
});
