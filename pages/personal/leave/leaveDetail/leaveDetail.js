// pages/personal/leave/leaveDetail/leaveDetail.js
import { reqELeave } from "../../../../api/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    time: "",
    excuse: "",
    status: "",
    timel: "",
    id: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ type, time, excuse, status, timel, id }) {
    this.setData({ type, time, excuse, status, timel, id });
  },
  pass() {
    reqELeave({
      id: this.data.id,
      status: 1,
    }).then(({ success }) => {
      if (success) {
        wx.navigateBack();
        const app = getApp();
        app.renewLeave(1);
        wx.showToast({
          title: "审批成功",
        });
      }
    });
  },
  back() {
    reqELeave({
      id: this.data.id,
      status: 2,
    }).then(({ success }) => {
      if (success) {
        wx.navigateBack();
        const app = getApp();
        app.renewLeave(1);
        wx.showToast({
          title: "审批成功",
        });
      }
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
