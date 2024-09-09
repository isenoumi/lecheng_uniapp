<!-- 查看视频 -->
<template>
	<view class="container">
		<!-- <u-loading-page :loading="pageLoading"></u-loading-page> -->
		<view>
			<view class="title u-flex-col u-p">
				<u-avatar size="80" :src="detail.userAvatar">
				</u-avatar>

				<view class=" u-m-t">
					<u--text align="center" size="15" :text="detail.userName"></u--text>
				</view>
			</view>
			<u-divider></u-divider>
			<view class="content rate u-p">
				<view class="item u-p-b">
					<u--text text="1、活动效果如何（1-5分)"></u--text>
					<view class="value">
						<u--text type="info" :text="`${detail.grade1}分`"></u--text>
					</view>
				</view>

				<view class="item u-p-b">
					<u--text text="2、本次活动是否有用（1-5分）"></u--text>
					<view class="value">
						<u--text type="info" :text="`${detail.grade2}分`"></u--text>
					</view>
				</view>
				<view class="item u-p-b">
					<u--text text="3、讲师是否表达清晰（1-5分）"></u--text>
					<view class="value">
						<u--text type="info" :text="`${detail.grade3}分`"></u--text>
					</view>
				</view>
				<view class="item u-p-b">
					<u--text text="4、其他建议"></u--text>
					<view class="value">
						<u--text type="info" :text="`${detail.comment}`"></u--text>
					</view>
				</view>

			</view>



		</view>
	</view>


	</view>
</template>

<script>
	import {
		commentone
	} from '@/common/api.js'


	export default {
		components: {

		},
		data() {
			return {
				pageLoading: true,
				globalData: getApp().globalData,
				id: null,
				detail: {
					"id": "",
					"user_id": "",
					"user_name": "",
					"user_avatar": "",
					"customer_id": "",
					"act_id": "",
					"grade1": "",
					"grade2": "",
					"grade3": "",
					"comment": "",
					"create_time": "",

				},


			}
		},
		onLoad(option) {
			if (option.id) {
				this.id = option.id
				this.detail = JSON.parse(option.item)
				// this.getDetail();
			} else {
				uni.$u.route({
					type: 'navigateBack',
					delta: 1

				})
				return
			}

		},
		computed: {},

		methods: {
			subsectionChange(e) {
				if (this.current != e.currentIndex) {
					this.subsectionCurrent = e.currentIndex;
				}

			},

			getDetail() {



				uni.request({
					url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbTrainingTask/activitySonLook`,
					header: {
						'x-Resource-Token':uni.getStorageSync('xtoken'),
						//'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
					},
					data: {
						id: this.id,
						user_avatar: uni.getStorageSync('avatarUrl'),
						username: uni.getStorageSync('nikename')
					},
					method: "GET",
					success: (res) => {
						console.log(res, 'xxxx1')
						this.pageLoading = false;
						this.detail = res.data.result

					}
				})
				// commentone({
				//     id: this.id
				// }).then((res) => {
				//     this.detail = res.data
				//     this.pageLoading = false;


				// })

			},
			toDetail() {
				uni.$u.route({
					url: 'pages/activity_manager/evaluate_detail',
					params: {
						id: '123',

					}
				})
			}

		}
	}
</script>

</style>
<style lang="scss" scoped>
	page {
		background-color: #fff;
	}

	.title {
		align-items: center;
	}
</style>