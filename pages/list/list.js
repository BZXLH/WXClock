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
<<<<<<< HEAD
    pageSize:10,
    allList:[],
    myList:[],
    isloading:false,
    AlltoBottom:false
=======
    PageofMy:1,
    pageSize:14,
    allList:[],
    myList:[],
    isloading:false,
    AlltoBottom:false,
    MytoBottom:false,
    //两个列表的滚动条高度
    Allheight:0,
    Myheight:0,
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
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

<<<<<<< HEAD
=======
  //左右切换页面
  

  // 获取滚动条当前位置
  onPageScroll:function(e){
    console.log(e)
      if(this.data.getAll=="selected"){
        this.setData({
          Allheight:e.scrollTop
        })
      }else if(this.data.getMy=="selected"){
        this.setData({
          Myheight:e.scrollTop
        })
      }
  },

>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
  showAllList(){
    this.setData({
      getAll:"selected",
      getMy:"unselected",
      listCondition:true,
    })
<<<<<<< HEAD
=======
    wx.pageScrollTo({ 
      duration : 0,
      scrollTop : this.data.Allheight
    })
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
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
<<<<<<< HEAD
  },

  getMyList(){
=======
    wx.pageScrollTo({ 
      duration : 0,
      scrollTop : this.data.Myheight
    })
  },

  getMyList(){
    this.setData({
      isloading:true
    })
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
    var header = {
      'content-type': 'application/json',
      'Authorization': wx.getStorageSync("token")
    }
    wx.request({
      url: 'https://philil.com.cn/clockin_app/api//clockin/self',
      method:'get',
      data:{
<<<<<<< HEAD
        pageAt : 1,
        pageSize : 7,
      },
      header: header,
      success:(res)=>{
        console.log(res.data.data.content)
        this.setData({
          myList:[...this.data.myList,...res.data.data.content]
=======
        pageAt : this.data.PageofMy,
        pageSize : this.data.pageSize,
      },
      header: header,
      success:(res)=>{
        console.log(res)
        console.log(res.data.data.content)
        this.setData({
          myList:[...this.data.myList,...res.data.data.content],
          MytoBottom :res.data.data.last
        })
      },
      complete:()=>{
        this.setData({
          isloading:false
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
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
<<<<<<< HEAD
    if((this.data.getAll=="selected")&&(this.data.Allend==false)){
      this.setData({
=======
    if((this.data.getAll=="selected")&&(this.data.AlltoBottom==false)){
    this.setData({
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
        PageofAll : this.data.PageofAll + 1
      })
      this.getAllList()
    }
<<<<<<< HEAD
=======
    if((this.data.getMy=="selected")&&(this.data.MytoBottom==false)){
      this.setData({
          PageofMy : this.data.PageofMy + 1
        })
        this.getMyList()
      }
>>>>>>> 0dabba9b0a80830be98b575385d5b9a3aa358b5e
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    
  }
})