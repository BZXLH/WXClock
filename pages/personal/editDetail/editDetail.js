// pages/personal/editDetail/editDetail.js
import { reqModifyUserInfo, reqUserInfo } from "../../../api/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    propV: "",
    propK: "",
    inputKeyword: "",
    title: "",
    gradeSelect: 19,
    gradeList: [{ grade: 19 }, { grade: 20 }, { grade: 21 }],
  },

  //更改单选选项
  check(event) {
    this.setData({
      gradeSelect: event.detail.value,
      inputKeyword: event.detail.value,
    });
  },
  write(event) {
    this.setData({ inputKeyword: event.detail.value });
  },
  //保存修改
  save() {
    const app = getApp();
    reqModifyUserInfo(this.data.propK, this.data.inputKeyword).then((res) => {
      reqUserInfo().then(({ data }) => {
        app.userInfo = data;
        wx.navigateBack({
          success() {
            setTimeout(() => {
              wx.showToast({
                title: "修改成功",
              });
            }, 100);
          },
        });
      });
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { title, propV, propK } = options;
    this.setData({
      propK,
      propV,
    });
    // 更改为对应的标题
    wx.setNavigationBarTitle({
      title: "更改" + title,
    });
    //input赋初始值
    this.setData({ title, inputKeyword: propV });
    if (title == "年级") {
      let gradeList = this.data.gradeList;
      for (let index in gradeList) {
        if (gradeList[index].grade == propV) gradeList[index].checked = true;
        this.setData({ gradeList });
      }
    }
  },

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
});
