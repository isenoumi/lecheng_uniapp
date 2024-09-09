<!-- 新闻 详情 -->
<template>
  <view class="container">
    <view class="u-nav">
      <navbar
        :safeAreaInsetTop="true"
        placeholder
        height="55"
        leftIconColor="#fff"
        autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="内容详情" color="#fff"></u--text>
        </view>
      </navbar>
    </view>
    <u-loading-page :loading="pageLoading"></u-loading-page>
    <view
      v-if="!pageLoading"
      style="background-color: #ffffff; padding: 30rpx 30rpx 30rpx 30rpx">
      <!-- <view class="titleBox text-xl text-black text-bold">{{
        detail.title || ''
      }}</view> -->
      <view class="u-m-t u-m-b">
        <u--text
          type="info"
          size="13"
          :text="(detail.updateTime || detail.createTime) | dateFormat">
        </u--text>
      </view>

      <u-line></u-line>
      <!-- 中间文章区域 -->
      <view class="u-m-t">
        <mp-html :content="detail.content" />
      </view>
    </view>
  </view>
</template>

<script>
import {
  courseknowledgeread,
  knowledge,
  add_points,
  // view_click
} from '@/common/api.js'
import { add_point } from '@/common/newapi.js'
export default {
  data() {
    return {
      id: null, //来源id
      pageLoading: true,
      titles: '',
      points: 0,
      source_type: 2, //来源类型 1进入，2阅读，3答题',
      get_type: 3, //积分获取方式 1课程，2宣教，3文化',
      flag: 1, // 1到底部发请求 2不发请求
      points_acquisition_rule: 0, //获取积分规则 1进入，2阅读，3答题',
      source_id: '',
      detail: {
        title: '',
        create_time: '',
        content: '',
        type: '',
      },
      status: '',
      tip: '',
    }
  },
  onReachBottom() {
    // console.log(this.status,'到底了')
    if (this.flag == 1) {
      if (this.points_acquisition_rule == 2) {
        this.source_type = 2
        this.add_points()
      }
      // this.add_points()
      // console.log(this.flag,'this.flag')
    }
    this.flag = 2
    // console.log(this.flag,'this.flag')
  },
  onBackPress(options) {
    console.log('返回了')
  },
  onLoad(option) {
    console.log(option, 'option')
    this.titles = option.title
    this.points = option.points
    this.points_acquisition_rule = Number(option.points_acquisition_rule)
    this.source_id = option.source_id
    if (option.id) {
      this.id = option.id
      this.getDetail()
    } else {
      uni.$u.route({
        type: 'navigateBack',
      })
      return
    }
    this.viewClick()
    if (this.points_acquisition_rule == 1) {
      this.source_type = 1
      this.add_points()
    }
  },
  computed: {},
  methods: {
    //点击文章
    viewClick() {
      uni.request({
        url: 'https://gh.api.cestech.com.cn:8240/mission_gh/v1/viewclick',
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
          //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
        },
        // url:' http://192.168.100.53:3000/'
        data: {
          click_type: 2,
          knowledge_id: this.id,
          title: this.titles,
          appId: uni.getStorageSync('openid'),
        },
        method: 'get',
        success: res => {
          /* console.log(res.data.result.records, 'xxxx') */
        },
      })
    },
    //获得积分
    add_points() {
      if (uni.getStorageSync('avatarUrl')) {
        uni.request({
          // url: 'https://gh.api.cestech.com.cn:8240/mission_gh/v1/sy/cultura/listbycustomer',
          url: 'https://gh.api.cestech.com.cn:8240/mission_gh/v1/user/add_points',
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
            //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
          },
          data: {
            pointsGetType: this.source_type,
            id: null,
            pointsSourceId: this.source_id,
            pointsSourceType: this.get_type,
            points: Number(this.points),
            title: this.titles,
            userId: uni.getStorageSync('users').id,
            type: 0,
          },
          method: 'POST',
          success: res => {
            if (res.data.code === 200) {
              uni.showToast({
                icon: 'none',
                title: '恭喜获得本文章积分',
              })
            } else {
              uni.showToast({
                icon: 'none',
                title: '已获得过本文章积分',
              })
            }
          },
        })
      }
    },
    onShareAppMessage(res) {
      return {
        title: '',
      }
    },
    getDetail() {
      uni.request({
        url: 'https://gh.api.cestech.com.cn:8240/mission_gh/v1/cultura/knowledge',
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
          //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
        },
        data: {
          id: this.id,
        },
        method: 'GET',
        success: res => {
          this.pageLoading = false
          console.log(res.data.result.records, 'res.data.result.records')
          this.detail = res.data.result.records[0]
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
button::after {
  border: none;
  background: transparent;
}

uni-button {
  background: transparent;
}

.container {
  background-color: #f2f2f2;
  width: 750rpx;
}

.solid {
  border-radius: 50rpx;
  text-indent: 12rpx;
}

.other-content {
  padding: 30rpx;

  .titleName {
    text-align: center;
    font-size: 36rpx;
    color: #333;
    margin-bottom: 15rpx;
  }

  .titleOther {
    text-align: center;
    font-size: 26rpx;
    color: #8799a3;
    margin-bottom: 15rpx;
  }

  .image {
    margin: 20rpx auto;
    display: block;
  }

  .explainBox {
    color: #8799a3;
  }

  .explainItem {
    margin-bottom: 16rpx;
  }
}
</style>
