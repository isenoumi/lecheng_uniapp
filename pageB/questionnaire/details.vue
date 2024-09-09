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
            <u--text text="问卷页" color="#fff"></u--text>
          </view>
        </navbar>
      </view>
    </view>
    <view class="mian">
      <!-- <view class="img" v-if="detail.titleUrl">
        <image
          :src="detail.titleUrl"
          mode="aspectFill"
          style="width: 100%; height: 100%"></image>
      </view> -->
      <view class="imageBox">
        <image
          style="width: 100%; position: absolute; top: 0; z-index: -99"
          src="http://cdn.cestech.com.cn/BkpKnowledge/img/341ef64410e54ee4921fefefa7532fba.png"
          mode="scaleToFill" />
        <view class="titleBox">
          <view class="title">{{ detail.title }}</view>
          <view class="line"></view>
          <view class="rule">
            {{ detail.welcomeSpeech ? detail.welcomeSpeech : '' }}
          </view>
        </view>
      </view>

      <view class="li">
        <!-- <view class="city" v-if="citys">
          <view><text class="icon">*</text>地区：</view>
          <view class="input" type="text" placeholder="请选择地区">
            <picker class="pickerList" mode="multiSelector" :range="newProvinceDataList" :value="multiIndex"
              @change="pickerChange" @columnchange="pickerColumnchange">
              <view class="select">{{select}}</view>
            </picker>
          </view>
        </view> -->

        <!-- 单选 -->
        <!-- <view v-for="(item,indexs) in radiolist1" style="margin-bottom: 40rpx;">
					<view class="name"><text class="icon">*</text><text class="u-block__title">{{indexs+2}}
							.{{item.title}}</text>
					</view>
					<u-radio-group placement="column" @change="groupChange(item)" shape="square" v-model="radiovalue1">
						<u-radio :customStyle="{marginBottom: '20rpx'}" v-for="(item, index) in item.tip" :key="index"
							:label="item.name" :name="item.name" @change="radioChange(item)">
						</u-radio>
					</u-radio-group>
				</view> -->
        <!-- 多选 -->
        <!-- <view v-for="(item,indexs) in radiolist1" style="margin-bottom: 40rpx;">
					<view class="name"><text class="u-block__title">{{indexs+1}}: {{item.title}}</text></view>
					<u-checkbox-group v-model="checkboxValue1" placement="column" @change="checkboxChange(e)">
						<u-checkbox :customStyle="{marginBottom: '8px'}" v-for="(item, index) in item.tip" :key="index"
							:label="item.name" :name="item.name">
						</u-checkbox>
					</u-checkbox-group>
				</view> -->

        <view class="textarea">
          <u--form ref="uForm" model="test">
            <view v-for="(item, index) in questionList" :key="index">
              <u-form-item
                v-if="item.type == 'radio'"
                class="item"
                prop="myRule"
                model="test">
                <!-- <dt :class="item.require ? 'require' : ''">{{ item.title }}</dt> -->
                <view class="name"
                  ><text v-if="item.require" class="icon">*</text
                  >{{ index + 1 }}.{{ item.title }}： (单选题)
                </view>
                <u-radio-group v-model="myAnswer[index]" placement="column">
                  <view
                    class="radio"
                    v-for="(item2, index2) in item.questionItem">
                    <u-radio
                      :label="item2.content"
                      :name="item2.id"
                      :key="index2"></u-radio>
                  </view>
                </u-radio-group>
              </u-form-item>
              <u-form-item
                v-else-if="item.type == 'checkbox'"
                class="item"
                prop="myRule">
                <view class="name"
                  ><text v-if="item.require" class="icon">*</text
                  >{{ index + 1 }}.{{ item.title }}： (多选题)
                </view>
                <u-checkbox-group
                  v-for="(item3, index3) in item.questionItem"
                  :key="index3"
                  @change="checkboxChange($event, item.id)">
                  <view class="radio">
                    <u-checkbox
                      :label="item3.content"
                      :name="item3.id"></u-checkbox>
                  </view>
                </u-checkbox-group>
              </u-form-item>
              <!-- <dl v-if="item.type == 'datetime'">
                                  <dt :class="item.require ? 'require' : ''">{{ item.title }}</dt>
                                  <el-date-picker v-model="value1" type="date" placeholder="选择日期" style="width: 60%"> </el-date-picker>
                                </dl> -->
              <u-form-item
                v-else-if="item.type == 'input'"
                class="item"
                prop="myRule">
                <view class="name"
                  ><text v-if="item.require" class="icon">*</text
                  >{{ index + 1 }}.{{ item.title }}：
                </view>
                <!-- {{JSON.stringify(item) }} -->
                <u--input
                  v-model="myAnswerInput[index]"
                  placeholder="请输入内容"
                  style="width: 60%"
                  @change="
                    inputChange(myAnswerInput[index], item.questionItem[0].id)
                  "></u--input>
              </u-form-item>
              <view v-if="index < questionList.length - 1" class="line"></view>
            </view>
          </u--form>

          <!--        <view v-for="(item, index) in questionList" :key="index">


            <view v-if="item.type == 'radio'" class="item">
              <view class="name"><text v-if="item.require" class="icon">*</text>{{index+1}}.{{ item.title }}：</view>
              <u-radio-group v-model="myAnswer[index]" placement='column'>
                <view class="radio" v-for="(item2, index2) in item.questionItem">
                  <u-radio :label="item2.content" :name="item2.id" :key="index2"></u-radio>
                </view>

              </u-radio-group>

            </view>
            <view v-else-if="item.type == 'checkbox'" class="item">
              <view class="name"><text v-if="item.require" class="icon">*</text>{{index+1}}.{{ item.title }}：</view>
              <u-checkbox-group v-for="(item3, index3) in item.questionItem" :key="index3" @change="checkboxChange">
                <view class="radio">
                  <u-checkbox :label="item3.content" :name="item3.id"></u-checkbox>
                </view>

              </u-checkbox-group>
            </view>
            <view v-else-if="item.type == 'input'" class="item">
              <view class="name"><text v-if="item.require" class="icon">*</text>{{index+1}}.{{ item.title }}：
              </view>
              <u--input v-model="myAnswerInput[index]" placeholder="请输入内容" style="width: 60%"
                @change="inputChange(myAnswerInput[index],item.questionItem[0].id)"></u--input>
            </view>
          </view> -->
        </view>
      </view>
    </view>
    <view class="submit" @click="submit">提交问卷</view>
    <view style="height: 40rpx"></view>
  </view>
</template>

<script>
import provinceData from './provinceAndCity.js'
export default {
  data() {
    return {
      scene: [],
      listData: [],
      test: [],
      rules: {
        myRule: {
          required: true,
          message: '请填写姓名',
        },
      },
      citys: false,
      myRadio: '',

      checkBoxData: [],
      inputArr: [{}],
      myAnswer: {},
      myAnswerInput: {},
      questionList: [],
      value2: '统计字数',
      oldpProvinceDataList: provinceData.data,
      newProvinceDataList: [[], [], []],
      multiIndex: [0, 0, 0],
      select: '选择省市区',
      addressData: {
        name: '',
        phone: '',
        address: '',
      },
      binhao: '1',
      // u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
      radiovalue1: '',
      checkboxValue1: {},
      detail: {},
      wjid: '',
    }
  },
  computed: {
    // rules() {
    //   let temp = {}
    //   this.questionList.forEach((item, index) => {
    //     console.log('sadasd', item);
    //     temp[index] = {
    //       require: item.require,
    //       message: '请选择'
    //     }
    //   })
    //   console.log('aasdas', temp);
    //   return temp
    // }
  },
  onLoad(option) {
    this.scene = decodeURIComponent(option.scene)
    console.log('option', option)
    if (this.scene != 'undefined') {
      this.wjid = this.scene
      // this.topic(this.wjid)
      // this.ck_query(this.wjid)
      // this.answer(this.wjid)
      // this.course()
      // this.getQuestions(this.wjid)
      // uni.setStorageSync("loginFlag", 'byInvite')
      // uni.setStorageSync("scene", scene)
    } else {
      console.log(option, 'option')
      this.wjid = option.id
    }

    this.topic(this.wjid)
    this.ck_query(this.wjid)
    this.answer(this.wjid)
    this.course()
    this.getQuestions(this.wjid)
    // 开始省市区默认数据
    var _this = this
    // 省
    for (let i = 0; i < _this.oldpProvinceDataList.length; i++) {
      _this.newProvinceDataList[0].push(_this.oldpProvinceDataList[i].name)
    }
    // 市
    for (let i = 0; i < _this.oldpProvinceDataList[0].city.length; i++) {
      _this.newProvinceDataList[1].push(
        _this.oldpProvinceDataList[0].city[i].name
      )
    }
    // 区县
    for (
      let i = 0;
      i < _this.oldpProvinceDataList[0].city[0].area.length;
      i++
    ) {
      _this.newProvinceDataList[2].push(
        _this.oldpProvinceDataList[0].city[0].area[i]
      )
    }
  },
  onReady() {
    //如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
    // this.$refs.uForm.setRules(this.rules)
  },
  methods: {
    submit() {
      console.log(this.questionList, this.inputArr, this.myAnswer, 'as')
      if (!this.inputArr[0]?.id) this.inputArr.shift()

      let arr = Object.values(this.myAnswer)

      console.log(
        'EEEE',
        arr.length,
        this.inputArr.length,
        Object.keys(this.checkBoxData).length,
        arr,
        this.inputArr,
        this.checkBoxData,
        this.test
      )
      const keys = Object.keys(this.checkBoxData)
      const values = Object.values(this.checkBoxData)
      let valuesList = []
      console.log(keys, values)
      if (
        arr.length + this.inputArr.length + keys.length <
        this.questionList.length
      ) {
        uni.showToast({
          title: '还有题目未填写',
          icon: 'none',
        })
      } else {
        console.log('ceshi hoiho', arr, values, this.inputArr)
        arr.forEach(item => {
          // this.answerREQ(item)
          valuesList.push({
            id: item,
            type: 'radio',
            content: '',
          })
        })

        values.forEach(item => {
          ;[...new Set(item)].forEach(item => {
            valuesList.push({
              id: item,
              type: 'checkbox',
              content: '',
            })
          })
        })

        this.inputArr.forEach(item => {
          valuesList.push({
            ...item,
            type: 'input',
          })
        })
        console.log(valuesList, this.wjid, this.select, 'asd')
        uni.request({
          url: `https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbAnswersQuestionnaire/addSubmit?id=${
            this.wjid
          }&position=${this.select}&array=${JSON.stringify(valuesList)}`,
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
            //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
          },
          method: 'POST',
          success: res => {
            if (res.data.success == true) {
              uni.showToast({
                title: '提交成功',
                icon: 'none',
              })
              console.log('this.scene', this.scene)
              if (this.scene == 'undefined') {
                uni.setStorageSync('presentType', 'questionnaire')
                setTimeout(() => {
                  // uni.navigateTo({
                  //   url: '/pageD/present/present',
                  // })
                  uni.navigateBack()
                }, 1500)
              } else {
                setTimeout(() => {
                  uni.switchTab({
                    url: '/pages/index/index',
                  })
                }, 1500)
              }
            } else {
              uni.showToast({
                title: '提交失败',
                icon: 'none',
              })
            }
          },
        })
      }
    },
    answerREQInput(value) {
      console.log(value)

      uni.request({
        url: 'https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbAnswersQuestionnaire/add',
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
          //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
        },
        data: {
          questionnaireQuestionsSonId: value.id,
          // id: this.wjid,
          content: value.content,

          region: this.select === '选择省市区' ? '' : this.select,
        },
        method: 'POST',
        success: res => {},
      })
    },

    answerREQ(questionnaireQuestionsSonId) {
      // if(this.select == '选择省市区'){
      console.log(questionnaireQuestionsSonId, 'questionnaireQuestionsSonId')
      // }
      uni.request({
        url: 'https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbAnswersQuestionnaire/add',
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
          //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
        },
        data: {
          // phone: uni.getStorageSync("phone"),
          questionnaireQuestionsSonId,
          // id: this.wjid,
          region: this.select === '选择省市区' ? '' : this.select,
          // answerPerson
        },
        method: 'POST',
        success: res => {},
      })
    },

    course(id) {
      uni.request({
        url: 'https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbQuestionnaireQuestionsSon/list',
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
          //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
        },
        data: {
          // phone: uni.getStorageSync("phone"),
          id: '1656222496817635330',
          pageNo: 1,
          pageSize: 10,
        },
        method: 'GET',
        success: res => {
          console.log(res, 'cc4')
          // 		this.mescroll.endSuccess(res.data.result.records.length);

          // 		//设置列表数据
          // 		if (page.num == 1) this.listData = []; //如果是第一页需手动制空列表
          // 		this.listData = this.listData.concat(res.data.result.records); //追加新数据
        },
      })
    },
    answer(id) {
      uni.request({
        url: 'https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbQuestionnaireQuestions/queryById',
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
          //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
        },
        data: {
          // phone: uni.getStorageSync("phone"),
          id: '1656222496817635330',
        },
        method: 'GET',
        success: res => {
          console.log(res, 'cc1')
          // 		this.mescroll.endSuccess(res.data.result.records.length);

          // 		//设置列表数据
          // 		if (page.num == 1) this.listData = []; //如果是第一页需手动制空列表
          // 		this.listData = this.listData.concat(res.data.result.records); //追加新数据
        },
      })
    },
    topic(id) {
      uni.request({
        url: 'https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbQuestionnaireQuestions/list',
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
          //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
        },
        data: {
          // phone: uni.getStorageSync("phone"),
          id: '1656222258321121281',
        },
        method: 'GET',
        success: res => {
          console.log(res, 'cc2')
          // 		this.mescroll.endSuccess(res.data.result.records.length);

          // 		//设置列表数据
          // 		if (page.num == 1) this.listData = []; //如果是第一页需手动制空列表
          // 		this.listData = this.listData.concat(res.data.result.records); //追加新数据
        },
      })
    },
    ck_query(id) {
      uni.request({
        url: 'https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbQuestionnaireInquiry/queryById',
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
          //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
        },
        data: {
          // phone: uni.getStorageSync("phone"),
          id: id,
        },
        method: 'GET',
        success: res => {
          console.log(res.data.result, 'cc3')
          this.detail = res.data.result
          // if(this.detail)
          if (this.detail.isArea === 0) {
            this.citys = false
          } else {
            this.citys = true
          }

          // 		this.mescroll.endSuccess(res.data.result.records.length);

          // 		//设置列表数据
          // 		if (page.num == 1) this.listData = []; //如果是第一页需手动制空列表
          // 		this.listData = this.listData.concat(res.data.result.records); //追加新数据
        },
      })
    },
    getQuestions(id) {
      uni.request({
        url: 'https://gh.api.cestech.com.cn:8240/mission_gh/wx/bkbQuestionnaireQuestions/queryQuestionGroups',
        header: {
          'x-Resource-Token': uni.getStorageSync('xtoken'),
          //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
        },
        data: {
          // phone: uni.getStorageSync("phone"),
          id: id,
        },
        method: 'GET',
        success: res => {
          console.log(res.data.result, '@@@@@s')
          // this.listData = []
          this.questionList = []
          res.data.result.forEach(item => {
            // item.list.map(item => {
            //   this.listData.push(item)
            // })
            let temp = {}
            console.log('item', item)
            temp.title = item.bkbQuestionnaireQuestions.questionTitle
            temp.type = item.bkbQuestionnaireQuestions.type
            temp.id = item.bkbQuestionnaireQuestions.id
            temp.require = item.bkbQuestionnaireQuestions.require ? false : true
            temp.value = undefined
            if (temp.type != 'input') {
              temp.questionItem = []
              item.list.forEach(item => {
                temp.questionItem.push({
                  content: item.selectedName,
                  id: item.id,
                })
              })
            } else {
              temp.questionItem = [
                {
                  id: item.list[0].id,
                },
              ]
            }
            this.questionList.push(temp)
          })

          // 		this.mescroll.endSuccess(res.data.result.records.length);

          // 		//设置列表数据
          // 		if (page.num == 1) this.listData = []; //如果是第一页需手动制空列表
          // 		this.listData = this.listData.concat(res.data.result.records); //追加新数据
        },
      })
    },
    arrayUnique(arr, name) {
      let hash = {}
      return arr.reduce((acc, cru, index) => {
        if (!hash[cru[name]]) {
          hash[cru[name]] = {
            index: acc.length,
          }
          acc.push(cru)
        } else {
          acc.splice(hash[cru[name]]['index'], 1, cru)
        }
        return acc
      }, [])
    },
    inputChange(e, id) {
      console.log(e, id, 'aa')
      let temp = JSON.parse(JSON.stringify(this.inputArr))

      if (this.inputArr.length == 0) this.inputArr = [{}]
      this.inputArr.map((item, index) => {
        console.log('itemmm', item, item.id == id)
        if (item.id == id) {
          item.content = e
        } else {
          temp.push({
            id,
            content: e,
          })
        }
      })
      // this.inputArr = JSON.parse(JSON.stringify(temp))
      this.inputArr = JSON.parse(JSON.stringify(this.arrayUnique(temp, 'id')))

      console.log(temp, 'temp', this.inputArr)
    },
    checkboxChange(e, id) {
      // console.log('change', e);
      // let data = []
      // console.log('fff', e, id);
      console.log(e, id, this.checkBoxData[id], 'ss')
      if (e[0]) {
        if (!this.checkBoxData[id]) {
          this.checkBoxData[id] = []
        }
        this.checkBoxData[id].push(e[0])
        // this.checkBoxData = [...new Set(this.checkBoxData)]
        console.log(this.checkBoxData)
      } else {
        console.log(111)
        this.checkBoxData[id].pop()
        console.log(this.checkBoxData)
        if (this.checkBoxData[id].length == 0) delete this.checkBoxData[id]
      }
    },
    groupChange(n) {
      console.log('sssss', n)
      // console.log(this.radiovalue1,'000')
      // this.sjlist.push(n)
      // console.log(this.sjlist, '000')
    },
    radioChange(e) {
      console.log('radioChange', e)
    },
    // 省市区确认事件
    pickerChange: function (e) {
      var _this = this
      _this.multiIndex = e.detail.value
      // 数组内的下标
      console.log(JSON.stringify(_this.multiIndex))
      // 获取省市区总数据
      console.log(_this.newProvinceDataList[0][_this.multiIndex[0]], '111')
      console.log(_this.newProvinceDataList[1][_this.multiIndex[1]], '222')
      console.log(_this.newProvinceDataList[2][_this.multiIndex[2]], '333')
      _this.select =
        _this.newProvinceDataList[0][_this.multiIndex[0]] +
        _this.newProvinceDataList[1][_this.multiIndex[1]] +
        _this.newProvinceDataList[2][_this.multiIndex[2]]
    },
    // 每列滑动的监听
    pickerColumnchange: function (e) {
      var _this = this
      // 第几列滑动
      console.log('第几列滑动 = ' + JSON.stringify(e.detail.column))
      // 第几列滑动选中的下标
      console.log('第几列滑动选中的下标 = ' + JSON.stringify(e.detail.value))
      // 第一列滑动
      if (e.detail.column === 0) {
        _this.multiIndex[0] = e.detail.value
        // 第二列更新相应的数据
        _this.newProvinceDataList[1] = _this.oldpProvinceDataList[
          _this.multiIndex[0]
        ].city.map((item, index) => {
          return item.name
        })
        if (_this.oldpProvinceDataList[_this.multiIndex[0]].city.length === 1) {
          _this.newProvinceDataList[2] = _this.oldpProvinceDataList[
            _this.multiIndex[0]
          ].city[0].area.map((item, index) => {
            return item
          })
        } else {
          _this.newProvinceDataList[2] = _this.oldpProvinceDataList[
            _this.multiIndex[0]
          ].city[_this.multiIndex[1]].area.map((item, index) => {
            return item
          })
        }
        // 第一列滑动  第二列 和第三列 都变为第一个
        _this.multiIndex.splice(1, 1, 0)
        _this.multiIndex.splice(2, 1, 0)
      }
      // 第二列滑动
      if (e.detail.column === 1) {
        _this.multiIndex[1] = e.detail.value
        _this.newProvinceDataList[2] = _this.oldpProvinceDataList[
          _this.multiIndex[0]
        ].city[_this.multiIndex[1]].area.map((item, index) => {
          return item
        })
        // 第二列 滑动 第三列 变成第一个
        _this.multiIndex.splice(2, 1, 0)
      }
      // 第三列滑动
      if (e.detail.column === 2) {
        _this.multiIndex[2] = e.detail.value
      }
    },
  },
}
</script>

<style lang="scss">
page {
  background: #f5f5f5;
}
.imageBox {
  width: 688rpx;
  margin: 14rpx auto;
  position: relative;

  .titleBox {
    padding-top: 80rpx;

    .title {
      font-weight: bold;
      font-size: 40rpx;
      color: #262c35;
      line-height: 48rpx;
      width: 688rpx;
      text-align: center;
    }
    .line {
      width: 672rpx;
      height: 1rpx;
      background: #ebebeb;
      border-radius: 0rpx 0rpx 0rpx 0rpx;
      margin: 32rpx auto;
    }
    .rule {
      background-color: #fff;
      font-weight: 400;
      font-size: 28rpx;
      color: #262c35;
      width: 672rpx;
      line-height: 48rpx;
      padding: 0 32rpx 32rpx;
    }
  }
}

.mian {
  .img {
    width: 750rpx;
    height: 500rpx;
    z-index: -1;
  }

  .city {
    display: flex;
    align-items: center;
    font-size: 30rpx;
    font-weight: 600;
    margin-bottom: 30rpx;

    .select {
      font-size: 30rpx;
    }

    .icon {
      color: red;
      margin-right: 5rpx;
    }
  }

  .textarea {
    font-size: 30rpx;
    font-weight: 600;
    margin-bottom: 30rpx;

    .icon {
      color: red;
      margin-right: 5rpx;
    }
  }

  .li {
    width: 672rpx;
    padding: 32rpx;
    margin: 40rpx auto 0;
    z-index: 999;
    background: #fff;
    border-radius: 24rpx;
    .line {
      width: 672rpx;
      height: 1rpx;
      background: #ebebeb;
      border-radius: 0rpx 0rpx 0rpx 0rpx;
      margin: 16rpx 0 16rpx -32rpx;
    }
    .title {
      text-align: center;
      font-size: 32rpx;
      font-weight: 600;
    }

    .name {
      margin-bottom: 30rpx;

      .icon {
        color: red;
        margin-right: 5rpx;
      }

      .u-block__title {
        font-size: 30rpx;
        font-weight: 600;
      }
    }

    .rule {
      margin-top: 20rpx;
      margin-bottom: 20rpx;
      color: rgb(148, 97, 58);
      font-size: 24rpx;
      line-height: 46rpx;
    }
  }
}
.submit {
  width: 671rpx;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  background: #20c695;
  color: #fff;
  font-size: 26rpx;
  font-weight: normal;
  border-radius: 10rpx;
  margin: 30rpx auto;
}

.item {
  margin-top: 30rpx;
}

.radio {
  margin: 20rpx 0;
}
</style>
