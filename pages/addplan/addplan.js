// pages/addplan/addplan.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    taskName: "",
    content: "",
    endTime: "",
<<<<<<< HEAD
    endTimeSend: "",
=======
    startTime: "",
    endTimeSend: "",
    startTimeSend: "",
    today: ''
  },
  // 得到今天
  getToday() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    var day = d.getDate();
    day = day < 10 ? '0' + day : day;
    var today=year + '-' + month + '-' + day;
    this.setData({
      today:today
    })
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
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
<<<<<<< HEAD
    console.log("picker发送选择改变，携带值为", event.detail.value);
    var endTime1 = event.detail.value.replace("-", "年");
    var endTime = endTime1.replace("-", "月") + "日";
    console.log(endTime);
    this.setData({
      endTime: endTime,
      endTimeSend: this.getNextDay(event.detail.value),
=======
    var endTime1 = event.detail.value.replace("-", "年");
    var endTime = endTime1.replace("-", "月") + "日";
    this.setData({
      endTime: endTime,
      endTimeSend: event.detail.value,
    });
  },
  bindDateChange2: function (event) {
    var startTime1 = event.detail.value.replace("-", "年");
    var startTime = startTime1.replace("-", "月") + "日";
    this.setData({
      startTime: startTime,
      startTimeSend: event.detail.value,
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
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
<<<<<<< HEAD
  },
  postPlan() {
    var that = this;
    // console.log(that.data.endTimeSend);
=======
  }, 
  postPlan() {
    var that=this;
    if(that.data.startTimeSend==''||that.data.endTimeSend=='') {
      wx.showToast({
        title: '时间不得为空',
        icon: 'none',
        duration: 1000
      })
      return;
    }
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
    wx.request({
      url: "https://philil.com.cn/clockin_app/api//task",
      method: "POST",
      data: {
        taskName: that.data.taskName,
        content: that.data.content,
<<<<<<< HEAD
        endTime: that.data.endTimeSend,
=======
        beginTime: that.data.startTimeSend+' 00:00',
        endTime: that.data.endTimeSend+' 23:59'
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
      },
      header: {
        "content-type": "application/json",
        Authorization: wx.getStorageSync("token"),
      },
      success(res) {
<<<<<<< HEAD
        if (!res.data.data) return;
        wx.navigateTo({
          url: "../../pages/addNum/addNum?num=" + res.data.data,
        });
      },
=======
        console.log(res);
         //判断token有没有过期
         if (res.data.code == 401) {
          checkLogin();
          return;
        }
        if(res.data.message=='结束时间不得早于开始时间') {
          wx.showToast({
            title: '结束不得早于开始',
            icon: 'none',
            duration: 1000
          })
        }
        if (res.statusCode == 200) {
          if(res.data.message=='任务名称不得为空'||res.data.message=='任务内容不得为空'||res.data.message=='结束时间不得为空') {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 1000
            })
          }
          if (!res.data.data) return;
          wx.navigateTo({
            url: "../../pages/addNum/addNum?num=" + res.data.data,
          });
        }
      }
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
<<<<<<< HEAD
  onLoad(options) {},
=======
  onLoad(options) {
    this.getToday()
  },
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e

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
