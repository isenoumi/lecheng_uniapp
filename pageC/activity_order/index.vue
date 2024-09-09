<template>
  <view>
    <view class="title-img">
      <image :src="listData.bkbActivityCustomization.coverUrl" mode="aspectFill" style="width: 100%;height: 100%;">
      </image>
    </view>
    <view class="introduce">
      <view class="title">活动信息</view>
      <view class="item">活动名称：{{listData.bkbActivityCustomization.activityName}}</view>
      <view class="item">活动类型：{{listData.bkbActivityCustomization.activityType}}</view>
      <!-- <view class="item">活动地址：{{listData.bkbActivityCustomization.activitySite}}</view>
			<view class="item">活动主办：{{listData.bkbActivityCustomization.organizer}}</view>
			<view class="item">活动时长：{{time}}</view>
			<view class="item">开始时间：{{listData.bkbActivityCustomization.startDate}}</view>
			<view class="item">结束时间：{{listData.bkbActivityCustomization.endDate}}</view> -->
    </view>
    <view class="introduce">
      <view class="title">活动简介</view>
      <view class="txt">{{listData.bkbActivityCustomization.activityIntro}}</view>
    </view>
    <view class="introduce">
      <view class="title">活动图片</view>
      <view class="list-img">
        <view class="img" v-for="item in list_img">
          <image :src="item" @click="clickImg(item)" mode="aspectFill" style="width: 200rpx;height: 200rpx;"></image>
        </view>
      </view>
    </view>

    <view style="height: 100rpx;"></view>
  </view>
</template>

<script>
  const {
    dateTimePicker,
    getMonthDay
  } = require('@/common/dateTimePicker.js')
  import {
    activityPerson
  } from '@/common/api.js'
  export default {
    data() {
      return {
        list_img: [

        ],
        listData: [],
        status_txt: '',
        id: '',
        show: false,
        dateTime: null,
        dateTimeArray: null,
        startYear: 2000,
        timeStr: '请选择',
        timeDate: '',
        ids: ''
      }
    },
    onLoad(option) {
      console.log(option.id)
      if (option.id) {
        this.id = option.id
        this.details()
      }


    },
    computed: {
      time() {
        if (this.listData.bkbActivityCustomization.startDate && this.listData.bkbActivityCustomization.endDate) {

          var difftime = (new Date(this.listData.bkbActivityCustomization.endDate) - new Date(this.listData
            .bkbActivityCustomization.startDate)) / 1000; //计算时间差
          console.log(difftime)

          var days = parseInt(difftime / 86400); // 天  24*60*60*1000
          var hours = parseInt(difftime / 3600) - 24 * days; // 小时 60*60 总小时数-过去的小时数=现在的小时数
          var minutes = parseInt(difftime % 3600 / 60); // 分钟 -(day*24) 以60秒为一整份 取余 剩下秒数 秒数/60 就是分钟数
          var seconds = parseInt(difftime % 60); // 以60秒为一整份 取余 剩下秒数
          if (days === 0) {
            return hours + '时' + minutes + '分'
          } else {
            return days + '天' + hours + '时' + minutes + '分'
          }

          // return days + '天' + hours + '时' + minutes + '分' + seconds + '秒'
          // return hours + '时' + minutes + '分' 
        } else {
          return ''
        }
      },
    },
    methods: {
      clickImg(item) {
        uni.previewImage({
          urls: [item], //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
          current: '', // 当前显示图片的http链接，默认是第一个
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      },
      details() {

        uni.request({
          url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbActivityCustomization/queryById`,
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
            //'x-Resource-Token':uni.getStorageSync('xtoken'),, //自定义请求头信息
          },
          data: {
            id: this.id,
            nickName: uni.getStorageSync('users').nickName
          },
          method: "GET",
          success: (res) => {
            let url = 'https://gh.api.cestech.com.cn:8240/mission_gh/sys/common/static/'
            console.log(res.data.result, 'cc')


            if (res.data.result.bkbActivityCustomization.activityType === 0) {
              res.data.result.bkbActivityCustomization.activityType = '大型活动'
            } else if (res.data.result.bkbActivityCustomization.activityType === 1) {
              res.data.result.bkbActivityCustomization.activityType = '中型活动'
            } else {
              res.data.result.bkbActivityCustomization.activityType = '小型活动'
            }

            // res.data.result.bkbActivityCustomization.coverUrl = url + res.data.result
            // 	.bkbActivityCustomization.coverUrl
            this.listData = res.data.result
            // this.list_img=res.data.result.activityUrl.split(",")
            res.data.result.bkbActivityCustomization.activityUrl.split(",").map(v => {
              // v = url + v
              console.log(v, '图片')
              this.list_img.push(v)
            })

            console.log(this.list_img, 'this.list_img')
          }
        })
      },
      change(e) {
        console.log('change', e);
      },
      confirm(e) {
        console.log(e);
        this.piker = e[0]
        this.shows = false
      },
      clo() {
        this.shows = false
      },
      open() {
        // console.log('open');
      },
      close() {
        this.show = false
        // console.log('close');
      },
      yuyue() {
        // if(this.listData.status === "0"){
        this.show = true

        // }
      },



    }
  }
</script>

<style lang="scss">
  page {
    background: #f5f5f5;
    color: #333;
  }

  .choose-value {
    font-size: 32rpx;
  }

  .msk {
    width: 600rpx;
    height: 360rpx;

    .btn {
      width: 300rpx;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 10rpx;
      margin-top: 100rpx;
      margin-left: 260rpx;

      .btns {
        width: 160rpx;
        height: 60rpx;
        line-height: 60rpx;
        text-align: center;
        font-size: 28rpx;
        border: 10rpx;
        margin-right: 30rpx;
        background: royalblue;
        color: #fff;
      }
    }

    .picker {
      margin: 0 auto;
      display: flex;
      align-items: center;
      width: 90%;
      padding-left: 30rpx;
      margin-top: 45rpx;
    }

    .head {
      text-align: center;
      margin-top: 65rpx;
    }
  }

  .btn {
    width: 300rpx;
    margin: 40rpx auto;
  }

  .title-img {
    width: 750rpx;
    height: 340rpx;
  }

  .introduce {
    background: #fff;
    padding: 30rpx 25rpx;
    font-size: 32rpx;
    margin-bottom: 10rpx;

    .title {
      font-size: 36rpx;
      font-weight: 550;
    }

    .item {
      font-size: 28rpx;
      height: 90rpx;
      line-height: 90rpx;
      border-bottom: 2rpx dashed #dcdcdc;

    }

    .txt {
      margin-top: 15rpx;
      font-size: 28rpx;
      line-height: 50rpx;

    }

    .list-img {
      width: 750rpx;
      margin-top: 30rpx;
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .img {
        width: 250rpx;
        margin-bottom: 20rpx;
      }
    }
  }
</style>