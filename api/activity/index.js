import {
  request
} from '@/util/request.js'
/**
 * 获取活动列表
 *
 * @param params
 */
export function getActivityList(params) {
  return request({
    url: '/mission_gh/wx/bkbActivityCustomization/list',
    method: 'post',
    data: params,
  });
}
/**
 * 预约活动
 *
 * @param params
 */
export function bookActivity(params) {
  return request({
    url: '/mission_gh/wx/bkbActivityCustomization/activityPerson',
    method: 'get',
    data: params,
  });
}
/**
 * 默认活动
 *
 * @param params
 */
export function getDefalutActivity(params) {
  return request({
    url: '/mission_gh/wx/bkbActivityCustomization/activityPersonAcquiesce',
    method: 'get',
    data: params,
  });
}
/**
 * 默认活动
 *
 * @param params
 */
export function getActivityQueryById(params) {
  return request({
    url: '/mission_gh/wx/bkbActivityCustomization/queryById',
    method: 'get',
    data: params,
  });
}