<template>
  <view class="content u-p">
    <navbar :safeAreaInsetTop="true" height="55" placeholder leftIconColor="#fff" autoBack>
      <view class="u-nav-slot" slot="center">
        <u--text text="任务详情" color="#fff"></u--text>
      </view>
    </navbar>
    <u-loading-page :loading="pageLoading"></u-loading-page>
    <view v-if="!pageLoading">
      <u--form labelPosition="left" ref="form" labelWidth="80">
        <u-form-item label="任务名称" borderBottom>
          <u--text :text="detail.Task.title" size="15"></u--text>
        </u-form-item>
        <u-form-item label="当前状态" borderBottom>
          <u--text :text="detail.Task.status|statusFilter" size="15"></u--text>
        </u-form-item>
        <u-form-item label="小区名称" borderBottom>
          <u--text :text="detail.community.name||''" size="15"></u--text>
        </u-form-item>
        <u-form-item label="小区楼栋">
        </u-form-item>
        <u-form-item>
          <!-- <view class="tag__content">
            <view class="tag-item" v-for="(item,index) in detail.select_floor_unit_arr">
              <u-tag :text="`${item}`" plain></u-tag>
            </view>

          </view> -->
          <view class="tag__content">
            <view class="tag-item">
              <u-tag :text="`${detail.Task.selectFloorUnitText}`" plain></u-tag>
            </view>

          </view>

        </u-form-item>

      </u--form>

      <view class="margin-top-lg" v-if="detail.Task.status!=3&&detail.Task.status!==''">
        <u-button :disabled="detail.Task.status==3" type="primary" :loading="btnLoading"
          :text="detail.Task.status|btnTextFilter" @click="submit()">
        </u-button>
      </view>

    </view>
  </view>
</template>

<script>
  import {
    taskone,
    taskaccept,
    tasksuccess
  } from '@/common/api.js';

  export default {
    data() {
      return {
        globalData: getApp().globalData,
        btnLoading: false,
        pageLoading: true,
        id: null,
        detail: {
          id: null,
          title: '',
          status: '',
          select_floot_unit_arr: [],
          community: null

        }

      }
    },
    filters: {
      statusFilter(val) {
        if (val == 1) {
          return '待接受'
        } else if (val == 2) {
          return '进行中'
        } else if (val == 3) {
          return '已完成'
        }
        return ''
      },
      btnTextFilter(val) {
        if (val == 1) {
          return '接受任务'
        } else if (val == 2) {
          return '完成'
        } else if (val == 3) {
          return '已完成'
        }
        return '无权限'
      }
    },
    computed: {


    },

    onLoad(option) {
      if (option.id) {
        this.id = option.id
        this.getDetail();
      } else {
        uni.$u.route({
          type: 'navigateBack'

        })
      }

    },
    methods: {
      getDetail() {
        uni.request({
          url: 'https://gh.api.cestech.com.cn:8240/mission_gh/v1/supervisor/task/one',
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
            //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
          },
          data: {
            id: this.id
          },
          method: "GET",
          success: (res) => {
            this.pageLoading = false;
            console.log(res, 'xxxxsssssssssssssssssss')
            if (res.data.result.Task.selectFloorUnitText) {
              res.data.select_floor_unit_arr = res.data.result.Task.selectFloorUnitText.split(
                ',') || []
            } else {
              res.data.select_floor_unit_arr = []
            }

            this.detail = res.data.result
            console.log(this.detail, 'this.detail')
          }

        })

      },
      submit() {

        const that = this;
        const params = {
          id: this.detail.id,

        }
        if (this.detail.Task.status == 1) {
          uni.showModal({
            title: '提示',
            content: '是否确定接受此任务',
            success: function(res) {
              if (res.confirm) {


                that.btnLoading = true;
                uni.request({
                  url: 'https://gh.api.cestech.com.cn:8240/mission_gh/v1/supervisor/task/accept',
                  header: {
                    'x-Resource-Token': uni.getStorageSync('xtoken'),
                    //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
                  },
                  data: {
                    id: that.id
                  },
                  method: "GET",
                  success: (res) => {
                    uni.showToast({
                      title: '已接受任务',
                      icon: 'success',
                    });

                    that.detail.status = res.data.result.status
                    uni.$emit("taskAccept", res.data.result)
                    that.btnLoading = false;
                    setTimeout(() => {
                      uni.navigateBack()
                    }, 1000)
                  }

                })

              }
            }
          });

        } else if (this.detail.Task.status == 2) {
          uni.showModal({
            title: '提示',
            content: '是否确定完成此任务',
            success: function(res) {
              if (res.confirm) {
                that.btnLoading = true;

                uni.request({
                  url: 'https://gh.api.cestech.com.cn:8240/mission_gh/v1/supervisor/task/success',
                  header: {
                    'x-Resource-Token': uni.getStorageSync('xtoken'),
                    //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
                  },
                  data: {
                    id: that.id
                  },
                  method: "GET",
                  success: (res) => {
                    uni.showToast({
                      title: '已完成任务',
                      icon: 'success',
                    });

                    that.detail.status = res.data.result.status
                    console.log(that.detail.status, res.data.result.status,
                      'xxxxxxxxxxxxxxx')
                    that.btnLoading = false;
                    uni.$emit("taskAccept", res.data.result)
                    setTimeout(() => {
                      uni.navigateBack()
                    }, 1000)
                  }

                })
              }
            }
          });

        }


      },

    }
  }
</script>

<style lang="scss" scoped>
  .tag__content {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;


    .tag-item {
      margin: 15rpx;
      display: inline-flex;
    }
  }
</style>