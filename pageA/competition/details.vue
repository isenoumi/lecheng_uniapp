<template>
  <view class="content">
    <!-- <navbar :safeAreaInsetTop="true" :allTitle="false" height="55" placeholder autoBack
			imageSrc="http://cdn.cestech.com.cn/BkpKnowledge/img/525e270517c74fa79a13b97539b95af6.jpg">
			<view class="u-nav-slot" slot="center">
				<u--text text="答题"></u--text>
			</view>
		</navbar> -->
    <view class="mainBox bg-white">
      <view class="u-nav">
        <navbar
          :safeAreaInsetTop="true"
          placeholder
          height="55"
          leftIconColor="#fff"
          imageSrc="https://oms.cestech.com.cn/BkpKnowledge/img/286b4a1bb0f64d0286f488097a260707/蒙版组 8.png"
          autoBack>
          <view class="u-nav-slot" slot="center">
            <u--text text="答题" color="#fff"></u--text>
          </view>
        </navbar>
      </view>
    </view>
    <u-loading-page :loading="pageLoading"></u-loading-page>
    <!-- 答题主页面 -->
    <question
      v-if="!pageLoading"
      :question="question"
      :flag="flag"
      ref="successFun"
      @success="handleSuccess"
      :btnLoading="btnLoading"
      @sendData="getData"
      :is_answer="is_answer" />
  </view>
</template>

<script>
import question from './components/choiceqst.vue'
import { saveanswer, coursechoiceqst, add_points } from '@/common/api.js'

export default {
  components: {
    question,
  },
  data() {
    return {
      pageLoading: true,
      btnLoading: false,
      id: null,
      is_answer: '',
      question: [],
      source_type: 3, //来源类型 1进入，2阅读，3答题',
      get_type: 2, //积分获取方式 1课程，2宣教，3文化',
      points_acquisition_rule: 0, //获取积分规则 1进入，2阅读，3答题',
      points: '', //可获得积分
      title: '', //答题名称
      flg: 1,
      flag: 1,
    }
  },
  onLoad(option) {
    console.log(option, '传过来了')
    this.getDetail()
    // if (option.id) {

    // 	this.id = option.id
    // 	this.title = option.title
    // 	this.points_acquisition_rule = option.points_acquisition_rule
    // 	this.points = Number(option.points)
    // 	this.getDetail();

    // } else {
    // 	uni.$u.route({
    // 		type: 'navigateBack'

    // 	})
    // 	return
    // }
  },
  computed: {},
  methods: {
    answeredQuestionsAdded() {
      uni.request({
        url: 'https://gh.api.cestech.com.cn:8240/mission_gh/xcx_api/bkbChoiceqst_answer/answeredQuestionsAdded',
        data: {
          //参数
          phone: uni.getStorageSync('phone'),
        },
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
          'Content-Type': 'application/x-www-form-urlencoded',
          // 'Content-Type': 'application/json' //自定义请求头信息
        },
        method: 'GET', //请求方式，必须为大写
        success: res => {
          console.log('接口返回------', res)
        },
      })
    },
    getData: function (res) {
      console.log(res, 'x') //我是子
      console.log(this.flg, 'y') //我是子
      this.flg = res
      console.log(this.flg, 'z') //我是子
    },
    pointsFun() {
      uni.request({
        url: 'https://gh.api.cestech.com.cn:8240/mission_gh/xcx_api/bkbChoiceqst_answer/answerPoints',
        data: {
          //参数
          phone: uni.getStorageSync('phone'),
        },
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
          'Content-Type': 'application/x-www-form-urlencoded',
          // 'Content-Type': 'application/json' //自定义请求头信息
        },
        method: 'GET', //请求方式，必须为大写
        success: res => {
          console.log('接口返回------', res.data)
          // if(res.data)
          uni.showToast({
            icon: 'none',
            title: res.data.message,
          })
        },
      })
    },
    doTheNumberOfQuestionsToAdd() {
      uni.request({
        url: 'https://gh.api.cestech.com.cn:8240/mission_gh/xcx_api/bkbChoiceqst_answer/doTheNumberOfQuestionsToAdd',
        data: {
          //参数
          phone: uni.getStorageSync('phone'),
        },
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
          'Content-Type': 'application/x-www-form-urlencoded',
          // 'Content-Type': 'application/json' //自定义请求头信息
        },
        method: 'GET', //请求方式，必须为大写
        success: res => {
          console.log('接口返回------', res.data)
          // if(res.data)
          uni.showToast({
            icon: 'none',
            title: res.data.message,
          })
          this.answeredQuestionsAdded()
        },
      })
    },
    getDetail() {
      uni.request({
        url: 'https://gh.api.cestech.com.cn:8240/mission_gh/xcx_api/bkbChoiceqst_answer/queryRandom',
        data: {
          //参数
        },
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
          'Content-Type': 'application/x-www-form-urlencoded',
          // 'Content-Type': 'application/json' //自定义请求头信息
        },
        method: 'GET', //请求方式，必须为大写
        success: res => {
          console.log('接口返回------', res.data.result)
          if (res.data.code === 200) {
            let obj = JSON.parse(JSON.stringify(res.data.result))
            let arr = []
            obj.forEach(item => {
              item.answer.list = JSON.parse(JSON.stringify(item.list))
              delete item.list
              arr.push(item)
            })

            console.log(arr)
            this.question = arr
            this.pageLoading = false
          }

          // res.data.result.forEach(v => {
          //   let data = {
          //     list: []
          //   }
          //   data.list = data.list.push(v.list)
          //   console.log(data, '33333333333333')

          // })
        },
      })
      // coursechoiceqst({
      //   id: '1656494141808316417'
      // }).then((res) => {
      //   // this.question = res.data.question
      //   // this.is_answer = res.data.is_answer
      //   // this.pageLoading = false;
      // }).catch(res => {

      // })
    },
    handleSuccess({ answer }) {
      console.log(this)
      // let that = this
      this.btnLoading = true
      console.log('答题', this.flg)
      // if (this.flg === 1) {
      // this.pointsFun()
      this.doTheNumberOfQuestionsToAdd()
      // this.answeredQuestionsAdded()

      // this.$emit("successFun")
      console.log(this.$refs, 'this.$refs')
      this.$refs.successFun.successFun()
      // saveanswer({
      //   id: '1656494141808316417',
      // }).then((res) => {
      //   this.is_answer = true;
      //   uni.$emit("refreshCourseDetail")
      //   uni.showToast({
      //     title: res.msg,
      //     icon: 'success',
      //   });

      // }).catch(res => {
      //   console.log(res)

      // }).finally(() => {
      //   this.btnLoading = false;
      // })
      // } else {

      // }
    },
  },
}
</script>

<style lang="scss" scoped></style>
