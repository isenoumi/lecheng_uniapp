<template>
	<view>
		<!-- 搜索框 -->
		<view class="search">
			<u-search placeholder="请输入您想要搜索商品信息" v-model="inputValue" @clear="clear" @search="search" @custom="search"></u-search>
			<!-- <view style="display: flex;align-items: center;">
				<text class="iconfont icon-sousuo position-absolute text-muted"></text>
				<input class="searchInput" v-model="inputValue" @confirm="search" placeholder="搜索" type="text" />
			</view>
			<view>取消</view> -->
		</view>
		<!-- 搜索框 -->

		<!-- 搜索历史 -->
		<view class="searchHistory">
			<view v-if="historyShow">
				<view
					style="display: flex;align-items: center;justify-content: space-between;box-sizing: border-box;padding: 0px 5px;">
					<view>搜索历史:</view>

					<view @click="empty"><u-icon name="trash" size="20"></u-icon></view>
				</view>
				<view class="searchHistoryItem">
					<view v-for="(item, index) in searchHistoryList" :key="index" @click="search_item(item)">
						{{ item }}
					</view>
				</view>
			</view>
			<view v-if="searchShow">
				<view class="shop-list" v-for="item in search_list" @click="go_details(item.prodId)">
					<view class="shop-list-left">
						<image :src="item.pic" mode="aspectFill" style="width: 130rpx;height: 130rpx;"></image>
					</view>
					<view class="shop-list-right">
						<view class="shop-name">{{item.prodName}}</view>
						<view class="shop-details">{{item.brief}}</view>
						<view class="shop-potions"><text class="num">{{item.points}}</text> 积分</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 搜索历史 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				historyShow: true,
				searchShow: false,
				name: '',
				inputValue: '',
				searchHistoryList: [], //搜索出来的内容
				search_list: [
					// {
					// 	url: 'https://img.88tph.com/tphc.1/96/02/lgLe4gUlEemvKgARMiynhQ.jpg',
					// 	name: '商品名称商品名称商品名称商品名称商品名称商品名称',
					// 	details: '商品说明',
					// 	potions: 1000,
					// },
					// {
					// 	url: 'https://img.88tph.com/tphc.1/96/02/lgLe4gUlEemvKgARMiynhQ.jpg',
					// 	name: '商品名称商品名称商品名称商品名称商品名称商品名称',
					// 	details: '商品说明',
					// 	potions: 1000,
					// },
					// {
					// 	url: 'https://img.88tph.com/tphc.1/96/02/lgLe4gUlEemvKgARMiynhQ.jpg',
					// 	name: '商品名称商品名称商品名称商品名称商品名称商品名称',
					// 	details: '商品说明',
					// 	potions: 1000,
					// }
				]
			};
		},
		methods: {
			go_details(id) {
				uni.navigateTo({
					url: `/pageD/shop/details?id=${id}`
				})
			},
			search_for() {
				console.log(this.name,'名字')
				uni.request({
					url: 'https://gh.api.cestech.com.cn:8240/mission_gh/p/order/selectAll',
					header: {
						'x-Resource-Token':uni.getStorageSync('xtoken'),
						//'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
					},
					// header: {
					// 	'X-Access-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODkwNjQ3NTcsInVzZXJuYW1lIjoiYWRtaW4ifQ.9zI7NyLu1gcsn17dqXV9FUEyXIMRU6MgHxp9BG0i7MM' //自定义请求头信息
					// },
					data: {
						name: this.name
					},
					method: "GET",
					success: (res) => {
						console.log(res.data.result)
						if (res.data.result.length == 0) {
							uni.showToast({
								icon: 'none',
								title: '当前搜索结果为空，请重新输入'
							})
							this.historyShow = true
							this.searchShow = false

						} else {
							this.historyShow = false
							this.searchShow = true
							this.search_list = res.data.result
						}

					}

				})
			},
			search() {
				if (this.inputValue == '') {
					uni.showModal({
						title: '搜索内容不能为空'
					});
				} else {
					this.searchHistoryList.unshift(this.inputValue);
					uni.setStorage({
						key: 'searchList',
						data: JSON.stringify(this.searchHistoryList)
					});
					console.log(this.inputValue, 'inputValue')
					this.name = this.inputValue
					console.log(this.name, '盒子')
					this.search_for()
					// if (!this.searchHistoryList.includes(this.inputValue)) {
					// 	this.searchHistoryList.unshift(this.inputValue);
					// 	uni.setStorage({
					// 		key: 'searchList',
					// 		data: JSON.stringify(this.searchHistoryList)
					// 	});
					// 	console.log(this.inputValue, 'inputValue')
					// 	this.name = this.inputValue
					// 	console.log(this.name, '盒子')
					// 	this.search_for()

					// } else {
					// 	//有搜索记录，删除之前的旧记录，将新搜索值重新push到数组首位
					// 	let i = this.searchHistoryList.indexOf(this.inputValue);
					// 	this.searchHistoryList.splice(i, 1);
					// 	this.searchHistoryList.unshift(this.inputValue);
					// 	// uni.showToast({
					// 	// 	title: '不能重复搜索'
					// 	// });
					// 	uni.setStorage({
					// 		key: 'searchList',
					// 		data: JSON.stringify(this.searchHistoryList)
					// 	});
					// 	// this.search_for()
					// }
				}
			},
			clear() {
				console.log('222')
				this.historyShow = true
				this.searchShow = false
			},
			//清空历史记录
			empty() {
				uni.showToast({
					icon: 'none',
					title: '已清空'
				});
				uni.removeStorage({
					key: 'searchList'
				});

				this.searchHistoryList = [];
			},
			search_item(value) {
				console.log(value)
				this.name=''
				this.name = value
				this.inputValue = value
				this.search_for()
			}
		},
		async onLoad() {
			// let list = await uni.getStorage({
			// 	key: 'searchList'
			// });
			// uni.getStorageSync('searchList')
			// console.log(list[1].data);

			if (uni.getStorageSync('searchList')) {
				this.searchHistoryList = JSON.parse(uni.getStorageSync('searchList'));
			}
		}
	};
</script>

<style lang="scss">
	.shop-list {
		background: #f5f5f5;
		width: 98%;
		margin: 0 auto;
		margin-top: 30rpx;
		display: flex;
		align-items: center;
		padding: 30rpx 30rpx 20rpx 30rpx;
		border-radius: 15rpx;

		.shop-list-right {
			margin-left: 20rpx;

			.shop-name {
				width: 440rpx;
				font-weight: 600;
				font-size: 32rpx;
				overflow: hidden; //超出的文本隐藏
				text-overflow: ellipsis; //溢出用省略号显示
				white-space: nowrap; // 默认不换行；

			}

			.shop-details {
				width: 440rpx;
				color: silver !important;
				font-size: 26rpx;
				margin: 10rpx 0;
				overflow: hidden; //超出的文本隐藏
				text-overflow: ellipsis; //溢出用省略号显示
				white-space: nowrap; // 默认不换行；
			}

			.shop-potions {
				color: silver !important;
				font-size: 26rpx;

				.num {
					font-weight: 600;
					font-size: 32rpx;
					color: red;
					margin-right: 5rpx;
				}
			}
		}

	}

	.search {
		width: 100%;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0px 15px;
		margin-top: 25rpx;
	}

	.searchInput {
		background-color: #f8f9fa;
		width: 220px;
		margin-left: 5px;
	}

	.searchHistory {
		width: 90%;
		margin-top: 5px;
		margin: 0 auto;
		font-size: 28rpx;
		margin-top: 35rpx;
	}

	.searchHistoryItem {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		margin-top: 25rpx;
	}

	.searchHistoryItem view {
		/* width: 50px; */
		height: 25px;
		line-height: 25px;
		background: silver;
		margin: 0px 5px;
		padding: 0rpx 15rpx;
		border-radius: 10rpx;
		color: #fff;
		margin-bottom: 20rpx;

	}
</style>