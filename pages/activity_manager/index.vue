<template>
  <view>

    <view class="u-p">
      <uni-segmented-control :current="subsectionCurrent" :values="subsectionList"
        :active-color="globalData.theme['$u-primary']" @clickItem="subsectionChange" />
    </view>
    <z-paging ref="paging" v-model="dataList" @query="myQueryList" use-page-scroll>
      <view class="content u-p-l u-p-r">
        <template>
          <activityCard v-for="(item, index) in dataList" :key="index" :item="item">
          </activityCard>
        </template>
      </view>

    </z-paging>

  </view>

</template>

<script>
  import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'
  import {
    mapState
  } from 'vuex'
  import activityCard from './components/activity-card.vue'

  import {
    speechoractivitymylist,
    speechoractivityendlist
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
        subsectionList: ['线下活动任务', '完成的活动'],
        subsectionCurrent: 0,

      }
    },
    computed: {


    },
    watch: {

    },
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
          this.subsectionCurrent = e.currentIndex;
          this.$refs.paging.reload()
        }

      },
      queryList(page, list_rows) {
        if (this.subsectionCurrent == 0) {
          console.log('aaa');
          speechoractivitymylist({
            page: page,
            list_rows: list_rows
          }).then((res) => {
            console.log(res, 'aaa');
            this.$refs.paging.complete(res.data.data);
          }).catch(res => {
            this.$refs.paging.complete(false);
          })
        } else {
          speechoractivityendlist({
            page: page,
            list_rows: list_rows
          }).then((res) => {
            console.log(res, 'bbb');
            this.$refs.paging.complete(res.data.data);
          }).catch(res => {
            this.$refs.paging.complete(false);
          })
        }



      },
      myQueryList(page, list_rows) {
        let isFinished = false
        if (this.subsectionCurrent == 0) {
          isFinished = true
        }
        uni.request({
          url: 'https://gh.api.cestech.com.cn:8240/mission_gh/v1/2/speechor/activity/mylist',
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
            //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
          },
          data: {
            pageNo: page,
            pageSize: list_rows,
            phone: uni.getStorageSync('phone'),
            isFinished,
          },
          method: "GET",
          success: (res) => {
            console.log(res.data.result.records, 'xxxx')
            this.$refs.paging.complete(res.data.result.records);

          }

        })
      }

    }
  }
</script>

<style lang="scss" scoped>

</style>