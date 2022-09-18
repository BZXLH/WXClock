import request from "./request";
//登录
export function login(data) {
  return request({
    url: "/user/login",
    method: "get",
    data,
  });
}
//获取个人信息
export function reqUserInfo() {
  return request({
    url: "/user/",
    method: "get",
  });
}
//修改个人信息（单项）
export function reqModifyUserInfo(key, value) {
  return request({
    url: "/user",
    method: "put",
    data: {
      [key]: value,
    },
  });
}

//请假
export function reqLeave({ number, excuse }) {
  return request({
    url: `/askleave?number=${number}&excuse=${excuse}`,
    method: "post",
  });
}
//获取请假列表
export function reqLeaveList(data) {
  return request({
    url: "/askleave/user",
    method: "get",
    data,
  });
}
//提交意见反馈
<<<<<<< HEAD
export function reqRespond(data) {
  return request({
    url: "/feedback",
    method: "post",
    data,
=======
export function reqRespond({ content, theme }) {
  return request({
    url: `/feedback?content=${content}&theme=${theme}`,
    method: "post",
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
  });
}
//获取意见列表
export function reqRespondList(data) {
  return request({
    url: "/feedback",
    method: "get",
    data,
  });
}

//获取补卡审批列表
export function reqExamineList(data) {
  return request({
    url: "/cardreissue",
    method: "get",
    data,
  });
}
//补卡审批
export function reqExamineCard(data) {
  return request({
    url: "/cardreissue",
    method: "put",
    data,
  });
}
//获取请假审批列表
export function reqExamineLeave(data) {
  return request({
    url: "/askleave/approve",
    method: "get",
    data,
  });
}
//请假审批
export function reqELeave(data) {
  return request({
    url: "/askleave",
    method: "put",
    data,
  });
}

//获取数据
export function reqData() {
  return request({
    url: "/user/getMainData",
    method: "get",
  });
}
<<<<<<< HEAD
=======

//获取本周连续打卡时长
export function reqTimeLong() {
  return request({
    url: "clockin/weekClockinHours",
    method: "get",
    data: { week: 0 },
  });
}

//获取所有人打卡时长
export function reqAllTimeLong() {
  return request({
    url: "clockin/getAllWeekClockinHours",
    method: "get",
    data: { week: 0 },
  });
}
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
