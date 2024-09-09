<template>

  <view class="mainBox bg-white">
    <view class="padding text-center margin-top-xl">
      <view class="padding-xl radius  bg-white margin-top">

        <view class="image u-flex u-row-center">
          <u--image :showLoading="true" radius="5" :src="src" height="300">

            <u-loading-icon></u-loading-icon>
            <view slot="error" style="font-size: 24rpx;">
              加载失败
            </view>
          </u--image>
        </view>
        </u-button>
        <view class="info u-p">
          <u--text align="center" type="info" text="长按/扫一扫上面的二维码，获取宣教知识"></u--text>
        </view>

      </view>
    </view>



  </view>
</template>

<script>
  import {
    supervisortaskqrcode
  } from '@/common/api.js'
  export default {
    data() {
      return {
        src: ''
      }
    },
    computed: {


    },

    onLoad(option) {
      if (option.communityId) {
        this.id = option.communityId
        console.log(option, 'ccc')
        this.supervisortaskqrcode();
      } else {
        uni.showToast({
          title: '无法生成',
          icon: 'none'

        })
      }

    },
    methods: {

      supervisortaskqrcode() {
        uni.request({
          url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/WxApi/dudaoyuan/getInvitationCode?id=${this.id}`,
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
            //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
          },
          method: "POST",
          success: (res) => {
            console.log(res.data.result, 'xxxx')
            this.src = res.data.result


          }

        })
        // supervisortaskqrcode({
        //     id: this.id
        // }).then((res) => {
        //     this.src = res.data

        // })
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
  page {
    height: 100%;
    overflow: hidden;
  }

  .mainBox {
    height: 100%;


  }
</style>