<!-- 新闻 详情 -->
<template>
	<view class="container">
		<view class="u-nav">
			<navbar :safeAreaInsetTop="true" :allTitle="false" placeholder height="55"
				imageSrc="http://cdn.cestech.com.cn/BkpKnowledge/img/9bfc5177f12447f5b2c5f3c618679068.jpg" autoBack>
				<view class="u-nav-slot" slot="center">
					<u--text text="课程详情"></u--text>
				</view>
			</navbar>

		</view>
		<u-loading-page :loading="pageLoading"></u-loading-page>
		<view v-if="!pageLoading" style="background-color: #FFFFFF;padding: 30rpx 30rpx 30rpx 30rpx;">
			<view class="titleBox text-xl text-black text-bold">{{detail.title||''}}</view>
			<view class="u-m-t u-m-b">
				<u--text type="info" size="13" :text="detail.create_time|dateFormat">
				</u--text>
			</view>
			<u-line></u-line>
			<!-- 中间文章区域 -->
			<view class="u-m-t">
				<mp-html :content="detail.content" />
			</view>
		</view>

	</view>
</template>

<script>
	import {
		courseknowledgeread,
		knowledge
	} from '@/common/api.js'

	export default {

		data() {
			return {
				id: null,
				study: false,
				pageLoading: true,
				detail: {
					title: '',
					create_time: '',
					content: '',
					type: ''
				},
				relation: {
					course_id: null,
				}

			}
		},
		onLoad(option) {
			if (option.id && option.course_id && option.study) {
				this.id = option.id
				this.relation.course_id = option.course_id
				this.study = option.study
				// this.detail.content=option.content
				// this.detail.createTime=option.createTime
				this.getDetail();
			} else {
				uni.$u.route({
					type: 'navigateBack'

				})
				return
			}

		},
		computed: {

		},
		methods: {
			onShareAppMessage(res) {
				return {
					title: '',
				}
			},
			getDetail() {

				uni.request({
					url: 'https://gh.api.cestech.com.cn:8240/mission_gh/v1/2/cultura/id_list',
					header: {
						'x-Resource-Token':uni.getStorageSync('xtoken'),
						//'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
					},
					data: {
						id: this.id
					},
					method: "GET",
					success: (res) => {
						console.log(res.data.result, 'xxxx')
						this.pageLoading = false;
						this.detail = res.data.result
						// 课程阅读记录
						if (this.study == 0) {
							this.courseknowledgeread()
						}

					}

				})

				// knowledge({
				//     id: this.id
				// }).then((res) => {
				//     this.pageLoading = false;
				//     this.detail = res.data
				//     // 课程阅读记录
				//     if (this.study == 0) {
				//         this.courseknowledgeread()
				//     }

				// })

			},
			courseknowledgeread() {
				uni.request({
					url: 'https://gh.api.cestech.com.cn:8240/mission_gh/v1/theCourseIsLearningToSave',
					header: {
						'x-Resource-Token':uni.getStorageSync('xtoken'),
						//'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
					},
					data: {
						// UserId: uni.getStorageSync('users').id,
						RelationId: this.id
					},
					method: "GET",
					success: (res) => {
						uni.$emit("refreshCourseDetail", {
							id: this.relation.course_id,
							knowledge_id: this.id
						})

					}

				})


				// courseknowledgeread({
				//     id: this.relation.course_id,
				//     knowledge_id: this.id
				// }).then((res) => {
				//     uni.$emit("refreshCourseDetail", {
				//         id: this.relation.course_id,
				//         knowledge_id: this.id
				//     })
				// })
			}


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