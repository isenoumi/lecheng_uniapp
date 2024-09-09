<template>
  <view>
    <view class="mainBox bg-white">
      <view class="u-nav">
        <navbar
          :safeAreaInsetTop="true"
          placeholder
          height="55"
          leftIconColor="#fff"
          autoBack>
          <view class="u-nav-slot" slot="center">
            <u--text text="反馈详情" color="#fff"></u--text>
          </view>
        </navbar>
      </view>
    </view>
    <view class="infoBox">
      <view class="title">{{ detail.title }} </view>
      <view class="line"></view>
      <view class="infoBottom">
        <view class="info">
          <view class="infoTitle">反馈时间：</view>
          <view class="infoText">{{ detail.createTime }}</view>
        </view>
        <view class="info">
          <view class="infoTitle">办理情况：</view>
          <view class="infoText" v-if="detail.status == 'RECEIVED'"
            >已接收</view
          >
          <view class="infoText" v-else-if="detail.status == 'PROCESSING'"
            >办理中</view
          >
          <view class="infoText" v-else-if="detail.status == 'HANDLED'"
            >已办结</view
          >
        </view>
        <view class="info">
          <view class="infoTitle">问题来源：</view>
          <view v-if="detail.type == 'FREE_TO_ASK'" class="infoText">
            来自随便问工单
          </view>
          <view
            v-else-if="detail.type == 'SHOOT_WITH_YOUR_HAND'"
            class="infoText">
            来自随手拍工单
          </view>
          <view
            v-else-if="detail.type == 'SAY_WHATEVER_YOU_WANT'"
            class="infoText">
            来自随便说工单
          </view>
          <view
            v-else-if="detail.type == 'DECLARATION_RECORDS'"
            class="infoText">
            来自点位申报
          </view>
        </view>
        <image
          v-if="item.status == 'HANDLED'"
          class="image"
          src="/static/assets/feedbackCenter/组 6663.png"
          mode="scaleToFill" />
      </view>
    </view>
    <view class="resultBox" v-if="item.status == 'HANDLED'">
      <view class="title">办理结果 </view>
      <view v-if="detail.replys" class="result">{{ detail.replys }} </view>
      <view v-else-if="detail.passStatus == 'PASS'" class="result">
        您申报的点位已通过
      </view>
      <view v-else-if="detail.passStatus == 'HSIANG_HSIEN'" class="result">
        您申报的点位未通过
      </view>
    </view>
  </view>
</template>

<script>
import { getFeedbackInfo } from './api'
export default {
  data() {
    return {
      pageLoading: true,
      globalData: getApp().globalData,
      btnLoading: false,
      id: '',
      detail: {},
    }
  },
  computed: {},
  filters: {},
  onLoad(option) {
    console.log(option)
    this.id = option.id
    getFeedbackInfo({ id: option.id, type: option.type }).then(res => {
      this.detail = res.result
    })
    this.reads()
  },
  onReady() {},
  methods: {},
}
</script>
<style>
page {
  background-color: #f5f5f5;
}
</style>
<style lang="scss" scoped>
.infoBox {
  width: 688rpx;
  background: #ffffff;
  border-radius: 12rpx 12rpx 12rpx 12rpx;
  margin: 32rpx auto;
  .title {
    font-weight: bold;
    font-size: 32rpx;
    color: #333333;
    line-height: 48rpx;
    text-align: left;
    padding: 32rpx;
  }
  .line {
    width: 688rpx;
    height: 1rpx;
    background: #ebebeb;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    margin: 0rpx 0;
  }
  .infoBottom {
    padding: 26rpx;
    .info {
      display: flex;
      justify-content: left;
      .infoTitle {
        font-weight: 400;
        font-size: 28rpx;
        color: #999999;
        line-height: 40rpx;
      }
      .infoText {
        font-weight: 400;
        font-size: 28rpx;
        color: #333333;
        line-height: 40rpx;
      }
    }
    .image {
      width: 168rpx;
      height: 144rpx;
      margin: 32rpx 0 0 248rpx;
    }
  }
}
.resultBox {
  width: 688rpx;
  background: #ffffff;
  border-radius: 12rpx 12rpx 12rpx 12rpx;
  margin: 32rpx auto;
  padding: 32rpx;
  .title {
    font-weight: 400;
    font-size: 28rpx;
    color: #999999;
  }
  .result {
    font-weight: 400;
    font-size: 28rpx;
    color: #333333;
    line-height: 52rpx;
    margin-top: 32rpx;
  }
}
</style>
