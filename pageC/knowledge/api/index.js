import request from '@/util/newRequest.js'


export function listbycustomer(data) {
  return request({
    'url': '/mission_gh/v1/sy/cultura/listbycustomer',
    'method': 'GET',
    data
  })
}