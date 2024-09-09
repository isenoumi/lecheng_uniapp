import {
  getEnv
} from '@/common/config/getEnv.js'
const baseUrl = getEnv('BASE_API_URL')
export const request = ({
  url,
  method,
  data
}) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + url,
      data: data,
      method: method,
      header: {
        // token: uni.getStorageSync('token') != null ? uni.getStorageSync('token') : ''
        'x-Resource-Token': uni.getStorageSync('xtoken') ? uni.getStorageSync('xtoken') : '',
      },
      success: (res) => {
        resolve(res)
      },
      fail: (error) => {
        reject(error)
      }
    })
  })
}

export default request