<!-- 查看视频 -->
<template>
  <view class="container">
    <u-loading-page :loading="pageLoading"></u-loading-page>
    <view v-if="!pageLoading">
      <image :src="detail.bkbTrainingProgram.coverUrl" mode="aspectFill" style="width: 750rpx;height: 400rpx;">
      </image>
      <view class="title-details">培训详情</view>
      <view class="z-form-text u-p">
        <view class="z-form-item">
          <view class="z-form-item__body">
            <view class="z-form-item__body__left">
              <u--text text="培训标题:"></u--text>
            </view>
            <view class="z-form-item__body__right">
              <u--text wordWrap="anywhere" :text="detail.bkbTrainingProgram.title">
              </u--text>

            </view>
          </view>
          <u-line color="rgb(214, 215, 217)"></u-line>
        </view>


        <!-- <view class="z-form-item">
                    <view class="z-form-item__body">
                        <view class="z-form-item__body__left">
                            <u--text text="活动类型:"></u--text>
                        </view>
                        <view class="z-form-item__body__right">
                            <u--text wordWrap="anywhere" :text="detail.type|activityTypeText">
                            </u--text>

                        </view>
                    </view>
                    <u-line color="rgb(214, 215, 217)"></u-line>
                </view> -->

        <view class="z-form-item">
          <view class="z-form-item__body">
            <view class="z-form-item__body__left">
              <u--text text="开始时间:"></u--text>
            </view>
            <view class="z-form-item__body__right">
              <u--text wordWrap="anywhere" :text="detail.bkbTrainingProgram.startDate">
              </u--text>

            </view>
          </view>
          <u-line color="rgb(214, 215, 217)"></u-line>
        </view>

        <view class="z-form-item">
          <view class="z-form-item__body">
            <view class="z-form-item__body__left">
              <u--text text="活动时长:"></u--text>
            </view>
            <view class="z-form-item__body__right">
              <u--text wordWrap="anywhere" :text="detail.bkbTrainingProgram.duration">
              </u--text>

            </view>
          </view>
          <u-line color="rgb(214, 215, 217)"></u-line>
        </view>

        <view class="z-form-item">
          <view class="z-form-item__body">
            <view class="z-form-item__body__left">
              <u--text text="演讲员:"></u--text>
            </view>
            <view class="z-form-item__body__right">
              <!-- <u--text wordWrap="anywhere" :text="detail.speaker? detail.speaker.name:''">
                            </u--text> -->
              <u--text wordWrap="anywhere" :text="detail.speaker">
              </u--text>

            </view>
          </view>
          <u-line color="rgb(214, 215, 217)"></u-line>
        </view>

        <view class="z-form-item">
          <view class="z-form-item__body">
            <view class="z-form-item__body__left">
              <u--text text="培训地址:"></u--text>
            </view>
            <view class="z-form-item__body__right">
              <u--text wordWrap="anywhere" :text="detail.bkbTrainingProgram.addr">
              </u--text>

            </view>
          </view>
          <u-line color="rgb(214, 215, 217)"></u-line>
        </view>
        <view class="z-form-item">
          <view class="z-form-item__body">
            <view class="z-form-item__body__left">
              <u--text text="获得积分:"></u--text>
            </view>
            <view class="z-form-item__body__right">
              <u--text wordWrap="anywhere" :text="detail.bkbTrainingProgram.integral">
              </u--text>

            </view>
          </view>
          <u-line color="rgb(214, 215, 217)"></u-line>
        </view>
        <view class="z-form-item">
          <view class="z-form-item__body_col">
            <view class="z-form-item__body__top">
              <u--text text="培训内容:"></u--text>
            </view>
            <view class="z-form-item__body__right">
              <u--text wordWrap="anywhere" :text="detail.bkbTrainingProgram.content">
              </u--text>

            </view>
          </view>
        </view>
      </view>
    </view>
  </view>


  </view>
</template>

<script>
  import {
    activityone
  } from '@/common/api.js'


  export default {
    components: {

    },
    data() {
      return {
        pageLoading: true,
        globalData: getApp().globalData,
        id: null,
        detail: {
          name_of_activity: '',
          type: '',
          create_time: '',
          start_date: '',


        }
      }
    },
    onLoad(option) {
      if (option.id) {
        this.id = option.id
        this.getDetail();
      } else {
        uni.$u.route({
          type: 'navigateBack'

        })
        return
      }

    },
    onUnload() {

    },
    computed: {},

    methods: {
      getDetail() {
        this.pageLoading = true;
        uni.request({
          url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbTrainingCourseReservation/look`,
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),

          },
          data: {
            id: this.id,
          },
          method: "GET",
          success: (res) => {
            let url = 'https://gh.api.cestech.com.cn:8240/mission_gh/sys/common/static/'
            this.pageLoading = false;
            console.log(res.data.result, 'xxx')
            // res.data.result.bkbTrainingProgram.coverUrl=url+res.data.result.bkbTrainingProgram.coverUrl
            this.detail = res.data.result
          }
        })
        // activityone({
        //     id: this.id
        // }).then((res) => {
        //     this.detail = res.data
        //     this.pageLoading = false;

        // })

      },

    }
  }
</script>

</style>
<style lang="scss" scoped>
  page {
    background-color: #fff;
  }

  .title-details {
    font-size: 30rpx;
    font-weight: 550;
    padding-left: 22rpx;
    margin-top: 15rpx;
  }
</style>