/* 
    参数：成功后的回调
    返回：对应状态Promise
*/
import { login } from "../api/index";
export default function checkLogin() {
  return new Promise((resolve, reject) => {
<<<<<<< HEAD
    if (wx.getStorageSync("token")) {
      resolve(1);
      return;
    }
=======
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
    wx.showLoading({ title: "加载中" });
    // 获取openId并存入storage中
    wx.login({
      success({ code }) {
        wx.hideLoading();
        login({ code }).then(({ code, data }) => {
          if (code == 401) {
            resolve(0);
          } else {
            wx.setStorageSync("token", data.userJwt);
            resolve(1);
<<<<<<< HEAD
              
=======
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
          }
        });
      },
      fail() {
        wx.showToast({ title: "登录失败" });
        reject();
      },
    });
  });
}
