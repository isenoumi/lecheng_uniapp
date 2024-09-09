/**
 * 请求拦截
 * @param {Object} http
 */
import authorize from "@/common/auth.js"



module.exports = (vm) => {

	// 初始化请求配置
	// uni.$u.http.setConfig((config) => {
	// 	/* config 为默认全局配置*/
	// 	config.header['Content-type'] = 'application/json;charset=UTF-8'
	// 	return config
	// })
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作

			// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
			config.data = config.data || {}
			// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
			config.header.Authorization = vm.$store.state.token;
			return config

		}, (config) => // 可使用async await 做异步操作
		Promise.reject(config))
}
