import config from '@/config'
import errorCode from '@/util/errorCode'
import {
  toast,
  showConfirm,
  tansParams
} from '@/util/common'

let timeout = 10000
const baseUrl = config.baseUrl

const request = config => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  config.header = config.header || {}
  if (uni.getStorageSync('xtoken') && !isToken) {
    config.header['Authorization'] = 'Bearer ' + uni.getStorageSync('xtoken')
    config.header['x-Resource-Token'] = uni.getStorageSync('xtoken')
  }
  // get请求映射params参数
  if (config.params) {
    let url = config.url + '?' + tansParams(config.params)
    url = url.slice(0, -1)
    config.url = url
  }
  console.log(config);
  return new Promise((resolve, reject) => {

    uni.request({
        method: config.method || 'get',
        timeout: config.timeout || timeout,
        url: config.baseUrl || baseUrl + config.url,
        data: config.data,
        header: config.header,
        dataType: 'json'
      }).then(response => {
        let [error, res] = response
        console.log('reee', error, res);
        if (error) {
          console.log(error);
          // toast('后端接口连接异常')
          // reject('后端接口连接异常')
          toast(error)
          reject(error)
          return
        }
        const code = res.data.code || res.statusCode || 200
        console.log('...', code);
        // const msg = errorCode[code] || res.data.msg || errorCode['default']
        const msg = res.data.msg || res.data.message
        if (code === 401) {
          showConfirm('登录状态已过期，您可以继续留在该页面，或者重新登录?').then(res => {
            if (res.confirm) {
              uni.reLaunch({
                url: '/pages/center/index'
              })
            }
          })
          // reject('无效的会话，或者会话已过期，请重新登录。')
          reject(msg)
        } else if (code === 500) {
          toast(msg)
          reject('500')
        } else if (code !== 200) {
          toast(msg)
          reject(code)
        }
        resolve(res.data)
      })
      .catch(error => {
        let {
          message
        } = error
        // if (message === 'Network Error') {
        //   message = '后端接口连接异常'
        //   uni.navigateTo({
        //     url: '/pages/login/index'
        //   })
        // } else if (message.includes('timeout')) {
        //   message = '系统接口请求超时'
        // } else if (message.includes('Request failed with status code')) {
        //   message = '系统接口' + message.substr(message.length - 3) + '异常'
        // }
        toast(message)
        reject(error)
      })
  })
}

export default request