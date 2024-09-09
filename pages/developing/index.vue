<template>
  <view>
    <view class="u-nav">
      <navbar
        :safeAreaInsetTop="true"
        placeholder
        height="55"
        leftIconColor="#fff"
        autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="建设中" color="#fff"></u--text>
        </view>
      </navbar>
    </view>
    <view class="content">
      <view class="image">
        <image
          src="http://cdn.cestech.com.cn/BkpKnowledge/img/d238b56246104f498754e6ed88054d2b.png"
          mode="scaleToFill" />
      </view>
      <view class="text">
        <view class="title">功能开发中...</view>
        <view class="t">敬请期待</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      globalData: getApp().globalData,
    }
  },

  methods: {},
}
</script>
<style lang="scss" scoped>
.content {
  width: 688rpx;
  background: #ffffff;
  border-radius: 12rpx 12rpx 12rpx 12rpx;
  margin: 20rpx auto;
  padding: 16rpx;
  .image {
    image {
      margin: 220rpx auto 80rpx;
      display: block;
      width: 384.19rpx;
      height: 429.53rpx;
    }
  }
  .text {
    text-align: center;
    .title {
      font-weight: 400;
      font-size: 36rpx;
      color: #1dd193;
    }
    .t {
      font-weight: 400;
      font-size: 28rpx;
      color: #c5c5c5;
      margin-top: 16rpx;
    }
  }
}
</style>
