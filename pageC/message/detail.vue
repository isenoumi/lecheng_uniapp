<template>
  <view class="mainBox bg-white">
    <view class="u-nav">
      <navbar
        :safeAreaInsetTop="true"
        placeholder
        height="55"
        leftIconColor="#fff"
        autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="消息详情" color="#fff"></u--text>
        </view>
      </navbar>
    </view>
    <view class="item">
      <view class="itemTop">
        <view>
          <view v-if="item.messageType == 'REDEMPTION_HISTORY'">
            <u-icon
              label="  积分变动提醒"
              size="24"
              name="/static/assets/center/组 1525 (1).png"></u-icon>
          </view>
          <view v-else>
            <u-icon
              label="系统消息提醒"
              size="24"
              name="/static/assets/center/组 1525.png"></u-icon>
          </view>
        </view>
        <!-- <u-icon name="more-dot-fill" color="#C5C4C9" size="14"></u-icon> -->
      </view>
      <view class="itemCenter" v-if="item.messageType == 'REDEMPTION_HISTORY'">
        <view class="titleBox">
          <view class="title"> 积分变动： </view>
          <div style="color: #1dd193" class="content">
            {{ item.messageContent }}
          </div>
        </view>
        <view class="titleBox">
          <view class="title"> 剩余积分： </view>
          <div style="color: #333333" class="content">
            {{ item.problemStatement }}
          </div>
        </view>
        <!-- <view class="title">
                状态变更：
                <div style="color: #333333" class="content">{{}}</div>
              </view> -->
        <view class="titleBox">
          <view class="title"> 变动时间： </view>
          <div style="color: #333333" class="content">
            {{ item.createTime }}
          </div>
        </view>
      </view>
      <view class="itemCenter" v-else>
        <view class="titleBox">
          <view class="title"> 工单内容：</view>
          <view style="color: #1dd193" class="content">
            {{ item.problemStatement }}
          </view></view
        >
        <view class="titleBox">
          <view class="title">回复内容：</view>
          <view style="color: #333333" class="content">
            {{ item.messageContent }}
          </view>
        </view>
        <view class="titleBox">
          <view class="title">回复时间：</view>
          <view style="color: #333333" class="content">
            {{ item.createTime }}
          </view>
        </view>
        <!-- <view class="titleBox" class="content">
                变动时间： <view style="color: #333333">{{}}</view>
              </view> -->
      </view>
    </view>
  </view>
</template>

<script>
import { getMessageInfo } from './api'
import dayjs from 'dayjs'

export default {
  data() {
    return {
      pageLoading: true,
      globalData: getApp().globalData,
      btnLoading: false,
      id: '',
      detail: {
        content: '',
        createTime: '',
      },
      item: {},
    }
  },
  computed: {},
  filters: {},
  onLoad(option) {
    getMessageInfo({ id: option.id }).then(res => {
      this.item = res.result
    })
  },
  onReady() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.item {
  width: 748rpx;
  background: #ffffff;
  border-radius: 12rpx 12rpx 12rpx 12rpx;
  margin: 16rpx auto;
  padding: 30rpx;
  .itemTop {
    display: flex;
    justify-content: space-between;
  }
  .itemCenter {
    margin-top: 16rpx;
    .titleBox {
      /* width: 140rpx; */
      display: flex;
      justify-content: left;
      /* height: 40rpx; */
      font-family: PingFang SC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #999999;
      line-height: 40rpx;
      text-align: left;
      font-style: normal;
      text-transform: none;
      align-items: flex-start;
      margin-top: 16rpx;
      .title {
        width: 180rpx;
        height: 40rpx;
      }

      .content {
        display: inline-block;
        line-height: 40rpx;
      }
    }
  }
  .itemBottom {
    display: flex;
    justify-content: space-between;
    font-weight: 400;
    font-size: 28rpx;
    color: #333333;
    line-height: 40rpx;
  }
  .line {
    width: 624rpx;
    height: 1rpx;
    background: #ebebeb;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    margin: 28rpx auto;
  }
}
</style>
