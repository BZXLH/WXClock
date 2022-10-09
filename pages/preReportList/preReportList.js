// pages/preWeeklyReport/preWeeklyReport.js
import request from "../../api/request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekReports: [],//请求返回的周报信息
    avatar: ''//头像
  },

  isLoading: false,//是否在加载中

  // 前往对应的周报
  gotoReport(e) {
    if (this.isLoading) {
      return
    }

    wx.navigateTo({
      url: `/pages/preReport/preReport?week=${e.currentTarget.dataset.week}`,
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

    //请求数据
    try {
      const listData = await request({
        url: "/weekReport",
        method: "GET",
      })

      console.log(listData);

      if (listData.code == 200) {
        const {avatar, weekReports} = listData.data
        this.setData({
          avatar,
          weekReports
        })  
}
    } catch (error) {
      console.log(error);
    }

    //停止显示加载
    wx.hideLoading({})
    this.isLoading = false        

    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

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
    this.isLoading = true

    //请求数据
    try {
      const listData = await request({
        url: "/weekReport",
        method: "GET",
      })

      console.log(listData);

      if (listData.code == 200) {
        const {avatar, preReport} = listData.data
        this.setData({
          avatar,
          preReport
        })  
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
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})