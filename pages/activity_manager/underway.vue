<template>

	<view class="mainBox bg-white">
		<u-loading-page :loading="pageLoading"></u-loading-page>
		<view class="content u-flex-col" v-if="!pageLoading">
			<view class="title u-flex-1 u-p u-flex-col">
				<view class="title-box">
					<u--text align="center" size="16" bold :text="title">
					</u--text>
				</view>
				<view class="u-p-t u-flex" v-if="detail.status==actStatus.success">

					<u--text align="center" size="14" type="info" :text=" detail.activity_time | minTime|textMinTime">
					</u--text>

				</view>
			</view>

			<view class="desc u-flex-1 u-p">
				<view class="btns u-flex-1 u-flex">
					<view class="u-flex-1 u-p-r" v-if="detail.status==actStatus.underway">
						<u-button :loading="btnLoading" type="warning" text="结束活动" @click="handleEnd">
						</u-button>
					</view>
					<view class="u-flex-1 u-p-l">
						<u-button type="info" text="返回主页" @click="goBack()">
						</u-button>
					</view>

				</view>

			</view>
		</view>

		<u-modal :show="show" @confirm="confirm" ref="uModal" :asyncClose="true" showCancelButton
			@cancel="this.show=false" title="提示" content="是否结束此活动?">
		</u-modal>
	</view>
</template>

<script>
	import {
		actStatus
	} from '@/common/enums/activity.js'
	var duration = require('dayjs/plugin/duration')
	import {
		speechoractivityend,
		activityone

	} from '@/common/api.js'
	import dayjs from 'dayjs'
	dayjs.extend(duration)
	export default {
		data() {
			return {
				pageLoading: true,
				globalData: getApp().globalData,
				btnLoading: false,
				show: false,
				actStatus: actStatus,
				id: '',
				detail: {
					name_of_activity: '',
					type: '',
					status: '',
					act_status: '',
					the_activity_time: '',
					create_time: '',
					start_date: '',
					comment: null,

				}
			}
		},
		computed: {
			title() {
				if (this.detail.status == actStatus.underway) {
					return '宣教垃圾分类活动进行中'
				}
				return '活动结束'
			}

		},
		filters: {
			textMinTime(val) {
				return `本次活动时长：${val}`
			}
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: '活动进行中'
			})

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
		onReady() {


		},
		methods: {
			getDetail() {
				// activityone({
				// 	id: this.id
				// }).then((res) => {
				// 	this.detail = res.data
				// 	this.pageLoading = false;



				// })
				uni.request({
					url: `https://gh.api.cestech.com.cn:8240/mission_gh/v1/2/activity/one?id=${this.id}`,
					header: {
						'x-Resource-Token':uni.getStorageSync('xtoken'),
						//'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
					},
					method: "GET",
					success: (res) => {
						console.log(res.data.result, 'xxxx')
						this.pageLoading = false;
						this.detail = res.data.result.activity

					}

				})
			},
			handleEnd() {
				this.show = true
			},
			confirm() {

				uni.request({
					url: `https://gh.api.cestech.com.cn:8240/mission_gh/v1/2/speechor/activity/end?id=${this.id}`,
					header: {
						'x-Resource-Token':uni.getStorageSync('xtoken'),
						//'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
					},
					method: "POST",
					success: (res) => {
						this.$refs.uModal.loading = false;
						uni.$emit('refreshList')
						this.detail = res.data.result;
						this.show = false;
						uni.$u.route({
							type: 'navigateBack',
							delta: 1

						})
						uni.showToast({
							title: '活动已结束',
							icon: 'success',
						});
					}

				})
				// speechoractivityend({
				//   id: this.id,
				// }).then(({
				//   data,
				//   msg
				// }) => {
				//   this.$refs.uModal.loading = false;
				//   uni.$emit('refreshList')
				//   this.detail = data;
				//   this.show = false;
				//   uni.$u.route({
				//     type: 'navigateBack',
				//     delta: 1

				//   })
				//   uni.showToast({
				//     title: msg,
				//     icon: 'success',
				//   });
				// }).finally(() => {
				//   this.$refs.uModal.loading = false;
				// })
			},
			goBack() {
				uni.$u.route({
					type: 'navigateBack',
					delta: 1

				})
			}


		}
	}
</script>

<style lang="scss" scoped>
	.mainBox {
		height: 100vh;
		width: 100%;


		.content {
			width: 100%;
			height: 100%;

			.title-box {
				// border: 1px solid;
				width: 100%;
				padding: 60rpx;
				padding-bottom: 0px;
				border-radius: 5px;
			}

			.title-desc {
				width: 100%;
			}

			.title {
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.btns {
				display: flex;
				align-items: flex-start;
			}
		}


	}
</style>