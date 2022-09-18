// pages/personal/examin/examin.js
import { reqExamineList, reqExamineLeave } from "../../../api/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    linePos: -10,
    tabs: 0, //0是补卡审批,1是请假审批
    cardList: [], //补卡列表
    leaveList: [],
  },
  pageInfo1: {
    current: 1,
    size: 10,
  },
  pageInfo2: {
    current: 1,
    size: 10,
  },
  isDone1: false,
  isDone2: false,
  lineIndex: 0,
  //切换tabs
  chaNav(event) {
    let { index } = event.target.dataset;
    if (index == this.lineIndex) return;
    let n = index - this.lineIndex;
    this.setData({ linePos: this.data.linePos + n * 340, tabs: index * 1 });
    this.lineIndex = index;
  },
  //前往审批
  goToExaminLeave(e) {
    let { begintime, endtime, excuse, status, id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/personal/leave/leaveDetail/leaveDetail?type=1&timel=${begintime}&time=${endtime}&excuse=${excuse}&status=${status}&id=${id}`,
    });
  },
  //前往补卡审批
  goToExaminCard(event) {
<<<<<<< HEAD
    let { reissueTime, reason, id, status } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/personal/examin/examinCard/examinCard?reissueTime=${reissueTime}&reason=${reason}&id=${id}&status=${status}`,
=======
    let { time, reason, id, status,userid } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/personal/examin/examinCard/examinCard?userId=${userid}&reissueTime=${time}&reason=${reason}&id=${id}&status=${status}`,
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
    });
  },
  async getCardList(page) {
    if (page) {
      this.pageInfo1.current = page;
      this.isDone1 = false;
    } else this.pageInfo1.current++;
    if (this.isDone1) return;
    wx.showLoading({
      title: "加载中",
    });
    let { success, data } = await reqExamineList({
      page: this.pageInfo1.current,
      size: this.pageInfo1.size,
    });
    wx.hideLoading();
    if (success) {
      if (this.pageInfo1.current == 1) {
        this.setData({ cardList: data.content });
      } else {
        this.setData({ cardList: this.data.cardList.concat(data.content) });
      }
    } else {
      if (this.pageInfo1.current != 1) {
        wx.showToast({
          icon: "none",
          title: "没有更多了",
        });
      }
      this.isDone1 = true;
    }
  },
  async getLeaveList(page) {
    if (page) {
      this.pageInfo2.current = page;
      this.isDone2 = false;
    } else this.pageInfo2.current++;
    if (this.isDone2) return;
    wx.showLoading({
      title: "加载中",
    });
    let { success, data } = await reqExamineLeave({
      page: this.pageInfo2.current,
      size: this.pageInfo2.size,
    });
    wx.hideLoading();
    if (success) {
      if (this.pageInfo2.current == 1) {
        this.setData({ leaveList: data.content });
      } else {
        this.setData({ leaveList: this.data.leaveList.concat(data.content) });
      }
    } else {
      if (this.pageInfo2.current != 1) {
        wx.showToast({
          icon: "none",
          title: "没有更多了",
        });
      }
      this.isDone2 = true;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const app = getApp();
    app.renewCard = this.getCardList;
    app.renewLeave = this.getLeaveList;
    this.getCardList(1);
    this.getLeaveList(1);
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
  onReachBottom() {
    if (this.lineIndex == "1") {
      this.getLeaveList();
    } else {
      this.getCardList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
