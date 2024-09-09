<script>
// import cityJson from '@/pageA/static/pcas-code-sichuan.json'
// const cityJson = []
import authorize from '@/common/auth.js'
import config from '@/config.js'
var QQMapWX = require('@/common/qqmap-wx-jssdk.min.js')
let timeList = []
for (let i = 0; i < 24; i++) {
  if (i <= 9) timeList.push({ label: `0${i}:00` })
  else timeList.push({ label: `${i}:00` })
}

const defaultList = [
  [
    {
      label: '周一',
    },
    {
      label: '周二',
    },
    {
      label: '周三',
    },
    {
      label: '周四',
    },
    {
      label: '周五',
    },
    {
      label: '周六',
    },
    {
      label: '周日',
    },
  ],
  [
    {
      label: '周一',
    },
    {
      label: '周二',
    },
    {
      label: '周三',
    },
    {
      label: '周四',
    },
    {
      label: '周五',
    },
    {
      label: '周六',
    },
    {
      label: '周日',
    },
  ],
  timeList,

  timeList,
]

var staticUrl = 'http://cdn.cestech.com.cn/'
export default {
  globalData: {
    defaultList,
    // newAddressList: newAddressList,
    systemName: '乐诚城管',
    systemKey: 'slaughter',
    baseurl: 'http://sport-manage.api.9dyf.cn',
    qqmapsdk: null,
    locationKey: 'WTYBZ-JZPC2-D2QUB-CRBNE-NXHZ6-NWBLL',
    background: {
      backgroundColor: '#fff',
      // 导航栏背景图
      // background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
      // 还可以设置背景图size属性
      // backgroundSize: 'cover',

      // 渐变色
      // backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
    },
    theme: {
      '$u-main-color': '#303133',
      '$u-content-color': '#606266',
      '$u-tips-color': '#909193',
      '$u-light-color': '#c0c4cc',
      '$u-border-color': '#dadbde',
      '$u-bg-color': '#f3f4f6',
      '$u-disabled-color': '#c8c9cc',
      '$u-primary': '#3BCF99 ',
      '$u-primary-dark': '#26c6da',
      '$u-primary-disabled': '#80deea',
      '$u-primary-light': '#b2ebf2',
      '$u-warning': '#f9ae3d',
      '$u-warning-dark': '#f1a532',
      '$u-warning-disabled': '#f9d39b',
      '$u-warning-light': '#fdf6ec',
      '$u-success': '#5ac725',
      '$u-success-dark': '#53c21d',
      '$u-success-disabled': '#a9e08f',
      '$u-success-light': '#f5fff0',
      '$u-error': '#f56c6c',
      '$u-error-dark': '#e45656',
      '$u-error-disabled': '#f7b2b2',
      '$u-error-light': '#fef0f0',
      '$u-info': '#909399',
      '$u-info-dark': '#767a82',
      '$u-info-disabled': '#c4c6c9',
      '$u-info-light': '#f4f4f5',
      '$theme-background-color': '#fff',
    },
    hasScopeUserInfo: false,
    staticUrl: staticUrl,
    // 首页写死数据
    index: {
      menuList: [
        {
          id: '1559063181911056386',
          url: '/static/assets/index/组 2239.png',
          title: '政策法规',
          children: [],
          // children: [
          //   {
          //     id: '1782235120938258434',
          //     url: 'http://cdn.cestech.com.cn/BkpKnowledge/img/1f126e5147c6480da71a99b230756f6b.png',
          //     title: '垃圾分类篇',
          //   },
          //   {
          //     id: '1782235172893102081',
          //     url: 'http://cdn.cestech.com.cn/BkpKnowledge/img/3a0da6d27a0d47258b58b0e0f982eccf.png',
          //     title: '违章搭建篇',
          //   },
          //   {
          //     id: '1782235201842188289',
          //     url: 'http://cdn.cestech.com.cn/BkpKnowledge/img/b4925cb77d7a4abeab2dd7929b495130.png',
          //     title: '环境卫生篇',
          //   },
          //   {
          //     id: '1782235246318587906',
          //     url: 'http://cdn.cestech.com.cn/BkpKnowledge/img/a5bd8f2e90734aaf9bb3e051fb7e2b90.png',
          //     title: '市容市貌篇',
          //   },
          // ],
        },
        {
          id: '1559063685168816129',
          url: '/static/assets/index/组 2240.png',
          title: '宣教平台',
          children: [],
          // children: [
          //   {
          //     id: '1782235615484448770',
          //     url: 'http://cdn.cestech.com.cn/BkpKnowledge/img/834b1f010c6f4373bdac87103f7083d8.png',
          //     title: '生活垃圾分类指南',
          //   },
          //   {
          //     id: '1782235667846139905',
          //     url: 'http://cdn.cestech.com.cn/BkpKnowledge/img/bc8d2b93a61a43adb950dcc4c57884e6.png',
          //     title: '大件垃圾处理指南',
          //   },
          //   {
          //     id: '1782235705120919554',
          //     url: 'http://cdn.cestech.com.cn/BkpKnowledge/img/83d86d5a5bd944f3a66b290a53147168.png',
          //     title: '厨余垃圾处理指南',
          //   },
          //   {
          //     id: '1782235746707443714',
          //     url: 'http://cdn.cestech.com.cn/BkpKnowledge/img/ac86cef18f3a4f7c9325211f38720ecd.png',
          //     title: '建筑垃圾处理指南',
          //   },
          //   {
          //     id: '1782235790005243905',
          //     url: 'http://cdn.cestech.com.cn/BkpKnowledge/img/3fbf887e9d0642c99049325a57789c17.png',
          //     title: '占用城市道路办事指南',
          //   },
          //   {
          //     id: '1782235825103179778',
          //     url: 'http://cdn.cestech.com.cn/BkpKnowledge/img/08e8130d386541e4bbe3c1a14dc89378.png',
          //     title: '砍伐/移植树木办事指南',
          //   },
          //   {
          //     id: '1782235856354938881',
          //     url: 'http://cdn.cestech.com.cn/BkpKnowledge/img/7f289bea4813421cb268c3ae97a6ad11.png',
          //     title: '户外广告办事指南',
          //   },
          // ],
        },

        {
          id: '1559063779184140290',
          url: '/static/assets/index/组 2241.png',
          title: '活动广场',
          route: '/pageB/activitySquare/index',
          children: [],
          // children: [
          //   {
          //     id: '1572846998715031553',
          //     url: 'http://cdn.cestech.com.cn/BkpKnowledge/img/80f23d0dc3824fd1ae9cdb27ee3775d4.png',
          //     title: '限塑令',
          //   },
          //   {
          //     id: '1572847071544926210',
          //     url: 'http://cdn.cestech.com.cn/BkpKnowledge/img/cbe992dd8d4d4e57a445fecbc50af231.png',
          //     title: '光盘行动',
          //   },
          //   {
          //     id: '1572847137819123714',
          //     url: 'http://cdn.cestech.com.cn/BkpKnowledge/img/bb233134ce914e5788d34538915735ec.png',
          //     title: '低碳出行',
          //     children: [],
          //   },
          //   {
          //     id: '1572847168588537857',
          //     url: 'http://cdn.cestech.com.cn/BkpKnowledge/img/9254a392ee3a414b8e263176e53fde8e.png',
          //     title: '过度包装',
          //     children: [],
          //   },
          // ],
        },
        {
          id: '1559063558823796737',
          url: '/static/assets/index/组 2242.png',
          title: '检查通报',
          // route: '/pageA/signIn/signIn',
          // route: '/pages/index/index',
          children: [],
        },
        {
          id: '1559063181911056386',
          url: '/static/assets/index/组 2243.png',
          title: '市民参与',
          route: '/pageB/citizenParticipation/index',
        },
        // {
        //   id: '1559063685168816129',
        //   url: 'http://cdn.cestech.com.cn/BkpKnowledge/img/6052072d889c45a29ee9c5f58a66742c.png',
        //   title: '答题竞赛',
        //   route: 'pageA/competition/index',
        // },
      ],
      current: 0,
      swiperList: [
        {
          id: '1787378139196358657',
          route: '/pageC/knowledge/detail?id=1787378139196358657',
          url: 'http://cdn.cestech.com.cn/BkpKnowledge/img/702ee25a6b6e4f3e994533f37e27640d.png',
        },
        {
          id: '1784487468303187970',
          url: 'http://cdn.cestech.com.cn/BkpKnowledge/img/61248332df0341abae3b18e571621d1b.png',
          route: '/pageC/knowledge/detail?id=1784487468303187970',
        },

        {
          id: '',
          // url: 'https://oms.cestech.com.cn/BkpKnowledge/img/5c2f5388fe49417c995fa10b75e2b1d5/007@2x.jpg',
          url: 'http://cdn.cestech.com.cn/BkpKnowledge/img/e653677918514ce49e92508d8ee69d31.png',
          route: '/pageB/questionnaire/index',
        },
        {
          id: '',
          route: '/pageA/competition/index',
          url: 'http://cdn.cestech.com.cn/BkpKnowledge/img/a1602652d9a84505b6a56a37b87d66a3.png',
        },
      ],
      list1: [
        //      {
        // 	id: '1564891172083785729',
        // 	url: `${staticUrl}BkpKnowledge/img/f15f423111f546d9b0424f3ea19dc144.jpg'`,
        // 	title: '生态环境保护这十年，生态篇',
        // 	type: '行业资讯'

        // },
        {
          id: '1703692415863947265',
          url: `${staticUrl}BkpKnowledge/img/f15f423111f546d9b0424f3ea19dc144.jpg'`,
          title: '2023世界清洁能源装备大会主论坛举行',
          type: '行业资讯',
        },
        {
          id: '1703694917271355393',
          url: `${staticUrl}BkpKnowledge/img/888aefacbe134ee3b465405dea50bcc9.jpg`,
          title: '四川德阳 加快建设世界级清洁能源装备制造基地',
          type: '专题报告',
        },
      ],
      list2: [
        // {
        //   id: '1703696865248739330',
        //   url: `https://mmbiz.qpic.cn/mmbiz_jpg/VUGvl8M6bwZcWtyfOEmibpyKo2VwrtP2vcYhhV1iatrlNVaKLvnfLSj1JaJNvIOJ3c40mzAljeSGeOV5SdDn4vNg/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1`,
        //   title: '德阳，2023中国高质量发展十佳城市！',
        //   type: '专题报告',
        //   createTime: '2024-04-11 22:50:12',
        // },
        {
          id: '1703706454161686529',
          url: `http://cdn.cestech.com.cn/BkpKnowledge/img/00687b5865fd4e38ba6b0d809404c223.png`,
          title: '“乐诚城管”致市民书',
          type: '专题报告',
          createTime: '2024-05-20 12:50:12',
        },
        {
          id: '1703703754816684033',
          url: `https://mmbiz.qpic.cn/mmbiz_jpg/RJn6LC0H0hHFkCAyQKyoenNdNHxLZHFhXiaIDTdUtfg0adtDm1HzsZibBOMiahoev0hDic058d8N1ecvLwzTjXrVDA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1`,
          title: '创建卫生城市，人人有责',
          type: '专题报告',
          createTime: '2024-04-11 22:50:12',
        },
      ],
    },
  },
  onLaunch: function () {
    this.globalData.qqmapsdk = new QQMapWX({
      key: this.globalData.locationKey,
    })
    let multiIndex = [0, 0, 0]
    let newAddressList = [[], [], []]
    let cityJson = []

    uni.request({
      url: config.baseUrl + '/mission_gh/mission/bkbDeclareRecord/getmap',
      data: {},
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
      success: res => {
        console.log(res)

        cityJson = [res.data.result]
        initAddress()
      },
      fail: error => {
        console.log(error)
      },
    })

    const initAddress = () => {
      newAddressList[0] = cityJson.map((item, index) => {
        console.log('item:', item)
        var obj = {
          label: item.name,
          // value: item.name,
        }
        return obj
      })
      newAddressList[1] = cityJson[multiIndex[0]].children.map(
        (item, index) => {
          // console.log('item:',item);
          var obj = {
            label: item.name,
            // value: item.name,
          }
          return obj
        }
      )
      newAddressList[2] = cityJson[multiIndex[0]].children[
        multiIndex[1]
      ].children.map((item, index) => {
        // console.log('item:',item);
        var obj = {
          label: item.name,
          // value: item.name,
        }
        return obj
      })
      // newAddressList[3] = cityJson[multiIndex[0]].children[
      //   multiIndex[1]
      // ].children[multiIndex[2]].children.map((item, index) => {
      //   // console.log('item:',item);
      //   var obj = {
      //     label: item.name,
      //     // value: item.name,
      //   }
      //   return obj
      // })
      this.$store.commit(
        'setAreaJSON',
        JSON.parse(JSON.stringify(newAddressList))
      )

      console.log('newAddressList:', newAddressList, this.$store.state.areaJSON)
    }
    let multiIndexOrg = [0, 0, 0]
    let newAddressListOrg = [[], [], []]
    let orgJson = []
    uni.request({
      url:
        config.baseUrl +
        '/mission_gh/mission/bkbCategorizeIntoHousehold/getOrganization',
      data: {},
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
      success: res => {
        console.log(res)

        orgJson = res.data.result.data
        initAddressOrg()
      },
      fail: error => {
        console.log(error)
      },
    })

    const initAddressOrg = () => {
      newAddressListOrg[0] = orgJson.map((item, index) => {
        console.log('item:', item)
        var obj = {
          label: item.name,
          // value: item.name,
        }
        return obj
      })
      newAddressListOrg[1] = orgJson[multiIndexOrg[0]].children.map(
        (item, index) => {
          // console.log('item:',item);
          var obj = {
            label: item.name,
            // value: item.name,
          }
          return obj
        }
      )
      newAddressListOrg[2] = orgJson[multiIndexOrg[0]].children[
        multiIndexOrg[1]
      ].children.map((item, index) => {
        // console.log('item:',item);
        var obj = {
          label: item.name,
          // value: item.name,
        }
        return obj
      })
      // newAddressList[3] = cityJson[multiIndex[0]].children[
      //   multiIndex[1]
      // ].children[multiIndex[2]].children.map((item, index) => {
      //   // console.log('item:',item);
      //   var obj = {
      //     label: item.name,
      //     // value: item.name,
      //   }
      //   return obj
      // })
      this.$store.commit(
        'setOrgJSON',
        JSON.parse(JSON.stringify(newAddressListOrg))
      )
    }
    // if(uni.getStorageSync('avatarUrl')){
    // this.login()
    // }
  },
  onShow() {
    this.updateWeChat()
  },
  onPageNotFound: function () {
    // 跳转到 404 页面：
    uni.$u.route({
      url: 'pages/error/404',
    })
  },
  onHide: function () {},
  methods: {
    updateWeChat() {
      const updateManager = uni.getUpdateManager()

      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        console.log('res.hasUpdate', res.hasUpdate)
      })

      updateManager.onUpdateReady(function (res) {
        uni.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success(res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          },
        })
      })

      updateManager.onUpdateFailed(function (res) {
        // 新的版本下载失败
      })
    },
    initAddress() {
      newAddressList[0] = cityJson.map((item, index) => {
        console.log('item:', item)
        var obj = {
          label: item.name,
          // value: item.name,
        }
        return obj
      })
      newAddressList[1] = cityJson[multiIndex[0]].children.map(
        (item, index) => {
          // console.log('item:',item);
          var obj = {
            label: item.name,
            // value: item.name,
          }
          return obj
        }
      )
      newAddressList[2] = cityJson[multiIndex[0]].children[
        multiIndex[1]
      ].children.map((item, index) => {
        // console.log('item:',item);
        var obj = {
          label: item.name,
          // value: item.name,
        }
        return obj
      })
      newAddressList[3] = cityJson[multiIndex[0]].children[
        multiIndex[1]
      ].children[multiIndex[2]].children.map((item, index) => {
        // console.log('item:',item);
        var obj = {
          label: item.name,
          // value: item.name,
        }
        return obj
      })

      console.log('newAddressList:', newAddressList)
    },

    // 获取客户地区列表
    getUserRegion() {
      this.$store.commit('setRegions')
      this.$store.commit('setDefaultRegion')
    },
    async login() {
      await authorize.login()
      // const launch = uni.getLaunchOptionsSync()
      // const noLaunch = ["pages/education/detail"]

      // if (noLaunch.indexOf(launch.path) == -1) {
      //     this.checkAuth()
      // }
      // this.checkAuth()
      this.getUserRegion()
    },
    checkAuth() {
      if (
        !this.$store.state.token ||
        !this.$store.state.user.phone ||
        !this.$store.state.user.reg_status
      ) {
        this.$u.route({
          type: 'navigateTo',
          url: 'pageC/auth/register',
        })
        return
      }
    },
  },
}
</script>

<style lang="scss">
@import 'colorui/main.css';
@import 'colorui/icon.css';
/*每个页面公共css */
@import '@/uni_modules/uview-ui/index.scss';
@import 'common/styles.scss';
</style>
