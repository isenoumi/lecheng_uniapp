<!-- 个人中心 -->
<template>
  <view class="components-theme" style="position: relative">
    <view class="u-nav">
      <navbar
        :safeAreaInsetTop="true"
        :allTitle="false"
        height="55"
        :hasImage="false"
        bgColor="transparent"
        placeholder>
        <view class="u-nav-slot" slot="left">
          <u--text text=" " bold></u--text>
        </view>
      </navbar>
    </view>
    <image
      style="width: 100%; position: absolute; top: 0rpx"
      src="https://oms.cestech.com.cn/BkpKnowledge/img/4560bb90612a4b2287fbb98318b8e3c5/路径 8959 (1).png"
      mode="scaleToFill" />
    <!-- 顶部 -->
    <view class="UCenter-bg">
      <block>
        <view class="top-box u-flex u-flex-row u-row-between">
          <view v-if="showmy">
            <u-avatar :src="avatarUrl" size="60"></u-avatar>
          </view>
          <view class="left" v-if="showmy">
            <view class="left-name">
              <u--text
                :text="name"
                bold
                size="17"
                color="#fff"
                style="width: 200rpx"></u--text>
            </view>

            <view class="left-info">
              <u--text :text="iphone" size="14" color="#fff"></u--text>
            </view>
          </view>
          <view class="left-button" v-if="show_head">
            <u-button
              type="primary"
              shape="circle"
              text="请登录"
              @getphonenumber="getPhoneNumber"
              open-type="getPhoneNumber">
            </u-button>
          </view>
        </view>

        <view class="info">
          <view class="infoItem" @click="goPointsRanking">
            <view class="text">{{ points }}</view>
            <view class="title">积分</view>
          </view>

          <view class="infoItem" @click="goPointsRanking">
            <view class="text">{{ carbon }}</view>
            <view class="title">碳减值</view>
          </view>
        </view>
      </block>
    </view>
    <view class="u-m-t content">
      <u-cell-group :border="false">
        <u-cell
          title="个人信息"
          @click="goAuth"
          size="large"
          :isLink="true"
          :border="false"
          :rightIconStyle="{
            color: '#333333',
          }">
          <u--image
            slot="icon"
            mode="heightFix"
            src="/static/assets/center/组 1525(2).png"
            width="16px"
            height="16px">
          </u--image>
        </u-cell>
        <!-- <u-cell title="我的积分" @click="integral" size="large" :isLink="true" :border="false" :rightIconStyle="{
				    color:'#333333'
				}">
          <u--image slot="icon" mode="heightFix" src="/static/assets/center/5.png" width="16px" height="16px">
          </u--image>
          <text slot="value" class="u-slot-value">{{users.points}}</text>
        </u-cell>
        <u-cell title="积分排行" @click="ranking" size="large" :isLink="true" :border="false" :rightIconStyle="{
				    color:'#333333'
				}">
          <u--image slot="icon" mode="heightFix" src="/static/assets/center/6.png" width="16px" height="16px">
          </u--image>
        </u-cell> -->
        <!-- <u-cell title="督导员工具" v-if="users.role===1" @click="goSupervisor" size="large" :isLink="true" :border="false"
          :rightIconStyle="{
                    color:'#333333'
                }">
          <u--image slot="icon" mode="heightFix" src="/static/assets/center/2.png" width="16px" height="16px">
          </u--image>
        </u-cell> -->
        <!--  v-if="txt.filter(function (e) { return e == '1'; }).length != 0" -->
        <!-- <u-cell
          title="督导员工具"
          v-if="
            txt.filter(function (e) {
              return e == '1'
            }).length != 0
          "
          @click="goSupervisor"
          size="large"
          :isLink="true"
          :border="false"
          :rightIconStyle="{
            color: '#333333',
          }">
          <u--image
            slot="icon"
            mode="heightFix"
            src="/static/assets/center/2.png"
            width="16px"
            height="16px">
          </u--image>
        </u-cell> -->
        <!-- v-if="txt.filter(function (e) { return e == '2'; }).length != 0" -->
        <u-cell
          title="活动任务"
          @click="goActivity"
          size="large"
          v-if="
            txt.filter(function (e) {
              return e == '2'
            }).length != 0
          "
          :isLink="true"
          :border="false"
          :rightIconStyle="{
            color: '#333333',
          }">
          <u--image
            slot="icon"
            mode="heightFix"
            src="/static/assets/center/组 1525(3).png"
            width="16px"
            height="16px">
          </u--image>
        </u-cell>
        <u-cell
          title="我的消息"
          @click="goMessage"
          size="large"
          :isLink="true"
          :border="false"
          :rightIconStyle="{
            color: '#333333',
          }">
          <u--image
            slot="icon"
            mode="heightFix"
            src="/static/assets/center/组 1525 (1).png"
            width="20px"
            height="20px">
          </u--image>

          <u-badge slot="value" type="error" :value="message"> </u-badge>
        </u-cell>
        <u-cell
          title="反馈中心"
          @click="goFeedbackCenter"
          size="large"
          :isLink="true"
          :border="false"
          :rightIconStyle="{
            color: '#333333',
          }">
          <u--image
            slot="icon"
            mode="heightFix"
            src="/static/assets/center/组 1525(3).png"
            width="20px"
            height="20px">
          </u--image>

          <u-badge slot="value" type="error" :value="message"> </u-badge>
        </u-cell>
        <u-cell
          title="积分明细"
          @click="goPointsRanking"
          size="large"
          :isLink="true"
          :border="false"
          :rightIconStyle="{
            color: '#333333',
          }">
          <u--image
            slot="icon"
            mode="heightFix"
            src="/static/assets/center/组 1525.png"
            width="20px"
            height="20px">
          </u--image>

          <u-badge slot="value" type="error" :value="message"> </u-badge>
        </u-cell>
        <!-- v-if="txt.filter(function (e) { return e == '3'; }).length != 0" -->
        <!-- <u-cell
          title="问卷管理"
          @click="questionnaire"
          v-if="
            txt.filter(function (e) {
              return e == '3'
            }).length != 0
          "
          size="large"
          :isLink="true"
          :border="false"
          :rightIconStyle="{
            color: '#333333',
          }">
          <u--image
            slot="icon"
            mode="heightFix"
            src="/static/assets/center/7.png"
            width="22px"
            height="22px">
          </u--image>
        </u-cell> -->
        <!-- <u-cell
          title="预约订单"
          @click="order"
          size="large"
          :isLink="true"
          :border="false"
          :rightIconStyle="{
            color: '#333333',
          }">
          <u--image
            slot="icon"
            mode="heightFix"
            src="/static/assets/center/8.png"
            width="18px"
            height="18px">
          </u--image>
        </u-cell> -->
        <!-- <u-cell
          title="我的培训任务"
          v-if="
            txt.filter(function (e) {
              return e == '4'
            }).length != 0
          "
          @click="my_task"
          size="large"
          :isLink="true"
          :border="false"
          :rightIconStyle="{
            color: '#333333',
          }">
          <u--image
            slot="icon"
            mode="heightFix"
            src="/static/assets/center/9.png"
            width="18px"
            height="18px">
          </u--image>
        </u-cell> -->
        <!-- <u-cell
          title="邀请好友"
          @click="toInvite"
          size="large"
          :isLink="true"
          :border="false"
          :rightIconStyle="{
            color: '#333333',
          }">
          <u--image
            slot="icon"
            mode="heightFix"
            src="/static/assets/center/yq.png"
            width="16px"
            height="16px">
          </u--image>
        </u-cell> -->
        <!-- <u-cell
          title="商城订单"
          @click="shoppingOrder"
          size="large"
          :isLink="true"
          :border="false"
          :rightIconStyle="{
            color: '#333333',
          }">
          <u--image
            slot="icon"
            mode="heightFix"
            src="/static/assets/center/4.png"
            width="18px"
            height="18px">
          </u--image>
        </u-cell> -->
        <!-- <u-cell
          title="收货地址"
          @click="address"
          size="large"
          :isLink="true"
          :border="false"
          :rightIconStyle="{
            color: '#333333',
          }">
          <u--image
            slot="icon"
            mode="heightFix"
            src="/static/assets/center/address.png"
            width="18px"
            height="18px">
          </u--image>
        </u-cell> -->

        <!-- <u-cell
          title="礼物兑换记录"
          @click="toPresentRecord"
          size="large"
          :isLink="true"
          :border="false"
          :rightIconStyle="{
            color: '#333333',
          }">
          <u--image
            slot="icon"
            mode="heightFix"
            src="/static/assets/center/4.png"
            width="18px"
            height="18px">
          </u--image>
        </u-cell> -->
      </u-cell-group>
    </view>
    <!-- <confirm :show="showConfirmComponents"></confirm> -->
  </view>
</template>

<script>
import authorize from '@/common/auth.js'
import { mapState } from 'vuex'
import { message as getMessage } from '@/common/api.js'
import { showConfirm } from '@/util/common'
// import confirm from '../../components/confirm.vue'
export default {
  data() {
    return {
      // 是否邀请
      isInvite: false,
      // pic: getApp().globalData.user,
      topBackGroupImageIndex: 5,
      redirect: '',
      message: '0',
      points: 0, //积分
      carbon: 0, //积分
      avatarUrl: '',
      name: '',
      showmy: false,
      show_head: true,
      show_name: false,
      show_phone: false,
      showname: false,
      phone_s: false,
      iphone: '',
      users: {},
      txt: [],
    }
  },
  onTabItemTap() {
    this.userinfo()
    // authorize.login()
  },
  onLoad(option) {
    const scene = decodeURIComponent(option.scene)
    uni.setStorageSync('scene', scene)
    if (scene && scene != 'null' && scene != 'undefined') {
      this.isInvite = true
    }
    if (uni.getStorageSync('iphone')) {
      this.iphone = uni.getStorageSync('iphone')
    }
    if (uni.getStorageSync('avatarUrl')) {
      this.avatarUrl = uni.getStorageSync('avatarUrl')
      this.show_head = false
      this.show_name = false
      this.show_phone = false
      this.showmy = true
    } else {
    }
    if (uni.getStorageSync('nikename')) {
      this.name = uni.getStorageSync('nikename')
      this.show_head = false
      this.show_name = false
      this.show_phone = false
      this.showmy = true
    } else {
      this.show_head = true
      this.phone_s = true
    }
    this.userinfo()
  },
  computed: {
    ...mapState({
      user: state => state.user,
    }),
    nick_name() {
      if (this.user.name) {
        return this.user.name
      }
      if (this.user.nick_name) {
        return this.user.nick_name
      }
      return '微信用户'
    },
    message() {
      if (this.user.message) {
        return this.user.message > 99 ? '99+' : this.user.message
      }
      return '0'
    },
    // phone() {
    // 	this.phone_s=true
    // 	if (this.user.phone) {

    // 		return this.user.phone
    // 	}

    // 	return ''
    // },
    loginStatus() {
      if (!this.$store.state.user.nick_name) {
        return 0
      } else if (!this.$store.state.user.phone) {
        return 1
      } else if (!this.$store.state.user.reg_status) {
        return 2
      } else {
        return 3
      }
      return 0
    },
  },
  // 分享小程序
  onShareAppMessage(res) {
    return {
      title: '赶紧分享给身边的亲友吧',
    }
  },
  watch: {
    topBackGroupImageIndex(val) {
      if (val == 4 || val == 5) {
        this.spaceShow = true
      } else {
        this.spaceShow = false
      }
    },
  },
  onShow() {
    this.users = uni.getStorageSync('users')
    this.userinfo()
    uni.request({
      url: 'https://gh.api.cestech.com.cn:8240/mission_gh/v1/user/message',
      header: {
        'x-Resource-Token': uni.getStorageSync('xtoken'),
      },
      // data: {
      // 	id: uni.getStorageSync('users').id
      // },
      method: 'GET',
      success: res => {
        console.log(res)
        this.message =
          res.data.result > 99 ? '99+' : res.data > 0 ? res.data : 0
      },
    })
    // getMessage().then((res) => {
    //   this.message = res.data > 99 ? '99+' : (res.data > 0 ? res.data : 0);
    // })
  },
  mounted() {},
  methods: {
    toLoginPage() {
      if (!uni.getStorageSync('xtoken')) {
        showConfirm('当前用户未登录, 请重新登录?').then(res => {
          if (res.confirm) {
            // uni.reLaunch({
            //   url: '/pages/center/index',
            // })

            return false
          }
        })
      } else {
        return true
      }
    },
    init() {
      this.name = ''
      this.avatarUrl = ''
      this.userinfo()
      console.log('xxx被调')
    },
    address() {
      uni.navigateTo({
        url: '/pageD/address/index',
      })
    },
    my_task() {
      uni.navigateTo({
        url: '/pageB/activity_manager/index',
      })
    },
    questionnaire() {
      uni.navigateTo({
        url: '/pageB/questionnaire/index',
      })
    },
    order() {
      uni.navigateTo({
        url: '/pageB/appointmentorder/index',
      })
    },
    empower() {
      uni.navigateTo({
        url: '/pageC/auth/login',
      })
    },

    toInvite() {
      uni.navigateTo({
        url: '/pageA/invite/invite',
      })
    },
    shoppingOrder() {
      uni.navigateTo({
        url: '/pageA/userShoppingOrder/userShoppingOrder',
      })
    },
    toDeveloping() {
      uni.navigateTo({
        url: '/pageB/developing/index',
      })
    },

    //获取用户头像
    bindchooseavatar(e) {
      if (e.detail.avatarUrl) {
        this.show_head = false
        this.show_name = true
        this.show_phone = false
        // this.uploadFilePromise(e.detail.avatarUrl)
        uni.setStorageSync('avatarUrl', e.detail.avatarUrl)
        this.avatarUrl = uni.getStorageSync('avatarUrl')
        // authorize.login()
      }
    },
    uploadFilePromise(avatarUrl) {
      //调后台接口上传图片  这里的avatarUrl拿到的是微信地址
      uni.request({
        url: 'https://example.weixin.qq.com/upload',
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
        },
        data: avatarUrl,
        success(res) {
          // const data = res.data
          //do something
          completeMemberInfo(res.data.avatarUrl)
        },
      })
    },
    completeMemberInfo(data) {
      //接收 avatarUrl / nickName 调接口完善头像或者昵称信息
    },

    bindinput(e) {
      uni.setStorageSync('nikename', e.detail.value)
      this.name = uni.getStorageSync('nikename')
      // authorize.login()
    },
    onNickName(e) {
      if (e.detail.value) {
        this.show_head = false
        this.show_name = false
        this.show_phone = true
        uni.setStorageSync('nikename', e.detail.value)
        this.name = uni.getStorageSync('nikename')
      }
      // this.completeMemberInfo(e.detail.value)
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
        method: 'GET',
        success: res => {
          this.points = res.data.result.records[0].points
          this.carbon = res.data.result.records[0].carbonCredits
          this.users = res.data.result.records[0]
          uni.setStorageSync('users', res.data.result.records[0])
          uni.setStorageSync('nikename', res.data.result.records[0].nickName)
          uni.setStorageSync('realName', res.data.result.records[0].name)
          uni.setStorageSync('avatarUrl', res.data.result.records[0].avatarUrl)
          uni.setStorageSync('newArea', res.data.result.records[0].newArea)
          this.txt = res.data.result.records[0].role?.split(',')
          this.name = res.data.result.records[0].nickName
          this.avatarUrl = res.data.result.records[0].avatarUrl
          this.iphone = uni.getStorageSync('iphone')
          this.show_head = false
          this.showmy = true
        },
      })
    },
    // 个人信息
    goAuth() {
      if (this.toLoginPage())
        uni.navigateTo({
          url: '/pageC/auth/register',
        })
    },
    //我的积分
    integral() {
      uni.navigateTo({
        url: '/pageA/integral/index',
      })
    },
    toPresentRecord() {
      uni.navigateTo({
        url: '/pageD/presentRecord/presentRecord',
      })
    },
    //积分排名
    ranking() {
      uni.navigateTo({
        url: '/pageA/ranking/index',
      })
    },
    goSupervisor() {
      uni.navigateTo({
        url: '/pages/supervisor/task',
      })
      return
      uni.navigateTo({
        url: '/pages/supervisor/index',
      })
    },
    goActivity() {
      uni.navigateTo({
        url: '/pages/activity_manager/index',
      })
    },
    goLogin() {
      uni.navigateTo({
        url: '/pageC/auth/login',
      })
    },
    // TODO developing
    goMessage() {
      // this.toDeveloping()
      // return
      uni.navigateTo({
        url: '/pageC/message/list',
      })
    },
    goFeedbackCenter() {
      // this.toDeveloping()
      // return
      uni.navigateTo({
        url: '/pageC/feedbackCenter/index',
      })
    },
    goPointsRanking() {
      // this.toDeveloping()
      // return
      uni.navigateTo({
        url: '/pageC/points/index',
      })
    },

    //拨打固定电话
    callPhoneNumber() {
      uni.makePhoneCall({
        phoneNumber: '18629591093',
      })
    },

    getUserProfile() {
      authorize.getUserProfile().then(res => {
        // uni.showToast({
        // 	title: res.msg,
        // 	icon: 'success',
        // });
      })
    },
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
            url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/WxApi/miniProgramLogin?code=${res.code}&isInvite=${this.isInvite}`,
            header: {
              'x-Resource-Token': uni.getStorageSync('xtoken'),
            },
            method: 'GET',
            success: res => {
              console.log(res.data.result.token.session_key, '秘钥')
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
              this.name = uni.getStorageSync('nikename')
              uni.setStorageSync('avatarUrl', res.data.result.user.avatarUrl)
              this.avatarUrl = uni.getStorageSync('avatarUrl')
              uni.request({
                url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/WxApi/getPhoneNumber?code=${code}&openid=${res.data.result.token.openid}`,
                header: {
                  'x-Resource-Token': uni.getStorageSync('xtoken'),
                },
                method: 'GET',
                success: res => {
                  uni.setStorageSync('xtoken', res.data.result.access_tokenn)
                  // this.checkPhone(res.data.result.phoneNumber.phoneNumber)
                  // this.iphone = res.data.result.phoneNumber
                  this.iphone = res.data.result.phone_info.phoneNumber
                  console.log(this.iphone, 'this.iphone')
                  let data = {}
                  data = this.users
                  // data.nickName = this.name
                  // data.avatarUrl = this.avatarUrl
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
                  this.userinfo()
                  // authorize.login()
                  this.showmy = true
                  this.show_head = false
                  uni.hideLoading()
                  uni.showToast({
                    title: '登录成功',
                    icon: 'success',
                  })
                },
              })

              //获取用户信息
              // uni.request({
              // 	url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/WxApi/list?openid=${res.data.result.token.openid}`,
              // 	header: {
              // 		'x-Resource-Token': uni.getStorageSync('xtoken'),

              // 	},
              // 	method: "GET",
              // 	success: (res) => {

              // 	}

              // })
            },
          })

          //这里获取的是用户的code，用来换取 openid、unionid、session_key 等信息，再将信息丢给后台自己的登录业务就行了
        },
      })
    },
  },
}
</script>
<style lang="scss">
page {
  background-color: #f7f7f7;
}
.u-nav {
  width: 750rpx;
  background: linear-gradient(180deg, #01b39b 0%, #42d997 100%);
}
</style>

<style lang="scss" scoped>
.UCenter-bg {
  margin-top: -30rpx;
  /* background: #fff; */
  /* background-size: 100% 100%; */
  /* background-size: cover; */
  background: transparent;
  display: flex;
  justify-content: center;
  overflow: hidden;
  position: relative;
  flex-direction: column;
  align-items: center;
  font-weight: 300;
  height: 160px;
  .top-box {
    width: 100%;
    padding: 30rpx;
    height: 100%;

    .left {
      padding-left: 30rpx;
      height: 100%;
      flex: 1;
      display: flex;
      justify-content: center;
      flex-direction: column;

      .left-name {
        margin-bottom: 15rpx;
        display: flex;
        align-items: center;

        .iocn {
          // position: relative;
          // right: 120px;
        }
      }
    }

    .left-button {
      /deep/ .u-button__text {
        padding: 0 10px;
      }
    }

    .name-input {
      /deep/ .data-v-0f3320de {
        width: 260rpx;
        padding-left: 40rpx;
        height: 80rpx;
        background: #3bcf99;
        border-radius: 200rpx;
        color: #ffffff !important;

        .input::-webkit-input-placeholder {
          /* placeholder颜色 */

          /* placeholder字体大小 */
          font-size: 12px;
        }
      }
    }
  }
}
.content {
  width: 688rpx;
  background: #ffffff;
  border-radius: 12rpx 12rpx 12rpx 12rpx;
  margin: 20rpx auto;
}

// /deep/ .input:placeholder-shown {
// 	font-size: 20rpx;
// 	color: #fff;
// }
.info {
  display: flex;
  justify-content: left;
  padding: 40rpx 0;
  width: 100%;
  .infoItem {
    text-align: center;
    color: #ffffff;
    margin-left: 80rpx;
    width: 140rpx;
    .text {
      font-weight: 400;
      font-size: 36rpx;
      color: #ffffff;
      line-height: 52rpx;
    }
    .title {
      font-weight: 400;
      font-size: 24rpx;
      color: #ffffff;
      line-height: 52rpx;
    }
  }
}
</style>
