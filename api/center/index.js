import {
  request
} from '@/util/request.js'
/**
 * 获取积分兑换记录
 *
 * @param params
 */
export function getPointRecord(params) {
  return request({
    url: '/mission_gh/p/order/pointRecord',
    method: 'get',
    data: params,
  });
}