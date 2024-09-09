import request from '@/util/newRequest.js'


export function getMessageList(data) {
  return request({
    'url': '/mission_gh/mission/bkbMessage/byPhone',
    'method': 'GET',
    data
  })
}
export function getMessagePoints(data) {
  return request({
    'url': '/mission_gh/mission/bkbMessage/byPhoneRedemption',
    'method': 'GET',
    data
  })
}
export function getMessageSys(data) {
  return request({
    'url': '/mission_gh/mission/bkbMessage/byPhoneWork',
    'method': 'GET',
    data
  })
}
export function getMessageInfo(data) {
  return request({
    'url': '/mission_gh/mission/bkbMessage/queryById',
    'method': 'GET',
    data
  })
}