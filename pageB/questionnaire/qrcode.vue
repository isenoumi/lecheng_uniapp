<template>

	<view class="mainBox bg-white">
		<view class="padding text-center margin-top-xl">
			<view class="padding-xl radius  bg-white margin-top">

				<view class="image u-flex u-row-center">
					<u--image :showLoading="true" radius="5" :src="src" height="300">

						<u-loading-icon></u-loading-icon>
						<view slot="error" style="font-size: 24rpx;">
							加载失败
						</view>
					</u--image>
				</view>
				</u-button>
				<view class="info u-p">
					<u--text align="center" type="info" text="扫一扫上面的二维码图案，可对此问卷进行反馈"></u--text>
				</view>

			</view>
		</view>



	</view>
</template>

<script>
	import {
		supervisortaskqrcode
	} from '@/common/api.js'
	export default {
		data() {
			return {
				src: '',
				id: ''
			}
		},
		computed: {


		},

		onLoad(option) {


			if (option.id) {
				this.id = option.id
				this.supervisortaskqrcode(option.id);
			} else {
				uni.showToast({
					title: '无法生成',
					icon: 'none'

				})
			}

		},
		methods: {
			supervisortaskqrcode(id) {
				uni.request({
					url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/WxApi/getInvitationCode?id=${this.id}`,
					header: {
						'x-Resource-Token':uni.getStorageSync('xtoken'),
						//'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
					},
					// data: {
					//   id: this.id
					// },
					method: "POST",
					success: (res) => {
						console.log(res, 'cc')
						this.src = res.data.result
						// 		this.mescroll.endSuccess(res.data.result.records.length);

						// 		//设置列表数据
						// 		if (page.num == 1) this.listData = []; //如果是第一页需手动制空列表
						// 		this.listData = this.listData.concat(res.data.result.records); //追加新数据

					}
				})
			},

			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},


		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		overflow: hidden;
	}

	.mainBox {
		height: 100%;


	}

	/deep/.u-text__value--info {
		font-size: 26rpx !important;
	}
</style>