<template>
  <view style="position: relative; height: 100%">
    <view class="u-nav">
      <navbar
        :safeAreaInsetTop="true"
        placeholder
        height="55"
        leftIconColor="#fff"
        autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="服务查询" color="#fff"></u--text>
        </view>
      </navbar>
    </view>
    <view class="myTabbar">
      <view class="search">
        <u-search
          placeholder="请输入店铺名称/服务名称"
          bgColor="#ffffff"
          v-model="keyword"
          @search="search"
          :showAction="false"
          style="z-index: 999"></u-search>
      </view>
    </view>
    <view class="map">
      <map
        :latitude="latitude"
        :longitude="longitude"
        :markers="markers"
        :show-location="true"
        @markertap="markersClick"
        style="width: 100%; height: 800rpx">
      </map>
    </view>
    <view class="main">
      <!-- <view class="title"> </view> -->
      <z-paging
        ref="paging"
        v-model="dataList"
        @query="queryList"
        use-page-scroll>
        <!--      v-if="refresh" -->
        <view class="content u-p-l u-p-r">
          <view class="itemBox" v-for="(item, index) in dataList">
            <view class="item" @click="toPositionInfo(item)">
              <view class="left">{{ index + 1 }}</view>
              <view class="middle">
                <view class="itemTitle">{{ item.shopNames }}</view>
                <view class="address">{{ item.address }}</view>
              </view>
              <view class="right" style="margin-right: 16rpx">
                <!--     :label="1.5 + 'km'" -->
                <u-icon
                  labelColor="#999999"
                  size="20"
                  name="/static/assets/导航.png"></u-icon>
              </view>
            </view>
            <view class="line"></view>
          </view>
        </view>
      </z-paging>
    </view>
  </view>
</template>

<script>
import { actStatus } from '@/common/enums/activity.js'
import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'
import { mapState } from 'vuex'
import locationNavbar from '@/pages/index/components/location-navbar.vue'
export default {
  components: {
    locationNavbar,
  },
  mixins: [ZPMixin],
  data() {
    return {
      keyword: '',
      mapshow: true,
      globalData: getApp().globalData,
      longitude: '',
      latitude: '',
      dataList: [],
      type: '',
      myDataList: [],
      subsectionCurrent: 0,
      refresh: false,
      markers: [],
    }
  },
  computed: {
    ...mapState({
      location: state => state.location,
      customer: state => state.customer,
    }),
    region() {
      if (this.location) {
        return this.location.region
      }
      return ''
    },
    status() {
      if (this.subsectionCurrent == 0) {
        return actStatus.popular
      } else if (this.subsectionCurrent == 1) {
        return actStatus.underway
      }
      return actStatus.success
    },
  },
  watch: {
    customer(val) {
      this.$refs.paging.reload()
    },
  },
  onLoad(option) {
    if (option) this.type = option.type

    uni.getLocation({
      type: 'gcj02',
      isHighAccuracy: true,
      success: res => {
        console.log(res)
        this.latitude = res.latitude
        this.longitude = res.longitude
      },
    })
  },

  methods: {
    search(value) {
      this.keyword = value
      this.queryList(1, 15)
    },
    markersClick(e) {
      console.log(e)
      this.toPositionInfo({ mapId: e.detail.markerId })
    },
    subsectionChange(e) {
      if (this.current != e.index) {
        this.subsectionCurrent = e.index
        this.$refs.paging.reload()
      }
    },
    queryList(page, list_rows) {
      console.log(page, list_rows)
      this.refresh = false
      // if (!this.customer) {
      // 	this.$refs.paging.complete([]);
      // 	return;
      // }
      const userId = uni.getStorageSync('users').id
      uni.request({
        url: 'https://gh.api.cestech.com.cn:8240/mission_gh/mission/bkbDeclareRecord/pointList',
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
          //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
        },
        data: {
          pageNo: page,
          pageSize: list_rows,
          // status: this.status,
          shopNames: this.keyword,
          enablingStatus: 'ENABLE',
          type: this.type,
        },
        method: 'GET',
        success: res => {
          console.log(res.data.result, 'xxxx1')
          // res.data.result.records.forEach(item => {
          //   this.refresh = false
          //   uni.request({
          //     // url: `https://gh.api.cestech.com.cn:8240/mission_gh/v1/2/book/subscribe?user_id=${userId}&bookId=${item.id}`,
          //     url: `https://gh.api.cestech.com.cn:8240/mission_gh/v1/2/book/subscribe?bookId=${item.id}`,
          //     header: {
          //       'x-Resource-Token': uni.getStorageSync('xtoken'),
          //       //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
          //     },
          //     method: 'POST',
          //     success: res => {
          //       this.$set(item, 'booked', res.data)
          //       // item.booked = res.data
          //       this.$nextTick(() => {
          //         this.refresh = true
          //       })
          //     },
          //   })
          // })
          // this.myDataList = res.data.result.records
          // console.log(res.data.result.records, 'res.data.result.records')
          // res.data.result.records = this.myDataList

          res.data.result.records.map(item => {
            this.markers.push({
              ...item,
              // iconPath: '/static/assets/定位.png',
              height: 35,
              width: 25,
              label: {
                content: item.shopNames,
                bgColor: '#fff',
                padding: 6,
                borderRadius: 4,
                anchorY: -55,
                anchorX: -25,
              },
              id: Number(item.mapId),
            })
          })
          const a = this.markers.map(item => {
            return item.id
          })
          this.markers = this.markers.filter((item, index) => {
            return a.indexOf(item.id) === index
          })
          this.dataList.push(res.data.result.records)
          this.$refs.paging.complete(res.data.result.records)

          console.log(this.markers)
        },
      })
    },
    goActivitydetail(item) {
      uni.$u.route({
        url: 'pageC/knowledge/detail',
        params: {
          id: item.knowledge_id,
        },
      })
    },
    goLocation() {
      uni.navigateTo({
        url: '/pages/index/city',
      })
    },
    toPositionInfo(item) {
      uni.navigateTo({
        url: '/pageC/convenientServices/positionInfo?mapId=' + item.mapId,
      })
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
.myTabbar {
  background: #42d997;
  height: 100rpx;
  margin: 0 auto;
  z-index: 999;
  width: 100%;
  padding-top: 20rpx;
  .search {
    width: 660rpx;
    margin: 0 auto;
  }
}
.content {
  padding: 32rpx;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      width: 48rpx;
      height: 48rpx;
      background: #1dd193;
      border-radius: 50%;
      color: #ffffff;
      text-align: center;
      font-weight: 400;
      font-size: 28rpx;
      line-height: 48rpx;
    }
    .middle {
      margin-left: 32rpx;
      width: 440rpx;
      text-align: left;
      .itemTitle {
        font-weight: 400;
        font-size: 32rpx;
        color: #333333;
        line-height: 32rpx;
      }
      .address {
        font-weight: 400;
        font-size: 24rpx;
        color: #999999;
        line-height: 32rpx;
        margin-top: 20rpx;
      }
    }
    .right {
      font-weight: 400;
      font-size: 24rpx;
      color: #999999;
      line-height: 52rpx;
    }
  }
}
.line {
  width: 688rpx;
  height: 1rpx;
  background: #ebebeb;
  border-radius: 0rpx 0rpx 0rpx 0rpx;
  margin: 20rpx auto;
}
.main {
  width: 750rpx;
  background: #ffffff;
  border-radius: 24rpx 24rpx 0rpx 0rpx;
  margin: 0 auto;
  height: 100%;
  .title {
    display: flex;
    justify-content: left;
    height: 40rpx;
    line-height: 40rpx;
    padding: 40rpx;
    .item {
      margin-right: 32rpx;
    }
  }
}
</style>
