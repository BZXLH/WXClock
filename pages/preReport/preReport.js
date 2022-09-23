// pages/preReport/preReport.js
import checkLogin from "../../utils/checkLogin";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,//是否在加载
    token: "",
    completedPlan: [], //完成的任务
    weeklyReportContent: "", //周记的内容
    query: {}, //传递过来的参数
    clockCount: 0, //打卡次数
    studyDuration: 0, //学习时长
    finishedTaskCount: 0,
  },

  // 返回
  GoBack() {
    if (this.data.isLoading) {
      return
    }

    wx.navigateBack({
      delta: 1,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //loading
    wx.showLoading({
      title: '加载中...',
      success: () => {
        this.setData({
          isLoading: true
        });
      }
    })
    
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
        wx.request({
          url: 'https://philil.com.cn/clockin_app/api//weekReport/getWeekInfo',
          method: "GET",
          header: {
            Authorization: this.data.token,
          },
          data: {
            week: this.data.query.week
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
            wx.hideLoading({
              success: () => {
                this.setData({
                  isLoading: false
                })
               }
            })

            
          }
        })
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    
    const {week} = this.data.query
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
  onPullDownRefresh() {
    this.setData({
      isLoading: true
    })

    // 请求内容
    wx.request({
      url: 'https://philil.com.cn/clockin_app/api//weekReport/getWeekInfo',
      method: "GET",
      header: {
        Authorization: this.data.token,
      },
      data: {
        week: this.data.query.week
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
        this.setData({
          isLoading: false
        })    
      }
    })
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
