<template>
  <view>
    <u-popup
      :show="showpopup"
      round="12"
      mode="center"
      @close="showpopup = false">
      <view class="content">
        <view>
          <view class="text">当前用户未登录, 请选择是否要登录? </view>
        </view>

        <view class="a">
          <u-button
            type="primary"
            shape="circle"
            text="取消"
            @click="showpopup = false">
          </u-button>
          <u-button
            type="primary"
            text="登录"
            shape="circle"
            @getphonenumber="getPhoneNumber"
            open-type="getPhoneNumber">
          </u-button>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  props: ['show', 'url'],
  data() {
    return { iphone: '', users: {}, txt: '', showpopup: false }
  },
  methods: {
    getPhoneNumber(e) {
      if (e.detail.errMsg != 'getPhoneNumber:ok') {
        return
      }
      // authorize.login()
      // this.showmy = true
      // this.show_phone = false
      uni.showLoading({
        title: '加载中',
      })
      console.log(e, '手机号')
      let code = e.detail.code
      uni.login({
        provider: 'weixin',
        success: res => {
          console.log(res, 'xxxx')
          let myPhone = ''
          if (uni.getStorageSync('scene') != 'undefined') {
            myPhone = uni.getStorageSync('scene')
          }

          uni.request({
            url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/WxApi/miniProgramLogin?code=${
              res.code
            }&&isInvite=${false}`,
            header: {
              'x-Resource-Token': uni.getStorageSync('xtoken'),
            },
            method: 'GET',
            success: res => {
              console.log(res.data.result, '秘钥')
              uni.setStorageSync(
                'session_key',
                res.data.result.token.session_key
              )
              uni.setStorageSync('openid', res.data.result.token.openid)
              console.log(res.data.result.token, '用户信息')
              uni.setStorageSync('users', res.data.result.user)
              this.users = res.data.result.user
              this.txt = res.data.result.user.role?.split(',')
              console.log(this.txt, '身份认证')
              console.log(res.data.result.user.nickName, 'ccccxxxx')

              uni.setStorageSync('nikename', res.data.result.user.nickName)
              uni.setStorageSync('avatarUrl', res.data.result.user.avatarUrl)
              uni.request({
                url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/WxApi/getPhoneNumber?code=${code}&openid=${res.data.result.token.openid}`,
                header: {
                  'x-Resource-Token': uni.getStorageSync('xtoken'),
                },
                method: 'GET',
                success: res => {
                  uni.setStorageSync('xtoken', res.data.result.access_tokenn)
                  this.iphone = res.data.result.phone_info.phoneNumber
                  console.log(this.iphone, 'this.iphone')
                  let data = {}
                  data = this.users
                  data.phone = this.iphone
                  uni.request({
                    url: 'https://gh.api.cestech.com.cn:8240/mission_gh/wx/WxApi/edit',
                    header: {
                      'x-Resource-Token': uni.getStorageSync('xtoken'),
                    },
                    data: data,
                    method: 'POST',
                    success: res => {},
                  })
                  uni.setStorageSync('iphone', this.iphone)
                  uni.setStorageSync('phone', this.iphone)
                  uni.hideLoading()
                  // uni.showToast({
                  //   title: '登录成功',
                  //   icon: 'success',
                  // })
                  this.toPage()
                },
              })
            },
          })
        },
      })
    },
    toPage() {
      this.showpopup = false
      uni.navigateTo({ url: this.$props.url })
    },
  },
  mounted() {
    this.showpopup = this.$props.show
    console.log('object', this.$props.show)
  },
}
</script>

<style>
.content {
  padding: 60rpx 30rpx 0;
  border-radius: 32rpx;
}
.text {
  font-size: 32rpx;
  font-weight: 600;
}
.a {
  margin-top: 80rpx;
  display: flex;
  justify-content: space-between;
}
</style>
