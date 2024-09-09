<template>
  <view>
    <u-navbar :title=title @rightClick="rightClick" :autoBack="true">
    </u-navbar>
    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
      <view style="margin-top: 190rpx;">
        <view class="activityList">
          <view class="li" v-for="item in activityList" @click="information(item.id)">
            <view class="img">
              <image :src="item.coverUrl" mode="aspectFit" style="width: 100%;height: 100%;"></image>
            </view>
            <view class="right">
              <view class="name">{{item.activityName}}</view>
              <!-- 		<view class="positioning">
								<u-icon name="map-fill"  size="16"></u-icon>
								<view class="dw">{{item.activitySite}}</view>
							</view> -->
            </view>
          </view>
        </view>
      </view>
    </mescroll-body>

  </view>
</template>

<script>
  import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
  export default {
    mixins: [MescrollMixin], // 使用mixin
    data() {
      return {
        title: '',
        num: '',
        activityList: [

        ]
      }
    },
    onLoad(option) {
      console.log(option)
      if (option.num) {
        this.num = option.num


      }
      if (option.num === '0') {
        this.title = '大型活动'
      } else if (option.num === '1') {
        this.title = '中型活动'
      } else {
        this.title = '小型活动'
      }


    },
    methods: {
      /*下拉刷新的回调 */
      downCallback() {
        this.mescroll.resetUpScroll()
      },
      /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
      upCallback(page) {
        console.log(page);
        uni.request({
          url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbActivityCustomization/list`,
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
            //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
          },
          data: {
            pageNo: page.num,
            pageSize: page.size,
            activityType: this.num
          },
          method: "POST",
          success: (res) => {
            let url = 'https://gh.api.cestech.com.cn:8240/mission_gh/sys/common/static/'
            console.log(res.data.result.records, 'cc')
            res.data.result.records.forEach(v => {
              console.log(v, 'tutttt')
              // v.coverUrl=url+v.coverUrl
              // v.coverUrl=v.coverUrl
            })
            // this.activityList=res.data.result.records
            this.mescroll.endSuccess(res.data.result.records.length);
            if (page.num == 1) this.activityList = []; //如果是第一页需手动制空列表
            this.activityList = this.activityList.concat(res.data.result.records); //追加新数据

          }
        })

      },
      information(id) {
        uni.navigateTo({
          url: `/pageB/activitycustomized/information?id=${id}`
        })
      },
      rightClick() {
        console.log('rightClick');
      },
      leftClick() {
        console.log('leftClick');
      }
    }
  }
</script>

<style lang="scss">
  page {
    background: #f5f5f5;
  }

  .activityList {
    width: 750rpx;

    display: flex;
    flex-wrap: wrap;

    .li {
      width: 750rpx;
      display: flex;
      align-items: center;
      padding: 30rpx;
      background: #fff;
      margin-bottom: 15rpx;

      .img {
        width: 160rpx;
        height: 160rpx;
      }

      .right {
        margin-left: 25rpx;

        .name {
          font-weight: 550;
        }

        .positioning {

          display: flex;
          align-items: center;
          font-size: 26rpx;
          margin-top: 40rpx;

          .dw {
            margin-left: 6rpx;
            width: 460rpx;
            overflow: hidden; //超出的文本隐藏
            text-overflow: ellipsis; //溢出用省略号显示
            white-space: nowrap; // 默认不换行；

          }
        }
      }
    }
  }
</style>