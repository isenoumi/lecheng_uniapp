<template>
  <view class="content">
    <view class="u-nav">
      <navbar
        :safeAreaInsetTop="true"
        placeholder
        height="55"
        leftIconColor="#fff"
        :hasImage="false"
        bgColor="transparent"
        autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text :text="item.title" color="#fff"></u--text>
        </view>
      </navbar>
    </view>
    <image
      style="width: 100%; position: absolute; top: 0rpx; z-index: -99"
      src="http://cdn.cestech.com.cn/BkpKnowledge/img/9a080581b36242a2bd352cede2e00b35.png"
      mode="scaleToFill" />
    <view class="u-p-l u-p-r u-p-b itemBox">
      <view
        class="item"
        v-for="(item, index) in dataList"
        :key="index"
        :item="item"
        @click.native="goknowledgelist(item)">
        <image class="img" :src="item.url"></image>
      </view>
    </view>
  </view>
</template>

<script>
import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'

import { mapState } from 'vuex'
import typeCard from './components/type-card.vue'

import { courselistbycustomer } from '@/common/api.js'
export default {
  components: {
    typeCard,
  },
  mixins: [ZPMixin],
  data() {
    return {
      index: '',
      dataList: [],
      item: {},
    }
  },
  computed: {},
  watch: {},
  onLoad(option) {
    if (option.item) {
      this.item = JSON.parse(option.item)
    }
    if (option.index) {
      this.index = option.index
      this.dataList = getApp().globalData.index.menuList[option.index].children
    } else {
      uni.$u.route({
        type: 'navigateBack',
      })
      return
    }
  },
  onShow() {},
  methods: {
    goknowledgelist(item) {
      uni.$u.route({
        url: 'pageC/knowledge/list',
        params: {
          type: item.id,
          title: item.title,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.itemBox {
  margin-top: 60rpx;
  .item {
    margin: 32rpx auto;
    .img {
      width: 696rpx;
      height: 240rpx;
    }
  }
}
</style>
