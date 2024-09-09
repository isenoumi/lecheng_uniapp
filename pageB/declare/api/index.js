import request from '@/util/newRequest.js'


export function addbkbDeclareRecord(data) {
  return request({
    'url': '/mission_gh/mission/bkbDeclareRecord/add',
    'method': 'POST',
    data
  })
}
export function bkbPointStaff(data) {
  return request({
    'url': '/mission_gh/mission/bkbPointStaff/byphone',
    'method': 'get',
    params: data
  })
}


// export function activitylist(data) {
//   return request({
//     'url': '/mission_gh/v1/activity/list',
//     'method': 'get',
//     params: data
//   })
// }