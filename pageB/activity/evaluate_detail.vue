<!-- 查看视频 -->
<template>
  <view class="container">
    <u-loading-page :loading="pageLoading"></u-loading-page>
    <view v-if="!pageLoading">
      <view class="z-form-text u-p">
        <view class="z-form-item">
          <view class="z-form-item__body">
            <view class="z-form-item__body__left">
              <u--text text="演讲员:"></u--text>
            </view>
            <view class="z-form-item__body__right">
              <u--text wordWrap="anywhere" :text="detail.name">
              </u--text>

            </view>
          </view>
          <u-line color="rgb(214, 215, 217)"></u-line>
        </view>
        <view class="z-form-item">
          <view class="z-form-item__body">
            <view class="z-form-item__body__left">
              <u--text text="演讲时长:"></u--text>
            </view>
            <view class="z-form-item__body__right">
              <u--text wordWrap="anywhere" :text="detail.time">
              </u--text>

            </view>
          </view>
          <u-line color="rgb(214, 215, 217)"></u-line>
        </view>


        <view class="z-form-item ">
          <view class="z-form-item__body_col">
            <view class="z-form-item__body__left">
              <u--text text="我的评价:"></u--text>
            </view>
            <view class="title u-flex u-p" v-if="detail.bkbNewComments">
              <u-avatar size="40" :src="detail.bkbNewComments.userAvatar">
              </u-avatar>
              <view class="u-p-l">
                <u--text align="center" size="15" :text="detail.bkbNewComments.userName"></u--text>
              </view>
            </view>
            <view class="z-form-item__body__right">

              <view class="content rate u-p" v-if="detail.bkbNewComments">
                <view class="item u-p-b ">
                  <u--text text="1、活动效果如何（1-5分)"></u--text>
                  <view class="value">
                    <u--text type="info" :text="`${detail.bkbNewComments.grade1}分`"></u--text>
                  </view>


                </view>

                <view class="item u-p-b">
                  <u--text text="2、本次活动是否有用（1-5分）"></u--text>
                  <view class="value">
                    <u--text type="info" :text="`${detail.bkbNewComments.grade2}分`"></u--text>
                  </view>
                </view>
                <view class="item u-p-b">
                  <u--text text="3、讲师是否表达清晰（1-5分）"></u--text>
                  <view class="value">
                    <u--text type="info" :text="`${detail.bkbNewComments.grade3}分`"></u--text>
                  </view>
                </view>
                <view class="item u-p-b">
                  <u--text text="4、其他建议"></u--text>
                  <view class="value">
                    <u--text type="info" :text="`${detail.bkbNewComments.comment}`"></u--text>

                  </view>
                </view>

              </view>


              <view class="content u-flex u-row-center" v-else>
                <u-empty mode="comment" icon="https://cdn.uviewui.com/uview/empty/comment.png" text="暂无评价">
                </u-empty>
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
  import {
    activityone,
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
          the_activity_time: '',
          create_time: '',
          start_date: '',
          comment: null,

        }
      }
    },
    onLoad(option) {
      if (option.id) {
        this.id = option.id
        this.getDetail();
      } else {
        uni.$u.route({
          type: 'navigateBack',
          delta: 1

        })
        return
      }

    },
    onUnload() {

    },
    computed: {},

    methods: {


      getDetail() {

        uni.request({
          url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbTrainingCourseReservation/selectResult`,
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
            //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
          },
          data: {
            id: this.id,
            // userId:uni.getStorageSync('users').id
          },
          method: "GET",
          success: (res) => {
            let url = 'https://gh.api.cestech.com.cn:8240/mission_gh/sys/common/static/'
            this.pageLoading = false;
            // this.detail = res.data
            console.log(res, 'xxx')
            // res.data.result.bkbNewComments.userAvatar=url+res.data.result.bkbNewComments.userAvatar
            this.detail = res.data.result
            // this.$refs.paging.complete(res.data.result.list);

          }
        })

        // activityone({
        //     id: this.id,
        //     comment: true
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

  .title {}
</style>