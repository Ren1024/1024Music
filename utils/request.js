// 封装发送ajax请求的功能函数
/* 
  1、封装功能函数
    1）功能点明确
    2）函数内部保留固定的代码（静态代码）
    3）将动态数据抽取出来，由使用者提供最终的数据，以形参的形式提供
    4）一个良好的功能函数应该设置形参的默认值
  2、封装功能组件
    1）功能点明确
    2）组件内部应该保留静态代码
    3）将动态的数据提取成props参数，由使用者提供最终的数据
    4)一个良好的组件应该设置组件props数据的必要性及数据类型
*/
import config from './config'
export default function(url, data={}, method='GET'){
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url, //内网地址
      // url: config.mobileHost + url, //外网地址
      data,
      method,
      header: {
        cookie: wx.getStorageSync('COOKIES') ? wx.getStorageSync('COOKIES').find(item => item.indexOf('MUSIC_U') !== -1) : ''
      },
      success: (res) => {
        // console.log('成功',res);
        if(data.isLogin){
          // 储存cookie信息
          wx.setStorageSync('COOKIES', res.cookies)
        }
        resolve(res.data)
      },
      fail: (err) => {
        // console.log('失败',err);
        reject(err)
      }
    })
  })
}
