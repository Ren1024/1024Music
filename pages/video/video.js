import request from '../../utils/request'
// pages/video/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList:[], //导航列表
    currentId:'',
    videoList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getNavGroupList()
  },

  // 获取导航列表 /video/group/list
  async getNavGroupList(){
    let result = await request('/video/group/list')
    // console.log(result);
    // 更新数据
    this.setData({
      navList: result.data.slice(0, 14),
      currentId: result.data[0].id
    })
    // 拿到导航id后，获取视频列表
    this.getVideoGroupList(this.data.currentId)
  },
  // 点击切换导航标题
  currentTitle(event){
    let currentId = event.currentTarget.id
    // console.log(event);
    this.setData({
      // 向右位移0位，转化成number类型
      currentId: currentId >>> 0
    })
  },
 
  // 获取视频
  async getVideoGroupList(currentId){
    let cookies = wx.getStorageSync('COOKIES')
    let result = await request('/video/group', {id: currentId})
    console.log(result);
    // 更新数据
    this.setData({
      videoList: result.datas
    })
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})