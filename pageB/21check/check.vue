<template>
  <view class="content">
    <!-- 上传图片 -->

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

    <u--form
      label-position="top"
      :model="form"
      :rules="rules"
      ref="form"
      labelWidth="5rem">
      <view class="form">
        <u-form-item
          label="用户类型"
          prop="userType"
          borderBottom
          @click="typeClick"
          label-position="left"
          required>
          <u--input
            v-model="form.userType_text"
            disabled
            disabledColor="#ffffff"
            placeholder="请选择用户类型"
            border="none">
          </u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
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
      </view>
      <view class="form">
        <u-form-item label="上传图片" prop="imgurl" required>
          <view class="upload" :style="{ 'padding-top': paddingTop }">
            <view class="imageTips" v-if="form.userType == 'ORDINARY_CITIZENS'">
              (请上传餐前餐后桌面对比图，支持1-3张图片，单个文件不超过10M)
            </view>
            <view class="imageTips" v-else-if="form.userType == 'BUSINESS'">
              (请上传店内关于“光盘”“节约”等主题的宣传照片、针对“光盘行动”的活动券画面、顾客实现光盘行动后的桌面图等。单次支持1-3张图片，单个文件不超过10M)
            </view>
            <view
              class="imageTips"
              v-else-if="
                form.userType == 'ORGANS_ENTERPRISES_AND_INSTITUTIONS'
              ">
              (请上传关于“光盘”“节约”等主题的宣传照片、工作人员的光盘画面等。单次支持1-3张图片，单个文件不超过10M)
            </view>
            <view class="imageTips" v-else>
              (支持1-3张图片，单个文件不超过10M)
            </view>
            <u-upload
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
          label="我的位置"
          prop="address"
          label-position="left"
          @click="toGetPosition">
          <u--input
            v-model="form.address"
            disabled
            disabledColor="#ffffff"
            border="none">
          </u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
      </view>
    </u--form>
    <!-- <view class="upload">
      <view class="title"> 图片上传： </view>
      <u-upload
        :fileList="fileList1"
        @afterRead="afterRead"
        @delete="deletePic"
        name="1"
        :multiple="true"
        :maxCount="3"
        width="200rpx"
        height="200rpx"
        :deletable="true"
        :previewFullImage="true"
        uploadText="选择图片">
      </u-upload>
    </view>
    <view class="text">
      <view class="title"> 分享心得： </view>
      <u--textarea
        v-model="punchCardDescribe"
        placeholder="请输入分享心得"></u--textarea>
    </view> -->
    <view class="btn">
      <u-button
        type="primary"
        text="提交"
        @click="submit"
        :showCancelButton="true">
      </u-button>
    </view>
    <u-action-sheet
      :show="showType"
      :actions="actions"
      title="请选择用户类型"
      @close="typeClose"
      @select="userTypeSelect">
    </u-action-sheet>
  </view>
</template>

<script>
// import cellGroup from '../../uni_modules/uview-ui/libs/config/props/cellGroup';
export default {
  data() {
    return {
      paddingTop: '36rpx',
      showType: false,
      title: '',
      punchCardDescribe: '',
      form: {
        punchCardDescribe: '',
        address: '',
        userType_text: '',
        userType: '',
        imgurl: '',
      },
      // 上传图片
      fileList1: [],
      actions: [
        { value: 'ORDINARY_CITIZENS', name: '普通市民' },
        { value: 'BUSINESS', name: '商家' },
        {
          value: 'ORGANS_ENTERPRISES_AND_INSTITUTIONS',
          name: '机关或企事业单位',
        },
      ],
      rules: {
        punchCardDescribe: {
          type: 'string',
          required: true,
          message: '请填写分享心得',
          trigger: ['blur', 'change'],
        },
        userType: {
          type: 'string',
          required: true,
          message: '请选择用户类型',
          trigger: ['blur', 'change'],
        },
        wxNickname: [
          {
            type: 'string',
            required: true,
            message: '请填写姓名',
            trigger: ['blur', 'change'],
          },
        ],
        imgurl: [
          {
            type: 'string',
            required: true,
            message: '请上传图片',
            trigger: ['blur', 'change'],
          },
        ],
      },
    }
  },
  onLoad(option) {
    this.title = option.title
  },
  onReady() {
    //onReady 为uni-app支持的生命周期之一
    this.$refs.form.setRules(this.rules)
  },
  methods: {
    typeClick() {
      this.showType = true
    },
    typeClose() {
      this.showType = false
    },
    userTypeSelect(e) {
      if (e.value == 'ORDINARY_CITIZENS') this.paddingTop = '72rpx'
      else this.paddingTop = '108rpx'
      this.form.userType = e.value
      this.form.userType_text = e.name
    },
    toGetPosition() {
      uni.chooseLocation({
        success: res => {
          this.form.address = res.address
          // this.form.problemLatitude = res.latitude
          // this.form.problemLongitude = res.longitude
          console.log('位置名称：' + res.name)
          console.log('详细地址：' + res.address)
          console.log('纬度：' + res.latitude)
          console.log('经度：' + res.longitude)
        },
        fail: err => {
          console.log(err)
        },
      })
    },
    submit() {
      this.form.imgurl = ''
      this.fileList1.forEach((item, index) => {
        this.form.imgurl = this.form.imgurl + item.url + ','
      })
      this.form.imgurl = this.form.imgurl?.slice(0, -1)
      console.log('this.form.imgurl', this.form.imgurl)
      this.$refs.form
        .validate()
        .then(result => {
          const phone = uni.getStorageSync('phone')
          uni.request({
            url: `https://gh.api.cestech.com.cn:8240/mission_gh/xcx_api/bkbPunchCardRecord/addNew?punchCardPhone=${phone}`,
            data: {
              punchCardPhone: uni.getStorageSync('phone'),
              punchCardDescribe: this.form.punchCardDescribe,
              punchCardArrayUrl: this.form.imgurl,
              punchCardType: this.title + '-活动打卡',
              userType: this.form.userType,
              address: this.form.address,
            },
            header: {
              'x-Resource-Token': uni.getStorageSync('xtoken'),
            },
            method: 'POST',
            success: res => {
              uni.showToast({
                title: res.data.message,
                icon: 'none',
              })
              // if (res.code == 200)
              setTimeout(() => {
                // uni.redirectTo({
                //   url: '/pages/activity_manager/detail?id=1788501831615840258&title=低碳齐参与',
                // })
                uni.navigateBack()
              }, 1000)
            },
          })
        })
        .catch(errors => {})
    },
    punchCardRecord() {
      let imgurl = ''
      this.fileList1.forEach((item, index) => {
        imgurl = imgurl + item.url + ','
      })
      imgurl = imgurl.slice(0, -1)
      // if (!imgurl) {
      //   uni.showToast({
      //     title: '请上传图片',
      //     icon: 'none',
      //   })
      //   return
      // }
      const phone = uni.getStorageSync('phone')
      uni.request({
        url: `https://gh.api.cestech.com.cn:8240/mission_gh/xcx_api/bkbPunchCardRecord/addNew?punchCardPhone=${phone}`,
        data: {
          punchCardPhone: uni.getStorageSync('phone'),
          punchCardDescribe: this.punchCardDescribe,
          punchCardArrayUrl: imgurl,
          punchCardType: this.title + '-活动打卡',
        },
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
        },
        method: 'POST',
        success: res => {
          uni.showToast({
            title: res.data.message,
            icon: 'none',
          })
          setTimeout(() => {
            uni.redirectTo({
              url: '/pageB/21check/index',
            })
          }, 1000)
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
          //url: this.$common.domain+'/api/common/upload', // 仅为示例，非真实的接口地址
          url: 'https://gh.api.cestech.com.cn:8240/mission_gh/xcx_api/file/imgUpload', // 仅为示例，非真实的接口地址
          filePath: url,
          name: 'file',
          formData: {
            user: 'test',
          },
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
          },
          success: res => {
            if (res.data) {
              resolve(JSON.parse(res.data).result)
            } else resolve(res.data.result)
          },
        })
      })
    },

    toCheckSuccess() {
      let imgurl = ''
      this.fileList1.forEach((item, index) => {
        imgurl = imgurl + item.url + ','
      })
      imgurl = imgurl.slice(0, -1)
      this.punchCardRecord(imgurl)
    },
  },
}
</script>
<style>
page {
  background-color: #f5f5f5;
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
    line-height: 36rpx;
    text-align: left;
    position: absolute;
    top: -16rpx;
    left: 10rpx;
    z-index: 999;
  }
}
.btn {
  width: 688rpx;
  height: 80rpx;
  background: #1dd193;
  border-radius: 12rpx 12rpx 12rpx 12rpx;
  margin: 32rpx auto;
  line-height: 80rpx;
  font-weight: 400;
  font-size: 32rpx;
  color: #ffffff;
}
.record {
  width: 168rpx;
  height: 40rpx;
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 28rpx;
  color: #333333;
  line-height: 40rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin: 32rpx auto;
}
.tips {
  width: 552rpx;
  height: 74rpx;
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 24rpx;
  color: #c5c5c5;
  line-height: 40rpx;
  text-align: center;
  font-style: normal;
  text-transform: none;
  margin: 50rpx auto;
}
</style>
