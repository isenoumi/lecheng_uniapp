<template>
  <view style="margin-top: 220rpx;">
    <view class="img">
      <image src="http://cdn.cestech.com.cn/BkpKnowledge/img/5f591238eaa24710b348b95ac6d730dd.png" mode=""></image>

    </view>
    <view class="tips">
      恭喜您已完成任务，点击下方按钮领取礼品哦~
    </view>
    <view v-if="isLogin" class="btn" @click="receivePresent">
      礼品领取
    </view>
    <view v-else style="margin: 100rpx auto;width:200rpx;    border-radius: 20rpx;">
      <u-button class="custom-style" type="primary" text="礼品领取" @getphonenumber="getPhoneNumber"
        open-type="getPhoneNumber">
      </u-button>
    </view>

  </view>
</template>

<script>
  import authorize from "@/common/auth.js"
  export default {
    data() {
      return {
        isLogin: false,
        checkDays: 0,
        dateNow: '',
        users: {},
        iphone: '',
        customStyle: {
          width: '200rpx'
        },
        presentType: ''
      }
    },
    onLoad(options) {
      if (uni.getStorageSync('phone')) {
        this.isLogin = true

      }
      if (uni.getStorageSync('presentType') == 'questionnaire') this.presentType = '问卷答题礼物领取'
      // else this.presentType = '问卷答题礼物领取'
      else this.presentType = '现场礼物领取'
    },
    methods: {
      receivePresent() {
        if (!uni.getStorageSync('phone')) {
          this.getPhoneNumber()
        } else {
          this.receivePresentApi()
        }
      },
      getPhoneNumber(e) {
        if (e.detail.errMsg != "getPhoneNumber:ok") {
          return;
        }
        uni.showLoading({
          title: '加载中'
        })
        console.log(this.phone, '手机号')
        let code = e.detail.code
        uni.login({
          provider: 'weixin',
          success: (res) => {
            console.log(res, 'xxxx')
            let myPhone = ""
            if (uni.getStorageSync("scene") != 'undefined') {
              myPhone = uni.getStorageSync("scene")
            }

            uni.request({
              url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/WxApi/miniProgramLogin?code=${res.code}&isInvite=${false}`,
              header: {
                'x-Resource-Token': uni.getStorageSync('xtoken'),
              },
              method: "GET",
              success: (res) => {
                uni.setStorageSync('session_key', res.data.result.token
                  .session_key)
                uni.setStorageSync('openid', res.data.result.token.openid)
                uni.setStorageSync('users', res.data.result.user)

                uni.setStorageSync('nikename', res.data.result.user.nickName)
                uni.setStorageSync('avatarUrl', res.data.result.user.avatarUrl)
                this.users = res.data.result.user
                uni.request({
                  url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/WxApi/getPhoneNumber?code=${code}&openid=${res.data.result.token.openid}`,
                  header: {
                    'x-Resource-Token': uni.getStorageSync('xtoken'),
                  },
                  method: "GET",
                  success: (res) => {
                    uni.setStorageSync('xtoken', res.data.result
                      .access_tokenn)
                    this.iphone = res.data.result.phone_info
                      .phoneNumber
                    console.log(this.iphone, 'this.iphone');
                    let data = {}
                    data = this.users
                    data.phone = this.iphone
                    uni.request({
                      url: 'https://gh.api.cestech.com.cn:8240/mission_gh/wx/WxApi/edit',
                      header: {
                        'x-Resource-Token': uni.getStorageSync('xtoken'),
                      },
                      data: data,
                      method: "POST",
                      success: (res) => {}

                    })
                    uni.setStorageSync('iphone', this.iphone)
                    uni.setStorageSync('phone', this.iphone)
                    this.userinfo()
                    uni.hideLoading()
                    this.receivePresentApi()


                  },
                })

              },
            })

          }
        })

      },
      //获取用户个人信息
      userinfo() {
        uni.request({
          url: 'https://gh.api.cestech.com.cn:8240/mission_gh/v1/user/info',
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
          },
          // data: {
          // 	id: uni.getStorageSync('users').id
          // },
          method: "GET",
          success: (res) => {

            uni.setStorageSync('users', res.data.result.records[0])

          }

        })
      },
      receivePresentApi() {
        uni.request({
          url: 'https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbQuestionnaireQuestions/theGiftWasSuccessfullyRedeemed',
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
          },
          data: {
            exchangeType: this.presentType,
            exchangeName: uni.getStorageSync('nikename'),
            exchangePhone: uni.getStorageSync('phone')
          },
          method: "POST",
          success: (res) => {
            uni.showToast({
              icon: 'none',
              title: res.data.message
            })
            uni.setStorageSync('presentType', '')
            setTimeout(() => {
              uni.switchTab({
                url: '/pages/index/index'
              })
            }, 1500)

          }

        })
      }
    }
  }
</script>

<style scoped>
  .img {
    margin: 50rpx auto;
    width: 640rpx;
  }

  .tips {
    font-size: 28rpx;
    text-align: center;
    margin-top: 200rpx;
    color: #999;
  }

  .btn {
    width: 200rpx;
    height: 80rpx;
    background: #29CE8C;
    border-radius: 20rpx;
    line-height: 80rpx;
    color: #fff;
    font-size: 28rpx;
    text-align: center;
    margin: 100rpx auto;
  }

  .custom-style {
    width: 200rpx;
    border-radius: 20rpx;
  }
</style>