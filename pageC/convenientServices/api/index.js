import request from '@/util/newRequest.js'


export function getInfo(data) {
  return request({
    'url': '/mission_gh/mission/bkbDeclareRecord/queryById',
    'method': 'get',
    params: data
  })
}