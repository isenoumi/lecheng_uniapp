<template>
  <view>
    <image src="http://cdn.cestech.com.cn/BkpKnowledge/img/e7e5ce56ce69464388b29b065f4ef505.png" mode="widthFix">
    </image>

    <view class="text" v-if="is21">
      恭喜今日打卡成功!
    </view>
    <view class="text" v-else>
      恭喜今日打卡成功本次获得积分+{{integral}}
    </view>

    <view class="btn" @click="toCheck">
      关闭
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        is21: true,
        integral: 6
      };
    },
    methods: {
      toCheck() {
        uni.redirectTo({
          url: '/pageA/signIn/signIn'
        })
        // uni.switchTab({
        //   url: '/pages/index/index'
        // })
      }
    }
  }
</script>

<style lang="scss">
  image {
    width: 100%;
  }

  .btn {
    width: 400rpx;
    height: 100rpx;
    background: #29CE8C;
    border-radius: 20rpx;
    line-height: 100rpx;
    color: #fff;
    text-align: center;
    margin: 400rpx auto;
  }

  .text {
    font-size: 38rpx;
    font-weight: 500;
    text-align: center;
    margin-top: 100rpx;
  }
</style>