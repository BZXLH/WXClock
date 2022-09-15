// component/calendar/calender.js
Component({
  data: {
    today: null, //今天
    selectDay: null, //选择的日期
    year: "", // 年
    month: "", // 月 0-11 使用时+1
    day: "", //日
    weekArray: ["日", "一", "二", "三", "四", "五", "六"],
    dataList: [], //接下来有未完成任务的日期列表
    deg: "45deg", //箭头旋转角度
    height: "64rpx", //日历高度 控制收缩
    moveHeight: "", //储存一开始上升的那个距离
    translateHeight: "", //上升距离 获取周历
  },

  lifetimes: {
    //在组件实例进入页面节点树时执行
    attached() {
      this.setData({
        weekArray: this.data.weekArray,
      });
      //加载
      var date = new Date();
      this.setData({
        today: {
          year: date.getFullYear(),
          month: date.getMonth(), //0-11 使用时+1
          day: date.getDate(),
        },
      });
      this.loadDate(date);
      //获取有任务的日期列表并打圈
      this.dateList(this.data.month);
      //获取上升距离
      this.getTranslateHeight();
    },
  },

  methods: {
    //获取任务未完成日期列表 并打圈
    dateList(month) {
      var that = this;
      wx.request({
        url: "https://philil.com.cn/clockin_app/api/task/dateList",
        method: "GEt",
        data: {
          month: 9,
        },
        header: {
          Authorization: wx.getStorageSync("token"),
        },
        success(res) {
          console.log(res.data);
          that.setData({
            dataList: res.data.data,
          });
          if (that.data.dataList == null) return;
          // 根据当月1号确定选中日期是第几个
          var date = new Date();
          date.setDate(1);
          var week = date.getDay();
          var dataList = that.data.dataList;
          for (var i = 0; i < dataList.length; i++) {
            var index = dataList[i] + week - 1;
            var newIndexSelect = "dayArray[" + index + "].isSelect";
            that.setData({
              [newIndexSelect]: true,
            });
          }
        },
      });
    },

    // 获取日历收缩时上升高度 日历上升
    getTranslateHeight() {
      // 根据当月1号确定要上移的距离
      var date = new Date();
      var today = date.getDate();
      date.setDate(1);
      var week = date.getDay();
      var row = Math.trunc((week + today) / 7);
      if (row == 0) {
        this.setData({
          translateHeight: -(row * 30) * 2 - 2 + "rpx",
          moveHeight: -(row * 30) * 2 - 2 + "rpx",
        });
      } else {
        this.setData({
          translateHeight: -(row * 30) * 2 - 4 + "rpx",
          moveHeight: -(row * 30) * 2 - 4 + "rpx",
        });
      }
    },

    // 箭头旋转 收缩日历
    changeDeg() {
      if (this.data.deg == "225deg") {
        this.setData({
          deg: "45deg",
          height: "64rpx",
          translateHeight: this.data.moveHeight,
        });
      } else {
        this.setData({
          deg: "225deg",
          height: "360rpx",
          translateHeight: "0rpx",
        });
      }
    },

    //加载日期
    loadDate(date) {
      //获取年份
      let year = date.getFullYear();
      //获取月份
      let month = date.getMonth();
      //设置当前日期
      this.setData({
        year: year,
        month: month,
        date: year + "-" + (month + 1 > 9 ? month + 1 : "0" + (month + 1)), //显示在第一行
      });
      //设置当月1号
      date.setDate(1);
      //获取1号是星期几 0代表周日 1周一 依次类推 6代表周六
      let week = date.getDay();
      if (week != 0) {
        //由于日期开始为周日，所以要减去对应的天数，拿到周日的时间
        //例如 1号时是周六，上周日需要往前推6天,即从今天往前推6天。
        date.setDate(date.getDate() - week);
      }
      //用于存储日期数组
      let dayArray = [];
      //日历选中的标识
      let selectId = -1;
      if (this.data.selectDay !== null) {
        //如果有选中的日期，设置选中标识
        selectId = this.data.selectDay.id;
      }
      //一页有35个，故循环35次
      for (var i = 0; i < 35; i++) {
        let data = this.createDate(date, i, selectId);
        //存储到数组中
        dayArray.push(data);
      }
      //35个可能本月没有显示完，例如1号是周六，这样的话 最后一个是29号，没有显示完全
      let last = dayArray[dayArray.length - 1]; //获取当前数组最后一天数据
      if (last.month == this.data.month) {
        console.log(last.month);
        console.log(this.data.month);
        console.log("last", last);
        //还在本月当中，可能出现没有显示完
        let date = new Date();
        date.setFullYear(last.year); //年
        date.setMonth(last.month); //月
        date.setDate(last.day + 1); //日 +1代表明天

        if (date.getMonth() === last.month) {
          //明天和今天月份相等，说明今天不是本月最后一天。需要加7天
          date.setDate(last.day); //日 +1代表明天
          for (let i = 35; i < 42; i++) {
            let data = this.createDate(date, i, selectId);
            //存储到数组中
            dayArray.push(data);
          }
        }
      }
      //刷新列表
      this.setData({
        dayArray: dayArray,
      });
    },
    //创建日期信息
    createDate(date, i, selectId) {
      //获取当前为几号
      let day = date.getDate();
      if (i > 0) {
        //如果不是日历中的第一条，当天日期加1天
        date.setDate(day + 1);
        //获取新的日期
        day = date.getDate();
      }
      //日期信息
      let data = {
        day: day, //几号
        month: date.getMonth(), //月 0-11
        year: date.getFullYear(), //年
        week: date.getDay(), //周几
        isSelect: false, //是否选中
        index: i, //当天日期在本页的下标
      };
      //设置当前日期是否是今天
      data.isToday = this.isToday(data);
      //给当前日期设置标识
      data.id = data.year + "-" + data.month + "-" + data.day;
      if (selectId === -1 && data.isToday) {
        //说明没有选中的,并且是当天,默认当天是选中的
        data.isSelect = true;
        this.data.selectDay = data;
      } else {
        //判断是否为选中的日期
        data.isSelect = data.id === selectId;
        //如果是选中的日期，将当前日期在本页的下标设置给选中的，解决跨月显示问题
        if (data.isSelect) {
          this.data.selectDay.index = data.index;
        }
      }
      return data;
    },
    //判断是否是今天
    isToday(info) {
      let today = this.data.today;
      return (
        info.year === today.year &&
        info.month === today.month &&
        info.day === today.day
      );
    },
    //点击日期
    onClickDay(e) {
      //获取当前点击的下标
      let index = e.currentTarget.dataset.index;
      //通过下标获取当前日期信息
      let item = this.data.dayArray[index];
      //判断当前是否有选中的天数
      if (this.data.selectDay !== null) {
        //判断是否选中的为同一天
        if (item.id === this.data.selectDay.id) {
          console.log("选中的是同一天");
          return;
        }
        //清空之前选中的样式
        let oldIndexSelect =
          "dayArray[" + this.data.selectDay.index + "].isSelect";
        this.setData({
          [oldIndexSelect]: false,
        });
      }
      //判断点击是否是今天，如果是今天需要特殊处理
      if (this.isToday(item)) {
        let newIndexSelect = "dayArray[" + index + "].isSelect";
        this.setData({
          selectDay: item,
          [newIndexSelect]: true,
        });
        return;
      }
      this.data.selectDay = item;
      let isRefrsh = true;
      //判断点击的日期是否是在同一年
      if (item.year == this.data.year) {
        //点击日期在选中日期之前
        if (item.month < this.data.month) {
          //上一月
          this.onClickPre();
          isRefrsh = false;
        } else if (item.month > this.data.month) {
          //下月
          this.onClickNext();
          isRefrsh = false;
        }
      } else {
        //跨年了
        if (this.data.month == 0) {
          //0 代表的是1月，在本页中跨年只会向前，所以直接调用上一个月的方法
          this.onClickPre();
          isRefrsh = false;
        } else if (this.data.month == 11) {
          //11 代表12月，代表点击的是明年1月的日期，所以直接调用下一月的方法
          this.onClickNext();
          isRefrsh = false;
        }
      }

      if (isRefrsh) {
        //更新选中样式
        let newIndexSelect = "dayArray[" + index + "].isSelect";
        this.setData({
          [newIndexSelect]: true,
        });
      }
    },
  },
});
