// pages/personal/personal.js
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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