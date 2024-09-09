<template>
  <view class="box">
    <view class="header">
      <view class="img">
        <image mode="scaleToFill" style="width: 100%;height: 100%;"
          src="http://cdn.cestech.com.cn/BkpKnowledge/img/a78c2e4129fd4c5fb531fbca21cc91ed.png"></image>
      </view>
      <view class="box-right">
        <view class="left">
          <view class="name">{{item.bkbTrainingProgram.title}}</view>
          <view v-if="item.bkbTrainingProgram.status == 31" style="color: #29CE8C;font-size: 28rpx;font-weight: bold;">
            {{item.bkbTrainingProgram.status|statusText}}
          </view>
          <view v-if="item.bkbTrainingProgram.status == 40" style="color: #FF3838;font-size: 28rpx;font-weight: bold;">
            {{item.bkbTrainingProgram.status|statusText}}
          </view>
          <view v-if="item.bkbTrainingProgram.status == 50" style="color: #999999;font-size: 28rpx;font-weight: bold;">
            {{item.bkbTrainingProgram.status|statusText}}
          </view>
        </view>
        <view class="left">
          <view>开始时间：{{item.bkbTrainingProgram.createTime.slice(0,16)}}</view>
          <view >{{item.count|typeText}}</view>
        </view>
      </view>
    </view>
    <view class="card-actions">
      <view class="card-actions-item details" @click="goDetail(item)"
        v-if="item.bkbTrainingProgram.status==2||item.bkbTrainingProgram.status==1">
        查看详情
      </view>
      <view class="card-actions-item details" style="margin-left: 10rpx;" @click="goEvaluate(item)"
        v-if="item.bkbTrainingProgram.status==2&&item.quesStatus=='0'||item.answerStatus=='1'">
        进行评价
      </view>
      <view class="card-actions-item reservationbtn" @click="subscribe(item)"
        v-if="item.status==='0'&&item.bkbTrainingProgram.status==1">
        立即预约
      </view>
      <view class="card-actions-item alreadybtn" v-if="item.status==='1'&&item.bkbTrainingProgram.status==1">
        已预约
      </view>
      <view class="card-actions-item reservationbtn" @click="goanswer(item)"
        v-if="item.quesStatus=='1'&&item.bkbTrainingProgram.status==2&&item.answerStatus=='0'">
        进行答题
      </view>
      <view class="card-actions-item evaluatebtn" @click="goSuccessDetail(item)"
        v-if="item.bkbTrainingProgram.status==3">
        查看结果
      </view>
    </view>
    <!--  <uni-card :title="item.bkbTrainingProgram.title" :extra="item.bkbTrainingProgram.status|statusText">
      <view class="u-flex u-row-between">
        <view class="u-flex-1">
          <u--text size="13" :text="`开始时间：${item.bkbTrainingProgram.createTime}`">
          </u--text>
        </view>
        <view>
          <u--text size="13" :text="item.count|typeText">
          </u--text>
        </view>
      </view>

      <view slot="actions" class="card-actions">
        <view class="card-actions-item" @click="goDetail(item)"
          v-if="item.bkbTrainingProgram.status==2||item.bkbTrainingProgram.status==1">
          <u--text size="14" text="查看详情">
          </u--text>
        </view>
       <view class="card-actions-item" @click="goDetail(item)" v-if="item.status!=actStatus.success">
          <u--text size="14" text="查看详情">
          </u--text>
        </view>
        <view class="card-actions-item" @click="subscribe(item)" v-if="!item.booked&&item.status==actStatus.popular">
          <u--text size="14" text="预约">
          </u--text>
        </view>
        <view class="card-actions-item" @click="subscribe(item)"
          v-if="item.status==='0'&&item.bkbTrainingProgram.status==1">
          <u--text size="14" text="预约">
          </u--text>
        </view>
        <view class="card-actions-item" v-if="item.booked&&item.status==actStatus.popular">
          <u--text size="14" type="info" text="已预约">
          </u--text>
        </view>

        <view class="card-actions-item" v-if="item.status==='1'&&item.bkbTrainingProgram.status==1">
          <u--text size="14" type="info" text="已预约">
          </u--text>
        </view>
        <view class="card-actions-item" @click="goEvaluate(item)"
          v-if="item.bkbTrainingProgram.status==2&&item.quesStatus=='0'||item.answerStatus=='1'">
          <u--text size="14" text="进行评价">
          </u--text>
        </view>
        <view class="card-actions-item" @click="goEvaluate(item)" v-if="item.status==actStatus.underway">
          <u--text size="14" text="评价活动">
          </u--text>
        </view>

        <view class="card-actions-item" @click="goSuccessDetail(item)" v-if="item.bkbTrainingProgram.status==3">
          <u--text size="14" text="查看结果">
          </u--text>
        </view>
        <view class="card-actions-item" @click="goSuccessDetail(item)" v-if="item.bkbTrainingProgram.status==actStatus.success">
		  <u--text size="14" text="查看评价">
		  </u--text>
		</view>
        <view class="card-actions-item" @click="goanswer(item)"
          v-if="item.quesStatus=='1'&&item.bkbTrainingProgram.status==2&&item.answerStatus=='0'">
          <u--text size="14" text="进行答题">
          </u--text>
        </view>
      </view>
    </uni-card> -->

    <u-modal :show="show" @confirm="subscribeSubmit" ref="uModal" :asyncClose="true" showCancelButton
      @cancel="this.show=false" title="提示" content="      是否预约此活动？">

    </u-modal>


  </view>
</template>

<script>
  import {
    actStatus
  } from '@/common/enums/new_file.js'
  import authorize from "@/common/auth.js"
  import templateIds from "../../../common/template-ids"
  import {
    bookadd
  } from '@/common/api.js'
  import {
    merge
  } from 'lodash'

  export default {
    props: {
      item: {
        default: null,
        type: Object
      },
      index: {
        type: [String, Number],
        default: ''
      }
    },
    filters: {
      statusText(val) {
        let that = this
        console.log(val, 'xxx')
        if (val == actStatus.popular) {
          return '已接受'
        } else if (val == actStatus.underway) {
          return '进行中'
        } else if (val == actStatus.success) {
          return '已结束'
        }
        return ''

      },
      typeText(val) {
        return '预约人数：' + val
      }
    },
    data() {
      return {
        show: false,
        actStatus: actStatus,
        modal: {
          item: null,
          img: []
        },

        datas: {
          unaccept: 30, //未接受
          unaccept20: 20,
          popular: 1, //已接受
          underway: 2, //进行中
          success: 3, //已完成
          answer: 60, //答题
        }
      }
    },
    computed: {

    },
    onLoad() {

    },
    methods: {
      subscribe() {

        if (uni.getStorageSync('avatarUrl')) {
          this.show = true;
          console.log('222');
        } else {
          this.show = false;
          uni.showToast({
            icon: 'none',
            title: '请先登录再预约'
          })
          setTimeout(() => {
            uni.switchTab({
              url: '/pages/center/index'
            })
          }, 1000);

          // console.log('333');
        }
      },
      subscribeSubmit() {

        // if(uni.getStorageSync('avatarUrl')){
        this.$refs.uModal.loading = false
        uni.request({
          url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbTrainingCourseReservation/appointment`,
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
            //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
          },
          data: {
            id: this.item.bkbTrainingProgram.id,
            nickName: uni.getStorageSync('nikename'),
            phone: uni.getStorageSync('phone')
          },
          method: "GET",
          success: (res) => {
            this.$refs.uModal.loading = false;
            this.$emit('changeBooked', {
              index: this.index,
              key: 'booked',
              value: true
            })

            this.$emit('stus', {
              key: 'stus',
              value: true
            })
            this.show = false;
            uni.showToast({
              title: '预约成功',
              icon: 'success',
            });

          }
        })


        // bookadd({
        //   book_id: this.item.id,
        //   book_type: 'act'
        // }).then(({
        //   data,
        //   msg
        // }) => {
        //   this.$refs.uModal.loading = false;
        //   this.$emit('changeBooked', {
        //     index: this.index,
        //     key: 'booked',
        //     value: true
        //   })


        //   this.show = false;
        //   uni.showToast({
        //     title: msg,
        //     icon: 'success',
        //   });

        authorize.requestSubscribeMessage(templateIds.activity).then((res) => {

        })


        // }).finally(() => {
        //   this.$refs.uModal.loading = false;
        // })
        // }else{
        // 	// this.show=false

        // }

      },
      goDetail(item) {
        uni.$u.route({
          url: 'pageB/activity_manager/detail',
          params: {
            id: item.bkbTrainingProgram.id,

          }
        })

      },
      goSuccessDetail(item) {
        uni.$u.route({
          url: 'pageB/activity/evaluate_detail',
          params: {
            id: item.bkbTrainingProgram.id,

          }
        })
      },
      goanswer(item) {
        uni.$u.route({
          url: 'pageA/choiceqst/detail',
          params: {
            id: item.bkbTrainingProgram.id,

          }
        })
      },
      goEvaluate(item) {
        // console.log(item
        if (item.evaluateStatus === '1') {
          uni.showToast({
            icon: 'none',
            title: '已进行评价请勿重复评价'
          })
        } else {
          if (uni.getStorageSync('avatarUrl')) {

            uni.$u.route({
              url: 'pageB/activity/evaluate',
              params: {
                id: item.bkbTrainingProgram.id,

              }
            })
            // console.log('222');
          } else {
            // this.show = false;
            uni.showToast({
              icon: 'none',
              title: '请先登录再评价'
            })
            setTimeout(() => {
              uni.switchTab({
                url: '/pages/center/index'
              })
            }, 1000);
          }
        }


      },

    }

  }
</script>

<style lang="scss">
  page {
    background: #f5f5f5;
  }

  .card-actions-item {
    text-align: center;
    font-size: 26rpx !important;
    font-weight: 500;
  }

  .card-actions {
    width: 660rpx;
    margin: 0 auto;
    display: flex;
    align-items: center;
    margin-bottom: 30rpx;
	padding-bottom: 25rpx;
    .reservationbtn {
      text-align: center;
      line-height: 68rpx;
      width: 401rpx;
      height: 68rpx;
      background: #29CE8C;
      border-radius: 11rpx;
      font-weight: 500;
      color: #fff;
      font-size: 30rpx;
      margin-left: 20rpx;
    }

    .alreadybtn {
      text-align: center;
      line-height: 68rpx;
      width: 401rpx;
      height: 68rpx;
      background: #FAFAFA;
      border-radius: 11rpx;
      font-weight: 500;
      color: #CCCCCC;
      font-size: 30rpx;
      margin-left: 20rpx;
    }

    .details {
      text-align: center;
      line-height: 68rpx;
      width: 240rpx;
      height: 68rpx;
      background: #F3F3F3;
      border-radius: 11rpx;
      font-weight: 500;
      color: #333333;
    }

    .evaluatebtn {
      width: 660rpx;
      height: 68rpx;
      background: #FAFAFA;
      border-radius: 11rpx;
      margin: 0 auto;
      font-size: 30rpx;
      color: #CCCCCC;
      font-weight: 550;
      line-height: 68rpx;
      text-align: center;

    }
  }


  .box {
    width: 720rpx;
    background: #fff;
    margin-bottom: 20rpx;
    border-radius: 20rpx;

    .header {

      display: flex;
      align-items: center;
      padding: 30rpx 35rpx;
      font-size: 26rpx;

      .img {
        width: 110rpx;
        height: 110rpx;
      }

      .box-right {
        width: 550rpx;
        margin-left: 20rpx;

        .left {

          color: #999999;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .name {
            font-size: 36rpx;
            font-weight: bold;
            color: #333333;
            margin-bottom: 10rpx;
          }
        }
      }
    }
  }
</style>