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
    videoId:'', //当前播放视频id
    videoTime: [], //记录视频播放时间,
    isTriggered:false, //是否下拉刷新
    offset: 0, //视频分页参数
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
    // 加工数据
    let newNavList = result.data.slice(0, 14)
    // 更新数据
    this.setData({
      navList: newNavList,
      currentId: newNavList[0].id
    })
    // 拿到导航id后，获取视频列表
    this.getVideoGroupList()
  },

  // 点击切换导航标题
  currentTitle(event){
    // loding效果
    wx.showLoading({
      title: '正在加载',
    })
    let currentId = event.currentTarget.id.slice(3)
    // console.log(event);
    this.setData({
      // 向右位移0位，转化成number类型
      currentId: currentId >>> 0,
      // 清空上次的视频列表数据
      videoList: []
    })
    this.getVideoGroupList()
  },
  
  // 获取视频
  async getVideoGroupList(newOffset = 0){
    // 获取数据
    let {videoList, offset} = this.data
    // 发请求拿数据
    let result = await request('/video/timeline/recommend', {offset: newOffset})
    // 加工数据，添加每个对象id
    let newVideoList = result.datas.map(item => {
      item.id = item.data.vid
      return item
    })
    if(newOffset > 0){
      videoList.push(...newVideoList)
    }else {
      videoList = newVideoList
    }
    offset = newOffset
    // 关闭loding
    wx.hideLoading()
    // 更新数据
    this.setData({
      videoList,
      offset,
      isTriggered: false
    })
  },

  // 视频播放或暂停
  changeVideoPlay(event){
    // console.log('@@');
    /* 
      需求：
          当播放新的视频时，停止播放上一个视频
      思路：
          1）找到关闭视频的方法
              wx.createVideoContext(vid)
          2）必须找到上一个视频对象，关闭它
              先获取视频对象，在创建新的视频对象，如果有，说明是上一次的视频对象
    */
    let vid = event.currentTarget.id
    // this.VideoContext && this.vid !== vid && this.VideoContext.stop()
    // 重复点击不创建新的视频对象
  
    // 更新videoId 
    this.setData({
      videoId: vid
    })
    // if(this.vid === vid){
    //   return
    // }
    // this.vid = vid
    // 创建video的实例对象
    this.VideoContext = wx.createVideoContext(vid)
    // 判断视频是否播放过，如果是，跳转到上次位置
    // 获取记录时长数据
    let {videoTime} = this.data
    // 判断是否有播放记录
    let videoTimeItem = videoTime.find(item => item.vid === vid)
    // 如果有，跳转到指定播放记录
    if(videoTimeItem){
      this.VideoContext.seek(videoTimeItem.currentTime)
    }
    this.VideoContext.play()
    
  },

  // 更新记录视频播放时间
  handleUpdateTime(event){
    // console.log(event);
    // detail:
    //   currentTime: 3.215562
    //   duration: 345.709
    // 获取videoTime
    let {videoTime} = this.data

    // 创建对象，包含视频id和播放时长
    let timeObj = {
      vid: event.currentTarget.id,
      currentTime: event.detail.currentTime
    }
    // 判断当前视频是否在videoTime中
    let videoTimeItem = videoTime.find(item => item.vid === event.currentTarget.id)
    if(videoTimeItem){
      // 存在
      videoTimeItem.currentTime = event.detail.currentTime
    }else {
      // 不存在
      videoTime.push(timeObj)
    }
    // 更新数据
    this.setData({
      videoTime
    })

  },

  // 视频播放完成的回调
  handleEnded(event){
    // 获取记录视频时长对象
    let {videoTime} = this.data
    // 通过findIndex取到下标，再通过splice删除
    videoTime.slipce(videoTime.findIndex(item => item.vid === event.currentTarget.id), 1)
  },

  //下拉刷新回调
  hindleRefresh(){
    // console.log('scroll-view下拉刷新');
    // 重新发送请求获取视频
    this.getVideoGroupList()
  },

  // 滑动触底，加载更多
  async handleTolower(){
    // console.log('滑动触底了');
    let {offset} = this.data
    offset++
    this.getVideoGroupList(offset)
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
  onShareAppMessage({from}) {
    console.log(from);
    if(from === 'button'){
      return {
        title:'button转发内容',
        path:'/pages/video/video.js',
        imageUrl:'/static/images/nvsheng.jpg'
      }
    }else {
      return {
        title:'menu转发内容',
        path:'/pages/video/video.js',
        imageUrl:'/static/images/nvsheng.jpg',
      }
    }
  }
})