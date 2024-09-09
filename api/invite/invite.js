import {
  request
} from '@/util/request.js'
/**
 * 获取二维码
 *
 * @param params
 */
export function getInvitationCode(params) {
  return request({
    // url: `/mission_gh/xcx_api/file/getInvitationCode?phone=${phone}`,
    url: `/mission_gh/xcx_api/file/getInvitationCode`,
    method: 'post',
    data: params,
  });
}