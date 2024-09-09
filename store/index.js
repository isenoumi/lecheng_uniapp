import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
// import cityData from 'china-area-data/data-array.json'
import cityData from '@/components/lee-select-city/data.json'
import {
  cityToTree,
  findCityALLByUnit
} from '@/util/public.js'
import {
  customerallbyregion,
  customerregions,
  customerdefaultregion
} from '@/common/api.js'
Vue.use(Vuex)
const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => uni.getStorageSync(key),
        setItem: (key, value) => uni.setStorageSync(key, value),
        removeItem: key => uni.removeStorageSync(key)
      }
    })
  ],

  state: {
    // 如果上面从本地获取的lifeData对象下有对应的属性，就赋值给state中对应的变量
    // 如果vuex_version无需保存到本地永久存储，无需lifeData.vuex_version方式
    user: {
      nick_name: '',
      gender: '',
      avatar_url: '',
      phone: '',
      name: '',
      address: '',
      role: '',
      message: '0',
      region: '',
      region_json: null,
      community: '',
      floor: [],
      unit: [],
      reg_status: 0,

    },
    token: '',
    token_expired: '',
    location: null,
    customer: null,
    regions: [], //B端地址合集
    cityDataTree: cityToTree(cityData),
    areaJSON: [],
    orgJSON: [],
  },
  mutations: {
    async setRegions(state, payload) {
      const regions = await customerregions()
      state.regions = regions.data;

    },
    setAreaJSON(state, payload) {
      state.areaJSON = payload;

    },
    setOrgJSON(state, payload) {
      state.orgJSON = payload;

    },
    async setDefaultRegion(state, payload) {
      if (state.customer != null) {
        return;
      }
      const data = await customerdefaultregion()
      console.log(data, '登录逻辑')
      if (data.data) {
        this.commit('setCustomer', data.data)
        this.commit('setDefaultLocation', data.data)

      }
    },
    setDefaultLocation(state, customer) {
      console.log(customer, '我是customer')
      const location = findCityALLByUnit(customer.region)
      if (location) {
        this.commit('setLocation', {
          selected: location,
          simple: location.map(item => item
            .name),
          region: location[location.length - 1].value,
        })
      } else {
        this.commit('setLocation', null)
      }


    },
    login(state, payload) {
      state.user = payload.user
      state.token = payload.token
      state.token_expired = payload.expire

    },
    subtractMessage(state, payload) {
      const num = state.user.message - payload
      if (num >= 0) {
        state.user.message = num
      } else {
        state.user.message = 0
      }
    },
    refreshUser(state, payload) {
      state.user = Object.assign(state.user, payload)
    },
    logout(state) {
      state.authorization = '';
      state.authorization_expired = '';
      uni.clearStorageSync();
      uni.$u.route({
        type: 'reLaunch',
        url: 'pages/login/index',
      })
    },
    // 改变网络状态
    changeNetWork(state, status) {
      state.netWorkChange = status;
    },
    // 改变定位
    setLocation(state, location) {
      state.location = location;
    },
    // 改变客户
    setCustomer(state, customer) {
      state.customer = true;
    },
  },

})

export default store