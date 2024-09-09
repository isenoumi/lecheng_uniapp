<template>
  <navbar :safeAreaInsetTop="true" titleWidth="200rpx" placeholder height="55" leftIconColor="#fff" :hasImage="hasImage"
    :imageSrc="imageSrc" :allTitle="allTitle" :autoBack="false">
    <view :style="{'max-width':maxWidth}" class="u-nav-slots" slot="left">
      <u-icon class="arrow-left" size="20" name="arrow-left" :color="locationColor" @click.stop="leftClick">
      </u-icon>
      <!-- <view class="location u-p-l u-p-r" @click.stop="goLocation">
                <u--text :lines="1" :text="locationText" :color="locationColor"></u--text>
                <u-icon class="icon" name="arrow-down" :color="locationColor"></u-icon>
            </view> -->


    </view>
    <view class="u-nav-slots" slot="center">
      <u--text :text="title" :color="locationColor"></u--text>
    </view>
  </navbar>
</template>

<script>
  import {
    mapState
  } from 'vuex'

  export default {
    props: {
      title: {
        default: '',
        type: String
      },
      maxWidth: {
        default: 'auto',
        type: String
      },
      hasImage: {
        type: Boolean,
        default: true
      },
      imageSrc: {
        type: String,
        default: 'http://cdn.cestech.com.cn/BkpKnowledge/img/7dad06034e0d481e8b0bae9356184972.png'
      },
      allTitle: {
        type: Boolean,
        default: true
      },
      locationColor: {
        default: '#fff',
        type: String
      }
    },

    data() {
      return {


      }
    },
    computed: {
      ...mapState({
        location: state => state.location,
        customer: state => state.customer,
      }),

      locationText() {
        if (this.location && this.location != null) {
          return this.location.simple.join(',')
        }
        if (this.customer && this.customer.hasOwnProperty('name')) {
          return this.customer.name
        }
        return '选择定位'
      }
    },
    onLoad() {

    },
    methods: {
      // 点击左侧区域
      leftClick() {
        // 如果配置了autoBack，自动返回上一页

        uni.navigateBack()

      },
      goLocation() {
        uni.navigateTo({
          url: '/pages/index/city'
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .status_bar {
    height: var(--status-bar-height);
    width: 100%;
  }

  .u-nav-slots {
    height: 100%;
    display: inline-flex;
    align-items: center;

    .arrow-left {
      margin-right: 5px;
    }

    .location {
      padding: 0 20rpx;
      width: auto;
      height: 70%;
      display: inline-flex;
      align-items: center;

      // border-radius: 100px;
      // background-color: $u-info-light;
      // border-width: 1px;
      // border-color: $u-info-light;


      .icon {
        margin-left: 5px;
      }

    }


  }
</style>