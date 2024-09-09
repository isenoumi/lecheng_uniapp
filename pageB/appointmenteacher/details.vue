<template>
  <view>
    <view class="u-nav">
      <navbar :safeAreaInsetTop="true" height="55" placeholder leftIconColor="#fff" autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="老师详情" color="#fff"></u--text>
        </view>
      </navbar>
    </view>
    <view class="title">
      <view class="haed-img">
        <image :src="list.bkbTeacherManagement.headImage" mode="aspectFill" style="width: 100%;height: 100%;">
        </image>
      </view>
      <view class="right">
        <view class="name">{{list.bkbTeacherManagement.speechTeacher}}

        </view>
        <view style="margin-bottom: 15rpx;">
          <span class="tab" v-if="list.bkbTeacherManagement.speechLevel == '志愿者'"
            style="padding: 0 10rpx;border-color: #3BCF99; color:#3BCF99;">{{list.bkbTeacherManagement.speechLevel}}</span>
          <span class="tab" v-if="list.bkbTeacherManagement.speechLevel == '专家'"
            style="padding: 0 10rpx;border-color: #FF861B; color:#FF861B;">{{list.bkbTeacherManagement.speechLevel}}</span>
          <span class="tab" v-if="list.bkbTeacherManagement.speechLevel == '普通老师'"
            style="padding: 0 10rpx; border-color:#1B71FF; color:#1B71FF;">{{list.bkbTeacherManagement.speechLevel}}</span>


        </view>
        <view style="font-size: 30rpx;">{{list.bkbTeacherManagement.speechYear}}年经验</view>
      </view>
    </view>
    <view class="introduce">
      <view class="title">个人简介</view>
      <view class="txt">{{list.bkbTeacherManagement.personalProfile}}</view>
    </view>
    <view class="introduce">
      <view class="title">活动图片</view>
      <view class="list-img">
        <view class="img" v-for="item in list_img" :key="item">
          <image class="hdimg" :src="item" mode="aspectFill" style="width: 660rpx;border-radius: 15rpx;"
            @click="clickImg(item)">
          </image>

        </view>
      </view>
    </view>
    <view class="btn">
      <u-button v-if="list.status==='0'" size="normal" @click="show=true" type="primary">预&ensp;约</u-button>
      <u-button v-else size="normal" type="primary">已预约</u-button>
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

            <!--         <u-picker :show='shows' :value="dateTime" @change="changeDateTime" @columnchange="changeDateTimeColumn"
              :columns="dateTimeArray">
              <view class='lableBox'>
                <view class="choose-value">{{timeStr}}</view>
              </view>
            </u-picker> -->
          </view>

        </view>
        <view class="btn">
          <u-button text="取消" @click="show=false" type="info"></u-button>
          <view style="width: 80rpx;"></view>
          <u-button text="确定" @click="reservation" type="primary"></u-button>
        </view>

      </view>
    </u-popup>
  </view>
</template>

<script>
  const {
    dateTimePicker,
    getMonthDay
  } = require('@/common/dateTimePicker.js')
  export default {
    data() {
      return {
        list_img: [],
        show: false,
        shows: false,
        mode: 'single',
        value: '',
        picker: '',
        piker: '',
        list: [],
        dateTime: '',
        dateTimeArray: '',
        startYear: 2000,
        timeStr: '请选择',
        timeDate: '',
        ids: ''
      }
    },
    onLoad(option) {
      console.log(option)
      if (option.id) {
        this.ids = option.id
        this.details()
      }
      this.initTime()
    },
    methods: {
      initTime() {
        let date = new Date();
        let endYear = date.getFullYear();
        // 获取完整的年月日 时分秒，以及默认显示的数组
        let obj = dateTimePicker(this.startYear, endYear);
        // 精确到分的处理，将数组的秒去掉
        // let lastArray = obj.dateTimeArray.pop();
        // let lastTime = obj.dateTime.pop();

        this.dateTimeArray = obj.dateTimeArray
        this.dateTime = obj.dateTime
        console.log(this.dateTimeArray);
        // this.timeStr = this.createTimeStr(this.dateTimeArray, this.dateTime);
      },
      clickImg(item) {
        uni.previewImage({
          urls: [item], //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
          current: '', // 当前显示图片的http链接，默认是第一个
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      },
      changeDateTime(e) {
        this.dateTime = e.detail.value;
        // this.timeStr = this.createTimeStr(this.dateTimeArray, this.dateTime);
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
        console.log(timeStr, '93-timeStr')
        this.timeDate = timeStr
        return timeStr
      },
      details() {
        uni.request({
          url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbAppointmentTeacher/queryById`,
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
            //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
          },
          data: {
            id: this.ids,
            // userId: uni.getStorageSync('users').id
          },
          method: "GET",
          success: (res) => {
            this.list_img = []
            let url = 'https://gh.api.cestech.com.cn:8240/mission_gh/sys/common/static/'
            res.data.result.bkbTeacherManagement.uploadPictures.split(",").map(v => {
              // v = url + v
              console.log(v, '图片')
              this.list_img.push(v)
            })
            if (res.data.result.bkbTeacherManagement.speechLevel === 1) {
              res.data.result.bkbTeacherManagement.speechLevel = '专家'
            } else if (res.data.result.bkbTeacherManagement.speechLevel === 2) {
              res.data.result.bkbTeacherManagement.speechLevel = '志愿者'
            } else if (res.data.result.bkbTeacherManagement.speechLevel === 3) {
              res.data.result.bkbTeacherManagement.speechLevel = '普通老师'
            }
            // res.data.result.bkbTeacherManagement.headImage = url + res.data.result.bkbTeacherManagement.headImage
            // res.data.result.bkbTeacherManagement.headImage =  res.data.result.bkbTeacherManagement.headImage
            this.list = res.data.result
            // this.mescroll.endSuccess(res.data.result.length);
            // if (page.num == 1) this.list = []; //如果是第一页需手动制空列表
            // this.list = this.list.concat(res.data.result); //追加新数据
          }
        })
      },
      // picker() {
      // 	// this.shows = true
      // },
      reservation() {
        if (this.timeStr != '请选择') {
          const date = this.timeDate.split(' ')
          let dateTemp = ''
          if (date[1] == '上午') dateTemp = date[0] + ' 09:00:00'
          else if (date[1] == '下午') dateTemp = date[0] + ' 18:00:00'

          uni.request({
            url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbAppointmentTeacher/activityPerson`,
            header: {
              'x-Resource-Token': uni.getStorageSync('xtoken'),
              //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
            },
            // url: `http://192.168.100.10:8087/mission_gh/wx/bkbAppointmentTeacher/activityPerson`,
            data: {
              // dateTime: this.timeStr,
              dateTime: dateTemp,
              // userId: uni.getStorageSync('users').id,
              nickName: uni.getStorageSync('nikename'),
              phone: uni.getStorageSync('phone'),
              id: this.ids
            },
            method: "GET",
            success: (res) => {

              if (res.data.code === 200) {
                this.show = false
                this.details()
              }

            }
          })
        } else {
          uni.showToast({
            icon: 'none',
            title: '请先选择时间在预约'
          })
        }
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
      }

    }
  }
</script>

<style lang="scss">
  .choose-value {
    font-size: 32rpx;
    color: orange;
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
    /deep/.u-button {
      width: 725rpx !important;
    }
  }

  .title {
    display: flex;
    align-items: center;
    padding: 30rpx 45rpx;

    .haed-img {
      width: 160rpx;
      height: 160rpx;
      border-radius: 50%;

    }

    .right {
      margin-left: 30rpx;
    }

    .name {
      display: flex;
      align-items: center;
      margin-bottom: 10rpx;
      font-weight: 550;

      .tab {
        margin-left: 10rpx;
        font-size: 20rpx;
        border: 1rpx solid rgb(249, 176, 41);
        color: rgb(249, 176, 41);
        padding: 0rpx 6rpx;
      }
    }
  }

  .introduce {
    background: #fff;
    padding: 30rpx 45rpx;
    font-size: 32rpx;
    margin-bottom: 10rpx;

    .title {
      padding: 10rpx 0;
      font-size: 34rpx;
      font-weight: 550;

    }

    .item {
      font-size: 28rpx;
      height: 90rpx;
      line-height: 90rpx;
      border-bottom: 2rpx dashed #dcdcdc;

    }

    .txt {
      color: #333333;
      font-size: 28rpx;
      line-height: 50rpx;

    }

    .list-img {
      width: 669rpx;
      border-radius: 20rpx;

      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 20rpx;

      .hdimg {
        margin-bottom: 30rpx;
      }


    }
  }

  .tab {
    text-align: center;
    padding: 4rpx 5rpx;
    height: 40rpx;
    line-height: 30rpx;
    border: 1px solid #68F1A9;
    border-radius: 10rpx;
    // width: 120rpx;
    // margin-left: 10rpx;
    font-size: 24rpx;
    margin-top: 20rpx;
    color: #3BCF99;
    margin-bottom: 10rpx;
    margin-top: 5rpx;
    // border: 1rpx solid rgb(249, 176, 41);
    // color: rgb(249, 176, 41);
    // padding: 0rpx 6rpx;
  }

  .uni-picker-container .uni-picker .uni-picker-action-confirm {
    color: #d7b57c !important;
  }
</style>