// pages/report/report.js
import checkLogin from "../../utils/checkLogin";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    week: 0, //周次
    completedPlan: [], //完成的计划
    preWeeklyReportContent: "", //请求获取的周记内容
    token: "", //token
    clockCount: 0, //打卡次数
    studyDuration: 0, //学习时长
    finishedTaskCount: 0,
  },

  isLoading: false,//是否在加载


  //前往周记页面
  gotoWeeklyReport() {
    if (this.data.isLoading) {
      return
    }

    wx.navigateTo({
      url: `/pages/weeklyReportSubmit/weeklyReportSubmit?week=${this.data.week}&token=${this.data.token}`,
    });

  },

  //往期周波
  GotoOtherReport() {
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
  onLoad: function (options) {

    // const reg = new RegExp("\d+[.]\d", "g") 
    // const res = str.match(reg)
    // console.log(res);

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
            if (res.statusCode == 401) {
              checkLogin();
              return;
            }
            this.setData({
              week: res.data.data,
            });
            // 请求内容
            wx.request({
              url: 'https://philil.com.cn/clockin_app/api//weekReport/getWeekInfo',
              method: "GET",
              header: {
                Authorization: this.data.token,
              },
              data: {
               week: this.data.week
              },
              success: (res) => {

                if (res.statusCode == 401) {
                  checkLogin();
                  return;    
                }

                if (res.data.code == 200) {
                  const {clockNum, studyDuration, finishedTaskNum, finishedTask, weekReport} = res.data.data;
                  this.setData({
                    completedPlan: finishedTask,
                    preWeeklyReportContent: weekReport,
                    clockCount: clockNum, //打卡次数
                    studyDuration, //学习时长
                    finishedTaskCount: finishedTaskNum,                            
                  });

                }
              },
              complete: () => {    
                //关闭loading
                wx.hideLoading({})
                this.isLoading = false
              }
            })
          },

          fail: (res) => {
            console.log(res);
          }
        });
      },
    });
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
  onPullDownRefresh() {
    this.isLoading = true
    // 请求内容
    wx.request({
      url: 'https://philil.com.cn/clockin_app/api//weekReport/getWeekInfo',
      method: "GET",
      header: {
        Authorization: this.data.token,
      },
      data: {
        week: this.data.week
      },
      success: (res) => {
        if (res.statusCode == 401) {
          checkLogin();
          return;    
        }

        if (res.data.code == 200) {
          const {clockNum, studyDuration, finishedTaskNum, finishedTask, weekReport} = res.data.data;
          this.setData({
            completedPlan: finishedTask,
            preWeeklyReportContent: weekReport,
            clockCount: clockNum, //打卡次数
            studyDuration, //学习时长
            finishedTaskCount: finishedTaskNum,                            
          });

        }
      },
      complete: () => {
        wx.stopPullDownRefresh();
        this.isLoading = false
      }
    })


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
