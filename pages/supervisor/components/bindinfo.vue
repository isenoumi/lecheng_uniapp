<template>
  <view class="content">
    <u--form labelPosition="left" :value="form" :model="form" ref="form" labelWidth="80" :rules="rules">
      <u-form-item label="姓名" prop="name" borderBottom ref="name" required>
        <u--input v-model="form.name" border="none" placeholder="姓名,只能为中文" clearable holdKeyboard>
        </u--input>

      </u-form-item>
      <u-form-item label="手机号" prop="phone" borderBottom ref="phone" required>
        <u--input v-model="form.phone" border="none" placeholder="请输入联系电话" clearable holdKeyboard>
        </u--input>
      </u-form-item>
      <u-form-item label="性别" prop="gender" borderBottom @click="showgender = true" required>
        <u--input v-model="form.gender_text" disabled disabledColor="#ffffff" placeholder="请选择性别" border="none">
        </u--input>
        <u-icon slot="right" name="arrow-right"></u-icon>
      </u-form-item>

      <u-form-item label="所在小区" prop="community" borderBottom ref="community" required @click="show1=true">
        <u--input v-model="form.xq" disabled disabledColor="#ffffff" placeholder="请选择小区" border="none">
        </u--input>
        <u-picker :show="show1" :columns="columns" keyName="label" @change="changeHandler" @confirm="confirm"
          @cancel="show1=false"></u-picker>

        <u-icon slot="right" name="arrow-right" @click="show1=true"></u-icon>
      </u-form-item>
      <u-form-item label="所在楼栋" prop="floor" borderBottom ref="floor" required @click="show3=true">
        <u--input v-model="form.ld" disabled disabledColor="#ffffff" placeholder="请选择楼栋" border="none"
          @click="show3=true">
        </u--input>
        <u-picker :show="show3" :columns="columns2" keyName="label" @confirm="confirm2" @cancel="show3=false">
        </u-picker>

        <u-icon slot="right" name="arrow-right" @click="show3=true"></u-icon>
      </u-form-item>
      <u-form-item label="所在单元" prop="unit" borderBottom ref="unit" required @click="show2=true">
        <u--input v-model="form.dy" disabled disabledColor="#ffffff" placeholder="请选择单元" border="none"
          @click="show2=true">
        </u--input>
        <u-picker :show="show2" :columns="columns1" keyName="unitnumber" @confirm="confirm1"
          @cancel="show2=false"></u-picker>

        <u-icon slot="right" name="arrow-right" @click="show2=true"></u-icon>
      </u-form-item>
      <u-form-item label="所在房号" prop="number" borderBottom ref="number" required>
        <u--input type="number" v-model="form.number" border="none" placeholder="请输入所在房号" clearable>
        </u--input>
      </u-form-item>


    </u--form>
    <u-action-sheet :show="showgender" :actions="genderActions" title="请选择性别" @close="showgender = false"
      @select="genderSelect"> </u-action-sheet>
    <view class="margin-top-lg">
      <u-button type="primary" :loading="btnLoading" text="提交" @click="submit()">
      </u-button>
    </view>

  </view>
</template>

<script>
  import {
    supervisorbindinfo,
    community
  } from '@/common/api.js';
  import {
    mapState
  } from 'vuex'
  import selfPicker from '@/components/picker.vue'
  const defaultForm = {
    phone: '',
    name: '',
    gender: '',
    gender_text: '',
    region: '',
    region_json: null,
    community: '',
    floor: '',
    unit: '',
    number: '',
    xq: '',
    ld: '',
    dy: '',
    community_xq: '',
    unit_dy: '',
    floor_ld: '',

  }
  export default {
    components: {
      selfPicker
    },
    props: {
      detail: {
        type: Object,
        default: null
      },
      ids: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        refresh: true,
        ids: '',
        show1: false,
        columns: [],
        show2: false,
        show3: false,
        columns1: [],
        columns2: [],
        globalData: getApp().globalData,
        btnLoading: false,
        showgender: false,
        genderActions: [{
            name: '男',
            value: 1,
          },
          {
            name: '女',
            value: 2
          },

        ],
        regionIdx: [],
        communityIdx: [],
        floorIdx: [],
        unitIdx: [],
        createType: 1, //注册类型 0自助创建 1督导员手动
        communityData: [],

        form: {
          phone: '',
          name: '',
          gender: '',
          gender_text: '',
          region: '',
          region_json: null,
          community: '',
          floor: '',
          unit: '',
          number: '',
          xq: '',
          ld: '',
          dy: '',
          community_xq: '',
          unit_dy: '',
          floor_ld: '',

        },
        rules: {
          name: [{
            type: 'string',
            required: true,
            message: '请填写姓名',
            trigger: ['change']
          }, {
            // 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
            validator: (rule, value, callback) => {
              // 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
              return uni.$u.test.chinese(value);
            },
            message: "姓名必须为中文",
            // 触发器可以同时用blur和change，二者之间用英文逗号隔开
            trigger: ["change", 'blur'],
          }],
          gender: {
            type: 'number',
            required: true,
            message: '请选择男或女',
            trigger: ['blur', 'change']
          },
          phone: [{
              required: true,
              message: '请填写联系电话',
              trigger: ['change', 'blur'],
            },
            {
              // 自定义验证函数，见上说明
              validator: (rule, value, callback) => {
                // 上面有说，返回true表示校验通过，返回false表示不通过
                // uni.$u.test.mobile()就是返回true或者false的
                return uni.$u.test.mobile(value);
              },
              message: '手机号码不正确',
              // 触发器可以同时用blur和change
              trigger: ['change', 'blur'],
            }
          ],
          region: {
            type: 'string',
            required: true,
            message: '请选择所在地区',
            trigger: ['change']
          },
          community: {
            type: "integer",
            required: true,
            message: '请选择所在小区',
            trigger: ['change']
          },
          floor: {
            type: "integer",
            required: true,
            message: '请选择所在楼栋',
            trigger: ['change']
          },
          unit: {
            type: "integer",
            required: true,
            message: '请选择所在单元',
            trigger: ['change']
          },
          number: [{
              required: true,
              message: '请填写房号',
              trigger: ['change', 'blur'],
            },
            {
              // 自定义验证函数，见上说明
              validator: (rule, value, callback) => {
                // 上面有说，返回true表示校验通过，返回false表示不通过
                // uni.$u.test.mobile()就是返回true或者false的
                if (value <= 0) {
                  return false
                }
                return uni.$u.test.digits(value);
              },
              message: '请输入整数',
              // 触发器可以同时用blur和change
              trigger: ['change', 'blur'],
            }
          ],
        },

      }
    },
    computed: {
      ...mapState({
        user: state => state.user,
        cityDataTree: state => state.cityDataTree,
      }),
      floorData() {
        if (this.form.community == '' || this.communityData.length <= 0) {
          return []
        }
        const communityIndex = this.communityData.findIndex(item => {
          if (item.id == this.form.community) {
            return true;
          }
          return false;
        })
        if (communityIndex >= 0) {
          return this.communityData[communityIndex].floor;
        } else {
          return []
        }
      },
      unitData() {
        if (this.form.floor == '' || this.floorData.length <= 0) {
          return []
        } else {
          //设置单元数据
          const floorIndex = this.floorData.findIndex(item => {
            if (item.id == this.form.floor) {
              return true;
            }
            return false;
          })
          if (floorIndex >= 0) {
            return this.floorData[floorIndex].unit;
          } else {
            return []
          }

        }
      },
      disabledForm() {
        if (!this.detail.region) {
          return true
        }
        return false
      }
    },
    onReady() {
      //如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
      this.$refs.form.setRules(this.rules)
    },
    watch: {
      detail: {
        handler: function(val) {
          if (val) {
            console.log(val.ld[0], '小区')
            //小区
            let xq = []
            let data = []
            xq.push(val.xq)
            xq.map(item => {
              let obj = {
                label: item.name,
                id: item.id
              }

              data.push(obj);
            });
            this.columns.push(data)
            //小区楼栋
            let xq_ld = []
            let data_dy = []
            xq_ld.push(val.ld[0].ld)
            xq_ld.map(item => {
              let obj = {
                label: item.floornumber,
                id: item.id
              }

              data_dy.push(obj);
            });
            this.columns2.push(data_dy)

            // 小区单元
            let data_ld = []
            val.ld[0].dy.map(item => {
              let obj = {
                unitnumber: item.unitnumber,
                id: item.id
              }

              data_ld.push(obj);
            });
            this.columns1.push(data_ld)

            // this.columns.push(data)
            // this.$set(this.form, 'region', val.region.toString())
            this.setRegion(val.region)
            this.community(val.region)
          }
        },
        deep: true,
        immediate: true
      },
      ids: {
        handler: function(val) {
          this.ids = val
        },
        deep: true,
        immediate: true
      }
    },
    mounted() {
      this.$refs['form'] && this.$refs['form'].setRules(this.rules);
    },
    methods: {
      changeHandler(e) {
        console.log(e)
      },

      confirm(e) {
        console.log(e.value)
        this.form.xq = e.value[0].label
        this.form.community_xq = e.value[0].id
        this.show1 = false

      },
      confirm1(e) {
        console.log(e.value)
        this.form.dy = e.value[0].unitnumber
        this.form.unit_dy = e.value[0].id
        this.show2 = false
      },
      confirm2(e) {
        console.log(e.value)
        this.form.ld = e.value[0].label
        this.form.floor_ld = e.value[0].id
        this.show3 = false

      },
      community(val, status = false) {
        community({
          region: val
        }).then((res) => {
          this.communityData = res.data
          const findcommunity = this.communityData.find(item => {

            if (item.id == this.detail.community_id) {
              return true;
            }
            return false;
          })

          if (findcommunity) {
            this.communityIdx = [findcommunity.id]
            this.form.community = findcommunity.id
            this.$refs.form.validateField('community')
          }

        })
      },

      genderSelect(e) {
        this.form.gender = e.value
        this.form.gender_text = e.name
        this.$refs.form.validateField('gender')
      },
      setRegion(region) {
        const location = this.$public.findCityALLByUnit(region)
        if (location) {
          this.regionIdx = location.map(item => item.value)
          this.form.region_json = location
        }
      },
      // 地区选择变化
      regionChange(e) {
        this.form.region = e.value[e.value.length - 1]
        this.regionIdx = e.detail.map(item => item.value)
        this.form.region_json = e.detail
        this.$refs.form.validateField('region')
        this.resetCommunity()
        this.community(this.form.region)
      },
      resetRegion() {
        this.form.region = '';
        this.regionIdx = [];
      },
      communitychange(e) {
        this.form.community = e.value[0]
        this.communityIdx = [e.value[0]]
        this.$refs.form.validateField('community')
        this.resetFloor()
      },
      resetCommunity(validate = true) {
        this.form.community = '';
        this.communityIdx = [];
        this.resetFloor(validate)
        validate && this.$refs.form.validateField('community')
      },
      floorchange(e) {
        this.form.floor = e.value[0]
        this.floorIdx = [e.value[0]]
        this.$refs.form.validateField('floor')
        this.resetUnit()
      },
      resetFloor(validate = true) {
        this.form.floor = '';
        this.floorIdx = [];
        this.resetUnit(validate)

        validate && this.$refs.form.validateField('floor')
      },
      unitchange(e) {
        this.form.unit = e.value[0]
        this.unitIdx = [e.value[0]]
        this.$refs.form.validateField('unit')
      },
      resetUnit(validate = true) {
        this.form.unit = '';
        this.unitIdx = [];
        validate && this.$refs.form.validateField('unit')
      },
      realodForm() {
        const defaultForms = uni.$u.deepClone(defaultForm)
        // defaultForms.region = this.detail.region.toString();
        defaultForms.region_json = this.form.region_json
        this.form = defaultForms
        this.resetCommunity(false)
      },
      submit() {
        if (this.form.phone && this.form.name && this.form.gender && this.form.community_xq && this.form
          .floor_ld && this.form.unit_dy && this.form.number) {
          let id = uni.getStorageSync('communityId')
          let params = {
            createType: this.createType,
            phone: this.form.phone,
            name: this.form.name,
            gender: this.form.gender,
            community: this.form.community_xq,
            floor: this.form.floor_ld,
            unit: this.form.unit_dy,
            number: this.form.number,
            taskId: this.ids
          }
          uni.request({
            // url: 'https://gh.api.cestech.com.cn:8240/mission_gh/v1/sy/cultura/listbycustomer',
            url: `https://gh.api.cestech.com.cn:8240/mission_gh/v1/dudaoyuan/add?taskId=${this.ids}`,
            header: {
              'x-Resource-Token': uni.getStorageSync('xtoken'),
              //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
            },
            data: {
              createType: this.createType,
              phone: this.form.phone,
              name: this.form.name,
              gender: this.form.gender,
              community: this.form.community_xq,
              floor: this.form.floor_ld,
              unit: this.form.unit_dy,
              number: this.form.number,
              taskId: this.ids
            },
            method: "POST",
            success: (res) => {
              uni.navigateTo({
                url: '/pages/education/detail'
              })
              console.log(res)
              // this.$emit('success', params)

            }

          })
        }


      },

    }
  }
</script>

<style lang="scss" scoped>

</style>