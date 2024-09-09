<template>
	<view class="content">
		<u-notify ref="uNotify"></u-notify>
		<!-- 答题主页面 -->
		<view>
			<view class="mainBox radius  bg-white">
				<view v-if="hasData">
					<view class="u-flex u-row-between">
						<view class="u-flex">
							<view class="">
								<u--text type="info" :text="num+1"></u--text>
							</view>
							<view class="">
								<u--text type="info" text="/"></u--text>
							</view>
							<view class="">
								<u--text type="info" :text="questioncp[0].length"></u--text>
							</view>
						</view>
						<u--text type="info" align="right" :text="questioncp[0][num].choiceType==0?'单选题':'多选题'">
						</u--text>

					</view>
					<u-line margin="10px 0px" color="#dddddd"></u-line>
					<view class="animation-reverse" :class="animation" data-class="slide-rights">
						<view class="mentalTitle">
							<mp-html :content="questioncp[0][num].choiceqstContent" />
						</view>
						<view class="mentalList" v-for="(item, index) in questioncp[0][num].answer"
							@tap.stop="Toggle(item,index)">
							<view class="mentalItem" v-bind:class="{ active: item.checked }">
								<view class="indexBox ">
									<!--            <u--text  align="center" :color="item.checked?'#fff':''" bold
                                        :text="index|answerIndex"></u--text> -->
									<view class="circle" :class='{checked:item.checked}'>

									</view>
								</view>


								<view class="rightBox">
									<u--text align="left" bold :text=" item.content"></u--text>
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
					<u-tabbar :fixed="true" :placeholder="true" :safeAreaInsetBottom="true">
						<view class="btns u-flex"
							:class="{'u-row-right':num!=questioncp[0].length,'u-row-between':num!=0}">
							<view class="btn" @click="toPre" :class='{disabled:num==0}'>
								上一题
							</view>
							<view class="btn" v-if="(num+1)!=questioncp[0].length" @click="toNext"
								:class='{disabled:disabledBtn}'>
								下一题
								<!-- <u-button :disabled="disabledBtn" text="下一题" @click="toNext"></u-button> -->
							</view>
							<view class="btn" v-if="(num+1)==questioncp[0].length" :class='{disabled:disabledBtn}'
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
						<u--image :showLoading="true"
							src="http://cdn.cestech.com.cn/BkpKnowledge/img/a908858bf4e44fa1ace68675c8e74a47.png"
							width="140px" height="140px">
						</u--image>
					</view>
					<u--text size="15" align="center" bold text="恭喜!答题完成"></u--text>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		add_points
	} from '@/common/api.js'
	export default {
		filters: {
			answerIndex(val) {
				const Arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
				return Arr[val] || ''
			}
		},
		props: {
			question: {
				default: [],
				type: Array
			},
			details: {
				default: [],
				type: Array
			},
			is_answer: {
				default: true,
				type: Boolean
			},
			btnLoading: {
				default: false,
				type: Boolean
			},
			safeAreaInsetTop: {
				default: true,
				type: Boolean
			},
			ids: {
				type: String,
				default: null
			}
		},
		data() {
			return {
				ids: '',
				globalData: getApp().globalData,
				num: 0,
				animation: '',
				questioncp: [],
				detail: [],
				answer: {},
				notify: {
					message: '123',
					show: true,
					type: "warning"
				}

			};
		},

		watch: {
			question: {
				handler(val) {
					this.questioncp = val
					console.log(this.questioncp[this.num], '大图')
				},
				deep: true,
				immediate: true
			},
			ids: {
				handler: function(val) {
					console.log(val, '我是id')
					this.ids = val
				},
				deep: true,
				immediate: true
			}
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
				if (this.questioncp[0].length <= 0) {
					return true;
				}

				return false;

			},
			hasData() {
				if (this.is_answer == true) {
					return false;
				}
				if (this.questioncp[0].length > 0) {
					return true;
				}
				return false;
			},
			noData() {
				if (this.is_answer == true) {
					return true;
				}

				return false;
			},

		},
		methods: {
			Toggle(info, index) {
				let questioncp = this.questioncp[0][this.num] //每题
				let option = this.questioncp[0][this.num].answer //每一题题目的选项

				let answer = []
				let right = true //题目中的答案

				//选中添加样式
				option.forEach((item, index) => {
					if (item.id == info.id) { //如果选中的与数据里面的相等就改变他的样式
						let checked = item.hasOwnProperty('checked') ? item.checked : false
						this.$set(this.questioncp[0][this.num].answer[index], 'checked', !checked)

					} else if (questioncp.choiceType == 0) { //如果不是多选 只能选中一个 其他的都为false
						this.$set(this.questioncp[0][this.num].answer[index], 'checked', false)

					}
					if (item.checked) {
						answer.push(item.id)
					}
					// 判断正确与否
					if (!((item.rightAnswer && item.checked) || (!item.rightAnswer && !item.checked))) {
						right = false;
					}
				});
				this.hideNotify()
				this.$set(this.answer, this.questioncp[0][this.num].id, right)

			},
			toPre() {
				if (this.num == 0) {
					return;
				}
				this.num--
			},
			toNext() {

				if (!this.answer.hasOwnProperty(this.questioncp[0][this.num].id)) {
					this.showNotify();
					return;

				} else {
					if (!this.answer[this.questioncp[0][this.num].id]) {
						this.showNotify({
							type: 'error',
							message: '选项不正确,请重新选择'
						});
						return;
					}
				}
				this.num++
			},
			showNotify(config = {}) {
				this.$refs.uNotify.show({

					type: config.type != undefined ? config.type : 'warning',
					message: config.message != undefined ? config.message : '请选择正确的选项',
					safeAreaInsetTop: this.safeAreaInsetTop ? true : false
				})
			},
			hideNotify(config = {}) {
				this.$refs.uNotify.close()
			},


			toEnd() {

				if (!this.answer.hasOwnProperty(this.questioncp[0][this.num].id)) {
					this.showNotify();
					console.log('对')

					return;

				} else {

					if (!this.answer[this.questioncp[0][this.num].id]) {
						console.log('错')
						this.showNotify({
							type: 'error',
							message: '选项不正确,请重新选择'
						});
						return;
					}
				}
				uni.request({
					url: 'https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbTrainingCourseReservation/submit',
					header: {
						'x-Resource-Token':uni.getStorageSync('xtoken'),
						//'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
					},
					data: {
						id: this.ids,
						status: 3,
						nickName: uni.getStorageSync('nikename')
					},
					method: "GET",
					success: (res) => {
						// this.pageLoading = false;
						// console.log(res.data.result, 'xxxxxxxxx')
						// this.question.push(res.data.result)
						// this.is_answer = res.data.result.is_answer
						// console.log(res.data.result.is_answer, 'xxxxxxxxx')
						// this.pageLoading = false;

					}

				})
				// if (this.details.slice(-1)[0].points_acquisition_rule === 3) {
				// 	if (uni.getStorageSync('avatarUrl')) {
				// 		add_points({
				// 			source_type: 3,
				// 			get_type: 2,
				// 			source_id: this.details.slice(-1)[0].id,
				// 			points: this.details.slice(-1)[0].points,
				// 			title: this.details.slice(-1)[0].knowledge_title
				// 		}).then(res => {
				// 			uni.showToast({
				// 				icon: 'success',
				// 				title: '恭喜获得答题积分'
				// 			})
				// 		})
				// 	}




				// }
				this.$emit('success', {
					answer: this.answer,
				})
			},
			// 弹窗消失
			closeMask() {
				this.show = false;
			},
			goExplain() {
				uni.navigateTo({
					url: './explain'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/colorui/animation.css';


	.mainBox {
		padding: 20rpx 40rpx 20rpx 40rpx;

		.success {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.image-box {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 200px;
				height: 200px;
				background: #FFFFFF;
				border-radius: 50%;
				border: 20px solid #29CE8C;
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
			// padding-right: 20rpx;
			border-radius: 12rpx;
			margin: 30rpx 0;
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
				background: #FFFFFF;
				border-radius: 50%;
				border: 5rpx solid #1DD093;

				&.checked {
					border: 10rpx solid #1DD093;
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
			background-color: #fff;
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
		width: 100%;

		.btn {
			flex: 1;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			background-color: #29CE8C;

			&.disabled {
				background: #CCCCCC;

			}
		}
	}
</style>