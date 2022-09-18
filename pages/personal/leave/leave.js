// pages/personal/leave/leave.js
import { reqLeave, reqLeaveList } from "../../../api/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    linePos: -10,
    tabs: 0, //0是请假填写,1是请假列表,
    dayList: [1, 2, 3, 4, 5], //请假天数,
    day: 1,
    reasonList: ["事假", "病假"], //请假理由
    reason: "",
    leaveList: [],
  },
  isDone: false,
  pageInfo: {
    current: 1,
    size: 10,
  },
  lineIndex: 0,
  //切换tabs
  chaNav(event) {
    let { index } = event.target.dataset;
    if (index == this.lineIndex) return;
    let n = index - this.lineIndex;
    this.setData({ linePos: this.data.linePos + n * 340, tabs: index * 1 });
    this.lineIndex = index;
  },
  //前往详情
  goToDetail(e) {
    let { time, excuse, status, timel } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/personal/leave/leaveDetail/leaveDetail?timel=${timel}&time=${time}&excuse=${excuse}&status=${status}`,
    });
  },
  //选择请假天数
  selDay(event) {
    this.setData({ day: this.data.dayList[event.detail.value] });
  },
  //选择理由
  selReason(event) {
    this.setData({ reason: this.data.reasonList[event.detail.value] });
  },
  //提交请假
  sub() {
    if (!this.data.reason) {
      wx.showToast({
        icon: "error",
        title: "请选择请假原因",
      });
      return;
    }
    reqLeave({
      number: this.data.day,
      excuse: this.data.reason,
    }).then(({ success }) => {
      if (success) {
        wx.showToast({
          title: "申请成功",
        });
        let n = 1 - this.lineIndex;
        this.setData({ linePos: this.data.linePos + n * 340, tabs: 1 });
        this.lineIndex = 1;
        this.renewList(1);
      }
    });
  },
  //更新请假列表
  async renewList(page) {
    if (page) {
      this.pageInfo.current = page;
      this.isDone = false;
    } else this.pageInfo.current++;
    if (this.isDone) return;
    wx.showLoading({
      title: "加载中",
    });
    let { success, data } = await reqLeaveList({
      page: this.pageInfo.current,
      size: this.pageInfo.size,
    });
    wx.hideLoading();
    if (success) {
      if (this.pageInfo.current == 1) {
        this.setData({ leaveList: data.content });
      } else {
        this.setData({ leaveList: this.data.leaveList.concat(data.content) });
      }
    } else {
      if (this.pageInfo.current != 1) {
        wx.showToast({
          icon: "none",
          title: "没有更多了",
        });
      }
      this.isDone = true;
    }
<<<<<<< HEAD
=======
    console.log(this.data.leaveList.length);
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.renewList(1);
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
    this.renewList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
