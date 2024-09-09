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
            <u--text text="分类进万家" color="#fff"></u--text>
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
          label="所在组织"
          prop="organization"
          borderBottom
          ref="organization"
          required>
          <picker
            mode="multiSelector"
            :value="multiIndexOrganization"
            :range="newAddressListOrganization"
            range-key="label"
            @change="pickerChangeOrganization"
            @columnchange="pickerColumnchangeOrganization">
            <view class="uni-input" v-if="showOrganization">
              <span
                v-for="(item, index) in form.organizationTxt"
                :key="index"
                >{{ item }}</span
              >
            </view>
            <view v-else style="color: #c0c4cc"> 请选择所在组织</view>
          </picker>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item
          label="入户类型"
          prop="type"
          borderBottom
          @click="showType = true"
          label-position="left"
          required>
          <u--input
            v-model="form.type_text"
            disabled
            disabledColor="#ffffff"
            placeholder="请选择入户类型"
            border="none">
          </u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>

        <u-form-item
          label="业主姓名"
          prop="name"
          ref="name"
          label-position="left"
          borderBottom
          required>
          <u--input
            border="none"
            v-model="form.name"
            clearable
            placeholder="请输入业主姓名"></u--input>
        </u-form-item>
        <u-form-item
          label="所在地区"
          prop="area"
          borderBottom
          ref="area"
          required>
          <picker
            mode="multiSelector"
            :value="multiIndex"
            :range="newAddressList"
            range-key="label"
            @change="pickerChange"
            @columnchange="pickerColumnchange">
            <view class="uni-input" v-if="showArea">
              <span v-for="(item, index) in form.areaTxt" :key="index">{{
                item
              }}</span>
            </view>
            <view v-else style="color: #c0c4cc"> 请选择所在地区</view>
          </picker>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
      </view>
      <view class="form">
        <u-form-item
          label="入户地址"
          prop="address"
          label-position="left"
          @click="toGetPosition"
          borderBottom>
          <u--input
            v-model="form.address"
            disabled
            disabledColor="#ffffff"
            border="none">
          </u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label="入户照片" prop="imgurl" required>
          <view class="upload" style="padding-top: 108rpx">
            <view class="imageTips">
              (支持1-3张图片，能看到其他垃圾桶/厨余垃圾桶/可回收物暂存角；有害垃圾暂存容器等，画面需有适当背景)
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
      <view class="title"> 业主姓名： </view>
      <u--textarea
        v-model="name"
        placeholder="请输入业主姓名"></u--textarea>
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
      title="请选择问题分类"
      @close="showType = false"
      @select="userTypeSelect">
    </u-action-sheet>
  </view>
</template>

<script>
import cityJson from '@/pageA/static/pcas-code-sichuan.json'
import orgJson from '@/pageA/static/organization.json'
import { addCategorizeIntoHousehold } from './api'
// import cellGroup from '../../uni_modules/uview-ui/libs/config/props/cellGroup';
export default {
  data() {
    return {
      actions: [
        { value: 'ORDINARY_CITIZENS', name: '普通市民' },
        { value: 'BUSINESS', name: '商家' },
        {
          value: 'ORGANS_ENTERPRISES_AND_INSTITUTIONS',
          name: '机关或企事业单位',
        },
      ],
      newAddressList: this.$store.state.areaJSON,
      newAddressListOrganization: this.$store.state.orgJSON,
      showArea: false,
      showOrganization: false,
      multiIndex: [0, 0, 0],
      multiIndexOrganization: [0, 0, 0],
      oldAddressList: cityJson,
      oldAddressListOrganization: orgJson,
      showType: false,
      title: '',
      name: '',
      form: {
        name: '',
        address: '',
        type_text: '',
        type: '',
        imgurl: '',
        area: '',
        areaTxt: '',
      },
      // 上传图片
      fileList1: [],
      rules: {
        name: {
          type: 'string',
          required: true,
          message: '请填写业主姓名',
          trigger: ['blur', 'change'],
        },
        type: {
          type: 'string',
          required: true,
          message: '请选择入户类型',
          trigger: ['blur', 'change'],
        },
        organization: {
          type: 'string',
          required: true,
          message: '请选择所在组织',
          trigger: ['blur', 'change'],
        },
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
    userTypeSelect(e) {
      console.log(e)
      this.form.type = e.value
      this.form.type_text = e.name
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
      console.log(this.form.imgurl)
      // return
      console.log('this.form.imgurl', this.form.imgurl)
      this.$refs.form
        .validate()
        .then(result => {
          const phone = uni.getStorageSync('phone')
          addCategorizeIntoHousehold({
            ...this.form,
            photos: this.form.imgurl,
            phone: uni.getStorageSync('phone'),
          }).then(res => {
            uni.showToast({
              title: res.message,
              icon: 'none',
            })
            if (res.code == 200)
              setTimeout(() => {
                uni.navigateBack()
              }, 1000)
          })
        })
        .catch(errors => {
          console.log(errors)
        })
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
          name: this.name,
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
    // areaChange
    pickerChange(e) {
      this.form.area = JSON.stringify(e.detail.value)
      this.form.areaTxt = [
        this.newAddressList[0][e.detail.value[0]].label,
        this.newAddressList[1][e.detail.value[1]].label,
        this.newAddressList[2][e.detail.value[2]].label,
        // this.newAddressList[3][e.detail.value[3]].label,
      ]
      this.showArea = true
    },
    pickerColumnchange(e) {
      // 第几列滑动
      // console.log(e.detail.column);
      // 第几列滑动的下标
      // console.log(e.detail.value)
      // 第一列滑动
      // return
      if (e.detail.column === 0) {
        this.multiIndex[0] = e.detail.value

        this.newAddressList[1] = this.oldAddressList[
          this.multiIndex[0]
        ].children.map((item, index) => {
          var obj = {
            label: item.name,
            value: item.name,
          }
          return obj
        })
        this.newAddressList[2] = this.oldAddressList[
          this.multiIndex[0]
        ].children[this.multiIndex[1]].children.map((item, index) => {
          var obj = {
            label: item.name,
            value: item.name,
          }
          return obj
        })
        this.multiIndex.splice(1, 1, 0)
        this.multiIndex.splice(2, 1, 0)
        // this.multiIndex.splice(3, 1, 0)
      }
      if (e.detail.column === 1) {
        this.multiIndex[1] = e.detail.value
        this.newAddressList[2] = this.oldAddressList[
          this.multiIndex[0]
        ].children[this.multiIndex[1]].children.map((item, index) => {
          // console.log('item:',item);
          var obj = {
            label: item.name,
            value: item.name,
          }
          return obj
        })
        // 第二列 滑动 第三列 变成第一个
        this.multiIndex.splice(2, 1, 0)
        // this.multiIndex.splice(3, 1, 0)
      }
      if (e.detail.column === 2) {
        this.multiIndex[2] = e.detail.value
      }
    },
    // organizationChange
    pickerChangeOrganization(e) {
      this.form.organization = JSON.stringify(e.detail.value)
      this.form.organizationTxt = [
        this.newAddressListOrganization[0][e.detail.value[0]].label,
        this.newAddressListOrganization[1][e.detail.value[1]].label,
        this.newAddressListOrganization[2][e.detail.value[2]].label,
        // this.newAddressList[3][e.detail.value[3]].label,
      ]
      this.showOrganization = true
      console.log(
        ' this.form.organization',
        this.form.organization,
        this.form.organizationTxt
      )
    },
    pickerColumnchangeOrganization(e) {
      this.showOrganization = false
      // 第几列滑动
      // console.log(e.detail.column);
      // 第几列滑动的下标
      // console.log(e.detail.value)
      // 第一列滑动
      // return
      if (e.detail.column === 0) {
        this.multiIndexOrganization[0] = e.detail.value

        this.newAddressListOrganization[1] = this.oldAddressListOrganization[
          this.multiIndexOrganization[0]
        ].children.map((item, index) => {
          var obj = {
            label: item.name,
            value: item.name,
          }
          return obj
        })
        this.newAddressListOrganization[2] = this.oldAddressListOrganization[
          this.multiIndexOrganization[0]
        ].children[this.multiIndexOrganization[1]].children.map(
          (item, index) => {
            var obj = {
              label: item.name,
              value: item.name,
            }
            return obj
          }
        )
        this.multiIndexOrganization.splice(1, 1, 0)
        this.multiIndexOrganization.splice(2, 1, 0)
        // this.multiIndex.splice(3, 1, 0)
      }
      if (e.detail.column === 1) {
        this.multiIndexOrganization[1] = e.detail.value
        this.newAddressListOrganization[2] = this.oldAddressListOrganization[
          this.multiIndexOrganization[0]
        ].children[this.multiIndexOrganization[1]].children.map(
          (item, index) => {
            // console.log('item:',item);
            var obj = {
              label: item.name,
              value: item.name,
            }
            return obj
          }
        )
        // 第二列 滑动 第三列 变成第一个
        this.multiIndexOrganization.splice(2, 1, 0)
        // this.multiIndex.splice(3, 1, 0)
      }
      if (e.detail.column === 2) {
        this.multiIndexOrganization[2] = e.detail.value
      }
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
