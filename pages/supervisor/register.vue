<template>
  <view class="content">
    <u-loading-page :loading="pageLoading"></u-loading-page>
    <view v-if="!pageLoading" class="u-p">
      <view class="margin-top-lg">
        <bindinfoform
          @success="submit"
          :detail="detail"
          :ids="id"
          ref="bindinfoform">
        </bindinfoform>
      </view>
    </view>
  </view>
</template>

<script>
import { supervisoruserbindinfo, taskone, taskaccept } from '@/common/api.js'
import { mapState } from 'vuex'
import bindinfoform from './components/bindinfo.vue'

export default {
  components: {
    bindinfoform,
  },
  data() {
    return {
      globalData: getApp().globalData,
      id: null,
      pageLoading: true,
      detail: {
        id: null,
        title: '',
        status: '',
        region: null,
        floor: [],
        community: null,
        communityId: '',
      },
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
    }),
  },

  onLoad(option) {
    // TODO 扫描二维码
    const scene = decodeURIComponent(option.scene)
    console.log(scene, '扫码')
    if (scene != 'undefined') {
      this.id = scene
      uni.setStorageSync('communityId', this.id)
      this.communityId = uni.getStorageSync('communityId')
      this.getDetail()
      // uni.setStorageSync("loginFlag", 'byActivity')
      // uni.setStorageSync("scene", scene)

      // let openid = uni.getStorageSync('openid')
      // uni.request({
      //   url: `https://gh.api.cestech.com.cn:8240/mission_gh/xcx_api/bkbAppUser/addPoints?points=${this.points}&openid=${openid}`,

      //   method: "GET",
      //   success: (res) => {}
      // })
    } else {
      if (option.id) {
        this.id = option.id
        uni.setStorageSync('communityId', option.id)
        this.communityId = option.communityId
        this.getDetail()
      } else {
        // uni.$u.route({
        //   type: 'navigateBack'
        // })
      }
    }
  },

  methods: {
    getDetail() {
      console.log(this.communityId)
      uni.request({
        url: 'https://gh.api.cestech.com.cn:8240/mission_gh/v1/supervisor/dist/task/list',
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
          //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
        },
        data: {
          communityId: this.communityId,
        },
        method: 'GET',
        success: res => {
          console.log(res, '小区')
          this.pageLoading = false
          this.detail = res.data.result
        },
      })
    },
    submit(params) {
      console.log(params, 'params')
      // this.goNext(params);
      uni.navigateTo({
        url: '/pages/education/detail',
      })
    },
    goNext(eid) {
      uni.$u.route({
        url: 'pages/education/detail',
        params: {
          id: eid.taskId,
          customer_id: 0,
          sup: 1,
        },
      })
    },
    goBack() {
      uni.navigateBack({
        delta: 1,
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
