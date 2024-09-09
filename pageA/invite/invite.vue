<template>
  <view>
    <!--    <view class="u-nav">
      <navbar :safeAreaInsetTop="true" height="55" placeholder leftIconColor="#fff" autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="邀请新用户" color="#fff"></u--text>
        </view>
      </navbar>
    </view> -->
    <view class="mainBox bg-white" style="padding-top: 25rpx;">
      <view class="box">
        <view class="mian">
          <view class=" text-center ">
            <view class="padding-xl radius  bg-white ">

              <view class="image u-flex u-row-center">
                <u--image v-if="src" :showLoading="true" radius="5" :src="src" height="275" width="275">

                  <u-loading-icon></u-loading-icon>
                  <view slot="error" style="font-size: 24rpx;">
                    加载失败
                  </view>
                </u--image>
                <view v-else class="msg">
                  {{msg}}
                </view>
              </view>
              <view class="info u-p" v-if="src">
                <view>用户邀请码,扫一扫可邀请新用户登录小程序</view>
                <view style="margin-top: 20rpx;">邀请一位新用户登录获得积分</view>
                <!-- <u--text align="center" type="info" text="扫一扫上面的二维码图案，可对此问卷进行反馈"></u--text> -->
              </view>
              <view cl<!-- ass="info u-p" v-else>
                <view>{{msg}}</view>
              </view> -->

            </view>
          </view>
        </view>

      </view>




    </view>

    <view class="footerImg">
      <image src="http://cdn.cestech.com.cn/BkpKnowledge/img/ca30b448bc6b4cd187b698848097bfe6.png" mode="widthFix">
      </image>
    </view>
  </view>

</template>

<script>
  import {
    getInvitationCode
  } from '@/api/invite/invite.js'
  export default {
    data() {
      return {
        src: '',
        id: '2',
        msg: '加载中'
      }
    },
    computed: {


    },

    onLoad(option) {
      this.supervisortaskqrcode();
      // if (option.id) {
      //     this.id = option.id
      //     this.supervisortaskqrcode();
      // } else {
      //     uni.showToast({
      //         title: '无法生成',
      //         icon: 'none'

      //     })
      // }

    },
    methods: {
      supervisortaskqrcode() {
        // getInvitationCode({
        //   phone: uni.getStorageSync('phone')
        // }).then((res) => {
        //   this.src = res.data

        // })
        uni.request({
          url: `https://gh.api.cestech.com.cn:8240/mission_gh/xcx_api/file/getInvitationCode?phone=${ uni.getStorageSync('phone')}`,
          // data: {
          //   phone: uni.getStorageSync('phone'),
          //   // punchCardPhone: '梵蒂冈的是',
          // },
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
          },
          method: "POST",
          success: (res) => {
            console.log(res);
            if (res.data.code == 200) {
              this.src = res.data.result
            } else {
              this.msg = res.data.message
            }

          },
        })
      },

      goBack() {
        uni.navigateBack({
          delta: 1
        })
      },


    }
  }
</script>

<style lang="scss" scoped>
  @import 'css/invite.scss'
</style>