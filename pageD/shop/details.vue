<template>
  <view>
    <view class="u-nav">
      <navbar :safeAreaInsetTop="true" height="55" placeholder leftIconColor="#fff" autoBack>
        <view class="u-nav-slot" slot="center">
          <u--text text="商品详情" color="#fff"></u--text>
        </view>
      </navbar>
    </view>
    <view class="u-demo-block">
      <u-swiper :list="list5" @change="e => current = e.current" :autoplay="false" radius="0" height="600rpx"
        length="750rpx">
        <view slot="indicator" class="indicator">
          <view class="indicator__dot" v-for="(item, index) in list5" :key="index"
            :class="[index === current && 'indicator__dot--active']">
          </view>
        </view>
      </u-swiper>
    </view>
    <view class="box" style="margin: 0 auto;">
      <view class="shop-name">{{dtails.productDto.prodName}}</view>
      <view class="shop-illustrate">{{dtails.productDto.brief}}</view>
      <view class="integral">
        <view><text class="num">{{dtails.productDto.points*prodNum}}</text>积分</view>
        <view>已兑 {{dtails.num}}</view>
      </view>
 
    </view>
    <view class="box boxs" >
      <view class="xuanze" @click="exchange">
        <view><text class="title">选择</text> <text style="color: #333;font-weight: 500;">已选：{{prodNum}}件</text>
        </view>
        <view>
          <u-icon name="arrow-right" color="silver" size="17"></u-icon>
        </view>
      </view>
      <view class="delivery"><text class="title">配送</text> <text style="color: #333;font-weight: 500;">快速配送</text>
      </view>
      <view><text class="title">快递</text> <text style="color: #333;font-weight: 500;">免运费</text></view>
    </view>
    <!-- <view class="u-page__button-item">
      <u-button text="立即兑换" @click="exchange" size="normal" type="success"></u-button>
    </view> -->
    <view class="exchange" @click="exchange">
  立即兑换
    </view>

    <u-popup :show="show" mode="bottom" :round="10" @close="close" @open="open" :closeable="true">
      <view class="pup-sku">
        <view class="pup-sku-main">
          <view class="pup-sku-header">
            <image class="pup-sku-img" :src="defaultSku.pic ? defaultSku.pic : pic"></image>
            <view class="pup-sku-price">
              <text style="font-size: 36rpx; color: #333;">{{dtails.productDto.prodName}}</text>
              <!-- <text style="font-size: 36rpx;">{{Number(dtails.productDto.points*prodNum)}}积分</text> -->
              <!-- <text v-if="defaultSku && defaultSku.price" class="pup-sku-price-int">{{wxs.parsePrice(defaultSku.price)[0]}}</text> .{{wxs.parsePrice(defaultSku.price)[1]}} -->
            </view>
            <view class="pup-sku-prop">
              <text>库存</text> {{dtails.productDto.totalStocks}}
            </view>
            <view class="pup-sku-prop">
              <text>已选</text> {{selectedProp.length>0?specifications+'、':''}}{{prodNum}}件
            </view>
            <view class="close" @tap="closePopup"></view>
          </view>
          <view class="pup-sku-body">
            <view class="pup-sku-area">
              <block v-for="(value, key) in skuGroup" :key="key">
                <view class="sku-kind">{{key}}</view>
                <view class="sku-choose">
                  <block v-for="(item, index) in value" :key="index">
                    <text class="sku-choose-item"
                      :class=" (array_contain(selectedProp,item) ? 'active' : '')  + (wxs.props_contain(allProperties,selectedPropObj,key,item,propKeys) ? '' : 'gray')"
                      :data-ok="wxs.props_contain(allProperties,selectedPropObj,key,item,propKeys)" @tap="toChooseItem"
                      :data-key="key" :data-val="item">{{item}}</text>
                  </block>
                </view>
              </block>
            </view>
            <view class="pup-sku-count">
              <view class="num-wrap">
                <view class="minus" @tap="onCountMinus">
                  <text class="row"></text>
                </view>
                <view class="text-wrap">
                  <input type="number" :value="prodNum" disabled></input>
                </view>
                <view class="plus" @tap="onCountPlus">
                  <text class="row"></text>
                  <text class="col"></text>
                </view>
              </view>
              <view class="count-name">数量</view>
            </view>
          </view>
          <view class="pup-sku-footer">
            <view class="btn">
              <u-button text="确定" @click="order_details" size="normal" type="success"></u-button>
            </view>
            <!-- <view class="btn cart" @tap="addToCart">加入购物车</view>
			      <view class="btn buy" @tap="buyNow">立即购买</view> -->
          </view>
        </view>
      </view>
    </u-popup>
    <!-- <u-popup :show="show" mode="bottom" :round="10" @close="close" @open="open" :closeable="true">
			<view class="msk">
				<view class="msk-mian">
					<view>
						<image src="https://img.88tph.com/tphc.1/96/02/lgLe4gUlEemvKgARMiynhQ.jpg" mode="scaleToFill"
							style="width: 160rpx;height: 160rpx;"></image>
					</view>
					<view class="msk-right">
						<view><text class="jf">100000</text>积分</view>
						<view class="xuan">已选：<text style="color: #333;">{{value}}件</text></view>
						<view>库存：<text style="color: #333;">10000</text></view>
					</view>
				</view>
				<view class="">
					<view class="pup-sku-area">
					  <block v-for="(value, key) in skuGroup" :key="key">
					    <view class="sku-kind">{{key}}</view>
					    <view class="sku-choose">
					      <block v-for="(item, index) in value" :key="index">
					        <text :class="'sku-choose-item ' + (wxs.array_contain(selectedProp,item)?'active':'') + ' ' + (wxs.props_contain(allProperties,selectedPropObj,key,item,propKeys)?'':'gray')" :data-ok="wxs.props_contain(allProperties,selectedPropObj,key,item,propKeys)" @tap="toChooseItem" :data-key="key" :data-val="item">{{item}}</text>
					      </block>
					    </view>
					  </block>
					</view> -->

    <!-- <view class="guigee">
						<view class="guigee_t" v-for="(item,indexc) in goodsMultiSpec.spec_attr" :key="indexc">
							<view class="guigee_t_t">
								<text>{{item.group_name}}</text>
							</view>
							<view class="guigee_t_s gui-flex gui-align-items-center gui-wrap">
								<view class="guigee_l gui-flex gui-align-items-center gui-justify-content-cente"
									v-for="(itemz,indexz) in item.spec_items" :key="indexz"
									@click="cilckG(indexc,indexz)" :class="itemz.checked?'guiee_l_a':''">
									<text>{{itemz.value}}</text>
								</view>
							</view>
						</view>
					</view> -->

    <!-- 	</view>
				<view class="msk-num">
					<view>数量</view>
					<view>
						<u-number-box v-model="value" @change="valChange"></u-number-box>
					</view>
				</view>
				<view class="btn">
					<u-button text="确定" @click="order_details" size="normal" type="success"></u-button>
				</view>
			</view>
		</u-popup> -->
  </view>
</template>
<script module="wxs" lang="wxs" src="@/wxs/number.wxs"></script>
<script>
  let goodsSpecArr = [];
  export default {
    data() {
      return {
        shopId: 1,
        indicatorDots: true,
        indicatorColor: '#f2f2f2',
        indicatorActiveColor: '#eb2444',
        autoplay: true,
        interval: 3000,
        duration: 1000,
        prodNum: 1,
        totalCartNum: 0,
        pic: "",
        imgs: '',
        prodName: '',
        price: 0,
        content: '',
        prodId: 0,
        brief: '',
        skuId: 0,
        popupShow: false,
        // 是否获取过用户领取过的优惠券id
        loadCouponIds: false,
        skuShow: false,
        commentShow: false,
        couponList: [],
        defaultSku: undefined,
        prodCommPage: {
          current: 0,
          pages: 0,
          records: []
        },
        littleCommPage: [],
        evaluate: -1,
        isCollection: false,
        goodsMultiSpec: {
          spec_attr: [], //规格
        },
        specifications: '',
        categoryId: '',
        skuList: [],
        colorList: [],
        dtails: {},
        active: 0,
        skuGroup: {},
        selectedProp: [],
        selectedPropObj: {},
        propKeys: [],
        allProperties: [],
        prodCommData: {},
        changeRed: 0,
        show: false,
        current: 0,
        currentNum: 0,
        value: 1,
        product_specifications: '',
        list5: [],
        xh: [],
        points_num: 0
      }
    },
    onLoad(options) {

      console.log(options.id, 'ids');
      if (options.id) {
        this.userinfo()
        this.categoryId = options.id
        console.log(this.categoryId, 'this.categoryId');
        // this.shopDetail()
        this.groupSkuProp();
        this.getProdInfo()
      }
    },
    methods: {
      array_contain(array, obj) {
        for (var i = 0; i < array.length; i++) {
          console.log(array[i], obj, '天选')
          if (array[i] == obj) //如果要求数据类型也一致，这里可使用恒等号===
            return true;
        }

        return false;
      },
      //获取用户个人信息
      userinfo() {

        uni.request({
          url: 'https://gh.api.cestech.com.cn:8240/mission_gh/v1/user/info',
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),

          },
          // header: {
          // 	'X-Access-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODkwNjQ3NTcsInVzZXJuYW1lIjoiYWRtaW4ifQ.9zI7NyLu1gcsn17dqXV9FUEyXIMRU6MgHxp9BG0i7MM'
          // },
          // data: {
          // 	id: uni.getStorageSync('users').id
          // },
          method: "GET",
          success: (res) => {
            console.log(res, '用户')
            this.points_num = res.data.result.records[0].points

          }

        })

      },

      // 获取商品信息
      getProdInfo() {
        uni.showLoading();
        uni.request({
          url: `https://gh.api.cestech.com.cn:8240/mission_gh/prod/prodInfo?prodId=${this.categoryId}`,
          header: {
            'x-Resource-Token': uni.getStorageSync('xtoken'),
          },
          // header: {
          // 	'X-Access-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODkwNjQ3NTcsInVzZXJuYW1lIjoiYWRtaW4ifQ.9zI7NyLu1gcsn17dqXV9FUEyXIMRU6MgHxp9BG0i7MM' //自定义请求头信息
          // },
          method: "GET",
          success: (res) => {
            console.log(res.data.result.skuList, '商品列表')
            this.dtails = res.data.result
            uni.hideLoading()
            if (!res) {
              setTimeout(() => {
                uni.navigateBack()
              }, 1000);
              return
            }
            var imgStrs = res.data.result.productDto.imgs;
            var imgs = imgStrs.split(",");
            this.list5 = imgs

            // var content = util.formatHtml(res.content);
            this.setData({

              // content: content,
              price: res.data.result.productDto.price,
              prodName: res.data.result.productDto.prodName,
              prodId: res.data.result.productDto.prodId,
              brief: res.data.result.productDto.brief,
              // skuId: res.skuId
              skuList: res.data.result.productDto.skuList,
              pic: res.data.result.productDto.pic
            });


            this.groupSkuProp();
            uni.hideLoading();

          }

        })

      },
      setData: function(obj) {
        let that = this;
        let keys = [];
        let val, data;
        Object.keys(obj).forEach(function(key) {
          keys = key.split('.');
          val = obj[key];
          data = that.$data;
          keys.forEach(function(key2, index) {
            if (index + 1 == keys.length) {
              that.$set(data, key2, val);
            } else {
              if (!data[key2]) {
                that.$set(data, key2, {});
              }
            }
            data = data[key2];
          })
        });
      },
      //根据sku的属性 分组
      groupSkuProp: function() {
        var skuList = this.skuList;

        if (skuList.length == 1 && skuList[0].properties == "") {
          this.setData({
            defaultSku: skuList[0]
          });
          return;
        }

        var skuGroup = {};
        var allProperties = [];
        var propKeys = [];

        for (var i = 0; i < skuList.length; i++) {
          var defaultSku = this.defaultSku;
          var isDefault = false;

          if (!defaultSku) {
            //找到和商品价格一样的那个SKU，作为默认选中的SKU
            defaultSku = skuList[i];
            isDefault = true;
            this.setData({
              defaultSku: defaultSku
            });
          }

          var properties = skuList[i].properties; //版本:公开版;颜色:金色;内存:64GB

          allProperties.push(properties);
          var propList = properties.split(";"); // ["版本:公开版","颜色:金色","内存:64GB"]

          var selectedPropObj = this.selectedPropObj;

          for (var j = 0; j < propList.length; j++) {
            var propval = propList[j].split(":"); //["版本","公开版"]

            var props = skuGroup[propval[0]]; //先取出 版本对应的值数组
            //如果当前是默认选中的sku，把对应的属性值 组装到selectedProp

            if (isDefault) {
              propKeys.push(propval[0]);
              selectedPropObj[propval[0]] = propval[1];
            }

            if (props == undefined) {
              props = []; //假设还没有版本，新建个新的空数组

              props.push(propval[1]); //把 "公开版" 放进空数组
            } else {
              if (!this.array_contain(props, propval[1])) {
                //如果数组里面没有"公开版"
                props.push(propval[1]); //把 "公开版" 放进数组
              }
            }

            skuGroup[propval[0]] = props; //最后把数据 放回版本对应的值
          }

          this.setData({
            selectedPropObj: selectedPropObj,
            propKeys: propKeys
          });
        }

        this.parseSelectedObjToVals();
        this.setData({
          skuGroup: skuGroup,
          allProperties: allProperties
        });
      },
      //将已选的 {key:val,key2:val2}转换成 [val,val2]
      parseSelectedObjToVals: function() {
        var selectedPropObj = this.selectedPropObj;
        var selectedProperties = "";
        var selectedProp = [];

        for (var key in selectedPropObj) {
          selectedProp.push(selectedPropObj[key]);
          console.log(selectedProp, '选中了xxxxxxxxxxxxxxx');
          selectedProperties += key + ":" + selectedPropObj[key] + ";";
        }

        selectedProperties = selectedProperties.substring(0, selectedProperties.length -
          1); // console.log(selectedProperties);
        console.log(selectedProperties, '成功xxxxxxxxxxxxxxx');
        this.xh = []
        this.xh.push(selectedProperties)
        // selectedProperties.forEach(v=>{
        // 	console.log(v,'cg');
        // })
        this.specifications = selectedProperties
        this.setData({
          selectedProp: selectedProp
        });

        for (var i = 0; i < this.skuList.length; i++) {
          if (this.skuList[i].properties == selectedProperties) {
            this.setData({
              defaultSku: this.skuList[i]
            });
            break;
          }
        }
      },
      closePopup() {
        this.show = false
      },
      /**
       * 减数量
       */
      onCountMinus: function() {
        var prodNum = this.prodNum;

        if (prodNum > 1) {
          this.setData({
            prodNum: prodNum - 1
          });
        }
      },

      /**
       * 加数量
       */
      onCountPlus: function() {
        var prodNum = this.prodNum;

        if (prodNum < this.dtails.productDto.totalStocks) {
          this.setData({
            prodNum: prodNum + 1
          });
        } else {
          uni.showToast({
            icon: 'none',
            title: '超出兑换库存请重新选择'
          })
        }
      },
      //点击选择规格
      toChooseItem: function(e) {

        var ok = e.currentTarget.dataset.ok;
        console.log(e.currentTarget.dataset, 'beidianji');
        if (!ok) {
          return;
        }

        var val = e.currentTarget.dataset.val;
        var key = e.currentTarget.dataset.key;
        var selectedPropObj = this.selectedPropObj;
        selectedPropObj[key] = val;
        console.log(selectedPropObj, 'beidianji');
        this.setData({
          selectedPropObj: selectedPropObj
        });
        this.parseSelectedObjToVals();
      },
      //判断数组是否包含某对象
      array_contain: function(array, obj) {
        for (var i = 0; i < array.length; i++) {
          if (array[i] == obj) //如果要求数据类型也一致，这里可使用恒等号===
            return true;
        }

        return false;
      },

      change(index, item) {
        this.changeRed = index;
        console.log(item)
      },
      li() {
        this.isActive = false
        this.isError = true
      },
      order_details() {
        let modelss = ''

        this.xh.forEach(v => {
          modelss = v
          console.log(modelss, 'yyyy');

        })
        if (this.dtails.productDto.totalStocks <= 0) {
          uni.showToast({
            icon: 'none',
            title: '当前库存不足，请重新选择'
          })
          return;
        }
        if (this.points_num < this.dtails.productDto.points * this.prodNum) {
          uni.showToast({
            icon: 'none',
            title: '当前积分不足无法兑换，请重新选择'
          })
          return;
        } else {

          for (var key in this.selectedPropObj) {
            this.product_specifications = key + ',' + this.selectedPropObj[key]
          }

          let data = 0
          data = Number(this.dtails.productDto.points) * Number(this.prodNum)
          let imgurl = ""
          if (this.defaultSku.pic) {
            imgurl = this.defaultSku.pic
          } else {
            imgurl = this.pic
          }
          uni.navigateTo({
            url: `/pageD/order/index?pic=${imgurl}&product_specifications=${modelss}&prodId=${this.prodId}&points=${data}&skuId=${this.defaultSku.skuId}&prodNum=${this.prodNum}&name=${this.dtails.productDto.prodName}`
          })
        }
      },
      valChange(e) {
        console.log('当前值为: ' + e.value)
      },
      exchange() {
        this.show = true
      },
      open() {
        // console.log('open');
      },
      close() {
        this.show = false
        // console.log('close');
      }
    }
  }
</script>

<style lang="scss" >
  @import "./prod.css";

  .u-button {
    background: #1dd193 !important;
    color: #fff !important;
  }

  .titless {
    font-size: 36rpx;
    color: pink;
  }

  .sku-choose-item.active {
    background-color: #eb2444;
    color: #fff;
  }

  // .active {
  // 	border: 4rpx solid #00ce88;
  // 	color: #00ce88;
  // }
  page {
    /* background: #f5f5f5; */
    background: #fff;
  }

  .guigee {
    width: 100%;
    height: 300rpx;
    margin: auto;
    margin-top: 20rpx;

    .guigee_t {
      width: 100%;
      height: auto;
      margin-top: 40rpx;

      .guigee_t_t {
        font-size: 30rpx;
        color: #999;
      }

      .guigee_t_s {
        width: 50%;
        height: auto;
        margin-top: 20rpx;
        display: flex;
        align-items: center;
        line-height: 60rpx;

        .guigee_l {
          width: auto;
          height: 60rpx;
          line-height: 60rpx;
          border: 1rpx solid #e6e6e6;
          padding: 0rpx 30rpx 0rpx 30rpx;
          border-radius: 10rpx;
          font-size: 30rpx;
          margin-right: 25rpx;

        }

        .guiee_l_a {
          background: #FF2A36;
          color: #fff;
          border: 1rpx solid #FF2A36;
        }
      }
    }
  }

  .msk {
    padding: 65rpx 40rpx;

    .btn {
      margin-top: 220rpx;
    }

    .specifications {
      margin-top: 20rpx;

      .color-list {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 20rpx;

        .li {
          margin-right: 20rpx;
          width: 120rpx;
          border-radius: 10rpx;
          font-size: 30rpx;
          background: #f5f5f5;
          padding: 0 15rpx;
          height: 60rpx;
          line-height: 60rpx;
          text-align: center;
        }

        .red {
          background: red;
          color: #fff;
        }

        .li:first {
          margin-left: 0 !important;
        }
      }
    }

    .msk-num {
      margin-top: 30rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .msk-mian {
      display: flex;
      align-items: center;

      .msk-right {
        margin-left: 20rpx;
        color: silver;
        font-size: 34rpx;

        .xuan {
          margin: 7rpx 0;
        }

        .jf {
          color: red;
          font-weight: 550;
          font-size: 44rpx;
          margin-right: 10rpx;
        }
      }

    }
  }

  .u-page__button-item {
    width: 280rpx;
    margin: 0rpx auto;
    margin-top: 200rpx;
  }

  .box {
    background: #FFFFFF;
    border-radius: 20rpx;
    width: 700rpx;
    padding: 25rpx 30rpx;
    margin: 0 auto;
    margin-top: 30rpx;
    color: silver;
    font-size: 28rpx;

    .integral {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .num {
        color: red;
        font-weight: 600;
        font-size: 42rpx;
        margin-right: 10rpx;
      }
    }

    .shop-name {
      width: 650rpx;
      margin: 15rpx 0;
      font-size: 36rpx;
      font-weight: 600;
      color: #333;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; // 默认不换行；

    }

    .shop-illustrate {
      width: 650rpx;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; // 默认不换行；
    }
  }

  .boxs {
    font-size: 32rpx;
    box-shadow: 0rpx 0rpx 12rpx 2rpx rgba(57,57,57,0.08);
border-radius: 12rpx 12rpx 12rpx 12rpx;
    .title {
      font-weight: 500;
      margin-right: 30rpx;
    }

    .xuanze {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .delivery {
      margin: 20rpx 0;
    }
  }

  /deep/.u-swiper__wrapper__item__wrapper__image {
    width: 700rpx;
  }

  .indicator {
    @include flex(row);
    justify-content: center;

    &__dot {
      height: 6px;
      width: 6px;
      border-radius: 100px;
      background-color: rgba(255, 255, 255, 0.35);
      margin: 0 5px;
      transition: background-color 0.3s;

      &--active {
        background-color: red;
      }
    }
  }

  .indicator-num {
    padding: 2px 0;
    background-color: rgba(0, 0, 0, 0.35);
    border-radius: 100px;
    width: 35px;
    @include flex;
    justify-content: center;

    &__text {
      color: #FFFFFF;
      font-size: 12px;
    }
  }
  .exchange{
    width: 688rpx;
height: 96rpx;
background: #1DD193;
border-radius: 12rpx 12rpx 12rpx 12rpx;
margin: 100rpx auto 0;
color: #fff;
text-align: center;
line-height: 96rpx;
font-weight: 400;
font-size: 32rpx;
color: #FFFFFF;
  }
</style>