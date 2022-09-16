Page({
  data: {
    planArray: [],
    dayIntervalArray: [],
    iconArray:[0,1,2,3,4,5,6,7,8],
    imageIndex: 1,
    page:1,
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
    let that=this;
    wx.request({
      url: 'https://philil.com.cn/clockin_app/api/task',
      method:'GEt',
      data: {
        page: that.data.page,
        size: 9,
        status: 0
      },
      header: {
        'Authorization':wx.getStorageSync('token')
      },
      success (res) {
        console.log(res.data);
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
        }
      }
    })
  },
  getMorePlan() {
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
        status: 0
      },
      header: {
        'Authorization':wx.getStorageSync('token')
      },
      success (res) {
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
      },
      complete:()=> {
        wx.hideLoading()
        this.setData({
          isloading:false
        })
      }
    })
    },
  // 下拉刷新
  onReachBottom: function() {
    //节流
    if(this.data.isloading) return;
    this.setData({
      page: this.data.page+1
    })
    this.getMorePlan();
  },
  // 点击计划详情页传递参数
  editPlan(event) {
    var id=event.currentTarget.dataset.id;
    var index=event.currentTarget.dataset.index;
    var taskName=this.data.planArray[index].taskName;
    var endTime1=this.data.planArray[index].endTime;
    var endTime2=endTime1.substring(0,10);
    var endTime3=endTime2.replace('-','年');
    var endTime=endTime3.replace('-','月')+'日';
    var content=this.data.planArray[index].content;
    wx.navigateTo({
      url: '../../pages/editplan/editplan?taskName='+taskName+'&endTime='+endTime+'&content='+content+'&id='+id
    })
  }
})
