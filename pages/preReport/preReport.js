// pages/preReport/preReport.js
import request from "../../api/request";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    completedPlan: [], //完成的任务
    weeklyReportContent: "", //周记的内容
    clockCount: 0, //打卡次数
    studyDuration: 0, //学习时长
    finishedTaskCount: 0,
  },

  query: {}, //传递过来的参数
  isLoading: false,//是否在加载

  // 返回
  goBack() {
    if (this.isLoading) {
      return
    }

    wx.navigateBack({
      delta: 1,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    //loading
    this.isLoading = true
    wx.showLoading({
      title: '加载中...',
    })
    
    // 接收导航传参
    this.query = options

    //获取周次
    const {week} = this.query

    //请求内容
    try {
      const preReportData = await request({
        url: "/weekReport/getWeekInfo",
        method: "GET",
        data: {
          week
        }
      })

      console.log(preReportData);

      if (preReportData.code == 200) {
        const {clockNum, studyDuration, finishedTaskNum, finishedTask, weekReport} = preReportData.data;
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
  onReady() {
    
    const {week} = this.query
    // 动态修改标题
    wx.setNavigationBarTitle({
      title: `第${week ? week : 0}周周报`,
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
  async onPullDownRefresh() {
    this.isLoading = true
    const {week} = this.query
    //请求内容
    try {
      const preReportData = await request({
        url: "/weekReport/getWeekInfo",
        method: "GET",
        data: {
          week
        }
      })

      console.log(preReportData);

      if (preReportData.code == 200) {
        const {clockNum, studyDuration, finishedTaskNum, finishedTask, weekReport} = preReportData.data;
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
    
    wx.stopPullDownRefresh();//停止下拉刷新
    this.isLoading = false//关闭阀门

    
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
