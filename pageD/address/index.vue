<template>
	<!--pages/delivery-address/delivery-address.wxml-->
	<view class="container">
		<view style="margin-bottom:192rpx">
			<u-navbar title="收货地址" @leftClick="leftClick" :autoBack="false">
			</u-navbar>
		</view>
		<view class="main">
			<view class="empty" v-if="!addressList.length==0">
				<view class="img">
					<image src="http://jiales.gz-yami.com/addr.png"></image>
				</view>
				<view class="txt">您还没有收货地址</view>
			</view>
			<radio-group class="radio-group" v-else>
				<block v-for="(item, index) in addresList" :key="index">
					<view class="address">
						<view class="personal" @tap="selAddrToOrder(item)">
							<view class="info-tit">
								<text class="name">{{item.province}}{{item.city}}{{item.area}}</text>
								<!-- <text class="tel">1234556544</text> -->
								<!-- <image src="/static/images/icon/revise.png" @tap.stop="toEditAddress" :data-addrid="item.addrId"></image> -->
							</view>
							<view class="addr" style="margin: 10rpx 0;">
								<text class="addr-get">{{item.addr}}</text>
								<!-- <text class="addr-get"> {{item.province}}{{item.city}}{{item.area}}{{item.addr}}</text> -->
							</view>
							<view class="addr">
								<text class="addr-get">{{item.receiver}} {{item.mobile}}</text>
								<!-- <text class="addr-get"> {{item.province}}{{item.city}}{{item.area}}{{item.addr}}</text> -->
							</view>
						</view>
						<view class="select-btn">
							<view class="box">
								<label @tap="onDefaultAddr" :data-addrid="item.addrId">
									<radio :value="item.prodId" :checked="item.commonAddr==1" color="#eb2444"></radio>
									设为默认地址
								</label>
							</view>
							<view class="btns">
								<view class="enit" @click="toEditAddress(item.addrId)">编辑</view>
								<view class="sc" @click="delet(item.addrId)">删除</view>
							</view>
						</view>
					</view>
				</block>
			</radio-group>
		</view>
		<view class="footer" @tap="onAddAddr">
			<text>+ 新增收货地址</text>
		</view>
	</view>
</template>

<script>
	// pages/delivery-address/delivery-address.js
	// var http = require("../../utils/http.js"); // var config = require("../../utils/config.js");

	import list from '../../uni_modules/uview-ui/libs/config/props/list';

	export default {
		data() {
			return {
				defaultSize: 'mini',
				disabled: false,
				plain: true,
				loading: false,
				addressList: [],
				addAddress: '',
				order: -1,
				item: "",
				selAddress: "",
				addresList: [],
				flg: '1',
			};
		},

		components: {},
		props: {},
		onLoad: function(option) {
			if (option.flg) {
				this.flg = option.flg
			}
			this.list()

		},
		//加载地址列表
		onShow: function() {
			// this.list()
		},
		methods: {
			leftClick() {

				if (this.flg === '1') {
					uni.navigateBack()
					console.log('leftClick1');
				} else {
					let pages = getCurrentPages(); // 当前页面
					let beforePage = pages[pages.length - 2];
					uni.navigateBack({
						delta: 1,
						success: function() {
							beforePage.$vm.init(); // 执行前一个页面的init 来实现刷新
						}
					});
					console.log('leftClick2');
				}
			},
			reload() {
				// 页面重载
				const pages = getCurrentPages()
				// 声明一个pages使用getCurrentPages方法
				const curPage = pages[pages.length - 1]
				// 声明一个当前页面
				curPage.onLoad(curPage.options) // 传入参数
				curPage.onShow()
				curPage.onReady()
				// 执行刷新
			},
			init() {
				// 页面数据获取的代码放在 init 当中
				this.list()
			},
			list() {
				let userId = uni.getStorageSync('users').id
				uni.request({
					// url: `https://gh.api.cestech.com.cn:8240/mission_gh/p/address/list?userId=${userId}`,
					url: `https://gh.api.cestech.com.cn:8240/mission_gh/p/address/list`,
					header: {
						'x-Resource-Token':uni.getStorageSync('xtoken'),
						//'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
					},
					// data: {
					// 	userId: uni.getStorageSync('users').id,
					// },
					// header: {
					// 	'X-Access-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODkwNjQ3NTcsInVzZXJuYW1lIjoiYWRtaW4ifQ.9zI7NyLu1gcsn17dqXV9FUEyXIMRU6MgHxp9BG0i7MM'
					// },
					data: {

					},
					method: "GET",
					success: (res) => {
						console.log(res.data.result, '地址列表')
						this.addresList = res.data.result
					}

				})
			},
			delet(id) {
				console.log(id, 'id')
				let that = this
				uni.showModal({
					title: '提示',
					content: '确认删除这条地址吗？',
					success: function(res) {
						let userId = uni.getStorageSync('users').id
						if (res.confirm) {
							// 执行确认后的操作
							console.log(id)
							uni.request({
								// url: `https://gh.api.cestech.com.cn:8240/mission_gh/p/address/deleteAddr?userId=${userId}&addrId=${id}`,
								url: `https://gh.api.cestech.com.cn:8240/mission_gh/p/address/deleteAddr?addrId=${id}`,
								header: {
									'x-Resource-Token':uni.getStorageSync('xtoken'),
									//'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
								},
								// header: {
								// 	'X-Access-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODkwNjQ3NTcsInVzZXJuYW1lIjoiYWRtaW4ifQ.9zI7NyLu1gcsn17dqXV9FUEyXIMRU6MgHxp9BG0i7MM'
								// },

								method: "DELETE",
								success: (res) => {
									if (res.data.code === 200) {
										uni.showToast({
											icon: 'success',
											title: '删除成功'
										})
										that.list()
									} else {
										uni.showToast({
											icon: 'error',
											title: res.data.message
										})
									}
								}

							})
						} else {
							// 执行取消后的操作
							console.log(id)
						}
					}
				})
			},
			//新增收货地址
			onAddAddr: function(e) {

				uni.navigateTo({
					url: '/pageD/address/add_address'
				});
			},
			//设置为默认地址
			onDefaultAddr: function(e) {
				var addrId = e.currentTarget.dataset.addrid;
				let userId = uni.getStorageSync('users').id
				// console.log(addrId);
				var ths = this;
				uni.showLoading();

				uni.request({
					// url: `https://gh.api.cestech.com.cn:8240/mission_gh/p/address/defaultAddr?addrId=${addrId}&userId=${userId}`,
					url: `https://gh.api.cestech.com.cn:8240/mission_gh/p/address/defaultAddr?addrId=${addrId}`,
					header: {
						'x-Resource-Token':uni.getStorageSync('xtoken'),
						//'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
					},
					// header: {
					// 	'X-Access-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODkwNjQ3NTcsInVzZXJuYW1lIjoiYWRtaW4ifQ.9zI7NyLu1gcsn17dqXV9FUEyXIMRU6MgHxp9BG0i7MM'
					// },

					method: "PUT",
					success: (res) => {
						if (res.data.code === 200) {
							// this.list();
							uni.hideLoading();
							// this.reload()
						}
					}

				})
				// var params = {
				//   url: "/p/address/defaultAddr/" + addrId,
				//   method: "PUT",
				//   data: {
				//     addrId: addrId
				//   },
				//   callBack: function (res) {
				//     uni.hideLoading();
				//   }
				// };
				// http.request(params);
			},
			// 修改地址 
			toEditAddress: function(id) {
				console.log(id)
				uni.navigateTo({
					url: `/pageD/address/add_address?id=${id}`
				})
				// var addrId = e.currentTarget.dataset.addrid;
				// uni.navigateTo({
				//   url: `/pageD/address/add_address?addrId=${e}`
				// });
			},

			/**
			 * 选择地址 跳转回提交订单页
			 */
			selAddrToOrder: function(item) {
				if (this.order == 0) {
					var pages = getCurrentPages(); //当前页面

					var prevPage = pages[pages.length - 2]; //上一页面

					//直接给上一页面赋值
					prevPage.item = item
					prevPage.selAddress = 'yes'
					uni.navigateBack({
						//返回
						delta: 1
					});
				}
			}
		}
	};
</script>
<style lang="scss">
	/* pages/delivery-address/delivery-address.wxss */

	page {
		background-color: #f4f4f4;
		border-top: 2rpx solid #e9eaec;
		padding-bottom: 150rpx;
	}

	.main {
		margin-top: 20rpx;
	}

	.address {
		margin-bottom: 15rpx;
		width: 100%;
		background-color: #fff;
		border-bottom: 2rpx solid #e9eaec;
	}

	.address .personal {
		position: relative;
		padding: 20rpx 30rpx;
		border-bottom: 3rpx dashed #e9eaec;
	}

	.address .personal .info-tit .name {
		margin-right: 30rpx;
		font-size: 32rpx;
		display: inline-block;
	}

	.address .personal .info-tit .tel {
		font-size: 30rpx;
	}

	.address .personal .info-tit image {
		position: absolute;
		right: 30rpx;
		top: 46rpx;
		width: 40rpx;
		height: 40rpx;
		margin-left: 50rpx;
		vertical-align: middle;
	}

	.personal .addr {
		font-size: 26rpx;
		// margin: 10rpx 0;
		// margin-top: 20rpx;
	}

	.personal .addr .addr-get {
		display: inline-block;
		color: #999;
		width: 100%;
		word-break: break-word;
	}

	.address .select-btn {
		padding: 15rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.btns {
			display: flex;
			align-items: center;

			.enit {
				font-size: 26rpx;
				background: #39d48f;
				color: #fff;
				padding: 5rpx 22rpx;
				border-radius: 20rpx;
			}

			.sc {
				font-size: 26rpx;
				margin-left: 20rpx;
				background: rgb(249, 174, 61);
				color: #fff;
				padding: 5rpx 22rpx;
				border-radius: 20rpx;
			}
		}

	}

	.address .select-btn .box {
		font-size: 26rpx;
	}

	.footer {
		position: fixed;
		bottom: 40rpx;
		left: 50%;
		margin-left: -350rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background-color: #39d48f;
		box-shadow: 0 -1rpx 8rpx rgba(0, 0, 0, 0.05);
		width: 700rpx;
		border-radius: 40rpx;
	}

	.footer text {
		font-size: 32rpx;
		color: #fff;
	}

	.empty .img {
		text-align: center;
		margin-top: 130rpx;
	}

	.empty .img image {
		width: 100rpx;
		height: 100rpx;
		display: block;
		margin: auto;
	}

	.empty .txt {
		margin-top: 30rpx;
		font-size: 24rpx;
		text-align: center;
		color: #999;
	}
</style>