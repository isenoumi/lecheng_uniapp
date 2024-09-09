<template>
  <view>
    <view class="mainBox bg-white">
      <view class="u-nav">
        <navbar
          :safeAreaInsetTop="true"
          placeholder
          height="55"
          leftIconColor="#fff"
          :hasImage="false"
          bgColor="transparent"
          autoBack>
          <view class="u-nav-slot" slot="center">
            <u--text text="活动广场" color="#fff"></u--text>
          </view>
        </navbar>
      </view>
    </view>
    <image
      style="width: 100%; position: absolute; top: 0rpx; z-index: -99"
      :src="image.quanmingTop"
      mode="scaleToFill" />
    <image
      :src="image.quanming"
      mode="scaleToFill"
      style="
        display: block;
        width: 696rpx;
        height: 332rpx;
        margin: 10rpx auto;
      " />
    <!-- <view class="infoBox">
      <view class="title">全民参与 </view>
      <view class="imageBox">
        <view class="imageBoxLeft">
          <image
            @click="toAsk"
            class="image"
            src="http://cdn.cestech.com.cn/BkpKnowledge/img/9ec684c12eb646a7a57dd6db32c7aca3.png"
            mode="scaleToFill" />
        </view>
        <view class="imageBoxRigth">
          <image
            @click="toPhotos"
            class="image"
            src="http://cdn.cestech.com.cn/BkpKnowledge/img/982e5b2c2f234691be7831e3285eaed4.png"
            mode="scaleToFill" />
          <image
            @click="toSpeak"
            class="image"
            src="http://cdn.cestech.com.cn/BkpKnowledge/img/626d825570464a3dbffc3c8e1d5aecbd.png"
            mode="scaleToFill" />
        </view>
      </view>
    </view> -->
    <view class="resultBox">
      <view class="title">活动广场</view>
      <view class="imageBox">
        <image
          @click="toActivity"
          class="image"
          :src="image.activity"
          mode="scaleToFill" />
        <!-- <image
          @click="toCheck"
          class="image"
          src="http://cdn.cestech.com.cn/BkpKnowledge/img/47068b6b17234de8b8c009a9c454ad52.png"
          mode="scaleToFill" /> -->
        <image
          class="image"
          @click="toAnswer"
          :src="image.answer"
          mode="scaleToFill" />
        <image
          class="image"
          @click="toQuestionnaire"
          :src="image.questionnaire"
          mode="scaleToFill" />
      </view>
    </view>
  </view>
</template>

<script>
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
      image: {
        quanmingTop: uni.getStorageSync('quanmingTop'),
        quanming: uni.getStorageSync('quanming'),
        activity: uni.getStorageSync('activity'),
        check: uni.getStorageSync('check'),
        answer: uni.getStorageSync('answer'),
        questionnaire: uni.getStorageSync('questionnaire'),
      },
    }
  },
  computed: {},
  filters: {},
  onLoad(option) {
    console.log(option)
    this.detail.content = option.content
    this.detail.createTime = option.createTime
    this.id = option.id
    this.reads()
  },
  onReady() {},
  methods: {
    toAnswer() {
      uni.navigateTo({ url: '/pageA/competition/index' })
    },
    toQuestionnaire() {
      uni.navigateTo({ url: '/pageB/questionnaire/index' })
    },
    toActivity() {
      uni.navigateTo({ url: '/pageA/activity/index' })
    },
    toCheck() {
      uni.navigateTo({ url: '/pageB/check/index' })
    },
    reads() {
      uni.request({
        url: `https://gh.api.cestech.com.cn:8240/mission_gh/v1/user/message/status`,
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
          //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
        },
        data: {
          id: this.id,
        },
        method: 'GET',
        success: res => {},
      })
    },
  },
}
</script>
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
  .imageBox {
    display: flex;
    justify-content: space-between;
    .imageBoxLeft {
      .image {
        width: 276rpx;
        height: 304rpx;
        display: block;
      }
    }

    .imageBoxRigth {
      display: flex;
      justify-content: space-between;
      flex-flow: column;
      .image {
        width: 404rpx;
        height: 144rpx;
        display: block;
      }
    }
  }
}
.resultBox {
  width: 688rpx;
  background: #ffffff;
  border-radius: 12rpx 12rpx 12rpx 12rpx;
  margin: 20rpx auto;
  .title {
    font-weight: bold;
    font-size: 32rpx;
    color: #333333;
    line-height: 48rpx;
    text-align: left;
    padding: 32rpx;
  }
  .imageBox {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .image {
      width: 340rpx;
      height: 224rpx;
      display: block;
      margin-top: 16rpx;
    }
  }
}
</style>
