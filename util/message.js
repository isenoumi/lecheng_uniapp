// import {
//   appid,
//   secret
// } from "@/conf/website.js"
const appid = 'wx3a8ad5a845cb4ea4'
const secret = '4d881568f5a0747353e43ebc219b0171'

/**
 * @description 用户打开订阅提示
 * @param {Array}tmplId  模版id
 * */
export const openSubscription = (tmplIds) => {
  uni.requestSubscribeMessage({
    tmplIds: tmplIds,
    success: (res) => {
      // 订阅成功
      console.log(res);
    },
    fail: (err) => {
      console.log(err);
      uni.showToast({
        title: err,
        duration: 2000,
        icon: 'error'
      });
    }
  })
}

/**
 * @description 获取微信的access_token
 * */
function get_wx_access_token() {
  return uni.request({
    method: 'get',
    url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`,
    dataType: 'json',
    timeout: 30000
  }).then(res => {
    let [err, success] = res
    if (success.statusCode == 200) {
      return success.data.access_token
    }
  })
}

/**
 * @description 发送订阅消息
 * @param {String}miniprogram_state  小程序状态
 * @param {String}openid  用户openid
 * @param {String}tmplId  模版id
 * @param {String}params  传递参数
 * */
export const send_msg = async ({
  miniprogram_state = 'developer',
  openid,
  tmplId,
  params
}) => {
  let wx_access_token = await get_wx_access_token()
  return uni.request({
    url: `https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${wx_access_token}`,
    method: "POST",
    data: {
      access_token: wx_access_token, //access_token
      touser: `${openid}`, //用户openid
      template_id: `${tmplId}`, //模板ID
      page: "", //进入哪个页面   非必传
      data: params //自己选择模版的参数 'key':{value:'...'}
        ,
      miniprogram_state: "developer", //developer为开发版；trial为体验版；formal为正式版；非必传
    }
  })
}