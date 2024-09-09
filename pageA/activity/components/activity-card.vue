<template>
  <view class="box">
    <!-- <uni-card > -->
    <view class="header" @click="goDetail(item)">
      <view class="img">
        <image
          mode="scaleToFill"
          style="width: 100%; height: 100%"
          :src="image.quanming"></image>
        <view class="icon" v-if="item.status == 31">
          <image
            mode="scaleToFill"
            src="/static/assets/task/组 6942.png"></image>
        </view>
        <view class="icon" v-if="item.status == 40">
          <image
            mode="scaleToFill"
            src="/static/assets/task/组 6942(2).png"></image>
        </view>
        <view class="icon" v-if="item.status == 50">
          <image
            mode="scaleToFill"
            src="/static/assets/task/组 6942(1).png"></image>
        </view>
      </view>
      <view class="box-right">
        <view class="left">
          <view class="name">{{ item.name }}</view>
        </view>
        <view class="left">
          <view class="time">开始时间:{{ item.startDate || '' }}</view>
          <!-- <view>{{ item.type | activityTypeText | typeText }}</view> -->
        </view>
      </view>
    </view>
    <!-- <view class="card-actions" v-if="isRefresh">
      <view
        class="card-actions-item details"
        @click="goDetail(item)"
        v-if="item.status != actStatus.success">
        查看详情
      </view>
      <view
        class="card-actions-item details"
        style="margin-left: 10rpx"
        @click="goEvaluate(item)"
        v-if="item.status == actStatus.underway">
        评价活动
      </view>
      <view
        class="card-actions-item reservationbtn"
        @click="subscribe(item, '预约')"
        v-if="!item.booked && item.status == actStatus.popular">
        立即预约
      </view>
      <view
        class="card-actions-item reservationbtn"
        style="width: 380rpx"
        @click="subscribe(item, '参加')"
        v-if="!item.booked && item.status == actStatus.underway">
        立即参加
      </view>
      <view
        class="card-actions-item alreadybtn"
        v-if="item.booked && item.status == actStatus.underway">
        已参加
      </view>
      <view
        class="card-actions-item alreadybtn"
        v-if="item.booked && item.status == actStatus.popular">
        已预约
      </view>
      <view
        class="card-actions-item evaluatebtn"
        @click="goSuccessDetail(item)"
        v-if="item.status == actStatus.success">
        查看评价
      </view>
    </view> -->

    <!-- <u-modal
      :show="show"
      @confirm="subscribeSubmit"
      ref="uModal"
      :asyncClose="true"
      showCancelButton
      @cancel="this.show = false"
      title="提示"
      :content="`是否${clickType}此活动？`">
    </u-modal> -->
  </view>
</template>

<script>
import { actStatus } from '@/common/enums/activity.js'
import authorize from '@/common/auth.js'
import templateIds from '../../../common/template-ids'
import { bookadd } from '@/common/api.js'
import { merge } from 'lodash'

export default {
  props: {
    item: {
      default: null,
      type: Object,
    },
    index: {
      type: [String, Number],
      default: '',
    },
  },
  filters: {
    statusText(val) {
      if (val == actStatus.popular) {
        return '待开始'
      } else if (val == actStatus.underway) {
        return '进行中'
      } else if (val == actStatus.success) {
        return '已结束'
      }
      return ''
    },
    typeText(val) {
      return val
    },
  },
  data() {
    return {
      clickType: '',
      show: false,
      isRefresh: true,
      actStatus: actStatus,
      modal: {
        item: null,
        img: [],
      },
      image: {
        quanming: uni.getStorageSync('quanming'),
      },
    }
  },
  computed: {},
  onShow() {
    this.isRefresh = false
    this.$nextTick(() => {
      this.isRefresh = true
    })
  },
  methods: {
    subscribe(e, clickType) {
      this.clickType = clickType
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
    subscribeSubmit() {
      const userId = uni.getStorageSync('users').id
      // if(uni.getStorageSync('avatarUrl')){
      this.$refs.uModal.loading = false

      uni.request({
        url: `https://gh.api.cestech.com.cn:8240/mission_gh/v1/2/book/add`,
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
          //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
        },
        data: {
          bookId: this.item.id,
          bookType: 'act',
        },
        method: 'POST',
        success: res => {
          console.log('res.data.result')
          this.$refs.uModal.loading = false
          this.$emit('changeBooked', {
            index: this.index,
            key: 'booked',
            value: true,
          })

          if (res.data.code == 500) {
            uni.showToast({
              title: `您已${this.clickType}过活动`,
              icon: 'error',
            })
          } else {
            uni.showToast({
              title: `${this.clickType}成功`,
              icon: 'success',
            })
            authorize
              .requestSubscribeMessage(templateIds.activity)
              .then(res => {})
          }
          this.show = false
        },
      })
      // bookadd({
      //   book_id: this.item.id,
      //   book_type: 'act'
      // }).then(({
      //   data,
      //   msg
      // }) => {
      //   this.$refs.uModal.loading = false;
      //   this.$emit('changeBooked', {
      //     index: this.index,
      //     key: 'booked',
      //     value: true
      //   })

      //   this.show = false;
      //   uni.showToast({
      //     title: msg,
      //     icon: 'success',
      //   });

      authorize.requestSubscribeMessage(templateIds.activity).then(res => {})

      // }).finally(() => {
      //   this.$refs.uModal.loading = false;
      // })
      // }else{
      // 	// this.show=false

      // }
    },
    goDetail(item) {
      uni.$u.route({
        url: 'pages/activity_manager/detail',
        params: {
          id: item.id,
          title: item.name,
        },
      })
    },
    goSuccessDetail(item) {
      uni.$u.route({
        url: 'pageA/activity/evaluate_detail',
        params: {
          id: item.id,
        },
      })
    },
    goEvaluate(item) {
      if (uni.getStorageSync('avatarUrl')) {
        uni.$u.route({
          url: 'pageA/activity/evaluate',
          params: {
            id: item.id,
          },
        })
        // console.log('222');
      } else {
        // this.show = false;
        uni.showToast({
          icon: 'none',
          title: '请先登录再评价',
        })
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/center/index',
          })
        }, 1000)

        // console.log('333');
      }
    },
  },
}
</script>

<style lang="scss">
page {
  background: #f5f5f5;
}

.card-actions-item {
  text-align: center;
  font-size: 26rpx !important;
  font-weight: 500;
}

.card-actions {
  width: 660rpx;
  margin: 0 auto;
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
  padding-bottom: 20rpx;

  .reservationbtn {
    text-align: center;
    line-height: 68rpx;
    width: 381rpx;
    height: 68rpx;
    background: #29ce8c;
    border-radius: 11rpx;
    font-weight: 500;
    color: #fff;
    font-size: 30rpx;
    margin-left: 20rpx;
  }

  .alreadybtn {
    text-align: center;
    line-height: 68rpx;
    width: 401rpx;
    height: 68rpx;
    background: #fafafa;
    border-radius: 11rpx;
    font-weight: 500;
    color: #cccccc;
    font-size: 30rpx;
    margin-left: 20rpx;
  }

  .details {
    text-align: center;
    line-height: 68rpx;
    width: 240rpx;
    height: 68rpx;
    background: #f3f3f3;
    border-radius: 11rpx;
    font-weight: 500;
    color: #333333;
    font-size: 30rpx;
  }

  .evaluatebtn {
    width: 660rpx;
    height: 68rpx;
    background: #fafafa;
    border-radius: 11rpx;
    margin: 0 auto;
    font-size: 30rpx;
    color: #cccccc;
    font-weight: 550;
    line-height: 68rpx;
    text-align: center;
  }
}

/* .box {
  width: 720rpx;
  background: #fff;
  margin-bottom: 20rpx;
  border-radius: 20rpx;
  margin-top: 20rpx;


} */
.header {
  width: 340rpx;
  height: 288rpx;
  background: #ffffff;
  box-shadow: 0rpx 0rpx 12rpx 2rpx rgba(57, 57, 57, 0.08);
  border-radius: 12rpx 12rpx 12rpx 12rpx;
  margin-top: 20rpx;
  .img {
    width: 340rpx;
    height: 178rpx;
    position: relative;
  }
  .icon {
    position: absolute;
    z-index: 9999;
    top: 16rpx;
    left: 20rpx;
    image {
      width: 144rpx;
      height: 48rpx;
    }
  }
  .box-right {
    padding: 22rpx;
    .left {
      .name {
        font-weight: bold;
        font-size: 28rpx;
        color: #262c35;
        line-height: 36rpx;
      }
      .time {
        font-weight: 400;
        font-size: 22rpx;
        color: #999999;
        line-height: 40rpx;
      }
    }
  }
}
</style>
