// pages/weeklyReportSubmit/weeklyReportSubmit.js
import checkLogin from '../../utils/checkLogin'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isUpload: false, //是否在上传周记
    weeklyReportContent: "", //要上传的周记内容
    preWeeklyReportContent: "",//上一次上传成功的周记内容
    query: {}//接收传参
  },
    isLoading: false, //是否在加载

  // 监听周记输入
  inputReport(e) {
    this.setData({
      weeklyReportContent: e.detail.value,
    });
  },

  // 上传周记
  submit(e) {
    console.log(e);
    if (this.isLoading) {
      console.log(1234);
      return
    }

    const {weeklyReportContent, preWeeklyReportContent, isUpload} =  this.data
    this.setData({
      weeklyReportContent: weeklyReportContent.trim()
    })

    //判断上传内容是否为空,是否尚未上传完，是否和上次上传的内容一样
    if (weeklyReportContent && !isUpload && weeklyReportContent != preWeeklyReportContent) {
      this.setData({
        isUpload: true
      });
      // 上传
      wx.request({
        url: 'https://philil.com.cn/clockin_app/api/weekReport',
        method: 'POST',
        header: {
          'Authorization': this.data.query.token
        },
        data: {
          content: this.data.weeklyReportContent
        },
        success: (res) => {
            //成功     
            //判断token有没有过期
            if (res.data.code == 401) {
            checkLogin();
            return
          }
        if (res.statusCode == 200) {
            this.setData({
              isUpload: false,
              preWeeklyReportContent: weeklyReportContent
            })
            wx.navigateTo({
              url: `/pages/reportSuccess/reportSuccess?num=${res.data.data}`,
            })
          } else {
            this.setData({
              isUpload: false
            })
          }
        },
        fail: () => {
          this.setData({
            isUpload: false
          })
        },
        complete: () => {
          this.setData({
            isUpload: false
          })
        }
      })
    }
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //loading
        this.isLoading = true;
        wx.showLoading({
      title: '加载中...',
    })
    

    // 接收导航传参
    this.setData({
      query: options,
    });

    // 请求周记
    wx.request({
      url: `https://philil.com.cn/clockin_app/api/weekReport/${this.data.query.week}`,
      method: 'GET',
      header: {
        'Authorization': this.data.query.token
      },
      success: (res) => {
        //判断token有没有过期
        if (res.statusCode == 401) {
          checkLogin();
          return
        }

        if (res.statusCode == 200) {
          this.setData({
            weeklyReportContent: res.data.data,
            preWeeklyReportContent: res.data.data
          })
        }
      },
      complete: () => {
            this.isLoading = false;
            wx.hideLoading({
          success: () => {
          },
        })    
      }
    })      

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.isLoading = true;

    // 请求周记
    wx.request({
      url: `https://philil.com.cn/clockin_app/api/weekReport/${this.data.query.week}`,
      method: 'GET',
      header: {
        'Authorization': this.data.query.token
      },
      success: (res) => {
        //判断token有没有过期
        if (res.statusCode == 401) {
          checkLogin();
          return
        }

        if (res.statusCode == 200) {
          this.setData({
            weeklyReportContent: res.data.data,
            preWeeklyReportContent: res.data.data
          })
        }
      },
      complete: () => {
        wx.stopPullDownRefresh()
        this.isLoading = true;  
      }
    })      

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})