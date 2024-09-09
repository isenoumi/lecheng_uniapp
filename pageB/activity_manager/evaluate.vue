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
							<u--text wordWrap="anywhere" :text="detail.name">
							</u--text>

						</view>
					</view>
					<u-line color="rgb(214, 215, 217)"></u-line>
				</view>
				<view class="z-form-item">
					<view class="z-form-item__body">
						<view class="z-form-item__body__left">
							<u--text text="演讲时长:"></u--text>
						</view>
						<view class="z-form-item__body__right">
							<u--text wordWrap="anywhere" :text="detail.time">
							</u--text>

						</view>
					</view>
					<u-line color="rgb(214, 215, 217)"></u-line>
				</view>
				<view class="z-form-item">
					<view class="z-form-item__body">
						<view class="z-form-item__body__left">
							<u--text text="拍照打卡:"></u--text>
						</view>
						<view class="z-form-item__body__right">
							<image :src="detail.bkbPhones.picurl" mode="scaleToFill"
								style="width: 140rpx;height: 140rpx;" @click="showBigImg(detail.bkbPhones.picurl)">
							</image>
							<!-- <u-album :urls="[detail.img_url]" singleSize="100"></u-album> -->
						</view>
					</view>
					<u-line color="rgb(214, 215, 217)"></u-line>
				</view>

				<view class="z-form-item ">
					<view class="z-form-item__body_col">
						<view class="z-form-item__body__left">
							<u--text text="评价人:"></u--text>
						</view>
						<view class="z-form-item__body__right">
							<u-cell-group :border="false">
								<z-paging ref="paging" v-model="commentList" @query="queryList" :use-page-scroll="true">

									<u-cell v-for="(item,index) in commentList">
										<view slot="icon">
											<u-avatar size="40" :src="item.userAvatar">
											</u-avatar>
										</view>
										<view slot="title">
											<u--text :text="item.userName"></u--text>
										</view>
										<view slot="right-icon">
											<u--text type="primary" text="评价内容" @click="toDetail(item)"></u--text>
										</view>
									</u-cell>

								</z-paging>
							</u-cell-group>

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
		speechoractivitycommentlist
	} from '@/common/api.js'
	import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'


	export default {
		components: {

		},
		data() {
			return {
				pageLoading: true,
				globalData: getApp().globalData,

				id: null,
				commentList: [],
				detail: {
					name_of_activity: '',
					type: '',
					status: '',
					img_url: '',
					the_activity_time: '',
					create_time: '',
					start_date: '',
					comment: null,

				}
			}
		},
		mixins: [ZPMixin],
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

			//点击放大图片
			showBigImg(imgsArray) {
				let arr = [];
				arr.push(imgsArray)
				console.log(arr, '图片的地址')
				uni.previewImage({
					current: 0,
					urls: arr //必须是网址路径，否则加载不出来，如：http：或https：
				});
			},
			getDetail() {
				uni.request({
					url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbTrainingTask/activityLookS`,
					header: {
						'x-Resource-Token':uni.getStorageSync('xtoken'),
						//'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
					},
					data: {
						id: this.id
					},
					method: "GET",
					success: (res) => {
						console.log(res.data.result.bkbPhones.picurl, 'xxxx1')
						this.pageLoading = false;
						this.detail = res.data.result
					}
				})
				// activityone({
				// 	id: this.id
				// }).then((res) => {
				// 	this.detail = res.data
				// 	this.pageLoading = false;

				// })

			},

			queryList(page, list_rows) {

				uni.request({
					url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbTrainingTask/activityLookX`,
					header: {
						'x-Resource-Token':uni.getStorageSync('xtoken'),
						//'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
					},
					data: {
						id: this.id,
						page: page,
						list_rows: list_rows
					},
					method: "GET",
					success: (res) => {
						console.log(res, 'xxxx1')
						this.pageLoading = false;
						this.$refs.paging.complete(res.data.result.records);
					}
				})
				// speechoractivitycommentlist({
				// 	id: this.id,
				// 	page: page,
				// 	list_rows: list_rows
				// }).then((res) => {

				// 	this.$refs.paging.complete(res.data.data);
				// }).catch(res => {
				// 	this.$refs.paging.complete(false);
				// })



			},
			toDetail(item) {
				console.log(item)
				uni.$u.route({
					url: `pageB/activity_manager/evaluate_detail?item=${JSON.stringify(item)}`,
					params: {
						id: item.actId

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
</style>