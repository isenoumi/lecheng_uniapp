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
            <u--text text="我要申报" color="#fff"></u--text>
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
        <view class="title">服务地址</view>
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
        <u-form-item
          label="经纬度"
          prop="lnglat"
          label-position="left"
          @click="toGetPosition"
          required>
          <u--input
            v-model="form.lnglat"
            disabled
            disabledColor="#ffffff"
            border="none">
          </u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label="详细地址" prop="address" ref="address" required>
          <u--textarea
            border="none"
            v-model="form.address"
            clearable
            placeholder="请将地址详细到门牌号，如：广汉市中山大道东一段100号"></u--textarea>
        </u-form-item>
      </view>
      <view class="form">
        <view class="title">服务内容</view>
        <u-form-item
          label="类型"
          prop="typeTxt"
          borderBottom
          @click="showType = true"
          label-position="left"
          required>
          <u--input
            v-model="form.typeTxt"
            disabled
            disabledColor="#ffffff"
            placeholder="请选择类型"
            border="none">
          </u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item
          v-if="form.type == 'UNLOCK_AND_CHANGE_LOCKS'"
          label="公安报备证明"
          prop="reportFile"
          labelWidth="100px"
          required>
          <view class="upload">
            <u-upload
              :fileList="fileListreportFile"
              @afterRead="afterRead($event, 'reportFile')"
              @delete="deletePic($event, 'reportFile')"
              name="1"
              :multiple="true"
              :maxCount="1"
              width="200rpx"
              height="200rpx"
              :deletable="true"
              :previewFullImage="true"
              uploadText="选择图片">
            </u-upload>
          </view>
        </u-form-item>

        <u-form-item
          label="名称"
          prop="shopNames"
          borderBottom
          label-position="left"
          ref="shopNames"
          required>
          <u--input
            v-model="form.shopNames"
            border="none"
            placeholder="请填写您的名称"
            clearable></u--input>
        </u-form-item>
        <u-form-item
          label="联系电话"
          prop="phone"
          borderBottom
          label-position="left"
          ref="phone"
          :required="showRequired">
          <u--input
            v-model="form.phone"
            border="none"
            placeholder="请填写您的电话"
            clearable></u--input>
        </u-form-item>
        <u-form-item label="外观照" prop="doorstepPhoto" required>
          <view class="uploadMen">
            <view class="imageTipsMen">
              请将手机横着，正面、左侧、右侧拍三张照片，门面要完整，左侧和
              右侧照片要能看到其他店门面或标志性建筑。
            </view>
            <u-upload
              :fileList="fileListdoorstepPhoto"
              @afterRead="afterRead($event, 'doorstepPhoto')"
              @delete="deletePic($event, 'doorstepPhoto')"
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
        </u-form-item>
        <u-form-item
          label="营业执照"
          prop="businessLicense"
          :required="showRequired">
          <view class="upload">
            <view class="imageTips"> 营业执照要清晰完整，不可倾斜。 </view>
            <u-upload
              :fileList="fileListbusinessLicense"
              @afterRead="afterRead($event, 'businessLicense')"
              @delete="deletePic($event, 'businessLicense')"
              name="1"
              :multiple="true"
              :maxCount="1"
              width="200rpx"
              height="200rpx"
              :deletable="true"
              :previewFullImage="true"
              uploadText="选择图片">
            </u-upload>
          </view>
        </u-form-item>
        <u-form-item
          label="统一社会信用代码"
          prop="socialSreditCode"
          borderBottom
          label-position="left"
          ref="socialSreditCode"
          :required="showRequired">
          <u--input
            v-model="form.socialSreditCode"
            border="none"
            placeholder="请填写统一社会信用代码"
            clearable></u--input>
        </u-form-item>
        <u-form-item
          label="经营范围"
          prop="serviceName"
          borderBottom
          label-position="left"
          ref="serviceName"
          :required="showRequired">
          <u--input
            v-model="form.serviceName"
            border="none"
            placeholder="请填写主要经营范围"
            clearable></u--input>
        </u-form-item>

        <u-form-item
          label="营业时间"
          prop="businessHoursTxt"
          borderBottom
          @click="showTime = true"
          label-position="left"
          :required="showRequired">
          <picker
            mode="multiSelector"
            :range="list"
            :value="multiIndexTime"
            range-key="label"
            @change="confirmTime">
            <view
              style="
                background-color: white;
                display: flex;
                justify-content: right;
              ">
              <u--input
                v-model="form.businessHoursTxt"
                disabled
                disabledColor="#ffffff"
                placeholder="请选择营业时间"
                border="none">
              </u--input>
              <u-icon slot="right" name="arrow-right"></u-icon>
            </view>
          </picker>
        </u-form-item>
      </view>
    </u--form>
    <view class="btn">
      <u-button
        type="primary"
        :loading="btnLoading"
        text="提交"
        @click="submit"
        :showCancelButton="true">
      </u-button>
    </view>

    <!-- <view class="record" @click="toFeedbackCenter">我的申报记录</view> -->
    <view style="height: 40rpx"></view>
    <u-action-sheet
      :show="showType"
      :actions="typeActions"
      title="请选择类型"
      @close="showType = false"
      @select="userTypeSelect">
    </u-action-sheet>
  </view>
</template>

<script>
import cityJson from '@/pageA/static/pcas-code-sichuan.json'
import { mapState } from 'vuex'
import selfPicker from '@/components/picker.vue'
import { addbkbDeclareRecord, bkbPointStaff } from './api/index'
export default {
  components: {
    selfPicker,
  },
  data() {
    return {
      typeActions: [
        // {
        //   name: '停车场',
        //   value: 'PARKING_LOT',
        //   rules: true,
        // },
        // {
        //   name: '公共厕所',
        //   value: 'PUBLIC_TOILETS',
        //   rules: true,
        // },

        {
          name: '家政服务',
          value: 'HOUSEKEEPING',
        },
        // {
        //   name: '早市夜市',
        //   value: 'MORNING_AND_NIGHT_MARKETS',
        //   rules: true,
        // },
        // {
        //   name: '爱心驿站',
        //   value: 'LOVE_STATION',
        //   rules: true,
        // },
        // {
        //   name: '充电桩',
        //   value: 'CHARGING_PILES',
        //   rules: true,
        // },
        {
          name: '开锁换锁',
          value: 'UNLOCK_AND_CHANGE_LOCKS',
        },

        // {
        //   name: '便民收运',
        //   value: 'CONVENIENT_TRANSPORTATION',
        //   rules: true,
        // },
        {
          name: '管道疏通',
          value: 'CONVENIENCE_STALLS',
        },
        {
          name: '修鞋缝补',
          value: 'SHOE_REPAIR',
        },
      ],
      showRequired: true,
      showType: false,
      multiIndex: [0, 0, 0, 0],
      multiIndexTime: [0, 0, 0, 0],
      fileListreportFile: [],
      fileListdoorstepPhoto: [],
      fileListbusinessLicense: [],
      oldAddressList: cityJson,
      showArea: false,
      newAddressList: this.$store.state.areaJSON,
      // list: getApp().globalData.defaultList,
      show: true,
      list: getApp().globalData.defaultList,
      url_img: '',
      form: {
        url_img: '',
        businessHoursTxt: '',
        typeTxt: '',
        phone: uni.getStorageSync('phone'),
        type: '',
        address: '',
        reportFile: '',
        doorstepPhoto: '',
        businessLicense: '',
        area: '',
      },
      regionIdx: [],
      showTime: false,
      rules: {
        lnglat: {
          type: 'string',
          required: true,
          message: '请选择经纬度',
          trigger: ['blur', 'change'],
        },
        shopNames: {
          type: 'string',
          required: true,
          message: '请填写名称',
          trigger: ['blur', 'change'],
        },
        type_text: {
          type: 'string',
          required: true,
          message: '请选择类型',
          trigger: ['blur', 'change'],
        },
        businessHoursTxt: {
          type: 'string',
          required: true,
          message: '请选择营业时间',
          trigger: ['blur', 'change'],
        },
        socialSreditCode: {
          type: 'string',
          required: true,
          message: '请填写统一社会信用代码',
          trigger: ['blur', 'change'],
        },
        serviceName: {
          type: 'string',
          required: true,
          message: '请填写主要经营范围',
          trigger: ['blur', 'change'],
        },
        doorstepPhoto: [
          {
            type: 'string',
            required: true,
            message: '请上传图片',
            trigger: ['blur', 'change'],
          },
          // {
          //   // 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
          //   validator: (rule, value, callback) => {
          //     // 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
          //     console.log(value.indexOf('undefined'))
          //     if (value.indexOf('undefined') !== -1) return false
          //     else return true
          //   },
          //   message: '请上传3张图片',
          //   // 触发器可以同时用blur和change，二者之间用英文逗号隔开
          //   trigger: ['change', 'blur'],
          // },
        ],
        businessLicense: [
          {
            type: 'string',
            required: true,
            message: '请上传图片',
            trigger: ['blur', 'change'],
          },
        ],
        reportFile: [
          {
            type: 'string',
            required: true,
            message: '请上传图片',
            trigger: ['blur', 'change'],
          },
        ],
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
              console.log(value)
              return uni.$u.test.mobile(value)
            },
            message: '手机号码不正确',
            // 触发器可以同时用blur和change
            trigger: ['change', 'blur'],
          },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      cityDataTree: state => state.cityDataTree,
    }),
  },
  onReady() {
    //onReady 为uni-app支持的生命周期之一
    this.$refs.form.setRules(this.rules)
  },
  onLoad(option) {
    console.log(this.list)
    this.checkUser()
    // return
    // //回显地区
    if (uni.getStorageSync('newArea')) {
      this.multiIndex = JSON.parse(uni.getStorageSync('newArea'))
      this.form.area = JSON.parse(uni.getStorageSync('newArea'))
      this.form.areaTxt = [
        this.newAddressList[0][this.multiIndex[0]].label,
        this.newAddressList[1][this.multiIndex[1]].label,
        this.newAddressList[2][this.multiIndex[2]].label,
        // this.newAddressList[3][this.multiIndex[3]].label,
      ]
      this.showArea = true
      console.log('pickerChange:', this.form.area, this.form.areaTxt)
    }
  },

  methods: {
    checkUser() {
      bkbPointStaff({ phone: uni.getStorageSync('phone') }).then(res => {
        if (res.result == 0) {
          this.typeActions = [
            {
              name: '停车场',
              value: 'PARKING_LOT',
              rules: true,
            },
            {
              name: '公共厕所',
              value: 'PUBLIC_TOILETS',
              rules: true,
            },

            {
              name: '家政服务',
              value: 'HOUSEKEEPING',
            },
            {
              name: '早市夜市',
              value: 'MORNING_AND_NIGHT_MARKETS',
              rules: true,
            },
            {
              name: '爱心驿站',
              value: 'LOVE_STATION',
              rules: true,
            },
            {
              name: '充电桩',
              value: 'CHARGING_PILES',
              rules: true,
            },
            {
              name: '开锁换锁',
              value: 'UNLOCK_AND_CHANGE_LOCKS',
            },

            {
              name: '便民收运',
              value: 'CONVENIENT_TRANSPORTATION',
              rules: true,
            },
            {
              name: '管道疏通',
              value: 'CONVENIENCE_STALLS',
            },
            {
              name: '修鞋缝补',
              value: 'SHOE_REPAIR',
            },
          ]
        }
      })
    },
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
      if (e.detail.column === 2) {
        this.multiIndex[2] = e.detail.value
      }
    },

    //------
    userTypeSelect(e) {
      console.log('eeee,', e)
      this.form.type = e.value
      this.form.typeTxt = e.name

      if (e.rules) {
        this.showRequired = false
        this.rules = {
          lnglat: {
            type: 'string',
            required: true,
            message: '请选择经纬度',
            trigger: ['blur', 'change'],
          },
          shopNames: {
            type: 'string',
            required: true,
            message: '请填写名称',
            trigger: ['blur', 'change'],
          },
          type_text: {
            type: 'string',
            required: true,
            message: '请选择类型',
            trigger: ['blur', 'change'],
          },
          doorstepPhoto: [
            {
              type: 'string',
              required: true,
              message: '请上传图片',
              trigger: ['blur', 'change'],
            },
            {
              // 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
              validator: (rule, value, callback) => {
                // 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
                console.log(value.indexOf('undefined'))
                if (value.indexOf('undefined') !== -1) return false
                else return true
              },
              message: '请上传3张图片',
              // 触发器可以同时用blur和change，二者之间用英文逗号隔开
              trigger: ['change', 'blur'],
            },
          ],
          reportFile: [
            {
              type: 'string',
              required: true,
              message: '请上传图片',
              trigger: ['blur', 'change'],
            },
          ],
        }

        this.$refs.form.setRules(this.rules)
      } else {
        this.showRequired = true
        this.rules = {
          lnglat: {
            type: 'string',
            required: true,
            message: '请选择经纬度',
            trigger: ['blur', 'change'],
          },
          shopNames: {
            type: 'string',
            required: true,
            message: '请填写名称',
            trigger: ['blur', 'change'],
          },
          type_text: {
            type: 'string',
            required: true,
            message: '请选择类型',
            trigger: ['blur', 'change'],
          },
          businessHoursTxt: {
            type: 'string',
            required: true,
            message: '请选择营业时间',
            trigger: ['blur', 'change'],
          },
          socialSreditCode: {
            type: 'string',
            required: true,
            message: '请填写统一社会信用代码',
            trigger: ['blur', 'change'],
          },
          serviceName: {
            type: 'string',
            required: true,
            message: '请填写主要经营范围',
            trigger: ['blur', 'change'],
          },
          doorstepPhoto: [
            {
              type: 'string',
              required: true,
              message: '请上传图片',
              trigger: ['blur', 'change'],
            },
            // {
            //   // 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
            //   validator: (rule, value, callback) => {
            //     // 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
            //     console.log(value.indexOf('undefined'))
            //     if (value.indexOf('undefined') !== -1) return false
            //     else return true
            //   },
            //   message: '请上传3张图片',
            //   // 触发器可以同时用blur和change，二者之间用英文逗号隔开
            //   trigger: ['change', 'blur'],
            // },
          ],
          businessLicense: [
            {
              type: 'string',
              required: true,
              message: '请上传图片',
              trigger: ['blur', 'change'],
            },
          ],
          reportFile: [
            {
              type: 'string',
              required: true,
              message: '请上传图片',
              trigger: ['blur', 'change'],
            },
          ],
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
                console.log(value)
                return uni.$u.test.mobile(value)
              },
              message: '手机号码不正确',
              // 触发器可以同时用blur和change
              trigger: ['change', 'blur'],
            },
          ],
        }
        this.$refs.form.setRules(this.rules)
      }
      this.$refs.form.clearValidate()
      console.log(' this.$refs.form', this.$refs.form)
    },
    confirmTime(e) {
      this.form.businessHours = JSON.stringify(e.detail.value)
      console.log(this.list[0][0])
      this.form.businessHoursTxt =
        this.list[0][e.detail.value[0]].label +
        ' 至 ' +
        this.list[1][e.detail.value[1]].label +
        ' ' +
        this.list[2][e.detail.value[2]].label +
        ' 至 ' +
        this.list[3][e.detail.value[3]].label
      console.log(
        e.detail.value,
        this.form.businessHours,
        this.form.businessHoursTxt
      )
    },
    toFeedbackCenter() {
      uni.navigateTo({
        url: `pageC/feedbackCenter/index`,
      })
    },
    toGetPosition() {
      uni.chooseLocation({
        success: res => {
          this.form.address = res.address
          this.form.latitude = res.latitude
          this.form.longitude = res.longitude
          this.form.lnglat = res.longitude + ' , ' + res.latitude
        },
        fail: err => {
          console.log(err)
        },
      })
    }, // 地区选择变化
    regionChange(e) {
      console.log(e)
      this.form.area = JSON.stringify(e.detail)
      this.regionIdx = e.detail.map(item => item.value)
      console.log(this.form.area)
    },
    submit() {
      console.log(this.$refs.form)
      this.form.reportFile = this.fileListreportFile[0]?.url
      this.form.doorstepPhoto = ''
      if (this.fileListdoorstepPhoto.length > 0) {
        this.fileListdoorstepPhoto.map(item => {
          this.form.doorstepPhoto += item.url + ','
        })
        this.form.doorstepPhoto = this.form.doorstepPhoto.slice(0, -1)
      }
      this.form.businessLicense = this.fileListbusinessLicense[0]?.url
      let area
      typeof this.form.area == 'string'
        ? (area = this.form.area)
        : (area = JSON.stringify(this.form.area))
      // 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
      this.$refs.form
        .validate()
        .then(res => {
          console.log('qweqweqwe')
          addbkbDeclareRecord({
            ...this.form,
            area,
          }).then(res => {
            if (res.code == 200) {
              uni.showToast({
                title: '提交成功',
                icon: 'none',
              })
              setTimeout(() => {
                uni.switchTab({
                  url: '/pages/index/index',
                })
              }, 1500)
            }
          })
        })
        .catch(errors => {
          console.log(errors)
        })
    },
    //删除图片
    deletePic(e, name) {
      this[`fileList${name}`].splice(e.index, 1)
    },
    // 新增图片
    async afterRead(event, name) {
      console.log(event, name)
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file)
      let fileListLen = this[`fileList${name}`].length
      lists.map(item => {
        this[`fileList${name}`].push({
          ...item,
          status: 'uploading',
          message: '上传中',
        })
      })
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].url)
        let item = this[`fileList${name}`][fileListLen]
        this[`fileList${name}`].splice(
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
.uploadMen {
  margin-top: 70rpx;
  position: relative;
  .imageTipsMen {
    font-weight: 400;
    font-size: 24rpx;
    color: #8c929b;
    line-height: 36rpx;
    text-align: left;
    position: absolute;
    top: -78rpx;
    left: 12rpx;
    z-index: 999;
  }
}
</style>
