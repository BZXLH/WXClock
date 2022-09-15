// pages/first/first.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nickname: "",
    username: "",
    studentId: "",
    headPhoto: "",
    gradeList: [19, 20, 21], //年级
    grade: "", //已选年级
    groupList: ["前端组", "后台组", "UI组", "大数据组", "安卓组"], //组别
    group: "", //已选组别
    roleList: ["组长", "组员", "负责人"], //身份
    role: "",
  },
  map: {
    负责人: 1,
    后台组组长: 2,
    前端组组长: 3,
    大数据组组长: 4,
    安卓组组长: 5,
    UI组组长: 6,
    后台组组员: 7,
    前端组组员: 8,
    大数据组组员: 9,
    安卓组组员: 10,
    UI组组员: 11,
  },
  selGrade(event) {
    this.setData({ grade: this.data.gradeList[event.detail.value] });
  },
  selGroup(event) {
    this.setData({ group: this.data.groupList[event.detail.value] });
  },
  selRole(event) {
    this.setData({ role: this.data.roleList[event.detail.value] });
  },
  changeHeadPhoto({ detail }) {
    this.setData({ headPhoto: detail.avatarUrl });
  },
  //数据绑定
  write(event) {
    let { dataset } = event.target;
    this.setData({ [dataset.info]: event.detail.value });
  },
  //提交表单
  sub() {
    let {
      nickname,
      username,
      grade,
      studentId,
      role,
      group,
      headPhoto,
    } = this.data;
    if (!(nickname && username && grade && studentId && role && group)) {
      wx.showToast({
        icon: "error",
        title: "请完整填写信息",
      });
      return;
    }
    let userRole;
    if (role == "负责人") userRole = "负责人";
    else userRole = group + role;
    let roleId = this.map[userRole];
    if (!headPhoto) {
      wx.showToast({
        icon: "error",
        title: "请选择一个头像",
      });
      return;
    }

    wx.login({
      success({ code }) {
        wx.uploadFile({
          filePath: headPhoto,
          name: "avatarImg",
          url: "https://philil.com.cn/clockin_app/api/user/regist",
          formData: {
            code,
            nickname,
            username,
            grade,
            studentId,
            roleId,
          },
          success({ data }) {
            wx.setStorageSync("token", data.userJwt);
            wx.switchTab({
              url: "/pages/daka/daka",
            });
            setTimeout(() => {
              wx.showToast({
                title: "注册成功！",
              });
            }, 100);
          },
          fail() {
            wx.showToast({
              icon: "error",
              title: "注册出错!",
            });
          },
        });
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {},

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
