import request from '@/util/newRequest.js'


export function addCategorizeIntoHousehold(data) {
  return request({
    'url': '/mission_gh/mission/bkbCategorizeIntoHousehold/add',
    'method': 'POST',
    data
  })
}
// export function requestTime(data) {
//   return request({
//     'url': '/mission_gh/xcx_api/bkbPunchCardRecord/requestTime',
//     'method': 'get',
//     params: data
//   })
// }


// export function activitylist(data) {
//   return request({
//     'url': '/mission_gh/v1/activity/list',
//     'method': 'get',
//     params: data
//   })
// }