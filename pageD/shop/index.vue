<template>
	<view>
		<view class="nav">
			<u-sticky bgColor="#fff">
				<u-tabs :scrollable="true" :list="list1" @click="click" lineColor="#39d48f" lineWidth="30"
					:activeStyle="{color:'#39d48f',fontWeight: 'bold',fontSize: '30rpx'}"></u-tabs>
			</u-sticky>
		</view>
		<view class="main">
			<view class="list">
				<view class="item" v-for="item in 9" @click="shop_detail">
					<view class="item-box">
						<image class="img" src="https://img.88tph.com/tphc.1/96/02/lgLe4gUlEemvKgARMiynhQ.jpg"
							mode="aspectFill"></image>
					</view>
					<view class="shop-name">商品名称商品名称商品名称商品名称商品名称</view>
					<view class="integral">
						<view><text class="num">10000</text> 积分</view>
						<view>已兑100</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categoryId: '',
				list1: [{
						name: '关注分类',
					}, {
						name: '关注分类',
					}, {
						name: '关注分类'
					}, {
						name: '关注分类'
					}, {
						name: '关注分类'
					},
					{
						name: '关注分类'
					}, {
						name: '关注分类'
					}
				]
			}
		},
		onLoad(options) {
			console.log(options, 'options')
			if (options.id) {
				this.categoryId = options.id
			}
		},
		methods: {
			click(item) {
				console.log('item', item);
			},
			shop_detail() {
				uni.navigateTo({
					url: '/pageD/shop/details'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #f5f5f5;
	}

	/deep/.u-tabs {

		padding-bottom: 10rpx;
	}

	.main {
		background: #fff;
		width: 666rpx;
		margin: 0 auto;
		margin-top: 20rpx;
		padding: 30rpx 34rpx;

		.list {
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;

			.item {
				width: 47%;

				margin-bottom: 15rpx;

				.item-box {
					width: 100%;

					.img {
						width: 281rpx;
						height: 281rpx;
						border-radius: 15rpx;
					}
				}

				.shop-name {
					width: 260rpx;
					margin: 10rpx 0;
					font-weight: 550;
					font-size: 30rpx;
					padding-left: 15rpx;
					overflow: hidden; //超出的文本隐藏
					text-overflow: ellipsis; //溢出用省略号显示
					white-space: nowrap; // 默认不换行；
				}

				.integral {
					padding: 0 15rpx;
					margin-bottom: 15rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 25rpx;
					color: silver;

					.num {
						color: red;
						font-size: 32rpx;
						font-weight: 600;
					}
				}
			}
		}
	}
</style>