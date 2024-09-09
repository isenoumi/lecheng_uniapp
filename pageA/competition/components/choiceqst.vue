<template>
  <view class="content">
    <u-notify ref="uNotify"></u-notify>
    <!-- 答题主页面 -->
    <view>
      <view class="mainBox radius bg-white">
        <view v-if="hasData">
          <!-- <view class="u-flex u-row-between">
            <view class="u-flex">
              <view class="">
                <u--text type="info" :text="num + 1"></u--text>
              </view>
              <view class="">
                <u--text type="info" text="/"></u--text>
              </view>
              <view class="">
                <u--text type="info" :text="questioncp.length"></u--text>
              </view>
            </view>
            <u--text
              type="info"
              align="right"
              :text="getType(questioncp[num].answer.choiceType)">
            </u--text>
          </view>
          <u-line margin="10px 0px" color="#dddddd"></u-line> -->
          <view
            class="animation-reverse questionBox"
            :class="animation"
            data-class="slide-rights"
            v-if="questioncp[num].answer.choiceType == 2">
            <view class="mentalTitle">
              <!-- <mp-html :content="question  cp[num].answer.choiceqstContent" /> -->

              <view class="questionTitle">
                <span class="num">{{ `${num + 1}/${questioncp.length}` }}</span>

                <view class="questionType">
                  {{ getType(questioncp[num].answer.choiceType) }}
                </view>
                {{ questioncp[num].answer.choiceqstContent }}
              </view>
            </view>
            <view
              class="mentalList"
              v-for="(item, index) in myList"
              @tap.stop="
                TogglePanduan(item, index, questioncp[num].answer.choiceType)
              ">
              <view class="mentalItem" v-bind:class="{ active: item.checked }">
                <view class="indexBox">
                  <!--            <u--text  align="center" :color="item.checked?'#fff':''" bold
                                        :text="index|answerIndex"></u--text> -->
                  <view class="circle" :class="{ checked: item.checked }">
                  </view>
                </view>

                <view class="rightBox">
                  <u--text align="left" bold :text="item.content"></u--text>
                  <!--     <view class="icon">
                                        <u-icon v-if="!!item.checked"  name="checkbox-mark"
                                            :color="globalData.theme['$u-primary']">
                                        </u-icon>
                                    </view> -->
                </view>
              </view>
            </view>
          </view>

          <view
            class="animation-reverse questionBox"
            :class="animation"
            data-class="slide-rights"
            v-else>
            <view class="mentalTitle">
              <view class="questionTitle">
                <!-- <view class="u-flex" style="display: inline">
                  <u--text
                    type="info"
                    :text=""></u--text>
                </view> -->
                <span class="num">{{ `${num + 1}/${questioncp.length}` }}</span>
                <view class="questionType">
                  {{ getType(questioncp[num].answer.choiceType) }}
                </view>
                {{ questioncp[num].answer.choiceqstContent }}
              </view>
              <!-- <mp-html :content="questioncp[num].answer.choiceqstContent" /> -->
            </view>
            <view
              class="mentalList"
              v-for="(item, index) in questioncp[num].answer.list"
              @tap.stop="
                Toggle(item, index, questioncp[num].answer.choiceType)
              ">
              <view class="mentalItem" v-bind:class="{ active: item.checked }">
                <view class="indexBox">
                  <!--            <u--text  align="center" :color="item.checked?'#fff':''" bold
                                        :text="index|answerIndex"></u--text> -->
                  <view class="circle" :class="{ checked: item.checked }">
                  </view>
                </view>

                <view class="rightBox">
                  <u--text align="left" bold :text="item.content"></u--text>
                  <!--     <view class="icon">
                                        <u-icon v-if="!!item.checked"  name="checkbox-mark"
                                            :color="globalData.theme['$u-primary']">
                                        </u-icon>
                                    </view> -->
                </view>
              </view>
            </view>
          </view>

          <!--   <view class="btns u-flex" :class="{'u-row-right':num!=questioncp.length,'u-row-between':num!=0}">
                        <view class="btn" v-show="num!=0">
                            <u-button text="上一题" @click="toPre"></u-button>
                        </view>
                        <view class="btn" v-show="(num+1)!=questioncp.length">
                            <u-button :disabled="disabledBtn" text="下一题" @click="toNext"></u-button>
                        </view>
                        <view class="btn" v-show="(num+1)==questioncp.length">
                            <u-button :disabled="disabledBtn" :loading="btnLoading" text=" 提交" @click="toEnd">
                            </u-button>
                        </view>
                        
                        
                   
                    </view>
                    -->
          <u-tabbar
            :fixed="true"
            :placeholder="true"
            :border="false"
            :safeAreaInsetBottom="true"
            style="background: #f5f5f5">
            <view
              class="btns u-flex"
              :class="{
                'u-row-right': num != questioncp.length,
                'u-row-between': num != 0,
              }">
              <!-- <view class="btn" @click="toPre" :class='{disabled:num==0}'>
								上一题
							</view> -->
              <view
                class="btn"
                v-if="num + 1 != questioncp.length"
                @click="toNext"
                :class="{ disabled: disabledBtn }">
                下一题
                <!-- <u-button :disabled="disabledBtn" text="下一题" @click="toNext"></u-button> -->
              </view>
              <view
                class="btn"
                v-if="num + 1 == questioncp.length"
                :class="{ disabled: disabledBtn }"
                @click="toEnd">
                提交
                <!-- <u-button :disabled=" disabledBtn" :loading="btnLoading" text=" 提交"
                                @click="toEnd">
                                </u-button> -->
              </view>
            </view>
          </u-tabbar>
        </view>
        <view v-if="noData" class="success">
          <view class="image-box">
            <u--image
              :showLoading="true"
              src="http://cdn.cestech.com.cn/BkpKnowledge/img/ccf9e86285fe4b52aba247ae4676234a.png"
              width="140px"
              height="140px">
            </u--image>
          </view>
          <u--text
            size="15"
            align="center"
            bold
            text="恭喜! 答题完成"></u--text>
          <!-- <u--text
            v-else  v-if="flg == 2"
            size="15"
            align="center"
            bold
            text="恭喜!全部答对"></u--text> -->
          <!--  <u--text v-else size="15" align="center" bold text="恭喜!全部答对本次奖励积分+2"></u--text> -->
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { answerPoints, extraPointsForNewAnswers } from './../api'
import { add_points } from '@/common/api.js'
export default {
  filters: {
    answerIndex(val) {
      const Arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
      return Arr[val] || ''
    },
  },
  props: {
    question: {
      default: [],
      type: Array,
    },
    details: {
      default: [],
      type: Array,
    },
    is_answer: {
      default: true,
      type: Boolean,
    },
    btnLoading: {
      default: false,
      type: Boolean,
    },
    safeAreaInsetTop: {
      default: true,
      type: Boolean,
    },
  },
  data() {
    return {
      checkedAnswer: { id: '', answer: '', answerList: [], type: '' },

      myList: [
        {
          content: '对',
          id: '1',
        },
        {
          content: '错',
          id: '0',
        },
      ],
      globalData: getApp().globalData,
      num: 0,
      animation: '',
      questioncp: [],
      detail: [],
      answer: {},
      notify: {
        message: '123',
        show: true,
        type: 'warning',
      },
      flg: 1,
      noData: false,
      hasData: true,
    }
  },

  watch: {
    question: {
      handler(val) {
        console.log(val, '9999999999999999')
        this.questioncp = val
      },
      deep: true,
      immediate: true,
    },
    // details: {
    //     handler(val) {
    // 		console.log(val,'我是传递过去的数据')
    //         this.detail = val
    // 		console.log( this.detail,'我是传递过去的数据')
    //     },

    // }
  },
  computed: {
    disabledBtn() {
      if (this.questioncp.length <= 0) {
        return true
      }

      return false
    },

    // hasData() {
    // 	// if (this.is_answer == true) {
    // 	// 	return false;
    // 	// }
    // 	// if (this.questioncp.length > 0) {
    // 	// 	return true;
    // 	// }
    // 	return true;
    // },
    // noData() {
    // 	// if (this.is_answer == true) {
    // 	// 	return true;
    // 	// }

    // 	return false;
    // },
  },
  methods: {
    getType(type) {
      console.log(type)
      if (type == 0) {
        return '单选题'
      } else if (type == 1) {
        return '多选题'
      } else if (type == 2) {
        return '判断题'
      }
    },

    Toggle(info, index, type) {
      console.log('aaa', info, index, type)
      let questioncp = this.questioncp[this.num] //每题
      let option = this.questioncp[this.num].answer.list //每一题题目的选项

      let answer = []
      let right = true //题目中的答案
      console.log('option11111', option, questioncp)
      //选中添加样式
      option.forEach((item, index) => {
        if (item.id == info.id) {
          //如果选中的与数据里面的相等就改变他的样式
          console.log(1111111, questioncp.choice_type, item)
          let checked = item.hasOwnProperty('checked') ? item.checked : false
          this.$set(
            this.questioncp[this.num].answer.list[index],
            'checked',
            !checked
          )
          console.log('checked', checked)
          this.checkedAnswer.id = questioncp.answer.id
          this.checkedAnswer.type = type
          if (type == 0 && !checked) {
            this.checkedAnswer.answer = item.content
          } else if (type == 0 && checked) {
            this.checkedAnswer = {}
          } else if (type == 1 && !checked) {
            this.checkedAnswer.answerList.push(item.content)
          } else if (type == 1 && checked) {
            this.checkedAnswer.answerList =
              this.checkedAnswer.answerList.filter(e => e !== item.content)
          }
          console.log(222222, this.checkedAnswer)
        } else if (type == 0) {
          //如果不是多选 只能选中一个 其他的都为false
          this.$set(
            this.questioncp[this.num].answer.list[index],
            'checked',
            false
          )
        }
        if (item.checked) {
          answer.push(item.id)
        }
        // 判断正确与否
        if (
          !(
            (item.rightAnswer && item.checked) ||
            (!item.rightAnswer && !item.checked)
          )
        ) {
          right = false
        }
      })
      this.hideNotify()
      this.$set(this.answer, this.questioncp[this.num].answer.id, right)
    },
    TogglePanduan(info, index, type) {
      let questioncp = this.questioncp[this.num] //每题
      let option = this.myList //每一题题目的选项

      let answer = []
      let right = true //题目中的答案
      console.log('option', option)
      //选中添加样式
      option.forEach((item, index) => {
        if (item.id == info.id) {
          //如果选中的与数据里面的相等就改变他的样式
          console.log(1111111, questioncp.choice_type)
          let checked = item.hasOwnProperty('checked') ? item.checked : false
          this.$set(this.myList[index], 'checked', !checked)
          if (type == 2 && !checked) {
            this.checkedAnswer = {
              id: questioncp.answer.id,
              answer: item.content,
              type,
            }
          } else if (type == 2 && checked) {
            this.checkedAnswer = {}
          }
          console.log('this.checkedAnswer', this.checkedAnswer)
        } else {
          //如果不是多选 只能选中一个 其他的都为false
          this.$set(this.myList[index], 'checked', false)
          console.log(222222)
        }
        if (item.checked) {
          answer.push(item.id)
        }
        // 判断正确与否
        // if (!((item.rightAnswer && item.checked) || (!item.rightAnswer && !item.checked))) {
        //   right = false;
        // }
      })
      this.hideNotify()
      this.$set(this.answer, this.questioncp[this.num].answer.id, right)
      // this.myList = [{
      //     content: '对',
      //     id: '1'
      //   },
      //   {
      //     content: '错',
      //     id: '0'
      //   }
      // ]
    },
    toPre() {
      if (this.num == 0) {
        return
      }
      this.num--
    },
    reload() {
      // 页面重载
      const pages = getCurrentPages()
      // 声明一个pages使用getCurrentPages方法
      const curPage = pages[pages.length - 1]
      // 声明一个当前页面
      curPage.onLoad(curPage.options) // 传入参数
      curPage.onShow()
      curPage.onReady()
      // 执行刷新
    },

    toNext() {
      this.myList = [
        {
          content: '对',
          id: '1',
        },
        {
          content: '错',
          id: '0',
        },
      ]
      if (!this.answer.hasOwnProperty(this.questioncp[this.num].answer.id)) {
        this.showNotify()
        return
      }
      console.log('this.answer', this.questioncp)
      extraPointsForNewAnswers({
        phone: uni.getStorageSync('phone'),
        issueId: this.checkedAnswer.id,
        answers: this.checkedAnswer.answer,
      })
        .then(result => {
          answerPoints({ phone: uni.getStorageSync('phone') })
          this.num++
        })
        .catch(err => {
          setTimeout(() => this.num++, 1000)
          return
        })

      return
      if (!this.answer.hasOwnProperty(this.questioncp[this.num].answer.id)) {
        this.showNotify()
        return
      } else {
        if (!this.answer[this.questioncp[this.num].answer.id]) {
          // this.showNotify({
          // 	type: 'error',
          // 	message: '选项不正确,请重新选择'
          // });

          uni.showModal({
            title: '提示',
            content: '本次答题错误，是否继续，如继续答题将不会有对应的积分奖励',
            cancelText: '继续答题',
            confirmText: '重新开始',
            success: function (res) {
              console.log(res, '@@@')
              if (res.confirm) {
                // this.$router.go(0)
                uni.navigateBack()
                // uni.navigateTo({
                //   url: '/pages/center/index'
                // });

                console.log('222')
                // this.$nextTick(()=>{

                // })

                // this.$router.go(0)
                // this.onLoad()
              } else if (res.cancel) {
                this.num++
                this.flg = 2
                this.$emit('sendData', this.flg)
                console.log('用户点击取消')
              }
            }.bind(this),
          })

          return
        }
      }
    },
    showNotify(config = {}) {
      console.log('config', config)
      // this.$refs.uNotify.show({
      //   type: config.type != undefined ? config.type : 'warning',
      //   message:
      //     config.message != undefined ? config.message : '请选择正确的选项',
      //   safeAreaInsetTop: this.safeAreaInsetTop ? true : false,
      // })
      uni.showToast({
        title: '请选择答案',
        icon: 'none',
      })
    },
    hideNotify(config = {}) {
      this.$refs.uNotify.close()
    },

    toEnd() {
      if (!this.answer.hasOwnProperty(this.questioncp[this.num].answer.id)) {
        this.showNotify()
        return
      }
      extraPointsForNewAnswers({
        phone: uni.getStorageSync('phone'),
        issueId: this.checkedAnswer.id,
        answers: this.checkedAnswer.answer,
      })
        .then(result => {
          answerPoints({ phone: uni.getStorageSync('phone') })
          this.$emit('success', {
            answer: this.answer,
          })
        })
        .catch(err => {
          setTimeout(() => {
            this.$emit('success', {
              answer: this.answer,
            })
            uni.hideToast()
          }, 1000)
          return
        })
      return
      if (!this.answer.hasOwnProperty(this.questioncp[this.num].answer.id)) {
        this.showNotify()
        return
      } else {
        if (!this.answer[this.questioncp[this.num].answer.id]) {
          extraPointsForNewAnswers({
            phone: uni.getStorageSync('phone'),
            issueId: this.checkedAnswer.id,
            answers: this.checkedAnswer.answer,
          })
            .then(result => {
              console.log(result)
            })
            .catch(err => {})
          return
          uni.showModal({
            title: '提示',
            content: '本次答题错误，是否继续，如继续答题将不会有对应的积分奖励',
            cancelText: '提交答题',
            confirmText: '重新开始',
            success: function (res) {
              if (res.confirm) {
                uni.navigateBack()
                // this.$router.go(0)
                // uni.redirectTo({
                //   url: '/pages/invite/details'
                // });

                // this.$nextTick(()=>{

                // })

                // this.$router.go(0)
                // this.onLoad()
              } else if (res.cancel) {
                // this.num++
                this.flg = 2
                this.$emit('sendData', this.flg)
                this.hasData = false
                this.noData = true

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

                // uni.request({
                //   url: 'http://192.168.100.61:8089/mission_gh/xcx_api/bkbChoiceqst_answer/answerPoints',
                //   data: { //参数
                //     phone: uni.getStorageSync("phone", res.data.phone)
                //   },
                //   header: {
                //     'Content-Type': 'application/x-www-form-urlencoded'
                //     // 'Content-Type': 'application/json' //自定义请求头信息
                //   },
                //   method: 'GET', //请求方式，必须为大写
                //   success: (res) => {
                //     // console.log('接口返回------', res);
                //   }
                // })
              }
            }.bind(this),
          })

          return
        }
      }

      this.$emit('success', {
        answer: this.answer,
      })
    },

    // 弹窗消失
    closeMask() {
      this.show = false
    },
    goExplain() {
      uni.navigateTo({
        url: './explain',
      })
    },

    successFun() {
      this.hasData = false
      this.noData = true
    },
  },
}
</script>
<style>
page {
  background-color: #f5f5f5;
}
</style>
<style lang="scss" scoped>
@import '@/colorui/animation.css';
.questionBox {
  .mentalTitle {
    width: 688rpx;
    padding: 32rpx;
    margin: 40rpx auto;
    background: #ffffff;
    border-radius: 12rpx 12rpx 12rpx 12rpx;
    .questionType {
      display: inline;
      width: 80rpx;
      height: 38rpx;
      background: #1dd1923f;
      border-radius: 4rpx 4rpx 4rpx 4rpx;
      font-weight: 400;
      font-size: 22rpx;
      color: #1dd193;
      line-height: 38rpx;
      text-align: center;
      margin: 0 20rpx 0 10rpx;
      padding: 6rpx;
    }
    .questionTitle {
      .num {
        font-size: 24rpx;
        color: #999999;
      }
      display: inline-block;
      font-weight: bold;
      font-size: 28rpx;
      color: #262c35;
      line-height: 52rpx;
    }
  }
  .mentalList {
    width: 688rpx;
    /* height: 96rpx; */
    padding: 16rpx 0;
    line-height: 48rpx;
    background: #ffffff;
    border-radius: 8rpx 8rpx 8rpx 8rpx;
    border: 2rpx solid #1dd193;
    margin: 32rpx auto;
  }
}

.mainBox {
  padding: 20rpx 40rpx 20rpx 40rpx;

  .success {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 300rpx;
    .image-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 200px;
      background: #ffffff;
      border-radius: 50%;
      border: 20px solid #29ce8c;
      margin-bottom: 15px;
    }
  }
}

.explainMain {
  width: 100%;
  text-align: center;
  font-size: 24rpx;
  text-align: center;
  color: #999999;
}

.userHeard {
  position: absolute;
  left: 50%;
  top: -50rpx;
  margin-left: -50rpx;
}

.mentalTitle {
  margin: 0 0 30rpx 0;
}

.mentalList {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .icon {
    display: block;
    flex-basis: 50rpx;
  }

  .mentalItem {
    display: flex;
    width: 100%;
    min-height: 78rpx;
    flex: 1;
    height: 0;
    padding-left: 20rpx;
    border-radius: 12rpx;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .indexBox {
    // width: 70rpx;
    padding-right: 10rpx;
    height: 100%;
    display: flex;
    align-items: center;
    text-align: center;
    // background-color: #dddddd;

    // border-top-left-radius: 12rpx;
    // border-bottom-left-radius: 12rpx;

    .circle {
      width: 35rpx;
      height: 35rpx;
      background: #ffffff;
      border-radius: 50%;
      border: 5rpx solid #1dd093;

      &.checked {
        border: 10rpx solid #1dd093;
      }
    }
  }

  .rightBox {
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // border: 1px solid #dddddd;
    border-left: 0;
    /* background-color: #fff; */
    padding: 0 15rpx;
    // border-top-right-radius: 12rpx;
    // border-bottom-right-radius: 12rpx;
  }

  .mentalItem.active {
    // color: $u-primary;

    .indexBox {
      // background-color: $u-primary;
      // color: #ffffff;
    }

    .rightBox {
      // border-color: $u-primary;
    }
  }
}

.btns {
  width: 688rpx;
  margin: 0 auto;
  .btn {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background-color: #29ce8c;

    &.disabled {
      background: #cccccc;
    }
  }
}
</style>
