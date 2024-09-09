import RequestService from './http.multi.js';
import {
  getEnv
} from '@/common/config/getEnv';


const mainRequest = new RequestService(getEnv('BASE_API_URL'));





/********************消息管理********************/
export const messagelist = (params = {}) => mainRequest.get('/notice/list', params); //活动列表
export const messageone = (params = {}) => mainRequest.get('/notice/one', params); //活动详情
/********************积分管理********************/
export const ranking = (params = {}) => mainRequest.get('/ranking', params); //获取积分排名
export const view_click = (params = {}) => mainRequest.post('/view_click', params); //点击文章获取积分
export const add_points = (params = {}) => mainRequest.post('/user/add_points', params); //获取积分

export const activityPerson = (params = {}) => mainRequest.get('/mission_gh/wx/bkbActivityCustomization/activityPerson', params); //获取积分
export const imgUpload = (params = {}) => mainRequest.post('/mission_gh/wx/WxApi/imgUpload', params); //拍照打卡