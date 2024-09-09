<template>
	<view class="z-card4">
		<uni-card :title="item.name" :extra="item.status|statusText">
			<view class="u-flex u-row-between">
				<view class="u-flex-1">
					<u--text size="13" :text="`开始时间：${item.startDate}`">
					</u--text>
				</view>
				<view>
					<u--text size="13" :text="item.type|activityTypeText|typeText">
					</u--text>
				</view>

			</view>

			<view slot="actions" class="card-actions">

				<view class="card-actions-item" @click="goDetail(item)" v-if="item.status!=actStatus.success">
					<u--text size="14" text="查看详情">
					</u--text>
				</view>
				<view class="card-actions-item" @click="subscribe(item)"
					v-if="!item.booked&&item.status==actStatus.popular">
					<u--text size="14" text="预约">
					</u--text>
				</view>
				<view class="card-actions-item" v-if="item.booked&&item.status==actStatus.popular">
					<u--text size="14" type="info" text="已预约">
					</u--text>
				</view>
				<view class="card-actions-item" @click="goEvaluate(item)" v-if="item.status==actStatus.underway">
					<u--text size="14" text="评价活动">
					</u--text>
				</view>
				<view class="card-actions-item" @click="goSuccessDetail(item)" v-if="item.status==actStatus.success">
					<u--text size="14" text="查看评价">
					</u--text>
				</view>

			</view>
		</uni-card>

		<u-modal :show="show" @confirm="subscribeSubmit" ref="uModal" :asyncClose="true" showCancelButton
			@cancel="this.show=false" title="提示" content="      是否预约此活动？">

		</u-modal>


	</view>
</template>

<script>
	import {
		actStatus
	} from '@/common/enums/activity.js'
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
				if (val == actStatus.popular) {
					return '待开始'
				} else if (val == actStatus.underway) {
					return '进行中'
				} else if (val == actStatus.success) {
					return '已结束'
				}
				return ''

			},
			typeText(val) {
				return '活动类型：' + val
			}
		},
		data() {
			return {
				show: false,
				actStatus: actStatus,
				modal: {
					item: null,
					img: []
				}
			}
		},
		computed: {

		},
		onLoad() {
			console.log(11);

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

				const userId = uni.getStorageSync("users").id
				// if(uni.getStorageSync('avatarUrl')){
				this.$refs.uModal.loading = false

				uni.request({
					url: `https://gh.api.cestech.com.cn:8240/mission_gh/v1/2/book/add`,
					header: {
						'x-Resource-Token': uni.getStorageSync('xtoken'),
						//'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
					},
					data: {
						bookId: this.item.id,
						bookType: 'act'
					},
					method: "POST",
					success: (res) => {
						console.log(res.data.result);
						this.$refs.uModal.loading = false;
						this.$emit('changeBooked', {
							index: this.index,
							key: 'booked',
							value: true
						})


						this.show = false;
						uni.showToast({
							title: '预约成功',
							icon: 'success',
						});

						authorize.requestSubscribeMessage(templateIds.activity).then((res) => {

						})
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
					url: 'pages/activity_manager/detail',
					params: {
						id: item.id,

					}
				})

			},
			goSuccessDetail(item) {
				uni.$u.route({
					url: 'pageA/activity/evaluate_detail',
					params: {
						id: item.id,

					}
				})
			},
			goEvaluate(item) {
				if (uni.getStorageSync('avatarUrl')) {
					uni.$u.route({
						url: 'pageA/activity/evaluate',
						params: {
							id: item.id,

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

					// console.log('333');
				}

			},

		}

	}
</script>

<style scoped lang="scss">

</style>