import PubSub from 'pubsub-js'

import request from '../../../utils/request'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    day:'',
    month:'',
    daliySongs:[],  //每日推荐歌曲
    index:'',  //当前歌曲的索引
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

    // 订阅者，接收切换类型
    PubSub.subscribe('switchType', (msg, switchType) => {
      // 获取歌曲列表
      let {daliySongs, index} = this.data
      if(switchType === 'pre'){//上一页
        (index === 0) && (index = daliySongs.length)
        index -= 1
      }else {//下一页
        (index === daliySongs.length - 1) && (index = -1)
        index += 1
      }
      // 根据索引查找需要的音乐的id
      let musicId = daliySongs[index].id
      // 更新数据
      this.setData({index})
      // 发布消息，
      PubSub.publish('musicId', musicId)
    })
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
    // let song = event.currentTarget.dataset.song
    // let musicId = event.currentTarget.dataset.id
    let {song, id, index} = event.currentTarget.dataset
    // 更新index数据
    this.setData({index})
    wx.navigateTo({
      // url: '/pages/songDetail/songDetail?song=' + JSON.stringify(song),
      url: '/songPackages/pages/songDetail/songDetail?musicId=' + id,
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