// pages/list/list.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //列表的选中状态
    getAll:"selected",
    getMy:"unselected",
    listCondition:true,
    PageofAll:1,
    pageSize:10,
    allList:[],
    myList:[],
    isloading:false,
    AlltoBottom:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getAllList()
    this.getMyList()
  },

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

  showAllList(){
    this.setData({
      getAll:"selected",
      getMy:"unselected",
      listCondition:true,
    })
  },

  getAllList(){
    this.setData({
      isloading:true
    })
    var header = {
      'content-type': 'application/json',
      'Authorization': wx.getStorageSync("token")
    }
    wx.request({
      url: 'https://philil.com.cn/clockin_app/api//clockin/all',
      method:'get',
      header:header,
      data:{
        pageAt:this.data.PageofAll,
        pageSize:this.data.pageSize
      },
      success:(res)=>{
        console.log(res)
        console.log(res.data.data.content)
        this.setData({
          allList:[...this.data.allList,...res.data.data.content],
          AlltoBottom :res.data.data.last
        })
      },
      complete:()=>{
        this.setData({
          isloading:false
        })
      }
    }) 
  },

  showMyList(){
    this.setData({
      getAll:"unselected",
      getMy:"selected",
      listCondition:false
    })
  },

  getMyList(){
    var header = {
      'content-type': 'application/json',
      'Authorization': wx.getStorageSync("token")
    }
    wx.request({
      url: 'https://philil.com.cn/clockin_app/api//clockin/self',
      method:'get',
      data:{
        pageAt : 1,
        pageSize : 7,
      },
      header: header,
      success:(res)=>{
        console.log(res.data.data.content)
        this.setData({
          myList:[...this.data.myList,...res.data.data.content]
        })
      }
    }) 
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
    if(this.data.isloading) return;
    if((this.data.getAll=="selected")&&(this.data.Allend==false)){
      this.setData({
        PageofAll : this.data.PageofAll + 1
      })
      this.getAllList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    
  }
})