// pages/preWeeklyReport/preWeeklyReport.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,//是否在加载中
    token: '',
    preReport: [],//请求返回的周报信息
    avatar: ''//头像
  },

  // 前往对应的周报
  Gotoreport(e) {
    if (this.data.isLoading) {
      return
    }

    wx.navigateTo({
      url: `/pages/preReport/preReport?week=${e.currentTarget.dataset.week}`,
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


    // 拿token
    wx.getStorage({
      key: 'token',
      success: (res) => {
        this.setData({
          token: res.data
        })
        //请求数据
        wx.request({
          url: 'https://philil.com.cn/clockin_app/api//weekReport',
          method: 'GET',
          header: {
            'Authorization': this.data.token
          },
          success: (res) => {
            //判断token有没有过期
            if (res.statusCode == 401) {
              checkLogin();
              return
            }
            
            if (res.data.code == 200) {
              this.setData({
                avatar: res.data.data.avatar,
                preReport: res.data.data.weekReports
              })  
            }
          },

          complete: () => {
            wx.hideLoading({
              success: () => {
                this.setData({
                  isLoading: false
                });        
              },
            })        
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.hideLoading({
      success: () => {
        this.setData({
          isLoading: false
        });        
      },
    })

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
    this.setData({
      isLoading: true
    });

    // 下拉重新请求数据
    wx.request({
      url: 'https://119.29.79.55:8080//weekReport',
      method: 'GET',
      header: {
        'Authorization': this.data.token
      },
      success: (res) => {
        //判断token有没有过期
        if (res.statusCode == 401) {
          checkLogin();
          return
        }
        
        this.setData({
          avatar: res.data.data.avatar,
          preReport: res.data.data.weekReports
        })
      },

      complete: () => {
        wx.stopPullDownRefresh();
        this.setData({
          isLoading: false
        });
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