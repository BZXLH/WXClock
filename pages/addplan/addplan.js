// pages/addplan/addplan.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    taskName: "",
    content: "",
    endTime: "",
    endTimeSend: "",
  },
  getTaskname(event) {
    this.setData({
      taskName: event.detail.value,
    });
  },
  getContent(event) {
    this.setData({
      content: event.detail.value,
    });
  },
  bindDateChange: function (event) {
    console.log("picker发送选择改变，携带值为", event.detail.value);
    var endTime1 = event.detail.value.replace("-", "年");
    var endTime = endTime1.replace("-", "月") + "日";
    console.log(endTime);
    this.setData({
      endTime: endTime,
      endTimeSend: this.getNextDay(event.detail.value),
    });
  },
  // 得到下一天
  getNextDay(d) {
    d = new Date(d);
    d = +d + 1000 * 60 * 60 * 24;
    d = new Date(d);
    //return d;
    //格式化
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  },
  postPlan() {
    var that = this;
    // console.log(that.data.endTimeSend);
    wx.request({
      url: "https://philil.com.cn/clockin_app/api//task",
      method: "POST",
      data: {
        taskName: that.data.taskName,
        content: that.data.content,
        endTime: that.data.endTimeSend,
      },
      header: {
        "content-type": "application/json",
        Authorization: wx.getStorageSync("token"),
      },
      success(res) {
        if (!res.data.data) return;
        wx.navigateTo({
          url: "../../pages/addNum/addNum?num=" + res.data.data,
        });
      },
    });
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
});
