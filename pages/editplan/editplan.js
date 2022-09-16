// pages/editplan/editplan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskName:'',
    endTime:'',
    content:'',
    id:1
  }, 
  onLoad(options) {
    console.log(options);
    this.setData({
      taskName:options.taskName,
      endTime:options.endTime,
      content: options.content,
      id: options.id
    })
  },
  // 完成计划
  finishPlan() {
    var that=this
    console.log(that.data.id);
    wx.request({
      url: 'https://philil.com.cn/clockin_app/api/task',
      method:'PUT',
      data: {
        status: 1,
        id:that.data.id
      },
      header: {
        'Authorization':wx.getStorageSync('token')
      },
      success (res) {
        console.log(res.data);
        wx.navigateTo({
          url: '../../pages/finishNum/finishNum?num='+res.data.data
        })
      }
    })
  },
  // 删除计划
  deletePlan() {
    var that=this;
    wx.showModal({
      title: '',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          console.log(111);
          wx.request({
            url: 'https://philil.com.cn/clockin_app/api/task/'+that.data.id,
            method:'DELETE',
            header: {
              'Authorization':wx.getStorageSync('token')
            },
            success (res) {
              console.log(res.data);
              wx.navigateBack()
            }
          })
        } else if (sm.cancel){
            console.log('用户点击取消')
        }
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */

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