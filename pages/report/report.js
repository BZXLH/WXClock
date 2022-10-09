// pages/report/report.js
import request from "../../api/request";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    completedPlan: [], //完成的计划
    preWeeklyReportContent: "", //请求获取的周记内容
    clockCount: 0, //打卡次数
    studyDuration: 0, //学习时长
    finishedTaskCount: 0,
  },

  week: 0, //周次
  isLoading: false,//是否在加载


  //前往周记页面
  gotoWeeklyReport() {
    if (this.data.isLoading) {
      return
    }

  wx.navigateTo({
    url: `/pages/weeklyReportSubmit/weeklyReportSubmit?week=${this.week}`,
  });

  console.log(1);
  },

  //往期周波
  gotoOtherReport() {
    if (this.isLoading) {
      return
    }

    wx.navigateTo({
      url: `/pages/preReportList/preReportList`,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {

    //loading
    this.isLoading = true
    wx.showLoading({
      title: '加载中...',
    })

    // 获取当前日期
    const date = new Date();
    const year = date.getFullYear();
    const month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const time = `${year}-${month}-${day}`;

    //请求内容
    try {
      const weekData = await request({
        url: "/weekReport/getWeek",
        method: "GET",
        data: {
          date: time,
        }
      });
  
      this.week = weekData.data
      const {week} = this

      const reportData = await request({
        url: "/weekReport/getWeekInfo",
        method: "GET",
        data: {
          week
        }
      })
  
      if (reportData.code == 200) {
        const {clockNum, studyDuration, finishedTaskNum, finishedTask, weekReport} = reportData.data;
        this.setData({
          completedPlan: finishedTask,
          preWeeklyReportContent: weekReport,
          clockCount: clockNum, //打卡次数
          studyDuration, //学习时长
          finishedTaskCount: finishedTaskNum,                            
        });
      }
  
    } catch (error) {
      console.log(error);
    }

    //关闭loading
    wx.hideLoading({})
    this.isLoading = false
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

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
  async onPullDownRefresh() {
    this.isLoading = true;
    
    //获取周次
    const {week} = this

    //请求内容
    try {
      const reportData = await request({
        url: "/weekReport/getWeekInfo",
        method: "GET",
        data: {
          week
        }
      })
  

      if (reportData.code == 200) {
        const {clockNum, studyDuration, finishedTaskNum, finishedTask, weekReport} = reportData.data;
        this.setData({
          completedPlan: finishedTask,
          preWeeklyReportContent: weekReport,
          clockCount: clockNum, //打卡次数
          studyDuration, //学习时长
          finishedTaskCount: finishedTaskNum,                            
        });
      }

    } catch (error) {
      console.log(error);
    }


    wx.stopPullDownRefresh();//关闭下拉刷新
    this.isLoading = false//关闭阀门

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
