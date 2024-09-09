<template>
  <view>
    <view class="u-nav">
      <navbar
        :safeAreaInsetTop="true"
        height="55"
        placeholder
        leftIconColor="#fff"
        autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="订单详情" color="#fff"></u--text>
        </view>
      </navbar>
    </view>

    <view class="crad" @click="select_address" v-if="address.length != 0">
      <view class="img">
        <image
          src="http://cdn.cestech.com.cn/BkpKnowledge/img/54b9f1427916416291f79a6c33c10f5d.png"
          mode="scaleToFill"
          style="width: 32rpx; height: 35.54rpx">
        </image>
        <view class="title">配送信息</view>
      </view>
      <view class="addres">
        <view>
          <view class="name"
            >{{ address[0].province }}{{ address[0].city }}{{ address[0].area
            }}{{ address[0].addr }}
          </view>
          <view>{{ address[0].receiver }} {{ address[0].mobile }}</view>
        </view>
        <view>
          <u-icon
            name="arrow-right"
            color="silver"
            size="20"
            :bold="true"></u-icon>
        </view>
      </view>
    </view>
    <view class="crad" @click="select_address" v-else>
      <!-- <view class="img">
        <view>
          <image src="../../static/assets/center/address.png" mode="scaleToFill" style="width: 50rpx;height: 50rpx;">
          </image>
        </view>
        <view class="addres">
          <view class="name">请选择您的地址
          </view>
        </view>
      </view>
      <view>
        <u-icon name="arrow-right" color="silver" size="20" :bold="true"></u-icon>
      </view> -->
      <view class="img">
        <image
          src="http://cdn.cestech.com.cn/BkpKnowledge/img/54b9f1427916416291f79a6c33c10f5d.png"
          mode="scaleToFill"
          style="width: 32rpx; height: 35.54rpx">
        </image>
        <view class="title">配送信息</view>
      </view>
      <view class="addres">
        <view> <view class="name">请选择您的地址 </view> </view>
        <view>
          <u-icon
            name="arrow-right"
            color="silver"
            size="20"
            :bold="true"></u-icon>
        </view>
      </view>
    </view>
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
            :src="details.pic"></image>
        </view>
        <view class="parameter">
          <view class="name">{{ details.name }}</view>
          <view style="margin-top: 7rpx">数量：{{ details.prodNum }}件</view>
          <view v-if="details.product_specifications" style="margin: 7rpx 0"
            >规格：{{ details.product_specifications }}
          </view>
          <view
            ><text class="jf">{{ details.points }}</text
            ><span style="font-size: 24rpx; color: #fc503a">积分</span></view
          >
        </view>
      </view>
      <view class="lattice" style="margin: 25rpx 0 0">
        <view class="title">配送服务</view>
        <view class="ps">
          <view style="margin-right: 10rpx">快速配送</view>
          <!-- <u-icon name="arrow-right" color="silver" size="16" :bold="true"></u-icon> -->
        </view>
      </view>
      <!-- <view class="lattice" style="margin: 25rpx 0;">
        <view class="title">配送费用</view>
        <view class="ps">￥0.00</view>
      </view> -->
      <!-- <view class="lattice">
	  	<view class="title">订单备注</view>
	  	<view class="ps" style="width: 300rpx;" @click="gonotes">
	  		<input v-model="notes" border="none" placeholder="选填"></input>
	  		<u-icon name="arrow-right" color="silver" size="16" :bold="true"></u-icon>
	  	</view>
	  </view> -->
    </view>
    <view class="box">
      <view class="img">
        <image
          src="http://cdn.cestech.com.cn/BkpKnowledge/img/19a87d9e953045538bb5fe05b3845cfc.png"
          mode="scaleToFill"
          style="width: 32rpx; height: 35.54rpx">
        </image>
        <view class="title">支付方式</view>
      </view>
      <view class="lattice" style="margin: 25rpx 0 0">
        <view class="title">支付方式</view>
        <view class="ps">
          <view style="margin-right: 10rpx">积分支付</view>
          <!-- <u-icon name="arrow-right" color="silver" size="16" :bold="true"></u-icon> -->
        </view>
      </view>
    </view>
    <view class="btn">
      <view>共{{ details.prodNum }}件</view>
      <view class="gentle"
        >合计：<text class="num">{{ details.points }}</text
        >积分</view
      >
      <view
        @click="order_details"
        style="
          width: 280rpx;
          height: 76rpx;
          background: #1dd193;
          border-radius: 12rpx 12rpx 12rpx 12rpx;
          line-height: 76rpx;
          color: #fff;
          text-align: center;
        ">
        提交订单
        <!-- <u-button
          text="提交兑换订单"
          @click="order_details"
          size="normal"
          type="success"></u-button> -->
      </view>
    </view>
    <u-popup
      :show="show"
      mode="center"
      @close="close"
      @open="open"
      :closeable="false"
      :round="10"
      :closeOnClickOverlay="false">
      <view class="msk">
        <view class="txt">恭喜您~已兑换成功!</view>
        <view class="txt" style="margin-top: 20rpx"
          >可前往<text class="jl" @click="record">"兑换记录"</text>查看详情
        </view>
        <view class="msk-btn">
          <u-button
            text="返回首页"
            @click="circle"
            size="normal"
            type="success"></u-button>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      notes: '',
      show: false,
      details: {},
      address: [],
    }
  },
  onLoad(options) {
    console.log(options, 'dai')

    this.details = options
    this.list()
  },
  onShow() {
    let that = this
    uni.$once('returnData', function (data) {
      console.log('监听到事件来自返回的参数：' + data)
      that.notes = data
    })
  },
  methods: {
    reload() {
      // 页面重载
      const pages = getCurrentPages()
      // 声明一个pages使用getCurrentPages方法
      const curPage = pages[pages.length - 1]
      // 声明一个当前页面
      curPage.onLoad(curPage.options) // 传入参数
      curPage.onShow()
      curPage.onReady()
      this.list()
      // location.reload()
      // 执行刷新
    },

    init() {
      this.address = []
      this.list()
    },
    list() {
      let userId = uni.getStorageSync('users').id
      uni.request({
        // url: `https://gh.api.cestech.com.cn:8240/mission_gh/p/address/list?userId=${userId}`,
        url: `https://gh.api.cestech.com.cn:8240/mission_gh/p/address/list`,
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
        },
        // header: {
        // 	'X-Access-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODkwNjQ3NTcsInVzZXJuYW1lIjoiYWRtaW4ifQ.9zI7NyLu1gcsn17dqXV9FUEyXIMRU6MgHxp9BG0i7MM' //自定义请求头信息
        // },
        data: {},
        method: 'GET',
        success: res => {
          console.log(res.data.result, '地址列表')
          res.data.result.map(v => {
            console.log(v.commonAddr)
            if (v.commonAddr === 1) {
              this.address.push(v)
            }
          })
          console.log(this.address[0], 'xxxxxxxxxxxxxxxxx')
          // this.addresList=res.data.result
        },
      })
    },
    order_details() {
      if (this.address.length == 0) {
        uni.showToast({
          icon: 'none',
          title: '请先选择您的地址在提交',
        })
      } else {
        console.log(this.details.skuId, '规格id')
        uni.request({
          url: 'https://gh.api.cestech.com.cn:8240/mission_gh/p/order/confirm',
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
          },
          data: {
            addrId: this.address[0].addrId,
            prodId: this.details.prodId,
            skuId: this.details.skuId,
            prodCount: this.details.prodNum,
            userId: uni.getStorageSync('users').id,
            remarks: this.notes,
          },
          method: 'POST',
          success: res => {
            if (res.data.code === 200) {
              this.show = true
            }
          },
        })
      }
    },
    open() {
      // console.log('open');
    },
    close() {
      this.show = false
      // console.log('close');
    },
    circle() {
      uni.switchTab({
        url: '/pages/index/index',
      })
    },
    record() {
      uni.navigateTo({
        // url: `/pageA/integral/index?switchs=${1}`
        url: `/pageA/userShoppingOrder/userShoppingOrder?switchs=${1}`,
      })
    },
    //跳转备注框
    gonotes() {
      uni.navigateTo({
        url: '/pageD/notes/notes',
      })
    },
    select_address() {
      uni.navigateTo({
        url: `/pageD/address/index?flg=${2}`,
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

page {
  background: #f5f5f5;
}

.msk {
  width: 560rpx;
  padding: 85rpx 30rpx 30rpx 30rpx;
  border-radius: 20rpx;

  .u-safe-bottom {
    padding-bottom: 0 !important;
  }

  .msk-btn {
    margin: 0 auto;
    width: 200rpx;
    margin-top: 60rpx;
    padding-bottom: 0 !important;

    /deep/.u-button {
      border-radius: 50rpx;
      padding-bottom: 0 !important;
    }
  }

  .txt {
    text-align: center;
    font-weight: 500;

    .jl {
      color: #39d48f;
    }
  }
}

.btn {
  width: 750rpx;
  height: 120rpx;
  background: #fff;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 30rpx;
  font-size: 30rpx;
  font-weight: 500;
  color: silver;

  /deep/.u-button {
    border-radius: 100rpx !important;
  }

  .gentle {
    margin: 0 15rpx;

    .num {
      color: red;
      font-size: 34rpx;
      font-weight: 550;
      margin-right: 7rpx;
    }
  }
}

input {
  text-align: right;
  margin-right: 7rpx;
}

::-webkit-input-placeholder {
  /* WebKit browsers */
  direction: rtl;
}

:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  direction: rtl;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ but I'm not sure about working */
  direction: rtl;
}

:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  direction: rtl;
}

.box {
  background: #fff;
  border-radius: 20rpx;
  width: 700rpx;
  padding: 40rpx 35rpx;
  margin: 0 auto;
  margin-top: 30rpx;

  .box-img {
    display: flex;
    align-items: center;
    color: silver;
    font-weight: 500;
    font-size: 28rpx;

    .parameter {
      margin-left: 30rpx;

      .name {
        color: #333;
        font-size: 34rpx;
        font-weight: 550;
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 400;
    font-size: 28rpx;
    color: #999999;

    /* .title {
      color: #333;
    } */

    .ps {
      display: flex;
      align-items: center;
      color: #262c35;
    }
  }
}

.crad {
  background: #fff;
  border-radius: 20rpx;
  width: 700rpx;
  padding: 30rpx 25rpx;
  margin: 0 auto;
  margin-top: 30rpx;
  /* display: flex;
    align-items: center;
    justify-content: space-between; */
  .addres {
    font-size: 28rpx;
    color: silver;
    margin-left: 20rpx;
    display: flex;
    justify-content: space-between;
    .name {
      color: #333;
      font-size: 34rpx;
      font-weight: 550;
      margin-bottom: 8rpx;
    }
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
</style>
