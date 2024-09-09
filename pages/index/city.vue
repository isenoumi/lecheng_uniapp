<template>
  <view class="content">
    <lee-select-city :cityData="cityDataTree" @submit="submitHandler" :regions="regions"
      @select-current="useCurrentPosition" @getPosition="getPosition" />
    <u-modal :show="show" @confirm="submit" ref="uModal" :asyncClose="true" showCancelButton @cancel="this.show=false">
      <view class="slot-content">
        <u--form labelPosition="left" :model="model" ref="form" labelWidth="auto">
          <u-form-item label="当前地址" @click="showCustomer = true; hideKeyboard()">
            <u--input v-model="title" disabled disabledColor="#ffffff" border="none"></u--input>
          </u-form-item>
          <u-form-item v-if="customerList.length>1" label="客户选择" prop="name"
            @click="showCustomer = true; hideKeyboard()">
            <selfPicker level="1" @change="changeHandler" idKey="id" name="name" :columnData="customerList">
            </selfPicker>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item>
        </u--form>

      </view>
    </u-modal>

  </view>
</template>

<script>
  import LeeSelectCity from '@/components/lee-select-city/lee-select-city.vue'
  import selfPicker from '@/components/picker.vue'

  import {
    mapState
  } from 'vuex'
  import {
    customerregions,
    customerallbyregion
  } from '@/common/api.js'
  export default {
    components: {
      LeeSelectCity,
      selfPicker
    },
    data() {
      return {

        show: false,

        title: '请选择',
        first: true,
        locationData: null,
        showCustomer: false,
        customerList: [],
        model: {
          id: null,
          name: ''
        },
      }
    },
    computed: {
      ...mapState({
        location: state => state.location,
        regions: state => state.regions,
        cityDataTree: state => state.cityDataTree
      }),
    },
    onLoad() {},
    onReady() {

    },
    methods: {
      changeHandler(e) {
        this.model.id = e.value[0]

      },
      customerConfirm({
        value
      }) {
        this.model.id = value[0].id;
        this.model.name = value[0].name;
        this.showCustomer = false;
      },
      submit() {
        if (this.model.id == null) {
          uni.showToast({
            title: '请选择客户',
            icon: 'none'
          })
          this.$refs.uModal.loading = false
          return;
        }
        this.show = false;
        this.setLocation(this.locationData)
        this.setCustomer(this.model)
        uni.navigateBack({
          delta: 1
        });

      },
      setCustomer(model) {
        this.$store.commit('setCustomer', uni.$u.deepClone(model))
        this.model.id = null
        this.model.name = ''
      },
      setLocation(locationData) {
        this.$store.commit('setLocation', uni.$u.deepClone(locationData))

        this.locationData = null
      },
      submitHandler({
        selected,
        simple
      }) {
        var that = this;
        this.locationData = {
          selected,
          simple,
          region: selected.length == 3 ? selected[2].value : selected[1].value,
          customer: null
        }
        //查询客户
        this.title = simple.join(',')
        customerallbyregion({
          region: selected[selected.length - 1].value,
        }).then((res) => {
          that.customerList = res.data

          if (res.data.length <= 0) {
            uni.$u.toast('该地区暂未开放')
            return;
          } else if (res.data.length == 1) {
            that.model.id = res.data[0].id
            that.model.name = res.data[0].name
          }
          that.show = true;
        }).catch(res => {

        })

      },
      hideKeyboard() {
        uni.hideKeyboard()
      },
      useCurrentPosition({
        selected,
        simple
      }) {
        this.submitHandler({
          selected,
          simple
        })
      },
      getPosition() {
        var that = this;
        return new Promise((resolve, rej) => {
          // #ifdef MP-WEIXIN
          wx.getFuzzyLocation({
            type: 'wgs84',
            success: (res) => {
              var latitude = res.latitude
              var longitude = res.longitude

              getApp().globalData.qqmapsdk.reverseGeocoder({
                location: {
                  latitude: latitude,
                  longitude: longitude
                },
                success: (res) => {
                  let loginAddress = [res.result.ad_info.province, res
                    .result.ad_info.city, res.result.ad_info
                    .district
                  ]

                  const location = []
                  // 寻找省
                  const findProvince = this.cityDataTree.find(
                    item => {
                      if (item.name == res.result.ad_info
                        .province) {
                        return true;
                      }
                      return false;
                    })
                  if (findProvince) {
                    location.push({
                      name: findProvince.name,
                      value: findProvince.value
                    })
                    //寻找市
                    const findCity = findProvince.children.find(
                      item => {
                        if (item.name == res.result.ad_info
                          .city) {
                          return true;
                        }
                        return false;
                      })

                    if (findCity) {
                      location.push({
                        name: findCity.name,
                        value: findCity.value
                      })
                      //寻找区
                      const findDistrict = findCity.children.find(
                        item => {
                          if (item.name == res.result
                            .ad_info
                            .district) {
                            return true;
                          }
                          return false;
                        })

                      if (findDistrict) {
                        location.push({
                          name: findDistrict.name,
                          value: findDistrict.value
                        })
                      }
                    }
                  }

                  if (location.length >= 2) {
                    if (this.regions.indexOf(location[location
                        .length - 1].value) > -1) {
                      that.submitHandler({
                        selected: location,
                        simple: location.map(item =>
                          item
                          .name)
                      })
                    } else {
                      uni.showToast({
                        title: '当前区域未开放,请手动选择',
                        icon: 'none'
                      })
                    }

                  } else {
                    uni.showToast({
                      title: '匹配区域失败,请手动选择',
                      icon: 'none'
                    })
                  }

                },
                fail: (res) => {
                  uni.showToast({
                    title: '区域解析失败,请手动选择',
                    icon: 'none'
                  })
                },
                complete: (res) => {}
              });
            },
            fail: (err) => {
              uni.showToast({
                title: '定位失败,请手动选择',
                icon: 'none'
              })
            }
          })

          // #endif
        })

      }
    },
  }
</script>

<style>
  page {
    height: 100%;
  }
</style>
<style scoped>
  .content {
    height: 100%;
  }
</style>