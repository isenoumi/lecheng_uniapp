<template>
  <view style="position: relative">
    <view class="u-nav">
      <navbar
        :safeAreaInsetTop="true"
        placeholder
        height="50"
        leftIconColor="#fff"
        imageSrc="/static/assets/feedbackCenter/1.png"
        autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="积分明细" color="#fff"></u--text>
        </view>
      </navbar>
    </view>
    <image
      style="width: 100%; position: absolute; top: 18rpx; z-index: -9999"
      src="/static/assets/feedbackCenter/组 6755.png"
      mode="scaleToFill" />
    <view class="pointsBox">
      <view class="points">
        <view class="pointsTitle">
          <view style="font-size: 28rpx">总积分</view>
          <view style="font-size: 76rpx">{{ allPoints }}</view>
        </view>
        <!-- <view> 积分规则 ></view> -->
      </view>
      <view class="ranking">
        <view class="rankingItemBox">
          <view class="rankingItem">
            <view class="title">今日获得</view>
            <view class="num">{{ points }}</view>
          </view>
          <view class="rankingItem">
            <view class="title">碳减排值</view>
            <view class="num">{{ carbon }}</view>
          </view>
          <view class="rankingItem">
            <view class="title">积分排名</view>
            <view class="num">{{ ranking }}</view>
          </view>
        </view>
        <view class="line"> </view>
        <view class="itemBottom" @click="toRanking">
          <view style="font-size: 28rpx; color: #333333"> 积分排行榜 </view>
          <u-icon name="arrow-right" color="#C5C4C9" size="14"></u-icon>
        </view>
      </view>
    </view>
    <view style="padding-left: 16rpx">
      <u-tabs
        :list="tabs"
        @click="clickTab"
        lineColor="#1DD193"
        :inactiveStyle="{}"
        :activeStyle="{ fontSize: '32rpx' }"
        lineWidth="24"
        :itemStyle="{
          height: '44px',
        }"></u-tabs
    ></view>
    <z-paging
      ref="paging"
      v-model="dataList"
      @query="queryList"
      use-page-scroll
      fixed>
      <view class="content">
        <u-cell-group>
          <view class="" v-for="(item, index) in dataList" :key="index">
            <view class="item">
              <view class="itemLeft">
                <view class="title">{{ item.title }}</view>
                <view class="time">{{ item.createTime }}</view>
              </view>
              <view class="itemRight">
                <view v-if="item.type == 0" class="title"
                  >+{{ item.points }}</view
                >
                <view v-if="item.type == 1" class="title"
                  >-{{ item.points }}</view
                >
              </view></view
            >
            <view class="line"> </view>
          </view>
        </u-cell-group>
      </view>
    </z-paging>
  </view>
</template>

<script>
import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'
import { mapState } from 'vuex'

import { getCarbon, getPoints, getRanking, getUserInfo } from './api'
export default {
  components: {},
  mixins: [ZPMixin],
  data() {
    return {
      globalData: getApp().globalData,
      dataList: [],
      type: 0,
      carbon: 0,
      points: 0,
      ranking: 0,
      allPoints: 0,
      tabs: [{ name: '积分收入' }, { name: '积分支出' }],
    }
  },
  computed: {},
  watch: {},
  onLoad(option) {
    uni.$on('refreshList', () => {
      this.$refs.paging.reload()
    })
    getUserInfo({ phone: uni.getStorageSync('phone') }).then(res => {
      this.allPoints = res.result.records[0].points
      this.carbon = res.result.records[0].carbonCredits
    })
    getRanking({ phone: uni.getStorageSync('phone') }).then(res => {
      this.ranking = res.result
    })
    getPoints({ phone: uni.getStorageSync('phone') }).then(res => {
      this.points = res.result
    })
  },
  onUnload() {
    uni.$off('refreshList')
  },
  methods: {
    clickTab(index, item) {
      this.type = index.index
      uni.$emit('refreshList', () => {
        this.$refs.paging.reload()
      })
    },
    queryList(page, list_rows) {
      uni.request({
        url: `https://gh.api.cestech.com.cn:8240/mission_gh/v1/user/points_log?type=${this.type}`,
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
          //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
        },
        data: {
          pageNo: page,
          pageSize: list_rows,
          // UserId:uni.getStorageSync('users').id
        },
        method: 'GET',
        success: res => {
          console.log('asda', res)
          // console.log(res.data.result.records,'消息')
          this.$refs.paging.complete(res.data.result.records)
          console.log(this.dataList)
        },
      })

      // messagelist({
      // 	page: page,
      // 	list_rows: list_rows
      // }).then((res) => {

      // 	this.$refs.paging.complete(res.data.data);
      // }).catch(res => {
      // 	this.$refs.paging.complete(false);
      // })
    },
    toRanking() {
      uni.navigateTo({
        url: '/pageA/ranking/index',
      })
    },
    goDetail(item) {
      console.log(item, '消息')
      if (!item.is_read) {
        this.$store.commit('subtractMessage', 1)
      }
      uni.$u.route({
        url: 'pageC/message/detail',
        params: {
          id: item.id,
          content: item.content,
          createTime: item.createTime,
        },
      })
      item.is_read = 1
    },
  },
}
</script>
<style>
page {
  background: #f5f5f5;
}
</style>

<style lang="scss" scoped>
.content {
  width: 688rpx;
  background: #ffffff;
  margin: 20rpx auto;
  border-radius: 12rpx;
}
.item {
  position: relative;
  width: 688rpx;
  background: #ffffff;
  padding: 30rpx;
  display: flex;
  justify-content: space-between;
  .itemLeft {
    .title {
      font-weight: bold;
      font-size: 32rpx;
      color: #333333;
    }
    .time {
      font-weight: 400;
      font-size: 24rpx;
      color: #999999;
      margin-top: 20rpx;
    }
  }
  .itemRight {
    margin-top: 20rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .title {
      font-weight: 400;
      font-size: 48rpx;
      color: #ffae4f;
    }
  }
}
.line {
  width: 624rpx;
  height: 1rpx;
  background: #ebebeb;
  border-radius: 0rpx 0rpx 0rpx 0rpx;
  margin: 10rpx auto;
}
.pointsBox {
  color: #ffffff;
  width: 688rpx;
  margin: 0 auto 0;
  .points {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 20rpx;
    font-size: 28rpx;
  }
}
.ranking {
  margin: 10rpx auto;
  width: 688rpx;
  background: #ffffff;
  border-radius: 12rpx 12rpx 12rpx 12rpx;
  z-index: 999999;
  padding: 40rpx 20rpx 20rpx;
  .rankingItemBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .rankingItem {
      width: 200rpx;
      text-align: center;
    }
    .title {
      font-weight: 400;
      font-size: 28rpx;
      color: #999999;
    }
    .num {
      font-weight: bold;
      font-size: 52rpx;
      color: #333333;
    }
  }
  .itemBottom {
    display: flex;
    justify-content: space-between;
    font-weight: 400;
    font-size: 28rpx;
    color: #333333;
    line-height: 40rpx;
    padding: 0 20rpx;
  }
  .line {
    width: 624rpx;
    height: 1rpx;
    background: #ebebeb;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    margin: 20rpx auto;
  }
}
</style>
