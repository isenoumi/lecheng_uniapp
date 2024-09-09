<template>
  <view>
    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
      <view style="height: 20rpx;"></view>
      <view class="list" v-for="(item,index) in listData" :key="index">
        <view class="title">
          <view class="userinfo">
            <view class="avatar"><u-avatar :src="avatarUrl"></u-avatar></view>
            <view class="name">{{nikename}}</view>
          </view>
          <view class="checkTime">{{item.createTime}}</view>
        </view>
        <view class="listMain">
          <view class="listMainTitle">
            {{item.punchCardDescribe}}
          </view>
          <view class="">
            <!-- {{item.punchCardArrayUrl.split(',')[0]}} -->
          </view>
          <view class="imgList">
            <view class="img" v-for="(img,index) in item.punchCardArrayUrl.split(',')" :key="index">
              <!-- {{img}} -->
              <image :src="img" mode="scaleToFill"></image>
              <!--              <image src="https://img2.baidu.com/it/u=1824946421,2243560498&fm=253&fmt=auto&app=138&f=JPEG?w=650&h=340"
                mode="scaleToFill"></image> -->
            </view>
          </view>
        </view>
      </view>
    </mescroll-body>
    <!-- <image src="../../../static/assets/shop.png" mode=""></image> -->
    <!--    <view class="list" v-for="(item,index) in listData" :key="index">
      <view class="title">
        <view class="userinfo">
          <view class="avatar"><u-avatar :src="avatarUrl"></u-avatar></view>
          <view class="name">{{nikename}}</view>
        </view>
        <view class="checkTime">{{item.checkTime}}</view>
      </view>
      <view class="listMain">
        <view class="listMainTitle">
          {{item.title}}
        </view>
        <view class="imgList">
          <view class="img" v-for="(item,index) in item.imgList" :key="index">
            <image :src="item" mode="heightFix"></image>
          </view>
        </view>
      </view>
    </view> -->
  </view>
</template>

<script>
  import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
  import {
    points_log,
    userInfo
  } from '@/common/api.js'
  import cellGroup from "../../../uni_modules/uview-ui/libs/config/props/cellGroup";
  export default {
    mixins: [MescrollMixin], // 使用mixin
    data() {
      return {
        nikename: '',
        avatarUrl: '',
        phone: '',
        listData: [],
        imgList: []
      }
    },


    created() {
      this.phone = uni.getStorageSync("phone")
    },
    onLoad() {
      this.avatarUrl = uni.getStorageSync('avatarUrl')
      this.nikename = uni.getStorageSync("nikename")
      this.phone = uni.getStorageSync("phone")
      // userInfo().then(res => {
      //   this.phone = res.data.phone
      //   console.log(this.phone);
      // })

      // this.bkbPunchCardRecord()
    },
    mounted() {

    },
    methods: {
      // bkbPunchCardRecord() {
      //   uni.request({
      //     url: `https://gh.api.cestech.com.cn:8240/mission_gh/xcx_api/bkbPunchCardRecord/list?pageNo=1&pageSize=10&punchCardPhone=${this.phone}`,
      //     // data: {
      //     //   // punchCardPhone: this.phone,
      //     //   // punchCardPhone: '17608296903',
      //     // },
      //     method: "GET",
      //     success: (res) => {
      //       console.log(res);
      //       this.listData = res.data.records
      //     }
      //   })
      // },
      /*下拉刷新的回调 */
      downCallback() {
        this.mescroll.resetUpScroll()
      },
      /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
      upCallback(page) {
        console.log(page);
        this.phone = uni.getStorageSync("phone")
        uni.request({
          url: `https://gh.api.cestech.com.cn:8240/mission_gh/xcx_api/bkbPunchCardRecord/list?pageNo=1&pageSize=10&punchCardPhone=${this.phone}`,
          // data: {
          //   punchCardPhone: this.phone,
          //   // punchCardPhone: '梵蒂冈的是',
          // },
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
          },
          method: "GET",
          success: (res) => {
            console.log('aaa', res.data.result);
            // this.imgList = res.data.result.records.
            // this.listData = res.data.records
            this.mescroll.endSuccess(res.data.result.records.length);

            //设置列表数据
            if (page.num == 1) this.listData = []; //如果是第一页需手动制空列表
            this.listData = this.listData.concat(res.data.result.records); //追加新数据
          },
          fail: (res) => {
            this.mescroll.endErr();
          }
        })
        //联网加载数据
        // points_log({
        //   page: page.num,
        //   list_rows: page.size,
        // }).then(res => {
        //   // console.log(res.data.data.records, 'res');

        //   //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
        //   this.mescroll.endSuccess(res.data.data.length);

        //   //设置列表数据
        //   if (page.num == 1) this.listData = []; //如果是第一页需手动制空列表
        //   this.listData = this.listData.concat(res.data.data); //追加新数据
        //   // this.listData.forEach((item) => {
        //   // 	console.log('item', item);
        //   // 	// item.credits = item.credits.parseInt()
        //   // })

        // }).catch(() => {
        //   //联网失败, 结束加载
        //   this.mescroll.endErr();
        // })
      },
    }
  }
</script>

<style lang="scss">
  page {
    background: #f5f5f5;
  }

  .list {
    padding: 30rpx;
    background-color: #fff;
    margin-bottom: 30rpx;

    .title {

      display: flex;
      justify-content: space-between;
      align-items: center;

      .checkTime {
        font-size: 28rpx;
        color: #a6a6a6;
      }

      .userinfo {
        display: flex;
        justify-content: left;
        align-items: center;

        .avatar {
          margin-right: 30rpx;
        }

        .name {
          font-size: 28rpx;
        }
      }
    }

    .listMain {
      .listMainTitle {
        font-size: 30rpx;
        font-weight: 500;
        margin: 20rpx 0;
      }

      .imgList {
        display: flex;
        justify-content: left;

        .img {
          margin-right: 40rpx;

          image {
            height: 160rpx;
            width: 160rpx;
            border-radius: 15rpx;
          }
        }
      }
    }
  }
</style>