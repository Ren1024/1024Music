// pages/video/video.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList:[], //视频标签列表
    currentId:'', //选中的标题id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getVideoGroupList()
  },

  // 获取视频标签列表
  async getVideoGroupList(){
    let result = await request('/video/group/list')
    // 更新videoGroupList数据
    this.setData({
      videoGroupList: result.data.slice(0, 14),
      // 更新选中标题
      currentId: result.data[0].id
    })
  },

  // 选中标题
  currentText(event){
    // 获取选中的id值
    let currentId = event.currentTarget.id
    // console.log(event);
    this.setData({
      // 右移运算符，（转化为二级制，向右移动两位，）强制类型数据转换为number类型
      currentId: currentId >>> 0
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