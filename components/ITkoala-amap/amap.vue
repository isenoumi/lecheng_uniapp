<template>
  <view class="amap-container">
    <view :change:prop="amap.updateEcharts" id="amap"></view>
    <!-- <view class="">当前点击的对象的index值为：{{ dataIndex }}</view> -->
  </view>
</template>

<script>
const start =
  'https://oms.cestech.com.cn/BkpKnowledge/img/8f39b730acd544c7ad3efa09e4aaabf4/定位 (4).png'
export default {
  props: ['longitude', 'latitude'],

  data() {
    return {
      markerList: [
        {
          lat: this.latitude,
          lng: this.longitude,
          icon: start,
        },
      ],
      dataIndex: '',
    }
  },

  watch: {
    longitude(val) {
      console.log(val, 'xxx获取')
    },
  },
  mounted() {
    console.log(this.longitude, 'xx3456345')
    // this.$nextTick(() => {
    // 	// this.getMapData()
    // 	this.getMapData()
    // })
  },
  methods: {
    // 模拟从后台获取地图数据
    // getMapData() {
    // 	this.markerList = [

    // 		{
    // 			lat: 30.57873,
    // 			lng: 104.06074,
    // 			icon: start
    // 		},
    // 	]
    // },
    //地图点击回调事件
    onViewClick(params) {
      this.dataIndex = params.dataIndex
    },
  },
}
</script>

<script module="amap" lang="renderjs">
import config from '@/components/ITkoala-amap/config.js'

const selectedStart = 'static/ITkoala-amap/selectedStart.png' //选中的图片

export default {
	data() {
		return {
			map: null,
			ownerInstanceObj: null //service层对象
		}
	},
	mounted() {
		if (typeof window.AMap === 'function') {
			this.initAmap()
		} else {
			// 动态引入较大类库避免影响页面展示
			const script = document.createElement('script')
			// script.src = 'https://webapi.amap.com/maps?v=1.4.15&key=' + config.WEBAK
			script.src = 'https://webapi.amap.com/maps?v=1.4.15&key=' + config.TMAP_JSAPIAK
			script.onload = this.initAmap.bind(this)
			document.head.appendChild(script)
		}
	},
	methods: {
		initAmap() {
			this.map = new AMap.Map('amap', {
				resizeEnable: true,
				center: [104.07274, 30.57898],
				layers: [ //使用多个图层
					// new AMap.TileLayer.Satellite() //使用卫星图
				],
				zooms: [4, 18], //设置地图级别范围
				zoom: 10
			})

			this.initMarkers()
		},
		initMarkers() {
			let prevMarker = null
			let prevIcon = null
			console.log(this.markerList,'007')
			this.markerList.forEach((item, index) => {

				if(!!item.icon){
					//添加点标记
					let marker = new AMap.Marker({
						position: new AMap.LngLat(item.lng, item.lat),
						offset: new AMap.Pixel(-13, -30),
						icon: item.icon
					})

					marker.on('click', (e) => {
						if(prevMarker){
							prevMarker.setIcon(prevIcon)
						}
						prevIcon = item.icon
						prevMarker = marker
						marker.setIcon(selectedStart)
						this.dataIndex = index
						this.onClick(this.ownerInstanceObj)
					})

					this.map.add(marker)
				}

			})
		},
		updateEcharts(newValue, oldValue, ownerInstance, instance) {
			// 监听 service 层数据变更
			this.ownerInstanceObj = ownerInstance
			this.initMarkers()
		},
		onClick(ownerInstance) {
			// 调用 service 层的方法
			ownerInstance.callMethod('onViewClick', {
				dataIndex: this.dataIndex
			})
		}
	}
}
</script>

<style lang="scss" scoped>
#amap {
  width: 100%;
  height: 600rpx;
}

.infoWindow-wrap {
  margin-left: 50px;
  color: #f00;
}
</style>
