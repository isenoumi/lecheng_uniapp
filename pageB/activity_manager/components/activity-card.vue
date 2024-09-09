<template>
	<view class="z-card4">
		<uni-card :extra="item.status|activityStatusText">
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<view style="display: flex;align-items: center;">
					<image :src="item.bkbTrainingProgram.coverUrl" mode="aspectFit"
						style="width: 120rpx;height: 120rpx;margin-right: 10rpx;"></image>
					<u--text size="16" :text="item.bkbTrainingProgram.title"></u--text>
				</view>
				<view v-if="item.bkbTrainingProgram.status==0">
					待接受
				</view>
				<view v-if="item.bkbTrainingProgram.status==1">
					已接受
				</view>
				<view v-if="item.bkbTrainingProgram.status==2">
					进行中
				</view>
				<view v-if="item.bkbTrainingProgram.status==3">
					已完成
				</view>

			</view>
			<view class="u-flex u-row-between">
				<view class="u-flex-1">
					<u--text size="13" :text="`开始时间：${item.bkbTrainingProgram.createTime}`">
					</u--text>
				</view>
				<view>
					<!-- <u--text size="13" :text="item.type|typeText">
          </u--text> -->
					<u--text size="13" :text="`预约人数：${item.count}`">
					</u--text>
				</view>
				<!--     <view class="u-flex-1">
                    <u--text size="13" :text="`人数：${item.create_time}`">
                    </u--text>
                </view>
 -->
			</view>

			<view slot="actions" class="card-actions">
				<!-- <view class="card-actions-item" @click="accept(item)" v-if="item.status==actStatus.unaccept">
					<u--text size="14" text="接受活动">
					</u--text>
				</view> -->
				<view class="card-actions-item" @click="accept(item)" v-if="item.bkbTrainingProgram.status==0">
					<u--text size="14" text="接受活动">
					</u--text>
				</view>
				<!-- <view class="card-actions-item" @click="start(item)" v-if="item.status==actStatus.popular">
					<u--text size="14" text="开始活动">
					</u--text>
				</view> -->
				<view class="card-actions-item" @click="start(item)" v-if="item.bkbTrainingProgram.status==1">
					<u--text size="14" text="开始活动">
					</u--text>
				</view>
				<!-- <view class="card-actions-item" @click="goUnderway(item)" v-if="item.status==actStatus.underway">
					<u--text size="14" text="进入活动">
					</u--text>
				</view> -->
				<view class="card-actions-item" @click="goUnderway(item)" v-if="item.bkbTrainingProgram.status==2">
					<u--text size="14" text="进入活动">
					</u--text>
				</view>
				<view class="card-actions-item" @click="goQrcode(item)" v-if="item.bkbTrainingProgram.status!=3">
					<u--text size="14" text="获取培训码">
					</u--text>
				</view>
				<!-- <view class="card-actions-item" @click="goDetail(item)">
					<u--text size="14" text="查看详情">
					</u--text>
				</view> -->
				<view class="card-actions-item" @click="goDetail(item)" v-if="item.bkbTrainingProgram.status!=3">
					<u--text size="14" text="查看详情">
					</u--text>
				</view>
				<view class="card-actions-item" @click="goEvaluate(item)" v-if="item.bkbTrainingProgram.status==3">
					<u--text size="14" text="查看结果">
					</u--text>
				</view>

			</view>
		</uni-card>
		<u-modal :show="acceptShow" @confirm="acceptSubmit" ref="acceptuModal" :asyncClose="true" showCancelButton
			@cancel="this.acceptShow=false" title="提示" content="是否接受此活动?">
		</u-modal>
		<u-modal :show="show" @confirm="startSubmit" ref="uModal" :asyncClose="true" showCancelButton
			@cancel="this.show=false" title="请拍照打卡">
			<view class="slot-content">
				<view class="upload">
					<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" :multiple="true"
						:maxCount="1" width="200rpx" height="200rpx" :deletable="true" :previewFullImage="true"
						uploadText="选择图片">
					</u-upload>
				</view>
			</view>
		</u-modal>


	</view>
</template>

<script>
	import {
		actStatus
	} from '@/common/enums/activity.js'
	import {
		imgUpload,
		speechoractivitysavePhoto,
		speechoractivitystart,
		speechoractivityaccept
	} from '@/common/api.js'
	import authorize from "@/common/auth.js"
	import templateIds from "../../../common/template-ids"
	export default {
		props: {
			item: {
				default: null,
				type: Object
			}
		},
		filters: {

			typeText(val) {
				return '预约人数：' + val
			}
		},
		data() {
			return {
				show: false,
				acceptShow: false,
				actStatus: actStatus,
				modal: {
					url: '',
					img: []
				},
				// 上传图片
				fileList1: [],
				url_img: ''
			}
		},
		computed: {

		},
		methods: {
			//删除图片
			deletePic(e) {
				console.log(e);
				this[`fileList${e.name}`].splice(e.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				console.log(event)
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			//上传图片
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						//url: this.$common.domain+'/api/common/upload', // 仅为示例，非真实的接口地址
						url: 'https://gh.api.cestech.com.cn:8240/mission_gh/wx/WxApi/imgUpload', // 仅为示例，非真实的接口地址
						header: {
							'x-Resource-Token':uni.getStorageSync('xtoken'),
							//'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
						},
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							// resolve(res.data.data)
							console.log(JSON.parse(res.data).result, 'xxxx')

							this.url_img = JSON.parse(res.data).result
							console.log(this.url_img, 'res.data.data')
							resolve(this.url_img)
						}
					});
				})
			},

			start(item) {
				this.modal.url = ''
				this.show = true;
			},
			startSubmit() {
				if (this.url_img) {
					uni.request({
						url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbTrainingTask/beginActivity`,
						header: {
							'x-Resource-Token':uni.getStorageSync('xtoken'),
							//'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
						},
						data: {
							id: this.item.bkbTrainingProgram.id,
							picUrl: this.url_img
						},
						method: "GET",
						success: (res) => {
							this.$refs.uModal.loading = false
							uni.$emit('refreshList')
							this.show = false;
							uni.showToast({
								title: '恭喜开始活动',
								icon: 'success',
							});
							uni.$u.route({
								url: '/pageB/activity_manager/underway',
								params: {
									id: this.item.bkbTrainingProgram.id,

								}
							})
						}
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '请先选择照片或者拍照'
					})
				}


				// speechoractivitystart({
				// 	id: this.item.id,
				// 	img_url: this.modal.url
				// }).then(({
				// 	data,
				// 	msg
				// }) => {
				// 	this.$refs.uModal.loading = false
				// 	uni.$emit('refreshList')
				// 	this.show = false;
				// 	uni.showToast({
				// 		title: msg,
				// 		icon: 'success',
				// 	});
				// 	console.log('打卡成功')

				// 	// setTimeout(() => {
				// 	uni.$u.route({
				// 		url: '/pageB/activity_manager/underway',
				// 		params: {
				// 			id: this.item.id,

				// 		}
				// 	})
				// 	// }, 10);

				// }).finally(() => {
				// 	this.$refs.uModal.loading = false
				// })
			},
			accept(item) {
				this.modal.img = []
				this.acceptShow = true;
			},
			acceptSubmit() {
				uni.request({
					url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbTrainingTask/acceptanceActivity`,
					header: {
						'x-Resource-Token':uni.getStorageSync('xtoken'),
						//'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
					},
					data: {
						id: this.item.bkbTrainingProgram.id
					},
					method: "GET",
					success: (res) => {
						this.$refs.acceptuModal.loading = false
						uni.$emit('refreshList')
						this.show = false;
						uni.showToast({
							title: '接受成功',
							icon: 'success',
						});
					}
				})

				// speechoractivityaccept({
				// 	id: this.item.id,
				// }).then(({
				// 	data,
				// 	msg
				// }) => {
				// 	this.$refs.acceptuModal.loading = false
				// 	uni.$emit('refreshList')
				// 	this.show = false;
				// 	uni.showToast({
				// 		title: msg,
				// 		icon: 'success',
				// 	});

				// 	authorize.requestSubscribeMessage(templateIds.activity).then((res) => {

				// 	})
				// }).finally(() => {
				// 	this.$refs.acceptuModal.loading = false
				// })


			},
			// async afterRead(event) {
			// 	this.modal.img = [{
			// 		...event.file,
			// 		status: 'uploading',
			// 		message: '上传中'
			// 	}];
			// 	try {
			// 		const result = await this.uploadFilePromise(event.file);
			// 		this.modal.url = result.url
			// 		this.modal.img[0] = Object.assign(this.modal.img[0], {
			// 			status: 'success',
			// 			message: '上传成功',
			// 		})
			// 		console.log(this.modal)
			// 	} catch (e) {
			// 		this.modal.url = ''
			// 		this.modal.img[0] = Object.assign(this.modal.img[0], {
			// 			status: 'failed',
			// 			message: '上传失败',
			// 		})

			// 	}

			// },
			// deletePic() {
			// 	this.modal.img = []
			// },
			// uploadFilePromise(file) {
			// 	return new Promise((resolve, reject) => {
			// 		// imgUpload({
			// 		// 	formData: {
			// 		// 		id: this.item.id
			// 		// 	},
			// 		// 	filePath: file.url,
			// 		// 	name: 'file'
			// 		// }).then((res) => {
			// 		// 	resolve(res.data)
			// 		// }).catch(() => {
			// 		// 	reject();
			// 		// })
			// 		uni.request({
			// 			url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/WxApi/imgUpload`,
			// 			data: {
			// 				formData: {
			// 					file: file.url
			// 				}
			// 			},

			// 			method: "POST",
			// 			success: (res) => {
			// 				console.log(res, '照片')
			// 			}
			// 		})
			// 		// speechoractivitysavePhoto({
			// 		// 	formData: {
			// 		// 		id: this.item.id
			// 		// 	},
			// 		// 	filePath: file.url,
			// 		// 	name: 'file'
			// 		// }).then((res) => {
			// 		// 	resolve(res.data)
			// 		// }).catch(() => {
			// 		// 	reject();
			// 		// })
			// 	})

			// 	// //上传进度
			// 	// this.uploadTask.onProgressUpdate((progressRes) => {
			// 	//     this.imageList[this.imageList.length - 1].progress = progressRes.progress;
			// 	// });

			// },
			goQrcode(item) {
				uni.$u.route({
					url: 'pageB/activity_manager/qrcode',
					params: {
						id: item.bkbTrainingProgram.id,
					}
				})
			},
			goUnderway(item) {
				uni.$u.route({
					url: 'pageB/activity_manager/underway',
					params: {
						id: item.bkbTrainingProgram.id,
					}
				})
			},
			goDetail(item) {
				uni.$u.route({
					url: 'pageB/activity_manager/detail',
					params: {
						id: item.bkbTrainingProgram.id,

					}
				})

			},
			goEvaluate(item) {
				uni.$u.route({
					url: 'pageB/activity_manager/evaluate',
					params: {
						id: item.bkbTrainingProgram.id,
					}
				})
			}

		}

	}
</script>

<style scoped lang="scss">

</style>