<template>
  <view>
    <!-- <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
		</mescroll-body> -->
    <view class="u-nav">
      <navbar
        :safeAreaInsetTop="true"
        placeholder
        height="45"
        leftIconColor="#fff"
        autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="积分排行榜" color="#fff"></u--text>
        </view>
      </navbar>
    </view>
    <u-loading-page :loading="loading"></u-loading-page>
    <view style="background-color: #42d997">
      <u-tabs
        :list="tabs"
        @click="clickTab"
        lineColor="#FFFFFF"
        :inactiveStyle="{ color: '#ffffff' }"
        :scrollable="false"
        :activeStyle="{ color: '#ffffff', fontSize: '32rpx' }"
        lineWidth="24"
        :itemStyle="{
          height: '44px',
        }"></u-tabs>
    </view>

    <view class="list">
      <view class="list-left">
        <view class="pm" style="margin-left: 40rpx">{{ ranking }}</view>
        <view class="img">
          <u-avatar :src="avatarUrl" size="32"></u-avatar>
        </view>
        <view class="name" style="margin-left: 24rpx">{{ nickname }}</view>
      </view>
      <view
        v-if="type == 'points'"
        class="list-right"
        style="margin-right: 30rpx">
        {{ points }}分
      </view>
      <view v-else class="list-right" style="margin-right: 30rpx">
        {{ points }}
      </view>
    </view>
    <view class="threeBox">
      <view class="other">
        <view class="imageBox">
          <u-avatar :src="threeList[1].avatarUrl" size="42"></u-avatar>
          <image
            src="https://oms.cestech.com.cn/BkpKnowledge/img/bf7c8004e0c84fb3993282f95cfb550b/组 6983.png"
            class="imgIcon sceond"
            mode="widthFix" />
        </view>
        <view class="name">
          <view>{{ threeList[1].nickName }}</view>
          <view v-if="type == 'points'">{{ threeList[1].points }}分</view>
          <view v-else>{{ threeList[1].carbonCredits }}</view>
        </view>
      </view>
      <view class="one">
        <view class="imageBox" style="padding-top: 20rpx">
          <u-avatar :src="threeList[0].avatarUrl" size="60"></u-avatar>
          <image
            class="imgIcon frist"
            src="https://oms.cestech.com.cn/BkpKnowledge/img/fafcd03112d046a588006f5a6d8932bd/组 6984.png"
            mode="widthFix" />
        </view>
        <view class="name" style="margin-top: 70rpx">
          <view>{{ threeList[0].nickName }}</view>
          <view v-if="type == 'points'">{{ threeList[0].points }}分</view>
          <view v-else>{{ threeList[0].carbonCredits }}</view>
        </view>
      </view>
      <view class="other">
        <view class="imageBox">
          <u-avatar :src="threeList[2].avatarUrl" size="42"></u-avatar>
          <image
            class="imgIcon sceond"
            src="https://oms.cestech.com.cn/BkpKnowledge/img/1e004aeef9f3433698d30b080ace41cc/组 6985.png"
            mode="widthFix" />
        </view>
        <view class="name">
          <view>{{ threeList[2].nickName }}</view>
          <view v-if="type == 'points'"> {{ threeList[2].points }}分</view>
          <view v-else>{{ threeList[2].carbonCredits }}</view>
        </view>
      </view>
    </view>
    <view class="rankingBox">
      <view class="rankingTitle">
        <view>排名</view>
        <view style="margin-right: 160rpx">昵称</view>
        <view v-if="type == 'points'" style="width: 120rpx">积分</view>
        <view v-else style="width: 120rpx">碳减值</view>
      </view>
      <view class="list" v-for="(item, index) in lists" :key="index">
        <view class="list-left">
          <view class="pm">{{ index + 4 }}</view>
          <view class="img">
            <u-avatar :src="item.avatarUrl" size="32"></u-avatar>
          </view>
          <view class="name" style="margin-left: 40rpx">{{
            item.nickName
          }}</view>
        </view>
        <view v-if="type == 'points'" class="list-right"
          >{{ item.points }}分</view
        >
        <view v-else class="list-right">{{ item.carbonCredits }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js'
import {
  getMyCarbonRanking,
  getCarbonRankingList,
  getRanking,
  getUserInfo,
} from './api'

export default {
  mixins: [MescrollMixin], // 使用mixin
  data() {
    return {
      type: 'points',
      lists: [],
      threeList: [],
      carbon: 0,
      points: 0,
      ranking: 0,
      nickname: '',
      avatarUrl: '',
      tabs: [{ name: '积分排行榜' }, { name: '碳减值排行榜' }],
      loading: false,
    }
  },
  onLoad() {
    this.list()
    this.pointsRanking()
  },
  mounted() {},
  methods: {
    pointsRanking() {
      this.type = 'points'
      getUserInfo({ phone: uni.getStorageSync('phone') }).then(res => {
        this.points = res.result.records[0].points
        this.avatarUrl = res.result.records[0].avatarUrl
        this.nickname = res.result.records[0].nickName
      })
      getRanking({ phone: uni.getStorageSync('phone') }).then(res => {
        this.ranking = res.result
      })
    },
    carbonRanking() {
      this.loading = true
      this.type = 'carbon'
      getUserInfo({ phone: uni.getStorageSync('phone') }).then(res => {
        this.points = res.result.records[0].carbonCredits
        this.avatarUrl = res.result.records[0].avatarUrl
        this.nickname = res.result.records[0].nickName
      })
      getCarbonRankingList().then(res => {
        this.threeList = res.result?.splice(0, 3)

        this.lists = res.result
        this.loading = false
      })
      getMyCarbonRanking({ phone: uni.getStorageSync('phone') }).then(res => {
        this.ranking = res.result
      })
    },
    clickTab(index, item) {
      if (index.name == '积分排行榜') {
        this.list()
        this.pointsRanking()
      } else if ((index.name = '碳减值排行榜')) {
        this.carbonRanking()
      }
    },
    list() {
      this.loading = true
      uni.request({
        url: 'https://gh.api.cestech.com.cn:8240/mission_gh/v1/ranking',
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
        },
        method: 'GET',
        success: res => {
          // res.data.result.records.forEach(v => {
          //   console.log(v, 'vvvv')
          //   if (v.points != 0) {
          //     this.lists.push(v)
          //   }
          // })
          this.threeList = res.data.result.records?.splice(0, 3)

          this.lists = res.data.result.records
          this.loading = false
        },
      })
    },
  },
}
</script>

<style lang="scss">
page {
  background: #f5f5f5;
}
.rankingBox {
  width: 688rpx;
  background: #ffffff;
  border-radius: 12rpx 12rpx 0rpx 0rpx;
  margin: 30rpx auto;
  padding: 20rpx;
  .rankingTitle {
    display: flex;
    justify-content: space-between;
    font-weight: 400;
    font-size: 28rpx;
    color: #999999;
    padding: 0 20rpx;
  }
}

.list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 35rpx;
  background: #fff;
  height: 114rpx;
  line-height: 114rpx;
  .list-left {
    display: flex;
    align-items: center;

    .pm {
      font-weight: 400;
      font-size: 28rpx;
      color: #999999;
    }

    .img {
      margin-left: 30rpx;
    }

    .name {
      width: 200rpx;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; // 默认不换行；
      font-weight: 400;
      font-size: 32rpx;
      color: #262c35;
      margin-left: 25rpx;
    }
  }

  .list-right {
    font-weight: bold;
    font-size: 32rpx;
    color: #ffae4f;
    margin-right: 36rpx;
  }
}
.threeBox {
  width: 688rpx;
  margin: 32rpx auto;
  display: flex;
  justify-content: left;
  align-items: flex-end;
  .other,
  .one {
    padding: 30rpx;
    text-align: center;
    .name {
      height: 34rpx;
      font-weight: 400;
      font-size: 28rpx;
      color: #333333;
      line-height: 42rpx;
      text-align: center;
      font-style: normal;
      text-transform: none;
      margin-top: 40rpx;
    }
    .imageBox {
      text-align: center;
      width: 100%;
      display: flex;
      justify-content: center;
      position: relative;
      .imgIcon {
        position: absolute;
        width: 174rpx;
      }
      .frist {
        top: 110rpx;
      }
      .sceond {
        width: 138rpx;
        top: 66rpx;
      }
    }
  }
  .other {
    width: 206rpx;
    height: 292rpx;
    background: #ffffff;
    border-radius: 12rpx 0rpx 0rpx 12rpx;
  }
  .one {
    width: 274rpx;
    height: 384rpx;
    background: #ffffff;
    border-radius: 12rpx 12rpx 0rpx 0rpx;
  }
}
</style>
