<template>
  <view>

    <!-- 积分明细 -->
    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
      <view style="height: 20rpx;"></view>
      <view class="list" v-for="(item,index) in listData" :key="index">
        <view class="list-left">
          <view class="name">{{item.exchangeType}}</view>
          <view class="time">领取时间: {{item.createTime}}</view>
        </view>
      </view>
    </mescroll-body>

  </view>
</template>

<script>
  import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
  import {
    points_log
  } from '@/common/api.js'
  export default {
    mixins: [MescrollMixin], // 使用mixin
    data() {
      return {
        current: 0,
        listData: [],
        switchs: 0,
        shoplist: [

        ],
        list6: [{
            name: '积分收支'
          },
          {
            name: '积分规则',
          }
        ]
      }
    },


    onLoad(options) {



    },
    mounted() {

    },
    methods: {
      /*下拉刷新的回调 */
      downCallback() {
        this.mescroll.resetUpScroll()
      },
      /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
      upCallback(page) {
        const userid = uni.getStorageSync("users").id
        uni.request({
          url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbQuestionnaireQuestions/giftInquiryList?pageNo=${page.num}&pageSize=${page.size}&id=${uni.getStorageSync('phone')}`,
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
          },
          method: "GET",
          success: (res) => {
            console.log(res.data.result);

            //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
            this.mescroll.endSuccess(res.data.result.length);

            //设置列表数据
            if (page.num == 1) this.listData = []; //如果是第一页需手动制空列表
            this.listData = this.listData.concat(res.data.result); //
          },
          complete: () => {
            this.mescroll.endErr();
          }

        })

      },
    }
  }
</script>

<style lang="scss">
  page {
    background: #f5f5f5;
  }

  .txt {
    border-radius: 20rpx;
    height: 1000rpx;
    width: 94%;
    background: #fff;
    margin: 20rpx auto;
    font-size: 28rpx;
    line-height: 60rpx;
    padding: 20rpx 40rpx 0 40rpx;
    font-weight: 550;
  }

  .income {
    width: 750rpx;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx 35rpx;
    margin-bottom: 15rpx;

    .income-left {
      display: flex;
      align-items: center;
      font-size: 28rpx;
      color: silver;

      .shop-name {
        margin-left: 20rpx;

        .prodname {
          width: 280rpx;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap; // 默认不换行；

        }
      }
    }

    .income-right {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: silver;
      font-size: 32rpx;

      .status {
        font-size: 34rpx;
        font-weight: 550;
      }

      .jf {
        margin-top: 10rpx;
      }
    }
  }

  .u-demo-block__content {
    background: #fff;
    padding-bottom: 20rpx;
  }

  .list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 30rpx 45rpx;
    background: #fff;
    margin-bottom: 15rpx;

    .list-left {
      .name {
        font-size: 32rpx;
        font-weight: bold;
        width: 400rpx;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; // 默认不换行；
        color: #333333;
      }

      .time {
        font-size: 24rpx;
        color: #999999;
        margin-top: 25rpx;
      }
    }

    .list-right {
      font-size: 28rpx;
    }
  }
</style>