// pages/personal/personal.js
import request from '../../utils/request'
// 声明变量计算手指移动
let startY = 0  //手指开始的坐标
let moveY = 0   //手指移动的实时坐标
let moveDistance = 0  //手指移动的距离
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTranslateY: 'translateY(0)',
    coverTransition: '',
    userInfo: {},
    recentPlayList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 读取本地信息
    let userInfo = wx.getStorageSync('USERINFO')
    // 判断用户是否登录
    if(userInfo.nickname){
      // 更新用户信息
      this.setData({
        userInfo
      })
      // 获取用户最近播放信息
      this.getRecentPlayData(this.data.userInfo.userId)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  // 获取用户最近播放记录的回调
  async getRecentPlayData(userId){
    let index = 0
    let result = await request('/user/record',{uid: userId, type: 0})
    this.setData({
      recentPlayList: result.allData.slice(0, 10).map(item => {
        item.id = index++
        return item
      })
    })
  },

  // 手指点击开始
  handleTouchStart(event){
    // 清除过渡
    this.setData({
      coverTransition: ''
    })
    // 获取手指开始位置
    startY = event.touches[0].clientY
  },
  // 手指移动事件
  handleTouchMove(event){
    // 获取手指实时位置
    moveY = event.touches[0].clientY

    // 计算手指移动的距离
    moveDistance = moveY - startY
    // console.log(moveDistance);
    // 限定移动位置
    if(moveDistance < 0){
      return 
    }
    if(moveDistance >= 80){
      moveDistance = 80
    }
    // 设置移动位置
    this.setData({
      coverTranslateY: `translateY(${moveDistance}rpx)`,
    })
  },
  // 手指点击结束
  handleTouchEnd(){
    // 恢复位置
    this.setData({
      coverTranslateY: 'translateY(0)',
      coverTransition: 'transform 1s linear'
    })
  },

  // 跳转登录页
  toLogin(){
    // 判断是否登录
    if(this.data.userInfo.nickName){
      return
    }
    wx.navigateTo({
      url: '/pages/login/login',
    })
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