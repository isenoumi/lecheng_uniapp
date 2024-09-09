<template>
  <view>
    <view class="tabbar">
      <u-tabs :list="list1" @click="click" :scrollable="false"></u-tabs>
    </view>
    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
      <view class="list" v-if="jb===1">
        <view class="list-li" v-for="item in myList" @click="details(item.teacherId)">
          <view class="left">
            <image :src="item.teacherLet" mode="aspectFill" style="width: 100%;height: 100%;">
            </image>
          </view>
          <view class="right">
            <view>
              <view class="right-title">
                <view class="neme">
                  <!-- <view>{{item.byId.speechTeacher}}</view> -->
                  <view>{{item.teacherName}}</view>
                  <view>
                    <!-- <view class="tab">{{item.byId.speechLevel}}</view> -->
                    <view class="tab">{{item.teacherLevel}}</view>
                  </view>
                </view>
                <!-- <view class="jg">{{item.byId.speechExpenses}}￥</view> -->
                <view class="jg">{{item.teacherPrice}}￥</view>
              </view>
              <!-- <view class="code">订单状态:&ensp;{{item.status}}</view> -->
              <view class="code">订单状态:&ensp;{{item.teacherStatus}}</view>
              <!-- <view class="simple">预约时间：{{item.byId.createTime}}</view> -->
              <view class="simple">
                预约时间：{{item.appointeeTime.slice(0,11)+ (item.appointeeTime.slice(11,13) == '18'? '下午': '上午')}}</view>
            </view>
            <view></view>
          </view>
        </view>
      </view>
      <view class="list" v-if="jb===0">
        <view class="list-li" v-for="item in lists" @click="detail_s(item.bkbActivityCustomization.id)">
          <view class="left">
            <image :src="item.bkbActivityCustomization.coverUrl" mode="aspectFill" style="width: 100%;height: 100%;">
            </image>
          </view>
          <view class="right">
            <view>
              <view class="right-title">
                <view class="neme">
                  <view>{{item.bkbActivityCustomization.activityName}}</view>
                  <!-- <view>
									<view class="tab">{{item.byId.speechLevel}}</view>
								</view> -->
                </view>
                <!-- <view class="jg">{{item.byId.speechExpenses}}￥</view> -->
              </view>
              <!-- <view class="code">订单类型:&ensp;{{item.bkbActivityCustomization.activityType}}</view> -->
              <view class="code">订单状态:&ensp;{{item.status}}</view>
              <view class="simple">预约时间：{{item.time.slice(0,11)+ (item.time.slice(11,13) == '18'? '下午': '上午')}}</view>
            </view>
            <view></view>
          </view>
        </view>
      </view>
    </mescroll-body>
  </view>
</template>

<script>
  import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
  export default {
    mixins: [MescrollMixin], // 使用mixin
    data() {
      return {
        list1: [{
          name: '活动预约',
        }, {
          name: '老师预约',
        }],
        bese_url: 'https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbTrainingProgram/list1',
        // bese_url:'http://192.168.100.12:8087/mission_gh/wx/bkbTrainingProgram/list1',
        list: [],
        lists: [],
        myList: [],
        jb: 0,

      }
    },
    onLoad() {

    },
    methods: {
      click(item) {
        this.list = []
        this.myList = []
        console.log('item', item.index);
        this.jb = item.index
        console.log(this.jb)
        if (this.jb === 0) {
          // this.bese_url='http://192.168.100.12:8087/mission_gh/wx/bkbTrainingProgram/list1'
          this.bese_url = 'https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbTrainingProgram/list1'

          // this.downCallback();
        } else {
          // this.bese_url='https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbTrainingProgram/list'
          this.bese_url = 'https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbTrainingProgram/list'
          // this.bese_url='http://192.168.100.10:8087/mission_gh/wx/bkbTrainingProgram/list'

          // this.downCallback();
        }

        // this.speechLevel=item.index;
        this.downCallback();

      },
      /*下拉刷新的回调 */
      downCallback() {
        this.myList = []
        this.mescroll.resetUpScroll()
      },
      /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
      upCallback(page) {
        let that = this
        uni.request({
          url: that.bese_url,
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
            //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
          },
          data: {
            pageNo: page.num,
            pageSize: page.size,
            // userId:uni.getStorageSync('users').id
          },
          method: "GET",
          success: (res) => {
            console.log('qwer', res);
            if (res.data.code === 200) {
              let url = 'https://gh.api.cestech.com.cn:8240/mission_gh/sys/common/static/'
              if (this.jb === 1) {

                console.log(res.data.result.records.bkbTeacherManagementPeople, 'cc')


                // if(this.bese_url='https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbTrainingProgram/list'){
                res.data.result.records.forEach(item => {
                  item.bkbTeacherManagementPeople.forEach(v => {

                    console.log(v, 'tutttt')
                    // v.byId.headImage=url+v.byId.headImage
                    // if(v.byId.speechLevel===1){
                    // 	v.byId.speechLevel='专家'
                    // }else if(v.byId.speechLevel===2){
                    // 	v.byId.speechLevel='志愿者'
                    // }else if(v.byId.speechLevel===3){
                    // 	v.byId.speechLevel='普通老师'
                    // }
                    // if(v.status==='0'){
                    // 	v.status='待接单'
                    // }else if(v.status==='1'){
                    // 	v.status='已成单'
                    // }else{	
                    // 	v.status='未成单'
                    // }	
                    if (v.teacherLevel == 1) {
                      v.teacherLevel = '专家'
                    } else if (v.teacherLevel == 2) {
                      v.teacherLevel = '志愿者'
                    } else if (v.teacherLevel == 3) {
                      v.teacherLevel = '普通老师'
                    }





                    if (v.teacherStatus == '0') {
                      v.teacherStatus = '待接单'
                    } else if (v.teacherStatus == '1') {
                      v.teacherStatus = '已成单'
                    } else {
                      v.teacherStatus = '未成单'
                    }
                  })
                })


                this.list = res.data.result.records
                this.mescroll.endSuccess(res.data.result.records.length);
                if (page.num == 1) this.list = []; //如果是第一页需手动制空列表
                this.list = this.list.concat(res.data.result.records); //追加新数据
                if (res.data.result.records.length > 0) {
                  this.list.forEach(item => {
                    console.log('iewm', item.bkbTeacherManagementPeople);
                    item.bkbTeacherManagementPeople.forEach(item2 => {
                      console.log('iewm2', item2);
                      this.myList.push(JSON.parse(JSON.stringify(item2)))
                    })
                  })
                  console.log('mtList', this.mylist);
                }

              } else {
                console.log(res.data.result.records, 'cc')
                // if(this.bese_url='https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbTrainingProgram/list'){
                res.data.result.records.forEach(v => {
                  if (v.status == '0') {
                    v.status = '待接单'
                  } else if (v.status == '1') {
                    v.status = '已成单'
                  } else {
                    v.status = '未成单'
                  }
                  console.log(v, 'tutttt')
                  // v.bkbActivityCustomization.coverUrl=url+v.bkbActivityCustomization.coverUrl

                  // if(v.bkbActivityCustomization.activityType===0){
                  // 	v.bkbActivityCustomization.activityType='大型活动'
                  // }else if(v.status===1){
                  // 	v.bkbActivityCustomization.activityType='中型活动'
                  // }else{
                  // 	v.bkbActivityCustomization.activityType='小型活动'
                  // }
                })

                this.lists = res.data.result.records
                this.mescroll.endSuccess(res.data.result.records.length);
                if (page.num == 1) this.lists = []; //如果是第一页需手动制空列表
                this.lists = this.lists.concat(res.data.result.records); //追加新数据
              }
            }
          }
        })

      },
      details(id) {
        uni.navigateTo({
          url: `/pageB/appointmentorder/details?id=${id}`
        })
      },
      detail_s(id) {
        uni.navigateTo({
          url: `/pageC/activity_order/index?id=${id}`
        })
      }
    }
  }
</script>

<style lang="scss">
  .tabbar {
    background: #fff;
    height: 100rpx;
  }

  page {
    background: #f5f5f5;
  }

  .list {
    margin-top: 10rpx;

    .list-li {
      width: 750rpx;
      background: #fff;
      padding: 25rpx 35rpx;
      display: flex;
      align-items: center;
      margin-bottom: 10rpx;

      .left {
        width: 140rpx;
        height: 140rpx;
      }

      .right {
        margin-left: 20rpx;

        .right-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 32rpx;

          .jg {
            color: red;
            font-size: 32rpx
          }

          .neme {
            display: flex;
            align-items: center;

            .tab {
              margin-left: 10rpx;
              font-size: 20rpx;
              border: 1rpx solid rgb(249, 176, 41);
              color: rgb(249, 176, 41);
              padding: 0rpx 6rpx;
            }
          }
        }

        .code {
          font-size: 26rpx;
          margin: 18rpx 0;
        }

        .simple {
          // margin-top: 60rpx;
          font-size: 26rpx;
          width: 500rpx;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap; // 默认不换行；
        }
      }
    }
  }
</style>