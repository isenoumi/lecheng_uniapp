import RequestService from './http.multi.js';
import {
  getEnv
} from '@/common/config/getEnv';


const mainRequest = new RequestService(getEnv('BASE_API_URL3'));


/********************登陆注册基础相关********************/
export const login = (params = {}) => mainRequest.post('/login', params); //登录
export const message = (params = {}) => mainRequest.get('/user/message', params); //获取未读消息

/********************课程活动定制********************/
export const = (params = {}) => mainRequest.get('/user/message', params); //获取未读消息
// http://192.168.100.13:8087/mission_gh/mission/bkbActivityCustomization/list