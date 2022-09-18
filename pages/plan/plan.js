Page({
  data: {
    planArray: [],
    dayIntervalArray: [],
    iconArray:[0,1,2,3,4,5,6,7,8],
    imageIndex: 1,
    page:1,
<<<<<<< HEAD
    isLoading: false
  },
  onLoad: function (options) {
    this.loadPlan();
  },
  onShow: function() {
    this.loadPlan();
  },
  // 显示计划天数
  //显示计划列表
  loadPlan( ) {
=======
    isLoading: false,
    status: '进行中',
    finishShow: false,
    overdueShow: false,
    doingShow: true,
    display: 'none',
    noPlan: true,
    deg: '0',
    translateY: '0',
    fold: 1,
    today: '',
    nickname:'',
    helloWord:'',
    noPlanList: false,
    todayDate: '',
    pageTop: '',
    timeStatusCode: 2
  },
  onLoad: function (options) {
    // this.loadPlan();
  },
  onShow: function() {
    this.setData({
      fold: 1,
      page:1
    })
    console.log(this.data.timeStatusCode);
    this.loadPlan(this.data.timeStatusCode);
    this.getToday();
    this.getName();
    this.getHelloWord();
  },
  onPullDownRefresh:function(){
    this.onRefresh();
  },
  // 下拉刷新
  onRefresh:function(){
    //导航条加载动画
    wx.showNavigationBarLoading()
    //loading 提示框
    wx.showLoading({
      title: 'Loading...',
    })
    console.log("下拉刷新啦");
    setTimeout(function () {
      wx.hideLoading();
      wx.hideNavigationBarLoading();
      //停止下拉刷新
      wx.stopPullDownRefresh();
    }, 1000)
  },
  // 获取昵称
  getName() {
    var that=this;
    wx.request({
      url: 'https://philil.com.cn/clockin_app/api/user/',
      method:'GET',
      data: {},
      header: {
        'Authorization':wx.getStorageSync('token')
      },
      success (res) {
         //判断token有没有过期
         if (res.data.code == 401) {
          checkLogin();
          return;
        }
        if (res.statusCode == 200) {
          that.setData({
            nickname:res.data.data.nickname 
          })
        }
      }
    })
  },
  // 判断早上好还是晚上好
  getHelloWord() {
    var time=new Date();
    var hour=time.getHours();
    if(hour>4&&hour<12) {
      this.setData({
        helloWord: '早上好'
      })
    }else if(hour>12&&hour<18) {
      this.setData({
        helloWord: '下午好'
      })
    }else if(hour>18||hour<4) {
      this.setData({
        helloWord: '晚上好'
      })
    }
  },
  // 获取今天日期
  getToday() {
    var today=null;
    var dt = new Date();
    var y = dt.getFullYear();
    var mt = dt.getMonth() + 1;
    mt= mt<=9?'0'+mt:mt;
    var date = dt.getDate();
    var day = dt.getDay();
    if(day===0) {
      day='日'
    }else if(day===1) {
      day='一'
    }else if(day===2) {
      day='二'
    }else if(day===3) {
      day='三'
    }else if(day===4) {
      day='四'
    }else if(day===5) {
      day='五'
    }else if(day===6) {
      day='六'
    }
    var todayDate=y+'-'+mt+'-'+date;
    today= y + "年" + mt + "月" + date + "日" + "星期" + day;
    this.setData({
      today: today,
      todayDate: todayDate
    })
  },
  // 点击更换任务状态
  changeStatus() {
    if(this.data.fold===1) {
      console.log('change');
      this.setData({
        display: 'block',
        deg: '180deg',
        translateY: '16rpx',
        fold: 0
    })
      if(this.data.status==='进行中') {
        this.setData({
          finishShow: true,
          overdueShow: true,
          doingShow: false,
          nobeginShow: true
        })
      }else if(this.data.status==='已完成') {
        this.setData({
          finishShow: false,
          overdueShow: true,
          doingShow: true,
          nobeginShow: true
        })
      }else if(this.data.status==='已逾期') {
        this.setData({
          finishShow: true,
          overdueShow: false,
          doingShow: true,
          nobeginShow: true
        })
      }else if(this.data.status==='未开始') {
        this.setData({
          finishShow: true,
          overdueShow: true,
          doingShow: true,
          nobeginShow: false
        })
      }
    }else {
      console.log('change1');
      this.setData({
        display: 'block',
        deg: '0',
        translateY: '0',
        fold: 1,
        finishShow: false,
        overdueShow: false,
        doingShow: false,
        nobeginShow: false
      })
    }
  },

  // 进行中的任务
  doingStatus() {
    this.setData({
      status: '进行中',
      display: 'none',
      display: 'block',
      deg: '0',
      translateY: '0',
      fold: 1,
      finishShow: false,
      overdueShow: false,
      doingShow: false,
      nobeginShow: false,
      timeStatusCode: 2
    })
    this.loadPlan(this.data.timeStatusCode);
  },
  // 完成的任务
  finishStatus() {
    this.setData({
      status: '已完成',
      display: 'none',
      display: 'block',
      deg: '0',
      translateY: '0',
      fold: 1,
      finishShow: false,
      overdueShow: false,
      doingShow: false,
      nobeginShow: false,
      nobeginShow: false,
      timeStatusCode: 3
    })
    this.loadPlan(this.data.timeStatusCode);
  },
  // 过期的任务
  overdueStatus() {
    this.setData({
      status: '已逾期',
      display: 'none',
      display: 'block',
      deg: '0',
      translateY: '0',
      fold: 1,
      finishShow: false,
      overdueShow: false,
      doingShow: false,
      nobeginShow: false,
      timeStatusCode: 1
    })
    this.loadPlan(this.data.timeStatusCode);
  },
  // 未开始的任务
  nobeginStatus() {
    this.setData({
      status: '未开始',
      display: 'none',
      display: 'block',
      deg: '0',
      translateY: '0',
      fold: 1,
      finishShow: false,
      overdueShow: false,
      doingShow: false,
      nobeginShow: false,
      timeStatusCode: 4
    })
    this.loadPlan(this.data.timeStatusCode);
  },

  //显示计划列表
  loadPlan( timeStatusCode) {
    this.setData({
      page: 1
    })
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
    let that=this;
    wx.request({
      url: 'https://philil.com.cn/clockin_app/api/task',
      method:'GEt',
      data: {
        page: that.data.page,
        size: 9,
<<<<<<< HEAD
        status: 0
=======
        timeStatusCode: timeStatusCode
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
      },
      header: {
        'Authorization':wx.getStorageSync('token')
      },
      success (res) {
        console.log(res.data);
<<<<<<< HEAD
        if(res.data.data===null) {
          that.setData({
            planArray:[]
          })
        }else{
          that.setData({
            planArray: res.data.data.content
          }) 
          //计算截止日期
          var daysArray=[];
          for(var i=0;i<res.data.data.content.length;i++) {
              var endTime=new Date(res.data.data.content[i].endTime.replace(/-/g,"/"));//获取正确格式
              var nowTime=new Date();//获取当前时间
              var times=endTime.getTime()-nowTime.getTime();
              var days=parseInt(times/(24*1000*3600))+1;//计算相差的天数
              daysArray[i]=days;
          }
          that.setData({
            //天数数组
            dayIntervalArray: daysArray
          })
=======
         //判断token有没有过期
         if (res.data.code == 401) {
          checkLogin();
          return;
        }
        if (res.statusCode == 200) {
          if(res.data.data===null) {
            that.setData({
              planArray:[],
              noPlan: true
            })
          }else{
            that.setData({
              planArray: res.data.data.content,
              noPlan: false
            }) 
            //计算截止日期
            var daysArray=[];
            for(var i=0;i<res.data.data.content.length;i++) {
                var endTime=new Date(res.data.data.content[i].endTime.replace(/-/g,"/"));//获取正确格式
                var nowTime=new Date();//获取当前时间
                var times=endTime.getTime()-nowTime.getTime();
                var days=parseInt(times/(24*1000*3600));//计算相差的天数
                daysArray[i]=days;
            }
            that.setData({
              //天数数组
              dayIntervalArray: daysArray
            })
          }
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
        }
      }
    })
  },
<<<<<<< HEAD
  getMorePlan() {
=======
  getMorePlan(timeStatusCode) {
    if(this.data.noPlanList) {
      return
    }
    console.log('加载更多计划');
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
    var that=this;
    this.setData({
      isloading: true
    })
    wx.request({
      url: 'https://philil.com.cn/clockin_app/api/task',
      method:'GEt',
      data: {
        page: that.data.page,
        size: 9,
<<<<<<< HEAD
        status: 0
=======
        timeStatusCode: timeStatusCode
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
      },
      header: {
        'Authorization':wx.getStorageSync('token')
      },
      success (res) {
<<<<<<< HEAD
        //判断是否有数据
        if(res.data.data.content.length==0) {
          wx.showLoading({
            title: '没有更多计划了',
          })
        }else{
          wx.showLoading({
            title: '更多计划加载中',
          })
          var arr=[]
          for(let i=0;i<res.data.data.content.length;i++) {
            arr[i]=i;
          }
          that.setData({
            iconArray: [...that.data.iconArray,...arr]
          })
          that.setData({
            planArray: [...that.data.planArray,...res.data.data.content]
          }) 
          //计算截止日期
          var daysArray=[];
          for(var i=0;i<res.data.data.content.length;i++) {
              var endTime=new Date(res.data.data.content[i].endTime.replace(/-/g,"/"));//获取正确格式
              var nowTime=new Date();//获取当前时间
              var times=endTime.getTime()-nowTime.getTime();
              var days=parseInt(times/(24*1000*3600));//计算相差的天数
              daysArray[i]=days;
          }
          that.setData({
            //天数数组
            dayIntervalArray:[...that.data.dayIntervalArray,...daysArray]
          })
       }
=======
        if(res.data.data.content.length<=9) {
          that.setData({
            noPlanList: true
          })
        }
         //判断token有没有过期
         if (res.data.code == 401) {
          checkLogin();
          return;
        }
        if (res.statusCode == 200) {
          //判断是否有数据
          if(res.data.data.content.length==0) {
            wx.showLoading({
              title: '没有更多计划了',
            })
            return;
          }else{
            wx.showLoading({
              title: '更多计划加载中',
            })
            var arr=[]
            for(let i=0;i<res.data.data.content.length;i++) {
              arr[i]=i;
            }
            that.setData({
              iconArray: [...that.data.iconArray,...arr]
            })
            that.setData({
              planArray: [...that.data.planArray,...res.data.data.content]
            }) 
            //计算截止日期
            var daysArray=[];
            for(var i=0;i<res.data.data.content.length;i++) {
                var endTime=new Date(res.data.data.content[i].endTime.replace(/-/g,"/"));//获取正确格式
                var nowTime=new Date();//获取当前时间
                var times=endTime.getTime()-nowTime.getTime();
                var days=parseInt(times/(24*1000*3600));//计算相差的天数
                daysArray[i]=days;
            }
            that.setData({
              //天数数组
              dayIntervalArray:[...that.data.dayIntervalArray,...daysArray]
            })
          }
        }
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
      },
      complete:()=> {
        wx.hideLoading()
        this.setData({
          isloading:false
        })
      }
    })
    },
<<<<<<< HEAD
  // 下拉刷新
=======
  // 上拉触底 加载更多任务
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
  onReachBottom: function() {
    //节流
    if(this.data.isloading) return;
    this.setData({
      page: this.data.page+1
    })
<<<<<<< HEAD
    this.getMorePlan();
=======
    if(this.data.status==='已逾期') {
      this.getMorePlan(1);
    }else if(this.data.status==='进行中') {
      this.getMorePlan(2);
    }else if(this.data.status==='已完成') {
      this.getMorePlan(3);
    }
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
  },
  // 点击计划详情页传递参数
  editPlan(event) {
    var id=event.currentTarget.dataset.id;
    var index=event.currentTarget.dataset.index;
    var taskName=this.data.planArray[index].taskName;
<<<<<<< HEAD
=======
    var beginTime1=this.data.planArray[index].beginTime;
    var beginTime2=beginTime1.substring(0,10);
    var beginTime3=beginTime2.replace('-','年');
    var beginTime=beginTime3.replace('-','月')+'日';
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
    var endTime1=this.data.planArray[index].endTime;
    var endTime2=endTime1.substring(0,10);
    var endTime3=endTime2.replace('-','年');
    var endTime=endTime3.replace('-','月')+'日';
    var content=this.data.planArray[index].content;
<<<<<<< HEAD
    wx.navigateTo({
      url: '../../pages/editplan/editplan?taskName='+taskName+'&endTime='+endTime+'&content='+content+'&id='+id
    })
=======
    var status=this.data.status;
    // 获取滚动条位置
    var that=this;
    wx.createSelectorQuery().select('#plan').boundingClientRect(function(rect){ 
      that.setData({
        pageTop:rect.top// 距离顶部滚动条位置
      })
      var pageTop=that.data.pageTop
      wx.navigateTo({
        url: '../../pages/editplan/editplan?taskName='+taskName+'&beginTime='+beginTime+'&endTime='+endTime+'&content='+content+'&id='+id+'&beginTimeSend='+beginTime2+'&endTimeSend='+endTime2+'&status='+status+'&pageTop='+pageTop
      })
    }).exec()
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
  }
})
