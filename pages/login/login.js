// pages/login/login.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  // 收集用户数据
  handleInput: function(event){
    // console.log(event);
    let type = event.currentTarget.id
    this.setData({
      [type]: event.detail.value
    })
  },

  // 登录回调
  login(){
    // 收集数据
    let {phone, password} = this.data
    // 前端验证
    // 手机号验证
    if(!phone){
      wx.showToast({
        title: '手机号不能为空',
        icon: 'error'
      })
      return
    }
    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/
    if(!phoneReg.test(phone)){
      wx.showToast({
        title: '手机号格式错误',
        icon: 'error'
      })
      return 
    }
    // 密码验证
    if(!password){
      wx.showToast({
        title: '密码不能为空',
        icon: 'error'
      })
      return 
    }
    // 后台验证
    // let result = request('/login/cellphone',{phone,password})
    // 后台接口错误，改用用户授权
    
    wx.getUserProfile({
      desc: '获取用户信息',
      success: (res) => {
        // console.log('成功', res);
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        })
        // 添加用户userId，用于获取最近播放列表
        res.userInfo.userId = 2081801144
        wx.setStorageSync('USERINFO', res.userInfo)
        this.time = setTimeout(() => {
          wx.reLaunch({
            url: '/pages/personal/personal',
          })
        },1000)
      },
      fail: (err) => {
        // console.log('失败', err);
        wx.showToast({
          title: '登录失败',
          icon: 'error'
        })
      }
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
    clearTimeout(this.time)
    this.time = null
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