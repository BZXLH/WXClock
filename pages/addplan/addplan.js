import checkLogin from "../../utils/checkLogin";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    taskName: "",
    content: "",
    endTime: "",
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
    var that=this;
    if(that.data.startTimeSend==''||that.data.endTimeSend=='') {
      wx.showToast({
        title: '时间不得为空',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    wx.request({
      url: "https://philil.com.cn/clockin_app/api//task",
      method: "POST",
      data: {
        taskName: that.data.taskName,
        content: that.data.content,
        beginTime: that.data.startTimeSend+' 00:00',
        endTime: that.data.endTimeSend+' 23:59'
      },
      header: {
        "content-type": "application/json",
        Authorization: wx.getStorageSync("token"),
      },
      success(res) {
        console.log(res);
         //判断token有没有过期
         if (res.statusCode == 401) {
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
        if (res.data.code == 200) {
          if(res.data.message=='任务名称不得为空'||res.data.message=='任务内容不得为空'||res.data.message=='结束时间不得为空') {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 1000
            })
          }
          if (!res.data.data) return;
          wx.navigateTo({
            url: "../../pages/addNum/addNum?num=" + res.data.data+ '&taskName='+that.data.taskName,
          });
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getToday()
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
