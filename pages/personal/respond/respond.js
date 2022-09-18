// pages/personal/respond/respond.js
import { reqRespond, reqRespondList } from "../../../api/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
=======
    roleId: "",
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
    linePos: -10,
    tabs: 0, //0是请假填写,1是请假列表
    wid: 132,
    theme: "",
    content: "",
    respondList: [],
  },
  pageInfo: {
    current: 1,
    size: 10,
  },
  isDone: false,
  lineIndex: 0,
  //切换tabs
  chaNav(event) {
    let { index, textlen } = event.target.dataset;
    if (index == this.lineIndex) return;
    let n = index - this.lineIndex;
    this.setData({
      linePos: this.data.linePos + n * 340,
      tabs: index * 1,
      wid: textlen * 44,
    });
    this.lineIndex = index;
<<<<<<< HEAD
=======
    if (this.lineIndex) this.getList(1);
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
  },
  writeT(event) {
    this.setData({ theme: event.detail.value });
  },
  writeC(event) {
<<<<<<< HEAD
    console.log(event.detail.value);
=======
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
    this.setData({ content: event.detail.value });
  },
  //上传意见
  sub() {
<<<<<<< HEAD
    console.log(this.data.content);
=======
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
    reqRespond({
      content: this.data.content,
      theme: this.data.theme,
    }).then(({ success }) => {
      if (success) {
<<<<<<< HEAD
        wx.showToast({
          title: "发表成功",
        });
        this.getList(1);
        this.setData({ content: "", theme: "" });
=======
        this.setData({ content: "", theme: "" });
        wx.showToast({
          title: "发表成功",
        });
      } else {
        wx.showToast({
          icon: "error",
          title: "发表失败，请重试",
        });
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
      }
    });
  },
  //获取意见列表
  async getList(page) {
    if (page) {
      this.pageInfo.current = page;
      this.isDone = false;
    } else this.pageInfo.current++;
    if (this.isDone) return;
    wx.showLoading({
      title: "加载中",
    });
    let { success, data } = await reqRespondList({
      page: this.pageInfo.current,
      size: this.pageInfo.size,
    });
    wx.hideLoading();
    if (success) {
      if (this.pageInfo.current == 1) {
        this.setData({ respondList: data.content });
      } else {
        this.setData({
          respondList: this.data.respondList.concat(data.content),
        });
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
    wx.stopPullDownRefresh();
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
  },
  //前往详情
  goToResopnseDetail(e) {
    let { theme, content } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/personal/respond/respondDetail/respondDetail?theme=${theme}&content=${content}`,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
<<<<<<< HEAD
  onLoad(options) {
    this.getList(1);
=======
  onLoad({ roleId }) {
    this.setData({ roleId });
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
<<<<<<< HEAD
  onShow() {},
=======
  onShow() {
    this.getList(1);
  },
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e

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
<<<<<<< HEAD
  onPullDownRefresh() {},
=======
  onPullDownRefresh() {
    this.getList();
  },
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
