/**
 * 响应拦截
 * @param {Object} http 
 */
import authorize from "@/common/auth.js"
let refreshNum = 0;
import {
  getEnv
} from '@/common/config/getEnv';


// 是否正在刷新的标记
let isRefreshing = false
//重试队列
let requests = []


module.exports = (vm) => {
  uni.$u.http.interceptors.response.use((response) => {
    /* 对响应成功做点什么 可使用async await 做异步操作*/
    const data = response.data

    // 自定义参数
    if (data.error_code !== 0) { // 服务端返回的状态码不等于200，则reject()
      uni.showToast({
        title: data.msg,
        icon: 'none'
      })
      return Promise.reject(data)
    }

    return data || {}
  }, async (response) => {
    const statusCode = response.statusCode;
    if (statusCode === 401) {
      if (response.data.error_code == '10002') {
        let config = response.config;
        if (!isRefreshing) {
          isRefreshing = true
          //调用刷新token的接口
          return authorize.login().then(res => {
            const {
              data,
              error_code
            } = res;
            const Authorization = data.token;
            config.header.Authorization = Authorization
            // token 刷新后将数组的方法重新执行
            requests.forEach((cb) => {
              cb(Authorization)
            })
            requests = [] // 重新请求完清空
            return uni.$u.http.request(config)
          }).catch(err => {
            return Promise.reject(err)
          }).finally(() => {
            isRefreshing = false
          })
        } else {
          // 返回未执行 resolve 的 Promise
          return new Promise(resolve => {
            // 用函数形式将 resolve 存入，等待刷新后再执行
            requests.push(Authorization => {
              config.header.Authorization = `${Authorization}`
              resolve(uni.$u.http.request(config))
            })
          })
        }



      }

    }

    const data = response.data
    if (data && data.hasOwnProperty('error_code') && data.error_code !==
      0) { // 服务端返回的状态码不等于200，则reject()
      // uni.showToast({
      //     title: data.msg,
      //     icon: 'none'
      // })
      return Promise.reject(data)
    } else {
      // uni.showToast({
      //     title: '网络错误',
      //     icon: 'none'
      // })
      return Promise.reject()
    }
    /*  对响应错误做点什么 （statusCode !== 200）*/

  })
}


async function RefreshToken(response) {
  const res = await authorize.login()
  const {
    data,
    error_code
  } = res;
  if (error_code === 0) {
    const Authorization = data.token;
    let config = response.config;
    config.header.Authorization = Authorization
    var newData = await uni.$u.http.request(config)
    return newData
  } else {
    uni.showToast({
      title: '登录失效,请重新登录',
      icon: 'none'
    })

    uni.redirectTo({
      url: "/pages/login/login"
    })
  }

}