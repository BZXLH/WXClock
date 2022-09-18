// pages/personal/personal.js
<<<<<<< HEAD
import { reqUserInfo, reqData } from "../../api/index";
=======
import { reqUserInfo, reqData,reqTimeLong } from "../../api/index";
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {
      nickname: "",
      username: "",
      studentId: "",
      grade: "",
      avatar: "",
      roleId: "",
    },
    daka: "",
    jihua: "",
    lianxv: "",
<<<<<<< HEAD
=======
    timeLong:""
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function () {
    const app = getApp();
    reqUserInfo().then(({ data }) => {
      app.userInfo = data;
      this.setData({ info: data });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const app = getApp();
    this.setData({ info: app.userInfo });
    reqData().then(({ data }) => {
      this.setData({
        daka: data.times,
        jihua: data.totalFinished,
        lianxv: data.days,
      });
    });
<<<<<<< HEAD
=======
    reqTimeLong().then(({data})=>{
      this.setData({timeLong:data})
    })
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
