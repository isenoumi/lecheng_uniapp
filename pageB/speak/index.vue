<template>
  <view>
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
            <u--text text="我随便说" color="#fff"></u--text>
          </view>
        </navbar>
      </view>
    </view>

    <u--form
      label-position="top"
      :model="form"
      :rules="rules"
      ref="uForm"
      labelWidth="5rem">
      <view class="form">
        <u-form-item
          label="您的姓名"
          prop="wxNickname"
          borderBottom
          ref="wxNickname"
          label-position="left"
          required>
          <u--input
            v-model="form.wxNickname"
            border="none"
            placeholder="请填写您的姓名"
            clearable></u--input>
        </u-form-item>
        <u-form-item
          label="您的电话"
          prop="wxPhone"
          borderBottom
          label-position="left"
          ref="wxPhone">
          <u--input
            v-model="form.wxPhone"
            border="none"
            placeholder="请填写您的电话"
            clearable></u--input>
        </u-form-item>

        <u-form-item
          label="我的献言"
          prop="problemStatement"
          borderBottom
          ref="problemStatement"
          required>
          <u--textarea
            border="none"
            v-model="form.problemStatement"
            clearable
            placeholder="请输入我的献言"></u--textarea>
        </u-form-item>
      </view>
      <view class="form">
        <u-form-item label="上传图片" prop="image">
          <view class="upload">
            <view class="imageTips"> (支持单个图片，单个文件不超过10M) </view>
            <u-upload
              :fileList="fileList1"
              @afterRead="afterRead"
              @delete="deletePic"
              name="1"
              :multiple="true"
              :maxCount="1"
              width="200rpx"
              height="200rpx"
              :deletable="true"
              :previewFullImage="true"
              uploadText="选择图片">
            </u-upload>
          </view> </u-form-item
      ></view>
    </u--form>
    <view class="btn" @click="submit">
      <view> 提交</view>
    </view>
    <!-- <view class="record" @click="toFeedbackCenter">查看我的记录</view> -->
    <view class="tips"
      >对城市管理提出好的意见建议，我们会定期选择一定的
      意见建议，优秀建议我们会给予一定奖励</view
    >
  </view>
</template>

<script>
import { addConvenientlyType } from './api/index'
export default {
  data() {
    return {
      fileList1: [],
      url_img: '',
      form: {
        url_img: '',
        wxNickname: uni.getStorageSync('realName'),
        wxPhone: uni.getStorageSync('phone'),
        problemStatement: '',
      },
      rules: {
        problemStatement: {
          type: 'string',
          required: true,
          message: '请填写我的献言',
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
        // wxPhone: [
        //   {
        //     required: true,
        //     message: '请填写联系电话',
        //     trigger: ['change', 'blur'],
        //   },
        //   {
        //     // 自定义验证函数，见上说明
        //     validator: (rule, value, callback) => {
        //       // 上面有说，返回true表示校验通过，返回false表示不通过
        //       // uni.$u.test.mobile()就是返回true或者false的
        //       return uni.$u.test.mobile(value)
        //     },
        //     message: '手机号码不正确',
        //     // 触发器可以同时用blur和change
        //     trigger: ['change', 'blur'],
        //   },
        // ],
      },
    }
  },
  computed: {},
  onReady() {
    //onReady 为uni-app支持的生命周期之一
    this.$refs.uForm.setRules(this.rules)
  },
  onLoad(option) {},
  methods: {
    toFeedbackCenter() {
      uni.navigateTo({
        url: `pageC/feedbackCenter/index`,
      })
    },
    submit() {
      this.form.problemFile = this.url_img
      console.log(this.form.problemFile, this.url_img)
      // 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
      this.$refs.uForm
        .validate()
        .then(res => {
          addConvenientlyType({
            ...this.form,
            convenientlyType: 'SAY_WHATEVER_YOU_WANT',
          }).then(res => {
            if (res.code == 200) {
              uni.showToast({
                title: '提交成功',
                icon: 'none',
              })
              setTimeout(() => {
                uni.navigateBack()
              }, 1500)
            }
          })
        })
        .catch(errors => {})
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

            resolve(this.url_img)
          },
        })
      })
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
    line-height: 52rpx;
    text-align: left;
    position: absolute;
    top: -54rpx;
    left: 128rpx;
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
  text-align: center;
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
