<template>
  <view class="content">
    <!-- <u-loading-page :loading="pageLoading"></u-loading-page> -->
    <u--form labelPosition="left" :model="form" ref="form" labelWidth="5em">
      <u-form-item
        label="昵称"
        prop="nickName"
        borderBottom
        ref="nickName"
        required>
        <input
          v-model="form.nickName"
          type="nickname"
          border="none"
          placeholder="请填写昵称"
          clearable></input>
      </u-form-item>

      <u-form-item label="头像" borderBottom style="">
        <!-- <image :src="newAvatar ? newAvatar : userInfo.avatar"></image> -->
        <button
          type="balanced"
          open-type="chooseAvatar"
          @chooseavatar="onChooseavatar"
          :plain="true"
          style="
            border: none;
            display: flex;
            justify-content: left;
            padding: 0;
            margin: 0;
          ">
          <u-avatar v-if="!form.avatarUrl"></u-avatar>
          <u-avatar v-else :src="form.avatarUrl"></u-avatar>
        </button>
      </u-form-item>

      <u-form-item label="姓名" prop="name" borderBottom ref="name" required>
        <u--input
          v-model="form.name"
          border="none"
          placeholder="姓名,只能为中文"
          clearable></u--input>
      </u-form-item>

      <u-form-item
        label="性别"
        prop="gender"
        borderBottom
        @click="
          showgender = true
          hideKeyboard()
        "
        required>
        <u--input
          v-model="form.gender_text"
          disabled
          disabledColor="#ffffff"
          placeholder="请选择性别"
          border="none">
        </u--input>
        <u-icon slot="right" name="arrow-right"></u-icon>
      </u-form-item>
      <u-form-item
        label="用户类型"
        prop="userType"
        borderBottom
        @click="
          showUserType = true
          hideKeyboard()
        "
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
        label="所在地区"
        prop="newArea"
        borderBottom
        ref="newArea"
        required>
        <picker
          mode="multiSelector"
          :value="multiIndex"
          :range="newAddressList"
          range-key="label"
          @change="pickerChange"
          @columnchange="pickerColumnchange">
          <view class="uni-input" v-if="showArea">
            <!-- {{ newAddressList[0][multiIndex[0]].label
            }}{{ newAddressList[1][multiIndex[1]].label
            }}{{ newAddressList[2][multiIndex[2]].label
            }}{{ newAddressList[3][multiIndex[3]].label }} -->
            <span v-for="item, index in form.newAreaTxt" :key="index">{{item}}</span>
          </view>
          <view v-else style="color: #c0c4cc"> 请选择所在地区</view>
        </picker>
        <u-icon slot="right" name="arrow-right"></u-icon>
      </u-form-item>

      <u-form-item
        label="详细地址"
        prop="newAddress"
        borderBottom
        ref="newAddress"
        required>
        <u--input
          type="address"
          v-model="form.newAddress"
          border="none"
          placeholder="请输入您所居住的小区名字/院落组别"
          clearable>
        </u--input>
      </u-form-item>

      <view class="margin-top-lg">
        <u-button
          type="primary"
          text="确认修改"
          @click="showSubmit = true"
          :showCancelButton="true">
        </u-button>
      </view>
    </u--form>
    <u-modal
      :show="showSubmit"
      :showCancelButton="true"
      title="提示"
      content="是否修改此内容"
      confirmColor="#1DD193"
      @cancel="showSubmit = false"
      @confirm="submit()"></u-modal>
    <u-action-sheet
      :show="showgender"
      :actions="genderActions"
      title="请选择性别"
      @close="showgender = false"
      @select="genderSelect">
    </u-action-sheet>
    <u-action-sheet
      :show="showUserType"
      :actions="[
        { value: 'RESIDENT', name: '业主' },
        { value: 'OUTPATIENT', name: '租户' },
        { value: 'OHTERS', name: '其他' },
      ]"
      title="请选择用户类型"
      @close="showUserType = false"
      @select="userTypeSelect">
    </u-action-sheet>
  </view>
</template>

<script>
import cityJson from '@/pageA/static/pcas-code-sichuan.json'
import { mapState } from 'vuex'
const defaultForm = {
  name: '',
  gender: '',
  userType: '',
  newAddress: '',
  newArea: '',
  newAreaTxt: [],
  nickName: '',
  avatarUrl: '',
}
export default {
  filters: {},
  props: ['details'],
  data() {
    return {
      nickName:'',
      showArea: false,
      newAddressList: this.$store.state.areaJSON,oldAddressList: cityJson,
      multiIndex: [0, 0, 0, 0],
      showSubmit: false,
      fileList1: [],
      globalData: getApp().globalData,
      pageLoading: true,
      showgender: false,
      showUserType: false,
      genderActions: [
        {
          name: '男',
          value: 1,
        },
        {
          name: '女',
          value: 2,
        },
      ],

      form: uni.$u.deepClone(defaultForm),
      rules: {
        nickName: {
          type: 'string',
          required: true,
          message: '请填写昵称',
          trigger: ['blur', 'change'],
        },
        name: [
          {
            type: 'string',
            required: true,
            message: '请填写姓名',
            trigger: ['blur', 'change'],
          },
          {
            // 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
            validator: (rule, value, callback) => {
              // 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
              return uni.$u.test.chinese(value)
            },
            message: '姓名必须为中文',
            // 触发器可以同时用blur和change，二者之间用英文逗号隔开
            trigger: ['change', 'blur'],
          },
        ],
        gender: {
          type: 'number',
          required: true,
          message: '请选择男或女',
          trigger: ['blur', 'change'],
        },
        phone: [
          {
            required: true,
            message: '请填写联系电话',
            trigger: ['change', 'blur'],
          },
          {
            // 自定义验证函数，见上说明
            validator: (rule, value, callback) => {
              // 上面有说，返回true表示校验通过，返回false表示不通过
              // uni.$u.test.mobile()就是返回true或者false的
              return uni.$u.test.mobile(value)
            },
            message: '手机号码不正确',
            // 触发器可以同时用blur和change
            trigger: ['change', 'blur'],
          },
        ],
        newArea: {
          type: 'string',
          required: true,
          message: '请选择所在地区',
          trigger: ['change'],
        },
        // newAddress:           {
        //     required: true,
        //     message: '请填写详细地址',
        //     trigger: ['change', 'blur'],
        //   },
      },
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      cityDataTree: state => state.cityDataTree,
    }),
  },
  watch: {
    pageLoading(val) {
      if (!val) {
        this.$nextTick(() => {
          this.$refs['form'] && this.$refs['form'].setRules(this.rules)
        })
      }
    },
  },
  mounted() {
    this.$refs['form'] && this.$refs['form'].setRules(this.rules)
  },
  created() {
    uni.request({
      url: `https://gh.api.cestech.com.cn:8240/mission_gh/v1/user/info`,
      header: {
        'x-Resource-Token': uni.getStorageSync('xtoken'),
      },
      method: 'GET',
      success: res => {
        console.log(res.data.result, 111)
        this.details = res.data.result.records[0]
        this.form = this.details
        //回显地区
        if (this.details.newArea) {
          this.multiIndex = JSON.parse(this.details.newArea)
this.showArea = true
        }

        this.form.gender_text = this.details.gender == 1 ? '男' : '女'
        // this.form.userType_text = this.details.newUserType == 'OUTPATIENT' ? '租户' : this.form.userType_text = this.details.newUserType == 'RESIDENT' ? '业主' : ''
        if(this.details.newUserType){
          switch (this.details.newUserType) {
            case 'OUTPATIENT':
            this.form.userType_text ='租户'
              break;
            case 'RESIDENT':
            this.form.userType_text ='业主'
              break;
          
            default:
            this.form.userType_text ='其他'
              break;
          }
        }
      },
    })
  },
  onShow() {},
  methods: {
    pickerChange(e) {
      this.form.newArea = JSON.stringify(e.detail.value)
      this.form.newAreaTxt = [
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
      // if (e.detail.column === 2) {
      //   this.multiIndex[2] = e.detail.value
      //   this.newAddressList[3] = this.oldAddressList[
      //     this.multiIndex[0]
      //   ].children[this.multiIndex[1]].children[
      //     this.multiIndex[2]
      //   ].children.map((item, index) => {
      //     // console.log('item:',item);
      //     var obj = {
      //       label: item.name,
      //       value: item.name,
      //     }
      //     return obj
      //   })
      //   // 第三列 滑动 第四列 变成第一个
      //   this.multiIndex.splice(3, 1, 0)
      // }
      // if (e.detail.column === 3) {
      //   this.multiIndex[3] = e.detail.value
      // }
      if (e.detail.column === 2) {
        this.multiIndex[2] = e.detail.value
      }
    },
    onChooseavatar(e) {
      this.update(e.detail.avatarUrl) //上传图片
    },
    avaUrl() {
      uni.chooseImage({
        // 从本地相册选择图片或使用相机拍照。
        count: 1, //默认选择1张图片
        sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
        success: res => {
          console.log(res.tempFilePaths[0]) //成功则返回图片的本地文件路径列表 tempFilePaths
          this.form.avatarUrl = res.tempFilePaths[0] //更新本低浏览头像图片
          this.update(res.tempFilePaths[0]) //上传图片
        },
      })
    },
    //上传图片
    update(filePath) {
      const _this = this
      const token = uni.getStorageSync('xtoken')
      const res = uni.uploadFile({
        url: 'https://gh.api.cestech.com.cn:8240/mission_gh/wx/WxApi/imgUpload', //仅为示例，非真实的接口地址
        filePath: filePath,
        name: 'file',
        formData: {
          user: 'test',
        },
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
        },
        success: res => {
          console.log(JSON.parse(res.data).result, 'toux')

          // this.$nextTick(() => {
          this.form.avatarUrl = JSON.parse(res.data).result
          // })
          // console.log(JSON.parse(res.data).data)  //处理格式
          // this.weChatRegister(JSON.parse(res.data).result)	//将真实图片地址请求给后端做修改
        },
      })
    },

    genderSelect(e) {
      this.form.gender = e.value
      this.form.gender_text = e.name
      this.$refs.form.validateField('gender')
    },
    userTypeSelect(e) {
      this.form.userType = e.value
      this.form.userType_text = e.name
      this.$refs.form.validateField('userType')
    },
    submit() {
      let pages = getCurrentPages() // 当前页面
      let beforePage = pages[pages.length - 2]
      console.log(this.form, this.form.nickName)
      // 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
      this.$refs.form
        .validate()
        .then(res => {
          const params = {
            avatarUrl: this.form.avatarUrl,
            nickName: this.form.nickName,
            name: this.form.name,
            newArea: this.form.newArea,
            newAreaTxt: this.form.newAreaTxt,
            gender: this.form.gender,
            newUserType: this.form.userType,
            newAddress: this.form.newAddress,
          }
          this.$emit('success', params)
          setTimeout(() => {
            uni.navigateBack({
              delta: 1,
              success: function () {
                beforePage.$vm.init() // 执行前一个页面的init 来实现刷新
              },
            })
          }, 300)
        })
        .catch(errors => {})
      this.showSubmit = false
    },
  },
}
</script>

<style lang="scss" scoped></style>
