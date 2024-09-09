<template>
	<view>
		<z-paging ref="paging" v-model="dataList" @query="queryList">
			<view slot="top">
				<locationNavbar title="课程列表" maxWidth="250rpx" />
			</view>
			<view class="content u-p">
				<typeCard v-for="(item, index) in dataList" :key="index" :item="item"
					@click.native="goknowledgedetail(item)">
				</typeCard>
				<!--       <courseCard v-for="(item, index) in dataList" :key="index" :item="item"
                    @click.native="goknowledgedetail(item)"></courseCard> -->

			</view>



		</z-paging>
		<auth ref="auth" />

	</view>

</template>

<script>
	import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'
	import auth from '@/util/mixin/auth/auth.vue'
	import authMixin from '@/util/mixin/auth/auth.js'

	import {
		mapState
	} from 'vuex'
	// import courseCard from './components/course-card.vue'
	import locationNavbar from '@/pages/index/components/location-navbar.vue'
	import typeCard from './components/type-card.vue'

	import {
		courselistbycustomer
	} from '@/common/api.js'
	export default {
		components: {
			typeCard,
			locationNavbar,
			auth
		},
		mixins: [ZPMixin, authMixin],
		data() {
			return {
				dataList: [],

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
			}

		},
		watch: {
			customer(val) {
				this.$refs.paging.reload()
			}
		},
		onShow() {
			// this.commonCheckAuth(true)


		},
		methods: {
			queryList(page, list_rows) {
				uni.request({
					url: 'https://gh.api.cestech.com.cn:8240/mission_gh/v1/course/list_by_customer',
					header: {
						'x-Resource-Token':uni.getStorageSync('xtoken'),
						//'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
					},
					data: {
						pageNo: page,
						pageSize: list_rows,
						customer_id: 1,
					},
					method: "GET",
					success: (res) => {
						console.log(res.data.result.records, 'xxxx')
						this.$refs.paging.complete(res.data.result.records);
						// res.data.result.records.forEach(v => {
						//   console.log(v.points, 'vvvv')
						//   // v.knowledge["points"] = v.points;
						//   // console.log(v,'我是v')
						// })
						// this.$refs.paging.complete(res.data.result.records);
						// console.log(res.data.result.records, 'res.data.data')

					}

				})

				// courselistbycustomer({
				//     customer_id:1,
				//     page: page,
				//     list_rows: list_rows
				// }).then((res) => {
				//     this.$refs.paging.complete(res.data.data);
				// }).catch(res => {
				//     console.log(res)
				//     //如果请求失败写this.$refs.paging.complete(false)，会自动展示错误页面
				//     //注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
				//     //在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
				//     this.$refs.paging.complete(false);
				// })


			},
			goknowledgedetail(item) {
				// if (this.commonCheckAuth()) {
				if (uni.getStorageSync("phone")) {
					uni.$u.route({
						url: 'pageC/course/detail',
						params: {
							id: item.id,
							points: item.points,
							points_acquisition_rule: item.pointsAcquisitionRule,
							title: item.name
						}
					})
				} else {
					// this.commonCheckAuth(true)

					uni.showModal({
						title: '提示',
						content: '当前未登录，点击前往登录',
						cancelText: '取消',
						confirmText: '前往登录',
						success: (res) => {
							if (res.confirm) {

								uni.switchTab({
									url: '/pages/center/index'
								})
							}
						}
					})

				}

			},
			goLocation() {
				uni.$u.route({
					url: '/pages/index/city'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>