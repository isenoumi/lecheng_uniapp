<template>
  <view>
    <view class="mainBox bg-white">
      <view class="u-nav">
        <navbar
          :safeAreaInsetTop="true"
          placeholder
          height="55"
          leftIconColor="#000"
          :hasImage="false"
          bgColor="transparent"
          autoBack>
          <view class="u-nav-slot" slot="center">
            <u--text text="志愿者百日活动" color="#000"></u--text>
          </view>
        </navbar>
      </view>
    </view>
    <image
      style="width: 100%; position: absolute; top: 0rpx; z-index: -99"
      src="http://cdn.cestech.com.cn/BkpKnowledge/img/37b0a0c045114f2da211652d18323c3e.png"
      mode="scaleToFill" />
    <view class="resultBox">
      <view class="title">我爱分类</view>
      <view class="imageBox">
        <view class="item">
          <view class="leftImage">
            <image
              class="image"
              src="http://cdn.cestech.com.cn/BkpKnowledge/img/954a50461fa94122872084bbd139f39d.png"
              mode="scaleToFill" />
          </view>
          <view class="text">
            <view class="textTitle">有害垃圾回收</view>
            <view class="textContent">电池、过期药品..</view>
          </view>
          <view class="toCheck">
            <image
              v-if="showYouhai"
              @click="
                toCheck({ title: '有害垃圾回收', id: '1656523212604432104' })
              "
              class="image"
              src="http://cdn.cestech.com.cn/BkpKnowledge/img/31cd8dae5bae4bd7af73ed69a0d1121a.png"
              mode="scaleToFill" />
            <view v-else class="toCkeckBtn">已打卡</view>
          </view>
        </view>
        <view class="line"></view>
        <view class="item">
          <view class="leftImage">
            <image
              class="image"
              src="http://cdn.cestech.com.cn/BkpKnowledge/img/a1e199a06d41466287222b29db1bc312.png"
              mode="scaleToFill" />
          </view>
          <view class="text">
            <view class="textTitle">可回收物回收</view>
            <view class="textContent">报纸、玻璃、金属...</view>
          </view>
          <view class="toCheck">
            <image
              v-if="showKehuishou"
              @click="
                toCheck({ title: '可回收物回收', id: '1656523212602311122' })
              "
              class="image"
              src="http://cdn.cestech.com.cn/BkpKnowledge/img/31cd8dae5bae4bd7af73ed69a0d1121a.png"
              mode="scaleToFill" />
            <view v-else class="toCkeckBtn">已打卡</view>
          </view>
        </view>
        <view class="line"></view>
        <view class="item">
          <view class="leftImage">
            <image
              class="image"
              src="http://cdn.cestech.com.cn/BkpKnowledge/img/7d7f65d74e1e488eb4489baca93bcd29.png"
              mode="scaleToFill" />
          </view>
          <view class="text">
            <view class="textTitle">厨余垃圾分类</view>
            <view class="textContent">菜叶、剩饭、果皮...</view>
          </view>
          <view class="toCheck">
            <image
              v-if="showChuyu"
              @click="toCheck({ title: '厨余分类', id: '1656123123213432104' })"
              class="image"
              src="http://cdn.cestech.com.cn/BkpKnowledge/img/31cd8dae5bae4bd7af73ed69a0d1121a.png"
              mode="scaleToFill" />
            <view v-else class="toCkeckBtn">已打卡</view>
          </view>
        </view>
        <view class="line"></view>
        <view class="item">
          <view class="leftImage">
            <image
              class="image"
              src="http://cdn.cestech.com.cn/BkpKnowledge/img/0f13b35553644362b5335e0b527193bd.png"
              mode="scaleToFill" />
          </view>
          <view class="text">
            <view class="textTitle">其他垃圾分类</view>
            <view class="textContent">除以上三类以外的生活垃圾</view>
          </view>
          <view class="toCheck">
            <image
              v-if="showQita"
              @click="toCheck({ title: '其他垃圾', id: '1656523212604432106' })"
              class="image"
              src="http://cdn.cestech.com.cn/BkpKnowledge/img/31cd8dae5bae4bd7af73ed69a0d1121a.png"
              mode="scaleToFill" />
            <view v-else class="toCkeckBtn">已打卡</view>
          </view>
        </view>
      </view>
    </view>
    <view class="resultBox" style="margin-top: 0">
      <view class="title">我要分类</view>
      <view class="imageBox">
        <view class="item">
          <view class="leftImage">
            <image
              class="image"
              src="http://cdn.cestech.com.cn/BkpKnowledge/img/954a50461fa94122872084bbd139f39d.png"
              mode="scaleToFill" />
          </view>
          <view class="text">
            <view class="textTitle">我是义务督导员</view>
            <view class="textContent">我是义务督导员..</view>
          </view>
          <view class="toCheck">
            <image
              v-if="showDudaoyuan"
              @click="
                toCheckVideo({ title: '义务督导员', id: '1656523212604432108' })
              "
              class="image"
              src="http://cdn.cestech.com.cn/BkpKnowledge/img/31cd8dae5bae4bd7af73ed69a0d1121a.png"
              mode="scaleToFill" />
            <view v-else class="toCkeckBtn">已打卡</view>
          </view>
        </view>
        <!-- <view class="line"></view> -->
      </view>
    </view>
  </view>
</template>

<script>
import { getCheckStatus } from './api'
export default {
  data() {
    return {
      id: '',
      showYouhai: true,
      showKehuishou: true,
      showChuyu: true,
      showQita: true,
      showDudaoyuan: true,
      detail: {
        content: '',
        createTime: '',
      },
    }
  },
  computed: {},
  filters: {},
  onLoad(option) {
    console.log(option)
    this.detail.content = option.content
    this.detail.createTime = option.createTime
    this.id = option.id
  },
  onShow() {
    getCheckStatus({ phone: uni.getStorageSync('phone') })
      .then(res => {
        res.result.map(item => {
          switch (item) {
            case '有害垃圾回收':
              this.showYouhai = false
              break
            case '可回收物回收':
              this.showKehuishou = false
              break
            case '厨余分类':
              this.showChuyu = false
              break
            case '其他垃圾':
              this.showQita = false
              break
            case '义务督导员':
              this.showDudaoyuan = false
              break
          }
        })
      })
      .catch(err => {})
  },
  onReady() {},
  methods: {
    toCheck({ title, id }) {
      uni.navigateTo({ url: `/pageB/check/check?title=${title}&id=${id}` })
    },
    toCheckVideo({ title, id }) {
      uni.navigateTo({ url: `/pageB/check/checkVideo?title=${title}&id=${id}` })
    },
  },
}
</script>
<style lang="scss" scoped>
.infoBox {
  width: 688rpx;
  background: #ffffff;
  border-radius: 12rpx 12rpx 12rpx 12rpx;
  margin: 32rpx auto;
  .title {
    font-weight: bold;
    font-size: 32rpx;
    color: #333333;
    line-height: 48rpx;
    text-align: left;
    padding: 32rpx;
  }
  .imageBox {
    display: flex;
    justify-content: space-between;
    .imageBoxLeft {
      .image {
        width: 276rpx;
        height: 304rpx;
        display: block;
      }
    }

    .imageBoxRigth {
      display: flex;
      justify-content: space-between;
      flex-flow: column;
      .image {
        width: 404rpx;
        height: 144rpx;
        display: block;
      }
    }
  }
}
.resultBox {
  width: 688rpx;
  background: #ffffff;
  border-radius: 12rpx 12rpx 12rpx 12rpx;
  margin: 220rpx auto 0;
  .title {
    font-weight: 600;
    font-size: 30rpx;
    padding: 32rpx 32rpx 0 32rpx;
  }
  .line {
    width: 688rpx;
    height: 1rpx;
    background: #ebebeb;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    margin: 0 auto;
  }
  .imageBox {
    .item {
      display: flex;
      justify-content: space-between;
      /* flex-wrap: wrap; */
      align-items: center;
      padding: 32rpx;
      .leftImage {
        .image {
          width: 182rpx;
          height: 128rpx;
          display: block;
          /* margin-top: 16rpx; */
        }
      }
      .text {
        width: 200rpx;
        .textTitle {
          font-weight: bold;
          font-size: 28rpx;
          color: #262c35;
          line-height: 36rpx;
        }
        .textContent {
          font-weight: 400;
          font-size: 24rpx;
          color: #999999;
          line-height: 40rpx;
        }
      }

      .toCheck {
        .image {
          width: 160rpx;
          height: 64rpx;
          display: block;
        }
        .toCkeckBtn {
          width: 160rpx;
          height: 64rpx;
          background: linear-gradient(90deg, #d1d1d1 0%, #bebebe 100%);
          border-radius: 32rpx;
          line-height: 64rpx;
          text-align: center;
          font-weight: 400;
          font-size: 28rpx;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
