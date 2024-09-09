<template>
  <view>
    <view class="u-nav">
      <navbar :safeAreaInsetTop="true" height="55" placeholder leftIconColor="#fff" autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="活动定制" color="#fff"></u--text>
        </view>
      </navbar>
    </view>


    <u-tabs :list="list" lineColor="#3BCF99" lineWidth="50" @click="dateli" :scrollable="false"></u-tabs>
    <!-- <view class="li" v-for="item,index in list" @click="dateli(item.name)">
        <view :style="{color:index==num? 'red':'black'}">{{item.name}}</view>
      </view> -->

    <view class="defaultActivity">
      <view class="img" style="width: 100%; margin: 0rpx auto;">
        <image :src="defaultActivity.imgUrl" style="width: 100%;" mode="widthFix"></image>
      </view>
      <view class="defaultBtn">
        <u-button text="预约" @click="showReservation = true" size="normal" type="primary"></u-button>
      </view>
    </view>
    <u-popup :show="showReservation" mode="center" @close="showReservation = false" :round="10" :closeable="true">
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

    <view class="history">
      历史活动
    </view>
    <u-line></u-line>
    <view class="activityList">
      <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
        <view>
          <view class="list">
            <view class="li" v-for="item,index in activityList" @click="information(item.id)" :key="index">
              <view class="img">
                <image :src="item.coverUrl" mode="" style="   border-radius: 12rpx;width: 100%;height: 100%;">
                </image>
              </view>
              <view class="right">
                <view class="name">{{item.activityName}}</view>
              </view>
            </view>
          </view>
        </view>
      </mescroll-body>

    </view>
  </view>
</template>

<script>
  import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
  import {
    getActivityList,
    bookActivity,
    getDefalutActivity
  } from "@/api/activity/index.js"
  import {
    dateTimePicker,
    getMonthDay
  } from '@/common/dateTimePicker.js'
  import cellGroup from "../../uni_modules/uview-ui/libs/config/props/cellGroup";
  export default {
    mixins: [MescrollMixin], // 使用mixin
    data() {
      return {
        list: [{
            url: '../../static/assets/home/dz.png',
            name: '大型活动'
          },
          {
            url: '../../static/assets/home/dz.png',
            name: '中型活动'
          },
          {
            url: '../../static/assets/home/dz.png',
            name: '小型活动'
          }
        ],
        num: 0,
        activityList: [

        ],
        title: '',
        defaultActivity: { // 默认活动
          imgUrl: '',
          id: ''
        },

        showReservation: false, // 默认活动预约弹框
        dateTime: '', // 临时变量时间
        dateTimeArray: '', // 时间picker
        timeStr: '请选择',
        timeDate: '', // 预约时间
      }
    },
    onLoad() {
      this.initTime()
      this.getDefalutActivity()
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
      }
    },
    methods: {

      getDefalutActivity() {
        if (this.num == 0) this.defaultActivity.id = '1691337645224940038'
        else if (this.num == 1) this.defaultActivity.id = '2342342342342343242'
        else if (this.num == 2) this.defaultActivity.id = '4564564565465465442'
        getDefalutActivity({
          id: this.defaultActivity.id,
        }).then(res => {
          console.log(res.data.result.coverUrl, 'xxx')
          this.defaultActivity.imgUrl = res.data.result.coverUrl
        })
      },
      // 选择活动类型
      dateli(e) {
        console.log(e.name, 'xx')
        if (e.name === '大型活动') {
          this.num = 0
        } else if (e.name === '中型活动') {
          this.num = 1
        } else {
          this.num = 2
        }
        this.getDefalutActivity()
        getActivityList({
          pageNo: 1,
          pageSize: 10,
          activityType: this.num
        }).then(res => {
          this.activityList = []; //如果是第一页需手动制空列表
          this.activityList = this.activityList.concat(res.data.result.records); //追加新数据
          console.log('this.activityList', this.activityList);
        })
      },
      /*下拉刷新的回调 */
      downCallback() {
        this.mescroll.resetUpScroll()
      },
      /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
      upCallback(page) {
        getActivityList({
          pageNo: page.num,
          pageSize: page.size,
          activityType: this.num
        }).then(res => {
          this.mescroll.endSuccess(res.data.result.records.length);
          if (page.num == 1) this.activityList = []; //如果是第一页需手动制空列表
          this.activityList = this.activityList.concat(res.data.result.records); //追加新数据

        })

      },
      // 活动详情
      information(id) {
        uni.navigateTo({
          url: `/pageB/activitycustomized/information?id=${id}`
        })
      },
      // 预约活动
      reservation() {
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
                bookActivity({
                  id: this.defaultActivity.id,
                  nickName: name,
                  phone: uni.getStorageSync('phone'),
                  time: dateTemp,

                }).then(res => {
                  uni.showToast({
                    icon: 'success',
                    title: '预约成功'
                  })
                  this.showReservation = false
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
      },
      // 预约日期选择
      initTime() {
        let date = new Date();
        let endYear = date.getFullYear();
        // 获取完整的年月日 时分秒，以及默认显示的数组
        let obj = dateTimePicker(2000, endYear);
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
        let timeStr = dateTimeArray[0][dateTime[0]] + '-' + dateTimeArray[1][dateTime[1]] + '-' + dateTimeArray[2][
          dateTime[2]
        ] + ' ' + dateTimeArray[3][dateTime[3]]
        this.timeDate = timeStr
        return timeStr
      },
    }
  }
</script>

<style lang="scss">
  @import './css/index.scss'
</style>