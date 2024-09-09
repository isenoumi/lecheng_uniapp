<template>
  <view class="upload">
    <u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" :multiple="true" :maxCount="1"
      width="200rpx" height="200rpx" :deletable="true" :previewFullImage="true" uploadText="选择图片">
    </u-upload>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 上传图片
        fileList1: [],
      }
    },
    onLoad() {

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
            filePath: url,
            name: 'file',
            formData: {
              user: 'test'
            },
            success: (res) => {

              resolve(res.data.data)

            }
          });
        })
      },


    }
  }
</script>

<style lang="scss">

</style>