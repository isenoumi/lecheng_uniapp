<!-- 查看视频 -->
<template>
  <view class="container">
    <view class="u-nav">
      <navbar
        :safeAreaInsetTop="true"
        placeholder
        height="55"
        leftIconColor="#fff"
        autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="点位详情" color="#fff"></u--text>
        </view>
      </navbar>
    </view>

    <view class="imgBox">
      <view class="imgItem" v-for="(item, index) in imageList" :key="index">
        <image
          class="img"
          @click="ClickImage(item)"
          :src="item"
          mode="scaleToFill" />
      </view>
    </view>
    <view class="top">
      <view class="title">{{ info.shopNames }}</view> <view class="line"></view>
      <view class="bottom">
        <view class="middle">
          <view class="itemTitle">{{ area }}</view>
          <view class="address">{{ info.address }}</view>
        </view>
        <view class="right" @click="openMap">
          <u-icon
            labelColor="#999999"
            label="到这里去"
            labelPos="bottom"
            labelSize="14"
            size="20"
            name="/static/assets/导航.png"></u-icon>
        </view>
      </view>
    </view>
    <view class="bottomBox">
      <view class="bottomItem">
        <view class="title">提供服务</view>
        <view class="content">{{ info.serviceName || '' }}</view>
        <view class="line"></view>
      </view>
      <view class="bottomItem">
        <view class="title">营业时间</view>
        <view class="content">{{ info.businessHoursTxt || '' }}</view>
        <view class="line"></view>
      </view>
      <view class="bottomItem">
        <view class="title">联系电话</view>
        <view class="content">{{ info.phone || '' }}</view>
        <view class="line"></view>
      </view>
    </view>
  </view>
</template>

<script>
import { getInfo } from './api'
export default {
  components: {},
  data() {
    return {
      info: {},
      imageList: [],
      area: '',
    }
  },
  onLoad(option) {
    if (option && option.mapId) {
      getInfo({ mapId: option.mapId }).then(res => {
        this.info = res.result
        if (res.result.doorstepPhoto)
          this.imageList = res.result.doorstepPhoto.split(',')
        if (res.result.areaTxt)
          this.area = res.result.areaTxt[res.result.areaTxt.length - 1]
      })
    }
  },
  onUnload() {},
  computed: {},

  methods: {
    ClickImage(PhotoAddress) {
      uni.previewImage({
        urls: [PhotoAddress], //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
        current: '', // 当前显示图片的http链接，默认是第一个
        success: function (res) {},
        fail: function (res) {},
        complete: function (res) {},
      })
    },
    openMap() {
      uni.openLocation({
        longitude: Number(this.info.longitude),
        latitude: Number(this.info.latitude),
        name: this.info.shopNames,
        address: this.info.address,
        success: function (res) {
          console.log('打开系统位置地图成功')
        },
        fail: function (error) {
          console.log(error)
        },
      })
    },
  },
}
</script>
<style>
page {
  background-color: #f5f5f5;
}
</style>
<style lang="scss" scoped>
.imgBox {
  background: #3ed697;
  display: flex;
  justify-content: space-between;
  padding: 32rpx;
  padding-bottom: 64rpx;
  width: 100%;
  margin: 0 auto;
  .imgItem {
    .img {
      width: 216rpx;
      height: 144rpx;
      border-radius: 12rpx 12rpx 12rpx 12rpx;
    }
  }
}
.top {
  width: 100%;
  height: 256rpx;
  background: #ffffff;
  border-radius: 24rpx 24rpx 0rpx 0rpx;
  padding: 32rpx;
  margin-top: -32rpx;
  .title {
    font-weight: bold;
    font-size: 40rpx;
    color: #333333;
    height: 56rpx;
    line-height: 56rpx;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .middle {
      margin-left: 32rpx;
      width: 440rpx;
      text-align: left;
      .itemTitle {
        font-weight: 400;
        font-size: 32rpx;
        color: #333333;
        line-height: 32rpx;
      }
      .address {
        font-weight: 400;
        font-size: 24rpx;
        color: #999999;
        line-height: 32rpx;
        margin-top: 20rpx;
      }
    }
    .right {
      font-weight: 400;
      font-size: 24rpx;
      color: #999999;
      line-height: 52rpx;
    }
  }
}
.bottomBox {
  margin-top: 32rpx;
  height: 100%;
  background: #ffffff;
  border-radius: 0rpx 0rpx 0rpx 0rpx;
  padding: 32rpx;
  .title {
    font-size: 32rpx;
    color: #999999;
  }
  .content {
    font-size: 28rpx;
    color: #333333;
    margin-top: 24rpx;
  }
}
.line {
  width: 688rpx;
  height: 1rpx;
  background: #ebebeb;
  border-radius: 0rpx 0rpx 0rpx 0rpx;
  margin: 20rpx auto;
}
</style>
