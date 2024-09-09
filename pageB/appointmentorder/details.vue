<template>
	<view>
		<view class="title">
			<view class="haed-img">
				<image :src="details.headImage" mode="aspectFill" style="width: 100%;height: 100%;">
				</image>
			</view>
			<view class="right">
				<view class="name">{{details.speechTeacher}}
					<view class="tab">{{details.speechLevel}}</view>
				</view>
				<view style="font-size: 30rpx;">{{details.speechYear}}年经验</view>
			</view>
		</view>
		<view class="introduce">
			<view class="title">个人简介</view>
			<view class="txt">{{details.personalProfile}}</view>

		</view>
		<!-- <view class="introduce">
			<view class="title">订单详情</view>
			<view class="item">订单备注：垃圾清扫活动</view>
			<view class="item">订单状态：待接单</view>
			<view class="item">订单时间：{{details.createTime}}</view>
		</view> -->
		<view class="introduce">
			<view class="title">演讲图片</view>
			<view class="list-img">
				<view class="img" v-for="item in list_img">
					<image :src="item" mode="aspectFill" style="width: 200rpx;height: 200rpx;"></image>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list_img: [],
				show: false,
				shows: false,
				mode: 'single',
				value: '',
				picker: '',
				piker: '',
				id: '',
				details: {}
			}
		},
		onLoad(option) {
			console.log(option.id)
			if (option.id) {
				this.id = option.id
				this.detail()
			}
		},
		methods: {
			detail() {
				uni.request({
					url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbTrainingProgram/queryByIdSon`,
					header: {
						'x-Resource-Token':uni.getStorageSync('xtoken'),
						//'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
					},
					data: {
						id: this.id
					},
					method: "GET",
					success: (res) => {
						let url = 'https://gh.api.cestech.com.cn:8240/mission_gh/sys/common/static/'
						console.log(res.data.result, 'cc')
						// res.data.result.headImage=url+res.data.result.headImage
						res.data.result.uploadPictures.split(",").map(v => {
							// v = url + v
							console.log(v, '图片')
							this.list_img.push(v)
						})
						if (res.data.result.speechLevel === 1) {
							res.data.result.speechLevel = '专家'
						} else if (res.data.result.speechLevel === 2) {
							res.data.result.speechLevel = '志愿者'
						} else if (res.data.result.speechLevel === 3) {
							res.data.result.speechLevel = '普通老师'
						}
						this.details = res.data.result

						// res.data.result.forEach(v=>{
						// 	console.log(v,'tutttt')
						// 	v.headImage=url+v.headImage

						// })
						// this.list=res.data.result.records
						// this.mescroll.endSuccess(res.data.result.records.length);
						// if (page.num == 1) this.list = []; //如果是第一页需手动制空列表
						// this.list = this.list.concat(res.data.result.records); //追加新数据

					}
				})
			},
			picker() {
				this.shows = true
			},
			change(e) {
				console.log('change', e);
			},
			confirm(e) {
				console.log(e);
				this.piker = e[0]
				this.shows = false
			},
			clo() {
				this.shows = false
			},
			open() {
				// console.log('open');
			},
			close() {
				this.show = false
				// console.log('close');
			}

		}
	}
</script>

<style lang="scss">
	.msk {
		width: 600rpx;
		height: 360rpx;

		.btn {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			padding-right: 10rpx;
			margin-top: 100rpx;

			.btns {
				width: 160rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				font-size: 28rpx;
				border: 10rpx;
				margin-right: 30rpx;
				background: royalblue;
				color: #fff;
			}
		}

		.picker {
			margin: 0 auto;
			display: flex;
			align-items: center;
			width: 90%;
			padding-left: 30rpx;
			margin-top: 45rpx;
		}

		.head {
			text-align: center;
			margin-top: 65rpx;
		}
	}

	.btn {
		/deep/.u-button {
			width: 600rpx !important;
		}
	}

	.title {
		display: flex;
		align-items: center;
		padding: 30rpx 25rpx;

		.haed-img {
			width: 140rpx;
			height: 140rpx;
			border-radius: 50%;

		}

		.right {
			margin-left: 30rpx;
		}

		.name {
			display: flex;
			align-items: center;
			margin-bottom: 30rpx;
			font-weight: 550;

			.tab {
				margin-left: 10rpx;
				font-size: 20rpx;
				border: 1rpx solid rgb(249, 176, 41);
				color: rgb(249, 176, 41);
				padding: 0rpx 6rpx;
			}
		}
	}

	.introduce {
		background: #fff;
		padding: 30rpx 25rpx;
		font-size: 32rpx;
		margin-bottom: 10rpx;

		.title {
			padding: 10rpx 0;
			font-size: 36rpx;
			font-weight: 550;
			margin-bottom: 20rpx;
		}

		.item {
			font-size: 28rpx;
			height: 90rpx;
			line-height: 90rpx;
			border-bottom: 2rpx dashed #dcdcdc;

		}

		.txt {
			margin-top: 15rpx;
			font-size: 28rpx;
			line-height: 50rpx;

		}

		.list-img {
			width: 750rpx;
			margin-top: 30rpx;
			display: flex;
			align-items: center;
			flex-wrap: wrap;

			.img {
				width: 250rpx;
				margin-bottom: 20rpx;
			}
		}
	}
</style>