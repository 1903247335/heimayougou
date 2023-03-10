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



Vue.config.productionTip = false

App.mpType = 'app'

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
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}

// #endif
