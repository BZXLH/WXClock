// pages/preReport/preReport.js
import checkLogin from "../../utils/checkLogin";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    token: "",
    completedPlan: [], //完成的任务
    currentIndex: 0, //轮播图目前的页面
    weeklyReportContent: "", //周记的内容
    query: {}, //传递过来的参数
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

  // 监听轮播图切换
  swiperChange(e) {
    this.setData({
      currentIndex: e.detail.current,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 重置
    this.setData({
      currentIndex: 0,
    });
    // 接收导航传参
    this.setData({
      query: options,
    });
    //拿token
    wx.getStorage({
      key: "token",
      success: (res) => {
        this.setData({
          token: res.data,
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
            week: this.data.query.week,
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
            week: this.data.query.week,
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
            week: this.data.query.week,
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
          url: `https://philil.com.cn/clockin_app/api/weekReport/${this.data.query.week}`,
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
                weeklyReportContent: res.data.data,
              });
            }
          },
        });
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // 动态修改标题
    wx.setNavigationBarTitle({
      title: `第${this.data.query.week}周周报`,
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
  onPullDownRefresh() {
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
          week: this.data.query.week,
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
          week: this.data.query.week,
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
          week: this.data.query.week,
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
        url: `https://philil.com.cn/clockin_app/api/weekReport/${this.data.query.week}`,
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
              weeklyReportContent: res.data.data,
            });
          }
          iterator.next();
        },
      });
    };

    // 异步单线程执行
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
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
