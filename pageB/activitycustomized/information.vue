<template>
  <view>
    <view class="u-nav">
      <navbar :safeAreaInsetTop="true" height="55" placeholder leftIconColor="#fff" autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="活动详情" color="#fff"></u--text>
        </view>
      </navbar>
    </view>
    <view class="title-img">
      <image :src="listData.bkbActivityCustomization.coverUrl" mode="aspectFill" style="width: 100%;height: 100%;">
      </image>
    </view>
    <view class="introduce">
      <view class="introduce-info">
        <view class="titlebox"></view>
        <view class="img">
          <image src="http://cdn.cestech.com.cn/TrainingProgram/img/9f461c167d044fb587c9a58670c0882a.png"
            mode="scaleToFill" style="width: 100%;height: 100%;"></image>
          <view class="txt">活动信息</view>
        </view>
        <view class="conetent">
          <view class="name">活动名称：{{listData.bkbActivityCustomization.activityName}}</view>
          <view class="type">活动类型：{{listData.bkbActivityCustomization.activityType}}</view>
        </view>
      </view>
      <!-- <view class="title">活动信息</view>
			<view class="item">活动名称：{{listData.bkbActivityCustomization.activityName}}</view>
			<view class="item">活动类型：{{listData.bkbActivityCustomization.activityType}}</view> -->
      <!-- <view class="item">活动地址：{{listData.bkbActivityCustomization.activitySite}}</view>
			<view class="item">活动主办：{{listData.bkbActivityCustomization.organizer}}</view>
			<view class="item">活动时长：{{time}}</view>
			<view class="item">开始时间：{{listData.bkbActivityCustomization.startDate}}</view>
			<view class="item">结束时间：{{listData.bkbActivityCustomization.endDate}}</view> -->
    </view>
    <view class="introduce">
      <view class="introduce-info">
        <view class="titlebox"></view>
        <view class="img">
          <image src="http://cdn.cestech.com.cn/TrainingProgram/img/9f461c167d044fb587c9a58670c0882a.png"
            mode="scaleToFill" style="width: 100%;height: 100%;"></image>
          <view class="txt">活动简介</view>
        </view>
        <view class="conetent">
          <view class="name">{{listData.bkbActivityCustomization.activityIntro}}</view>

        </view>
      </view>
      <!-- <view class="title">活动简介</view>
			<view class="txt">{{listData.bkbActivityCustomization.activityIntro}}</view> -->
    </view>
    <view class="introduce">
      <view class="introduce-info">
        <view class="titlebox"></view>
        <view class="img">
          <image src="http://cdn.cestech.com.cn/TrainingProgram/img/9f461c167d044fb587c9a58670c0882a.png"
            mode="scaleToFill" style="width: 100%;height: 100%;"></image>
          <view class="txt">活动图片</view>
        </view>
        <view class="activity-img">
          <view class="aimg" v-for="(item,index) in list_img" :key="index">
            <image :src="item" mode="aspectFill"
              style="width: 294rpx;height: 220rpx;border-radius: 10rpx;margin-bottom: 20rpx;" @click="clickImg(item)">
            </image>

          </view>
        </view>
        <!-- <view class="conetent">
					
						<view class="img" v-for="(item,index) in list_img" :key="index">
							<image :src="item" mode="aspectFill" style="width: 200rpx;height: 200rpx;" @click="clickImg(item)">
							</image>
						</view>
					
				</view> -->
      </view>
      <!-- <view class="title">活动图片</view>
			<view class="list-img">
				<view class="img" v-for="(item,index) in list_img" :key="index">
					<image :src="item" mode="aspectFill" style="width: 200rpx;height: 200rpx;" @click="clickImg(item)">
					</image>
				</view>
			</view> -->
    </view>
    <view class="myBtn" @click="yuyue">
      预约
    </view>
    <u-popup :show="show" mode="center" @close="close" @open="open" :round="10" :closeable="true">
      <view class="msk">
        <view class="head">预约时间选择</view>
        <view class="picker" @click="shows=true">
          <text style="font-size: 30rpx;">预约时间:</text>
          <view style="width: 10rpx;"></view>
          <view class="choose-value-box row column-me">

            <picker mode="multiSelector" :value="dateTime" @change="changeDateTime" @columnchange="changeDateTimeColumn"
              :range="dateTimeArray">
              <view class='lableBox'>
                <view class="choose-value">{{timeStr}}</view>
              </view>
            </picker>
          </view>

        </view>
        <view class="btn">
          <u-button text="取消" @click="show=false" type="info"></u-button>
          <view style="width: 80rpx;"></view>
          <u-button text="确定" @click="reservation" type="primary"></u-button>
        </view>

      </view>
    </u-popup>
    <view style="height: 100rpx;"></view>
  </view>
</template>

<script>
  // const {
  //   dateTimePicker,
  //   getMonthDay
  // } = require('@/common/dateTimePicker.js')
  import {
    dateTimePicker,
    getMonthDay
  } from '@/common/dateTimePicker.js'
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
        dateTime: '',
        dateTimeArray: '',
        startYear: 2000,
        timeStr: '请选择',
        timeDate: '',
        ids: '',
      }
    },
    onLoad(option) {
      console.log(option.id)
      if (option.id) {
        this.id = option.id
        this.details()
        this.initTime()
      }


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
      initTime() {
        let date = new Date();
        let endYear = date.getFullYear();
        // 获取完整的年月日 时分秒，以及默认显示的数组
        let obj = dateTimePicker(this.startYear, endYear);
        // 精确到分的处理，将数组的秒去掉

        this.dateTimeArray = obj.dateTimeArray
        this.dateTime = obj.dateTime
      },

      changeDateTime(e) {
        this.dateTime = e.detail.value;
        var aa = this.createTimeStr(this.dateTimeArray, this.dateTime);
        this.timeStr = aa.replace(/\.|\-/g, '/');
      },

      /*年,月切换时重新更新计算*/
      changeDateTimeColumn(e) {
        //let {id} = e.target;
        let {
          column,
          value
        } = e.detail;
        if (column == 0 || column == 1) {
          //直接修改数组下标视图不更新,用深拷贝之后替换数组
          let dateTime = JSON.parse(JSON.stringify(this.dateTime));
          let dateTimeArray = JSON.parse(JSON.stringify(this.dateTimeArray));
          dateTime[column] = value;
          dateTimeArray[2] = getMonthDay(dateTimeArray[0][dateTime[0]], dateTimeArray[1][dateTime[1]]);
          this.dateTime = dateTime;
          this.dateTimeArray = dateTimeArray;
        }
      },

      createTimeStr(dateTimeArray, dateTime) {
        // let timeStr = dateTimeArray[0][dateTime[0]] + '-' + dateTimeArray[1][dateTime[1]] + '-' + dateTimeArray[2][
        // 	dateTime[2]
        // ] + ' ' + dateTimeArray[3][dateTime[3]] + ":" + dateTimeArray[4][dateTime[4]] + ":" + dateTimeArray[5][
        // 	dateTime[5]
        // ];
        let timeStr = dateTimeArray[0][dateTime[0]] + '-' + dateTimeArray[1][dateTime[1]] + '-' + dateTimeArray[2][
          dateTime[2]
        ] + ' ' + dateTimeArray[3][dateTime[3]]
        this.timeDate = timeStr
        return timeStr
      },
      details() {

        uni.request({
          url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbActivityCustomization/queryById`,
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
            //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
          },
          data: {
            id: this.id,
            nickName: uni.getStorageSync('nikename')
          },
          method: "GET",
          success: (res) => {
            if (res.data.code === 200) {
              let url = 'https://gh.api.cestech.com.cn:8240/mission_gh/sys/common/static/'
              console.log(res.data.result, 'cc')


              if (res.data.result.bkbActivityCustomization.activityType === 0) {
                res.data.result.bkbActivityCustomization.activityType = '大型活动'
              } else if (res.data.result.bkbActivityCustomization.activityType === 1) {
                res.data.result.bkbActivityCustomization.activityType = '中型活动'
              } else {
                res.data.result.bkbActivityCustomization.activityType = '小型活动'
              }
              // if (res.data.result.status === "0") {
              // 	this.status_txt = '预约'
              // } else {
              // 	this.status_txt = '已预约'
              // }
              // res.data.result.bkbActivityCustomization.coverUrl =  res.data.result.bkbActivityCustomization.coverUrl
              this.listData = res.data.result
              // this.list_img=res.data.result.activityUrl.split(",")
              res.data.result.bkbActivityCustomization.activityUrl.split(",").map(v => {
                // v = url + v
                console.log(v, '图片')
                this.list_img.push(v)
              })

              console.log(this.list_img, 'this.list_img')
            }
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
      reservation() {
        console.log(this.listData.status, 'xxxx')
        // if (this.listData.status === "0") {
        if (this.timeStr != '请选择') {
          uni.showModal({
            title: '提示',
            content: '是否预约当前活动',
            cancelText: '取消',
            confirmText: '确定',
            success: (res) => {
              let name = uni.getStorageSync('users').nickName
              if (res.confirm) {
                const date = this.timeDate.split(' ')
                let dateTemp = ''
                if (date[1] == '上午') dateTemp = date[0] + ' 09:00:00'
                else if (date[1] == '下午') dateTemp = date[0] + ' 18:00:00'

                uni.request({
                  url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbActivityCustomization/activityPerson`,
                  header: {
                    'x-Resource-Token': uni.getStorageSync('xtoken'),
                  },
                  data: {
                    id: this.listData.bkbActivityCustomization.id,
                    nickName: name,
                    phone: uni.getStorageSync('phone'),
                    time: dateTemp,
                  },
                  method: "GET",
                  success: (res) => {

                    uni.showToast({
                      icon: 'success',
                      title: '预约成功'
                    })
                    // this.details()
                    setTimeout(() => {
                      uni.navigateBack()
                    }, 1000)


                  }

                })

              }
            }
          })
        } else {
          uni.showToast({
            icon: 'none',
            title: '请先选择时间在预约'
          })
        }


      }


    }
  }
</script>

<style lang="scss">
  page {
    // background: #f5f5f5;
    color: #333;
  }

  .introduce-info {
    margin: 0 auto;
    width: 666rpx;

    background: #F2F6F3;
    border-radius: 30rpx;
    position: relative;

    .conetent {
      font-size: 28rpx;
      margin-top: 80rpx;
      padding: 0 60rpx 30rpx 60rpx;
      font-weight: 500;
      color: #0A9861;

      .type {
        margin-top: 15rpx;
      }
    }

    .activity-img {
      padding: 90rpx 30rpx 20rpx 30rpx;

      .aimg {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-bottom: 30rpx;
      }
    }

    .titlebox {
      margin: 0 auto;
      width: 640rpx;
      height: 10rpx;
      background: linear-gradient(90deg, #1DD09C 0%, #6DF3AA 100%);
      border-radius: 60rpx 60rpx 0 0;

    }

    .img {
      position: absolute;
      left: 35rpx;
      top: -5rpx;
      width: 203rpx;
      height: 76rpx;

      .txt {
        font-size: 31rpx;
        position: absolute;
        top: -0rpx;
        left: 30rpx;
        color: #fff;
        font-weight: 550;
      }
    }
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
    padding: 20rpx 25rpx 0 25rpx;
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

  .myBtn {
    width: 95%;
    height: 72rpx;
    background: #29CE8C;
    line-height: 72rpx;
    text-align: center;
    border-radius: 11rpx;
    color: #fff;
    margin: 30rpx auto;
  }
</style>