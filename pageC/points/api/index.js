import request from '@/util/newRequest.js'


export function getPoints(data) {
  return request({
    'url': '/mission_gh/mission/bkbOperatingRecord/getItToday',
    'method': 'get',
    params: data
  })
}
export function getCarbon(data) {
  return request({
    'url': '/mission_gh/mission/bkbDeclareRecord/queryById',
    'method': 'get',
    params: data
  })
}
export function getRanking(data) {
  return request({
    'url': '/mission_gh/v1/myPointsRank',
    'method': 'get',
    params: data
  })
}
export function getUserInfo(data) {
  return request({
    'url': '/mission_gh/v1/user/info',
    'method': 'get',
    params: data
  })
}