import {
	$http
} from "@escook/request-miniprogram"

$http.baseUrl = "https://api-hmugo-web.itheima.net"
uni.$http = $http

uni.$showMsg = function(title = "请求失败", duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}

// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from './store/store.js'

Vue.prototype.$store = store
console.log('不是')
// 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
const app = new Vue({

	...App
})
app.$mount()


// #endif

// #ifdef VUE3

import {
	createSSRApp
} from 'vue'

import App from './App.vue'
import store from './store/store.js'
export function createApp() {
	const app = createSSRApp(App)
	app.use(store)
	return {

		app
	}
}

// #endif
