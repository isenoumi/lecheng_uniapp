<template>

  <view class="mainBox bg-white">
    <view class="padding text-center margin-top-xl">
      <view class="padding-xl radius  bg-white margin-top">

        <view class="image u-flex u-row-center">
          <u--image :showLoading="true" radius="5" :src="src" height="300">
            <!-- <image :src="src" mode=""></image> -->
            <u-loading-icon></u-loading-icon>
            <view slot="error" style="font-size: 24rpx;">
              加载失败
            </view>
          </u--image>
        </view>
        </u-button>
        <view class="info u-p">
          <u--text align="center" type="info" text="长按识别图中二维码/保存相册"></u--text>
        </view>

      </view>
    </view>



  </view>
</template>

<script>
  import {
    speechoractivityqrcode
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
      if (option.id) {
        console.log(option.id, 'option.id')
        this.id = option.id
        this.speechoractivityqrcode();
      } else {
        uni.showToast({
          title: '无法生成',
          icon: 'none'

        })
      }

    },
    methods: {
      speechoractivityqrcode() {
        // speechoractivityqrcode({
        //     id: this.id
        // }).then((res) => {
        //     this.src = res.data

        // })

        uni.request({
          url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/WxApi/getAQRCodeForReviews?id=${this.id}`,
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