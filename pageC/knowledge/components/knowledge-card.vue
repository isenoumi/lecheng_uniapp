<template>
  <view class="z-card3">
    <view class="z-card__content">
      <view class="z-card__image">
        <u--image
          :showLoading="true"
          :src="item[0].bgurl"
          mode="aspectFit"
          width="100%"
          height="80px"
          radius="8">
        </u--image>
      </view>
      <view class="z-card__info">
        <view class="z-card__info--title">
          <u--text :lines="2" bold :text="item[0].title || ''"></u--text>
        </view>
        <view class="z-card__info--desc">
          <view class="z-card__info--desc--left">
            <u--text type="info" size="13" :text="item[0].createTime">
            </u--text>
          </view>
        </view>
        <!-- <view class="z-card__jf">
          <view class="z-card__jf-left">
            <image
              style="width: 40rpx; height: 40rpx; margin-right: 8rpx"
              src="@/static/assets/center/ck.png"
              mode="scaleToFill"></image>
            <text>{{ item[0].status }}</text>
          </view>
          <view class="z-card__jf-right">
            <image
              style="width: 28rpx; height: 28rpx; margin-right: 8rpx"
              src="@/static/assets/center/5.png"
              mode="scaleToFill"></image>
            {{ item[0].points }}
          </view>
        </view> -->
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    item: {
      default: null,
      type: Object,
    },
  },
  data() {
    return {}
  },
  computed: {},
  onLoad() {
    // console.log(this.item, '00000')
  },
  methods: {},
}
</script>

<style scoped lang="scss">
.cu-card {
  height: 100px;
}

.image {
  width: 250rpx;
  height: 100%;
}

.z-card__jf {
  display: flex;
  align-items: center;

  font-size: 24rpx;
  margin: 6rpx 0;

  .z-card__jf-left,
  .z-card__jf-right {
    display: flex;
    align-items: center;
  }

  .z-card__jf-right {
    margin-left: 40rpx;
  }
}
</style>
