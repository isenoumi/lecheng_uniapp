<template>
  <view class="content">
    <z-paging ref="paging" v-model="dataList" @query="queryList" width="100%">
      <view slot="top" class="u-p">
        <navbar :safeAreaInsetTop="true" height="55" placeholder leftIconColor="#fff" autoBack>
          <view class="u-nav-slot" slot="center">
            <u--text text="督导员工具" color="#fff"></u--text>
          </view>
        </navbar>
        <uni-segmented-control class="u-m-b" :current="subsectionCurrent" :values="subsectionList"
          :active-color="globalData.theme['$u-primary']" @clickItem="subsectionChange" styleType="text" />
      </view>
      <view class="task-paging u-p-l u-p-r" v-if="subsectionCurrent==0">
        <uni-card v-for="(item, index) in dataList" :key="index" :item="item">
          <view class="u-flex-column">
            <view class="u-flex box">
              <view class="icon u-p-r">
                <u-icon name="/static/assets/task/knowledge.png" :color="globalData.theme['$u-primary']"
                  size="40"></u-icon>
              </view>
              <view class="content">
                <view class="desc">
                  <view class="title">
                    <u--text :lines="2" bold :text="item.title||''"></u--text>
                  </view>
                  <view class="margin-top-xs u-flex">
                    <u--text type="info" :text="`${item.tenement}户`">
                    </u--text>
                    <u--text type="info" :text="`完成${item.complete}户`">
                    </u--text>
                  </view>
                </view>
              </view>
              <view class="status-icon">
                <statusIcon :status="item.status" />
              </view>
            </view>
          </view>
          <view slot="actions" class="card-actions">
            <view class="card-actions-item" @click="goDetail(item)">
              <u--text text="任务详情">
              </u--text>
            </view>

            <view class="card-actions-item" @click="goRegister(item)">

              <u--text :type="item.status=='2'?'':'info'" text="录入信息">
              </u--text>
            </view>
            <view class="card-actions-item" @click="goQrcode(item)">

              <u--text :type="item.status=='2'?'':'info'" text="获取二维码">
              </u--text>
            </view>
          </view>
        </uni-card>

      </view>
      <view class="task-paging u-p-l u-p-r" v-if="subsectionCurrent==1">
        <uni-card v-for="(item, index) in dataList" :key="index" :item="item">
          <view class="u-flex-column">
            <view class="u-flex box">
              <view class="icon u-p-r">
                <u-icon name="list-dot" :color="globalData.theme['$u-primary']" size="40"></u-icon>
              </view>
              <view class="content">
                <view class="desc">
                  <view class="title">
                    <u--text :lines="2" bold :text="item.title||''"></u--text>
                  </view>
                  <view class="margin-top-xs u-flex">
                    <u--text type="info" :text="`${item.tenement}户`">
                    </u--text>
                    <u--text type="info" :text="`完成${item.complete}户`">
                    </u--text>
                  </view>


                </view>
              </view>
              <view class="status-icon ">
                <statusIcon :status="item.status" />
              </view>
            </view>
          </view>

          <view slot="actions" class="card-actions">
            <view class="card-actions-item" @click="goDetail(item)">

              <u--text text="任务详情" align="center">
              </u--text>
            </view>

          </view>
        </uni-card>

      </view>
    </z-paging>

  </view>

</template>

<script>
  import {
    mapState
  } from 'vuex'
  import {
    tasklist
  } from '@/common/api.js'
  import statusIcon from './components/statusIcon.vue'
  export default {
    components: {
      statusIcon
    },
    mixins: [],
    data() {
      return {
        dataList: [],
        globalData: getApp().globalData,
        subsectionList: ['我的任务', '已完成'],
        subsectionCurrent: 0,

      }
    },
    computed: {
      ...mapState({
        location: state => state.location
      }),
      region() {
        if (this.location) {
          return this.location.region
        }
        return ''
      }

    },
    watch: {
      subsectionCurrent() {
        this.$refs.paging.reload()
      }
    },
    onLoad() {
      //接受事件消息
      uni.$on("taskAccept", (data) => {
        this.$refs.paging.reload()
      })
      uni.$on('taskSupervisorRegister', () => {
        this.$refs.paging.reload()
      })
    },
    onUnload() {
      //接受事件消息
      uni.$off("taskAccept")
      uni.$off("taskSupervisorRegister")
    },
    methods: {
      subsectionChange(e) {
        if (this.current != e.currentIndex) {
          this.subsectionCurrent = e.currentIndex;
          console.log('this.subsectionCurrent = e.currentIndex;', this.subsectionCurrent)
        }
      },
      queryList(page, list_rows) {
        uni.request({
          // url: 'https://gh.api.cestech.com.cn:8240/mission_gh/v1/sy/cultura/listbycustomer',
          url: 'https://gh.api.cestech.com.cn:8240/mission_gh/v1/supervisor/task/list',
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
            //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
          },
          data: {
            phone: uni.getStorageSync('phone'),
            status: this.subsectionCurrent == 0 ? 1 : 2,
            pageNo: page,
            pageSize: list_rows,
          },
          method: "GET",
          success: (res) => {
            console.log(res.data.result.records, 'xxxx')
            this.$refs.paging.complete(res.data.result.records);


          }

        })
      },
      goDetail(item) {
        uni.$u.route({
          url: 'pages/supervisor/task-detail',
          params: {
            id: item.id
          }
        })

      },

      goRegister(item) {

        if (item.status != 2) {
          return;
        }
        uni.$u.route({
          url: '/pages/supervisor/register',
          params: {
            id: item.id,
            communityId: item.communityId,
          }
        })
      },
      goQrcode(item) {
        if (item.status != 2) {
          return;
        }
        console.log('item', item);
        uni.setStorageSync('community_id', item.communityId)
        uni.$u.route({
          url: '/pages/supervisor/qrcode',
          params: {
            id: item.id,
            communityId: item.communityId
          }
        })

      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/.task-paging {
    .box {
      height: 0;
      flex: 1;
      width: 100%;
    }

    .icon {
      height: 100%;
    }

    .conetent {
      width: auto;
      flex: 1;
      height: auto;

      .desc {
        display: flex;
        flex-direction: column;
      }
    }

    .status-icon {
      height: 100%;
      margin-right: -20px;
      display: flex;
      flex-wrap: nowrap;
      flex-basis: auto;
      white-space: nowrap;
      justify-content: center;
      align-items: center;


    }
  }
</style>