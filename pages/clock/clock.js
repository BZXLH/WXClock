// pages/clock/clock.js
import throttle from "../../utils/tool"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    thinking: "",
    maxLongitude: 113.39159,
    minLongitude: 113.384,
    maxLatitude: 23.043,
    minLatitude: 22.93772,
  },
  write(e) {
    this.setData({ thinking: e.detail.value });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

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
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},

  submitClock:throttle(function(){
    if ((this.data.thinking == "")||(this.data.thinking.trim()=="")) {
      wx.showToast({
        title: "感想不能为空",
        icon: "error",
        duration: 2000,
      });
      return;
    }
    wx.showLoading({
      title: '获取定位中...',
    })
    wx.getLocation({
      isHighAccuracy: true,
      highAccuracyExpireTime: 5000,
      success: (res) => {
        //console.log(res);
        if (
          res.latitude <= this.data.maxLatitude &&
          res.latitude >= this.data.minLatitude &&
          res.longitude >= this.data.minLongitude &&
          res.longitude <= this.data.maxLongitude
        ) {
          var header = {
            "content-type": "application/json",
            Authorization: wx.getStorageSync("token"),
          };
          wx.request({
            url: "https://philil.com.cn/clockin_app/api/clockin",
            method: "post",
            data: {
              feeling: this.data.thinking,
            },
            header: header,
            success: (res) => {
              //console.log(res)
              wx.setStorageSync("times", res.data);
              wx.hideLoading();
              wx.navigateTo({
                url: "../passClock/passClock",
              });
              this.setData({
                thinking: "",
              });
            },
            fail: (res) => {
              wx.navigateTo({
                url: "../failClock/failClock",
              });
            },
          });
        } else {
          wx.navigateTo({
            url: "../failClock/failClock",
          });
        }
      },
      fail:function(){
        wx.hideToast()
        //判断是否授权定位
        wx.getSetting({
          success: (res) => {
            let authSetting = res.authSetting
            if (!(authSetting['scope.userLocation'] || authSetting['scope.userLocation'] == undefined)){
              wx.showModal({
                title: '您未开启地理位置授权',
                content: '是否前往授权？',
                success: res => {
                  if (res.confirm) {
                    wx.openSetting()
                  }else{
                    //若点击取消
                    wx.navigateTo({
                      url: "../failClock/failClock",
                    });
                  }
                }
              })
            }else{
              //用户已授权，但是获取地理位置失败，提示用户去系统设置中打开定位
              wx.showModal({
                title: '',
                content: '请在系统设置中打开定位服务',
                confirmText: '确定'
              })
            }
          } 
        })
      }
    });
  },3000)
});
