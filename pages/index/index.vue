<template>
  <view>
    <view class="u-nav">
      <navbar :safeAreaInsetTop="true" height="55" placeholder>
        <view class="u-nav-slot" slot="left">
          <u--text text="乐诚城管" color="#fff"></u--text>
        </view>
      </navbar>
    </view>
    <view class="conetent-body">
      <u-swiper :list="swiperList" keyName="url" previousMargin="30" nextMargin="30" circular radius="5"
        @click="swiperClick" bgColor="#ffffff" @change="swiperChange">
      </u-swiper>
      <view class="indicators u-flex">
        <view class="indicators__dot" v-for="(item, index) in swiperList" :key="index"
          :class="[index === current && 'indicators__dot--active']">
        </view>
      </view>
      <u-gap bgColor="transparent" height="15"></u-gap>
      <!-- TODO index icon -->
      <view style="margin: 0 30rpx">
        <u-grid :border="false" col="5">
          <u-grid-item v-for="(listItem, listIndex) in menuList" :key="listIndex"
            @click.stop="gridClick(listItem, listIndex)">
            <u--image mode="aspectFit" :showLoading="true" :src="listItem.url" width="110px" height="70px">
            </u--image>
            <view style="margin-top: -50rpx">
              <u--text align="center" :text="listItem.title"></u--text>
            </view>
          </u-grid-item>
        </u-grid>
      </view>

      <!-- 	<u-grid :border="false" col="3">
				<u-grid-item v-for="(listItem,listIndex) in menuList" :key="listIndex"
					@click.stop="gridClick(listItem,listIndex)">
			
					<u--image mode="aspectFit" :showLoading="true" :src="listItem.url" width="200px" height="80px">
					</u--image>
			
					<u--text align="center" bold :text="listItem.title"></u--text>
				</u-grid-item>
			</u-grid> -->

      <view class="serveBox">
        <view class="titleBox">
          <view class="titleLeft"> 便民服务查询 </view>
          <view class="titleRight" @click="toDeclare">
            <image src="https://oms.cestech.com.cn/BkpKnowledge/img/3f95d28444ab4c3c847e874713db4635/首页.png"
              mode="scaleToFill" style="width: 160rpx; height: 60rpx" />
          </view>
        </view>
        <u-grid :border="false" col="5">
          <u-grid-item style="margin-top: 20rpx" v-for="(listItem, listIndex) in serveList" :key="listIndex"
            @click.stop="toConvenientservices(listItem, listIndex)">
            <u--image mode="aspectFit" :showLoading="true" :src="listItem.url" width="110px" height="45px">
            </u--image>

            <u--text align="center" :text="listItem.title"></u--text>
          </u-grid-item>
        </u-grid>
      </view>

      <!-- <view class="application-bottom" v-if="isShow">
        <view class="li" @click="activity_customized">
          <view>
            <image
              src="http://cdn.cestech.com.cn/BkpKnowledge/img/9ddfbdf38be147cbb1c05ffb415e1ecc.png"
              style="width: 338.27rpx; height: 199.73rpx"
              mode="aspectFill"></image>
          </view>
        </view>
        <view class="li" @click="teacher_reservation">
          <view>
            <image
              src="http://cdn.cestech.com.cn/BkpKnowledge/img/3b4a4eec22f54e5298a784a44fda1353.png"
              style="width: 338.27rpx; height: 199.73rpx"
              mode="aspectFill"></image>
          </view>
        </view>
      </view> -->
      <!-- <view class="u-flex u-p kc">
        <view class="u-flex-1 kc-left">
          <image
            @click="goCourse"
            style="width: 100%; height: 100%"
            mode="aspectFit"
            :src="`${staticUrl}static/door.png`">
          </image>
        </view>
        <view class="u-flex-1 u-m-l kc-right u-flex-col">
          <view
            class="u-flex-col u-flex-1 kc-right__item"
            v-for="(item, index) in list1"
            :key="item.id"
            @click="goknowledgedetail(item)">
            <view class="z-card">
              <view class="z-card__title">
                <u--text lines="2" bold :text="item.title"></u--text>
              </view>

              <view class="z-card__info z-card__info-ss">
                <view class="z-card__info--left">
                  <u--text
                    size="13"
                    prefixIcon="/static/assets/home/hot.png"
                    lines="1"
                    type="info"
                    :iconStyle="{
                      'margin-right': '5px',
                    }"
                    :text="item.type"></u--text>
                </view>
                <view class="z-card__jf">
                  <view class="z-card__jf-left">
                    <image
                      style="width: 40rpx; height: 40rpx; margin-right: 8rpx"
                      src="@/static/assets/center/ck.png"
                      mode="scaleToFill"></image>
                    9999+
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view> -->
      <view style="padding: 30rpx; margin-top: -60rpx">
        <view class="work"> 工作动态 </view>
        <view class="z-card2" v-for="(item, index) in list2" :key="item.id" @click="goknowledgedetail(item)">
          <view class="z-card__content">
            <view class="z-card__image">
              <u--image :showLoading="true" :src="item.url" width="110px" height="80px" radius="8">
              </u--image>
            </view>
            <view class="z-card__info">
              <view class="z-card__info--title" style="
                  height: 80px;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                ">
                <view>
                  <u--text :lines="2" bold :text="item.title || ''"></u--text>
                </view>
                <view style="height: 40rpx">
                  <u--text :lines="1" color="#C5C5C5" :text="item.createTime || ''">
                  </u--text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'
  import {
    mapState
  } from 'vuex'
  import knowledgeCard from './components/knowledge-card.vue'
  import locationNavbar from './components/location-navbar.vue'
  import navbar from '@/components/navbar.vue'
  import {
    culturalistbycustomer,
    homeknowledge
  } from '@/common/api.js'
  import {
    showConfirm,
    preloadImage
  } from '@/util/common'
  export default {
    components: {
      navbar,
      knowledgeCard,
      locationNavbar,
    },
    mixins: [ZPMixin],
    data() {
      return {
        staticUrl: getApp().globalData.staticUrl,
        menuList: getApp().globalData.index.menuList,
        current: 0,
        swiperList: getApp().globalData.index.swiperList,
        list1: getApp().globalData.index.list1,
        list2: getApp().globalData.index.list2,
        isShow: true,
        serveList: [{
            id: '1559063181911056386',
            url: '/static/assets/index/蒙版组 15.png',
            title: '停车场',
            type: 'PARKING_LOT',
          },
          {
            id: '1559063181911056386',
            url: '/static/assets/index/蒙版组 11.png',
            title: '充电桩',
            type: 'CHARGING_PILES',
          },
          {
            id: '1559063685168816129',
            url: '/static/assets/index/蒙版组 16.png',
            title: '公共厕所',
            type: 'PUBLIC_TOILETS',
          },
          {
            id: '1559063181911056386',
            url: '/static/assets/index/蒙版组 19.png',
            title: '乐诚驿站',
            type: 'LOVE_STATION',
          },
          {
            id: '1559063181911056386',
            url: '/static/assets/index/蒙版组 18.png',
            title: '潮汐市场',
            type: 'MORNING_AND_NIGHT_MARKETS',
          },
          {
            id: '1559063685168816129',
            url: '/static/assets/index/蒙版组 12.png',
            title: '便民收运',
            type: 'CONVENIENT_TRANSPORTATION',
          },
          {
            id: '1559063685168816129',
            url: '/static/assets/index/蒙版组 17.png',
            title: '家政服务',
            type: 'HOUSEKEEPING',
          },

          {
            id: '1559063685168816129',
            url: '/static/assets/index/蒙版组 10.png',
            title: '开锁换锁',
            type: 'UNLOCK_AND_CHANGE_LOCKS',
          },

          {
            id: '1559063181911056386',
            url: '/static/assets/index/蒙版组 13.png',
            title: '管道疏通',
            type: 'CONVENIENCE_STALLS',
          },
          {
            id: '1559063181911056386',
            url: '/static/assets/index/蒙版组 14.png',
            title: '修鞋缝补',
            type: 'SHOE_REPAIR',
          },
        ],
      }
    },
    computed: {
      ...mapState({
        location: state => state.location,
        customer: state => state.customer,
      }),

      region() {
        if (this.location) {
          return this.location.region
        }
        return ''
      },
    },
    watch: {},
    onShow() {
      this.updateWeChat()
    },
    onLoad() {
      this.isShow = uni.getStorageSync('users')?.registrationMethod == 1
      const image = {
        quanming: 'https://oms.cestech.com.cn/BkpKnowledge/img/2d78ba0f982349219bf2ed067042708f/全民参与.png',
        quanmingTop: 'https://oms.cestech.com.cn/BkpKnowledge/img/33485db1ccbc4a04919e32b26b43ae3e/组 6761.png',
        activity: 'https://oms.cestech.com.cn/BkpKnowledge/img/c2e8d9d2645848a1bb40912375d5ee95/组+6775@2x.png',
        answer: 'https://oms.cestech.com.cn/BkpKnowledge/img/651259940d404035a8fee06b4f01ebb1/3.png',
        questionnaire: 'https://oms.cestech.com.cn/BkpKnowledge/img/c920fdede94545219e5f07c4d4ff1175/组+6773@2x.png',
      }
      preloadImage(image)
    },
    methods: {
      updateWeChat() {
        const updateManager = uni.getUpdateManager()

        updateManager.onCheckForUpdate(function(res) {
          // 请求完新版本信息的回调
          console.log('res.hasUpdate', res.hasUpdate)
        })

        updateManager.onUpdateReady(function(res) {
          uni.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success(res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              }
            },
          })
        })

        updateManager.onUpdateFailed(function(res) {
          // 新的版本下载失败
        })
      },
      toLoginPage() {
        if (!uni.getStorageSync('xtoken')) {
          showConfirm('当前用户未登录, 请重新登录?').then(res => {
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
      questionnaire() {
        if (this.toLoginPage())
          uni.navigateTo({
            url: '/pageB/questionnaire/index',
          })
      },
      toCheck() {
        if (this.toLoginPage())
          uni.navigateTo({
            url: '/pageA/signIn/signIn',
          })
      },
      activity_customized() {
        if (this.toLoginPage())
          uni.navigateTo({
            url: '/pageB/activitycustomized/index',
          })
      },
      teacher_reservation() {
        if (this.toLoginPage())
          uni.navigateTo({
            url: '/pageB/appointmenteacher/index',
          })
      },
      my_reservation() {
        if (this.toLoginPage())
          uni.navigateTo({
            url: '/pageB/myreservation/index',
          })
      },
      toDeclare() {
        if (this.toLoginPage())
          uni.navigateTo({
            url: '/pageB/declare/index',
          })
      },
      swiperChange(index) {
        this.current = index.current
      },
      toConvenientservices(item, index) {
        if (item.type == 'LOVE_STATION') {
          uni.navigateToMiniProgram({
            appId: 'wxcf04f4a9e18f5974',
            path: 'pages/index/index?',
            extraData: {
              'data1': 'test'
            },
            success(res) {
              // 打开成功
            }
          })
          return
        }
        if (this.toLoginPage())
          uni.navigateTo({
            url: '/pageC/convenientServices/index?type=' + item.type,
          })
      },
      gridClick(item, index) {
        if (this.toLoginPage()) {
          if (item?.route) {
            // uni.$u.route({
            //   url: item.route,
            // })
            uni.navigateTo({
              url: item.route
            })
            return
          }
          if (item.children.length > 0) {
            uni.$u.route({
              url: 'pageC/knowledge/index',
              params: {
                index: index,
                item: JSON.stringify(item),
              },
            })
          } else {
            uni.$u.route({
              url: 'pageC/knowledge/list',
              params: {
                type: item.id,
                title: item.title,
              },
            })
          }
        }
      },
      swiperClick(index, e) {
        if (this.toLoginPage()) {
          if (this.swiperList[index].route) {
            uni.navigateTo({
              url: this.swiperList[index].route
            })
          }
        }
        return
        uni.$u.route({
          url: 'pageC/knowledge/detail',
          params: {
            id: this.swiperList[index].id,
          },
        })
      },
      goknowledgedetail(item) {
        if (this.toLoginPage())
          uni.$u.route({
            url: 'pageC/knowledge/detail',
            params: {
              id: item.id,
            },
          })
      },
      goCourse() {
        if (this.toLoginPage())
          uni.$u.route({
            url: 'pageC/course/list',
          })
      },
    },
  }
</script>
<style>
  page {
    background-color: #f7f7f7;
  }
</style>
<style lang="scss" scoped>
  .application-list {
    width: 750rpx;
    height: 160rpx;
    background: #f5f5f5;
    margin-top: 30rpx;
    margin-bottom: 20rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .li {
      width: 33.33%;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      font-weight: bold;
      word-wrap: normal;
      font-size: 30rpx;
      color: #303133;
    }
  }

  .z-card__info-ss {
    display: flex;
    align-items: center;
  }

  .kc {

    .kc-left,
    .kc-right {
      height: calc(60vw - var(--default-padding));

      .kc-right__item:nth-child(2) {
        margin-top: 10px;
      }
    }
  }

  /deep/.u-grid-item {
    overflow: hidden;
  }

  .z-card__info--desc {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .integral {
      display: flex;
      align-items: center;
      font-size: 24rpx;

      .integral-left,
      .integral-right {
        display: flex;
        align-items: center;
      }
    }
  }

  .z-card__jf {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 24rpx;
    margin: 6rpx 0;

    .z-card__jf-left,
    .z-card__jf-right {
      display: flex;
      align-items: center;
    }

    .z-card__jf-right {}
  }

  .application-bottom {
    display: flex;
    justify-content: space-around;
  }

  .serveBox {
    width: 688rpx;
    height: 416rpx;
    background: #ffffff;
    border-radius: 24rpx 24rpx 24rpx 24rpx;
    margin: 48rpx auto;

    .titleBox {
      display: flex;
      justify-content: space-between;
      padding: 34rpx;

      .titleLeft {
        font-family: PingFang SC, PingFang SC;
        font-weight: bold;
        font-size: 32rpx;
        color: #262c35;
        line-height: 48rpx;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
    }
  }

  .work {
    font-weight: bold;
    font-size: 32rpx;
    color: #262c35;
    line-height: 48rpx;
    margin-bottom: 26rpx;
  }

  .z-card2 {
    margin: 26rpx 0;
  }
</style>