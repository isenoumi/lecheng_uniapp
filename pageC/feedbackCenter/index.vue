<template>
  <view>
    <view class="u-nav">
      <navbar
        :safeAreaInsetTop="true"
        placeholder
        height="45"
        leftIconColor="#fff"
        autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="反馈中心" color="#fff"></u--text>
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
        }">
      </u-tabs>
    </view>
    <z-paging
      ref="paging"
      v-model="dataList"
      @query="queryList"
      use-page-scroll
      fixed>
      <view class="content">
        <u-cell-group>
          <view class="item" v-for="(item, index) in dataList" :key="index">
            <image
              v-if="item.status == 'PROCESSING'"
              class="image"
              src="/static/assets/feedbackCenter/组 3167(1).png"
              mode="scaleToFill" />
            <image
              v-else-if="item.status == 'HANDLED'"
              class="image"
              src="/static/assets/feedbackCenter/组 3167(2).png"
              mode="scaleToFill" />
            <image
              v-else-if="item.status == 'RECEIVED'"
              class="image"
              src="/static/assets/feedbackCenter/组 3167.png"
              mode="scaleToFill" />
            <view class="itemTop">{{ item.title }}</view>
            <view class="itemCenter">
              <view class="title">{{ item.createTime }} </view>
              <view class="line"></view>
              <view v-if="item.type == 'FREE_TO_ASK'" class="title">
                来自随便问工单
              </view>
              <view
                v-else-if="item.type == 'SHOOT_WITH_YOUR_HAND'"
                class="title">
                来自随手拍工单
              </view>
              <view
                v-else-if="item.type == 'SAY_WHATEVER_YOU_WANT'"
                class="title">
                来自随便说工单
              </view>
              <view
                v-else-if="item.type == 'DECLARATION_RECORDS'"
                class="title">
                来自点位申报
              </view>
            </view>
            <view>
              <view class="line"> </view>
              <view class="itemBottom" @click="goDetail(item)">
                <view> 查看详情 </view>
                <u-icon name="arrow-right" color="#C5C4C9" size="14"></u-icon>
              </view>
            </view>
          </view>

          <!-- <u-cell
            v-for="(item, index) in [{}, {}]"
            :key="index"
            :value="item.createTime"
            @click="goDetail(item)">
            <u--text slot="title" :lines="1" :text="item.content"> </u--text>
            <view style="position: relative" slot="icon">
              <u-badge
                v-if="!item.is_read"
                :customStyle="{ 'z-index': 1 }"
                :isDot="true"
                type="error"
                absolute
                :offset="['2px', '2px']">
              </u-badge>
              <u-icon size="32" name="order"></u-icon>
            </view>
            <view slot="value">
              <u--text type="info" :text="item.createTime"> </u--text>
            </view>
          </u-cell> -->
        </u-cell-group>
      </view>
    </z-paging>
  </view>
</template>

<script>
import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'
import { mapState } from 'vuex'

import { getFeedbackList } from './api'
export default {
  components: {},
  mixins: [ZPMixin],
  data() {
    return {
      globalData: getApp().globalData,
      dataList: [],
      type: '',
      tabs: [
        { name: '全部', value: '' },
        { name: '已接收', value: 'RECEIVED' },
        { name: '办理中', value: 'PROCESSING' },
        { name: '已办结', value: 'HANDLED' },
      ],
    }
  },
  computed: {},
  watch: {},
  onLoad(option) {
    uni.$on('refreshList', () => {
      this.$refs.paging.reload()
    })
  },
  onUnload() {
    uni.$off('refreshList')
  },
  methods: {
    clickTab(index, item) {
      this.type = index.value
      uni.$emit('refreshList', () => {
        this.$refs.paging.reload()
      })
    },
    queryList(page, list_rows) {
      // uni.request({
      //   url: `https://gh.api.cestech.com.cn:8240/mission_gh/v1/user/message/list`,
      //   header: {
      //     'x-Resource-Token': uni.getStorageSync('xtoken'),
      //     //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
      //   },
      //   data: {
      //     pageNo: page,
      //     pageSize: list_rows,
      //     // UserId:uni.getStorageSync('users').id
      //   },
      //   method: 'GET',
      //   success: res => {
      //     // console.log(res.data.result.records,'消息')
      //     this.$refs.paging.complete(res.data.result.records)
      //   },
      // })
      getFeedbackList({
        pageNo: page,
        pageSize: list_rows,
        status: this.type,
        phone: uni.getStorageSync('phone'),
      })
        .then(res => {
          this.$refs.paging.complete(res.result.records)
        })
        .catch(res => {
          this.$refs.paging.complete(false)
        })
    },
    goDetail(item) {
      console.log(item, '消息')
      if (!item.is_read) {
        this.$store.commit('subtractMessage', 1)
      }
      uni.$u.route({
        url: 'pageC/feedbackCenter/detail',
        params: {
          id: item.id,
          type: item.type,
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
.item {
  position: relative;
  width: 688rpx;
  background: #ffffff;
  border-radius: 12rpx 12rpx 12rpx 12rpx;
  margin: 16rpx auto;
  padding: 30rpx;
  .image {
    position: absolute;
    top: 0;
    right: 0;
    width: 112rpx;
    height: 112rpx;
    z-index: 999;
  }
  .itemTop {
    width: 576rpx;
    max-height: 92rpx;
    font-family: PingFang SC, PingFang SC;
    font-weight: bold;
    font-size: 32rpx;
    color: #333333;
    line-height: 48rpx;
    text-align: left;
    font-style: normal;
    text-transform: none;
    overflow: hidden;
    display: -webkit-box; /* 将对象作为弹性伸缩盒子模型显示 */
    -webkit-line-clamp: 2; /* 行数，值可以改，表示展示X行后多余的缩略展示 */
    -webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式 */
    word-break: break-all;
  }
  .itemCenter {
    margin-top: 20rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .title {
      height: 34rpx;
      line-height: 34rpx;
      font-family: PingFang SC, PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #999999;
      line-height: 40rpx;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
    .line {
      width: 2rpx;
      height: 30rpx;
      background: #bbbbbb;
      border-radius: 0rpx 0rpx 0rpx 0rpx;
    }
  }
  .itemBottom {
    display: flex;
    justify-content: space-between;
    font-weight: 400;
    font-size: 28rpx;
    color: #333333;
    line-height: 40rpx;
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
