<template>
	<view>
		<!-- 搜索框 -->
		<view class="search">
			<u--textarea v-model="inputValue" placeholder="请输入内容" @confirm="search" count></u--textarea>
			<!-- <u-search placeholder="请输入您想要搜索商品信息" v-model="inputValue" @clear="clear" @search="search" @custom="search"></u-search> -->
		</view>
		<!-- 搜索历史 -->
		<view class="searchHistory">
			<view v-if="historyShow">
				<view
					style="display: flex;align-items: center;justify-content: space-between;box-sizing: border-box;padding: 0px 5px;">
					<view>历史记录:</view>
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
	// import api_all from '@/api/index.js';
	export default {
		data() {
			return {
				historyShow: true,
				searchShow: false,
				name: '',
				inputValue: '',
				searchHistoryList: [], //搜索出来的内容
				search_list: []
			};
		},
		methods: {
			//跳转商品详情
			go_details(id) {
				uni.navigateTo({
					url: `/pageD/shop/details?id=${id}`
				})
			},
			
			//搜索商品
			search() {
				console.log(this.inputValue, 'xxx')
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
					this.name = this.inputValue
					uni.$emit('returnData', this.inputValue)
					uni.navigateBack({
						delta: 1
					})

				}
			},
			//清除输入框
			clear() {
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
				this.name = ''
				this.name = value
				this.inputValue = value
				uni.$emit('returnData', this.inputValue)
				uni.navigateBack({
					delta: 1
				})
			
			}
		},
		//清除本地
		async onLoad() {
			if (uni.getStorageSync('searchList')) {
				this.searchHistoryList = JSON.parse(uni.getStorageSync('searchList'));
			}
		}
	};
</script>

<style lang="scss">
	@import 'css/notes.scss';
</style>