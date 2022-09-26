import PubSub from 'pubsub-js'
import moment from 'moment'
import request from '../../utils/request'
// 生命全局app对象
let globalApp = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isPlay: false, //标记是否播放，旋转
    song:{},  //音乐详情
    musicId:'',  //音乐的id
    musicLink: '', //音乐链接
    currentTime: '00:00', //音乐播放时长
    duration: '00:00',  //音乐总时长
    progressWidth: '0', //实时进度条长度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   /* 
      let song = options.song
      console.log(song);
      console.log(JSON.parse(song)); 
    */
    let musicId = options.musicId
    this.setData({
      musicId
    })
    // 获取音乐详情
    this.getMusicInfo(musicId)
    // 判断当前音乐是否在播放
    if(globalApp.globalData.isMusicPlay && globalApp.globalData.musicId === musicId){
      // 当前音乐在播放
      this.setData({
        isPlay: true
      })
    }
    // 创建音频管理器
    this.backgroundAudioManager = wx.getBackgroundAudioManager()
    // 监听背景音乐的播放/暂停/停止的事件
    this.backgroundAudioManager.onPlay(() => {
      this.changeMusicIsPlay(true)
      globalApp.globalData.musicId = musicId
    })
    this.backgroundAudioManager.onPause(() => {
      this.changeMusicIsPlay(false)
    })
    this.backgroundAudioManager.onStop(() => {
      this.changeMusicIsPlay(false)
    })
    // 监听音乐播放的时长
    this.backgroundAudioManager.onTimeUpdate(() => {
      // console.log('duration',this.backgroundAudioManager.duration);
      // console.log('currentTime',this.backgroundAudioManager.currentTime);
      let currentTime = moment(this.backgroundAudioManager.currentTime*1000).format('mm:ss')
      let progressWidth = this.backgroundAudioManager.currentTime / this.backgroundAudioManager.duration * 440
      this.setData({
        currentTime,
        progressWidth
      })
    })

    // 订阅消息，获取musicId
    PubSub.subscribe('musicId', (msg, musicId) => {
      this.getMusicInfo(musicId)

      // 自动播放最新的音乐
      this.playOrPauseMusic(true, musicId)
    })
  },

  // 封装改变播放状态的功能函数
  changeMusicIsPlay(isPlay){
    this.setData({
      isPlay
    })
    globalApp.globalData.isMusicPlay = isPlay
  },

  // 点击播放或暂停
  handleMusicPlay(){
    let isPlay = !this.data.isPlay
    this.setData({
      isPlay
    })
    let {musicId, musicLink} = this.data
    this.playOrPauseMusic(isPlay, musicId, musicLink)
  },

  // 发请求获取音乐详情信息
  async getMusicInfo(musicId){
    let songData = await request('/song/detail',{ids: musicId})
    let duration = moment(songData.songs[0].dt).format('mm:ss')
    // console.log(songData);
    // 更新数据
    this.setData({
      song: songData.songs[0],
      duration
    })
    // 动态设置navtitle
    wx.setNavigationBarTitle({
      title: this.data.song.name,
    })
  },

  
  // 实现播放或暂停音乐的功能函数
  async playOrPauseMusic(isPlay, musicId, musicLink){
    // debugger
    if(isPlay){//播放音乐
      // 播放暂停携带musicLink，切歌不携带，优化请求次数
      // debugger
      if(!musicLink){
        // 获取音乐播放地址
        let musicUrlData = await request('/song/url/v1',{id: musicId, level: 'exhigh'})
        musicLink = musicUrlData.data[0].url 
        // 更新到data
        this.setData({musicLink})
      }
      // debugger
      this.backgroundAudioManager.src = musicLink
      this.backgroundAudioManager.title = this.data.song.name
      // 把播放状态记录到全局对象
      // globalApp.globalData.isMusicPlay = true
      // globalApp.globalData.musicId = musicId
    }else {//暂停音乐
      this.backgroundAudioManager.pause()
      // globalApp.globalData.isMusicPlay = false
      // globalApp.globalData.musicId = musicId
    }
  },

  // 切换歌曲
  switchMusic(event){
    let type = event.currentTarget.id
    // 发布者，切换歌曲
    PubSub.publish('switchType', type)
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