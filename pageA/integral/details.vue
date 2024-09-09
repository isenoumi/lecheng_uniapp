<template>
  <view class="conetent">
    <view class="u-nav">
      <navbar
        :safeAreaInsetTop="true"
        height="55"
        placeholder
        leftIconColor="#fff"
        autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="商品详情" color="#fff"></u--text>
        </view>
      </navbar>
    </view>
    <!-- <view style="height: 20rpx"></view> -->
    <view class="order-number">
      <view v-if="details.order.status != 0"
        >订单编号：<text>{{ details.order.orderNumber }}</text>
      </view>
    </view>
    <!-- <view class="shop-details">
      <view style="display: flex; justify-content: left">
        <view>
          <image
            :src="details.orderItem.pic"
            style="border-radius: 13rpx; width: 140rpx; height: 140rpx"
            mode="scaleToFill">
          </image>
        </view>
        <view style="margin-left: 20rpx">
          <view class="name">{{ details.orderItem.prodName }}</view>
          <view class="specifications"
            >{{ details.orderItem.skuName }} 共{{
              details.order.productNums
            }}件</view
          >
        </view>
      </view> -->
    <view class="box-img">
      <view>
        <image
          mode="scaleToFill"
          style="width: 180rpx; height: 180rpx"
          :src="details.orderItem.pic"></image>
      </view>
      <view class="parameter" style="">
        <view class="name">{{ details.orderItem.prodName }}</view>

        <view v-if="item.orderItem.skuName" style="margin: 7rpx 0"
          >规格：{{ item.orderItem.skuName }}
        </view>
        <view
          style="
            display: flex;
            justify-content: space-between;
            width: 460rpx;
            margin-top: 20rpx;
          ">
          <view>
            <text class="jf">{{ details.orderItem.allPoints }}</text>
            <span style="font-size: 24rpx; color: #fc503a">积分 </span>
          </view>
          <view style="margin-top: 7rpx">
            共{{ details.order.productNums }}件
          </view>
        </view>
      </view>
      <view class="statusBox">
        <view
          v-if="details.order.status == 0"
          style="
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-left: auto;
            color: #ff3838;
          "
          class="status">
          待发货</view
        >
        <view
          v-if="details.order.status == 1"
          style="color: #39d48f"
          class="status"
          >已发货</view
        >
        <view
          v-if="details.order.status == 2"
          style="color: #999999"
          class="status"
          >已完成</view
        >
      </view>
    </view>
    <!-- <view class="item">
      <view class="title"> 兑换积分： </view>
      <view class="content">
        {{ details.orderItem.allPoints }}
      </view>
    </view> -->
    <view class="item">
      <view class="title"> 运费： </view>
      <view class="content"> 包邮 </view>
    </view>
    <view class="item">
      <view class="title"> 兑换时间： </view>
      <view class="content">
        {{ details.orderItem.recTime }}
      </view>
    </view>
    <view class="item" v-if="details.order.status != 0">
      <view class="title"> 物流公司： </view>
      <view class="content">
        {{ details.name }}
      </view>
    </view>
    <view class="item" v-if="details.order.status != 0">
      <view class="title"> 物流单号： </view>
      <view class="content">
        {{ details.order.dvyFlowId }}
      </view>
    </view>
    <view class="item">
      <view class="title"> 合计兑换积分： </view>
      <view class="content"> {{ details.orderItem.allPoints }}积分 </view>
    </view>
    <!-- <view class="btn"> 联系客服 </view> -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      orderNumber: '',
      details: {},
    }
  },
  onLoad(options) {
    console.log(options, 'xxxx')
    if (options.orderNumber) {
      this.orderNumber = options.orderNumber
      this.shopDetails()
    }
  },
  methods: {
    shopDetails() {
      uni.request({
        url: `https://gh.api.cestech.com.cn:8240/mission_gh/p/order/pointRecordX`,
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
          //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
        },
        data: {
          orderNumber: this.orderNumber,
        },

        method: 'GET',
        success: res => {
          this.details = res.data.result
        },
      })
    },
  },
}
</script>

<style lang="scss">
.u-button {
  background: #1dd193 !important;
  color: #fff !important;
}
.statusBox {
  font-size: 28rpx;
}

.conetent {
  padding: 20rpx 40rpx;

  .order-number {
    height: 36rpx;
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 36rpx;

    .status {
      font-size: 28rpx;
    }
  }

  .shop-details {
    margin: 25rpx 0;
    display: flex;
    justify-content: space-between;
    font-size: 32rpx;

    .name {
      font-size: 31rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;
    }

    .specifications {
      margin-top: 15rpx;
      font-weight: 400;
      color: #999999;
    }
  }

  .item {
    margin: 20rpx 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 26rpx;
    width: 100%;

    .title {
      width: 250rpx;
      color: #999999;
    }

    .content {
      color: #333333;
      text-align: right;
    }
  }

  .amount {
    display: flex;
    justify-content: flex-end;
    margin: 45rpx 0 60rpx 0;
    color: silver;
    font-size: 34rpx;
  }
}

.btn {
  width: 191rpx;
  height: 72rpx;
  background: #29ce8c;
  border-radius: 11rpx;
  line-height: 72rpx;
  font-size: 25rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
  margin-top: 40rpx;
  margin-left: 480rpx;
}
.box-img {
  display: flex;
  align-items: center;
  color: #999999;
  font-weight: 500;
  font-size: 28rpx;
  position: relative;
  .parameter {
    margin-left: 32rpx;

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
.statusBox {
  position: absolute;
  top: 24rpx;
  right: 0;
  width: 72rpx;
  height: 34rpx;
  font-weight: 400;
  font-size: 24rpx;
}
</style>
