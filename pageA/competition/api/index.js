import request from '@/util/newRequest.js'

// 登录方法
// export function addCheck(data) {
//   return request({
//     'url': '/mission_gh/xcx_api/bkbPunchCardRecord/add',
//     'method': 'post',
//     data: data
//   })
// }

export function extraPointsForNewAnswers(data) {
  return request({
    'url': '/mission_gh/xcx_api/bkbChoiceqst_answer/extraPointsForNewAnswers',
    'method': 'get',
    params: data
  })
}
export function answerPoints(data) {
  return request({
    'url': '/mission_gh/xcx_api/bkbChoiceqst_answer/answerPoints',
    'method': 'get',
    params: data
  })
}