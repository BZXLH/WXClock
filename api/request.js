const baseURL = "https://philil.com.cn/clockin_app/api"; //服务器id+端口
const timeout = 3000; //超时
/* 
    参数: Object{
        url[string]: 接口地址
        method[string]: 请求类型
        data[object]: 参数
    }
    返回: 对应状态Promise
*/
import login from "../utils/checkLogin.js";
export default function request({ url, method, data }) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + url,
      method,
      data,
      timeout,
      header: {
        Authorization: wx.getStorageSync("token"),
      },
      success({ data, code }) {
        if (code == 401) {
<<<<<<< HEAD
          login().then(() => {
=======
          login(true).then(() => {
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
            reject();
          });
        } else resolve(data);
      },
      fail({ errMsg }) {
        reject(errMsg);
      },
    });
  });
}
