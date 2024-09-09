import RequestService from './http.multi.js';
import {
  getEnv
} from '@/common/config/getEnv';


const mainRequest = new RequestService(getEnv(' BASE_API_URL2'));


/********************我的页面********************/
export const edit = (params = {}) => mainRequest.get('/mission_gh/wx/WxApi/edit', params); //我的-个人信息提交
export const ranking = (params = {}) => mainRequest.get('/mission_gh/v1/ranking', params); //积分排行
export const add_point = (params = {}) => mainRequest.post('/mission_gh/v1/user/add_points', params); //保存评论