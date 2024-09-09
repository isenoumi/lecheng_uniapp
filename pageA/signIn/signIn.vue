<template>
  <view>

    <view class="tips">
      <view class="woyao" @click="back">
        <u-icon name="arrow-left" color="#FFF" size="22"></u-icon>
        <view style="margin-left: 210rpx;">我要打卡</view>
      </view>
      <image src="http://cdn.cestech.com.cn/BkpKnowledge/img/a6dfefd329e04b6fb47831b53cd26a66.jpg" mode="widthFix">
      </image>
    </view>

    <view class="top">
      <view class="titleA">
        <view class="">
          已连续打卡:
        </view>
        <view class="checkDays">{{checkDays}}天</view>
      </view>
      <view class="box">
        <view v-for="(item,index) in 21" :key="index">

          <view class="isCheck" v-if="index<checkDays && index != 20">
            <view class="day">
              <view class="title">
                第{{index+1}}天
              </view>
              <image src="../../static/assets/gou.png" mode=""></image>
            </view>
          </view>
          <view class="noCheck" v-if="index>=checkDays && index != 20">
            <view class="day">
              <view class="title">
                第{{index+1}}天
              </view>
              <image src="../../static/assets/gouNo.png" mode=""></image>
            </view>
          </view>
          <view class="noCheck" v-else-if="index == 20 ">
            <view class="day">
              <view class="title">
                第{{index+1}}天
              </view>
              <image src="http://cdn.cestech.com.cn/BkpKnowledge/img/1fd071f3174d46cbb2c5f663a4a86cc5.png" mode="">
              </image>
            </view>
          </view>
        </view>
      </view>

      <view class="bottom">
        <view class="btn" @click="toCheck" v-if="!isCheck">
          今日打卡
        </view>
        <view class="btn isCheck" v-else>
          今日已打卡
        </view>
      </view>
    </view>


  </view>
</template>

<script>
  import cellGroup from '../../uni_modules/uview-ui/libs/config/props/cellGroup'
  export default {
    data() {
      return {
        lt: `< `,
        isCheck: false,
        checkDays: 0,
        dateNow: '',
        // checkDateList:[],
      }
    },
    onLoad() {
      if (!uni.getStorageSync('phone')) {
        uni.showToast({
          title: "请登录后再进行操作",
          icon: "none"
        })
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/center/index'
          })
        }, 1000)
        return
      }
      this.continuousClockingRecord()
    },
    methods: {
      continuousClockingRecord() {
        uni.request({
          url: 'https://gh.api.cestech.com.cn:8240/mission_gh/xcx_api/bkbContinuousClockingRecord/list',
          data: {
            pageNo: 1,
            pageSize: 100,
            phone: uni.getStorageSync("phone"),
            // phone: "17608296903"
          },
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
          },
          method: "GET",
          success: (res) => {
            let date = new Date()
            let month = date.getMonth() + 1;
            let day = date.getDate();
            month = (month > 9) ? month : ("0" + month);
            day = (day < 10) ? ("0" + day) : day;
            let today = date.getFullYear() + "-" + month + "-" + day
            console.log(today, month, day, 1);
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

          }
        })
      },

      back() {
        uni.switchTab({
          url: '/pages/index/index'
        })
      },

      toCheck() {
        console.log(111);
        if (uni.getStorageSync('avatarUrl') && uni.getStorageSync('nikename') && uni.getStorageSync('iphone')) {
          uni.redirectTo({
            url: '/pageA/check/check'
          })
        } else {
          uni.showToast({
            icon: 'none',
            title: '请先登录在打卡'
          })
          setTimeout(() => {
            uni.switchTab({
              url: '/pages/center/index'
            })
          }, 1000)
        }
      },
    }
  }
</script>

<style lang="scss">
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
    top: 600rpx;
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
    background: #FAFAFA;
    border-radius: 20rpx;

    .titleA {
      display: flex;
      justify-content: space-between;
      height: 82rpx;
      background: #FFFFFF;
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
      background: #29CE8C;
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
      color: #FFFFFF;
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
        background-color: #ACECD2;
      }

      .title {
        font-size: 20rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #29CE8C;
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
    background: #29CE8C;
    border-radius: 20rpx;
    line-height: 100rpx;
    color: #fff;

    text-align: center;
    margin: 40rpx auto;
  }

  .isCheck {
    background: #A0DEC5;
  }
</style>