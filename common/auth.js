//authorize.js

import App from "@/App.vue"
import {
  bindphone as bindphoneAct,
  login as loginAct
} from '@/common/api.js';

// 同步获取storge
const getStorageSync = (key) => {
  try {
    const value = uni.getStorageSync(key);
    if (value) {
      return value;
    }
    return false;
  } catch (e) {
    console.log('获取storge失败')
  }
  return false;
}

// 同步存储storge
const setStorageSync = (key, value) => {
  try {
    // uni.setStorageSync(key, value);
    return true;
  } catch (e) {
    console.log('存储storge失败')
  }
  return false;
}

// 检测sessionkey是否过期 1未过期 0已过期
const checkSessionKey = () => {
  return new Promise((resolve, reject) => {
    const user = getStorageSync('user'); // 用户缓存信息
    if (user) {
      uni.checkSession({
        success() {
          // App.setUser(user);
          resolve(user); //状态未过期
        },
        fail() {
          resolve(false); //状态已过期
        }
      })
    } else {
      resolve(false); //未存贮
    }
  })
}

// 登录授权
const login = (params) => {
  return new Promise((resolve, reject) => {
    getCode().then((code) => {
      loginAct({
        code: code,
      }).then((res) => {
        // console.log(res.data.user.points,'我是登录')
        uni.setStorageSync('points', res.data.user.points)
        uni.setStorageSync('token', res.data.token)
        getCurrentPages()[0].$vm.$store.commit('login',
          res.data)
        resolve(res);
      }).catch((e) => {
        reject(e)
        uni.redirectTo({
          url: "/pageC/auth/login"
        })
      })
    }).catch(e => {
      reject(e)
      uni.redirectTo({
        url: "/pageC/auth/login"
      })
    })

  })
}
// 授权
const getUserProfile = () => {
  return new Promise(async (resolve, reject) => {
    //使用promise.all()平级调用
    Promise.all([getCode(), function() {
      return new Promise(async (res, rej) => {
        // uni.getUserProfile({
        // 	desc: "用于完善用户信息",
        // 	success: UserProfileRes => {
        // 		// that.info = res1.userInfo;
        // 		res(UserProfileRes);
        // 		// console.log(res1,'res1')
        // 		// uni.showToast({
        // 		// 	icon:"none",
        // 		// 	title:'获取成功'
        // 		// })
        // 	},
        // 	fail: (err) => {
        // 		console.log(err)
        // 		uni.showToast({
        // 			icon:"none",
        // 			title:'用户拒绝获取'
        // 		})
        // 	}	
        // })
        uni.getUserProfile({
          desc: '获取您的微信信息以授权小程序',
          lang: 'zh_CN',
          success: UserProfileRes => {
            res(UserProfileRes);
            // getCode().then((code) => {
            //     loginAct({
            //         iv: UserProfileRes.iv,
            //         encryptedData: UserProfileRes.encryptedData,
            //         code: code,
            //     }).then((res) => {
            //         getCurrentPages()[0].$vm.$store.commit('login',
            //             res.data)
            //         resolve(res);
            //     })
            // })

          },
          fail: err => {
            rej(err)
          }
        })
      })
    }()]).then((response) => {
      loginAct({
        iv: response[1].iv,
        encryptedData: response[1].encryptedData,
        code: response[0],
      }).then((res) => {
        getCurrentPages()[0].$vm.$store.commit('login',
          res.data)
        resolve(res);
      })

    });
   
  })
}

// 手机号授权
const bindPhone = (params) => {
  return new Promise((resolve, reject) => {
    getCode().then((code) => {
      bindphoneAct({
        iv: params.iv,
        encryptedData: params.encryptedData,
        code: code,
      }).then((res) => {
        getCurrentPages()[0].$vm.$store.commit('refreshUser',
          res.data)
        resolve(res);
      })
    })

  })
}
const getSystemConfig = function() {
  return new Promise(function(resolve, reject) {
    if (App.globalData.configInit) {
      resolve(App.globalData.config)
    }
    uni.request({
      url: App.globalData.baseUrl + '/api/index/config',
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': App.globalData.token
      },
      success: function(res) {

        App.globalData.config = res.data.data;
        App.globalData.configInit = true;
        resolve(res.data.data)

      },
      fail: function() {}
    })
  })
}

// 获取服务商信息 uni-app是聚合开发 所以先获得是什么小程序 原生的不用这个
const getProvider = () => {
  return new Promise((resolve, reject) => {
    uni.getProvider({
      service: 'oauth', //服务类型  登录授权
      success: function(res) {
        resolve(res.provider[0])
      },
      fail: function() {
        reject("获取服务商失败")
      }
    });
  })
}

// 获取code
const getCode = () => {
  return new Promise((resolve, reject) => {
    // #ifdef MP-WEIXIN
    uni.login({
      provider: 'weixin',
      success: function(loginRes) {
        if (loginRes && loginRes.code) {
          resolve(loginRes.code)
        } else {
          reject("获取code失败")
        }
      },
      fail: function() {
        uni.$u.route({
          type: 'reLaunch',
          url: 'pageC/auth/login',

        })
        reject("获取code失败")
      }
    });
    // #endif

    // #ifndef MP-WEIXIN
    reject("请在微信平台使用本系统")
    // #endif

  })
}
const error = function() {
  // uni.redirectTo({
  //     url: '/pages/error/error',
  // });
  uni.navigateTo({
    url: '/pages/error/error',
  });

}
// 是否开启了获取用户名授权 当用户一开始拒绝了 需再次提醒授权
const getSetting = function() {
  return new Promise((resolve, reject) => {
    uni.getSetting({
      success: function(res) {
        let authSetting = res.authSetting
        if (authSetting['scope.userInfo']) {
          resolve(1);
          return;
        } //授权成功
        if (authSetting['scope.userInfo'] === false) {
          resolve(0);
          return;
        } //拒绝授权
        resolve(2) //2未操作
      },
      fail: function() {
        reject("获取用户授权失败")
      }
    })
  })
}
const getTempateSetting = function(provider) {
  return new Promise((resolve, reject) => {
    uni.getSetting({
      withSubscriptions: true,
      success: function(res) {
        console.log(res)
      },
      fail: function() {

      }
    })
  })
}
// 获取用户信息
const getUserInfo = (provider) => {
  return new Promise((resolve, reject) => {
    if (!provider) {
      reject("获取缺少provider参数");
      return;
    }
    uni.getUserInfo({
      provider: provider,
      success: (detail) => {
        console.log(detail)
        if (detail.iv != '') {
          resolve(detail);
        } else {
          reject(0); //用户点击拒绝授权
        }
      },
      fail: (error) => {
        console.log(error)
        reject(0); //如果用户拒绝过授权 直接走fail
      }
    });
  })
}
// 获取用户信息
const requestSubscribeMessage = (provider) => {
  return new Promise((resolve, reject) => {
    uni.requestSubscribeMessage({
      tmplIds: [provider],
      success(res) {
      
        resolve(true)
      },
    })


  })
}
export default {
  getSystemConfig,
  bindPhone,
  error,
  getStorageSync,
  setStorageSync,
  getProvider,
  getSetting,
  checkSessionKey,
  getCode,
  login,
  getUserInfo,
  getUserProfile,
  requestSubscribeMessage
}