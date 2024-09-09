<template>
  <view class="content">
    <!-- 上传图片 -->
    <view class="upload" v-if="title != '建言献策'">
      <view class="title">
        拍照打卡:
        <view
          v-if="title == '光盘行动' || checkInfo.status == 1"
          style="font-size: 12px; color: #a2aca8">
          每日{{ timeListText }}可打卡
        </view>
      </view>
      <u-upload
        capture="camera"
        :fileList="fileList1"
        @afterRead="afterRead"
        @delete="deletePic"
        name="1"
        :multiple="true"
        :maxCount="2"
        width="200rpx"
        height="200rpx"
        :deletable="true"
        :previewFullImage="true"
        uploadText="选择图片">
        <!-- 这张图片就是自定义的图片，地址填写自己本地的就行 -->
        <!-- <image src="/static/function/uploadImg.png" mode="widthFix" style="width: 112rpx;height: 110rpx;"></image> -->
      </u-upload>
    </view>
    <view class="text" style="margin: 30rpx 0">
      <view class="title"> 分享心得： </view>
      <u--textarea
        v-model="punchCardDescribe"
        placeholder="请输入内容"></u--textarea>
    </view>
    <view class="text">
      <view class="title"> 我的位置： </view>
      <view>
        <!-- <map style="width: 100%; height: 300px;" :longitude="104.056919" :latitude="30.603235" :markers="markers">
				</map> -->
        <amap
          v-if="mapshow"
          :longitude="longitude"
          :latitude="latitude"
          style="width: 100%; height: 400rpx">
        </amap>
      </view>
    </view>
    <view class="btn" @click="toCheckSuccess"> 确认 </view>
  </view>
</template>

<script>
import amap from '@/components/ITkoala-amap/amap.vue'
import { addCheck, requestTime } from './api/index.js'
import config from '@/config.js'
export default {
  components: {
    amap,
  },
  data() {
    return {
      title: '',
      titleId: '',
      mapshow: false,
      punchCardDescribe: '',
      timeListText: '',
      checkInfo: {},
      // 上传图片
      fileList1: [],
      longitude: null, // 经度
      latitude: null, // 纬度
      locationInfo: '', // 位置信息
      map: '',
      markers: [
        {
          latitude: 30.574917,
          longitude: 104.068764,
          iconPath: '../../staic/assets/gou.png',
        },
      ],
    }
  },
  mounted() {},
  onLoad(options) {
    if (options.title) {
      this.title = options.title
      this.titleId = options.id
    }
    // if (this.$store.state.user.latitude) {
    //   this.latitude = this.$store.state.user.latitude
    //   this.longitude = this.$store.state.user.longitude
    //   this.mapshow = true
    // } else {
    //   this.getPosition()
    // }
    this.getPosition()

    if (this.titleId) {
      requestTime({
        id: this.titleId,
      }).then(res => {
        // this.checkInfo = res.result
        // if (res.result.status == 1) {
        //   res.result.bkbSetTime.map(item => {
        //     this.timeListText += `${item.startTime}-${item.endTime}, `
        //   })
        //   this.timeListText = this.timeListText.slice(0, this.timeListText.length - 2)
        // }
        res.result.map(item => {
          this.timeListText += `${item.startTime}-${item.endTime}, `
        })
        this.timeListText = this.timeListText.slice(
          0,
          this.timeListText.length - 2
        )
      })
    }
  },
  methods: {
    getPosition() {
      const that = this
      uni.getLocation({
        type: 'wgs84',
        isHighAccuracy: true,
        success: function (lb) {
          console.log('位置信息', lb)
          console.log('当前位置的经度：' + lb.longitude)
          console.log('当前位置的纬度：' + lb.latitude)
          that.latitude = lb.latitude
          that.longitude = lb.longitude
          // this.$store.commit('SET_LATITUDE', JSON.parse(res.message))
          that.$store.commit('SET_LATITUDE', JSON.parse(lb.latitude))
          that.$store.commit('SET_LONGITUDE', JSON.parse(lb.longitude))
          that.mapshow = true
        },
      })
    },

    punchCardRecord(imgurl) {
      console.log(this.$store.state.user, '454')
      const phone = this.$store.state.user.phone
      uni.request({
        url:
          config.baseUrl +
          `/mission_gh/xcx_api/bkbPunchCardRecord/add?punchCardPhone=${phone}&type=${this.title}&userId=${this.$store.state.user.userId}`,
        data: {
          punchCardPhone: phone,
          punchCardDescribe: this.punchCardDescribe,
          punchCardArrayUrl: imgurl,
        },
        method: 'POST',
        success: res => {
          console.log(res, '打卡')
          if (res.data.code === 200) {
            uni.showToast({
              title: '打卡成功',
              icon: 'none',
            })

            setTimeout(() => {
              uni.switchTab({
                url: '/pages/index/index',
              })
            }, 1000)
          } else {
            uni.showToast({
              title: res.data.message,
              icon: 'none',
            })
          }
        },
      })
    },
    //删除图片
    deletePic(e) {
      console.log(e)
      this[`fileList${e.name}`].splice(e.index, 1)
    },
    // 新增图片
    async afterRead(event) {
      console.log(event)
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file)
      let fileListLen = this[`fileList${event.name}`].length
      lists.map(item => {
        this[`fileList${event.name}`].push({
          ...item,
          status: 'uploading',
          message: '上传中',
        })
      })
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].url)
        let item = this[`fileList${event.name}`][fileListLen]
        this[`fileList${event.name}`].splice(
          fileListLen,
          1,
          Object.assign(item, {
            status: 'success',
            message: '',
            url: result,
          })
        )
        fileListLen++
      }
    },
    //上传图片
    uploadFilePromise(url) {
      return new Promise((resolve, reject) => {
        let a = uni.uploadFile({
          url: 'https://lz.api.cestech.com.cn:8150/mission_b/xcx_api/file/imgUpload', // 仅为示例，非真实的接口地址
          filePath: url,
          name: 'file',
          formData: {
            user: 'test',
          },
          success: res => {
            // this.fileList1.push(JSON.parse(res.data).message)
            // setTimeout(() => {
            resolve(JSON.parse(res.data).message)
            // }, 1000)
          },
        })
      })
    },

    toCheckSuccess() {
      // --------- 测试用
      let imgurl = ''
      this.fileList1.forEach((item, index) => {
        imgurl = imgurl + item.url + ','
      })
      imgurl = imgurl.slice(0, -1)
      if (!imgurl && this.title != '建言献策') {
        uni.showToast({
          icon: 'none',
          title: '请拍照后, 再打卡',
        })
        return
      }
      if (this.title == '建言献策' && !this.punchCardDescribe) {
        uni.showToast({
          icon: 'none',
          title: '请填写分享心得后, 再打卡',
        })
        return
      }
      this.punchCardRecord(imgurl)
      return
      //-----------
      let that = this
      // let data = {
      //   x: 104.050345,
      //   y: 30.596797
      // }
      // if (!this.longitude || !this.latitude) {
      //   uni.showToast({
      //     icon: 'none',
      //     title: '正在定位中, 请稍后',
      //   })
      //   return
      // }
      let data = {
        x: that.longitude,
        y: that.latitude,
      }

      // console.log(data);
      addCheck(data).then(res => {
        if (res === true) {
          let imgurl = ''
          this.fileList1.forEach((item, index) => {
            imgurl = imgurl + item.url + ','
          })

          imgurl = imgurl.slice(0, -1)
          if (!imgurl && this.title != '建言献策') {
            uni.showToast({
              icon: 'none',
              title: '请拍照后, 再打卡',
            })
            return
          }
          if (this.title == '建言献策' && !this.punchCardDescribe) {
            uni.showToast({
              icon: 'none',
              title: '请填写分享心得后, 再打卡',
            })
            return
          }
          this.punchCardRecord(imgurl)
        } else {
          uni.showToast({
            title: '不在打卡范围内',
            icon: 'none',
          })
        }
      })
    },
  },
}
</script>

<style lang="scss">
page {
  background: #fff;
}

.map {
  width: 100%;
  height: 100%;
}

.location-container {
  width: 100%;
  height: 100%;
}

.location {
  width: 100%;
  height: 100%;
}

#amap {
  width: 100%;
  height: 100%;
}

.btn {
  width: 400rpx;
  height: 100rpx;
  background: #29ce8c;
  border-radius: 20rpx;
  line-height: 100rpx;
  color: #fff;
  text-align: center;
  margin: 100rpx auto;
}

.title {
  margin-bottom: 20rpx;
  font-size: 28rpx;
}

.content {
  padding: 30rpx;
}

.upload {
  margin-top: 40rpx;
}
</style>
