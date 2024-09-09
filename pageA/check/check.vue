<template>
  <view class="content">
    <!-- 上传图片 -->

    <view class="text">
      <view class="title">
        分享心得：
      </view>
      <u--textarea v-model="punchCardDescribe" placeholder="请输入内容"></u--textarea>
    </view>

    <view class="upload">
      <view class="title">
        图片上传：
      </view>
      <u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" :multiple="true" :maxCount="1"
        width="200rpx" height="200rpx" :deletable="true" :previewFullImage="true" uploadText="选择图片">


      </u-upload>
    </view>

    <view class="btn" @click="toCheckSuccess">
      确认
    </view>
  </view>
</template>

<script>
  import cellGroup from '../../uni_modules/uview-ui/libs/config/props/cellGroup';
  export default {
    data() {
      return {
        punchCardDescribe: '',
        // 上传图片
        fileList1: [],
        myImgUrl: ''
      }
    },
    onLoad() {

    },
    methods: {
      punchCardRecord(imgurl) {
        uni.showLoading({
          title: '加载中'
        });
        const phone = uni.getStorageSync("phone")
        uni.request({
          url: `https://gh.api.cestech.com.cn:8240/mission_gh/xcx_api/bkbPunchCardRecord/add?punchCardPhone=${phone}`,
          data: {
            punchCardPhone: uni.getStorageSync("phone"),
            punchCardDescribe: this.punchCardDescribe,
            punchCardArrayUrl: imgurl
          },
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
          },
          method: "POST",
          success: (res) => {
            // if (res.code == 200) {
            uni.hideLoading();
            uni.redirectTo({
              url: '/pageA/checkSuccess/checkSuccess'
            })
            // }

          },
          fail: (res) => {

          }
        })
      },
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
            url: 'https://gh.api.cestech.com.cn:8240/mission_gh/xcx_api/file/imgUpload', // 仅为示例，非真实的接口地址
            filePath: url,
            name: 'file',
            formData: {
              user: 'test'
            },
            header: {
              'x-Resource-Token': uni.getStorageSync('xtoken'),
            },
            success: (res) => {
              this.myImgUrl = res.data.result
              resolve(res.data.result)
            }
          });
        })
      },

      toCheckSuccess() {

        let imgurl = ''
        this.fileList1.forEach((item, index) => {


          imgurl = imgurl + item.thumb + ","

        })
        imgurl = imgurl.slice(0, -1);
        console.log('fileList1', imgurl);
        this.punchCardRecord(this.myImgUrl)

      }
    }
  }
</script>

<style lang="scss">
  .btn {
    width: 400rpx;
    height: 100rpx;
    background: #29CE8C;
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