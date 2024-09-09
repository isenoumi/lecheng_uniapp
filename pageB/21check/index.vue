<template>
  <view>
    <view class="mainBox bg-white">
      <view class="u-nav">
        <navbar
          :safeAreaInsetTop="true"
          placeholder
          height="55"
          leftIconColor="#000"
          :hasImage="false"
          bgColor="transparent"
          autoBack>
          <view class="u-nav-slot" slot="center">
            <u--text text="我要打卡" color="#000"></u--text>
          </view>
        </navbar>
      </view>
    </view>
    <image
      style="width: 100%; position: absolute; top: 0rpx; z-index: -99"
      src="http://cdn.cestech.com.cn/BkpKnowledge/img/37b0a0c045114f2da211652d18323c3e.png"
      mode="scaleToFill" />

    <view class="top">
      <view class="titleA">
        <view class=""> 已连续打卡: </view>
        <view class="checkDays">{{ checkDays }}天</view>
      </view>
      <view class="box">
        <view v-for="(item, index) in 21" :key="index">
          <view class="isCheck" v-if="index < checkDays && index != 20">
            <view class="day">
              <view class="title"> 第{{ index + 1 }}天 </view>
              <image src="../../static/assets/gou.png" mode=""></image>
            </view>
          </view>
          <view class="noCheck" v-if="index >= checkDays && index != 20">
            <view class="day">
              <view class="title"> 第{{ index + 1 }}天 </view>
              <image src="../../static/assets/gouNo.png" mode=""></image>
            </view>
          </view>
          <view class="noCheck" v-else-if="index == 20">
            <view class="day">
              <view class="title"> 第{{ index + 1 }}天 </view>
              <!-- <image
                src="http://cdn.cestech.com.cn/BkpKnowledge/img/1fd071f3174d46cbb2c5f663a4a86cc5.png"
                mode=""></image> -->
              <image src="../../static/assets/gouNo.png" mode=""></image>
            </view>
          </view>
        </view>
      </view>

      <view class="bottom">
        <view class="btn" @click="toCheck" v-if="!isCheck"> 今日打卡 </view>
        <view class="btn isCheck" v-else> 今日已打卡 </view>
      </view>
    </view>
  </view>
</template>

<script>
// import cellGroup from '../../uni_modules/uview-ui/libs/config/props/cellGroup'
export default {
  data() {
    return {
      lt: `< `,
      isCheck: false,
      checkDays: 0,
      dateNow: '',
      title: '',
      // checkDateList:[],
    }
  },
  onShow(option) {
    this.continuousClockingRecord()
    this.title = option.title
  },
  methods: {
    continuousClockingRecord() {
      uni.request({
        url: 'https://gh.api.cestech.com.cn:8240/mission_gh/xcx_api/bkbContinuousClockingRecord/list',
        data: {
          pageNo: 1,
          pageSize: 100,
          phone: uni.getStorageSync('phone'),
          // phone: "17608296903"
        },
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
        },
        method: 'GET',
        success: res => {
          let date = new Date()
          let month = date.getMonth() + 1
          let day = date.getDate()
          month = month > 9 ? month : '0' + month
          day = day < 10 ? '0' + day : day
          let today = date.getFullYear() + '-' + month + '-' + day
          console.log(today, month, day, 1)
          let checkDateList = []
          this.checkDays = res.data.result.records.length
          res.data.result.records.forEach(item => {
            // console.log(item.printingDate);
            checkDateList.push(item.printingDate.slice(0, 10))
          })
          checkDateList.forEach(item => {
            if (item == today) {
              this.isCheck = true
            }
          })
        },
      })
    },

    back() {
      uni.switchTab({
        url: '/pages/index/index',
      })
    },

    toCheck() {
      if (uni.getStorageSync('phone')) {
        uni.navigateTo({
          url: '/pageB/21check/check?title=' + this.title,
        })
      } else {
        uni.showToast({
          icon: 'none',
          title: '请先登录',
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
<style>
page {
  background-color: #fff;
}
</style>
<style lang="scss" scoped>
page {
  width: 100%;
  height: 100%;
  display: flex;
  // padding: 0 26rpx;
  // font-size: 34upx;
  font-family: sfprodisplay-regular;
  background: #4faa64;
  justify-content: center;
}

.tips {
  .woyao {
    display: flex;
    justify-content: space-around;
    position: absolute;
    top: 100rpx;
    left: 50rpx;
    color: #fff;
  }

  image {
    width: 750rpx;
  }
}

.top {
  position: absolute;
  top: 400rpx;
  left: 60rpx;
  margin: 0 auto;
  // background-color: #FFFFFF;
  z-index: 99999;
  // width: 678rpx;
  padding: 36rpx;
  // width: 636rpx;
  // margin-top: -300rpx;
  width: 625rpx;
  height: 845rpx;
  background: #fafafa;
  border-radius: 20rpx;

  .titleA {
    display: flex;
    justify-content: space-between;
    height: 82rpx;
    background: #ffffff;
    border-radius: 13rpx 13rpx 0rpx 0rpx;
    height: 24rpx;
    line-height: 24rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;

    .checkDays {
      color: #29ce8c;
    }
  }
}

.box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .day {
    padding-top: 5rpx;
    width: 100rpx;
    height: 100rpx;
    background: #29ce8c;
    border-radius: 7rpx;
    text-align: center;
    margin-top: 20rpx;
    margin-left: 10rpx;
    color: #fff;
    text-align: center;
  }

  // justify-content: space-between;
  // align-items: center;
  // flex-wrap: wrap;
  // flex-direction: column;

  .title {
    margin: 0 auto 15rpx;
    width: 80rpx;
    height: 24rpx;
    line-height: 24rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
  }

  .isCheck {
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // flex-wrap: wrap;
    // flex-direction: column;
    // text-align: center;

    image {
      width: 40rpx;
      height: 40rpx;
    }
  }

  .noCheck {
    // margin-top: 40rpx;
    .day {
      background-color: #acecd2;
    }

    .title {
      font-size: 20rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #29ce8c;
    }

    image {
      width: 40rpx;
      height: 40rpx;
    }
  }
}

.btn {
  width: 425rpx;
  height: 100rpx;
  background: #29ce8c;
  border-radius: 20rpx;
  line-height: 100rpx;
  color: #fff;

  text-align: center;
  margin: 40rpx auto;
}

.isCheck {
  background: #a0dec5;
}
</style>
