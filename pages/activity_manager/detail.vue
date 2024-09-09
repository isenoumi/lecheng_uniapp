<!-- 查看视频 -->
<template>
  <view class="container">
    <view class="u-nav">
      <navbar
        :safeAreaInsetTop="true"
        placeholder
        height="55"
        leftIconColor="#fff"
        autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="活动详情" color="#fff"></u--text>
        </view>
      </navbar>
    </view>
    <u-loading-page :loading="pageLoading"></u-loading-page>

    <view v-if="!pageLoading">
      <image
        :src="image.quanming"
        mode="scaleToFill"
        style="
          display: block;
          width: 696rpx;
          height: 332rpx;
          margin: 10rpx auto;
        " />
      <view class="z-form-text u-p contentBox">
        <view class="z-form-item">
          <view class="z-form-item__body">
            <view class="z-form-item__body__left">
              <u--text text="活动标题:"></u--text>
            </view>
            <view class="z-form-item__body__right">
              <u--text wordWrap="anywhere" :text="detail.name"> </u--text>
            </view>
          </view>
          <u-line color="rgb(214, 215, 217)"></u-line>
        </view>

        <view class="z-form-item">
          <view class="z-form-item__body">
            <view class="z-form-item__body__left">
              <u--text text="活动类型:"></u--text>
            </view>
            <view class="z-form-item__body__right">
              <u--text
                wordWrap="anywhere"
                :text="detail.type | activityTypeText">
              </u--text>
            </view>
          </view>
          <u-line color="rgb(214, 215, 217)"></u-line>
        </view>

        <view class="z-form-item">
          <view class="z-form-item__body">
            <view class="z-form-item__body__left">
              <u--text text="活动时间:"></u--text>
            </view>
            <view class="z-form-item__body__right">
              <u--text wordWrap="anywhere" :text="detail.startDate"> </u--text>
            </view>
          </view>
          <u-line color="rgb(214, 215, 217)"></u-line>
        </view>

        <!-- <view class="z-form-item">
          <view class="z-form-item__body">
            <view class="z-form-item__body__left">
              <u--text text="活动时长:"></u--text>
            </view>
            <view class="z-form-item__body__right">
              <u--text wordWrap="anywhere" :text="detail.activityTime">
              </u--text>
            </view>
          </view>
          <u-line color="rgb(214, 215, 217)"></u-line>
        </view> -->
        <view class="z-form-item">
          <view class="z-form-item__body">
            <view class="z-form-item__body__left">
              <u--text text="活动地址:"></u--text>
            </view>
            <view class="z-form-item__body__right">
              <u--text wordWrap="anywhere" :text="address"> </u--text>
            </view>
          </view>
          <u-line color="rgb(214, 215, 217)"></u-line>
        </view>
        <view class="z-form-item">
          <view class="z-form-item__body">
            <view class="z-form-item__body__left">
              <u--text text="活动内容:"></u--text>
            </view>
            <view class="z-form-item__body__right">
              <u--text wordWrap="anywhere" :text="detail.remark"> </u--text>
            </view>
          </view>
          <!-- <u-line color="rgb(214, 215, 217)"></u-line> -->
        </view>
        <!-- <view class="z-form-item">
          <view class="z-form-item__body">
            <view class="z-form-item__body__left">
              <u--text text="活动负责人:"></u--text>
            </view>
            <view class="z-form-item__body__right">
              <u--text wordWrap="anywhere" :text="speaker ? speaker.name : ''">
              </u--text>
            </view>
          </view>
          <u-line color="rgb(214, 215, 217)"></u-line>
        </view> -->

        <!-- <view class="z-form-item">
          <view class="z-form-item__body_col">
            <view class="z-form-item__body__top">
              <u--text text="备注:"></u--text>
            </view>
            <view class="z-form-item__body__right">
              <u--text wordWrap="anywhere" :text="detail.remark">
              </u--text>

            </view>
          </view>
        </view> -->
      </view>
    </view>
    <!-- <view class="btnList" v-if="showBtn && detail.status == 40">
      <view class="btnItem">
        <u-button
          v-if="!isSubscribe"
          text="立即参加"
          @click="subscribe"
          size="normal"
          type="primary"></u-button>
        <u-button v-else text="已参加" size="normal" type="primary"></u-button>
      </view>
    </view> -->
    <view class="btnList" v-if="showBtn && detail.status == 40 && idFlag">
      <view class="btnItem">
        <u-button
          text="报名参加"
          @click="toCheck"
          size="normal"
          type="primary"></u-button>
      </view>
    </view>
    <!-- <view class="btnList" v-if="id == '1788501831615840258'">
      <view class="btnItem">
        <u-button
          v-if="!isCheck"
          text="立即打卡"
          @click="toCheck"
          size="normal"
          type="primary"></u-button>
        <u-button
          v-else
          text="今日已打卡"
          size="normal"
          type="primary"></u-button>
      </view>
    </view> -->
    <u-modal
      :show="show"
      @confirm="subscribeSubmit"
      ref="uModal"
      :asyncClose="true"
      showCancelButton
      @cancel="this.show = false"
      title="提示"
      :content="`是否参加此活动？`">
    </u-modal>
  </view>
</template>

<script>
import { activityone } from '@/common/api.js'
// import {
//   speechoractivityqrcode
// } from '@/common/api.js'
import authorize from '@/common/auth.js'
import templateIds from '@/common/template-ids'
export default {
  components: {},
  data() {
    return {
      src: '',
      title: '',
      speaker: '',
      pageLoading: true,
      globalData: getApp().globalData,
      id: null,
      show: false,
      isSubscribe: false,
      showBtn: true,
      address: '',
      isCheck: false,
      idFlag: false,
      detail: {
        name_of_activity: '',
        type: '',
        create_time: '',
        start_date: '',
      },
      image: {
        quanming: uni.getStorageSync('quanming'),
      },
    }
  },
  onShow() {
    this.continuousClockingRecord
  },
  onLoad(option) {
    if (option.showBtn == 1) this.showBtn = false
    const scene = decodeURIComponent(option.scene)
    if (scene && scene != 'undefined' && scene != 'null') {
      this.id = scene
      this.speechoractivityqrcode()
      this.getDetail()
      this.getSubscribe()
      return
    }
    if (option.id) {
      this.title = option.title
      this.id = option.id
      if (
        this.id == '1788501831615840258' ||
        this.id == '1788502007030022146' ||
        this.id == '1788497265243521025'
      )
        this.idFlag = true
      this.speechoractivityqrcode()
      this.getDetail()
      this.getSubscribe()
    } else {
      uni.$u.route({
        type: 'navigateBack',
      })
      return
    }
  },
  onUnload() {},
  computed: {},

  methods: {
    toCheck() {
      if (this.id == '1788501831615840258') {
        uni.navigateTo({
          url: `/pageB/21check/index?id=${this.id}&title=${this.title}`,
        })
      } else if (this.id == '1788502007030022146') {
        uni.navigateTo({
          url: `/pageB/check/index?id=${this.id}&title=${this.title}`,
        })
      } else if (this.id == '1788497265243521025') {
        uni.navigateTo({
          url: `/pageB/classificationCheck/index?id=${this.id}&title=${this.title}`,
        })
      }
    },
    getSubscribe() {
      uni.request({
        url: `https://gh.api.cestech.com.cn:8240/mission_gh/v1/2/book/subscribe?bookId=${this.id}`,
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
        },
        method: 'POST',
        success: res => {
          this.isSubscribe = res.data
        },
      })
    },
    subscribe() {
      if (uni.getStorageSync('avatarUrl')) {
        this.show = true
      } else {
        this.show = false
        uni.showToast({
          icon: 'none',
          title: '请先登录再预约',
        })
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/center/index',
          })
        }, 1000)
      }
    },
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
    subscribeSubmit() {
      const userId = uni.getStorageSync('users').id
      // if(uni.getStorageSync('avatarUrl')){
      this.$refs.uModal.loading = false

      uni.request({
        url: `https://gh.api.cestech.com.cn:8240/mission_gh/v1/2/book/add`,
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
        },
        data: {
          bookId: this.id,
          bookType: 'act',
        },
        method: 'POST',
        success: res => {
          this.$refs.uModal.loading = false

          if (res.data.code == 500) {
            uni.showToast({
              title: `您已参加过活动`,
              icon: 'error',
            })
          } else {
            uni.showToast({
              title: `参加成功`,
              icon: 'success',
            })
            // this.item.booked = true
            authorize
              .requestSubscribeMessage(templateIds.activity)
              .then(res => {})
          }
          uni.navigateBack()
          this.show = false
        },
      })

      authorize.requestSubscribeMessage(templateIds.activity).then(res => {})
    },

    evaluateActivities() {
      if (uni.getStorageSync('avatarUrl')) {
        uni.$u.route({
          url: 'pageB/activity/evaluate',
          params: {
            id: this.id,
          },
        })
      } else {
        uni.showToast({
          icon: 'none',
          title: '请先登录再评价',
        })
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/center/index',
          })
        }, 1000)
      }
    },
    speechoractivityqrcode() {
      // speechoractivityqrcode({
      //   id: this.id
      // }).then((res) => {
      //   this.src = res.data

      // })

      uni.request({
        url: `https://gh.api.cestech.com.cn:8240/mission_gh/xcx_api/file/activityManager?id=${this.id}`,
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
          //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
        },
        method: 'POST',
        success: res => {
          console.log(res.data.result, 'xxxx')
          this.src = res.data.result
        },
      })
    },
    getDetail() {
      this.pageLoading = true
      // activityone({
      //   id: this.id
      // }).then((res) => {
      //   this.detail = res.data
      //   this.pageLoading = false;

      // })

      uni.request({
        url: `https://gh.api.cestech.com.cn:8240/mission_gh/v1/2/activity/one?id=${this.id}`,
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
          //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
        },
        // data: {
        //   pageNo: page,
        //   pageSize: list_rows,
        //   customer_id: 1,
        // },
        method: 'GET',
        success: res => {
          this.pageLoading = false
          this.detail = res.data.result.activity

          this.speaker = res.data.result.Speaker
          console.log('xxxx', this.detail.status)
          this.detail.activityDetailsSite.map(item => {
            this.address += item
          })
          this.address += this.detail.activitySite || ''

          // this.$refs.paging.complete(res.data.result.records);
          // res.data.result.records.forEach(v => {
          //   console.log(v.points, 'vvvv')
          //   // v.knowledge["points"] = v.points;
          //   // console.log(v,'我是v')
          // })
          // this.$refs.paging.complete(res.data.result.records);
          // console.log(res.data.result.records, 'res.data.data')
        },
      })
    },
  },
}
</script>
<style>
page {
  background-color: #f5f5f5;
}
</style>
<style lang="scss" scoped>
/* .z-form-item__body{
  display: flex;
  
} */
.btnList {
  display: flex;
  justify-content: space-around;

  .btnItem {
    width: 688rpx;
    height: 80rpx;
    line-height: 80rpx;
    background: #1dd193;
    border-radius: 12rpx 12rpx 12rpx 12rpx;
    margin: 40rpx;
  }
}
.contentBox {
  width: 688rpx;
  background: #ffffff;
  border-radius: 12rpx 12rpx 12rpx 12rpx;
  margin: 36rpx auto;
}
</style>
