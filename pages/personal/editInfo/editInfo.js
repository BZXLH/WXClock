// pages/editInfo/editInfo.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nickname: "",
    username: "",
    studentId: "",
    grade: "",
    avatar: "",
  },

  //修改头像
  changeHeadPhoto({ detail }) {
    const app = getApp();
    app.userInfo.avatar = detail.avatarUrl;
    this.setData({ avatar: detail.avatarUrl });
    wx.uploadFile({
      filePath: detail.avatarUrl,
      header: {
        Authorization: wx.getStorageSync("token"),
      },
      name: "avatarImg",
      url: "http://119.29.79.55:8080/user/reSetAvater",
      success() {
        wx.showToast({
          title: "修改成功",
        });
      },
    });
  },

  //跳转到编辑详情
  goToEditDetail(event) {
    let { title, prop } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/personal/editDetail/editDetail?title=${title}&propK=${prop}&propV=${this.data[prop]}`,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const app = getApp();
    this.setData({
      studentId: app.userInfo.studentId,
      avatar: app.userInfo.avatar,
      nickname: app.userInfo.nickname,
      username: app.userInfo.username,
      grade: app.userInfo.grade,
    });
  },

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
