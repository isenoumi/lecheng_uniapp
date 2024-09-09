<!-- 新闻 详情 -->
<template>
  <view class="container">
    <u-loading-page :loading="pageLoading"></u-loading-page>
    <view v-if="!pageLoading" style=" background-color: #FFFFFF;">
      <view>
        <view class="content u-p">
          <!--          <view class="u-flex u-row-between u-m-b">
            <u--text @click="toNext(detail)" align="right" :text="nextText"></u--text>

          </view>
          <u-line></u-line> -->
          <view class="titleBox text-xl text-black text-bold u-m-t">{{detail.zs.title}}</view>
          <view class="u-m-t u-m-b">
            <u--text type="info" size="13" :text="detail.zs.createTime|dateFormat">
            </u--text>
          </view>
          <u-line></u-line>
          <!-- 中间文章区域 -->
          <view class="u-m-t">
            <mp-html :content="detail.zs.content" />
          </view>
        </view>
        <!-- 答题主页面 -->
        <question v-if="choiceqstShow" :question="detail.choiceqst" :details="detail.education_knowledge"
          @success="handleSuccess" :is_answer="is_answer" :btnLoading="btnLoading" :safeAreaInsetTop="false" />
      </view>
      <view class="u-p" v-if="false">
        <bindinfo :detail="detail.task" @success="regSuccess" ref="bindinfoform" />
      </view>


    </view>



  </view>
</template>

<script>
  import {
    educationone,
    educationsaveanswer,
    supervisortasksaveanswer,
    educationuserbindinfo,
    add_points
  } from '@/common/api.js'
  import question from '@/components/question.vue'
  import bindinfo from './bindinfo.vue'


  export default {
    components: {
      question,
      bindinfo
    },

    data() {
      return {
        btnLoading: false,
        showReg: false,
        id: null,
        pageLoading: true,
        currentIndex: 0,
        choiceqstShow: false,
        is_answer: false,
        sup: 0,
        detail: {
          task: {
            id: null,
            title: '',
            status: '',
            region: null,
            floor: [],
            community: null
          },

          is_reg: false,
          knowledge: [],
          choiceqst: [],

        },
        source_type: 1, //来源类型 1进入，2阅读，3答题',
        get_type: 2, //积分获取方式 1课程，2宣教，3文化',
        points_acquisition_rule: 0, //获取积分规则 1进入，2阅读，3答题',
        points: '', //可获得积分
        title: '', //答题名称
        source_id: '',
        flag: 1, // 1到底部发请求 2不发请求
      }
    },
    onReady() {
      // if(!uni.getStorageSync('avatarUrl')){
      // 	uni.switchTab({
      // 		url:'/pages/center/index'
      // 	})

      // 	return
      // }

    },
    onShow() {
      // if(!uni.getStorageSync('avatarUrl')){
      // 	uni.switchTab({
      // 		url:'/pages/center/index'
      // 	})

      // 	return
      // }

    },
    onLoad(option) {
      // console.log('5')
      // if(!uni.getStorageSync('avatarUrl')){
      // 	uni.switchTab({
      // 		url:'/pages/center/index'
      // 	})
      // 	return
      // }
      this.getDetail();
      // if (option.id) {
      // 	// if (option.sup) {
      // 	// 	this.sup = 1;
      // 	// } else {
      // 	// 	this.sup = 0
      // 	// }
      // 	this.id = option.id
      // 	this.getDetail();
      // 	setTimeout(() => {
      // 		let that = this
      // 		// console.log(that.detail, '我是规则1')
      // 			// console.log(that.points_acquisition_rule, '我是规则1')
      // 		if (that.points_acquisition_rule === 1) {
      // 			add_points({
      // 			 source_type: 1,
      // 			 source_id: that.source_id,
      // 				get_type: that.get_type,
      // 				points: that.points,
      // 				title: that.title
      // 			}).then(res => {
      // 				if(res.error_code === 0){
      // 					uni.showToast({
      // 						icon:'success',
      // 						title:'恭喜获得本文章积分'
      // 					})
      // 				}

      // 			})
      // 		}
      // 	}, 300);
      // 	return;

      // }
      // const scene = decodeURIComponent(option.scene);
      // if (scene && scene !== undefined) {
      // 	this.sup = 0
      // 	this.id = scene
      // 	this.getDetail();

      // 	return;
      // }

      // uni.$u.route({
      // 	type: 'switchTab',
      // 	url: 'pages/index/index'

      // })
      // return


    },
    onReachBottom() {
      // console.log(this.status,'到底了')
      if (this.flag == 1) {
        console.log(this.points_acquisition_rule, '我是规则2')
        if (this.detail.jf.pointsAcquisitionRule === 2) {
          setTimeout(() => {
            this.add_points()
          }, 500)
          // add_points({
          // 	source_type: 2,
          // 	source_id: this.source_id,
          // 	get_type: this.get_type,
          // 	points: this.points,
          // 	title: this.title
          // }).then(res => {
          // 	uni.showToast({
          // 		icon:'success',
          // 		title:'恭喜获得本文章积分'
          // 	})
          // })
        }
        // this.add_points()
        // console.log(this.flag,'this.flag')
      }
      this.flag = 2
      // console.log(this.flag,'this.flag')
    },
    onShow() {

    },
    onUnload(event) { //监听是否跳转页面
      // if (this.sup) {
      // 	uni.$u.route({
      // 		type: 'navigateBack',
      // 		delta: 1

      // 	})

      // 	return true;
      // }

    },
    computed: {
      // current() {
      // 	if (this.detail.knowledge.length >= 0) {
      // 		if (this.detail.knowledge.length <= this.currentIndex + 1) {
      // 			return this.detail.knowledge[this.currentIndex]
      // 		} else {
      // 			this.currentIndex = 0
      // 			return this.detail.knowledge[this.currentIndex]
      // 		}
      // 	}
      // 	return null
      // },
      nextText() {
        // if (this.is_answer) {
        return '开始答题';
        // }
        // 	if (!this.currentIndex + 1 < this.detail.knowledge.length) {
        // 		return '下一章'
        // 	} else {
        // 		if (this.is_answer) {
        // 			return '开始答题';
        // 		}
        // 		if (this.detail.choiceqst.length > 0) {
        // 			return '开始答题'
        // 		}

        // 		return ''
        // 	}
      }
    },
    methods: {
      toNext(value) {
        // this.choiceqstShow = true;?
        console.log(value.jf)
        uni.navigateTo({
          url: `/pageB/choiceqst/detail?points=${value.jf.points}&id=${value.jf.id}&pointsAcquisitionRule=${value.jf.pointsAcquisitionRule}&title=${value.zs.title}`
        })
        // choiceqst/detail

        // if (this.currentIndex + 1 < this.detail.knowledge.length) {
        // 	this.currentIndex++
        // } else {
        // 	if (this.detail.choiceqst.length > 0) {
        // 		this.choiceqstShow = true;
        // 	}
        // }
      },
      add_points() {
        uni.request({
          url: 'https://gh.api.cestech.com.cn:8240/mission_gh/v1/user/add_points',
          header: {
            //'x-Resource-Token':uni.getStorageSync('xtoken'),
            'x-Resource-Token': uni.getStorageSync('xtoken'), //自定义请求头信息
          },
          data: {
            pointsGetType: this.detail.jf.pointsAcquisitionRule,
            id: null,
            pointsSourceId: this.detail.jf.id,
            pointsSourceType: 2,
            points: Number(this.detail.jf.points),
            title: this.detail.zs.title,
            userId: uni.getStorageSync('users').id,
            type: 0
          },
          method: "POST",
          success: (res) => {
            if (res.data.code === 200) {
              uni.showToast({
                icon: 'none',
                title: '恭喜获得本文章积分'
              })
            }

          }

        })
      },

      getDetail() {

        uni.request({
          url: 'https://gh.api.cestech.com.cn:8240/mission_gh/v1/cultura/listbycustomer2',
          header: {
            'X-Resource-Token': uni.getStorageSync('xtoken'),

          },
          data: {
            // communityId: this.communityId
          },
          method: "GET",
          success: (res) => {
            console.log(res, '小区')
            this.pageLoading = false;
            this.detail = res.data.result
            if (this.detail.jf.pointsAcquisitionRule === 1) {
              this.add_points()
            }
            // this.pageLoading = false;
            //  this.detail = res.data.result
            // if (this.detail.region) {
            //   this.pageLoading = false;
            //   console.log(res.data.result.task, 'xxx')
            // } else {
            //   uni.showToast({
            //     title: '该任务未配置地区',
            //     icon: 'none',
            //   });
            // }


          }

        })

        // educationone({
        // 	id: this.id,
        // 	sup: this.sup || '0'
        // }).then((res) => {
        // 	this.detail = res.data

        // 	this.points_acquisition_rule = res.data.education_knowledge.slice(-1)[0].points_acquisition_rule
        // 	this.points = res.data.education_knowledge.slice(-1)[0].points
        // 	this.title = res.data.education_knowledge.slice(-1)[0].knowledge_title
        // 	this.source_id = res.data.education_knowledge.slice(-1)[0].id
        // 	// console.log(res.data.education_knowledge.slice(-1)[0].points, '我是积分')
        // 	if (this.detail.knowledge.length <= 0) {
        // 		uni.showToast({
        // 			icon: 'none',
        // 			title: '未配置宣教内容'
        // 		})
        // 	} else {

        // 		this.pageLoading = false;
        // 	}

        // })

      },
      // regSuccess(params) {
      // 	this.$refs.bindinfoform.btnLoading = true;
      // 	educationuserbindinfo(params).then(({
      // 		data,
      // 		msg
      // 	}) => {
      // 		this.detail.is_reg = true;

      // 	}).finally(() => {
      // 		this.$refs.bindinfoform.btnLoading = false;
      // 	})
      // },
      // handleSuccess() {
      // 	this.btnLoading = true;
      // 	if (this.sup) {
      // 		supervisortasksaveanswer({
      // 			id: this.id,
      // 		}).then((res) => {
      // 			this.is_answer = true;
      // 			uni.showToast({
      // 				title: res.msg,
      // 				icon: 'success',
      // 			});
      // 		}).finally(() => {
      // 			this.btnLoading = false;
      // 		})
      // 	} else {
      // 		educationsaveanswer({
      // 			id: this.id,
      // 		}).then((res) => {
      // 			this.is_answer = true;
      // 			uni.showToast({
      // 				title: res.msg,
      // 				icon: 'success',
      // 			});
      // 		}).finally(() => {
      // 			this.btnLoading = false;
      // 		})
      // 	}

      // }


    }
  }
</script>

<style lang="scss" scoped>
  button::after {
    border: none;
    background: transparent;
  }

  uni-button {
    background: transparent;
  }

  .container {
    background-color: #f2f2f2;
    width: 750rpx;

  }

  .solid {
    border-radius: 50rpx;
    text-indent: 12rpx;
  }


  .other-content {
    padding: 30rpx;

    .titleName {
      text-align: center;
      font-size: 36rpx;
      color: #333;
      margin-bottom: 15rpx;
    }

    .titleOther {
      text-align: center;
      font-size: 26rpx;
      color: #8799a3;
      margin-bottom: 15rpx;
    }

    .image {

      margin: 20rpx auto;
      display: block;
    }

    .explainBox {
      color: #8799a3;
    }

    .explainItem {
      margin-bottom: 16rpx;
    }
  }
</style>