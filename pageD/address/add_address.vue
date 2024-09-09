<template>
  <!--pages/editAddress/editAddress.wxml-->

  <view class="container">
    <!--input列表 -->
    <view class="input-box">
      <view class="section">
        <text>收 货 人</text>
        <input placeholder="姓名" type="text" maxlength="15" v-model="receiver"></input>
      </view>
      <view class="section">
        <text>手机号码</text>
        <input placeholder="11位手机号码" type="number" maxlength="11" v-model="mobile"></input>
      </view>
      <view class="section" v-if="ids">
        <view class="SiresContent">
          <view class="siresname">所在地区</view>
          <picker mode="region" :value="date" style="font-size: 30rpx; margin: 0 40rpx 0 0;" @change="bindTimeChange">
            <view class="uni-input">
              {{ addrss.provinceName }}
              {{ addrss.cityName }}
              {{ addrss.areaName }}
            </view>
          </picker>
        </view>

        <view class="arrow">
          <u-icon name="arrow-right" size="14"></u-icon>
        </view>
      </view>
      <view class="section" v-else>
        <view class="SiresContent">
          <view class="siresname">所在地区</view>
          <picker mode="region" :value="date" style="font-size: 30rpx; margin: 0 40rpx 0 0;" @change="bindTimeChange">
            <view class="uni-input" v-if="info.siteAddress">
              {{ info.siteAddress.provinceName }}
              {{ info.siteAddress.cityName }}
              {{ info.siteAddress.areaName }}
            </view>
            <view class="uni-input" v-else>{{ diqu }}</view>
          </picker>
        </view>

        <view class="arrow">
          <u-icon name="arrow-right" size="14"></u-icon>
        </view>
      </view>
      <view class="section">
        <text>详细地址</text>
        <input placeholder="如楼号/单元/门牌号" type="text" v-model="addr"></input>
      </view>


    </view>
    <!-- end input列表 -->
    <!-- 功能按钮 -->
    <view class="btn-box">
      <view class="keep btn" @tap="modifyAddr" v-if="ids">
        <text>修改收货地址</text>
      </view>
      <view class="keep btn" @tap="onSaveAddr" v-else>
        <text>保存收货地址</text>
      </view>

      <!-- 	<view class="clear btn" @tap="onDeleteAddr" v-if="addrId!=0">
				<text>删除收货地址</text>
			</view> -->
    </view>
    <!-- end 功能按钮 -->
  </view>
</template>

<script>
  // pages/editAddress/editAddress.js
  // var http = require("../../utils/http.js");
  // var config = require("../../utils/config.js");
  var index = [18, 0, 0];
  var t = 0;
  var show = false;
  var moveY = 200;

  export default {
    data() {
      return {
        date: [],
        diqu: '请选择省市区',
        info: {
          siteAddress: '',
        },
        value: [0, 0, 0],
        provArray: [],
        cityArray: [],
        areaArray: [],
        province: "",
        city: "",
        area: "",
        provinceId: 0,
        cityId: 0,
        areaId: 0,
        receiver: "",
        mobile: "",
        addr: "",
        addrId: 0,
        animation: "",
        show: "",
        region: "",
        addrss: {
          areaId: "110101",
          areaName: "东城区",
          cityId: "110100",
          cityName: "北京市",
          provinceId: "110000",
          provinceName: "北京市",
        },
        ids: ''
      };
    },

    components: {},
    props: {},
    onLoad: function(options) {
      if (options.id) {
        this.ids = options.id
        this.address_detail()
      }
      // if (options.addrId) {
      //   uni.showLoading();
      //   var params = {
      //     url: "/p/address/addrInfo/" + options.addrId,
      //     method: "GET",
      //     data: {},
      //     callBack: res => {
      //       //console.log(res)
      //       this.setData({
      //         province: res.province,
      //         city: res.city,
      //         area: res.area,
      //         provinceId: res.provinceId,
      //         cityId: res.cityId,
      //         areaId: res.areaId,
      //         receiver: res.receiver,
      //         mobile: res.mobile,
      //         addr: res.addr,
      //         addrId: options.addrId
      //       });
      //       this.initCityData(res.provinceId, res.cityId, res.areaId);
      //       uni.hideLoading();
      //     }
      //   };
      //   http.request(params);
      // } else {
      //   this.initCityData(this.provinceId, this.cityId, this.areaId);
      // }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},
    onReady: function() {
      this.animation = uni.createAnimation({
        transformOrigin: "50% 50%",
        duration: 0,
        timingFunction: "ease",
        delay: 0
      });
      this.animation.translateY(200 + 'vh').step();
      // this.setData({
      // 	animation: this.animation.export(),
      // 	show: show
      // });
    },
    methods: {

      address_detail() {
        let userId = uni.getStorageSync('users').id
        uni.request({
          url: `https://gh.api.cestech.com.cn:8240/mission_gh/p/address/addrInfo?addrId=${this.ids}`,
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
            //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
          },
          // url: `https://gh.api.cestech.com.cn:8240/mission_gh/p/address/addrInfo?addrId=${this.ids}&userId=${userId}`,
          // header: {
          // 	'X-Access-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODkwNjQ3NTcsInVzZXJuYW1lIjoiYWRtaW4ifQ.9zI7NyLu1gcsn17dqXV9FUEyXIMRU6MgHxp9BG0i7MM' //自定义请求头信息
          // },
          // data: {
          // 	addrId: this.ids,
          // 	userId: uni.getStorageSync('users').id,
          // },
          method: "GET",
          success: (res) => {
            if (res.data.code === 200) {

              console.log(res.data.result, '我是查出来的地址')
              this.receiver = res.data.result.receiver
              this.mobile = res.data.result.mobile
              this.addr = res.data.result.addr

              // this.addrss={
              this.addrss.areaId = res.data.result.addrId
              this.addrss.areaName = res.data.result.area
              this.addrss.cityId = res.data.result.cityId
              this.addrss.cityName = res.data.result.city
              this.addrss.provinceId = res.data.result.provinceId
              this.addrss.provinceName = res.data.result.province
              // }

            }
          }

        })
      },
      // 获取省市区
      bindTimeChange(e) {
        console.log(e);
        let area = {
          provinceId: e.detail.code[0],
          provinceName: e.detail.value[0],
          cityId: e.detail.code[1],
          cityName: e.detail.value[1],
          areaId: e.detail.code[2],
          areaName: e.detail.value[2],
        };
        this.info.siteAddress = area;

        console.log('area1111111111', area);
        this.addrss = area
        console.log(this.addrss, '2222')
      },

      initCityData: function(provinceId, cityId, areaId) {
        var ths = this;
        uni.showLoading();
        var params = {
          url: "/p/area/listByPid",
          method: "GET",
          data: {
            pid: 0
          },
          callBack: function(res) {
            //console.log(res)
            ths.setData({
              provArray: res
            });

            if (provinceId) {
              for (var index in res) {
                if (res[index].areaId == provinceId) {
                  ths.setData({
                    value: [parseInt(index), ths.value[1], ths.value[2]]
                  });
                }
              }
            }

            ths.getCityArray(provinceId ? provinceId : res[0].areaId, cityId, areaId);
            uni.hideLoading();
          }
        };
        http.request(params);
      },
      //滑动事件
      bindChange: function(e) {
        var ths = this;
        var val = e.detail.value; //判断滑动的是第几个column
        //若省份column做了滑动则定位到地级市和区县第一位

        if (index[0] != val[0]) {
          val[1] = 0;
          val[2] = 0; //更新数据

          ths.getCityArray(this.provArray[val[0]].areaId); //获取地级市数据
        } else {
          //若省份column未做滑动，地级市做了滑动则定位区县第一位
          if (index[1] != val[1]) {
            val[2] = 0; //更新数据

            ths.getAreaArray(this.cityArray[val[1]].areaId); //获取区县数据
          } else {}
        }

        index = val;
        this.setData({
          value: [val[0], val[1], val[2]]
        });
        ths.setData({
          province: ths.provArray[ths.value[0]].areaName,
          city: ths.cityArray[ths.value[1]].areaName,
          area: ths.areaArray[ths.value[2]].areaName,
          provinceId: ths.provArray[ths.value[0]].areaId,
          cityId: ths.cityArray[ths.value[1]].areaId,
          areaId: ths.areaArray[ths.value[2]].areaId
        });
      },
      //移动按钮点击事件
      translate: function(e) {
        if (t == 0) {
          moveY = 0;
          show = true;
          t = 1;
        } else {
          moveY = 200;
          show = false;
          t = 0;
        } // this.animation.translate(arr[0], arr[1]).step();


        this.animationEvents(this, moveY, show);
      },

      //隐藏弹窗浮层
      hiddenFloatView(e) {
        //console.log(e);
        moveY = 200;
        show = false;
        t = 0;
        this.animationEvents(this, moveY, show);
      },

      //动画事件
      animationEvents: function(that, moveY, show) {
        //console.log("moveY:" + moveY + "\nshow:" + show);
        that.animation = uni.createAnimation({
          transformOrigin: "50% 50%",
          duration: 400,
          timingFunction: "ease",
          delay: 0
        });
        that.animation.translateY(moveY + 'vh').step();
        that.setData({
          animation: that.animation.export(),
          show: show
        });
      },

      /**
       * 根据省份ID获取 城市数据
       */
      getCityArray: function(provinceId, cityId, areaId) {
        var ths = this;
        var params = {
          url: "/p/area/listByPid",
          method: "GET",
          data: {
            pid: provinceId
          },
          callBack: function(res) {
            //console.log(res)
            ths.setData({
              cityArray: res
            });

            if (cityId) {
              for (var index in res) {
                if (res[index].areaId == cityId) {
                  ths.setData({
                    value: [ths.value[0], parseInt(index), ths.value[2]]
                  });
                }
              }
            }

            ths.getAreaArray(cityId ? cityId : res[0].areaId, areaId);
            uni.hideLoading();
          }
        };
        http.request(params);
      },

      /**
       * 根据城市ID获取 区数据
       */
      getAreaArray: function(cityId, areaId) {
        var ths = this;
        var params = {
          url: "/p/area/listByPid",
          method: "GET",
          data: {
            pid: cityId
          },
          callBack: function(res) {
            //console.log(res)
            ths.setData({
              areaArray: res
            });

            if (areaId) {
              for (var _index in res) {
                if (res[_index].areaId == areaId) {
                  ths.setData({
                    value: [ths.value[0], ths.value[1], parseInt(_index)]
                  });
                }
              }

              index = ths.value;
              ths.setData({
                province: ths.province,
                city: ths.city,
                area: ths.area,
                provinceId: ths.provinceId,
                cityId: ths.cityId,
                areaId: ths.areaId
              });
            } else {
              ths.setData({
                province: ths.provArray[ths.value[0]].areaName,
                city: ths.cityArray[ths.value[1]].areaName,
                area: ths.areaArray[ths.value[2]].areaName,
                provinceId: ths.provArray[ths.value[0]].areaId,
                cityId: ths.cityArray[ths.value[1]].areaId,
                areaId: ths.areaArray[ths.value[2]].areaId
              });
            }

            uni.hideLoading();
          }
        };
        http.request(params);
      },
      bindRegionChange: function(e) {
        //console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          region: e.detail.value
        });
      },

      /**
       * 保存地址
       */
      onSaveAddr: function() {
        var ths = this;
        let pages = getCurrentPages(); // 当前页面
        let beforePage = pages[pages.length - 2];
        console.log(this.receiver, this.addr, this.mobile)
        if (!/^1[3456789]\d{9}$/.test(ths.mobile)) {

          uni.showToast({
            title: '请输入正确的手机号',
            icon: 'none'
          });
          return false;
        }

        if (ths.receiver && ths.mobile && ths.addr) {
          uni.request({
            url: 'https://gh.api.cestech.com.cn:8240/mission_gh/p/address/addAddr',
            header: {
              'x-Resource-Token': uni.getStorageSync('xtoken'),
              //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
            },
            // header: {
            // 	'X-Access-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODkwNjQ3NTcsInVzZXJuYW1lIjoiYWRtaW4ifQ.9zI7NyLu1gcsn17dqXV9FUEyXIMRU6MgHxp9BG0i7MM'
            // },
            data: {
              userId: uni.getStorageSync('users').id,
              receiver: ths.receiver,
              mobile: ths.mobile,
              addr: ths.addr,
              province: ths.addrss.provinceName,
              provinceId: ths.addrss.provinceId,
              city: ths.addrss.cityName,
              cityId: ths.addrss.cityId,
              areaId: ths.addrss.areaId,
              area: ths.addrss.areaName,
              // userType: 0,
              // addrId: ths.addrId
            },
            method: "POST",
            success: (res) => {
              if (res.data.code === 200) {

                uni.showToast({
                  icon: 'success',
                  title: '保存地址成功'
                })
                setTimeout(() => {
                  uni.navigateBack({
                    delta: 1,
                    success: function() {
                      beforePage.$vm
                        .init(); // 执行前一个页面的init 来实现刷新
                    }
                  });
                  // uni.navigateBack()
                  // uni.navigateTo({
                  // 	url:`/pageD/address/index?fig=1`
                  // })
                }, 300)
              }
            }

          })
        } else {
          uni.showToast({
            icon: 'none',
            title: '请填写完整的手机号、姓名、城市、以及详细地址'
          })
        }


      },
      modifyAddr() {
        var ths = this;
        let pages = getCurrentPages(); // 当前页面
        let beforePage = pages[pages.length - 2];
        uni.request({
          url: 'https://gh.api.cestech.com.cn:8240/mission_gh/p/address/updateAddr',
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
            //'x-Resource-Token':uni.getStorageSync('xtoken'), //自定义请求头信息
          },
          // header: {
          // 	'X-Access-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODkwNjQ3NTcsInVzZXJuYW1lIjoiYWRtaW4ifQ.9zI7NyLu1gcsn17dqXV9FUEyXIMRU6MgHxp9BG0i7MM'
          // },
          data: {
            userId: uni.getStorageSync('users').id,
            receiver: ths.receiver,
            mobile: ths.mobile,
            addr: ths.addr,
            province: ths.addrss.provinceName,
            provinceId: ths.addrss.provinceId,
            city: ths.addrss.cityName,
            cityId: ths.addrss.cityId,
            areaId: ths.addrss.areaId,
            area: ths.addrss.areaName,
            userType: 0,
            addrId: ths.ids
          },
          method: "PUT",
          success: (res) => {
            if (res.data.code === 200) {

              uni.showToast({
                icon: 'success',
                title: '修改地址成功'
              })
              setTimeout(() => {
                uni.navigateBack({
                  delta: 1,
                  success: function() {
                    beforePage.$vm.init(); // 执行前一个页面的init 来实现刷新
                  }
                });
                // uni.navigateBack()
                // uni.navigateTo({
                // 	url:`/pageD/address/index?fig=1`
                // })
              }, 300)
            }
          }

        })
      },
      //删除配送地址
      onDeleteAddr: function(e) {
        var ths = this;
        uni.showModal({
          title: '',
          content: '确定要删除此收货地址吗？',
          confirmColor: "#eb2444",

          success(res) {
            if (res.confirm) {
              var addrId = ths.addrId;
              uni.showLoading();
              var params = {
                url: "/p/address/deleteAddr/" + addrId,
                method: "DELETE",
                data: {},
                callBack: function(res) {
                  uni.hideLoading();
                  uni.navigateBack({
                    delta: 1
                  });
                }
              };
              http.request(params);
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }

        });
      }
    }
  };
</script>
<style lang="scss">
  /* pages/editAddress/editAddress.wxss */

  page {
    background: #fff;
  }

  /* input列表 */
  .SiresContent {
    font-size: 30rpx;
    display: flex;
    align-items: center;

    .siresname {
      width: 200rpx;
    }


  }

  .input-box {
    margin-bottom: 50rpx;
    background: #fff;
    padding: 0 20rpx;
  }

  .input-box .section {
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 28rpx;
    padding: 30rpx 0;
    line-height: 48rpx;
    height: 100%;
    box-sizing: border-box;
    border-bottom: 2rpx solid #e5e5e5;

    .arrow {
      margin-left: 200rpx;
    }
  }

  .input-box .section text {
    width: 20%;
    color: #333;
  }

  .input-box .section input {
    width: 70%;
    padding: 0 20rpx;
    color: #333;
  }

  .input-box .section picker {
    width: 70%;
    padding: 0 30rpx;
  }

  .input-box .section .pca {
    width: 70%;
    padding: 0 20rpx;
  }

  .input-box .section .arrow {
    width: 28rpx;
    height: 28rpx;
  }

  .input-box .section .arrow image {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }

  /* end input列表 */

  /* 功能按钮 */

  .btn-box {
    padding: 5px 10px;
    width: 100%;
    text-align: center;
    margin: auto;
  }

  .btn-box text {
    font-size: 30rpx;
  }

  .btn-box .clear.btn,
  .keep.btn {
    width: 60%;
    height: 80rpx;
    line-height: 80rpx;
    margin: auto;
    text-align: center;
    border: 1rpx solid #39d48f;
    border-radius: 50rpx;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  .btn-box .keep {
    color: #fff;
    background-color: #39d48f;
  }

  .btn-box .clear.btn {
    margin-top: 40rpx;
    color: #eb2444;
    background-color: #f8f0f1b6;
  }

  /* end 功能按钮 */

  .infoText {
    margin-top: 20rpx;
    text-align: center;
    width: 100%;
    justify-content: center;
  }

  picker-view {
    background-color: white;
    padding: 0;
    width: 100%;
    height: 380rpx;
    bottom: 0;
    position: fixed;
  }

  picker-view-column view {
    vertical-align: middle;
    font-size: 28rpx;
    line-height: 28rpx;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .animation-element-wrapper {
    display: flex;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 999;
  }

  .animation-element {
    display: flex;
    position: fixed;
    width: 100%;
    height: 470rpx;
    bottom: 0;
    background-color: rgba(255, 255, 255, 1);
  }

  .animation-button {
    top: 20rpx;
    width: 290rpx;
    height: 100rpx;
    align-items: center;
  }

  picker-view text {
    color: #999;
    display: inline-flex;
    position: fixed;
    margin-top: 20rpx;
    height: 50rpx;
    text-align: center;
    line-height: 50rpx;
    font-size: 34rpx;
    font-family: Arial, Helvetica, sans-serif;
  }

  .left-bt {
    left: 30rpx;
  }

  .right-bt {
    right: 20rpx;
    top: 20rpx;
    position: absolute;
    width: 80rpx !important;
  }

  .line {
    display: block;
    position: fixed;
    height: 2rpx;
    width: 100%;
    margin-top: 89rpx;
    background-color: #eee;
  }
</style>