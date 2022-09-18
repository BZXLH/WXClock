// pages/daka/daka.js
import login from "../../utils/checkLogin";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: "上班",
    days: false, //连续打卡天数(状态)
    daysData: 0, //连续打卡天数
    times: false, //打卡总次数(状态)
    timesData: 0, //打卡总次数
    plans: false, //计划完成总数（状态）
    plansData: 0, //计划完成总数
    application: false, //是否需要补卡
    animation1: {}, //微悬浮动画
    animation2: {}, //微悬浮动画
    /* 启动页动画数据 */
    height: 0,
    bg: {},
    star: {},
    xiu: {},
    ball1: {},
    ball2: {},
    ball3: {},
    /* 启动页动画数据 */
    /* 首页和启动页的透明度动画 */
    startOpacity: {},
    hpgOpacity: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    /* 首页内容 */
    this.getInfo();
    var animation = wx.createAnimation({
      delay: 0,
      duration: 1000,
      timingFunction: "linear",
    });
    var show1 = true;
    var show2 = true;
    setInterval(() => {
      if (show1) {
        animation.scale(1.04).rotate(1).step().rotate(-1);
        show1 = !show1;
      } else {
        animation.scale(1).rotate(-0.5).step();
        show1 = !show1;
      }
      this.setData({
        animation1: animation.export(),
      });
    }, 1000);
    setInterval(() => {
      if (show2) {
        animation.scale(0.95).rotate(1).step().rotate(-1);
        show2 = !show2;
      } else {
        animation.scale(1).rotate(-0.5).step();
        show2 = !show2;
      }
      this.setData({
        animation2: animation.export(),
      });
    }, 1000);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    /* 启动页动画 */
    //获取屏幕高度
    var h = 770;
    wx.getSystemInfo({
      success: (result) => {
        h = result.screenHeight;
      },
    });
    this.setData({
      height: h,
    });
    //背景动画
    var animation1 = wx.createAnimation({
      delay: 0,
      duration: 3000,
      timingFunction: "linear",
    });
    animation1.scale(1).step();
    this.setData({
      bg: animation1.export(),
    });
    //星星背景动画
    var animation2 = wx.createAnimation({
      delay: 1800,
      duration: 400,
      timingFunction: "linear",
    });
    animation2.opacity(1).step();
    this.setData({
      star: animation2.export(),
    });
    //火箭动画
    var animation3 = wx.createAnimation({
      delay: 0,
      duration: 3000,
      timingFunction: "linear",
    });
    animation3
      .scale(0.75)
      .translateY(-(this.data.height / 2))
      .step()
      .translateY(-this.data.height * 2)
      .step();
    this.setData({
      xiu: animation3.export(),
    });
    //球缩小动画
    var animation4 = wx.createAnimation({
      delay: 0,
      duration: 3000,
      timingFunction: "linear",
    });
    animation4.scale(0).step();
    this.setData({
      ball1: animation4.export(),
    });
    //地球动画
    var animation5 = wx.createAnimation({
      delay: 0,
      duration: 5000,
      timingFunction: "linear",
    });
    animation5.translate(-250, 250).step();
    this.setData({
      ball2: animation5.export(),
    });
    //绕圆动画
    var animation6 = wx.createAnimation({
      delay: 0,
      duration: 4000,
      timingFunction: "linear",
      transformOrigin: "-90px 90px",
    });
    var i = 0;
    animation6.rotate(-180).step();
    this.setData({
      ball3: animation6.export(),
    });
    /* 启动页动画 */
    /* 启动页转换到首页 */
    var animation7 = wx.createAnimation({
      delay: 5000,
      duration: 300,
      timingFunction: "linear",
    });
    animation7.opacity(0).step();
    this.setData({
      startOpacity: animation7.export(),
    });
    var animation8 = wx.createAnimation({
      delay: 5000,
      duration: 300,
      timingFunction: "linear",
    });
    animation8.opacity(1).step();
    this.setData({
      hpgOpacity: animation8.export(),
    });
  },

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

  gotoList() {
    wx.navigateTo({
      url: "/pages/list/list",
    });
  },

  gotoClock() {
    wx.navigateTo({
      url: "/pages/clock/clock",
    });
  },

  gotoPlan() {
    wx.switchTab({
      url: "/pages/plan/plan",
    });
  },

  gotoBuka() {
    if (this.data.application == false) {
      wx.showToast({
        title: "您无需补卡",
        icon: "error",
        duration: 2000,
      });
    } else {
      wx.navigateTo({
        url: "/pages/buka/buka",
      });
    }
  },

  getInfo() {
    const app = getApp();
    var header = {
      "content-type": "application/json",
      Authorization: wx.getStorageSync("token"),
    };
    wx.request({
      url: "https://philil.com.cn/clockin_app/api//user/getMainData",
      method: "get",
      header: header,
      success: (res) => {
        console.log(header);
        console.log(res.statusCode);
        console.log(res);
        if (res.statusCode == 401) {
          login();
        }
        this.setData({
          type: res.data.data.clockType.type,
          daysData: res.data.data.days, //连续打卡天数
          timesData: res.data.data.times, //打卡总次数
          plansData: res.data.data.totalFinished, //计划完成总数
          application: res.data.data.isNoClock, //是否需要补卡
        });
        app.dakaData = {
          days: res.data.data.days,
          finished: res.data.data.todayFinished,
          times: res.data.data.times,
        };
      },
    });
  },

  showDays() {
    this.setData({
      days: !this.data.days,
    });
  },

  showPlans() {
    this.setData({
      plans: !this.data.plans,
    });
  },

  showTimes() {
    this.setData({
      times: !this.data.times,
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
