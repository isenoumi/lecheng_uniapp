<template>
  <view>
    <view class="u-nav">
      <navbar :safeAreaInsetTop="true" height="55" placeholder leftIconColor="#fff" autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="预约老师" color="#fff"></u--text>
        </view>
      </navbar>
    </view>

    <view class="tabbar">
      <u-tabs :list="list1" lineColor="#3BCF99" lineWidth="30" @click="click" :scrollable="false"></u-tabs>
    </view>
    <view class="tip">
      <view class="tip-title">温馨提示</view>
      <view class="tip-txt">所有用户预约主持老师时，请提前2天预约</view>
	  <view class="tip-img"><image style="width: 100%;height: 100%;" mode="aspectFill" src="http://cdn.cestech.com.cn/TrainingProgram/img/75ccd8d4d97146048d10a48109a0117a.png"></image></view>
    </view>
    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
      <view class="list">
        <view class="list-li" v-for="item in list" @click="details(item.id)">
          <view class="left">
            <!-- {{item.headImage}} -->
            <image :src="item.headImage" mode="aspectFill" style="width: 100%;height: 100%;">
            </image>
          </view>
          <view class="right">
            <view>
              <view class="right-title">
                <view class="neme">
                  <view>{{item.speechTeacher}}</view>
                </view>
                <view class="jg">￥{{item.speechExpenses}}</view>
              </view>


              <view class="labels">
                <span class="tab" v-if="item.speechLevel == '志愿者'"
                  style="padding: 0 10rpx;border-color: #3BCF99; color:#3BCF99;">{{item.speechLevel}}</span>
                <span class="tab" v-if="item.speechLevel == '专家'"
                  style="padding: 0 10rpx;border-color: #FF861B; color:#FF861B;">{{item.speechLevel}}</span>
                <span class="tab" v-if="item.speechLevel == '普通老师'"
                  style="padding: 0 10rpx;border-color:#1B71FF; color:#1B71FF;">{{item.speechLevel}}</span>
                <!-- <view class="tab" :style="{color:txtcolor}"></view> -->
              </view>
              <view class="simple">{{item.personalProfile}}</view>
            </view>
            <view></view>

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
        list1: [{
          name: '全部',
        }, {
          name: '专家级',
        }, {
          name: '志愿者'
        }, {
          name: '普通老师'
        }],
        speechLevel: 0,
        list: [

        ],
        bordercolor: '#68F1A9',
        txtcolor: '#3BCF99'
      }
    },
    onLoad() {
      if (!uni.getStorageSync('phone')) {
        uni.showToast({
          title: "请登录后再进行操作",
          icon: "none"
        })
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/center/index'
          })
        }, 1000)
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
          url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbAppointmentTeacher/list`,
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
            //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
          },
          data: {
            pageNo: page.num,
            pageSize: page.size,
            speechLevel: this.speechLevel,
            // userId:uni.getStorageSync('users').id
          },
          method: "GET",
          success: (res) => {
            // let url = 'https://gh.api.cestech.com.cn:8240/mission_gh/sys/common/static/'
            let url = ''
            //    console.log(res.data.result.records, 'cc')
            res.data.result.forEach(v => {
              console.log(v, 'tutttt')
              // v.headImage=url+v.headImage
              console.log(v.headImage);
              if (v.speechLevel === 1) {
                v.speechLevel = '专家'
                this.bordercolor = '#68F1A9'
                this.txtcolor = '#3BCF99'
              } else if (v.speechLevel === 2) {
                v.speechLevel = '志愿者'
                this.bordercolor = '#FF861B'
                this.txtcolor = '#FF861B'
              } else if (v.speechLevel === 3) {
                v.speechLevel = '普通老师'
                this.bordercolor = '#1B71FF'
                this.txtcolor = '#1B71FF'
              }
            })
            this.list = res.data.result
            this.mescroll.endSuccess(res.data.result.length);
            if (page.num == 1) this.list = []; //如果是第一页需手动制空列表
            this.list = this.list.concat(res.data.result); //追加新数据

          }
        })

      },
      click(item) {
        console.log('item', item.index);
        this.speechLevel = item.index;
        this.downCallback();

      },
      details(id) {
        uni.navigateTo({
          url: `/pageB/appointmenteacher/details?id=${id}`
        })
      }
    }
  }
</script>

<style lang="scss">
  page {
    background: #f5f5f5;
  }

  .list {

    margin-top: 10rpx;

    .list-li {
      margin: 0 auto;
      width: 723rpx;
      border-radius: 12rpx;
      background: #fff;
      padding: 25rpx 35rpx;
      display: flex;
      align-items: center;
      margin-bottom: 10rpx;

      .left {
        width: 140rpx;
        height: 140rpx;
      }

      .right {
        margin-left: 20rpx;

        .right-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 32rpx;

          .jg {
            color: red;
            font-size: 32rpx
          }

          .neme {
            display: flex;
            align-items: center;


          }
        }

        .simple {
          color: #999999;
          margin-top: 20rpx;
          font-size: 26rpx;
          width: 500rpx;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap; // 默认不换行；
        }
      }
    }
  }

  .tip {
    margin: 0 auto;
    width: 723rpx;
    height: 150rpx;
    background: #FFFFFF;
    border-radius: 11rpx;
    padding: 20rpx 30rpx;
    background: #fff;
    margin-top: 16rpx;
	position: relative;
    .tip-title {
      font-size: 34rpx;
      font-weight: 550;
    }

    .tip-txt {
      font-size: 24rpx;
      margin-top: 15rpx;
      font-weight: 400;
      color: #2FD090;
    }
	.tip-img{
		width: 160rpx;
		height: 120rpx;
		position: absolute;
		top: -30rpx;
		left: 550rpx;
	}
  }

  .tabbar {
    // margin-top: 10rpx;

    /deep/.u-tabs {
      background: #fff;
    }
  }

  .labels {
    margin-top: 10rpx;
  }

  .tab {
    text-align: center;
    padding: 4rpx 15rpx;
    height: 40rpx;
    line-height: 35rpx;
    border: 1px solid #68F1A9;
    border-radius: 10rpx;
    // width: 120rpx;
    // margin-left: 10rpx;
    font-size: 24rpx;
    margin-top: 15rpx;
    color: #3BCF99;
    // border: 1rpx solid rgb(249, 176, 41);
    // color: rgb(249, 176, 41);
    // padding: 0rpx 6rpx;
  }
</style>