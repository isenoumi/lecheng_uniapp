<template>
  <view style="position: relative; height: 100%">
    <view class="u-nav">
      <navbar
        :safeAreaInsetTop="true"
        placeholder
        height="55"
        leftIconColor="#000"
        imageSrc="http://cdn.cestech.com.cn/BkpKnowledge/img/d482cda0265645be8183f5d6e6b24925.png"
        autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="活动中心" color="#000"></u--text>
        </view>
      </navbar>
      <!--         :hasImage="false"
        bgColor="transparent" -->
    </view>
    <image
      style="
        width: 100%;
        height: 704rpx;
        position: absolute;
        top: 0rpx;
        z-index: -99;
      "
      src="https://oms.cestech.com.cn/BkpKnowledge/img/6a0ab629da6d47c58f1e51cd826e603e/组 6937.png"
      mode="scaleToFill" />
    <view class="myTabbar">
      <!-- <u-tabs
        lineColor="#39d48f"
        :scrollable="false"
        :list="subsectionTabs"
        lineWidth="30"
        keyName="name"
        @click="subsectionChange"></u-tabs> -->
      <u-search
        placeholder="搜索活动名称"
        bgColor="#ffffff"
        v-model="keyword"
        :showAction="false"
        style="z-index: 999"
        @search="search"
        @change="change"></u-search>
    </view>
    <view class="main">
      <view class="title">
        <!-- <view class="item">
          <u-icon
            label="区域"
            labelPos="left"
            size="14"
            name="arrow-down"></u-icon>
        </view> -->
        <view class="item">
          <u-icon
            label="活动类型"
            labelPos="left"
            size="14"
            name="arrow-down"
            @click="showActivityType = true"></u-icon>
        </view>
        <view class="item" @click="showUserType = true">
          <u-icon
            label="活动状态"
            labelPos="left"
            size="14"
            name="arrow-down"></u-icon>
        </view>
      </view>
      <u-action-sheet
        :show="showUserType"
        :actions="[
          { value: 31, name: '未开始' },
          { value: 40, name: '进行中' },
          { value: 50, name: '已结束' },
          { value: '', name: '全部' },
        ]"
        title="请选择活动状态"
        @close="showUserType = false"
        @select="userTypeSelect">
      </u-action-sheet>
      <u-action-sheet
        :show="showActivityType"
        :actions="[
          { value: '20', name: '线下' },
          { value: '', name: '全部' },
        ]"
        title="请选择活动类型"
        @close="showActivityType = false"
        @select="activityTypeSelect">
      </u-action-sheet>
      <z-paging
        ref="paging"
        v-model="dataList"
        @query="queryList"
        use-page-scroll>
        <!--      v-if="refresh" -->
        <view class="content u-p-l u-p-r">
          <activityCard
            v-for="(item, index) in dataList"
            :key="index"
            :item.sync="item"
            :index="index"
            @changeBooked="changeBooked">
          </activityCard>
        </view>
      </z-paging>
    </view>
  </view>
</template>

<script>
import { actStatus } from '@/common/enums/activity.js'
import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'
import { mapState } from 'vuex'
import activityCard from './components/activity-card.vue'
import locationNavbar from '@/pages/index/components/location-navbar.vue'

import { activitylist } from '@/common/api.js'
export default {
  components: {
    activityCard,
    locationNavbar,
  },
  mixins: [ZPMixin],
  data() {
    return {
      statusSelect: '',
      keyword: '',
      activityType: '',
      globalData: getApp().globalData,
      dataList: [],
      myDataList: [
        { name: 1, startDate: 10, status: 31, id: 1 },
        { name: 2, startDate: 10, status: 40 },
        { name: 3, startDate: 10, status: 50 },
      ],
      showUserType: false,
      showActivityType: false,
      subsectionList: ['待开始', '进行中', '已结束'],
      subsectionTabs: [
        {
          name: '待开始',
        },
        {
          name: '进行中',
        },
        {
          name: '已结束',
        },
      ],
      subsectionCurrent: 0,
      refresh: false,
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
  onLoad(option) {},

  methods: {
    change(e) {
      if (!e) this.queryList(1, 15)
    },
    search(e) {
      this.queryList(1, 15)
    },
    userTypeSelect(e) {
      this.statusSelect = e.value
      this.queryList(1, 15)
    },
    activityTypeSelect(e) {
      this.activityType = e.value
      this.queryList(1, 15)
    },
    subsectionChange(e) {
      if (this.current != e.index) {
        this.subsectionCurrent = e.index
        this.$refs.paging.reload()
      }
    },
    changeBooked({ index, key, value }) {
      this.$set(this.dataList[index], key, value)
    },
    queryList(page, list_rows) {
      this.refresh = false
      // if (!this.customer) {
      // 	this.$refs.paging.complete([]);
      // 	return;
      // }
      const userId = uni.getStorageSync('users').id
      uni.request({
        url: 'https://gh.api.cestech.com.cn:8240/mission_gh/v1/activity/list',
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
          //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
        },
        data: {
          pageNo: page,
          pageSize: list_rows,
          status: this.statusSelect,
          name: this.keyword,
          type: this.activityType,
          // status: this.status,
          // customer_id: 1,
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
          console.log(res.data.result.records, 'res.data.result.records')
          this.$refs.paging.complete(res.data.result.records)
        },
      })
      // activitylist({
      // 	customer_id: 1,
      // 	status: this.status,
      // 	page: page,
      // 	list_rows: list_rows
      // }).then((res) => {

      // 	this.$refs.paging.complete(res.data.data);
      // }).catch(res => {
      // 	console.log(res)
      // 	//如果请求失败写this.$refs.paging.complete(false)，会自动展示错误页面
      // 	//注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
      // 	//在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
      // 	this.$refs.paging.complete(false);
      // })
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
  /* background: #fff; */
  height: 100rpx;
  margin: 0 auto;
  z-index: 999;
  width: 660rpx;
}
.content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.main {
  width: 750rpx;
  background: #ffffff;
  border-radius: 24rpx 24rpx 0rpx 0rpx;
  margin: 0 auto;
  height: 100%;
  min-height: 800rpx;
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
