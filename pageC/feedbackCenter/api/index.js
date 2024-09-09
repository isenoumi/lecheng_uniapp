import request from '@/util/newRequest.js'


export function getFeedbackList(data) {
  return request({
    'url': '/mission_gh/mission/bkbDeclareRecord/locationsServices',
    'method': 'get',
    params: data
  })
}
export function getFeedbackInfo(data) {
  return request({
    'url': '/mission_gh/mission/bkbDeclareRecord/getOneLocationsService',
    'method': 'get',
    params: data
  })
}