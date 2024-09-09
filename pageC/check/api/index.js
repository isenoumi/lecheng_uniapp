import request from '@/utils/newRequest.js'

// 登录方法
// export function addCheck(data) {
//   return request({
//     'url': '/mission_gh/xcx_api/bkbPunchCardRecord/add',
//     'method': 'post',
//     data: data
//   })
// }

export function addCheck(data) {
  return request({
    'url': '/mission_gh/xcx_api/bkbPunchCardRecord/shiyangMap',
    'method': 'get',
    params: data
  })
}
export function requestTime(data) {
  return request({
    'url': '/mission_gh/xcx_api/bkbPunchCardRecord/requestTime',
    'method': 'get',
    params: data
  })
}


export function activitylist(data) {
  return request({
    'url': '/mission_gh/v1/activity/list',
    'method': 'get',
    params: data
  })
}