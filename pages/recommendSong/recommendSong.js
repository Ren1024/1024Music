// pages/recommendSong/recommendSong.js
import request from '../../utils/request'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    day:'',
    month:'',
    daliySongs:[],  //每日推荐歌曲
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取日期
    this.setData({
      day: new Date().getDate(),
      month: new Date().getMonth() + 1
    })
    // 初始化每日推荐歌曲
    this.getDaliySong()
  },

  // 获取每日推荐歌曲daliySongs
  async getDaliySong(){
    let daliySong = await request('/recommend/songs')
    // 更新数据
    this.setData({
      daliySongs: daliySong.data.dailySongs
    })
  },

  // 跳转到songDetail
  toSongDetail(event){
    let song = event.currentTarget.dataset.song
    let musicId = event.currentTarget.dataset.id
    wx.navigateTo({
      // url: '/pages/songDetail/songDetail?song=' + JSON.stringify(song),
      url: '/pages/songDetail/songDetail?musicId=' + musicId,
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