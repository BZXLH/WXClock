// pages/personal/respond/respond.js
import { reqRespond, reqRespondList } from "../../../api/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    roleId: "",
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
  },
  writeT(event) {
    this.setData({ theme: event.detail.value });
  },
  writeC(event) {
    this.setData({ content: event.detail.value });
  },
  //上传意见
  sub() {
    reqRespond({
      content: this.data.content,
      theme: this.data.theme,
    }).then(({ success }) => {
      if (success) {
        this.getList(1);
        this.setData({ content: "", theme: "" });
        wx.showToast({
          title: "发表成功",
        });
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
  onLoad({ roleId }) {
    this.setData({ roleId });
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
    this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
