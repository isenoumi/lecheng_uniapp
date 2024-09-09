<template>
	<view>
		<locationNavbar title="活动管理" maxWidth="250rpx" />
		<view class="u-p">
			<uni-segmented-control :current="subsectionCurrent" :values="subsectionList"
				:active-color="globalData.theme['$u-primary']" @clickItem="subsectionChange" />
		</view>
		<z-paging ref="paging" v-model="dataList" @query="queryList" use-page-scroll>
			<view class="content u-p-l u-p-r">
				<activityCard v-for="(item, index) in dataList" :key="index" :item.sync="item" :index="index"
					@changeBooked="changeBooked">
				</activityCard>

			</view>
		</z-paging>

	</view>

</template>

<script>
	import {
		actStatus
	} from '@/common/enums/activity.js'
	import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'
	import {
		mapState
	} from 'vuex'
	import activityCard from './components/activity-card.vue'
	import locationNavbar from '@/pages/index/components/location-navbar.vue'

	import {
		activitylist
	} from '@/common/api.js'
	export default {
		components: {
			activityCard,
			locationNavbar
		},
		mixins: [ZPMixin],
		data() {
			return {
				globalData: getApp().globalData,
				dataList: [],
				subsectionList: ['待开始', '进行中', '已结束'],
				subsectionCurrent: 0,
			}
		},
		computed: {
			...mapState({
				location: state => state.location,
				customer: state => state.customer,
			}),
			region() {
				if (this.location) {
					return this.location.region
				}
				return ''
			},
			status() {
				if (this.subsectionCurrent == 0) {
					return actStatus.popular
				} else if (this.subsectionCurrent == 1) {
					return actStatus.underway
				}
				return actStatus.success

			}

		},
		watch: {
			customer(val) {
				this.$refs.paging.reload()
			}
		},
		onLoad() {


		},

		methods: {
			subsectionChange(e) {
				if (this.current != e.currentIndex) {
					this.subsectionCurrent = e.currentIndex;
					this.$refs.paging.reload()
				}

			},
			changeBooked({
				index,
				key,
				value
			}) {
				this.$set(this.dataList[index], key, value)
			},
			queryList(page, list_rows) {
				//显示加载框


				// if (!this.customer) {
				// 	this.$refs.paging.complete([]);
				// 	return;
				// }
				const userId = uni.getStorageSync('users').records[0].id
				uni.request({
					url: 'https://gh.api.cestech.com.cn:8240/mission_gh/v1/activity/list',
					header: {
						'x-Resource-Token':uni.getStorageSync('xtoken'),
						//'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
					},
					data: {
						pageNo: page,
						pageSize: list_rows,
						status: this.status,
						customer_id: 1,
					},
					method: "GET",
					success: (res) => {
						if (res.data.code == 200) {
							console.log(res.data.result, 'xxxx1')
							res.data.result.records.forEach(item => {
								uni.request({
									// url: `https://gh.api.cestech.com.cn:8240/mission_gh/v1/2/book/subscribe?user_id=${userId}&bookId=${item.id}`,
									url: `https://gh.api.cestech.com.cn:8240/mission_gh/v1/2/book/subscribe?bookId=${item.id}`,
									header: {
										'x-Resource-Token':uni.getStorageSync('xtoken'),
										//'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
									},
									method: "POST",
									success: (res) => {
										item.booked = res.data
										console.log(res);
									}

								})
							})


							this.$refs.paging.complete(res.data.result.records);
						}

					}

				})
				// activitylist({
				// 	customer_id: 1,
				// 	status: this.status,
				// 	page: page,
				// 	list_rows: list_rows
				// }).then((res) => {

				// 	this.$refs.paging.complete(res.data.data);
				// }).catch(res => {
				// 	console.log(res)
				// 	//如果请求失败写this.$refs.paging.complete(false)，会自动展示错误页面
				// 	//注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
				// 	//在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
				// 	this.$refs.paging.complete(false);
				// })


			},
			goActivitydetail(item) {

				uni.$u.route({
					url: 'pageC/knowledge/detail',
					params: {
						id: item.knowledge_id,

					}
				})



			},
			goLocation() {
				uni.navigateTo({
					url: '/pages/index/city'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>