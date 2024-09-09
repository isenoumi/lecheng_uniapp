<template>
  <view class="box">
    <view class="u-nav">
      <navbar
        :safeAreaInsetTop="true"
        :allTitle="false"
        height="55"
        placeholder
        imageSrc="http://cdn.cestech.com.cn/BkpKnowledge/img/87365097fa96463c8790dc4074fe93d1.png">
        <view class="u-nav-slot" slot="left">
          <u--text text="积分商城" color="#fff" bold></u--text>
        </view>
      </navbar>
    </view>
    <view class="body">
      <view class="top">
        <view class="">
          <view class="myIntegral" @click="integral">
            <span>当前积分</span>
            <br />
            <span class="points">{{ points }}</span>
          </view>

          <view class="integralRank" @click="integral"> 明细/记录/规则> </view>
        </view>

        <view class="img">
          <image
            src="http://cdn.cestech.com.cn/BkpKnowledge/img/063ea2bc56da44adbc200412a0ffd649.png"
            mode="widthFix">
          </image>
          <view class="noticebar" @click="rankList">
            <view class="noticebar-name">
              <view>积分排行></view>
              <!--   <view style="width: 20rpx;"></view>
              <u-notice-bar :text="text1" :icon="volume" direction="column" color="red"></u-notice-bar>
           -->
              <!-- <uni-notice-bar :scrollable="true" :single="true" :text="text1" /> -->
            </view>
            <!--      <view class="more">
              <view>更多</view>
              <u-icon name="arrow-right" size="14"></u-icon>
            </view> -->
          </view>
        </view>
      </view>
      <view class="line"> </view>
      <view class="search">
        <u-search
          placeholder="搜索您想要的商品"
          v-model="keyword"
          :showAction="false"
          disabled
          @click="go_search"></u-search>
      </view>
      <view class="container">
        <!-- 头部搜索区 -->

        <!-- <view class="search-bar">
	      <view class="search-box" @tap="toSearchPage">
	        <image src="/static/images/icon/search.png" class="search-img"></image>
	        <text class="sear-input">搜索您想要的商品</text>
	      </view>
	    </view> -->

        <!-- 滚动内容区 -->
        <view class="main">
          <!-- 左侧菜单start -->
          <view class="leftmenu">
            <!--     <block v-for="(item, index) in categoryList" :key="index">
              <view class="menu-item" :class="{ red:changeRed == index}" :data-index="index" :data-id="item.categoryId"
                @click="change(item.categoryId,index)">
                {{item.categoryName}}
              </view>
            </block> -->
            <u-tabs
              :current="current"
              lineWidth="30"
              lineColor="#39d48f"
              :activeStyle="{
                'font-size': '32rpx',
                ' font-weight': 'bold',
                color: '#333333',
              }"
              :inactiveStyle="{
                'font-size': '30rpx',
                'font-weight': 'bold',
                color: '#666666',
              }"
              @click="change"
              :list="categoryList"
              keyName="categoryName"></u-tabs>
            <view v-if="!categoryList || !categoryList.length" class="ca-empty">
              {{
                categoryList && categoryList.length
                  ? '该分类下暂无商品'
                  : '暂无商品'
              }}
            </view>
          </view>
          <!-- 左侧菜单end -->

          <!-- 右侧内容start -->
          <view class="rightcontent">
            <!-- <block wx:for='{{ productList}}' wx:key=''> -->
            <!--   <view class="adver-map">
              <view class="item-a">
                <image :src="productList.imgurl" mode="widthFix"></image>
              </view>
            </view>
           <view style="height: 20rpx;"></view> -->
            <view
              class="cont-item"
              style="
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                justify-content: space-between;
              ">
              <view
                v-for="items in productList.list"
                style="margin-bottom: 20rpx">
                <view
                  style="width: 282rpx; text-align: center"
                  @click="shop_details(items)"
                  class="itemss">
                  <view>
                    <image
                      :src="items.pic"
                      class="more-pic"
                      mode="scaleToFill"
                      style="
                        width: 282rpx;
                        height: 282rpx;
                        border-radius: 15rpx;
                      ">
                    </image>
                  </view>
                  <view class="shoppingTitle">
                    <view
                      style="
                        font-size: 28rpx;
                        color: #333333;
                        font-weight: bold;
                        font-family: PingFang SC;
                      ">
                      {{ items.prodName }}
                    </view>
                    <view
                      style="
                        margin-top: 10rpx;
                        font-size: 24rpx;
                        color: #808080;
                        font-family: PingFang SC;
                        font-weight: 500;
                      ">
                      兑换积分：{{ items.points }}</view
                    >
                  </view>
                </view>
              </view>
              <!-- <view class="show-item" @tap="toProdPage" :data-prodid="item.prodId">
	              <view class="more-prod-pic">
	                <image :src="item.pic" class="more-pic" mode="scaleToFill"></image>
					<view >{{item.prodName}}</view>
	              </view>
	              <view class="prod-text-right">
	                <view class="prod-text more">{{item.prodName}}</view>
	                <view class="cate-prod-info">{{item.brief}}</view>
	               <view class="prod-price more">
	                  <text class="symbol">￥</text> <text class="big-num">{{wxs.parsePrice(item.price)[0]}}</text><text class="small-num">.{{wxs.parsePrice(item.price)[1]}}</text> 
	                </view>
	              </view>
	            </view> -->
            </view>
            <!-- <view v-if="!productList" class="cont-item empty">该分类下暂无商品</view> -->
            <!-- </block> -->
          </view>
          <!-- 右侧内容end -->
          <!-- </block> -->
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { showConfirm } from '@/util/common'
import {
  userInfo,
  // usersave
} from '@/common/api.js'
export default {
  data() {
    return {
      current: 0,
      keyword: '',
      selIndex: 0,
      categoryList: [],
      productList: {
        imgurl: '',
        list: [],
      },
      categoryImg: '',
      prodid: '',
      text1: [],
      points: 0,
      point: 0,
      changeRed: 1,
      rankingList: [],
      categoryId: 0,
    }
  },
  onTabItemTap() {
    this.userinfo()
    this.ranking_list()
    this.categoryInfo()
  },
  onLoad() {
    this.ranking_list()
    this.userinfo()
    // this.categoryInfo()
  },
  methods: {
    toLoginPage() {
      if (!uni.getStorageSync('xtoken')) {
        showConfirm('当前用户未登录, 请前往登录?').then(res => {
          if (res.confirm) {
            uni.reLaunch({
              url: '/pages/center/index',
            })
            return false
          }
        })
      } else {
        return true
      }
    },
    //搜索商品
    go_search() {
      if (this.toLoginPage())
        uni.navigateTo({
          url: '/pageD/search/index',
        })
    },
    categoryInfo() {
      uni.request({
        url: 'https://gh.api.cestech.com.cn:8240/mission_gh/category/categoryInfo',
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
          //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
        },
        data: {
          parentId: '',
        },
        method: 'GET',
        success: res => {
          this.current = 0
          console.log(this.current, '默认选中')
          // console.log(res.data.result,'商品列表')
          this.categoryList = res.data.result
          this.categoryId = res.data.result[0].categoryId
          this.pageprod_details()
        },
      })
    },
    rankList() {
      if (this.toLoginPage())
        uni.navigateTo({
          // url: '/pageA/ranking/index',
          url: '/pageB/developing/index',
        })
    },
    ranking_list() {
      uni.request({
        url: 'https://gh.api.cestech.com.cn:8240/mission_gh/v1/ranking',
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
          //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
        },
        method: 'GET',
        success: res => {
          console.log(res)
          res.data.result.records.map(v => {
            // console.log(v, 'vvvv')
            if (v.points != 0) {
              this.rankingList.push(v)
              this.text1.push('恭喜' + v.nickName + '获得' + v.points + '积分')
            }
          })
          console.log(this.rankingList, 'this.rankingList')
        },
      })
    },
    change(item) {
      this.current = item.index
      console.log(item, '选中')
      // this.changeRed = index;
      this.categoryId = item.categoryId
      this.pageprod_details()
    },
    pageprod_details() {
      uni.request({
        url: 'https://gh.api.cestech.com.cn:8240/mission_gh/prod/pageProd',
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
          //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
        },
        // header: {
        // 	'X-Access-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODkwNjQ3NTcsInVzZXJuYW1lIjoiYWRtaW4ifQ.9zI7NyLu1gcsn17dqXV9FUEyXIMRU6MgHxp9BG0i7MM' //自定义请求头信息
        // },
        data: {
          categoryId: this.categoryId,
        },
        method: 'GET',
        success: res => {
          console.log(res.data.result.records)
          // res.data.result.records.map(v => {
          // 	console.log(v, 'shuju')
          // 	v.pic = v.pic.slice(23)
          // 	console.log(v.pic)
          // })
          this.productList.list = res.data.result.records
          console.log(this.productList.list, '111')
        },
      })
      uni.request({
        url: 'https://gh.api.cestech.com.cn:8240/mission_gh/prod/pageProdL',
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
          //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
        },
        // header: {
        // 	'X-Access-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODkwNjQ3NTcsInVzZXJuYW1lIjoiYWRtaW4ifQ.9zI7NyLu1gcsn17dqXV9FUEyXIMRU6MgHxp9BG0i7MM', //自定义请求头信息
        // },
        data: {
          categoryId: this.categoryId,
        },
        method: 'GET',
        success: res => {
          this.productList.imgurl = res.data.result.pic
        },
        // console.log(res.data.result.pic,'BANERE')

        // res.data.result.records.map(v => {
        // 	console.log(v, 'shuju')
        // 	v.pic = v.pic.slice(23)
        // 	console.log(v.pic)
        // })
        // this.productList.list = res.data.result.records
        // console.log(this.productList.list, '111')
      })
    },
    shop_details(item) {
      if (this.toLoginPage())
        uni.navigateTo({
          url: `/pageD/shop/details?id=${item.prodId}`,
        })
      // uni.navigateTo({
      // 	url: `/pageD/shop/index?id=${item.categoryId}`
      // })
    },
    /**
     * 分类点击事件
     */
    onMenuTab: function (e) {
      console.log(e)
      var id = e.currentTarget.dataset.id
      var index = e.currentTarget.dataset.index // this.getProdList(id);

      // this.getProdList(this.categoryList[index].categoryId);
      // this.setData({
      //   categoryImg: this.categoryList[index].pic,
      //   selIndex: index
      // });
    },
    //获取用户个人信息
    userinfo() {
      //获取用户个人信息
      // userinfo() {
      // 	let phone = uni.getStorageSync('iphone')
      // 	uni.request({
      // 		url: `https://gh.api.cestech.com.cn:8240/mission_gh/xcx_api/bkbAppUser/integralRecordSummation?phone=${phone}`,
      // 		method: "GET",
      // 		success: (res) => {

      // 			this.points = res.data.result.sum
      // 			console.log(this.points, res.data.result.sum, '用户')

      // 		}

      // 	})

      // },
      uni.request({
        url: 'https://gh.api.cestech.com.cn:8240/mission_gh/v1/user/info',
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
          //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
        },
        data: {
          phone: uni.getStorageSync('phone'),
        },
        method: 'GET',
        success: res => {
          console.log(res, '用户')
          this.points = res.data.result.records[0].points
          // this.users=res.data.result.records[0]
          // uni.setStorageSync('users', res.data.result.records[0])
          // this.txt=res.data.result.records[0].role.split(",")
        },
      })
    },
    insal() {
      uni.request({
        url: 'https://gh.api.cestech.com.cn:8240/mission_gh/xcx_api/bkbChoiceqst_answer/mallTotalPoints',

        data: {
          //参数
          phone: uni.getStorageSync('phone'),
        },
        // header: {
        // 	//'x-Resource-Token':uni.getStorageSync('xtoken'),
        // 	'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
        // },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          //'x-Resource-Token':uni.getStorageSync('xtoken'),
          // 'Content-Type': 'application/json' //自定义请求头信息
        },
        method: 'GET', //请求方式，必须为大写
        success: res => {
          console.log('------', res.data.result)
          this.point = res.data.result.integration
        },
      })
    },
    //我的积分
    integral() {
      if (this.toLoginPage())
        uni.navigateTo({
          url: '/pageA/integral/index',
        })
    },
    ranking() {
      if (this.toLoginPage())
        uni.navigateTo({
          url: '/pageA/ranking/index',
        })
    },
    toShopExhange() {
      if (this.toLoginPage())
        uni.navigateTo({
          url: '/pages/shopExchange/shopExchange',
        })
    },
  },
}
</script>

<style lang="scss">
page {
  background-color: #39d48f;
  // padding: 10rpx;
}

// .itemss{
// 	margin-right: 35rpx;
// }

//   .itemss:nth-child(3n+3) {
//           margin-right: 0rpx !important;
//        }
.red {
  background: #fff;
  color: #39d48f !important;
  font-weight: 550 !important;
  border-left: 8rpx solid #39d48f;
}

.search {
  margin-top: 30rpx;
  margin-bottom: 20rpx;
}

.shop-item {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

/* pages/category/category.wxss */

.container {
  display: flex;
  flex-direction: row;
  // height: 1000rpx;
  width: 600rpx;
  margin: 0 auto;
}

.main {
  // position: fixed;
  // display: flex;
  width: 640rpx;
  margin: 0 auto;
  // margin-right: 100rpx;
  margin-top: 20rpx;
  // overflow: hidden;
  // margin-top: 100rpx;
  // height: calc(100% - 100rpx);
}

/* 搜索栏 */

.search-bar {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  color: #777;
  background: #fff;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.07);
  z-index: 3;
  padding: 20rpx 0;
}

.search-bar .arrow {
  width: 20rpx;
  height: 20rpx;
  border-bottom: 2rpx solid #777;
  border-left: 2rpx solid #777;
  transform: rotate(45deg);
  position: absolute;
  left: 30rpx;
  top: 41rpx;
}

.search-bar .search-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60rpx;
  background: #f7f7f7;
  z-index: 999;
  width: 92%;
  border-radius: 50rpx;
  text-align: center;
  margin: auto;
}

.sear-input {
  font-size: 28rpx;
}

.search-bar .search-hint {
  font-size: 28rpx;
  position: absolute;
  right: 30rpx;
  top: 32rpx;
}

.search-bar .search-box .search-img {
  width: 32rpx;
  height: 32rpx;
  margin-right: 10rpx;
}

/* 左侧菜单栏 */

.leftmenu {
  box-sizing: border-box;
  // background-color: #f5f6f7;
  background: #fff;
  overflow: scroll;
  z-index: 999;
}

.menu-item {
  line-height: 70rpx;
  height: 70rpx;
  text-align: center;
  border-bottom: 2rpx silid #e3e3e3;
  position: relative;
  color: #777;
  font-size: 28rpx;
}

.menu-item.active {
  color: #39d48f;
  font-size: 28rpx;
  font-weight: bold;
  position: relative;
  background: #fff;
}

.menu-item.active:before {
  position: absolute;
  left: 0;
  content: '';
  width: 8rpx;
  height: 32rpx;
  top: 29rpx;
  background: #39d48f;
}

.menu-item text.tips-num {
  position: absolute;
  top: 20rpx;
  right: 15rpx;
  border-radius: 15rpx;
  width: 30rpx;
  height: 30rpx;
  background: red;
  color: #fff;
  font-size: 25rpx;
  line-height: 30rpx;
}

/* 右侧商品栏 */

.rightcontent {
  width: 600rpx;
  // height: 100%;
  box-sizing: border-box;
  background-color: #fff;
  margin: 40rpx auto;
}

.rightcontent .adver-map {
  width: auto;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  margin: 0rpx 20rpx 0;
}

.rightcontent .adver-map .item-a {
  display: block;
  font-size: 0;
  width: 100%;
  // height: 260rpx;
}

.rightcontent .adver-map .item-a image {
  max-width: 100%;
  // height: 260rpx;
}

.rightcontent .cont-item {
  // padding: 0 20rpx 20rpx 20rpx;
  padding-bottom: 94rpx;
}

.rightcontent .cont-item .show-item .more-prod-pic {
  text-align: center;
  width: 150rpx;
  height: 150rpx;
  line-height: 150rpx;
  font-size: 0;
}

.rightcontent .cont-item .show-item .more-prod-pic .more-pic {
  max-width: 100%;
  max-height: 100%;
  border-radius: 8rpx;
  vertical-align: middle;
}

.rightcontent .cont-item .show-item {
  position: relative;
  display: flex;
  justify-content: start;
  padding: 20rpx 0;
}

.rightcontent .cont-item .show-item::after {
  content: '';
  background-color: #f4f4f4;
  left: 0;
  height: 1px;
  transform-origin: 50% 100% 0;
  bottom: 0;
  position: absolute;
  display: block;
  width: 510rpx;
  padding-left: 20rpx;
}

.rightcontent .cont-item .show-item .prod-text-right {
  // margin-left: 20rpx;
  width: 75%;
}

.rightcontent .cont-item .show-item .prod-text-right .cate-prod-info {
  font-size: 22rpx;
  color: #999;
  margin: 10rpx 0 20rpx 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.rightcontent .cont-item .show-item .prod-text-right .prod-text.more {
  margin: 0;
  font-size: 28rpx;
  display: -webkit-box;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  color: #000;
}

.rightcontent .cont-item .show-item .prod-text-right .prod-price.more {
  font-size: 28rpx;
  color: #eb2444;
  font-family: arial;
}

/* 空 */
.cont-item.empty {
  display: block;
  font-size: 24rpx;
  padding-top: 400rpx;
  color: #aaa;
  text-align: center;
}

// .leftmenu .ca-empty {
//   padding-top: 400rpx;
//   text-align: center;
//   color: #aaa;
//   font-size: 24rpx;
// }

.noticebar {
  font-size: 26rpx;
  // margin-bottom: 20rpx;
  margin-left: 116rpx;

  .noticebar-name {
    display: flex;
    align-items: center;
    color: #808080;
    font-size: 24rpx;
    text-align: right;
    font-weight: bold;
    margin-top: 10rpx;
    // margin-right: 15rpx;
  }

  .more {
    display: flex;
    align-items: center;
    // color: silver;
    font-size: 26rpx;
  }
}

/deep/.u-notice-bar {
  width: 400rpx;
  background: #fff !important;
  padding: 0 !important;

  /deep/.u-icon__icon {
    color: #333 !important;
  }
}

// .box {
//   // width: 100%
//   background-color: #39d48f;
//   height: 100%;
//   // background-color: #1ed098;
//   padding: 30rpx;
//   padding-bottom: 140rpx;
// }

.body {
  width: 687rpx;
  margin: 10rpx auto;
  background-color: #fff;
  height: 100%;
  border-radius: 20rpx;
  padding: 40rpx;
}

.line {
  width: 622rpx;
  height: 1rpx;
  background: #e6e6e6;
  margin: 0 auto;
}

.top {
  display: flex;
  justify-content: space-between;
  margin: 30rpx 0;
  align-items: center;

  .myIntegral {
    // width: 108rpx;
    // height: 47rpx;
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;

    .points {
      font-size: 73rpx;
      color: #39d48f;
    }
  }

  .integralRank {
    margin-top: 45rpx;
    height: 22rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #808080;
  }

  .img {
    image {
      width: 230rpx;
    }
  }
}

.bottom {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .item {
    margin-top: 40rpx;
    width: 280rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // align-items: center;

    .img {
      image {
        width: 280rpx;
        height: 280rpx;
      }
    }

    .name {
      // width: 79rpx;
      margin-top: 18rpx;
      height: 27rpx;
      font-size: 32rpx;
      font-family: PingFang SC;
      font-weight: 550;
      color: #333333;
    }

    .integral {
      // width: 71rpx;
      margin-top: 25rpx;
      height: 24rpx;
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #808080;
    }
  }
}

.shoppingTitle {
  text-align: left;
}
</style>
