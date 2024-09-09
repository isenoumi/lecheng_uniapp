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
          <u--text text="我的消息" color="#fff"></u--text>
        </view>
      </navbar>
    </view>

    <view style="background-color: #42d997">
      <u-tabs
        :list="tabs"
        @click="clickTab"
        lineColor="#FFFFFF"
        :inactiveStyle="{ color: '#ffffff' }"
        :activeStyle="{ color: '#ffffff', fontSize: '32rpx' }"
        lineWidth="24"
        :scrollable="false"
        :itemStyle="{
          height: '44px',
        }"></u-tabs>
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
            <view class="itemTop">
              <view>
                <view v-if="item.messageType == 'REDEMPTION_HISTORY'">
                  <u-icon
                    label="  积分变动提醒"
                    size="24"
                    name="/static/assets/center/组 1525 (1).png"></u-icon>
                </view>
                <view v-else>
                  <u-icon
                    label="系统消息提醒"
                    size="24"
                    name="/static/assets/center/组 1525.png"></u-icon
                ></view>
              </view>
              <u-icon name="more-dot-fill" color="#C5C4C9" size="14"></u-icon>
            </view>
            <view
              class="itemCenter"
              v-if="item.messageType == 'REDEMPTION_HISTORY'">
              <view class="title">
                积分变动：
                <div style="color: #1dd193" class="content">
                  {{ item.messageContent }}
                </div>
              </view>
              <view class="title">
                剩余积分：
                <div style="color: #333333" class="content">
                  {{ item.problemStatement }}
                </div>
              </view>
              <!-- <view class="title">
                状态变更：
                <div style="color: #333333" class="content">{{}}</div>
              </view> -->
              <view class="title">
                变动时间：
                <div style="color: #333333" class="content">
                  {{ item.createTime }}
                </div>
              </view>
            </view>
            <view class="itemCenter" v-else>
              <view class="title">
                工单内容：
                <div style="color: #1dd193" class="content">
                  {{ item.problemStatement }}
                </div></view
              >
              <view class="title">
                回复内容：
                <div style="color: #333333" class="content">
                  {{ item.messageContent }}
                </div>
              </view>
              <view class="title">
                回复时间：
                <div style="color: #333333" class="content">
                  {{ item.createTime }}
                </div>
              </view>
              <!-- <view class="title" class="content">
                变动时间： <div style="color: #333333">{{}}</div>
              </view> -->
            </view>

            <view class="line"> </view>
            <view class="itemBottom" @click="goDetail(item)">
              <view> 查看详情 </view>
              <u-icon name="arrow-right" color="#C5C4C9" size="14"></u-icon>
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
import { openSubscription, get_wx_access_token, send_msg } from '@/util/message'
import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'
import { mapState } from 'vuex'

import { getMessageList, getMessageSys, getMessagePoints } from './api'
export default {
  components: {},
  mixins: [ZPMixin],
  data() {
    return {
      globalData: getApp().globalData,
      dataList: [],
      type: '全部',
      tabs: [
        { name: '全部', value: '' },
        { name: '系统消息', value: '' },
        { name: '积分变动', value: '' },
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
    click() {
      // openSubscription([
      //   // 'QXHAHUIzc1_Sdu3BLtwepQgvcO4ouoPwNeekRolHFFU',
      //   'LRPGwkOkIr1HF3BRLL39U5iC__FPj67GAtl7LsTiLOM',
      // ])
      // send_msg({
      //   params: {
      //     // date2: { value: '2022' },
      //     // thing1: { value: 'xiangqing ' },
      //     thing2: { value: 'xiangqing ' },
      //     phrase3: { value: '处理中' },
      //     // character_string4: { value: '1536465' },
      //   },
      //   tmplId: 'LRPGwkOkIr1HF3BRLL39U5iC__FPj67GAtl7LsTiLOM',
      //   openid: uni.getStorageSync('users').openid,
      // })
    },
    clickTab(index, item) {
      this.type = index.name
      uni.$emit('refreshList', () => {
        this.$refs.paging.reload()
      })
    },
    queryList(page, list_rows) {
      if (this.type == '全部')
        getMessageList({
          pageNo: page,
          pageSize: list_rows,
          phone: uni.getStorageSync('phone'),
        })
          .then(res => {
            this.$refs.paging.complete(res.result.records)
          })
          .catch(res => {
            this.$refs.paging.complete(null)
          })
      else if (this.type == '积分变动')
        getMessagePoints({
          pageNo: page,
          pageSize: list_rows,
          phone: uni.getStorageSync('phone'),
        })
          .then(res => {
            this.$refs.paging.complete(res.result.records)
          })
          .catch(res => {
            this.$refs.paging.complete(null)
          })
      else if (this.type == '系统消息')
        getMessageSys({
          pageNo: page,
          pageSize: list_rows,
          phone: uni.getStorageSync('phone'),
        })
          .then(res => {
            this.$refs.paging.complete(res.result.records)
          })
          .catch(res => {
            this.$refs.paging.complete(null)
          })
    },
    goDetail(item) {
      console.log(item, '消息')
      // uni.navigateTo({ url: '/pageC/message/detail' + `?id=${item.id}` })
      // if (!item.is_read) {
      //   this.$store.commit('subtractMessage', 1)
      // }
      uni.$u.route({
        url: 'pageC/message/detail',
        params: {
          id: item.id,
          content: item.messageContent,
          createTime: item.createTime,
        },
      })
      // item.is_read = 1
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
  width: 688rpx;
  background: #ffffff;
  border-radius: 12rpx 12rpx 12rpx 12rpx;
  margin: 16rpx auto;
  padding: 30rpx;
  .itemTop {
    display: flex;
    justify-content: space-between;
  }
  .itemCenter {
    margin-top: 16rpx;
    .title {
      /* width: 140rpx; */
      display: flex;
      justify-content: left;
      height: 40rpx;
      font-family: PingFang SC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      color: #999999;
      line-height: 40rpx;
      text-align: left;
      font-style: normal;
      text-transform: none;
      align-items: center;

      .content {
        width: 420rpx;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; // 默认不换行；
        height: 40rpx;
        line-height: 40rpx;
      }
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
    margin: 28rpx auto;
  }
}
</style>
