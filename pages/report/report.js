// pages/report/report.js
import checkLogin from "../../utils/checkLogin";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    week: 0, //周次
    completedPlan: [], //完成的计划
    currentIndex: 0, //目前轮播图的页面
    isUpload: false, //是否在上传周记
    weeklyReportContent: "", //要上传的周记内容
    preWeeklyReportContent: "", //请求获取的周记内容
    token: "", //token
    clockCount: 0, //打卡次数
    unClockCount: 0, //缺卡次数
    studyDuration: 0, //学习时长
    timePercent: 0, //时长比上周增长的百分比
    taskTotalCount: 0,
    finishedTaskCount: 0,
    finishedPercent: 0,
    increasingPercent: 0,
    errorMessage: "", //计划完成情况页面的错误信息
  },

  // 监听周记输入
  inputReport(e) {
    this.setData({
      weeklyReportContent: e.detail.value,
    });
  },

  // 上传周记
  submit() {
    //判断上传内容是否为空
    if (this.data.weeklyReportContent && !this.data.isUpload) {
      this.setData({
        isUpload: true,
      });
      // 上传
      wx.request({
        url: "https://philil.com.cn/clockin_app/api/weekReport",
        method: "POST",
        header: {
          Authorization: this.data.token,
        },
        data: {
          content: this.data.weeklyReportContent,
        },
        success: (res) => {
          //成功
          //判断token有没有过期
          if (res.data.code == 401) {
            checkLogin();
            return;
          }
          if (res.statusCode == 200) {
            this.setData({
              isUpload: false,
            });
            wx.navigateTo({
              url: `/pages/reportSuccess/reportSuccess?num=${res.data.data}`,
            });
          } else {
            this.setData({
              isUpload: false,
            });
          }
        },
        complete: () => {
          this.setData({
            isUpload: false,
          });
        },
      });
    }
  },
  //监听轮播图切换
  swiperChange(e) {
    this.setData({
      currentIndex: e.detail.current,
    });
  },
  //往期周波
  GotoOtherReport() {
    wx.navigateTo({
      url: `/pages/preReportList/preReportList`,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取当前日期
    let date = new Date();
    let year = date.getFullYear();
    let month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let time = `${year}-${month}-${day}`;
    //拿token
    wx.getStorage({
      key: "token",
      success: (res) => {
        this.setData({
          token: res.data,
        });
        // 拿周次
        wx.request({
          url: "https://philil.com.cn/clockin_app/api//weekReport/getWeek",
          method: "GET",
          header: {
            Authorization: this.data.token,
          },
          data: {
            date: time,
          },
          success: (res) => {
            //判断token有没有过期
            if (res.data.code == 401) {
              checkLogin();
              return;
            }
            this.setData({
              week: res.data.data,
            });
            // 请求内容
            //请求打卡内容
            wx.request({
              url: "https://philil.com.cn/clockin_app/api/clockin/getInfo",
              method: "GET",
              header: {
                Authorization: this.data.token,
              },
              data: {
                week: this.data.week,
              },
              success: (res) => {
                //判断token有没有过期
                if (res.data.code == 401) {
                  checkLogin();
                  return;
                }

                this.setData({
                  clockCount: res.data.data.clockCount,
                  studyDuration: res.data.data.studyDuration,
                  timePercent: res.data.data.timePercent,
                  unClockCount: res.data.data.unClockCount,
                });
              },
            });
            // 请求完成任务列表
            wx.request({
              url: "https://philil.com.cn/clockin_app/api/task/finishedTaskList",
              method: "GET",
              header: {
                Authorization: this.data.token,
              },
              data: {
                week: this.data.week,
              },
              success: (res) => {
                //判断token有没有过期
                if (res.data.code == 401) {
                  checkLogin();
                  return;
                }

                if (res.data.data) {
                  this.setData({
                    completedPlan: res.data.data,
                  });
                }
              },
            });
            //请求完成计划的情况
            wx.request({
              url: "https://philil.com.cn/clockin_app/api/task/weekTaskInfo",
              method: "GET",
              header: {
                Authorization: this.data.token,
              },
              data: {
                week: this.data.week,
              },
              success: (res) => {
                //判断token有没有过期
                if (res.data.code == 401) {
                  checkLogin();
                  return;
                }

                if (res.data.data) {
                  this.setData({
                    taskTotalCount: res.data.data.taskTotalCount,
                    finishedTaskCount: res.data.data.finishedTaskCount,
                    finishedPercent: res.data.data.finishedPercent,
                    increasingPercent: res.data.data.increasingPercent,
                  });
                } else {
                  this.setData({
                    errorMessage: res.data.message,
                  });
                }
              },
            });
            // 请求周记
            wx.request({
              url: `https://philil.com.cn/clockin_app/api/weekReport/${this.data.week}`,
              method: "GET",
              header: {
                Authorization: this.data.token,
              },
              success: (res) => {
                //判断token有没有过期
                if (res.data.code == 401) {
                  checkLogin();
                  return;
                }

                if (res.statusCode == 200) {
                  this.setData({
                    preWeeklyReportContent: res.data.data,
                  });
                }
              },
            });
          },
        });
      },
    });
    /* 检查是否携带token */
    // await checkLogin()
    this.setData({
      currentIndex: 0,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 请求内容
    //请求打卡内容
    let clock = () => {
      wx.request({
        url: "https://philil.com.cn/clockin_app/api/clockin/getInfo",
        method: "GET",
        header: {
          Authorization: this.data.token,
        },
        data: {
          week: this.data.week,
        },
        success: (res) => {
          //判断token有没有过期
          if (res.data.code == 401) {
            checkLogin();
            return;
          }

          this.setData({
            clockCount: res.data.data.clockCount,
            studyDuration: res.data.data.studyDuration,
            timePercent: res.data.data.timePercent,
            unClockCount: res.data.data.unClockCount,
          });
          iterator.next();
        },
      });
    };
    // 请求完成任务列表
    let completedPlan = () => {
      wx.request({
        url: "https://philil.com.cn/clockin_app/api/task/finishedTaskList",
        method: "GET",
        header: {
          Authorization: this.data.token,
        },
        data: {
          week: this.data.week,
        },
        success: (res) => {
          //判断token有没有过期
          if (res.data.code == 401) {
            checkLogin();
            return;
          }

          if (res.data.data) {
            this.setData({
              completedPlan: res.data.data,
            });
          }
          iterator.next();
        },
      });
    };
    //请求完成计划的情况
    let plan = () => {
      wx.request({
        url: "https://philil.com.cn/clockin_app/api/task/weekTaskInfo",
        method: "GET",
        header: {
          Authorization: this.data.token,
        },
        data: {
          week: this.data.week,
        },
        success: (res) => {
          //判断token有没有过期
          if (res.data.code == 401) {
            checkLogin();
            return;
          }

          if (res.data.data) {
            this.setData({
              taskTotalCount: res.data.data.taskTotalCount,
              finishedTaskCount: res.data.data.finishedTaskCount,
              finishedPercent: res.data.data.finishedPercent,
              increasingPercent: res.data.data.increasingPercent,
            });
          } else {
            this.setData({
              errorMessage: res.data.message,
            });
          }
          iterator.next();
        },
      });
    };
    // 请求周记
    let weeklyReport = () => {
      wx.request({
        url: `https://philil.com.cn/clockin_app/api/weekReport/${this.data.week}`,
        method: "GET",
        header: {
          Authorization: this.data.token,
        },
        // data: {
        //   week: this.data.week
        // },
        success: (res) => {
          //判断token有没有过期
          if (res.data.code == 401) {
            checkLogin();
            return;
          }

          if (res.statusCode == 200) {
            this.setData({
              preWeeklyReportContent: res.data.data,
            });
          }
          iterator.next();
        },
      });
    };

    // 异步按顺序
    function* gen() {
      yield clock();
      yield completedPlan();
      yield plan();
      yield weeklyReport();
      yield wx.stopPullDownRefresh();
    }

    let iterator = gen();
    iterator.next();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
