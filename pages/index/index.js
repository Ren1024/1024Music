// pages/index/index.js
import request from '../../utils/request'
Page({

  //页面的初始数据
  data: {
    banners:[], //轮播图
    recommendList:[],  //推荐歌曲列表
    topList:[], //排行榜
  },

  //生命周期函数--监听页面加载
  onLoad(options) {
    // 发请求获取banner
    this.getInitData()
  },
  // 页面初始化请求数据
  async getInitData(){
    // 请求获取轮播图
    let result = await request('/banner', {type: 2})
    this.setData({
      banners: result.banners
    })

    // 请求获取歌曲列表
    result = await request('/personalized')
    this.setData({
      recommendList: result.result
    })

    // 请求获取排行榜数据
    let resultArray = []
    result = await request('/toplist/detail')
    // console.log(result);
    // resultArray.push()
    resultArray = result.list.slice(0, 5).map(item => {
      return {
        name:item.name,
        tracks:item.tracks,
        coverImgUrl:item.coverImgUrl
      }
    })
    console.log(resultArray);
      // 循环内跟新。初次渲染事件短，但多次渲染页面，影响性能
      this.setData({
        topList: resultArray
      })
    // console.log(resultArray);
    // 外部更新，渲染次数少，但网络不好，初次渲染事件有可能白屏
    // this.setData({
    //   topList: resultArray
    // })
  },

  // 跳转到推荐歌曲页面
  toRecommendSong(){
    wx.navigateTo({
      url: '/songPackages/pages/recommendSong/recommendSong',
    })
  },

  //生命周期函数--监听页面初次渲染完成
  onReady() {

  },

  // 生命周期函数--监听页面显示
  onShow() {

  },

  //生命周期函数--监听页面隐藏
  onHide() {

  },

  //生命周期函数--监听页面卸载
  onUnload() {

  },

  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh() {

  },

  //页面上拉触底事件的处理函数
  onReachBottom() {

  },

  //用户点击右上角分享
  onShareAppMessage() {

  }
})