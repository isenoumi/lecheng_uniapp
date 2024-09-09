<template>
  <view>
    <!-- <view class="img">
        <view class="header" :style="'padding-top:' + titleHeight + 'px'">
          <view @click="go_to">
            <u-icon name="arrow-left" color="#fff" size="22" bold></u-icon>
          </view>
          <view class="name">答题竞赛</view>
        </view>
        <image
          class="imgs"
          src="http://cdn.cestech.com.cn/BkpKnowledge/img/a3c2bf883a834fecaafeef686e245890.jpg"
          mode="scaleToFill"></image>
      </view> -->
    <view class="mainBox bg-white">
      <view class="u-nav">
        <navbar :safeAreaInsetTop="true" placeholder height="55" leftIconColor="#000" :hasImage="false"
          bgColor="transparent" autoBack>
          <view class="u-nav-slot" slot="center">
            <u--text text="答题挑战" color="#000"></u--text>
          </view>
        </navbar>
      </view>
    </view>
    <image style="width: 100%; position: absolute; top: 0rpx; z-index: -99"
      src="http://cdn.cestech.com.cn/BkpKnowledge/img/5e8eee366011459da4e7a5043a750c73.png" mode="scaleToFill" />
    <view class="box">
      <view class="title">
        <view class="txt"><text>答题次数：</text><text class="order">{{ numberExercises }}次</text></view>
        <view class="txt"><text>已答题数：</text><text class="order">{{ numberAnswers }}题</text></view>
      </view>
      <view class="line"></view>
      <view class="mian">
        <view class="name">答题规则提示：</view>
        <view class="text">
          <!-- <view
              >1、每开始进行答题时，随机获取5道题进行答题，当全部答题完成时，系统则给与积分作为答题竞赛奖励。</view
            >
            <view class="gz"
              >2、中途答题出错时，可选择重新开始以及继续答题，如果选择继续答题时，当题答完题时则没有对应的积分奖励。</view
            >
            <view
              >3、重新答题时，可重新随机获取5道题给到用户进行答题，这时如果全部答对，可获得对应的积分奖励。</view
            >
          </view> -->
          在平常生活中，垃圾分类处理越来越受到人们的重视。通过此次活动，让学生们知道垃圾分类的意义和标准，了解可回收垃圾、生活垃圾和有害垃圾都包括哪些，从而引导学生养成在日后生活中能够分类投放各类垃圾的好习惯。让我们一起共同努力，保护好我们身边的环境，为了大家都能拥有一个清洁、美好的环境贡献出自己的一份力量。
          <view class="btn" @click="start">开始答题</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        titleHeight: 0,
        numberExercises: 0,
        numberAnswers: 0,
      }
    },
    onShow() {
      // #ifdef MP-WEIXIN
      this.getHeight()
      this.getNumTimes()
      // this.answeredQuestionsAdded()
      // #endif
    },
    methods: {
      getNumTimes() {
        let phone = uni.getStorageSync('phone')
        uni.request({
          url: `https://gh.api.cestech.com.cn:8240/mission_gh/xcx_api/bkbChoiceqst_answer/getAnswerInformationAccordingToPhone?phone=${phone}`,
          // data: { //参数
          //   phone: uni.getStorageSync("phone")
          // },
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
            'Content-Type': 'application/x-www-form-urlencoded',
            // 'Content-Type': 'application/json' //自定义请求头信息
          },
          method: 'GET', //请求方式，必须为大写
          success: res => {
            console.log('接口返回-@@@@-', res.data)
            this.numberAnswers = res.data.result.numberAnswers
            this.numberExercises = res.data.result.numberExercises
            // if(res.data)
            // uni.showToast({
            //   icon: 'none',
            //   title: res.data.message
            // })
          },
        })
      },
      // 获取微信右上角胶囊高度
      getHeight() {
        let res = wx.getMenuButtonBoundingClientRect()
        this.titleHeight = res.top
      },
      go_to() {
        uni.navigateBack()
      },
      start() {
        if (uni.getStorageSync('iphone')) {
          uni.navigateTo({
            url: '/pageA/competition/details',
          })
        } else {
          uni.showToast({
            icon: 'none',
            title: '请先登录再答题',
          })
          setTimeout(() => {
            uni.switchTab({
              url: '/pages/center/index',
            })
          }, 1000)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .box {
    width: 688rpx;
    background: #fff;
    border-radius: 24rpx 24rpx 0 0;
    margin: 300rpx auto;

    .line {
      width: 688rpx;
      height: 1rpx;
      background: #EBEBEB;
      border-radius: 0rpx 0rpx 0rpx 0rpx;
    }

    .title {
      width: 688rpx;
      height: 82rpx;
      background: #ffffff;
      border-radius: 13rpx 13rpx 0rpx 0rpx;
      padding: 30rpx 46rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 30rpx;
      font-weight: 500;
      color: #333333;

      .txt {
        width: 224rpx;
        display: block;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 400;
        font-size: 28rpx;
        color: #999999;
        line-height: 52rpx;

        .order {
          font-weight: 400;
          font-size: 32rpx;
          color: #333333;
          line-height: 52rpx;
        }
      }

      .line {
        width: 1rpx;
        height: 40rpx;
        background: #cccccc;
        opacity: 0.4;
        border-radius: 1rpx;
      }
    }

    .mian {
      padding: 36rpx 39rpx 51rpx 39rpx;

      .name {
        font-size: 40rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #282828;
      }

      .text {
        font-family: PingFang SC;
        color: #282828;
        margin-top: 44rpx;
        font-weight: 400;
        font-size: 28rpx;
        color: #333333;
        line-height: 44rpx;

        .gz {
          margin-top: 20rpx;
          margin-bottom: 20rpx;
        }
      }

      .btn {
        width: 625rpx;
        height: 100rpx;
        background: #29ce8c;
        border-radius: 20rpx;
        text-align: center;
        line-height: 100rpx;
        font-size: 32rpx;
        font-family: PingFang SC;
        font-weight: 800;
        color: #ffffff;
        margin-top: 300rpx;
      }
    }
  }
</style>