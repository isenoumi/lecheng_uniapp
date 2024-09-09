<template>
  <view class="">
    <view class="u-nav">
      <navbar
        :safeAreaInsetTop="true"
        height="55"
        placeholder
        leftIconColor="#fff"
        autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="我的订单" color="#fff"></u--text>
          <!-- <view style="margin-right: 120rpx">
            <u-search
              placeholder="搜索我的订单"
              bgColor="#ffffff"
              v-model="keyword"
              @search="search"
              :showAction="false"
              style="z-index: 999"></u-search>
          </view> -->
        </view>
      </navbar>
    </view>
    <view style="background-color: #42d997">
      <u-tabs
        :list="tabs"
        @click="clickTab"
        lineColor="#FFFFFF"
        :scrollable="false"
        :inactiveStyle="{ color: '#ffffff' }"
        :activeStyle="{ color: '#ffffff', fontSize: '32rpx' }"
        lineWidth="24"
        :itemStyle="{
          height: '44px',
        }"></u-tabs
    ></view>

    <mescroll-body
      ref="mescrollRef"
      @init="mescrollInit"
      @down="downCallback"
      @up="upCallback">
      <view style="height: 20rpx"></view>
      <view class="income" v-for="item in listData">
        <!-- <view class="income-left">
          <view>
            <image
              :src="item.orderItem.pic"
              mode="scaleToFill"
              style="border-radius: 13rpx; width: 140rpx; height: 140rpx">
            </image>
          </view>
          <view class="shop-name">
            <view
              class="prodname"
              style="color: #333; font-size: 30rpx; font-weight: 550">
              {{ item.orderItem.prodName }}
            </view>
            <view style="margin: 7rpx 0"
              >{{ item.orderItem.skuName }}*{{ item.order.productNums }}</view
            >
            <view style="margin-top: 32rpx">{{ item.orderItem.recTime }}</view>
          </view>
        </view>
        <view class="income-right">
          <view
            v-if="item.order.status === 0"
            class="status"
            style="color: #ff3838"
            >待发货
          </view>
          <view
            v-if="item.order.status === 1"
            class="status"
            style="color: #20c06b"
            >已发货
          </view>
          <view
            v-if="item.order.status === 2"
            class="status"
            style="color: #999999"
            >已完成
          </view>
          <view class="jf">-{{ item.bkbOperatingRecords.points }}</view>
        </view> -->
        <view class="box">
          <view class="img">
            <image
              src="http://cdn.cestech.com.cn/BkpKnowledge/img/0afe22c4d545454bbbba40ac2129a1d9.png"
              mode="scaleToFill"
              style="width: 32rpx; height: 35.54rpx">
            </image>
            <view class="title">商品信息</view>
          </view>
          <view class="box-img">
            <view>
              <image
                mode="scaleToFill"
                style="width: 180rpx; height: 180rpx"
                :src="item.orderItem.pic"></image>
            </view>
            <view class="parameter">
              <view class="name">{{ item.orderItem.prodName }}</view>

              <view v-if="item.orderItem.skuName" style="margin: 7rpx 0"
                >规格：{{ item.orderItem.skuName }}
              </view>
              <view
                style="
                  display: flex;
                  justify-content: space-between;
                  width: 380rpx;
                  margin-top: 20rpx;
                ">
                <view>
                  <text class="jf">{{ item.bkbOperatingRecords.points }}</text>
                  <span style="font-size: 24rpx; color: #fc503a">积分 </span>
                </view>
                <view style="margin-top: 7rpx">
                  共{{ item.order.productNums }}件
                </view>
              </view>
            </view>
          </view>
          <view class="lattice" style="margin: 0rpx 0 0">
            <!-- <view class="title">配送服务</view> -->
            <view
              class="btn"
              style="margin-right: 10rpx"
              @click="shop_details(item.orderItem.orderNumber)"
              >查看详情</view
            >
          </view>
          <view class="statusBox">
            <view
              v-if="item.order.status === 0"
              class="status"
              style="color: #ff3838"
              >待发货
            </view>
            <view
              v-if="item.order.status === 1"
              class="status"
              style="color: #20c06b"
              >已发货
            </view>
            <view
              v-if="item.order.status === 2"
              class="status"
              style="color: #999999"
              >已完成
            </view>
          </view>
        </view>
      </view>
    </mescroll-body>
  </view>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js'
import { getPointRecord } from '@/api/center/index.js'
export default {
  mixins: [MescrollMixin], // 使用mixin
  data() {
    return {
      status: '',
      listData: [], //积分兑换记录
      tabs: [
        { name: '全部', value: '' },
        { name: '待发货', value: 0 },
        { name: '已发货', value: 1 },
        { name: '已完成', value: 2 },
      ],
      keyword: '',
    }
  },
  onLoad(options) {
    getPointRecord().then(res => {
      console.log(res)
    })
  },
  methods: {
    clickTab(index, item) {
      this.status = index.value
      this.downCallback()
    },
    search(value) {
      this.keyword = value
      this.queryList(1, 15)
    },
    /*下拉刷新的回调 */
    downCallback() {
      this.mescroll.resetUpScroll()
    },
    /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
    upCallback(page) {
      console.log(page)
      const userid = uni.getStorageSync('users').id
      getPointRecord({ status: this.status }).then(res => {
        //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
        this.mescroll.endSuccess(res.data.result.length)

        //设置列表数据
        if (page.num == 1) this.listData = [] //如果是第一页需手动制空列表
        this.listData = this.listData.concat(res.data.result) //
      })
    },
    shop_details(value) {
      uni.navigateTo({
        url: `/pageA/integral/details?orderNumber=${value}`,
      })
    },
  },
}
</script>

<style lang="scss">
@import './css/userShoppingOrder.scss';
.box {
  background: #fff;
  border-radius: 20rpx;
  width: 600rpx;
  padding: 10rpx;
  margin: 0 auto;
  /* margin-top: 30rpx; */
  position: relative;
  .statusBox {
    position: absolute;
    top: 14rpx;
    right: 0;
    width: 72rpx;
    height: 34rpx;
    font-weight: 400;
    font-size: 24rpx;
  }
  .box-img {
    display: flex;
    align-items: center;
    color: #999999;
    font-weight: 500;
    font-size: 28rpx;

    .parameter {
      margin-left: 32rpx;
      height: 160rpx !important;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      flex-direction: row;
      .name {
        color: #262c35;
        font-size: 32rpx;
        font-weight: bold;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //用省略号显示
        white-space: nowrap; // 默认不换行；
        width: 380rpx;
      }

      .jf {
        color: #fc503a;
        font-weight: 550;
        font-size: 32rpx;
        margin-right: 7rpx;
      }
    }
  }

  .lattice {
    /* display: flex;
    align-items: center; */
    font-weight: 400;
    font-size: 28rpx;
    color: #999999;
    width: 100%;
    /* justify-content: right; */
    .btn {
      width: 148rpx;
      height: 64rpx;
      background: #ffffff;
      border-radius: 32rpx 32rpx 32rpx 32rpx;
      border: 2rpx solid #c5c4c9;
      line-height: 64rpx;
      text-align: center;
      font-weight: 400;
      font-size: 24rpx;
      color: #262c35;
      position: relative;
      left: 440rpx;
    }
  }
  .img {
    display: flex;
    align-items: center;
    justify-content: left;
    margin-bottom: 24rpx;
    align-items: center;
    .title {
      font-weight: bold;
      font-size: 28rpx;
      color: #262c35;
      line-height: 48rpx;
      margin-left: 8rpx;
    }
  }
}
</style>
