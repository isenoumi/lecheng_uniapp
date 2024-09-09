<!-- 查看视频 -->
<template>
  <view class="container">
    <u-loading-page :loading="pageLoading"></u-loading-page>
    <view v-if="!pageLoading">
      <view class="title u-flex  u-p">
        <!-- <u--image :showLoading="true" :src="detail.img_url" width="40px" height="40px" mode="aspectFit">
				</u--image> -->

        <view class="u-m-l">
          <u--text align="center" size="15" :text="detail.name"></u--text>
        </view>
      </view>
      <u-divider></u-divider>
      <view class="content u-p ">
        <view class="item u-p-b">
          <view class="u-flex u-rela ">
            <view class="u-flex require-label ">
              *
            </view>
            <u--text text="1、活动效果如何（1-5分)"></u--text>
          </view>

          <view class="value">
            <u-rate count="5" v-model="form.grade1" :activeColor="globalData.theme['$u-primary']"></u-rate>
          </view>

        </view>

        <view class="item u-p-b">
          <view class="u-flex u-rela ">
            <view class="u-flex require-label ">
              *
            </view>
            <u--text text="2、本次活动是否有用（1-5分）"></u--text>
          </view>
          <view class="value">
            <u-rate count="5" v-model="form.grade2" :activeColor="globalData.theme['$u-primary']"></u-rate>
          </view>
        </view>
        <view class="item u-p-b">
          <view class="u-flex u-rela ">
            <view class="u-flex require-label ">
              *
            </view>
            <u--text text="3、讲师是否表达清晰（1-5分）"></u--text>
          </view>
          <view class="value">
            <u-rate count="5" v-model="form.grade3" :activeColor="globalData.theme['$u-primary']"></u-rate>
          </view>
        </view>
        <view class="item u-p-b">
          <u--text text="4、其他建议"></u--text>
          <view class="value">
            <u--textarea v-model="form.comment" placeholder="请输入内容" count></u--textarea>
          </view>
        </view>

      </view>
      <view class="desc u-flex-1 u-p">
        <view class="btns u-flex-1 u-flex">
          <view class="u-flex-1 u-p-r">
            <u-button type="info" text="取消" @click="goBack">
            </u-button>
          </view>
          <view class="u-flex-1 u-p-l">
            <u-button type="primary" text="确定" @click="submit" :loading="btnLoading">
            </u-button>
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
    commentsave
  } from '@/common/api.js'


  export default {
    components: {

    },
    data() {
      return {
        pageLoading: true,
        btnLoading: false,
        globalData: getApp().globalData,
        id: null,
        detail: {
          name_of_activity: '',
          type: '',
          create_time: '',
          start_date: '',

        },
        value: '',
        form: {
          grade1: '',
          grade2: '',
          grade3: '',
          comment: '',
        }
      }
    },
    onLoad(option) {

      if (option.id) {
        console.log(option.id, '我是id')
        this.id = option.id
        this.getDetail();
        return;
      }
      const scene = decodeURIComponent(option.scene);
      if (scene && scene !== undefined) {
        this.id = scene
        this.getDetail();
        return;
      }



      uni.$u.route({
        type: 'navigateBack',
        delta: 1

      })
      return


    },
    onUnload() {

    },
    computed: {},

    methods: {

      getDetail() {
        this.pageLoading = true;
        // activityone({
        // 	id: this.id
        // }).then((res) => {
        // 	this.detail = res.data
        // 	this.pageLoading = false;


        // })
        uni.request({
          url: `https://gh.api.cestech.com.cn:8240/mission_gh/v1/2/activity/one?id=${this.id}`,
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
            //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
          },
          method: "GET",
          success: (res) => {
            console.log(res.data.result, 'xxxx')
            this.pageLoading = false;
            this.detail = res.data.result.activity
            // this.speaker = res.data.result.Speaker
          }

        })

      },
      goBack() {
        this.form = {
          grade1: '',
          grade2: '',
          grade3: '',
          comment: '',
        };
        let routes = getCurrentPages();
        if (routes.length == 1) {
          uni.$u.route({
            url: 'pages/index/index',
            type: 'switchTab'
          })
          return;
        }
        uni.navigateBack({
          delta: 1
        });
      },
      submit() {
        if (this.form.grade1 == '' || this.form.grade2 == '' || this.form.grade3 == '') {
          uni.showToast({
            title: '请完成评价',
            duration: 2000,
            icon: 'none'
          });
          return
        }


        this.btnLoading = true;
        const userinfo = uni.getStorageSync("users")
        console.log(userinfo, 'asdadd');
        uni.request({
          url: `https://gh.api.cestech.com.cn:8240/mission_gh/v1/2/comment/save?user_name=${userinfo.nickName}`,
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
            //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
          },
          data: {
            actId: this.id,
            grade1: this.form.grade1,
            grade2: this.form.grade2,
            grade3: this.form.grade3,
            comment: this.form.comment,
          },
          method: "POST",
          success: (res) => {
            console.log(res.data.result, 'xxxx')
            this.goBack()
            uni.showToast({
              title: '评价成功',
              icon: 'success'
            });
          }

        })

        // commentsave({
        //   act_id: this.id,
        //   grade1: this.form.grade1,
        //   grade2: this.form.grade2,
        //   grade3: this.form.grade3,
        //   comment: this.form.comment,
        // }).then(({
        //   data,
        //   msg
        // }) => {

        //   this.goBack()
        //   uni.showToast({
        //     title: '评价成功',
        //     icon: 'success'
        //   });
        // }).finally(() => {
        //   this.btnLoading = false;
        // })


      }


    }
  }
</script>

</style>
<style lang="scss" scoped>
  page {
    background-color: #fff;
  }

  .title {
    align-items: center;
  }

  .u-m-l {
    /deep/ .u-text__value {

      font-weight: 700 !important;
      font-size: 36rpx !important;
    }
  }

  .content {
    .item {
      .value {
        padding-left: 1.5em;
        margin: 10px auto;
      }
    }
  }
</style>