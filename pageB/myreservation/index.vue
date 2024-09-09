<template>
	<view>
		<view class="u-nav">
			<navbar :safeAreaInsetTop="true" height="55" placeholder leftIconColor="#fff" autoBack>
				<view class="u-nav-slot" slot="center">
					<u--text text="我要预约" color="#fff"></u--text>
				</view>
			</navbar>
		</view>
		<view class="application-list">
			<view class="li" @click="activity_customized">
				<image style="width: 100%;height: 100%;border-radius: 20rpx;" mode="aspectFit" src="http://cdn.cestech.com.cn/TrainingProgram/img/f22a3e52bcab4661b9452072200ac89d.png"></image>
			</view>
			<view class="li" @click="teacher_reservation">
				<image style="width: 100%;height: 100%;border-radius: 20rpx;" mode="aspectFit" src="http://cdn.cestech.com.cn/TrainingProgram/img/7e20588bb8854d5e8864abfc8bec5e07.png"></image>
			</view>
			<!-- <view class="li" @click="activity_customized">
				<view><image src="@/static/assets/home/4.png" style="width: 60px;height: 60px;" mode="aspectFill"></image></view>
				<view style="margin-top: 10rpx;">活动预约</view>
			</view> -->
			<!-- <view class="li" @click="teacher_reservation">
				<view><image src="@/static/assets/home/kc.png" style="width: 60px;height: 60px;" mode="aspectFill"></image></view>
				<view style="margin-top: 10rpx;">培训课程预约</view>
			</view> -->
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		onLoad() {
			if(!uni.getStorageSync('phone')){
				uni.showToast({
					title:"请登录后再进行操作",
					icon:"none"
				})
				setTimeout(()=>{
					uni.switchTab({
						url:'/pages/center/index'
					})
				},1000)
			}
		},
		methods:{
			teacher_reservation(){
				uni.navigateTo({
					url:'/pageB/activity/index'
				})
			},
			activity_customized(){
				console.log('222')
				uni.navigateTo({
					url:'/pageA/activity/index'
				})
			},
			
		}
	}
</script>

<style lang="scss">
	.application-list{
		width: 750rpx;
		height: 160rpx;
		background: #fff;
		
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		.li{
			margin: 0 auto;
			width: 730rpx;
			height: 410rpx;
			margin-bottom: 20rpx;
		}
		// justify-content: space-between;
		// .li{
		// 	width: 33.33%;
		// 	text-align: center;
		// 	display: flex;
		// 	flex-direction: column;
		// 	justify-content: center;
		// 	align-items: center;
		// 	    text-decoration: none;
		// 	    font-weight: bold;
		// 	    word-wrap: normal;
		// 	    font-size: 30rpx;
		// 	    color: #303133;
		// }
	}
</style>