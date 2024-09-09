<template>
  <view class="content">
    <view class="mainBox bg-white">
      <view class="u-nav">
        <navbar
          :safeAreaInsetTop="true"
          placeholder
          height="55"
          leftIconColor="#fff"
          imageSrc="https://oms.cestech.com.cn/BkpKnowledge/img/286b4a1bb0f64d0286f488097a260707/蒙版组 8.png"
          autoBack>
          <view class="u-nav-slot" slot="center">
            <u--text text="拍照打卡" color="#fff"></u--text>
          </view>
        </navbar>
      </view>
    </view>
    <!-- 上传图片 -->
    <view class="box form" style="margin-top: 8rpx">
      <u--form
        label-position="top"
        :model="form"
        :rules="rules"
        ref="form"
        labelWidth="5rem">
        <u-form-item label="拍照打卡" prop="problemFile" required>
          <view class="upload">
            <view class="imageTips"> (支持1-3张图片，单个文件不超过10M) </view>
            <view
              v-if="title == '光盘行动' || checkInfo.status == 1"
              style="font-size: 12px; color: #a2aca8; margin-top: -20rpx">
              每日{{ timeListText }}可打卡
            </view>
            <u-upload
              capture="camera"
              :fileList="fileList1"
              @afterRead="afterRead"
              @delete="deletePic"
              name="1"
              :multiple="true"
              :maxCount="3"
              width="180rpx"
              height="180rpx"
              :deletable="true"
              :previewFullImage="true"
              uploadText="选择图片">
            </u-upload>
          </view>
        </u-form-item>
        <u-form-item
          label="分享心得"
          prop="punchCardDescribe"
          ref="punchCardDescribe"
          required>
          <u--textarea
            border="none"
            v-model="form.punchCardDescribe"
            clearable
            placeholder="请输入分享心得"></u--textarea>
        </u-form-item>
      </u--form>
      <!-- <view class="upload" v-if="title != '建言献策'">
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
        </u-upload>
      </view>
      <view class="text" style="margin: 30rpx 0">
        <view class="title"> 分享心得： </view>
        <u--textarea
          v-model="punchCardDescribe"
          placeholder="请输入内容"></u--textarea>
      </view> -->
    </view>
    <!-- <view class="box">
      <view class="title"> 我的位置： </view>
      <view>
        <map
          v-if="mapshow"
          :show-location="true"
          style="width: 624rpx; height: 288rpx"
          :longitude="longitude"
          :latitude="latitude">
        </map>
      </view>
    </view> -->
    <view class="btn" @click="toCheckSuccess"> 确认 </view>
  </view>
</template>

<script>
import { addCheck, requestTime } from './api/index.js'
import config from '@/config.js'
export default {
  data() {
    return {
      form: {
        url_img: '',
        punchCardDescribe: '',
        problemFile: '',
      },
      rules: {
        punchCardDescribe: {
          type: 'string',
          required: true,
          message: '请填写分享心得',
          trigger: ['blur', 'change'],
        },
        problemFile: [
          {
            type: 'string',
            required: true,
            message: '请上传图片',
            trigger: ['blur', 'change'],
          },
        ],
      },
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
      // markers: [
      //   {
      //     latitude: 30.574917,
      //     longitude: 104.068764,
      //     iconPath: '../../staic/assets/gou.png',
      //   },
      // ],
    }
  },
  mounted() {},
  onLoad(options) {
    if (options.title) {
      this.title = options.title
      this.titleId = options.id
    }
    this.getPosition()

    if (this.titleId) {
      requestTime({
        id: this.titleId,
      }).then(res => {
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
          that.mapshow = true
        },
      })
    },

    punchCardRecord() {
      const phone = uni.getStorageSync('phone')
      uni.request({
        url:
          config.baseUrl +
          `/mission_gh/xcx_api/bkbPunchCardRecord/add?punchCardPhone=${phone}&type=${
            this.title
          }&userId=${1}`,
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
        },
        data: {
          punchCardPhone: phone,
          punchCardDescribe: this.form.punchCardDescribe,
          punchCardArrayUrl: this.form.problemFile,
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
              // uni.switchTab({
              //   url: '/pages/index/index',
              // })
              uni.navigateBack()
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
          url: 'https://gh.api.cestech.com.cn:8240/mission_gh/wx/WxApi/imgUpload', // 仅为示例，非真实的接口地址
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
          },
          filePath: url,
          name: 'file',
          formData: {
            user: 'test',
          },
          success: res => {
            this.url_img = JSON.parse(res.data).result
            // this.form.problemFile = JSON.parse(res.data).result
            resolve(this.url_img)
          },
        })
      })
    },

    toCheckSuccess() {
      let imgurl = ''
      this.fileList1.forEach((item, index) => {
        imgurl = imgurl + item.url + ','
      })
      this.form.problemFile = imgurl.slice(0, -1)
      console.log('this.form.problemFile ', this.form.problemFile)
      this.$refs.form
        .validate()
        .then(res => {
          this.punchCardRecord()
        })
        .catch(errors => {})
      return
      // --------- 测试用

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
<style>
page {
  background: #f5f5f5;
}
</style>
<style lang="scss" scoped>
.form {
  width: 688rpx;
  background: #ffffff;
  border-radius: 12rpx 12rpx 12rpx 12rpx;
  margin: 20rpx auto;
  padding: 32rpx;
  .upload {
    position: relative;
  }
  .imageTips {
    font-weight: 400;
    font-size: 24rpx;
    color: #8c929b;
    line-height: 52rpx;
    text-align: left;
    position: absolute;
    top: -94rpx;
    left: 128rpx;
    z-index: 999;
  }
}
.box {
  background-color: #fff;
  border-radius: 16rpx;
  margin: 32rpx auto;
  width: 688rpx;
  padding: 32rpx;
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

.btn {
  width: 688rpx;
  height: 96rpx;
  line-height: 96rpx;
  background-color: #1dd193;
  border-radius: 12rpx 12rpx 12rpx 12rpx;
  color: #fff;
  text-align: center;
  margin: 300rpx auto 0;
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
