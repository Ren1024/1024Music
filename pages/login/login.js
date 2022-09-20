// pages/login/login.js
import request from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: '',
    // userInfo: {}
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
  async login(){
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
    }
    // 后台验证
    let result = await request('/login/cellphone',{phone, password, isLogin:true})
    if(result.code === 200){
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      })
      // 保存用户信息到本地
      // console.log(result);
      wx.setStorageSync('USERINFO', result.profile)
      // wx.setStorageSync('COOKIE', result.cookie)
      // 跳转回个人中心页
      this.time = setTimeout(() => {
        wx.reLaunch({
          url: '/pages/personal/personal',
        })
      },1000)
    }else {
      wx.showToast({
        title: result.message,
        icon: 'error'
      })
    }
    // 更新信息
    // console.log(result);

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