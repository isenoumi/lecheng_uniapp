<template>
  <view>
    <view class="u-p">
      <uni-segmented-control
        :current="subsectionCurrent"
        :values="subsectionList"
        :active-color="globalData.theme['$u-primary']"
        @clickItem="subsectionChange" />
    </view>
    <z-paging
      ref="paging"
      v-model="dataList"
      @query="queryList"
      use-page-scroll>
      <view class="content u-p-l u-p-r">
        <template>
          <activityCard
            v-for="(item, index) in dataList"
            :key="index"
            :item="item">
          </activityCard>
        </template>
      </view>
    </z-paging>
  </view>
</template>

<script>
import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'
import { mapState } from 'vuex'
import activityCard from './components/activity-card.vue'

import {
  speechoractivitymylist,
  speechoractivityendlist,
} from '@/common/api.js'
export default {
  components: {
    activityCard,
  },
  mixins: [ZPMixin],
  data() {
    return {
      globalData: getApp().globalData,
      dataList: [],
      subsectionList: ['待开始', '已完成'],
      subsectionCurrent: 0,
    }
  },
  computed: {},
  watch: {},
  onLoad(option) {
    uni.$on('refreshList', () => {
      this.$refs.paging.reload()
    })
  },
  onUnload() {
    uni.$off('refreshList')
  },
  methods: {
    subsectionChange(e) {
      if (this.subsectionCurrent != e.currentIndex) {
        this.subsectionCurrent = e.currentIndex
        this.$refs.paging.reload()
      }
    },
    queryList(page, list_rows) {
      if (this.subsectionCurrent == 0) {
        uni.request({
          url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbTrainingTask/listGet`,
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
            //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
          },
          data: {
            phone: uni.getStorageSync('phone'),
            status: 4,
            pageNo: page,
            pageSize: list_rows,
          },
          method: 'GET',
          success: res => {
            console.log(res, 'xxxx1')
            this.$refs.paging.complete(res.data.result.records)
          },
        })

        // speechoractivitymylist({
        // 	page: page,
        // 	list_rows: list_rows
        // }).then((res) => {

        // 	this.$refs.paging.complete(res.data.data);
        // }).catch(res => {
        // 	this.$refs.paging.complete(false);
        // })
      } else {
        uni.request({
          url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbTrainingTask/listGet`,
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
            //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
          },
          data: {
            phone: uni.getStorageSync('phone'),
            status: 3,
            pageNo: page,
            pageSize: list_rows,
          },
          method: 'GET',
          success: res => {
            console.log(res, 'xxxx2')
            this.$refs.paging.complete(res.data.result.records)
          },
        })
        // speechoractivityendlist({
        // 	page: page,
        // 	list_rows: list_rows
        // }).then((res) => {

        // 	this.$refs.paging.complete(res.data.data);
        // }).catch(res => {
        // 	this.$refs.paging.complete(false);
        // })
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
