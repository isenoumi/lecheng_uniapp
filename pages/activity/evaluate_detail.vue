<!-- 查看视频 -->
<template>
	<view class="container">
		<u-loading-page :loading="pageLoading"></u-loading-page>
		<view v-if="!pageLoading">
			<view class="z-form-text u-p">
				<view class="z-form-item">
					<view class="z-form-item__body">
						<view class="z-form-item__body__left">
							<u--text text="负责人:"></u--text>
						</view>
						<view class="z-form-item__body__right">
							<u--text wordWrap="anywhere" :text="speaker? speaker.name:''">
							</u--text>

						</view>
					</view>
					<u-line color="rgb(214, 215, 217)"></u-line>
				</view>
				<view class="z-form-item">
					<view class="z-form-item__body">
						<view class="z-form-item__body__left">
							<u--text text="活动时长:"></u--text>
						</view>
						<view class="z-form-item__body__right">
							<u--text wordWrap="anywhere" :text="detail.activityTime">
							</u--text>

						</view>
					</view>
					<u-line color="rgb(214, 215, 217)"></u-line>
				</view>


				<view class="z-form-item ">
					<view class="z-form-item__body_col">
						<view class="z-form-item__body__left">
							<u--text text="我的评价:"></u--text>
						</view>
						<view class="title u-flex u-p" v-if="comment">
							<u-avatar size="40" :src="comment.user_avatar">
							</u-avatar>
							<view class="u-p-l">
								<u--text align="center" size="15" :text="comment.userName"></u--text>
							</view>
						</view>
						<view class="z-form-item__body__right">

							<view class="content rate u-p" v-if="comment">
								<view class="item u-p-b ">
									<u--text text="1、活动效果如何（1-5分)"></u--text>
									<view class="value">
										<u--text type="info" :text="`${comment.grade1}分`"></u--text>
									</view>


								</view>

								<view class="item u-p-b">
									<u--text text="2、本次活动是否有用（1-5分）"></u--text>
									<view class="value">
										<u--text type="info" :text="`${comment.grade2}分`"></u--text>
									</view>
								</view>
								<view class="item u-p-b">
									<u--text text="3、讲师是否表达清晰（1-5分）"></u--text>
									<view class="value">
										<u--text type="info" :text="`${comment.grade3}分`"></u--text>
									</view>
								</view>
								<view class="item u-p-b">
									<u--text text="4、其他建议"></u--text>
									<view class="value">
										<u--text type="info" :text="`${comment.comment}`"></u--text>

									</view>
								</view>

							</view>


							<view class="content u-flex u-row-center" v-else>
								<u-empty mode="comment" icon="https://cdn.uviewui.com/uview/empty/comment.png"
									text="暂无评价">
								</u-empty>
							</view>
						</view>
					</view>

				</view>

			</view>
		</view>
	</view>


	</view>
</template>

<script>
	import {
		activityone,
	} from '@/common/api.js'


	export default {
		components: {

		},
		data() {
			return {
				speaker: '',
				comment: null,
				pageLoading: true,
				globalData: getApp().globalData,
				id: null,
				detail: {
					name_of_activity: '',
					type: '',
					the_activity_time: '',
					create_time: '',
					start_date: '',
					comment: null,

				}
			}
		},
		onLoad(option) {
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
		onUnload() {

		},
		computed: {},

		methods: {


			getDetail() {
				// activityone({
				//   id: this.id,
				//   comment: true
				// }).then((res) => {
				//   this.detail = res.data
				//   this.pageLoading = false;


				// })

				// uni.request({
				//   url: `https://gh.api.cestech.com.cn:8240/mission_gh/v1/2/activity/commentlist/id?id=${this.id}`,
				//   method: "GET",
				//   success: (res) => {
				//     console.log(res.data.result, 'xxxx')
				//     this.pageLoading = false;
				//     this.detail = res.data.result

				//   }

				// })
				console.log(111);
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
						this.speaker = res.data.result.Speaker


					}

				})
				const userid = uni.getStorageSync('users').id
				uni.request({
					url: `https://gh.api.cestech.com.cn:8240/mission_gh/v1/2/speechor/activity/commentlist?id=${this.id}&pageNo=1&pageSize=10`,
					header: {
						'x-Resource-Token':uni.getStorageSync('xtoken'),
						//'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
					},
					method: "GET",
					success: (res) => {
						console.log(res.data.result.records);
						this.comment = res.data.result.records[0]
						console.log(this.comment);
					}

				})

			},


		}
	}
</script>

</style>
<style lang="scss" scoped>
	page {
		background-color: #fff;
	}

	.title {}
</style>