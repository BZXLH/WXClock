// pages/editplan/editplan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    endTime: "",
    startTime: "",
    endTimeSend: "",
    startTimeSend: "",
    today: '',
    status:'',
    id:1,
    pageTop:''
  },
  // 接收传递过来的参数
  onLoad(options) {
    console.log(options);
    this.setData({
      taskName:options.taskName,
      content: options.content,
      endTimeSend:options.endTimeSend,
      startTimeSend: options.beginTimeSend,
      startTime:options.beginTime,
      endTime:options.endTime,
      id: options.id,
      status: this.options.status,
      taskNameBefore:options.taskName,
      endTimeSendBefore:options.endTimeSend,
      startTimeSendBefore: options.beginTimeSend,
      contentBefore: options.content,
      pageTop: options.pageTop
    })
  }, 
  // 得到今天
  getToday() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    var day = d.getDate();
    day = day < 10 ? '0' + day : day;
    var today=year + '-' + month + '-' + day;
    this.setData({
      today:today
    })
  },
  getTaskname(event) {
    this.setData({
      taskName: event.detail.value,
    });
  },
  getContent(event) {
    this.setData({
      content: event.detail.value,
    });
  },
  bindDateChange: function (event) {
    var endTime1 = event.detail.value.replace("-", "年");
    var endTime = endTime1.replace("-", "月") + "日";
    this.setData({
      endTime: endTime,
      endTimeSend: event.detail.value,
    });
  },
  bindDateChange2: function (event) {
    var startTime1 = event.detail.value.replace("-", "年");
    var startTime = startTime1.replace("-", "月") + "日";
    this.setData({
      startTime: startTime,
      startTimeSend: event.detail.value,
    });
  },

  // 编辑计划
  editPlan() {
    var that=this
    // 判断是否有变化 
    if(that.data.taskName===that.data.taskNameBefore&&that.data.content===that.data.contentBefore&&that.data.startTimeSend===that.data.startTimeSendBefore&&that.data.endTimeSend===that.data.endTimeSendBefore) {
      wx.showToast({
        title: '计划内容没有变化',
        icon: 'none',
        duration: 1000
      })
      return
    }
    console.log(that.data);
    var that=this;
    wx.showModal({
      title: '',
      content: '确定要编辑该计划吗？',
      success: function (sm) {
        if (sm.confirm) {
          console.log('编辑计划');
          wx.request({
            url: 'https://philil.com.cn/clockin_app/api/task',
            method:'PUT',
            data: {
              status: 0,
              id:that.data.id,
              taskName: that.data.taskName,
              content: that.data.content,
              endTime:that.data.endTimeSend+' 24:00' ,
              beginTime: that.data.startTimeSend+' 00:00'
            },
            header: {
              'Authorization':wx.getStorageSync('token')
            },
            success (res) {
               //判断token有没有过期
               if (res.data.code == 401) {
                checkLogin();
                return;
              }
              if(res.data.message=='结束时间不得早于开始时间') {
                wx.showToast({
                  title: '结束不得早于开始',
                  icon: 'none',
                  duration: 1000
                })
              }
              if (res.statusCode == 200) {
                if(res.data.message=='任务名称不得为空'||res.data.message=='任务内容不得为空'||res.data.message=='结束时间不得为空') {
                  wx.showToast({
                    title: res.data.message,
                    icon: 'none',
                    duration: 1000
                  })
                }
                if (!res.data.data) return;
                wx.switchTab({
                  url: '../../pages/plan/plan',
                }) 
                // // 设置滚动条的位置
                wx.pageScrollTo({
                  scrollTop: that.data.pageTop, // 滚动到的位置（距离顶部 px）
                  duration: 0 //滚动所需时间 如果不需要滚动过渡动画，设为0（ms）
                })
              }
            }
          })
        } else if (sm.cancel){
            console.log('用户点击取消')
        }
      }
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
        id:that.data.id,
        taskName: that.data.taskName,
        content: that.data.content,
        beginTime: that.data.startTimeSend+' 00:00',
        endTime:that.data.endTimeSend+' 24:00' 
      },
      header: {
        'Authorization':wx.getStorageSync('token')
      },
      success (res) {
        console.log(res.data);
         //判断token有没有过期
         if (res.data.code == 401) {
          checkLogin();
          return;
        }
        if (res.statusCode == 200) {
          wx.navigateTo({
            url: '../../pages/finishNum/finishNum?num='+res.data.data+'&pageTop='+that.data.pageTop
          })
        }
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
          wx.request({
            url: 'https://philil.com.cn/clockin_app/api/task/'+that.data.id,
            method:'DELETE',
            header: {
              'Authorization':wx.getStorageSync('token')
            },
            success (res) {
              console.log(res.data);
               //判断token有没有过期
              if (res.data.code == 401) {
                checkLogin();
                return;
              }
              if (res.statusCode == 200) {
                  wx.navigateBack()
                  // // 设置滚动条的位置
                  wx.pageScrollTo({
                    scrollTop: that.data.pageTop, // 滚动到的位置（距离顶部 px）
                    duration: 0 //滚动所需时间 如果不需要滚动过渡动画，设为0（ms）
                  })
             }
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