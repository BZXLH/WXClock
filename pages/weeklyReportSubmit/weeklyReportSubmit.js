// pages/weeklyReportSubmit/weeklyReportSubmit.js
import request from "../../api/request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    weeklyReportContent: "", //要上传的周记内容
    isUpload: false, //是否在上传周记
  },
  query: {},//接收传参
  isLoading: false, //是否在加载
  preWeeklyReportContent: "",//上一次上传成功的周记内容

  // 监听周记输入
  inputReport(e) {
    this.setData({
      weeklyReportContent: e.detail.value,
    });
  },

  // 上传周记
  async submit(e) {
    console.log(e);
    if (this.isLoading) {
      return
    }

    const { preWeeklyReportContent} =  this
    const {weeklyReportContent, isUpload} = this.data
    this.setData({
      weeklyReportContent: weeklyReportContent.trim()
    })

    //判断上传内容是否为空,是否尚未上传完，是否和上次上传的内容一样
    if (weeklyReportContent && !isUpload && weeklyReportContent != preWeeklyReportContent) {
      this.setData({
        isUpload: true
      })
      // 上传
      try {
        const result = await request({
          url: '/weekReport',
          method: 'POST',
          data: {
            content: this.data.weeklyReportContent
          },  
        })

        console.log(result);
        if (result.code == 200) {
          this.preWeeklyReportContent = weeklyReportContent

          wx.navigateTo({
            url: `/pages/reportSuccess/reportSuccess?num=${result.data}`,
          })

          this.setData({
            isUpload: false
          })    
  
        } 

      } catch (error) {
        console.log(error);
      }

      this.setData({
        isUpload: false
      })    

      
    }
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    console.log(1);
    //loading
    this.isLoading = true;
    wx.showLoading({
      title: '加载中...',
    })
    

    // 接收导航传参
    this.query = options

    // 请求周记
    try {
      const result = await request({
        url: `/weekReport/${this.query.week}`,
        method: 'GET',
      })

      console.log(result);

      if (result.code == 200) {
        this.setData({
          weeklyReportContent: result.data,
        })

        this.preWeeklyReportContent =  result.data
    }
    } catch (error) {
      console.log(error);
    }

    this.isLoading = false;
    wx.hideLoading({})    


   
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
  async onPullDownRefresh() {
    this.isLoading = true;

    // 请求周记
    try {
      const result = await request({
        url: `/weekReport/${this.query.week}`,
        method: 'GET',
      })

      if (result.code == 200) {
        this.setData({
          weeklyReportContent: result.data,
        })

        this.preWeeklyReportContent =  result.data
    }
    } catch (error) {
      console.log(error);
    }

    wx.stopPullDownRefresh()
    this.isLoading = false;

    

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